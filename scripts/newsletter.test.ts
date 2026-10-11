import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseFeed, resolveWriting } from "./newsletter";
const at = "2026-10-04T12:00:00.000Z";
const xml = await readFile(
  new URL("./fixtures/writing.xml", import.meta.url),
  "utf8"
);
const fallback = () => parseFeed(xml, at);

test("decodes text, sorts by date and deduplicates article URLs", () => {
  const value = fallback();
  assert.equal(value.posts.length, 3);
  assert.equal(value.posts[0].title, "Tools & decisions");
  assert.equal(new Set(value.posts.map(p => p.url)).size, 3);
  assert.equal(value.posts[0].publishedAt, "2026-10-03T12:00:00.000Z");
});
test("ordinary fetch failure keeps the original fallback timestamp", async () => {
  const failed: typeof fetch = async () => {
    throw new Error("network unavailable");
  };
  const result = await resolveWriting(
    fallback(),
    failed,
    new Date("2026-10-11T12:00:00Z")
  );
  assert.equal(result.source, "fallback");
  assert.equal(result.snapshot.fetchedAt, at);
  await assert.rejects(() => resolveWriting({}, failed));
});
test("auth and rate-limit errors do not disappear into fallback", async () => {
  for (const status of [401, 403, 429]) {
    const denied: typeof fetch = async () => new Response("", { status });
    await assert.rejects(
      () => resolveWriting(fallback(), denied),
      /HTTP (401|403|429)/
    );
  }
});
test("malformed XML and document types are rejected", () => {
  assert.throws(() => parseFeed("<rss><channel></rss>", at));
  assert.throws(() =>
    parseFeed('<!DOCTYPE rss [<!ENTITY x "value">]>' + xml, at)
  );
});
test("HTTP, parse and response-size failures use a dated fallback", async () => {
  const responses = [
    new Response("unavailable", { status: 500 }),
    new Response("<rss><broken>"),
    new Response("x".repeat(5 * 1024 * 1024 + 1)),
  ];
  for (const response of responses) {
    const stub: typeof fetch = async (_input, init) => {
      assert.ok(init?.signal);
      assert.equal(init?.redirect, "error");
      return response;
    };
    const result = await resolveWriting(fallback(), stub, new Date(at));
    assert.equal(result.source, "fallback");
    assert.equal(result.snapshot.fetchedAt, at);
  }
});
test("timeout, unsafe links, conflicting duplicates and insufficient posts are not published", async () => {
  const timeout: typeof fetch = async () => {
    throw new DOMException("timed out", "TimeoutError");
  };
  assert.equal(
    (await resolveWriting(fallback(), timeout, new Date(at))).source,
    "fallback"
  );
  assert.throws(() =>
    parseFeed(
      xml.replace(
        "https://thelivingedge.substack.com/p/tools",
        "https://thelivingedge.substack.com.evil.example/p/tools"
      ),
      at
    )
  );
  assert.throws(
    () =>
      parseFeed(
        xml.replace(
          "<title>Earlier post</title>",
          "<title>Conflicting title</title>"
        ),
        at
      ),
    /Conflicting/
  );
  assert.throws(() =>
    parseFeed(xml.replace(/<item><title>Context[\s\S]*?<\/item>/, ""), at)
  );
});

test("successful fetch publishes new data without changing the reviewed snapshot", async () => {
  const reviewed = fallback();
  const before = structuredClone(reviewed);
  const fresh: typeof fetch = async () => new Response(xml);
  const result = await resolveWriting(
    reviewed,
    fresh,
    new Date("2026-10-11T12:00:00.000Z")
  );
  assert.equal(result.source, "fresh");
  assert.equal(result.snapshot.fetchedAt, "2026-10-11T12:00:00.000Z");
  assert.deepEqual(reviewed, before);
});

test("impossible RSS calendar dates reject the response and preserve fallback age", async () => {
  for (const invalid of [
    "Mon, 30 Feb 2026 12:00:00 GMT",
    "Wed, 31 Jun 2026 12:00:00 +0200",
    "Sun, 29 Feb 2026 12:00:00 GMT",
  ]) {
    const malformed = xml.replace(
      /<pubDate>[^<]+<\/pubDate>/g,
      `<pubDate>${invalid}</pubDate>`
    );
    assert.throws(
      () => parseFeed(malformed, at),
      /Invalid RSS publication date/
    );
    const result = await resolveWriting(
      fallback(),
      async () => new Response(malformed),
      new Date(at)
    );
    assert.equal(result.source, "fallback");
    assert.equal(result.snapshot.fetchedAt, at);
  }
  const leapDay = xml.replace(
    /<pubDate>[^<]+<\/pubDate>/g,
    "<pubDate>Thu, 29 Feb 2024 23:30:00 -0200</pubDate>"
  );
  assert.equal(
    parseFeed(leapDay, at).posts[0].publishedAt,
    "2024-03-01T01:30:00.000Z"
  );
});
