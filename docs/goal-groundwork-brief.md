# Goal brief: shared groundwork and the four-way likeness panel

The detail behind `docs/goal-groundwork.txt`. Context is in `docs/HANDOFF.md`, and the concept specs this work serves are in `design-options/concepts/`.

**Why this goal exists.** Four redesign directions all build Philip's portrait out of his real GitHub record. Before any of the 26 to 45 day builds starts, two things have to be proven:

- The data exists and classifies honestly.
- Each direction's portrait still reads as Philip.

This goal builds the shared data pipeline and the portrait maps, then renders four static portraits for a human recognition panel. It doesn't build the site.

## Write scope

- **New files:**
  - `scripts/data/**`
  - `scripts/portrait/**`
  - `design-options/portrait-maps/**`
  - `design-options/panel/**`
- **Files to edit:**
  - `.gitignore`: add `data/` and `.venv/`.
  - `package.json`: devDependencies only, if Node packages are needed.
- **Everything else is read-only,** in particular client/, `.github/workflows/`, client/public/pages/tracker/**, and `main`.
- **Commit and push only to `design/option-mockups`,** in small commits.

## Part A: ledger pipeline (`scripts/data/`)

### Inputs

All inputs are read at runtime with `GITHUB_TOKEN="$(gh auth token)"`.

- **Repos:** every public, non-fork repo of `philipbankier` (`fork == false`), with its name, description, language, created_at, pushed_at and stars.
- **Commits** on default branches since **2026-02-28**, the creation date of awesome-agent-skills and the earliest public artifact in the record:
  - Fields: sha, date (UTC), repo, author login/email, message (first line), url.
  - For philipbankier.github.io, exclude every commit that touches only paths under `client/public/pages/tracker/`, since that's the tracker cron. Exclude by path, not by message.
- **Releases and tags** per repo.
- **The contribution calendar** from GraphQL `user(login: "philipbankier") { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } restrictedContributionsCount totalCommitContributions } }`.
  - Record the window you used.
- **The Living Edge** RSS from `https://thelivingedge.substack.com/feed`: latest issues with title, date and url. If the fetch fails, record the failure and continue.
- **Product checks:** HTTP status of `https://actrun.ai` and `https://promptcache.live`, plus the date checked.

### Classification

`scripts/data/automations.json` holds the reviewed rules, each with a plain-English description.

- **automation:** commits whose author is `github-actions[bot]`, or whose first line matches `^sync: update data` in awesome-agent-skills.
- **hand:** everything else.
- **When a rule is ambiguous,** list it in PROGRESS.md for the operator. Don't guess.

### Outputs

Outputs go to `data/`, which is gitignored and never committed.

- `ledger.json`: `[{date, repo, kind: commit|release|repo-public|post|product, class: hand|automation, title, url, sha?}]`, sorted by date descending.
- `days.json`: one entry per UTC day from 2026-02-28 through yesterday, `{date, state: hand|automation|quiet, launch: bool, repos: [..]}`. Plates engraves one line per entry.
- `contributions.json`: the window, the total, the restricted count, and per-day counts.
- `repos.json`, `newsletter.json`, `products.json`.

### Verify

`node scripts/data/verify-ledger.mjs` must exit 0. Every check prints PASS or FAIL with counts.

- No fork repos appear anywhere.
- No tracker-path commits appear.
- Every date is valid ISO, and ledger.json is sorted.
- `days.json` has exactly one entry per day in range, with no gaps.
- The day-state counts sum to the length of `days.json`.
- The contribution calendar total equals the sum of its days.
- Each repo URL or sha resolves to the right repo name.
- No private repo names are present. GraphQL calendar counts are numbers only.

**Report the real numbers in PROGRESS.md:** hand days, automation days, quiet days, the total contributions, the restricted count, and the latest hand commit. The concepts assume roughly 89 hand days out of 222, and 1,525 total contributions with 1,257 restricted. A deviation of more than 20% is a pause-and-escalate.

## Part B: portrait maps (`scripts/portrait/`)

- **Source:** `design-options/assets/profile.webp` (449x561). Never upscale it to fake detail.
- **Environment:** Python 3.11+ in `.venv/`. List exact package versions in `scripts/portrait/requirements.txt`.
- **Pipeline:** one command, `python scripts/portrait/make_maps.py`, writes PNGs to `design-options/portrait-maps/`:
  - `matte.png`: rembg (u2net_human_seg). The person is white and the park is black. Check the curly hairline and the gaps between the crossed arms.
  - `depth16.png`: 16-bit depth from **Depth Anything V2 Small** (Apache-2.0). Don't use Base or Large, which have other licences. Blur 2px and force the background to 0. Near is bright.
  - `luma.png`: linear-light luma.
  - `edges.png`: Sobel on luma.
  - `importance.png`: from MediaPipe Face Landmarker, covering eyes, brows, nose and lips.
  - `README.md`: the exact commands, model names and versions, and licences.
- **Verify:** `python scripts/portrait/verify_maps.py` must exit 0.
  - Every map is 449x561.
  - The matte covers between 25% and 70% of the frame.
  - Depth is 16-bit, with the background at 0.
  - A face is detected, and its landmarks fall inside the matte.
  - The forearms and face are nearer than the torso edges.

## Part C: four static portraits for the panel (`design-options/panel/`)

Render each portrait from the same maps and data, following the portrait-treatment section of its concept spec. Renders can be Python (numpy, PIL, scikit-image) or Node canvas. Don't use WebGL yet. **The raw photo must never appear in a render.**

| ID | Direction | Render |
|---|---|---|
| plates | `concepts/option-5-plates.md` | A line engraving, printed as ink on rag paper, with exactly `len(days.json)` lines. Hand days are swelling, burin-cut lines. Automation days are thin, even ruled lines. Quiet days are faint pencil. Lines bend around the face along the depth contours. |
| plumber | `concepts/option-2-plumber.md` | A contour plate in graphite on drafting film. Contours come from 0.5 x equalized depth plus 0.5 x blurred luma, inside a face ellipse, with XDoG feature lines for eyes, brows, lips and hairline. |
| phosphor | `concepts/option-4-phosphor.md` | A still of the 96-line variable-pitch raster. Lines are displaced by depth and luma, with 58 lines from crown to collar and 37 from collar to forearms. Color is P7 yellow-green on dark glass `#0E120F`, with a faint glow. |
| swiss | `concepts/option-3-swiss.md` | An Atkinson-dithered cell print with exactly N ink cells, where N is the contribution total for the recorded window. Solve the grid size and tone so the count lands on exactly N. Ink on paper `#F4F3EF`. Also render the public-only print for comparison. It's expected to fail as a face, and that's evidence for the operator. |

### Outputs

- Each ID at 200px wide, 375px wide, and full size (at least 900px tall), as PNG. Files are named `A-200.png` and so on, using **blind labels A to D**, assigned randomly.
- `KEY.md` maps each blind label to its direction.
- `index.html` is a contact sheet that shows A to D at 375px wide and then full size, with **no direction names on the page**. The operator shows it to five people who know Philip, who name him unprompted.
- `CHECKLIST.md` lists every requirement in this brief, each with evidence (the command and an output excerpt, or a file path) or `[blocked]` with the real error.
- `PROGRESS.md` is a running log. Update it after each part. It's the working memory if context compacts.

### Self-check

For each render, open the 375px version. Record in PROGRESS.md whether a face is plainly visible, and whether Plates' hand and ruled lines read apart at 1x. A portrait that fails your own check still ships to the panel. Record the failure honestly, because the panel is the real gate.

## Stop

When Part C's outputs exist and CHECKLIST.md is complete, **stop**. Report the numbers, the self-check results and the path to `index.html`. Don't start any signature-moment spike, WebGL work, or site change. The human panel and the direction choice belong to the operator and Philip.
