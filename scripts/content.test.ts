import test from "node:test";
import assert from "node:assert/strict";
import {
  ArticleUrlSchema,
  ReportSchema,
  WritingSnapshotSchema,
} from "../client/src/content/contracts";

const post = {
  title: "Example",
  url: "https://thelivingedge.substack.com/p/example",
  publishedAt: "2026-10-01T12:00:00.000Z",
};
const snapshot = {
  feedUrl: "https://thelivingedge.substack.com/feed",
  fetchedAt: "2026-10-04T12:00:00.000Z",
  posts: [
    post,
    { ...post, url: "https://thelivingedge.substack.com/p/second" },
    { ...post, url: "https://thelivingedge.substack.com/p/third" },
  ],
};

test("only canonical article links may be featured", () => {
  assert.equal(ArticleUrlSchema.safeParse(post.url).success, true);
  for (const url of [
    "https://thelivingedge.substack.com.evil.example/p/post",
    "https://user@thelivingedge.substack.com/p/post",
    "https://thelivingedge.substack.com/",
    "javascript:alert(1)",
    "https://thelivingedge.substack.com/p/post?redirect=elsewhere",
    "https://thelivingedge.substack.com:444/p/post",
    "http://thelivingedge.substack.com/p/post",
  ]) {
    assert.equal(ArticleUrlSchema.safeParse(url).success, false, url);
  }
});
test("writing snapshots reject duplicate links, future posts and impossible dates", () => {
  assert.equal(WritingSnapshotSchema.safeParse(snapshot).success, true);
  assert.equal(
    WritingSnapshotSchema.safeParse({ ...snapshot, posts: [post, post, post] })
      .success,
    false
  );
  assert.equal(
    WritingSnapshotSchema.safeParse({
      ...snapshot,
      fetchedAt: "2026-09-01T12:00:00.000Z",
    }).success,
    false
  );
  assert.equal(
    WritingSnapshotSchema.safeParse({
      ...snapshot,
      fetchedAt: "2026-02-30T12:00:00.000Z",
    }).success,
    false
  );
});
test("report contracts reject inferred authorship and invalid revision dates", () => {
  const report = {
    path: "/pages/taste-landscape.html",
    title: "Taste",
    summary: "Methods",
    originalDateLabel: "April 2026",
    citations: [],
  };
  assert.equal(ReportSchema.safeParse(report).success, true);
  assert.equal(
    ReportSchema.safeParse({ ...report, author: "Philip Bankier" }).success,
    false
  );
  assert.equal(
    ReportSchema.safeParse({ ...report, datePublished: "2026-04-01" }).success,
    false
  );
  assert.equal(
    ReportSchema.safeParse({ ...report, revisedOn: "2026-02-30" }).success,
    false
  );
  assert.equal(
    ReportSchema.safeParse({ ...report, citations: ["javascript:alert(1)"] })
      .success,
    false
  );
});
