import { z } from "zod";

export const FEED_URL = "https://thelivingedge.substack.com/feed";
export const ArticleUrlSchema = z.string().refine(value => {
  try {
    const u = new URL(value);
    return (
      u.protocol === "https:" &&
      u.hostname === "thelivingedge.substack.com" &&
      u.port === "" &&
      !u.username &&
      !u.password &&
      /^\/p\/[a-z0-9-]+$/.test(u.pathname) &&
      !u.search &&
      !u.hash
    );
  } catch {
    return false;
  }
}, "Expected a canonical Living Edge article URL");
const Instant = z
  .string()
  .refine(
    s =>
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(s) &&
      Number.isFinite(Date.parse(s)) &&
      new Date(s).toISOString() === s,
    "Expected an ISO UTC instant"
  );
const CalendarDate = z
  .string()
  .refine(
    s =>
      /^\d{4}-\d{2}-\d{2}$/.test(s) &&
      Number.isFinite(Date.parse(s)) &&
      new Date(s).toISOString().slice(0, 10) === s,
    "Expected a real calendar date"
  );
export const PostSchema = z
  .object({
    title: z.string().trim().min(1).max(500),
    url: ArticleUrlSchema,
    publishedAt: Instant,
  })
  .strict();
export const WritingSnapshotSchema = z
  .object({
    feedUrl: z.literal(FEED_URL),
    fetchedAt: Instant,
    posts: z.array(PostSchema).length(3),
  })
  .strict()
  .refine(
    s => new Set(s.posts.map(p => p.url)).size === 3,
    "Three distinct article URLs are required"
  )
  .refine(
    s => s.posts.every(p => p.publishedAt <= s.fetchedAt),
    "Article dates cannot be after the fetch time"
  );
export const WritingResultSchema = z.discriminatedUnion("source", [
  z
    .object({ source: z.literal("fresh"), snapshot: WritingSnapshotSchema })
    .strict(),
  z
    .object({
      source: z.literal("fallback"),
      snapshot: WritingSnapshotSchema,
      reason: z.string().min(1),
    })
    .strict(),
]);
export type WritingSnapshot = z.infer<typeof WritingSnapshotSchema>;
export type WritingResult = z.infer<typeof WritingResultSchema>;

export const ReportSchema = z
  .object({
    path: z.enum([
      "/pages/agent-playbook.html",
      "/pages/april-2026-ai-agent-roundup.html",
      "/pages/taste-landscape.html",
      "/pages/mobile-agent-nodes.html",
    ]),
    title: z.string().min(1),
    summary: z.string().min(1),
    originalDateLabel: z.string().min(1),
    revisedOn: CalendarDate.optional(),
    citations: z.array(z.string().url().startsWith("https://")),
  })
  .strict();
export const ReportsSchema = z
  .array(ReportSchema)
  .length(4)
  .refine(r => new Set(r.map(p => p.path)).size === 4);
export type ReportRecord = z.infer<typeof ReportSchema>;
export const HomePropsSchema = z
  .object({
    writing: WritingResultSchema,
    reports: z.array(ReportSchema).max(4),
  })
  .strict();
export type HomeProps = z.infer<typeof HomePropsSchema>;
