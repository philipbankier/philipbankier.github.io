# Philip Bankier: refined Plumber design

Status: design approved October 11, 2026. The user requested an implementation plan with accurate schema markup and corrections to the flagged content. No production code, hosting settings or deployment have changed. Publication decisions listed below remain explicit release gates.

## Intent

Philip chose Plumber over Plates and asked for every retained pixel and character to be defensible. The site should introduce his work and writing, help collaborators find him, and support conversations about projects. The result should retain the character of the drawing direction while making the actual work easier to find.

The design reference is `design-options/plumber-refined/index.html`. It is a standalone HTML mockup, outside the Vite production root. Its portrait is an illustration generated from the existing public photograph. The portrait is not generated from GitHub activity. Its likeness remains part of this visual review.

This proposal replaces the older, unbuilt Plumber concept's simulated engineering drawing and camera pullback. It retains the palette, portrait treatment, typography and a useful valve-shaped navigation link. It does not promise a data-driven portrait or an activity visualization. This scope change is explicit in the design being reviewed.

## Page and copy

The navigation is Work, Writing, Library, Code and Contact. Each label leads to a section with that subject. The name returns to the top. A keyboard skip link leads to the main content.

The hero reads:

> Philip Bankier
>
> Co-founder of Kairox AI.
> Building ActRun and writing The Living Edge.

Each named organization or publication links to its own website. The role is from the Philip brand kit and existing site. Building ActRun is supported by the product's About page and the kit; the newsletter identifies Philip as its author. No acquisition, experience, customer or performance claims are added.

The hero actions are View work and Write to me. The first is a native anchor to Selected work; the second opens an email addressed to the existing public business address. There is no form or implied successful delivery.

Selected work contains:

| Project     | Copy                                                   | Destination            |
| ----------- | ------------------------------------------------------ | ---------------------- |
| ActRun      | An AI workspace that connects to your apps.             | https://actrun.ai       |
| PromptCache | A directory for discovering and sharing AI prompts.     | https://promptcache.live |

These are product descriptions supported by their public pages, not claims of tested integrations or operating results. The design does not label PromptCache a Kairox product: its current footer credits Metaportal. It does not claim sole authorship of either project.

Writing presents The Living Edge, described as “My newsletter on multimodal AI,” and three articles with exact feed titles, publication dates and individual article links. Read on Substack opens the publication. The design snapshot uses the three latest entries checked on October 10, 2026:

- October 8: [Last Week In Multimodal AI #70: Less Chat, More Decisions](https://thelivingedge.substack.com/p/last-week-in-multimodal-ai-70-less)
- October 1: [Last Week In Multimodal AI #69: AI Divides the Work](https://thelivingedge.substack.com/p/last-week-in-multimodal-ai-69-ai)
- September 25: [Last Week In Multimodal AI #68: AI Takes Direction](https://thelivingedge.substack.com/p/last-week-in-multimodal-ai-68-ai)

The preview's Research library shows the four existing public reports, with their document dates. Retention in the release depends on the editorial and publication review below. Preserving a URL does not authorize continued publication of unapproved content. The introduction says “Research notes from April and May 2026.” Descriptions summarize their subject without repeating unverified statistics. The Playbook date is April 24, as printed in the report; its old ledger publication date was April 25. Exact days are not invented for the other month-only documents.

Code retains the eight existing featured repositories and an All repositories link. All eight currently report public, not archived and not forks in the GitHub API. RiskRadar has no detected license, so the section is called Code, not Open source. Descriptions describe documented functions and do not assert that the tools have been independently tested. Runtime counts and stars are omitted.

Contact says “Get in touch” and “For projects and collaborations,” consistent with the site's agreed purpose. The address is `philip@kairoxai.live`. Footer content is the name and a useful Back to top link. The site title is simply “Philip Bankier”; the description introduces his work and writing.

## Visual decisions

| Retained element     | Purpose and constraint                                                        |
| -------------------- | ----------------------------------------------------------------------------- |
| Green paper          | Gives the drawing direction a recognizable background. No grain overlay.       |
| Large name           | Establishes the person before the projects. Scales without clipping.            |
| Portrait             | Adds personal identity; alt text is “Illustrated portrait of Philip Bankier.”   |
| Red wheel            | Makes View work distinctive. The full label and wheel are one link.             |
| Red interaction color| Identifies hover and focus. It does not imply status, alerts or live activity.   |
| Project connecting line | Groups the two work rows; nodes sit on their rows and respond with the link. |
| Thin section rules   | Separate content and establish alignment.                                      |
| Mono dates and repo names | Distinguish metadata and literal repository identifiers.                   |
| Serif newsletter name | Gives the publication a reading-oriented identity within the site.            |

Removed: Personal drawing set, A drawing of the work, portrait study captions, Detail A, registration marks, invented monogram, Follow the connections, instructional drawing copy, Run/Reset state, disconnected pipes, theatrical reveal delays and provisional text inside the proposed site.

The palette is paper `#d3dbd4`, ink `#25332d`, secondary text `#46584d`, red `#a83225`. Calculated contrast on paper is 9.34:1, 5.37:1 and 4.72:1 respectively. Rules are decorative; their lower contrast carries no essential information. Text is at least 14 CSS pixels in the 375-pixel layout. Body copy is 16 pixels or larger. No truncation hides article titles or descriptions.

The desktop hero has text and portrait in two columns. At phone width, the name, role and actions come first, followed by a smaller portrait. Work rows, the library and repositories become one column. There is no horizontal scrolling and no mobile-only loss of content. The header wraps into a name row and a navigation row.

Motion is limited to a brief wheel turn on hover or keyboard focus. Reduced motion disables it. Anchor navigation moves directly to the destination. Content is visible immediately. No loader, canvas, WebGL, scroll interception or pointer-following effect is required. The design reference has no JavaScript; preview controls belong to the review wrapper only.

## Production shape and data

Keep the existing React, Vite and GitHub Pages setup at `philipbankier.com`. There is no reason to migrate hosting for this design. Adapt the existing homepage section components and styles; do not rewrite the application framework or add a runtime API.

Core identity, content and link lists must be present in generated HTML. The implementation plan must specify and test build-time rendering with the existing React stack. JavaScript can enhance the page but must not be needed to read it, follow links or send email. Standalone report filenames remain stable.

Newsletter data is refreshed from the public RSS feed during the existing build. Persist a reviewed last-good feed snapshot with exact titles, dates, URLs and fetch time. A feed outage can use that dated snapshot with a visible “Writing checked [date]” note; never manufacture newer entries or say “live.” Reject invalid or off-domain article URLs. The build reports whether it used fresh data or the fallback. The design snapshot is not an already-working data pipeline.

The old What shipped ledger is retired in this proposal. It duplicates content elsewhere, mixes automation with authored work, and incorrectly claims to rebuild from sources. Its existing records are not silently converted into launch claims. Old `#ledger` links should lead to Selected work; `#open-source` should lead to Code. Research URLs remain stable for reports approved for publication; any withdrawal needs an explicit disposition for its old URL and preserved source. The broader public GitHub profile remains accessible through All repositories.

Do not retrieve or publish private contribution data. Do not show star counts, contribution totals or invented activity. A later request for an activity feed would need its own evidence and design.

Production preparation includes a compressed responsive portrait with reserved dimensions, an actual favicon, a social preview image, canonical metadata, sitemap and robots checks. Metadata must use the same approved claims as the visible page. Remove obsolete role labels, old domain names and dead metadata references in the homepage code. Do not add analytics or third-party browser scripts for this change.

The implementation plan must define accurate schema markup from the same reviewed content as the visible page. The homepage identifies Philip as its main subject; identity profiles are distinct from products and publications. Report markup must not infer human authorship or first-publication dates from hosting, document labels or AI-tool credits. Actual editorial revision dates are separate from build times. See the [implementation plan](../plans/2026-10-11-plumber-implementation.md) and its [editorial contract](../plans/2026-10-11-plumber-editorial-contract.md).

## Editorial issues that block a release claim

The redesigned homepage's copy has been audited. The four linked reports have only had a source-level content audit, not a full factual or browser acceptance review. A date label does not establish the accuracy of their assertions.

- `agent-playbook.html` calls itself “Internal // Research & Planning” and “Internal use.” It includes dated benchmarks and legal assertions. Resolve whether the document is intended for publication before retaining that label or removing it; verify or remove unsupported claims.
- `april-2026-ai-agent-roundup.html` claims “120+ sources” but contains no source hyperlinks. Its numeric and model-specific claims need traceable sources or removal.
- `taste-landscape.html` contains unsourced quantitative and universal claims. Further source inspection found that its chart's scores have no measurement method. The plan replaces that chart with a sourced method comparison; correcting its reversed accessibility labels alone would retain an unsupported ranking.
- `mobile-agent-nodes.html` has unsupported setup-time and device-compatibility assertions. Verify against dated primary documentation or remove those assertions.

The publication review must also resolve the existing unlisted internal report and tracker mentioned in `docs/HANDOFF.md`. Hiding a homepage link does not remove a file from GitHub Pages. Recommended disposition is to keep internal planning material out of the public artifact and explicitly decide whether the tracker belongs on the personal site. Do not delete sources or alter the external tracker automation as a side effect of the redesign. No such change is included in this design commit.

These are visible release gates, not tasks deemed complete by this mockup. The implementation plan must include the corrections and their verification before it can call the whole published site defensible.

## Acceptance and deployment

Before requesting publication approval:

1. Review the complete homepage and promoted report pages at 1920 and 375 CSS pixels in the existing Chrome session. Inspect every section, full titles, long links, hover states and keyboard focus. Include enlarged text and reduced motion. Record screenshots and failures.
2. Verify navigation, skip link, each project destination, distinct article URLs, all repository links, contact mailto and Back to top. A successful mailto click is not evidence that the inbox receives mail.
3. Verify direct report URLs return the actual documents, not an SPA fallback. Exercise their tabs, disclosures and other controls. Check third-party asset failure leaves readable content.
4. Run `pnpm check` and `pnpm run build:gh` in an isolated worktree. There is currently no configured lint or test command. Add focused checks only for the new feed/rendering behavior; a failing check must not be bypassed.
5. Inspect the built HTML and public artifact for unsupported copy, stale metadata, broken assets, unintended internal documents and credentials. The historical environment file must not be read or restored. Use runtime credentials only when needed.
6. Reconcile with fresh `origin/main`. The daily tracker commits are identified by path. Preserve their current content unless a separate publication decision authorizes a change. No push to main.
7. Prepare a feature-branch PR and reviewable preview. Obtain approval of the exact release result. Merge and deploy only under that authorization; retain a known-good production SHA and a feature-branch revert path.
8. After publication, confirm the Pages workflow succeeded for the reviewed SHA, check the custom domain and HTTPS, and repeat the primary flows against the live site. A green build alone is not a release acceptance test.

## Evidence and limits

Read on October 10, 2026: the repository handoff and current client files; `actrun-ai/brand` Philip kit and house rules; public ActRun, PromptCache and Kairox pages; the newsletter RSS feed and article canonicals; repository metadata for all eight listed projects; READMEs for TasteKit, Lex and technical-visualizer. Tool functionality and customer outcomes were not tested.

References:

- [ActRun](https://actrun.ai/) and [About](https://actrun.ai/about)
- [PromptCache](https://www.promptcache.live/)
- [Kairox AI](https://www.kairoxai.live/)
- [The Living Edge feed](https://thelivingedge.substack.com/feed)
- [Philip's repositories](https://github.com/philipbankier?tab=repositories)
- [Production workflow](https://github.com/philipbankier/philipbankier.github.io/blob/main/.github/workflows/deploy.yml)

The accompanying `2026-10-10-plumber-review.md` records the design-preview checks. It must not be mistaken for verification of a production implementation.
