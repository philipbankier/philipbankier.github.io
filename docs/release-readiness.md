# Plumber release evidence

Candidate worktree: `codex/plumber-refinement`. This is local evidence, not production acceptance.

## Homepage review, October 11, 2026

The current build was served from `dist/public` at port 4173 and inspected in the existing Chrome session at explicit 1920×1080 and 375×812 viewports. Every homepage section was visible in full-page captures; both normal layouts had no horizontal overflow. Long newsletter titles, portrait detail and all four library descriptions were inspected. Local screenshots: `build/release-evidence/screenshots/home-desktop.png` and `home-mobile.png`.

Keyboard Tab exposes the skip link with a 3px red outline; Enter moves focus to `main`. Native section links and old fragment targets are present. All seven link treatments were checked with forced hover states and resolve to the approved red. Reduced-motion emulation reports no wheel animation.

A text-only stress test doubled every computed font size, leaving layout dimensions unchanged. It exposed navigation and email overflow. Wrapping fixes retain the ordinary layout. The repeated test has no off-screen element at 375px (a 1px text-paint rounding difference remains in scroll width) and no overflow at 1920px. Temporary browser styles and media overrides were cleared. Final static/no-JavaScript acceptance passed for the homepage and every retained report. All five pages were also checked at 768px, with no horizontal overflow.

The generated 1200×630 social card was inspected. Text is readable and does not collide with the portrait. All responsive portrait files preserve the approved image and aspect ratio.

## Playbook

Checked the corrected report at 1920px and 375px in Chrome with JavaScript disabled and Google Fonts blocked. All content and native navigation remain available. A keyboard-focused comparison region scrolls horizontally on phone widths; its outline is 3px and visible. Body copy is 16px on phones, metadata 14px. Doubling computed text sizes at both widths caused no page overflow. The report contains no diagrams that need text alternatives. Source contract tests pass; screenshot: `screenshots/playbook-mobile.png` in the local evidence directory above.

## April roundup

Both complete layouts inspected at 1920px and 375px with scripts disabled and third-party fonts blocked. All four announcements and both sections remain visible. The Evaluation link works by keyboard with a native fragment. Both doubled-text checks preserve page width. Phone capture: `screenshots/roundup-mobile.png`. No browser script or external stylesheet is required.

## Taste landscape

All content inspected at 1920px and 375px with scripts disabled and web fonts blocked. Each of the three native disclosures opened and closed using Enter; the comparison region scrolls using arrow keys without widening the page. Both doubled-text checks retain the viewport width. Measured rendered contrast: muted text 8.52:1, links 7.58:1, note text 12.98:1. Phone capture with every disclosure open: `screenshots/taste-mobile.png`.

## Mobile guide

Inspected complete desktop and phone layouts with scripts disabled and web fonts blocked. All four checkboxes started unchecked, toggled on and off with Space, and showed visible keyboard focus. Phone checklist is one column with wrapped labels. Both doubled-text checks retained page width. The shared field-guide palette has the Taste contrast ratios above. Phone capture: `screenshots/mobile-guide-phone.png`. This verifies the page controls only, not any mobile automation tool or physical device.

## Static build and schema

The release build produces 22 allowlisted files, including complete homepage/report HTML, a separate native 404, responsive images, local CSS and a sitemap. It emits no JavaScript bundle. The three excluded source paths remain in Git but are absent from the artifact. `scripts/publication.json` records the user's resolved decisions; boundary tests prove pending decisions block release and unknown/missing files fail inventory. Review mode also passed, with no pending decisions.

The generated homepage and all four reports were submitted as code to Schema.org Validator on October 11, 2026. Each returned zero errors and warnings. The ProfilePage links the visible Person, confirmed GitHub identity, Kairox affiliation and illustrated portrait. Report graphs link their own WebPage/Article, actual revision date and visible primary citations, with no inferred author or publication date.

Google Rich Results Test recognizes one valid Profile page item. Article results are valid with non-critical recommendations: missing author/image and dateModified timestamp/timezone precision. The reports have no verified human author or article illustration; the known revision day remains date-only rather than inventing a time. Schema.org accepts that Date value. These tests do not guarantee search presentation or prove live URL availability.

## Source reconciliation and rollback reference

October 11: fetched origin and rebased `codex/plumber-refinement` onto fresh `origin/main`; Git reported the branch already up to date. Main remains `de0047be9489b9a759af1a4c500031fb7a27d8e0`. Tracker source and `.github/workflows` are unchanged by this work.

GitHub identity verified as `philipbankier`, with the intended public repository. No existing or merged PR uses this feature branch. Pages configuration: workflow build, custom domain `philipbankier.com`, HTTPS enforced, main source. Last successful deployment reference: [Pages run 37915564634](https://github.com/philipbankier/philipbankier.github.io/actions/runs/37915564634), SHA `de0047be9489b9a759af1a4c500031fb7a27d8e0`. This is the provider's rollback reference; the redesigned candidate has not been deployed.

## Final local acceptance

All five navigation links, View work, Back to top and both old fragment aliases were exercised. All four direct report paths returned the correct document, and every Back to Library link returned to the homepage library. The phone 404 has a working native home link. The mailto destination matches the approved contact address; no email was sent.

Full-page and first-viewport captures for the homepage and all four reports are preserved in `build/release-evidence/screenshots`. These are local browser captures, not deployed previews. The final static artifact contains only JSON-LD script elements, with no runtime JavaScript.

External-link acceptance checked 35 distinct HTTPS destinations: 24 public GETs and 11 exact repository API GETs returned HTTP 200. All eight featured repositories are public, non-forks and non-archived. The only public redirects observed were Kairox and PromptCache to their www hosts. Evidence with final destinations and page mappings is retained in `build/release-evidence/plumber-link-acceptance.md` and `.json`. No authentication or rate-limit errors occurred.

The latest Pages deployment status is success, published October 9, 2026 at 10:07:19 UTC, matching the rollback SHA above. Production deployment and live acceptance of this redesign remain pending final candidate approval.

## Independent review and fixes

A fresh whole-branch reviewer reproduced the typechecks, tests and output verification. The review found inherited private contribution data in design/handoff documents, an RSS calendar-normalization edge case and one trailing whitespace line. All three are corrected. The disclosure scan failed before the scrub and passes afterward; its sensitive pattern fixture stays local. The new RSS regression rejects impossible dates, preserves the fallback's true age and accepts a valid leap day across a timezone boundary. The suite now has 29 passing tests.

A clean release branch is prepared from main so the new PR does not publish the inherited intermediate revisions containing private contribution data. The original implementation branch is retained locally. This does not erase any older public branch history. No human authorship, unverified timestamp or publication permission was inferred to satisfy a validator.

The review report and execution rulings are retained locally in `build/release-evidence`. No deferred code findings remain. No linter is configured.

## Proposed release follow-up, October 11, 2026

PR #4 merged approved candidate `86dfa3f1607f21999f26a2e8d003e01a88655853` as `bfacb8e6ef19bd1422bab74dab0d50e0275aec17`. Pages run [38159353287](https://github.com/philipbankier/philipbankier.github.io/actions/runs/38159353287) passed typechecks and all 29 tests, then failed because the anonymous Substack feed returned HTTP 403. The deploy job did not run.

The follow-up changes only the treatment of 403 from the fixed public feed: the release build may use the validated reviewed snapshot, retain its original checked date and record the rejection in the receipt. HTTP 401/429 remain fatal, and fresh-only snapshot refresh still rejects 403. No retry, credential change, workflow edit or feed request is used to prepare the proposal. Persistent refusal can leave the writing list stale; the visible date states its age.

This is a proposed amendment to the original 401/403/429 rule, not deployment of unchanged candidate `86dfa3f`. Separate approval is required before publishing and merging the follow-up. Offline regression tests and a simulated-403 build verify the behavior without contacting the refused endpoint.
