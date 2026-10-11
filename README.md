# Philip Bankier's personal site

Work, writing and research at [philipbankier.com](https://philipbankier.com/). React and TypeScript supply the page components. Vite renders complete static HTML and local CSS for GitHub Pages; visitors do not need JavaScript.

## Development

Use Node 22 and pnpm 10. The lockfile pins dependencies.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development app uses the reviewed writing snapshot. Agent-specific conventions are in [AGENTS.md](AGENTS.md). The approved redesign and editorial decisions are recorded in [the design](docs/superpowers/specs/2026-10-10-plumber-refinement-design.md) and [content review](docs/content-review.md).

## Checks and builds

```sh
scripts/check
scripts/test
pnpm run build:review
pnpm run build:gh
pnpm preview
```

`build:gh` runs typechecks and tests, builds `dist/public`, then verifies its HTML, metadata, links and asset inventory. `scripts/verify` also checks output hashes against `build/release-receipt.json`. No linter is configured. Review mode allows explicitly pending publication choices only for local review; release mode rejects them. Neither command deploys by itself.

The existing GitHub Actions workflow publishes `dist/public` when a change lands on `main`. Prepare changes on a feature branch and review the exact candidate before merging. `404.html` and `404/index.html` contain a distinct error page with a native home link. Local static-server behavior is not proof of the host's HTTP status handling.

## Writing updates

The build fetches The Living Edge's public RSS feed once. On ordinary network or parsing failures it uses `client/src/content/writing-reviewed.json` and shows that snapshot's original checked date. Authentication and rate-limit failures stop the build. Article URLs, dates and uniqueness are validated before rendering.

To prepare a replacement fallback:

```sh
pnpm writing:refresh
```

Review `build/writing-candidate.json` and its fetch receipt, checking the titles and links against the feed. Only then copy the candidate to `client/src/content/writing-reviewed.json` and commit it. Builds never overwrite the tracked fallback. Writing is refreshed at build time, not in visitors' browsers.

## Public content

Homepage records live in `client/src/content/site.ts`; reviewed report metadata lives in `client/src/content/reports.json`. Report HTML lives under `client/public/pages`. A revised report needs a real revision date and visible primary citations matching its metadata. Hosting a document does not establish its author or original publication timestamp.

`scripts/publication.json` gives every file under `client/public` an explicit disposition. New or missing files fail the build until reviewed. The corrected Playbook is included. The internal planning report, untweeted image and tracker are excluded from output while their source remains in Git. Exclusion does not erase repository history. Their old URLs should return the host's normal 404 after release.

Keep `CNAME` and the canonical origin aligned. Static output includes a sitemap of the homepage and the approved reports only. The build receipt records the source commit, writing source and artifact hashes. [Release evidence](docs/release-readiness.md) distinguishes local checks from deployed acceptance.
