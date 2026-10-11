import { DOMParser } from "@xmldom/xmldom";
import {
  FEED_URL,
  PostSchema,
  WritingSnapshotSchema,
  type WritingSnapshot,
  type WritingResult,
} from "../client/src/content/contracts";

export function parseFeed(xml: string, fetchedAt: string): WritingSnapshot {
  if (/<!DOCTYPE/i.test(xml))
    throw new Error("RSS document types are not accepted");
  const doc = new DOMParser({
    onError: (_level, message) => {
      throw new Error(`Invalid RSS XML: ${message}`);
    },
  }).parseFromString(xml, "application/xml");
  if (
    doc.documentElement?.tagName !== "rss" ||
    doc.getElementsByTagName("channel").length !== 1
  )
    throw new Error("Expected RSS channel");
  const items = Array.from(doc.getElementsByTagName("item"));
  const posts = items
    .map(item => {
      const value = (tag: string) => {
        const nodes = item.getElementsByTagName(tag);
        if (nodes.length !== 1) throw new Error(`Expected one ${tag}`);
        return nodes[0].textContent?.trim() ?? "";
      };
      const rawDate = value("pubDate");
      const parts =
        /^(?:[A-Za-z]{3},\s*)?(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4}|\d{2})(?=\s)/.exec(
          rawDate
        );
      const months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ];
      const day = Number(parts?.[1]);
      const month = months.indexOf(parts?.[2].toLowerCase() ?? "");
      let year = Number(parts?.[3]);
      if (parts?.[3].length === 2) year += year < 50 ? 2000 : 1900;
      const calendar = new Date(Date.UTC(year, month, day));
      const date = new Date(rawDate);
      if (
        !parts ||
        month < 0 ||
        calendar.getUTCFullYear() !== year ||
        calendar.getUTCMonth() !== month ||
        calendar.getUTCDate() !== day ||
        !Number.isFinite(date.valueOf())
      )
        throw new Error("Invalid RSS publication date");
      return PostSchema.parse({
        title: value("title"),
        url: value("link"),
        publishedAt: date.toISOString(),
      });
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const unique = new Map<string, (typeof posts)[number]>();
  for (const post of posts) {
    const existing = unique.get(post.url);
    if (
      existing &&
      (existing.title !== post.title ||
        existing.publishedAt !== post.publishedAt)
    )
      throw new Error("Conflicting duplicate article URL");
    unique.set(post.url, post);
  }
  const distinct = Array.from(unique.values());
  return WritingSnapshotSchema.parse({
    feedUrl: FEED_URL,
    fetchedAt,
    posts: distinct.slice(0, 3),
  });
}
class FeedAccessError extends Error {}
const MAX_BYTES = 5 * 1024 * 1024;
async function readBounded(response: Response): Promise<string> {
  if (!response.body) throw new Error("Empty feed response");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        throw new Error("Feed exceeds 5 MiB");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks).toString("utf8");
}

export async function fetchWriting(
  fetcher: typeof fetch = fetch,
  now: Date = new Date()
): Promise<WritingSnapshot> {
  const response = await fetcher(FEED_URL, {
    signal: AbortSignal.timeout(12_000),
    redirect: "error",
    headers: { Accept: "application/rss+xml, application/xml, text/xml" },
  });
  if ([401, 429].includes(response.status))
    throw new FeedAccessError(`Feed HTTP ${response.status}`);
  if (!response.ok) throw new Error(`Feed HTTP ${response.status}`);
  return parseFeed(await readBounded(response), now.toISOString());
}
export async function resolveWriting(
  fallback: unknown,
  fetcher: typeof fetch = fetch,
  now: Date = new Date()
): Promise<WritingResult> {
  const reviewed = WritingSnapshotSchema.parse(fallback);
  if (Date.parse(reviewed.fetchedAt) > now.valueOf())
    throw new Error("Future fallback timestamp");
  try {
    return { source: "fresh", snapshot: await fetchWriting(fetcher, now) };
  } catch (error) {
    if (error instanceof FeedAccessError) throw error;
    return {
      source: "fallback",
      snapshot: reviewed,
      reason: error instanceof Error ? error.message : "Feed request failed",
    };
  }
}
