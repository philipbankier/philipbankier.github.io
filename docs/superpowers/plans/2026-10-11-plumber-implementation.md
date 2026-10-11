# Refined Plumber implementation plan

> For agentic workers: use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to execute this plan task by task. Steps use checkboxes. Read the approved spec and the editorial contract before editing code.

Goal: prepare the approved Plumber personal site for a reviewed GitHub Pages release, with defensible visible copy, accurate structured data, readable static HTML and corrected library reports.

Architecture: retain React, Vite and GitHub Pages at `philipbankier.com`. Author the homepage in React and render its complete HTML at build time, with native links and CSS interactions. Fetch newsletter data during the build, use a reviewed dated fallback on ordinary feed failure, and package only files with explicit publication dispositions.

Tech stack: existing React 19.2.1, Vite 7.1.9, TypeScript 5.6.3, Tailwind 4 and Wouter; Node 22 and pnpm 10. Add focused build/test dependencies: Zod, an XML parser, parse5, tsx and sharp. Do not upgrade the application framework in this release.

Spec: [approved Plumber design](../specs/2026-10-10-plumber-refinement-design.md). The [editorial contract](2026-10-11-plumber-editorial-contract.md) is part of this plan, including exact replacement copy and source links.

Status: plan for review, written October 11, 2026. No production implementation or deployment is included in this planning commit.

## Global constraints

- The working checkout is `/Users/philipbankier/Development/philipbankier-site-plumber`, branch `codex/plumber-refinement`, starting at `1942d4e`. Verify these again at execution. Main was `de0047be9489b9a759af1a4c500031fb7a27d8e0` when checked for this plan.
- Read `AGENTS.md`, `docs/HANDOFF.md` and the approved spec. The new approved spec replaces the old camera-pullback concept, contribution portrait and stale handoff design assumptions.
- Keep the existing React, Vite and GitHub Pages setup at `philipbankier.com`. No hosting migration, runtime backend, analytics or third-party browser scripts.
- Core identity, content and link lists must be present in generated HTML. Do not hydrate output from `renderToStaticMarkup`.
- Palette: paper `#d3dbd4`, ink `#25332d`, secondary text `#46584d`, red `#a83225`. Text is at least 14 CSS pixels in the 375-pixel layout; body copy is 16 pixels or larger.
- Motion is limited to a brief wheel turn on hover or keyboard focus. Reduced motion disables it. Anchor navigation moves directly to the destination. Content is visible immediately.
- No invented labels, statistics, personal claims, publication dates or authors. No private contribution data. Keep Code as the section name; do not imply every repository has an open-source license.
- Do not read or restore the historical `.env.production.staging`. Do not modify tracker source or external automation. Do not edit `.github/workflows/**` in this plan.
- Only feature branches may be pushed. Preserve dirty and unrelated checkouts. Never bypass hooks. Run a repository lint script if one exists when executing; none exists at plan time.
- Before any change under `client/` is declared ready, run typechecking and a worktree production build. The new test and artifact gates below become part of that build.
- Local report corrections are authorized by the planned scope. Public disposition of the explicitly flagged material remains a release gate; an omitted link or robots rule is not removal from public hosting.
- Public hosting of a preview is also publication. Until publication decisions are resolved, use a local preview only.

## Review focus

1. A feed outage, timeout or malformed response preserves the reviewed fallback's true age; invalid fallback data fails the build. Auth/rate-limit failures stop explicitly. Task 2 tests these separately.
2. An untrusted title or a lookalike/off-domain article URL cannot inject HTML or redirect visitors through a featured post. Tasks 2 and 8 test parsing, URL boundaries, React escaping and JSON-LD escaping.
3. A visitor with JavaScript disabled or using an old fragment URL can still read all content and reach its destination. Tasks 3 through 8 cover static links, report disclosures and a distinct 404.
4. A newly added or unresolved public file cannot silently enter the release artifact. Task 8 tests pending decisions, unlisted paths, missing allowed files and the exact produced file inventory.
5. A portrait, long title, table or footer cannot hide content on phones or at enlarged text sizes. Tasks 3 through 7 and Task 9 require real-browser checks at 375px/1920px, keyboard use, reduced motion and 200% text zoom.

## File and interface map

Paths are relative to the worktree above. The four report URLs remain unchanged when approved for publication.

| File                                                                                                                   | Responsibility                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `client/src/content/contracts.ts`                                                                                      | Zod schemas and derived types for writing and report data.                                            |
| `client/src/content/site.ts`                                                                                           | Approved public identity, projects and repository descriptions.                                       |
| `client/src/content/reports.json`                                                                                      | Report titles, summaries, original date labels, actual revision dates and primary citations.          |
| `client/src/content/writing-reviewed.json`                                                                             | Reviewed last-good RSS snapshot, never silently overwritten by a build.                               |
| `client/src/content/writing.ts`                                                                                        | Reviewed snapshot loader and deterministic date formatting.                                           |
| `scripts/newsletter.ts`                                                                                                | Bounded public RSS request, parsing and fallback policy.                                              |
| `scripts/refresh-writing.ts`                                                                                           | Writes a candidate and receipt under ignored `build/` for human review.                               |
| `client/src/components/{Navbar,HeroSection,WritingSection,LibrarySection,OpenSourceSection,ContactSection,Footer}.tsx` | Replace the active old sections with the approved markup. Keep existing filenames.                    |
| `client/src/components/WorkSection.tsx`                                                                                | Two approved project rows; replaces Ledger in the active homepage.                                    |
| `client/src/pages/{Home,NotFound}.tsx`                                                                                 | Plain, statically renderable page composition.                                                        |
| `client/src/styles/plumber.css`                                                                                        | Approved mockup styles scoped under `.plumber`; no active dark-site grain.                            |
| `client/src/index.css`, `client/src/main.tsx`, `client/src/App.tsx`                                                    | CSS entry and development wiring. Keep Wouter for development.                                        |
| `client/src/entry-server.tsx`                                                                                          | Pure `renderHome(props: HomeProps)` and `renderNotFound()` exports.                                   |
| `client/index.html`, `vite.config.ts`                                                                                  | One owned HTML template, development-only JS entry, CSS build, no automatic public-directory copying. |
| `scripts/assets.ts`                                                                                                    | Responsive portrait, favicon and social-card output from the approved illustration.                   |
| `client/public/assets/{img,css}/`                                                                                      | Generated image assets and local report CSS.                                                          |
| `client/public/pages/agent-playbook.html`                                                                              | Corrected Playbook, subject to explicit publication disposition.                                      |
| `client/public/pages/april-2026-ai-agent-roundup.html`                                                                 | Reduced, sourced April edition.                                                                       |
| `client/public/pages/taste-landscape.html`                                                                             | Sourced method comparison, no invented ranking chart.                                                 |
| `client/public/pages/mobile-agent-nodes.html`                                                                          | Updated, qualified compatibility notes and usable checklist.                                          |
| `scripts/publication.json`                                                                                             | Explicit dispositions for every existing public source file and generated public asset.               |
| `scripts/metadata.ts`                                                                                                  | Metadata and schema from the same approved content records.                                           |
| `scripts/html.ts`                                                                                                      | Owned-slot replacement and parse5 inspection helpers.                                                 |
| `scripts/build-site.ts`                                                                                                | Vite builds, data resolution, static rendering, publication inventory and output receipt.             |
| `scripts/check-built.ts`                                                                                               | Artifact assertions, internal links, schema and asset validation.                                     |
| `scripts/check`, `scripts/test`, `scripts/build`, `scripts/verify`                                                     | Small executable entry points for repository checks.                                                  |
| `scripts/*.test.ts`, `scripts/fixtures/writing.xml`                                                                    | Focused tests for new contracts, RSS, rendering and publication behavior.                             |
| `tsconfig.scripts.json`, `package.json`, `pnpm-lock.yaml`                                                              | Typecheck/test commands and locked build dependencies.                                                |
| `docs/content-review.md`, `docs/release-readiness.md`, `README.md`                                                     | Claim evidence, publication decisions, acceptance evidence and operating instructions.                |

Do not delete pre-existing inactive components or dependencies merely because the new page stops importing them. Remove only imports, styles and code orphaned within files changed by this work.

## Task 1: Establish reviewed content contracts

Files: create `client/src/content/contracts.ts`, `client/src/content/site.ts`, `client/src/content/reports.json`, `scripts/content.test.ts`, `scripts/check`, `scripts/test`, `tsconfig.scripts.json`, `docs/content-review.md`; modify `tsconfig.json`, `package.json`, `pnpm-lock.yaml`.

Consumes: approved spec and standalone mockup. Produces: `WritingSnapshot`, `WritingResult`, `ReportRecord`, `site`, `reports` and deterministic typechecked inputs for later tasks.

- [ ] Verify checkout, status, Node/pnpm and fresh origin state. Fetch without switching someone else's checkout. Record baseline `pnpm check` and `pnpm run build:gh` after `pnpm install --frozen-lockfile` in this isolated worktree. Do not start a dev server in the build checkout.
- [ ] Verify candidate package versions and Node 22 engine support with `pnpm view <package> version engines`. Versions checked during planning: `zod@4.6.5`, `@xmldom/xmldom@0.9.12`, `parse5@8.0.1`, `tsx@4.23.15`, `sharp@0.35.5`. Install these exact compatible versions as dev dependencies, unless current verification reveals an incompatibility that must be recorded. Do not perform a broad upgrade.

```sh
pnpm add -D -E zod@4.6.5 @xmldom/xmldom@0.9.12 parse5@8.0.1 tsx@4.23.15 sharp@0.35.5
```

- [ ] Define runtime contracts before their consumers. Use the following core contract, deriving TypeScript types rather than maintaining parallel interfaces:

```ts
import { z } from "zod";

export const FEED_URL = "https://thelivingedge.substack.com/feed";
export const ArticleUrlSchema = z.string().refine((value) => {
  try {
    const u = new URL(value);
    return u.protocol === "https:" &&
      u.hostname === "thelivingedge.substack.com" &&
      u.port === "" && !u.username && !u.password &&
      /^\/p\/[a-z0-9-]+$/.test(u.pathname) && !u.search && !u.hash;
  } catch { return false; }
}, "Expected a canonical Living Edge article URL");
const Instant = z.string().refine((s) =>
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(s) &&
  Number.isFinite(Date.parse(s)) && new Date(s).toISOString() === s,
  "Expected an ISO UTC instant");
const CalendarDate = z.string().refine((s) => /^\d{4}-\d{2}-\d{2}$/.test(s) &&
  Number.isFinite(Date.parse(s)) && new Date(s).toISOString().slice(0, 10) === s,
  "Expected a real calendar date");
export const PostSchema = z.object({
  title: z.string().trim().min(1).max(500),
  url: ArticleUrlSchema,
  publishedAt: Instant,
}).strict();
export const WritingSnapshotSchema = z.object({
  feedUrl: z.literal(FEED_URL),
  fetchedAt: Instant,
  posts: z.array(PostSchema).length(3),
}).strict().refine((s) => new Set(s.posts.map((p) => p.url)).size === 3,
  "Three distinct article URLs are required")
  .refine((s) => s.posts.every((p) => p.publishedAt <= s.fetchedAt),
    "Article dates cannot be after the fetch time");
export const WritingResultSchema = z.discriminatedUnion("source", [
  z.object({ source: z.literal("fresh"), snapshot: WritingSnapshotSchema }).strict(),
  z.object({ source: z.literal("fallback"), snapshot: WritingSnapshotSchema,
    reason: z.string().min(1) }).strict(),
]);
export type WritingSnapshot = z.infer<typeof WritingSnapshotSchema>;
export type WritingResult = z.infer<typeof WritingResultSchema>;

export const ReportSchema = z.object({
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
}).strict();
export const ReportsSchema = z.array(ReportSchema).length(4)
  .refine((r) => new Set(r.map((p) => p.path)).size === 4);
export type ReportRecord = z.infer<typeof ReportSchema>;
export const HomePropsSchema = z.object({
  writing: WritingResultSchema,
  reports: z.array(ReportSchema).max(4),
}).strict();
export type HomeProps = z.infer<typeof HomePropsSchema>;
```

Do not add `author`, `datePublished` or metrics as convenience fields. A future factual addition needs evidence and a deliberate schema change. Reject an invalid `revisedOn` calendar date before using it in generated metadata; optional here means omitted until an actual revision, not populated with build time.

- [ ] Create `site.ts` with this exact identity data and the project/repository arrays transcribed from the approved reference. All consumers import this module, including metadata. Validate report JSON on import with `ReportsSchema.parse`.

```ts
import reportData from "./reports.json";
import { ReportsSchema } from "./contracts";

export const site = {
  origin: "https://philipbankier.com",
  name: "Philip Bankier",
  description: "Philip Bankier, co-founder of Kairox AI. Explore his work and writing.",
  bio: "Co-founder of Kairox AI. Building ActRun and writing The Living Edge.",
  email: "philip@kairoxai.live",
  company: { name: "Kairox AI", url: "https://kairoxai.live/" },
  newsletter: { name: "The Living Edge", url: "https://thelivingedge.substack.com/" },
  sameAs: ["https://github.com/philipbankier"],
} as const;
export const projects = [
  { name: "ActRun", url: "https://actrun.ai", domain: "actrun.ai",
    description: "An AI workspace that connects to your apps." },
  { name: "PromptCache", url: "https://promptcache.live", domain: "promptcache.live",
    description: "A directory for discovering and sharing AI prompts." },
] as const;
export const repositories = [
  ["awesome-agent-skills", "A directory of skills and tools for AI coding agents."],
  ["tastekit", "Interviews you about how you want AI agents to work, then writes reusable instruction files."],
  ["codex-handoff-skill", "A skill for handing coding plans to Codex CLI."],
  ["brain-dump", "Backup tooling for AI agent memory, built around restic."],
  ["agent-cli-skills", "A skill library for AI command-line agents."],
  ["lex-the-computer", "A self-hosted workspace for AI chat and scheduled tasks."],
  ["technical-visualizer", "Turns code and technical documents into HTML visual drafts, with optional AI image generation."],
  ["riskradar", "Portfolio risk analysis and visualization."],
].map(([name, description]) => ({ name, description,
  url: `https://github.com/philipbankier/${name}` }));
export const reports = ReportsSchema.parse(reportData);
```

`reports.json` uses the four exact titles and descriptions in the editorial contract. Original date labels are April 24, 2026; April 25, 2026; April 2026; May 2026 respectively. Initially omit `revisedOn` and use empty citation arrays; Tasks 4–7 must populate both before release. Order the homepage library Mobile, Roundup, Playbook, Taste, matching the approved preview.

```json
[
  {
    "path": "/pages/mobile-agent-nodes.html",
    "title": "Mobile Devices as Agent Nodes",
    "summary": "A field guide to Android and iOS automation tools and their documented setup requirements.",
    "originalDateLabel": "May 2026",
    "citations": []
  },
  {
    "path": "/pages/april-2026-ai-agent-roundup.html",
    "title": "The April 2026 AI Agent Roundup",
    "summary": "Selected agent-tool and model announcements from April 2026, with links to the original announcements.",
    "originalDateLabel": "April 25, 2026",
    "citations": []
  },
  {
    "path": "/pages/agent-playbook.html",
    "title": "The 2026 AI Agent Playbook",
    "summary": "A field brief comparing agent architectures and deployment tradeoffs, with sections on context and memory.",
    "originalDateLabel": "April 24, 2026",
    "citations": []
  },
  {
    "path": "/pages/taste-landscape.html",
    "title": "The Landscape of Taste Transfer",
    "summary": "Selected approaches to personalizing AI writing, with evaluation questions and primary sources.",
    "originalDateLabel": "April 2026",
    "citations": []
  }
]
```

- [ ] Add the executable check/test wrappers and wire `package.json` `check`/`test` to them. Add `resolveJsonModule: true` to `tsconfig.json`. `tsconfig.scripts.json` extends that config, includes `scripts/**/*.ts` and the content modules, clears `exclude`, uses `jsx: "react-jsx"`, and sets `incremental: false`. Keep the client typecheck too.

```sh
#!/bin/sh
set -eu
pnpm exec tsc --noEmit
pnpm exec tsc --noEmit -p tsconfig.scripts.json
```

```sh
#!/bin/sh
set -eu
pnpm exec tsx --tsconfig tsconfig.scripts.json --test scripts/*.test.ts
```

- [ ] Add meaningful contract rejection tests before wiring consumers. These are synthetic fixture values, never production content:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { ArticleUrlSchema, ReportsSchema } from "../client/src/content/contracts";
import { reports } from "../client/src/content/site";

test("rejects lookalikes, credentials and non-article destinations", () => {
  for (const url of [
    "https://thelivingedge.substack.com.evil.example/p/post",
    "https://user@thelivingedge.substack.com/p/post",
    "https://thelivingedge.substack.com/",
    "javascript:alert(1)",
    "https://thelivingedge.substack.com/p/post?redirect=elsewhere",
  ]) assert.equal(ArticleUrlSchema.safeParse(url).success, false);
});
test("report records cannot silently acquire unsupported author metadata", () => {
  const changed = reports.map((r, i) => i ? r : { ...r, author: "Philip Bankier" });
  assert.equal(ReportsSchema.safeParse(changed).success, false);
});
```

- [ ] Run `scripts/check`, `scripts/test` and the existing build. Record baseline failures separately from new failures. Initialize `docs/content-review.md` with columns Page/claim, Final wording or removal, Primary URL, Checked date, Reviewer disposition. Do not mark any report fully reviewed yet.
- [ ] Review staged changes for credentials and unintended files, run `git diff --check`, then commit: `feat: define reviewed personal-site content`.

## Task 2: Resolve newsletter content at build time

Files: create `scripts/newsletter.ts`, `scripts/newsletter.test.ts`, `scripts/refresh-writing.ts`, `scripts/fixtures/writing.xml`, `client/src/content/writing.ts`, `client/src/content/writing-reviewed.json`.

Consumes: Task 1 schemas. Produces `parseFeed(xml: string, fetchedAt: string): WritingSnapshot`, `resolveWriting(fallback: unknown, fetcher?: typeof fetch, now?: Date): Promise<WritingResult>`, and `formatDate(iso: string): string`. The default request is the fixed public feed, never a token-bearing API.

- [ ] Add this synthetic RSS fixture, with three distinct posts and one repeated item, as `scripts/fixtures/writing.xml`. It never becomes production content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>Test publication</title>
<item><title>Earlier post</title><link>https://thelivingedge.substack.com/p/earlier</link><pubDate>Thu, 01 Oct 2026 12:00:00 GMT</pubDate></item>
<item><title><![CDATA[Tools & decisions]]></title><link>https://thelivingedge.substack.com/p/tools</link><pubDate>Sat, 03 Oct 2026 12:00:00 GMT</pubDate></item>
<item><title>Context &amp; memory</title><link>https://thelivingedge.substack.com/p/context</link><pubDate>Fri, 02 Oct 2026 12:00:00 GMT</pubDate></item>
<item><title>Earlier post</title><link>https://thelivingedge.substack.com/p/earlier</link><pubDate>Thu, 01 Oct 2026 12:00:00 GMT</pubDate></item>
</channel></rss>
```

Include these assertions before writing the parser:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseFeed, resolveWriting } from "./newsletter";
const at = "2026-10-04T12:00:00.000Z";
const xml = await readFile(new URL("./fixtures/writing.xml", import.meta.url), "utf8");
const fallback = () => parseFeed(xml, at);

test("decodes text, sorts by date and deduplicates article URLs", () => {
  const value = fallback();
  assert.equal(value.posts.length, 3);
  assert.equal(value.posts[0].title, "Tools & decisions");
  assert.equal(new Set(value.posts.map((p) => p.url)).size, 3);
  assert.equal(value.posts[0].publishedAt, "2026-10-03T12:00:00.000Z");
});
test("ordinary fetch failure keeps the original fallback timestamp", async () => {
  const failed: typeof fetch = async () => { throw new Error("network unavailable"); };
  const result = await resolveWriting(fallback(), failed, new Date("2026-10-11T12:00:00Z"));
  assert.equal(result.source, "fallback");
  assert.equal(result.snapshot.fetchedAt, at);
  await assert.rejects(() => resolveWriting({}, failed));
});
test("auth and rate-limit errors do not disappear into fallback", async () => {
  for (const status of [401, 403, 429]) {
    const denied: typeof fetch = async () => new Response("", { status });
    await assert.rejects(() => resolveWriting(fallback(), denied), /HTTP (401|403|429)/);
  }
});
test("malformed XML and document types are rejected", () => {
  assert.throws(() => parseFeed("<rss><channel></rss>", at));
  assert.throws(() => parseFeed('<!DOCTYPE rss [<!ENTITY x "value">]>' + xml, at));
});
```

- [ ] Implement XML parsing with `@xmldom/xmldom`, strict error callbacks, and text-node extraction. Reject a document type before parsing. Require exactly one RSS channel. Validate every item that is considered a candidate; fail the live response on unsafe links rather than silently publishing a partial selection. Ignore non-article items only if they have no article link and document that reason in the build receipt.

```ts
import { DOMParser } from "@xmldom/xmldom";
import { FEED_URL, PostSchema, WritingSnapshotSchema,
  type WritingSnapshot, type WritingResult } from "../client/src/content/contracts";

export function parseFeed(xml: string, fetchedAt: string): WritingSnapshot {
  if (/<!DOCTYPE/i.test(xml)) throw new Error("RSS document types are not accepted");
  const doc = new DOMParser({ onError: (_level, message) => {
    throw new Error(`Invalid RSS XML: ${message}`);
  } }).parseFromString(xml, "application/xml");
  if (doc.documentElement?.tagName !== "rss" ||
      doc.getElementsByTagName("channel").length !== 1) throw new Error("Expected RSS channel");
  const items = Array.from(doc.getElementsByTagName("item"));
  const posts = items.map((item) => {
    const value = (tag: string) => {
      const nodes = item.getElementsByTagName(tag);
      if (nodes.length !== 1) throw new Error(`Expected one ${tag}`);
      return nodes[0].textContent?.trim() ?? "";
    };
    const date = new Date(value("pubDate"));
    if (!Number.isFinite(date.valueOf())) throw new Error("Invalid RSS publication date");
    return PostSchema.parse({ title: value("title"), url: value("link"),
      publishedAt: date.toISOString() });
  }).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const unique = new Map<string, (typeof posts)[number]>();
  for (const post of posts) {
    const existing = unique.get(post.url);
    if (existing && (existing.title !== post.title || existing.publishedAt !== post.publishedAt))
      throw new Error("Conflicting duplicate article URL");
    unique.set(post.url, post);
  }
  const distinct = Array.from(unique.values());
  return WritingSnapshotSchema.parse({ feedUrl: FEED_URL, fetchedAt,
    posts: distinct.slice(0, 3) });
}
```

The parser fails on malformed items or conflicting duplicate URLs. Do not add an item-skipping branch unless the live feed requires it and a fixture documents the actual non-article form.

- [ ] Implement the request boundary. Set `AbortSignal.timeout(12_000)`, `redirect: "error"` and a descriptive Accept header. Require a successful HTTP response. Treat 401/403/429 as fatal per repository instructions, and report them without retries. Cap decoded response bytes at 5 MiB while reading the stream; do not rely only on Content-Length. Cancel the reader when the cap is exceeded. A timeout, 5xx, oversized body, parse error or insufficient valid posts can use a validated reviewed fallback.

```ts
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
      if (size > MAX_BYTES) { await reader.cancel(); throw new Error("Feed exceeds 5 MiB"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks).toString("utf8");
}
export async function resolveWriting(
  fallback: unknown, fetcher: typeof fetch = fetch, now: Date = new Date(),
): Promise<WritingResult> {
  const reviewed = WritingSnapshotSchema.parse(fallback);
  if (Date.parse(reviewed.fetchedAt) > now.valueOf()) throw new Error("Future fallback timestamp");
  try {
    const response = await fetcher(FEED_URL, {
      signal: AbortSignal.timeout(12_000), redirect: "error",
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    });
    if ([401, 403, 429].includes(response.status))
      throw new FeedAccessError(`Feed HTTP ${response.status}`);
    if (!response.ok) throw new Error(`Feed HTTP ${response.status}`);
    return { source: "fresh", snapshot: parseFeed(await readBounded(response), now.toISOString()) };
  } catch (error) {
    if (error instanceof FeedAccessError) throw error;
    return { source: "fallback", snapshot: reviewed,
      reason: error instanceof Error ? error.message : "Feed request failed" };
  }
}
```

- [ ] Extend tests with the following boundary cases. These tests do not contact the network:

```ts
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
  const timeout: typeof fetch = async () => { throw new DOMException("timed out", "TimeoutError"); };
  assert.equal((await resolveWriting(fallback(), timeout, new Date(at))).source, "fallback");
  assert.throws(() => parseFeed(xml.replace("https://thelivingedge.substack.com/p/tools",
    "https://thelivingedge.substack.com.evil.example/p/tools"), at));
  assert.throws(() => parseFeed(xml.replace("<title>Earlier post</title>", "<title>Conflicting title</title>"), at), /Conflicting/);
  assert.throws(() => parseFeed(xml.replace(/<item><title>Context[\s\S]*?<\/item>/, ""), at));
});
```
- [ ] Implement `scripts/refresh-writing.ts` as a fresh-only fetch using the same request/parser boundaries. Export the bounded fresh-fetch helper from `newsletter.ts` as `fetchWriting(fetcher?: typeof fetch, now?: Date): Promise<WritingSnapshot>` and have both commands call it; move the existing try-body there. Fresh-only refresh must fail instead of writing a fallback candidate. Write `build/writing-candidate.json` and `build/writing-refresh-receipt.json`; never overwrite the tracked snapshot automatically.
- [ ] Fetch the real public feed, inspect the candidate's three titles, URLs and exact publication timestamps against the feed, then copy the reviewed candidate to `client/src/content/writing-reviewed.json`. This is how the real fetchedAt enters source; do not invent a timestamp from the design mockup. If access fails before a valid reviewed snapshot exists, stop this task with the real error.
- [ ] Add the shared deterministic display helper and validate the checked-in JSON on import:

```ts
import data from "./writing-reviewed.json";
import { WritingSnapshotSchema } from "./contracts";
export const reviewedWriting = WritingSnapshotSchema.parse(data);
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC",
    year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));
}
```

- [ ] Run `scripts/check`, `scripts/test` and the existing build. Commit only reviewed source and fixtures, not ignored receipts: `feat: refresh newsletter links during builds`.

## Task 3: Port the approved homepage and finish its assets

Files: modify the active section components, `client/src/pages/Home.tsx`, `client/src/pages/NotFound.tsx`, `client/src/App.tsx`, `client/src/index.css`; create `WorkSection.tsx`, `client/src/styles/plumber.css`, `scripts/assets.ts`, `scripts/home.test.ts`, and the public images listed below.

Consumes: `site`, `projects`, `repositories`, `reports`, `HomeProps`, `WritingResult`, `reviewedWriting`, `formatDate`. Produces `Home(props: HomeProps): React.JSX.Element` and a context-free `NotFound()` component. `WritingSection` takes `{ writing: WritingResult }`; `LibrarySection` takes `{ reports: ReportRecord[] }`. No section needs state, effects or a browser API.

- [ ] Port the exact body markup and styles of `design-options/plumber-refined/index.html` into the existing React section files. This file supplies complete approved markup, including the wheel SVG; do not redesign it from the prose. Convert HTML attributes to JSX, use React-escaped text from Task 1 records, and use relative report links for local preview. Keep the approved classes and breakpoint values. Wrap the page in `.plumber` and scope its rules so the old application utilities do not override it.
- [ ] Use this page composition, keeping the old fragment targets as zero-content anchors at their destination. Give the main landmark a focus target. Remove Ledger from Home's imports, but leave pre-existing inactive section files alone.

```tsx
export default function Home({ writing, reports }: HomeProps) {
  return <div className="plumber">
    <a className="skip" href="#main">Skip to content</a>
    <div className="sheet" id="top">
      <Navbar />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <WorkSection />
        <WritingSection writing={writing} />
        <LibrarySection reports={reports} />
        <OpenSourceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  </div>;
}
```

Inside WorkSection's existing `<section id="work">`, place `<span id="ledger" aria-hidden="true" />` before the heading. Inside the Code section, place `<span id="open-source" aria-hidden="true" />`. No fabricated visible labels are needed.

- [ ] Render the newsletter as real article links and a dated fallback note:

```tsx
<ul className="posts">
  {writing.snapshot.posts.map((post) => <li key={post.url}>
    <a className="post" href={post.url} target="_blank" rel="noopener noreferrer">
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <h3>{post.title} <span className="arrow" aria-hidden="true">↗</span></h3>
    </a>
  </li>)}
</ul>
{writing.source === "fallback" && <p className="writing-checked">
  Writing checked {formatDate(writing.snapshot.fetchedAt)}.
</p>}
```

Use `font-size: 14px; color: var(--muted)` for the note, with enough spacing to distinguish it from a post date. Do not expose raw network errors to visitors.

- [ ] In development App, render Home through a route child or wrapper with `writing={{source: "fresh", snapshot: reviewedWriting}}` and `reports={reports}` from `site.ts`. The development snapshot is a stable design fixture, not a live feed. Preserve other routes and existing providers unless a changed import becomes unused. Production will render Home directly.
- [ ] Replace NotFound with simple static content and a native home link. Its markup must not depend on Wouter or a click handler:

```tsx
export default function NotFound() {
  return <div className="plumber"><main className="sheet not-found">
    <h1>Page not found</h1>
    <p>This address does not have a page.</p>
    <a className="text-link" href="/">Return to Philip Bankier</a>
  </main></div>;
}
```

Give this page its own sensible heading size rather than inheriting the oversized two-line name rule. Remove active body grain and old full-page dark backgrounds. Keep `scroll-behavior: auto`, visible focus and the reference's reduced-motion rule.

- [ ] Create `scripts/assets.ts` using sharp to resize the approved portrait without changing its content. Output `portrait-320.webp`, `portrait-640.webp`, `portrait-960.webp` and `portrait-1122.webp` under `client/public/assets/img/`, preserving the 1122:1402 aspect ratio. The largest variant is also the Person image. Use quality 82 as the initial encoder setting, inspect results and reduce only if visually acceptable.

```ts
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
const directory = "client/public/assets/img";
await mkdir(directory, { recursive: true });
for (const width of [320, 640, 960, 1122]) {
  await sharp("design-options/plumber-refined/portrait.png")
    .resize({ width, withoutEnlargement: true }).webp({ quality: 82 })
    .toFile(`${directory}/portrait-${width}.webp`);
}
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
<rect width="80" height="80" rx="12" fill="#d3dbd4"/>
<g fill="none" stroke="#a83225" stroke-width="5">
<circle cx="40" cy="40" r="27"/><path d="M40 13v54M13 40h54"/>
<circle cx="40" cy="40" r="7" fill="#d3dbd4"/></g></svg>`;
await writeFile("client/public/favicon.svg", icon);
await sharp(Buffer.from(icon)).resize(32, 32).png().toFile("client/public/favicon-32.png");
```

Use the same paper and ink in the social card. This is a layout of approved material, with no invented title or caption. Add this to the asset script and inspect the actual rendered text and image before committing:

```ts
const socialBase = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#d3dbd4"/>
<g fill="#25332d" font-family="Arial, Helvetica, sans-serif">
<text x="72" y="200" font-size="72" font-weight="700">Philip Bankier</text>
<text x="72" y="292" font-size="28">Co-founder of Kairox AI.</text>
<text x="72" y="340" font-size="28">Building ActRun and writing The Living Edge.</text>
<text x="72" y="548" font-size="22">philipbankier.com</text>
</g><path d="M72 580H1128" stroke="#25332d"/></svg>`;
const portrait = await sharp("design-options/plumber-refined/portrait.png")
  .resize({ width: 425 }).png().toBuffer();
await sharp(Buffer.from(socialBase)).composite([
  { input: portrait, left: 700, top: 40, blend: "multiply" },
]).jpeg({ quality: 88 }).toFile(`${directory}/social-card.jpg`);
```

```tsx
<img src="/assets/img/portrait-640.webp"
  srcSet="/assets/img/portrait-320.webp 320w, /assets/img/portrait-640.webp 640w, /assets/img/portrait-960.webp 960w, /assets/img/portrait-1122.webp 1122w"
  sizes="(max-width: 700px) 58vw, (max-width: 1050px) 340px, 418px"
  width={1122} height={1402} fetchPriority="high"
  alt="Illustrated portrait of Philip Bankier" />
```

- [ ] Test server rendering before the build orchestration exists. Import Home with the development fixture and call `renderToStaticMarkup` from React DOM. Assert sections, old fragments and distinct article URLs exist without running effects; assert hostile title text is escaped.

```ts
import React from "react";
import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../client/src/pages/Home";
import NotFound from "../client/src/pages/NotFound";
import { reviewedWriting } from "../client/src/content/writing";
import { reports } from "../client/src/content/site";

test("homepage is complete before browser JavaScript runs", () => {
  const snapshot = structuredClone(reviewedWriting);
  snapshot.posts[0].title = '<img src=x onerror="alert(1)">';
  const html = renderToStaticMarkup(React.createElement(Home, {
    writing: { source: "fallback", snapshot, reason: "fixture" }, reports,
  }));
  for (const id of ["main", "work", "writing", "library", "code", "contact", "ledger", "open-source"])
    assert.ok(html.includes(`id="${id}"`), id);
  for (const post of snapshot.posts) assert.ok(html.includes(post.url));
  assert.ok(html.includes("Writing checked"));
  assert.ok(html.includes("&lt;img"));
  assert.ok(!html.includes('<img src="x"'));
});
test("404 has a native recovery link", () => {
  const html = renderToStaticMarkup(React.createElement(NotFound));
  assert.match(html, /href="\/"/);
  assert.match(html, /Page not found/);
});
```

- [ ] Run focused checks and render a local preview in the existing Chrome session. Inspect every homepage section at 375px and 1920px, all focus/hover states, portrait sharpness and long titles. Check 200% text zoom and reduced motion. Use a fixed-width iframe if window resizing does not set the viewport. Record evidence in `docs/release-readiness.md`; do not claim this is a live deployment check.
- [ ] Run `scripts/check`, `scripts/test`, the current production build and `git diff --check`. Commit: `feat: apply the approved plumber homepage`.

## Task 4: Repair the Agent Playbook

Files: modify `client/public/pages/agent-playbook.html`, `client/src/content/reports.json`, `docs/content-review.md`; create `scripts/playbook.test.ts`.

Consumes: Task 4 section of the editorial contract. Produces: a corrected local report at its existing URL, with reviewed primary citations and an actual revision date. Publication remains pending until explicitly resolved.

- [ ] Reopen the named primary references and record support for each retained claim. Apply every row of the Playbook correction table, including the opening, statistics, memory leaderboard, legal timeline and framework comparisons. Search the entire document for repeated versions of removed claims, including SVG text, attributes and source notes.
- [ ] Use this semantic structure for the retained framework comparison. Only add rows whose wording is recorded in the claim review:

```html
<div class="table-scroll" role="region" aria-label="Framework comparison" tabindex="0">
  <table>
    <caption>Documented deployment patterns</caption>
    <thead><tr><th scope="col">Framework</th><th scope="col">Documented deployment pattern</th><th scope="col">Documentation</th></tr></thead>
    <tbody>
      <tr><th scope="row">Mastra</th><td>TypeScript framework for building agents.</td><td><a href="https://mastra.ai/docs">Mastra documentation</a></td></tr>
    </tbody>
  </table>
</div>
```

This is a documented example, not a recommendation or ranking. Remove unverifiable rows rather than inventing neutral-looking scores.
- [ ] Add a main landmark and Back to Library link where missing. Keep original issue date separate from the actual revision date. Use a visible `time` element for the revision, with `datetime` equal to this report's actual `revisedOn` value. Apply this same convention to Tasks 5–7. Put `<!--site-head-->` once inside head for Task 8 metadata. Remove old canonical/social/JSON-LD tags only where Task 8 replaces them. Preserve the internal-use markers until the publication decision is recorded.
- [ ] Add the removal regression test, then inspect remaining prose manually against the claim record:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
test("playbook no longer publishes unsupported rankings or a blanket legal deadline", () => {
  const html = readFileSync("client/public/pages/agent-playbook.html", "utf8");
  for (const phrase of ["247K", "95.6K", "94.87%", "August 2026 is the deadline", "forces every production social agent", "5–40×"])
    assert.ok(!html.includes(phrase), phrase);
  assert.ok(html.includes("Illustrative observation log") || !html.includes("actual format"));
  assert.ok(html.includes('href="/#library"'));
});
```

- [ ] Check phone/desktop layout, diagram text equivalents, keyboard, no-JS and blocked-font behavior. Populate this report's `revisedOn` with the actual edit date and `citations` with the retained visible primary references. Run `scripts/check`, `scripts/test`, the production build and `git diff --check`. Commit: `fix: remove unsupported playbook claims`.

## Task 5: Replace the unsourced roundup with a sourced April edition

Files: modify `client/public/pages/april-2026-ai-agent-roundup.html`, `client/src/content/reports.json`, `docs/content-review.md`; create `client/public/assets/css/reports.css`, `scripts/roundup.test.ts`.

Consumes: Task 5 editorial contract. Produces: four sourced announcements, a short evaluation note and ordinary anchor navigation at the existing URL. No leaderboard, allegations or runtime CSS dependency survives.

- [ ] Verify the four linked announcements, including the announcement/release distinction recorded in the contract. Record their dates and exact retained wording in the claim review.
- [ ] Replace the current report body with the contract's title, opening, chronology and closing note. Use this structure, filling its four rows with the exact contract entries:

```html
<link rel="stylesheet" href="/assets/css/reports.css">
<!--site-head-->
<body class="report-page">
  <header><a href="/#library">Back to Library</a></header>
  <main>
    <h1>The April 2026 AI Agent Roundup</h1>
    <p>Originally compiled April 25, 2026.</p>
    <p>Selected agent-tool announcements from April 2026, with links to the original announcements.</p>
    <nav aria-label="Report sections"><a href="#announcements">Announcements</a> <a href="#evaluation">Evaluation</a></nav>
    <section id="announcements" aria-labelledby="announcements-heading">
      <h2 id="announcements-heading">Announcements</h2>
      <ol class="chronology">
        <li><time datetime="2026-04-02">April 2, 2026</time><p>Cursor announced its Agents Window for working with agents across repositories and environments.</p><a href="https://forum.cursor.com/t/cursor-3-new-cursor-interface/156506">Cursor announcement</a></li>
        <li><time datetime="2026-04-03">April 3, 2026</time><p>Microsoft announced Agent Framework 1.0 for .NET and Python.</p><a href="https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/">Microsoft announcement</a></li>
        <li><time datetime="2026-04-16">April 16, 2026</time><p>Anthropic introduced Claude Opus 4.7.</p><a href="https://www.anthropic.com/news/claude-opus-4-7">Anthropic announcement</a></li>
        <li><time datetime="2026-04-23">April 23, 2026</time><p>OpenAI introduced GPT-5.5.</p><a href="https://openai.com/index/introducing-gpt-5-5/">OpenAI announcement</a></li>
      </ol>
    </section>
    <section id="evaluation" aria-labelledby="evaluation-heading">
      <h2 id="evaluation-heading">Evaluation</h2>
      <p>Choose tools against a representative task. Check the current documentation, evaluate failure handling, and record the cost of a completed workflow.</p>
    </section>
  </main>
</body>
```

The link and metadata marker belong in head, not body. Keep the real doctype, language, charset and viewport. Add the actual revision date visibly, and retain any accurate historical AI production credit as described in the contract. Do not attribute the report to Philip without confirmation.

- [ ] Write the small local stylesheet. Start with these layout/accessibility rules; reuse existing report colors only when contrast passes:

```css
.report-page { margin: 0; background: #121416; color: #ede9df; font: 18px/1.65 Arial, Helvetica, sans-serif; }
.report-page header, .report-page main { max-width: 56rem; margin: auto; padding: 1.5rem; }
.report-page h1 { font-size: clamp(2.2rem, 6vw, 4rem); line-height: 1.1; }
.report-page h2 { margin-top: 2.5rem; }
.report-page a { color: #e2b782; text-underline-offset: .2em; overflow-wrap: anywhere; }
.report-page a:focus-visible { outline: 3px solid #e2b782; outline-offset: 5px; }
.report-page time { font-size: 14px; color: #b5a999; }
.chronology { padding-left: 1.4rem; }
.chronology li { padding: 1rem 0; }
.table-scroll { max-width: 100%; overflow-x: auto; }
table { border-collapse: collapse; } th, td { padding: .75rem; text-align: left; vertical-align: top; }
@media (max-width: 700px) { .report-page { font-size: 16px; } }
```

- [ ] Test that unsupported material and script dependence are absent:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
test("roundup is a linked chronology without runtime tabs or allegations", () => {
  const html = readFileSync("client/public/pages/april-2026-ai-agent-roundup.html", "utf8");
  assert.ok(html.includes('href="/assets/css/reports.css"'));
  for (const text of ["120+", "15 PROJECTS", "MemPalace", "GBrain", "cdn.tailwindcss.com", "onclick=", "<script"])
    assert.ok(!html.includes(text), text);
  for (const domain of ["forum.cursor.com", "devblogs.microsoft.com", "anthropic.com/news", "openai.com/index"])
    assert.ok(html.includes(domain), domain);
});
```

This source has no script; generated JSON-LD will be added to its built copy later. Check that no old menu or footer references removed sections.
- [ ] Populate report revision/citations and check every section at phone/desktop widths, keyboard, 200% text zoom and no JS. Run `scripts/check`, `scripts/test`, build and `git diff --check`. Commit: `fix: replace unsourced roundup with primary announcements`.

## Task 6: Replace the taste ranking with sourced comparisons

Files: modify `client/public/pages/taste-landscape.html`, `client/src/content/reports.json`, `docs/content-review.md`; create `scripts/taste.test.ts`.

Consumes: Task 6 editorial contract. Produces: a sourced comparison and clearly labelled evaluation proposals at the existing URL, without invented effectiveness/accessibility scores.

- [ ] Verify the ACE, GEPA and persona-vector sources. Apply every replacement/removal in the contract, including repeated claims deep in the report. Keep source limitations beside the claim they constrain.
- [ ] Replace the scatterplot and its hardcoded point data with the contract's four-column table. Use a caption “Selected personalization approaches,” `th scope="col"` headers and method names as `th scope="row"`. Remove chart-only CSS, hover tooltips and JavaScript created for that chart.
- [ ] Replace each retained expander with native disclosure markup. Do not hide prose behind an `onclick`, style mutation or collapsed class:

```html
<details>
  <summary>Evaluation questions</summary>
  <p>Combining these techniques is a design hypothesis. A useful evaluation would test whether the combination preserves the author’s choices.</p>
</details>
```

Retain only meaningful subsections supported by the reduced content. Use `#B5A999` for substantive muted text on the existing dark surfaces, at least 14px metadata and 16px phone body copy. Add main, Back to Library, actual revision date and one `<!--site-head-->` marker.
- [ ] Add the regression test and review the full visible prose against sources:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
test("taste report has no invented chart scores or script-only disclosure", () => {
  const html = readFileSync("client/public/pages/taste-landscape.html", "utf8");
  for (const text of ["GEPA &gt; HAND-WRITTEN PROMPTS, ALWAYS", "GEPA > HAND-WRITTEN PROMPTS, ALWAYS", "strictly better", "onclick=", "eff:", "acc:"])
    assert.ok(!html.includes(text), text);
  assert.match(html, /<details[\s>]/);
  assert.match(html, /<summary[\s>]/);
  assert.ok(html.includes("Selected personalization approaches"));
  assert.ok(html.includes("does not establish a percentage"));
});
```

- [ ] Verify table scrolling stays inside its labelled region. Open and close every retained disclosure with keyboard and disabled JavaScript. Check all phone/desktop sections and contrast pairs. Populate revision/citations, run all current checks and build, then commit: `fix: replace unsupported taste scores with sourced methods`.

## Task 7: Correct mobile automation guidance

Files: modify `client/public/pages/mobile-agent-nodes.html`, `client/src/content/reports.json`, `docs/content-review.md`; create `scripts/mobile.test.ts`.

Consumes: Task 7 editorial contract and current official tool docs. Produces: qualified, dated technical guidance and an unchecked accessible setup list. No claim of actual device testing.

- [ ] Recheck current PhoneAgent, agent-device and Mobilerun documentation and record checked dates. Apply the exact qualified copy in the contract. Replace blanket platform symbols with tool-specific documentation links and documented requirements. Remove unverified installation commands, setup-time promises and untested Termux recipes.
- [ ] Use the complete fieldset/checklist HTML and responsive CSS from the editorial contract. Start every checkbox unchecked. Keep descriptive labels and change the first device exercise to reading the OS version. Remove unsupported recommendations from the decision tree instead of changing their rank.
- [ ] Add the original May date, actual technical revision date, main landmark, Back to Library, visible diagram equivalents and one `<!--site-head-->` marker. Improve the low-contrast small text using the contract's values.
- [ ] Add the regression test, including the stale compatibility statements found during editing:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
test("mobile guide does not pre-claim completed setup or universal compatibility", () => {
  const html = readFileSync("client/public/pages/mobile-agent-nodes.html", "utf8");
  assert.doesNotMatch(html, /<input\b[^>]*\bchecked(?:\s|=|>)/i);
  for (const text of ["5–15 minutes", "physical path works fine", "Quick setup, same for all tools"])
    assert.ok(!html.includes(text), text);
  assert.ok(html.includes("Open Settings and read the device’s OS version"));
  assert.ok(html.includes("mobilerun-ios"));
  assert.ok(html.includes("supported commands vary by target"));
});
```

- [ ] Check the complete report with keyboard, no JS, blocked fonts, phone/desktop widths and enlarged text. Confirm phone checkboxes are one column and have usable targets. Populate revision/citations, run all current checks and build, then commit: `fix: correct mobile automation compatibility guidance`.

## Task 8: Produce static HTML, truthful metadata and a controlled public artifact

Files: create `client/src/entry-server.tsx`, `scripts/{metadata,html,build-site,check-built}.ts`, `scripts/{metadata,publication,build}.test.ts`, `scripts/publication.json`, `scripts/build`, `scripts/verify`; modify `client/index.html`, `client/src/main.tsx`, `vite.config.ts`, `package.json`, `client/public/robots.txt`, `docs/release-readiness.md`.

Consumes: all preceding tasks. Produces: complete HTML at `dist/public/index.html`, separate `404.html` and `404/index.html`, approved report documents, images, sitemap and build receipt. No executable homepage JavaScript or runtime feed request is needed.

- [ ] Establish the publication inventory before copying files. `scripts/publication.json` contains one record per existing source file, plus the generated public assets from Task 3. Fields: `path` relative to `client/public`, `decision: "include" | "exclude" | "pending"`, `reviewAction: "include" | "exclude"`, `reason`, and `evidence` linking the human decision or existing approved spec. No `../`, absolute paths, symlinks or globs are accepted. Enumerate tracker files at execution rather than assuming there is only one.

| Source                                                                                  | Initial disposition                         | Release requirement                                                                      |
| --------------------------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `CNAME`, approved new assets, old public portrait/background assets                     | Include                                     | Preserve CNAME exactly; old assets retained for URL compatibility.                       |
| Roundup, Taste, Mobile reports                                                          | Include after Tasks 5–7                     | Editorial evidence and revised/cited metadata must be complete.                          |
| Playbook                                                                                | Pending; include for local review           | Explicit approval to publish the corrected brief, or an explicit withdrawal disposition. |
| `pages/content-topic-synthesis.html`                                                    | Pending; exclude from local review artifact | Recommend exclude from public artifact, preserve source. User decides.                   |
| `pages/untweeted/agent-self-improve.jpg` and any other current files under `untweeted/` | Pending; exclude from local review artifact | User decides whether these belong on the public site.                                    |
| Every current `pages/tracker/**` file                                                   | Pending; exclude from local review artifact | User decides public disposition. Preserve source and external automation.                |
| `robots.txt`                                                                            | Include with revised content                | Generated sitemap reference; no misleading privacy claim.                                |

Public exclusion changes deployment output but does not delete source or Git history. A withdrawal decision must specify the old URL behavior: a genuine 404 using the site's custom 404 is the default proposed behavior, without a misleading redirect to the homepage. A retained tracker must be copied unchanged from fresh main. An excluded tracker requires a separately authorized change to the publication inventory, not an edit to its content or cron.

- [ ] Implement a pure publication gate and tests. Export these from `scripts/build-site.ts` without executing a build on import. Parse records with a strict Zod schema before calling the gate.

```ts
import { z } from "zod";
export const PublicationEntrySchema = z.object({
  path: z.string().min(1).refine((p) => !p.startsWith("/") &&
    !p.includes("\\") && p.split("/").every((part) => part && part !== "." && part !== "..")),
  decision: z.enum(["include", "exclude", "pending"]),
  reviewAction: z.enum(["include", "exclude"]),
  reason: z.string().min(1),
  evidence: z.string().min(1),
}).strict();
export type PublicationEntry = z.infer<typeof PublicationEntrySchema>;
export function selectPublicFiles(entries: PublicationEntry[], mode: "review" | "release"): string[] {
  if (new Set(entries.map((e) => e.path)).size !== entries.length)
    throw new Error("Duplicate publication paths");
  const pending = entries.filter((e) => e.decision === "pending");
  if (mode === "release" && pending.length)
    throw new Error(`Unresolved publication decisions: ${pending.map((e) => e.path).join(", ")}`);
  return entries.filter((e) => e.decision === "include" ||
    (mode === "review" && e.decision === "pending" && e.reviewAction === "include"))
    .map((e) => e.path);
}
```

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { selectPublicFiles, PublicationEntrySchema } from "./build-site";
test("pending public material blocks release and has an explicit local review behavior", () => {
  const entries = [PublicationEntrySchema.parse({ path: "pages/internal.html",
    decision: "pending", reviewAction: "exclude", reason: "Needs decision", evidence: "docs/HANDOFF.md" })];
  assert.throws(() => selectPublicFiles(entries, "release"), /Unresolved/);
  assert.deepEqual(selectPublicFiles(entries, "review"), []);
});
test("publication paths cannot escape the public directory", () => {
  assert.equal(PublicationEntrySchema.safeParse({ path: "../.env",
    decision: "include", reviewAction: "include", reason: "fixture", evidence: "fixture" }).success, false);
});
```

Separately compare the recursive source inventory to the manifest: every current public file must have a disposition, every included file must exist, and no source entry may be a symlink. Fail on extra or missing files. This makes future cron-created files a visible decision, rather than silently publishing them. Export this shared assertion from `scripts/html.ts` and use it for both source and built-output inventories:

```ts
export function assertFileInventory(actual: string[], expected: string[]): void {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  const extra = actual.filter((p) => !expectedSet.has(p));
  const missing = expected.filter((p) => !actualSet.has(p));
  if (extra.length || missing.length || actualSet.size !== actual.length || expectedSet.size !== expected.length)
    throw new Error(`File inventory mismatch; extra: ${extra.join(", ")}; missing: ${missing.join(", ")}`);
}
```

- [ ] Replace the homepage HTML template with an owned head/body slot and direct CSS entry. Keep charset, language and viewport. Remove old title, description, Google Font requests, canonical, social metadata and Person JSON-LD because the builder owns those tags now.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/src/index.css">
    <!--site-head-->
  </head>
  <body>
    <div id="root"><!--site-body--></div>
    <!--dev-entry:start-->
    <script type="module" src="/src/main.tsx"></script>
    <!--dev-entry:end-->
  </body>
</html>
```

Remove the duplicate CSS import from `main.tsx`. Keep its development React mounting behavior. For Vite development, inject the reviewed homepage title/meta through the same metadata function only if needed for review; do not fetch RSS in the browser.

- [ ] Extend the existing Vite configuration with this build-only transform. Keep current aliases/plugins/root. Set `build.copyPublicDir: false` for both builds. Set `appType: "mpa"` so preview does not mask unknown paths with the homepage. The transform runs before Vite discovers the development JS entry:

```ts
{
  name: "static-production-entry",
  apply: "build",
  transformIndexHtml: {
    order: "pre",
    handler(html) {
      const block = /<!--dev-entry:start-->[\s\S]*?<!--dev-entry:end-->/g;
      if ([...html.matchAll(block)].length !== 1) throw new Error("Expected one dev-entry block");
      return html.replace(block, "");
    },
  },
}
```

Vite 7.1.9 supports this hook and `build.copyPublicDir`; these were checked against its tagged source. Do not substitute current Vite 8-only APIs.

- [ ] Add `entry-server.tsx`. Render the page components directly, without browser-dependent providers or router state:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import type { HomeProps } from "./content/contracts";
export function renderHome(props: HomeProps): string {
  return renderToStaticMarkup(<Home {...props} />);
}
export function renderNotFound(): string {
  return renderToStaticMarkup(<NotFound />);
}
```

- [ ] Generate metadata from the same records used by visible components. Export `homeGraph(): object`, `reportGraph(report: ReportRecord): object`, `jsonLd(value: unknown): string`, `homeHead(): string`, `reportHead(report: ReportRecord): string`, and `notFoundHead(): string` from `scripts/metadata.ts`. The homepage graph is exactly this shape:

```ts
export function homeGraph() {
  const root = `${site.origin}/`;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": `${root}#website`, url: root, name: site.name },
    { "@type": "ProfilePage", "@id": `${root}#webpage`, url: root,
      name: site.name, inLanguage: "en", isPartOf: { "@id": `${root}#website` },
      mainEntity: { "@id": `${root}#person` } },
    { "@type": "Person", "@id": `${root}#person`, name: site.name, url: root,
      description: site.bio, sameAs: [...site.sameAs],
      affiliation: { "@type": "Organization", name: site.company.name, url: site.company.url },
      image: { "@type": "ImageObject", url: `${site.origin}/assets/img/portrait-1122.webp`,
        caption: "Illustrated portrait of Philip Bankier", width: 1122, height: 1402 } },
  ] };
}
export function reportGraph(report: ReportRecord) {
  const url = site.origin + report.path;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: report.title,
      inLanguage: "en", isPartOf: { "@id": `${site.origin}/#website` },
      mainEntity: { "@id": `${url}#article` } },
    { "@type": "Article", "@id": `${url}#article`, url,
      headline: report.title, description: report.summary, inLanguage: "en",
      mainEntityOfPage: { "@id": `${url}#webpage` },
      ...(report.revisedOn ? { dateModified: report.revisedOn } : {}),
      citation: report.citations.map((url) => ({ "@type": "CreativeWork", url })),
    },
  ] };
}
export function jsonLd(value: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(value)
    .replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029")}</script>`;
}
```

Use ProfilePage because the homepage introduces one person. It already is a WebPage; do not add a second homepage WebPage node. GitHub is the only confirmed identity link in `sameAs`. The newsletter is a publication, not a second identity profile. Omit unverified Twitter/LinkedIn profiles, jobTitle redundancy, employer inference, follower counts, awards, ratings, invented creation dates and fundraising claims.

The corrected reports are prose articles, not scholarly papers merely because they cite research. Omit `author`, `publisher` and `datePublished` because hosting and original document labels do not establish those facts. `dateModified` is the actual editorial revision date displayed in the document, not build time. Do not use an AI tool credit as a Person author. If a report becomes chiefly an interactive tool rather than prose, revise the type deliberately to CreativeWork instead of forcing Article.

- [ ] Escape all text/attribute values in head tags. Generate homepage title `Philip Bankier`, the Task 1 description, canonical `https://philipbankier.com/`, theme color, SVG/PNG icons, OG type `website`, OG name/title/description/url/image, image dimensions and alt; use `summary_large_image` for the social card. Do not add a Twitter creator handle without verification.

```ts
const escapeHtml = (value: string) => value.replace(/[&<>"']/g,
  (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const meta = (key: string, value: string, property = false) =>
  `<meta ${property ? "property" : "name"}="${key}" content="${escapeHtml(value)}">`;
export function homeHead(): string {
  const root = `${site.origin}/`;
  const image = `${site.origin}/assets/img/social-card.jpg`;
  return [
    `<title>${escapeHtml(site.name)}</title>`, meta("description", site.description),
    `<link rel="canonical" href="${root}">`,
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">',
    meta("theme-color", "#d3dbd4"), meta("og:type", "website", true),
    meta("og:site_name", site.name, true), meta("og:title", site.name, true),
    meta("og:description", site.description, true), meta("og:url", root, true),
    meta("og:image", image, true), meta("og:image:width", "1200", true),
    meta("og:image:height", "630", true),
    meta("og:image:alt", "Philip Bankier, work and writing", true),
    meta("twitter:card", "summary_large_image"), jsonLd(homeGraph()),
  ].join("\n");
}
export function reportHead(report: ReportRecord): string {
  const url = site.origin + report.path;
  return [
    `<title>${escapeHtml(report.title)} | Philip Bankier</title>`,
    meta("description", report.summary), `<link rel="canonical" href="${escapeHtml(url)}">`,
    meta("og:type", "article", true), meta("og:title", report.title, true),
    meta("og:description", report.summary, true), meta("og:url", url, true),
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    jsonLd(reportGraph(report)),
  ].join("\n");
}
export function notFoundHead(): string {
  return '<title>Page not found | Philip Bankier</title>\n<meta name="robots" content="noindex">\n<link rel="icon" type="image/svg+xml" href="/favicon.svg">';
}
```

No homepage canonical or Person graph goes onto the 404. Do not attach the portrait card to reports as if it were an article illustration.

- [ ] Test schema semantics and escaping, not just JSON syntax:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { homeGraph, reportGraph, jsonLd, notFoundHead } from "./metadata";
import { reports, site } from "../client/src/content/site";
test("profile graph describes the visible identity without unrelated sameAs links", () => {
  const graph = homeGraph()["@graph"];
  const person = graph.find((n) => n["@type"] === "Person")!;
  assert.equal(person.description, site.bio);
  assert.deepEqual(person.sameAs, ["https://github.com/philipbankier"]);
  assert.ok(!JSON.stringify(graph).includes("datePublished"));
  assert.equal(graph.filter((n) => n["@type"] === "ProfilePage").length, 1);
});
test("report schema does not infer authorship or publication from document dates", () => {
  for (const report of reports) {
    const encoded = JSON.stringify(reportGraph(report));
    assert.ok(!encoded.includes('"author"'));
    assert.ok(!encoded.includes('"datePublished"'));
    assert.ok(encoded.includes(report.path));
  }
  assert.ok(!notFoundHead().includes("canonical"));
  assert.ok(!notFoundHead().includes("application/ld+json"));
});
test("JSON-LD cannot close its script element", () => {
  const html = jsonLd({ name: "</script><script>alert(1)</script>" });
  assert.equal((html.match(/<script/g) ?? []).length, 1);
  assert.equal((html.match(/<\/script>/g) ?? []).length, 1);
  assert.ok(html.includes("\\u003c"));
});
```

- [ ] Implement owned-slot replacement in `scripts/html.ts`, with exact-count assertions. Never append another canonical or JSON-LD block when one already exists. Task 4–7 source report heads must have their old title/description/canonical/social/JSON-LD removed before insertion; preserve their stylesheet, font fallback, charset and viewport tags.

```ts
export function replaceSlot(html: string, slot: "head" | "body", value: string): string {
  const marker = `<!--site-${slot}-->`;
  if (html.split(marker).length !== 2) throw new Error(`Expected one ${marker}`);
  return html.replace(marker, () => value);
}
```

- [ ] Orchestrate in this order: validate publication inputs; resolve writing once; run normal Vite CSS/template build; compile the SSR entry outside public output; import it; render with the resolved data and included report records; fill slots; copy only selected files; rewrite selected report heads; generate sitemap/robots; verify artifact; save an ignored receipt. Use the built template for both page types before overwriting index.

```ts
import { build } from "vite";
import path from "node:path";
import { pathToFileURL } from "node:url";
const root = process.cwd();
await build({ build: { copyPublicDir: false } });
await build({ build: {
  ssr: path.join(root, "client/src/entry-server.tsx"),
  outDir: path.join(root, "build/render"), emptyOutDir: true, copyPublicDir: false,
  rollupOptions: { output: { entryFileNames: "entry-server.js" } },
} });
const renderer = await import(pathToFileURL(path.join(root, "build/render/entry-server.js")).href);
```

Export `buildSite(mode: "review" | "release"): Promise<void>`. Run it only when invoked as the CLI entry, using `process.argv[1]` versus `fileURLToPath(import.meta.url)`. The default mode is release; `--review` is an explicit local-only mode and prints pending decisions. No environment variable can silently downgrade a release to review mode.

`renderHome` gets `{writing, reports: visibleReports}`. Compute visibleReports by filtering Task 1 records against selected public report paths, so a withdrawn report cannot leave a homepage link. Write a distinct `404.html` and identical `404/index.html` from `renderNotFound()`. Do not copy index.html as 404. All asset URLs remain root-relative, so nested error paths work.

The sitemap includes the homepage and approved library reports only, with canonical HTTPS URLs and no invented `lastmod`. Do not list 404, withdrawn files, unlisted operational material or the tracker by accident. Generate `robots.txt` as:

```text
User-agent: *
Allow: /
Sitemap: https://philipbankier.com/sitemap.xml
```

The receipt at `build/release-receipt.json` records mode, source commit, dirty status, included/excluded/pending paths, SHA-256 output hashes, writing source/fetchedAt/failure reason, and check results. Never put credentials, private contribution data or the historical env file in it.

- [ ] Use parse5 in `check-built.ts` to traverse the actual generated HTML, not regex to pretend to validate arbitrary markup. Export `verifyArtifact(directory: string, expectedFiles: string[]): Promise<void>`. Build the expected file set from Vite's emitted assets plus selected/copied/generated paths, excluding Vite's temporary template until replaced. Compare it to recursive disk output. Require all of these invariants:

  - Every homepage section and current report link is present; all internal anchor IDs resolve and all local href/src/srcset targets exist, including fonts and CSS URLs where retained.
  - Homepage and 404 have no executable scripts, modulepreload, event-handler attributes or unreplaced owned markers. JSON-LD is allowed and must parse.
  - Each page has one title, one main and one h1. Homepage has one canonical and one graph. Selected reports have one canonical for their own path and one Article graph matching visible title, revision date and citation links.
  - No JSON-LD author or publication date appears without the deliberately extended verified contract. No `localhost`, obsolete domains, unsupported role labels or removed decorative copy is present in generated metadata or active homepage content.
  - 404 outputs have noindex, a native `/` link, no homepage canonical, and no Person graph. They differ from index.
  - Each approved report path contains its actual title and article content, not the homepage or a fallback shell. Each report revision and source list is nonempty after Tasks 4–7.
  - CNAME is exactly the current verified custom domain. Sitemap entries are the selected library/home URLs, not build-server URLs.
  - Portrait files decode with reserved aspect ratios; social card is 1200×630; favicon exists. Target each portrait variant at no more than 250 KiB and social card at no more than 300 KiB. If quality prevents a target, report the measured tradeoff before accepting it; do not silently degrade the portrait.

- [ ] Add a parse5-based static-document guard in `scripts/html.ts`. It is one of the checks called by `verifyArtifact`, alongside its path, metadata/content and image checks. This is the implementation shape for structural inspection:

```ts
import { parse } from "parse5";
type InspectNode = { nodeName: string; tagName?: string; namespaceURI?: string;
  attrs?: { name: string; value: string }[]; childNodes?: InspectNode[]; value?: string };
export function assertStaticDocument(html: string, kind: "home" | "report" | "404"): void {
  const elements: InspectNode[] = [];
  const visit = (node: InspectNode) => {
    if (node.tagName) elements.push(node);
    node.childNodes?.forEach(visit);
  };
  visit(parse(html));
  const attr = (node: InspectNode, name: string) => node.attrs?.find((a) => a.name === name)?.value;
  for (const tag of ["main", "h1", "title"])
    if (elements.filter((e) => e.tagName === tag && e.namespaceURI === "http://www.w3.org/1999/xhtml").length !== 1)
      throw new Error(`Expected one ${tag}`);
  const canonicals = elements.filter((e) => e.tagName === "link" && attr(e, "rel") === "canonical");
  if (canonicals.length !== (kind === "404" ? 0 : 1)) throw new Error("Wrong canonical count");
  for (const element of elements) {
    if (element.attrs?.some((a) => a.name.startsWith("on"))) throw new Error("Inline event handler");
    if (element.tagName === "script") {
      if (kind === "404" || attr(element, "type") !== "application/ld+json" || attr(element, "src"))
        throw new Error("Unexpected script");
      JSON.parse(element.childNodes?.map((n) => n.value ?? "").join("") ?? "");
    }
    if (element.tagName === "link" && attr(element, "rel") === "modulepreload")
      throw new Error("Unexpected module preload");
  }
  if (html.includes("<!--site-") || html.includes("<!--dev-entry:")) throw new Error("Unfilled template marker");
  if (kind === "404" && !elements.some((e) => e.tagName === "meta" &&
      attr(e, "name") === "robots" && attr(e, "content")?.includes("noindex")))
    throw new Error("404 must be noindex");
}
```

Reports use native interactions after Tasks 4–7, so executable scripts are unnecessary there too. Apply this guard to the homepage, 404 and four promoted reports, not blindly to an unchanged tracker. Any retained unlisted material requires its own recorded public-content review or a clearly stated limitation; permission to publish it is not proof of its factual accuracy.

- [ ] Add these actual boundary tests to `scripts/build.test.ts`. The full release build then exercises `verifyArtifact` against real output, including report text, citations and image dimensions:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { assertFileInventory, assertStaticDocument, replaceSlot } from "./html";
import { homeHead, notFoundHead, jsonLd } from "./metadata";
const page = (head: string, body: string) =>
  `<!doctype html><html lang="en"><head>${head}</head><body>${body}</body></html>`;
test("missing images, missing reports and unexpected public files fail inventory", () => {
  const expected = ["index.html", "assets/img/portrait-640.webp", "pages/taste-landscape.html"];
  assert.throws(() => assertFileInventory(expected.slice(0, 1), expected), /missing/);
  assert.throws(() => assertFileInventory([...expected, "pages/internal.html"], expected), /extra/);
  assert.doesNotThrow(() => assertFileInventory(expected, [...expected].reverse()));
});
test("a duplicate template slot cannot duplicate canonical or identity metadata", () => {
  assert.throws(() => replaceSlot("<!--site-head--><!--site-head-->", "head", homeHead()), /Expected one/);
});
test("an SPA shell or copied homepage cannot serve as the static 404", () => {
  assert.throws(() => assertStaticDocument(page(homeHead(), '<div id="root"></div><script src="/app.js"></script>'), "home"));
  assert.throws(() => assertStaticDocument(page(homeHead(), "<main><h1>Philip Bankier</h1></main>"), "404"));
  assert.doesNotThrow(() => assertStaticDocument(page(notFoundHead(), '<main><h1>Page not found</h1><a href="/">Home</a></main>'), "404"));
});
test("escaped JSON-LD remains data while executable scripts fail", () => {
  const head = '<title>Fixture</title><link rel="canonical" href="https://philipbankier.com/">';
  assert.doesNotThrow(() => assertStaticDocument(page(head + jsonLd({ name: "</script><script>alert(1)</script>" }), "<main><h1>Fixture</h1></main>"), "home"));
  assert.throws(() => assertStaticDocument(page(head, '<main><h1>Fixture</h1><script>alert(1)</script></main>'), "home"), /Unexpected script/);
});
```
- [ ] Wire `scripts/build` to `pnpm exec tsx scripts/build-site.ts "$@"`, and `scripts/verify` to `pnpm exec tsx scripts/check-built.ts`. Both use `#!/bin/sh` and `set -eu`. Add package scripts:

```json
{
  "check": "scripts/check",
  "test": "scripts/test",
  "build:gh": "scripts/check && scripts/test && scripts/build && scripts/verify",
  "build:review": "scripts/check && scripts/test && scripts/build --review && scripts/verify",
  "writing:refresh": "tsx --tsconfig tsconfig.scripts.json scripts/refresh-writing.ts"
}
```

Keep `build` pointing at `build:gh`. Existing GitHub Pages CI already runs `build:gh`, so it now enforces these gates without a workflow edit. A release build must fail while publication decisions remain pending. A successful local review build is not permission to merge it.
- [ ] Run tests, typechecks and `build:review`; confirm `build:gh` fails with the exact pending decisions until resolved. Validate generated ProfilePage and report JSON-LD in Schema.org Validator and Google's Rich Results Test. Missing recommended author/date fields are an evidence decision, not something to fabricate for a green badge. Record findings and any actual errors; do not promise rich-result eligibility.
- [ ] Resolve publication dispositions from explicit user decisions. If a page is withdrawn, remove its homepage entry through the manifest filter and verify its path is absent from release output. If tracker publication is retained, compare copied bytes to fresh source and preserve automation untouched. Then run `build:gh` successfully. If decisions remain unanswered, commit a clearly non-release-ready branch and stop before public preview/push; do not call the site ready.
- [ ] Scan staged changes for secrets, run `git diff --check`, and commit: `feat: build static pages with verified metadata`.

## Task 9: Acceptance review and deployment handoff

Files: modify `docs/release-readiness.md`, `docs/content-review.md`, `README.md`. Application fixes found during acceptance return to their owning task and checks. No workflow or tracker edits are authorized by this task.

Consumes: a passing release artifact and resolved publication decisions. Produces: a reviewed feature branch, exact candidate SHA, verified preview, evidence and a concrete release decision. Deployment remains a separate authorized action after candidate review.

- [ ] Update README with Node/pnpm requirements, `scripts/check`, `scripts/test`, `build:review`, `build:gh`, `writing:refresh`, the reviewed-fallback process and publication inventory. Link the existing project AGENTS.md instead of duplicating agent instructions. Do not edit AGENTS.md without approval.
- [ ] Reconcile fresh main before final checks using `git fetch origin` and `git rebase origin/main` on this feature branch. Classify new tracker commits by `client/public/pages/tracker/**`, not author or message. Re-enumerate public inventory after rebase. Resolve real conflicts with review; never discard external content to make a build pass.
- [ ] Run all repository checks once against the reconciled candidate: `scripts/check`, `scripts/test`, `pnpm run build:gh`, `git diff --check`, and any lint script that now exists. Record command, exit status, candidate SHA and receipt path. There was no configured linter at plan time; do not claim lint passed unless one actually ran.
- [ ] Serve `dist/public` locally with a static server, not an SPA fallback. For example `python3 -m http.server 4173 --directory dist/public`. Its generic unknown-path response is not GitHub Pages' custom 404 proof; inspect `/404.html` locally and reserve real missing-path verification for Pages.
- [ ] In the existing Chrome session, review the entire homepage and every promoted report at 1920×1080 and 375px, plus an intermediate 768px check. Record full-page and first-viewport screenshots. Check all text, clipping, spacing, portrait resolution, long repo names, table regions, arrows, focus, hover, reduced motion, 200% text zoom, disabled JavaScript and blocked third-party fonts. No content can depend on a reveal effect or delayed load.
- [ ] Exercise skip link, every nav anchor, old `#ledger`/`#open-source` fragments, View work, Back to top, contact mailto, all project/repository links and each distinct post link. Verify report direct paths and Back to Library. Check every retained details/summary and checkbox with keyboard. Do not claim a mailto proves inbox delivery or that documentation proves device functionality.
- [ ] Validate every external destination through GET or the relevant API and inspect redirects. A HEAD failure alone does not prove a broken link. Record final URLs and unresolved failures. Recheck the eight repositories for public/non-fork/non-archived status, without publishing metrics. Stop on auth/rate limits per AGENTS.md; do not rotate accounts to evade limits.
- [ ] Give every retained copy block, control and graphic a purpose and evidence/disposition entry in `docs/content-review.md`. Check graph fields against the visible page. Remove unsupported additions rather than hiding them in metadata. Have one independent whole-branch reviewer inspect content, schema, build output and release risks after the final root review.
- [ ] Scan the staged diff for credentials without reading historical env contents. Confirm the current GitHub identity and repo, and check that the feature branch does not belong to an already merged PR. Commit documentation/fixes with a semantic title. After authorized implementation and resolved publication decisions, push only the feature branch and create a draft PR with a concise semantic title and body beginning “This PR...”. Do not include a test-plan section in the PR body. Attach the PR to this Codex task and open its URL in the default browser.
- [ ] Inspect any actual preview deployment. The repository has a Vercel integration, but its current alias is not proof a new preview works. Do not change hosting to manufacture a preview. If a hosted preview is unavailable, provide the reviewed local artifact and screenshots, clearly labelled local.
- [ ] Present the exact PR, candidate SHA, screenshots, checks, report reductions, publication decisions and any unresolved issue for release approval. Record the currently deployed production SHA and Pages configuration as rollback evidence. No direct push to main.
- [ ] Only after authorization to release the exact candidate, merge through the PR using the repository's allowed merge method. Confirm the GitHub Pages workflow completed for the resulting SHA, then check custom-domain HTTPS, homepage, asset responses, all four retained report paths, the sitemap and a random missing URL that must return HTTP 404. Recheck the primary links and metadata on the live domain. A green workflow alone is insufficient.
- [ ] If live acceptance fails, report the exact failure. Prepare a revert on a feature branch from the deployed merge, preserving later tracker-only changes; obtain approval if rollback was not already authorized. Never force-push or reset main. Finish only with verified live evidence, or clearly state that the branch is ready and deployment is still pending.

## Source notes and schema rationale

Sources checked for the plan on October 11, 2026; recheck changing product claims during execution. These references support the choice of vocabulary and build APIs, not a guarantee of search presentation.

- [Google ProfilePage guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page) and [Schema.org ProfilePage](https://schema.org/ProfilePage): one person is the homepage's main entity.
- [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): markup must represent the visible content.
- [Schema.org sameAs](https://schema.org/sameAs) and [affiliation](https://schema.org/affiliation): identity links and company affiliation are distinct relationships.
- [Google Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article), [publication-date guidance](https://developers.google.com/search/docs/appearance/publication-dates), [Schema.org Article](https://schema.org/Article) and [citation](https://schema.org/citation): avoid inferred authorship and publication dates; cite actual retained sources.
- [Google site-name guidance](https://developers.google.com/search/docs/appearance/site-names): WebSite name and canonical homepage URL.
- [React renderToStaticMarkup](https://react.dev/reference/react-dom/server/renderToStaticMarkup): static output does not hydrate.
- [Vite 7.1.9 build source](https://github.com/vitejs/vite/blob/v7.1.9/packages/vite/src/node/build.ts) and [HTML plugin source](https://github.com/vitejs/vite/blob/v7.1.9/packages/vite/src/node/plugins/html.ts): SSR output, controlled public copying and pre-build entry removal.
- [xmldom 0.9.12 API](https://github.com/xmldom/xmldom/blob/0.9.12/index.d.ts): strict XML error reporting.

## Plan self-review

Root self-review completed October 11, 2026. This section records planning coverage, not implementation completion. All spec sections map to tasks below. The five review-focus conditions have tests or explicit browser acceptance steps. Shared `HomeProps` now carries the filtered report set through Home, LibrarySection and the server renderer; this prevents withdrawn reports from retaining homepage links. Date contracts reject invalid calendar dates, fallback age is preserved, and duplicate feed conflicts fail validation. Document checks passed for code-fence balance, local links, task numbering, prohibited placeholders and shared interface names. No application tests or production build were run for this documentation-only change.

| Spec requirement                                                          | Task                       |
| ------------------------------------------------------------------------- | -------------------------- |
| Approved identity, projects, code links and restrained visual direction   | 1, 3                       |
| Responsive portrait, favicon and social card                              | 3, 8, 9                    |
| Build-time writing refresh and truthful fallback                          | 2, 3, 8                    |
| Core HTML and navigation without JavaScript, old fragments and actual 404 | 3, 8, 9                    |
| Exact corrections to all four linked reports                              | 4–7 and editorial contract |
| Public/unlisted inventory and explicit decisions                          | 8, 9                       |
| Accurate schema, canonical, robots and sitemap                            | 1, 8, 9                    |
| Real browser acceptance and verified deployment boundary                  | 9                          |
| No workflow/tracker/private-data scope expansion                          | Global constraints, 8, 9   |

Execution choices after plan review: Native keeps the shared content/build interfaces in one implementation session, followed by a fresh whole-branch review. Subagent-driven gives each task a fresh implementer and reviewer before proceeding. Native is recommended here because most tasks share the same content and release contracts; separate report commits still make substantive cuts easy to review.
