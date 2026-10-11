# Plumber design preview: review record

Reviewed October 10, 2026. These checks cover the standalone design reference, not a production build or the factual accuracy of the linked reports.

## Checks performed

- Existing Chrome session: inspected the hero, work, writing, library, code and contact layouts at 1920 and 375 CSS pixels. Desktop viewport measured 1920 by 1080; phone measured 375 by 812.
- DOM measurements at both widths: document scroll width equals viewport width. Final measured link, heading and paragraph boxes had no horizontal text overflow. Project arrows initially exceeded their column; the columns were widened and checked again.
- Mobile typography: measured text sizes start at 14 CSS pixels; body and descriptive text start at 16 pixels. No line clamp or ellipsis removes content.
- Native View work link: URL changed to `#work`; target appeared 36 pixels from the viewport top. Writing, Library, Code, Contact and Back to top were exercised with the keyboard. Skip to content reached `#main`. All local anchor targets exist.
- Reduced motion: Chrome media emulation reported `prefers-reduced-motion: reduce` true and computed wheel transition duration `0s`. The emulation was cleared afterward.
- Portrait: browser reported complete with natural width 1122 pixels. The reference reserves its 1122 by 1402 aspect ratio. Likeness approval and production image compression remain pending.
- Text contrast, calculated from sRGB relative luminance: ink 9.34:1, secondary 5.37:1, action red 4.72:1 against the paper background.
- The standalone page contains zero script elements. It loaded and its native navigation worked. JavaScript was not explicitly disabled in Chrome, so this is evidence of a script-free reference, not acceptance of a future React build without JavaScript.
- The design preview wrapper's inline script passed `node --check`. It provides size and motion review controls only. The wrapper intercepts fragment links inside its iframe; native links were therefore checked separately on the standalone reference.
- Newsletter titles, dates and distinct canonical URLs were checked against the RSS feed. Public product links returned successfully. All eight repository metadata records reported public, non-fork and non-archived. These checks do not establish advertised runtime functionality.

## Evidence files

Screenshots retained outside the public site source:

- `/Users/philipbankier/.codex/visualizations/2026/10/11/01a1284c-bd3b-7f20-b0ff-3dbd55ad5d4b/plumber-refined-desktop.jpg`
- `/Users/philipbankier/.codex/visualizations/2026/10/11/01a1284c-bd3b-7f20-b0ff-3dbd55ad5d4b/plumber-refined-mobile.jpg`

The design reference and portrait are committed with the spec under `design-options/plumber-refined/`. The review companion remains a local, temporary service.

## Checks still required for release

No client files changed. No production typecheck or build was run for this design-only change. The repository has no lint or test command, and the standalone mockup has no configured test suite. `pnpm check` and an isolated-worktree `pnpm run build:gh` are required when the design is applied to client code.

The 200-percent text-size check, production generated-HTML check, metadata, optimized assets, feed fallback behavior, report interactions and all report corrections remain part of implementation acceptance. There is no completed PR, deployment or live-site acceptance for this design.

## Suggested instruction change

Philip's correction applies across UI work, so the appropriate scope is global. The actual `/Users/philipbankier/AGENTS.md` was checked and contains no equivalent rule. Proposed addition, not applied:

```diff
+- Require a clear visitor purpose for public-facing copy and controls. Never invent labels or metadata just to reinforce a visual theme.
```
