# Option 3 · Swiss Index: Set and Filed

> A Swiss index drawn as a technical plate. His portrait is printed in exactly as many cells as the contributions GitHub counted this year (1,470 as of 8 Oct 2026). Scroll and the page lies down. Every cell files itself into its month as a line-drawn axonometric year, then the towers topple into the Index rows of the work they belong to. No contribution is discarded, and one red full stop travels to the last thing he shipped.

**Build estimate:** 30 days · **Critique scores before refinement** (out of 10): juror 6.5, engineer 6, brand 6

## What you see in the first 10 seconds

0.0 s. Warm neutral paper. 'Philip Bankier' already stands in heavy black across the full width. The bio and two product lines are readable at once, and 'Kairox AI' is a link. On the right sits a coarse black-and-white print of his face made of square cells, with crossed forearms along the bottom. Twelve thin pale-blue rules draw down from the top, the middle one first and then the rest by halving, and settle to grey hairlines.

0.1 to 1.2 s. Pale blue outlines of the name flick on and off, overshooting the right-hand rule and pulling back. There are six of them, each slower and closer than the last, until one sits exactly on the line.

1.2 to 1.6 s. A red full stop drops straight down that rule and lands at the end of 'Bankier' with one squash and one small rebound. Then nothing moves.

2 to 4 s. Moving the cursor over the face lifts the cells under it like a pinscreen. Each lifted cell shows a white side and a hard shadow. The caption under the print names the cell under the pointer, for example 'Private contribution on 23 Feb 2026.', and the line above it says the print has 1,470 cells, one per contribution.

4 to 10 s. First scroll. The whole face rises into a relief, with the forearms as the long ridge. Then the page turns 18 degrees and lies down like a drafted plate, and the name becomes runway lettering on the floor. The light swings and the shadows lengthen. By 10 s the first black cells are lifting straight up and running in right angles along the floor toward twelve month lanes, working left to right, with November nearly empty and February already starting to tower.

## Signature moment

THE FACE FILES ITSELF INTO THE YEAR, THEN INTO THE WORK.

ONE RULE FOR THE CAMERA
Every view is a parallel projection, like a drafted plate, so nothing has a vanishing point. The page is one long sheet. Scrolling slides an orthographic camera along it, and the Sort only changes the camera's angle. The projection of the sheet plane is always affine, so the live DOM (name, bio, Index) only ever takes a 2D matrix(). That matrix comes from the same camera as the GL layer, which keeps DOM and GL registered to the pixel. There's no matrix3d, no CSS perspective and no capture-and-swap. While the pin runs, GL draws the 12 column rules and the month labels, and the DOM carries text only.

THE GL LAYER
One fixed ogl canvas with pointer-events none and stencil on.
- Cubes are one instanced draw.
- Shadows are a second draw, stencil-once, so overlaps never double-darken.
- Each cube draws its own 1 px ink edges in the fragment shader with the depth test on. Hidden lines drop out and the result reads as a line drawing.
- All motion lives in the vertex shader, driven by five uniforms (uRelief, uTip, uSort, uRefile, uLight) and static per-instance attributes.
Every frame is a pure function of scroll position, so scrolling back un-files him exactly.

THE PIN
240vh, scrub 0.6, snapping to Print, Relief and Year (directional, delay 0.15, 405 ms 'cut'). Columns 1 to 3 hold one sentence per state. Arrow keys and PageUp/PageDown step between labels, and a 'Skip to the index' link comes first in tab order.

SHOT 1, PRINT (0 to 10%). Nothing appears to change. On the first scroll frame, GL replaces the 1-bit print image with identical cells, so there's no seam. The page you were reading is the object.

SHOT 2, RELIEF (10 to 26%). Every matte cell rises, about 4,200 in all. Ink cells become solid pillars and paper cells become white pillars with ink edges, each depth x 46 px tall. The projection gains a plan-oblique shear (x + 0.35z, y - 0.35z), so heights show as drawn sides. Every point at z = 0, including the whole DOM sheet, stays exactly where it was. The nearest cells rise first (delay from depth, expo.out). The forearms make the long ridge along the bottom, and the face stands up out of the page. Hard shadows fall at 14%.

SHOT 3, TIP (26 to 40%). The shear hands over to a true orthographic camera. Yaw goes from 0 to 18 degrees and tilt from straight down to 65 degrees, so the floor foreshortens to 0.42. The DOM sheet takes the matching matrix, and 'Philip Bankier.' lies down on the floor like runway lettering. The key light drops and swings 40 degrees, and shadows stretch across the columns. The camera pans down the sheet to the strip just below the hero where the 12 month lanes run, so the name ends up lying behind them like the title on a plate. Easing is power2.inOut.

SHOT 4, SORT (40 to 72%). Paper pillars sink through the floor in the first leg, since they were only the light in his face. The ink cells, exactly 1,470 today, run four axis-locked legs and never move diagonally:
1. Up on z to clearance height, H + (source row mod 4) x pitch, so no two paths cross.
2. Along x to their month lane. The 12 lanes are the 12 page columns, with November at left and this month in column 12.
3. Along y to their day's row in that lane's calendar, 7 weekdays by up to 6 weeks.
4. Down onto their slot in that day's stack.
Each leg uses power3.inOut. Delay is lane x 0.035 + row hash x 0.02, so the machine works through the year from left to right. Cells are matched to slots once on the main thread in under 5 ms, with cells sorted by x then y and contributions sorted by date. So the face reads left to right as November to October, and nothing crosses inside a lane. Each cube keeps the print's cell size and never scales.

As each cube lands it takes its tone:
- solid ink for public
- hatched for a scheduled job
- outlined paper for private

Last of all, the red full stop lifts off the floor as a red cube and waits for every other cube to land. Then it runs its own four legs to the day of the last thing he shipped and drops on top. Its drop and squash are fractions of scroll. The tok and the spring rebound fire only on snap complete.

SHOT 5, YEAR (72 to 100%, snap at 80%). The plate holds. This is the ledger moment, described in ledgerMoment.

SHOT 6, RE-FILE (the 100vh after the pin, unpinned, as the Index rises from below). The year is filed a second time, by what it was for.
1. Each stack splits along z into segments by destination row, one cube's gap apart, like an exploded drawing.
2. Segments slide along y, down the sheet, to their Index row.
3. Each segment topples backward 90 degrees about x and lies flat on the paper as an upright column of cells in that row's strip.
Meanwhile the camera unwinds to straight down with no yaw, and the Index names straighten into reading position as their cells arrive. Cubes scale from cell size to the strip's 3 px as they land. The red cube drops into its own row. If its target is further down the page, it waits on the column-12 rule while the page scrolls, then becomes the red full stop at the end of that title. When the last cell lands, GL hands off to per-row SVG strips drawn from the same data at the same pixels, and the canvas sleeps.

No calendar view ever appears and there's no wipe, because the year becomes the Index. The arc runs page, object, year, work, and no contribution is discarded.

## Intro sequence

The intro is short because the page is already complete at first paint. Motion only finishes it.

THE GATE
The 12 glyphs of 'Philip Bankier.' ship inline as an Archivo subset of about 6 KB with both axes. The name paints in its real face on the first frame, at the width solved at build. The full Latin subset is preloaded with font-display swap and a size-adjust fallback. There's no 600 ms gate to miss, so a cold first visit from far away still gets the choreography.

FIRST PAINT (t0)
- Paper and the masthead.
- The name in ink, without its full stop.
- The bio, with 'Kairox AI' linking to kairoxai.live.
- Both product sentences.
- The print, a 1-bit PNG of about 1 KB inlined as a data URI and drawn with image-rendering pixelated, with its caption.
All the facts are readable before any JS runs, and LCP is the name.

TIMING VOCABULARY
Named eases:
- 'set' cubic-bezier(0.22,1,0.36,1)
- 'cut' cubic-bezier(0.83,0,0.17,1)
- 'fall' cubic-bezier(0.55,0,1,0.45)
Spring: 'period' is 600/22, with one rebound.
Durations follow a 3:2 scale: 120, 180, 270, 405, 608, 911 ms.

THE TIMELINE

t0+0 to 645, the grid divides 12. Rules draw in non-photo blue and settle to ink at 14%. There are five tiers, 60 ms apart, each drawing scaleY from the top over 405 ms 'set':
1. Column 6.
2. Columns 4 and 8.
3. Columns 3 and 9.
4. Columns 2 and 10.
5. Columns 1, 5, 7 and 11.

t0+120 to 1215, the fit. Six non-photo-blue outlines of the name cut in at gaps of 405, 270, 180, 120 and 120 ms. They're the solver's real iterates, a bisection over wdth 62 to 125 at the solved size, so each lands on whichever side of the rule the math puts it. Each older outline dims to 0.6. The outlines come from an SVG feMorphology dilate-minus-source filter, so overlapping contours never show. No numbers appear. At t0+1215 the last outline meets the inked name, and any correction under 2 px is applied underneath it.

t0+1215 to 1620, the full stop. The red period falls straight down the column-12 rule over 405 ms 'fall', with x locked, into the slot the solver reserved. On landing it squashes for one frame (scaleX 1.18, scaleY 0.78), then the 'period' spring rebounds once.

t0+1620, idle. The pinscreen arms and the page holds still. On touch devices only, if nothing has been touched by +6000 ms, one press passes diagonally over the print over 1367 ms and doesn't repeat.

INTERRUPTS AND RETURN VISITS
Any wheel, touch, key or pointerdown raises timeScale so everything finishes within 180 ms, and scroll is never blocked. A same-session return (sessionStorage flag, wrapped in try/catch) skips the outlines: the rules draw in 270 ms and the period is already home.

SOUND
No audio plays during the intro.

## Portrait treatment

The photo is never shown as a photo. It's printed in his output: one cell per contribution GitHub counted in the window.

TESTED TODAY
At 1,525 cells, an Atkinson print of a head-to-forearms crop reads as a face on a 72 x 90 grid: hair, eyes, nose, collar and crossed forearms. A Bayer print at the same count blurs the face. A public-only print of 267 cells comes out at 28 x 35 with no face at all. Private counts are therefore load-bearing.

OFFLINE PREP (once)
1. Matte with rembg or HyperFrames remove-background, so the park disappears and he stands on bare paper.
2. Make a depth map with Depth Anything V2 small at 16-bit. Blur it 2 px to remove banding and force the background to 0. Check that the forearms come out nearest, because the relief choreography assumes it.
3. Compute Sobel edges on luma.
4. Pack everything at the full 449 x 561 into one RGBA lossless WebP of about 90 KB: R is linear luma, G is depth, B is matte, A is edge.

AT BUILD (every hour, Node with sharp)
1. Set N to the window's contribution count.
2. Bisect the grid's column count until the natural ink count lands within 3% of N, at 30 to 42% coverage inside the matte.
3. Bisect a global tone offset until the count crosses N.
4. Add or trim the cells with the smallest residual error so the count is exactly N.
Tone mapping is a 3rd to 97th percentile stretch inside the matte, and edges darken the tone so the silhouette stays crisp.

Outputs:
- print.png, 1-bit, about 1 KB, inlined.
- cells.bin, mapping each cell to its date, row and tone.
- Per-cell depth.
Cell size is rounded to whole CSS px so the image and GL agree exactly.

THE SAME CELLS, FOUR WAYS
- Flat, it's a single-ink print on the grid.
- Raised, it's a relief with the forearms as the long ridge.
- Sorted, it's his year.
- Re-filed, it's the Index strips.
The low resolution becomes the argument. A busier year prints a finer face, and the build reprints it every hour.

CAPTION
'Printed in 1,470 cells, one for each contribution GitHub counted since 1 Nov 2025. Read left to right, the print runs from November to October.' Both numbers are computed at build.

FALLBACK
Build-time stills from the real renderer cover no-WebGL and reduced motion. The print PNG works with JS off.

## The ledger moment

The ledger is the year he built, filed out of his own face and then filed again into the work.

WHAT IT COUNTS
One cube per contribution GitHub counted in the 12 calendar months ending this month: 1,470 since 1 Nov 2025, as of 8 Oct 2026. The total matches his GitHub contribution graph day for day, so anyone can check it.
- 267 contributions are public and have receipts (227 commits, 14 PRs, 1 issue and 25 new repositories).
- 1,203 are private. GitHub counts them but doesn't show them.
Leaving the private ones out would print 267 cells, too few for a face, and would hide the work behind ActRun.

THREE TONES, ONE RULE EACH
- Solid ink: a public contribution. Each one resolves to a receipt, which is a commit SHA, a PR, an issue or a new repository.
- Hatched, with 45 degree lines in the cube's own face space: a public commit matched by the scheduled-job rule in ledger.yml. Today that rule catches this site's tracker commits. The rule is published and the colophon prints it.
- Outlined paper with ink edges: private. It's counted and drawn but never labelled.
Solid includes work he directed agents to write, and the legend says so.

AT THE YEAR HOLD
Twelve month lanes run on the 12 columns, each a calendar of day stacks. The real shape is the content: November 2025 holds 2 cubes, February 2026 holds 338, and the tallest tower is 23 Feb 2026 at 47. Red marks what went public: a red floor tile plus a hairline leader to a sentence caption in the margin. Captions include 'PromptCache launched on 22 Aug 2026.' and 'codex-handoff-skill 1.2.0 was released on 20 Jun 2026.', plus the days slop-engine and awesome-image-prompts went public and each paper's date. Only stable releases count, which excludes the tastekit 1.0.0 prerelease. Launch dates are curated in ledger.yml, because GitHub records when a repository was created, not when it went public. The red cube, which is the page's one full stop, sits on the newest of them.

The caption in columns 1 to 3 reads 'Twelve months, one column each. Every stack is as tall as that day's contributions.' The legend lines and the red rule follow it.

INTERACTION
- Hover a stack to see its date and its count by tone.
- Click a stack to open the exploded view, with labels on public cubes showing repo, date and short SHA. Scheduled cubes show SHA only and private cubes read 'Private'.
- Tier 3: 'Play the year'.

DATA
Data is built inside deploy.yml on an hourly schedule and never committed, so nothing races the tracker cron or touches main.
- GraphQL contributionsCollection supplies the calendar, per-day per-repo commit counts, and PR, issue and repository contributions. Public cells therefore reconcile with the calendar exactly.
- Private per day is the calendar count minus the public count, and the build fails loudly if any day goes negative.
- REST supplies SHAs into monthly shards.
- Releases come from the API. Launches, the featured list, the scheduled-job rule and the message allowlist come from ledger.yml.
Outputs are ledger.json (about 8 KB gz), cells.bin (about 4 KB), print.png and the shards. Shards for the current month and the launch months are prefetched at idle so the first tap on touch isn't empty.

THE LEDGER ELSEWHERE
- Every hero cell is one of these contributions and names itself on hover.
- Every cube lands in an Index strip, and the page says the totals match.
- The daily og-image is the Year frame, captioned 'Filed 8 Oct 2026.'
- A visually hidden table lists monthly totals by tone and every red event for screen readers.

## Section by section

### Masthead (persistent)

- **Visual:** A 40 px band on the 8 px baseline with no border. The tops of the column rules are its only edge. Columns 1 to 3 hold 'Philip Bankier' at 18 px, wght 700, with no full stop, because the page has exactly one and it's red. Columns 10, 11 and 12 hold 'Index', 'Reading' and 'Write' at 12/16, wght 500, in sentence case. There's no status chip, clock, logo ring or sound toggle.
- **Motion:** It cuts in hard on first paint and never animates.
- **Interaction:** The name scrolls home. Each of the three words jumps to its section. 'Reading' runs the column-strip View Transition only when it opens a paper page.

### Hero: set to the measure

- **Visual:** A 12-column grid with 1 px rules in ink at 14%. 'Philip Bankier.' is set in Archivo across all 12 columns, solved to within 0.5 px at wght 700, and its full stop is the only red on screen. The bio sits in columns 1 to 5 at 27/32, with 'Kairox AI' linking to kairoxai.live. Under it, two product sentences at 18/24 link to actrun.ai and promptcache.live. Columns 7 to 12 hold the print: exactly 1,470 ink cells today on a 72 x 90 grid at about 9 px, a head-to-forearms crop of the matted portrait. Cell size is rounded to whole CSS px. The caption sits under the print at 12/16. There's no kicker, badge or CTA row.
- **Motion:** After the intro the hero holds still, and it moves only under the visitor's hand.
- **Interaction:** The print is a pinscreen. A 64 x 64 touch texture with 0.94 decay lifts cells by depth x 18 under a small plan-oblique shear, so lifted cells show white sides and hard shadows while the sheet stays pixel-exact. This previews the relief. The cell under the pointer names its contribution in the caption, for example 'Private contribution on 23 Feb 2026.' Clicking a public cell opens its receipt on GitHub. Hovering or focusing the red full stop sets the last-shipped sentence with its date. Resizing re-solves the name through four blue outlines. The hero has no cursor weight field and no drag handle.

### The Sort (signature, pinned 240vh)

- **Visual:** One continuous scene on one sheet. The DOM text (name, bio, captions) takes a 2D matrix from the orthographic camera, and GL draws the rules, the month labels and the cubes. Cubes are paper-white or ink with 1 px ink edges and hidden lines removed, and they cast hard 14% shadows from one low key light. There's no bloom, grain, gradient or perspective. Columns 1 to 3 carry one sentence per state.
- **Motion:** The shots are listed in signatureMoment, and all of them are scrubbed and snapped. Objects move only along x, y or z. Only the camera rotates, and it stays orthographic throughout. Arrivals use expo.out, travel uses power3.inOut and drops use power4.in. The light's azimuth tracks the scrub, so shadows sweep across the lanes during the Tip.
- **Interaction:** Scroll position is the state, and every step reverses. The pinscreen works through Print and Relief. Arrow keys and PageUp/PageDown step between Print, Relief and Year. Holding at Year opens the ledger interactions. Tier 3 adds 'Sound is off.' to the first caption as a toggle.

### The Year (ledger hold inside the Sort)

- **Visual:** An axonometric plate. Twelve month lanes run on the 12 columns, each a 7 x 6 calendar of day stacks, with the name lying on the floor behind them. There are 1,470 cubes in three tones: solid ink for public, face-space 45 degree hatching for scheduled jobs, and outlined paper for private. November 2025 holds 2 cubes and 23 Feb 2026 stands 47 tall. Launch and release days carry a red floor tile, with a red hairline leader to a sentence caption in the margin. The red cube sits on the newest one. Month names lie on the floor at the front of each lane, under their columns. The caption, three legend lines and the red rule sit in columns 1 to 3.
- **Motion:** Leaders draw by stroke-dashoffset as each caption hard-cuts in, and they're re-projected from the stack tips every frame. After that, the plate is still.
- **Interaction:** Hovering a stack shows a leader with its date and its count by tone. Clicking opens an exploded view: the orthographic camera zooms 2x over 608 ms 'cut' and the stack separates along z with a gap between cubes. Public cubes get labels with repo, date and short SHA, linked to GitHub. Scheduled cubes show SHA only. Private cubes read 'Private'. Commit messages appear only for repos on the ledger.yml allowlist that pass the house filter. Esc or any scroll closes the view.

### Re-file (the year lands in the work)

- **Visual:** The page comes back to flat paper while the Index rises from below. Cells leave the plate in segments, one per destination row, and lie down as strips under the names. The camera unwinds to straight down.
- **Motion:** Described in signatureMoment, shot 6. It's scrubbed across the 100vh after the pin and is fully reversible. Each segment slides on y, then topples 90 degrees about x and lands at strip scale. The red cube becomes a full stop. When the last cell lands, GL hands off to SVG strips at identical pixels.
- **Interaction:** None while it moves, because scroll is the only control. Once it lands, everything belongs to the Index.

### Index

- **Visual:** Flat paper, and every cell from the face is here. The order runs:
1. 'ActRun.' and 'PromptCache.' span all 12 columns at one shared solved size. ActRun runs extended and PromptCache runs condensed, so width carries the difference and neither outranks the other. Each gets one sentence at 18/24 in columns 1 to 6, with references in columns 11 and 12: 'actrun.ai' and 'Launched 22 Aug 2026'.
2. The private strip, full measure, holding the 1,203 outlined cells.
3. 'The Living Edge.', with one ink tick per issue on its send date.
4. The featured repos from ledger.yml, which is Philip's choice. Today they're awesome-agent-skills, codex-handoff-skill, tastekit, brain-dump, agent-cli-skills, lex-the-computer, technical-visualizer and riskradar. The latest launch joins them while it's the newest. Each repo's measure comes from its commits in the last 365 days, scheduled jobs included, on a square-root scale from 3 columns at zero up to 10 for the busiest. Size snaps to the 8 px baseline and wdth takes up the rest. References are dates and versions, never stars.
5. 'Elsewhere on GitHub', a strip for public contributions to repos that aren't featured, followed by the computed line about the rest of his non-fork repos.
6. A closing line stating that all 1,470 cells are filed here.
Under each name runs its strip: one 3 px cell per contribution on the 12 month lanes, x by day and stacked upward per day, in the three tones, with red ticks for launches and releases. Every name ends in an ink full stop except the one the red period lands in.
- **Motion:** Each name arrives ragged at wdth 62 and justifies to its measure between view() entry 0% and cover 30%. It's a CSS scroll-driven animation reading a per-row solved custom property, so it reverses and needs no JS per frame. Strips arrive by the re-file, not by a reveal.
- **Interaction:** Each name links out: products to their sites, repos to GitHub. Hovering a strip cell shows its date, tone and repo in the row's caption line. Clicking a cell scrolls back to the Year and opens that day's exploded stack. There's no accordion, no hover inversion and no repo-name paragraph.

### Four long reads

- **Visual:** Four covers, three columns each, in their paper's true page proportion. Each title is solved line by line to its 3-column measure. Below the title sits the paper's fingerprint, extracted at build from its source:
- one hairline per paragraph, with length proportional to word count
- headings as heavier ink bars
- citations as short ticks at the right edge
The covers differ as much as the papers do, and nothing on them is invented.
- **Motion:** Lines draw at constant pen speed in non-photo blue on the section's view-timeline and print to ink as each one completes. There's no widening or Flip.
- **Interaction:** Hovering a line sets its section heading and word count in the caption. Clicking a line opens the paper at that paragraph through a cross-document View Transition. The cover title becomes the H1, and the fingerprint becomes the paper page's navigator rail.

### Write (footer)

- **Visual:** A short about paragraph sits in columns 1 to 6 at 27/32. Below it, 'philip@kairoxai.live' is set at 61 px in columns 1 to 8, unsolved and quiet. GitHub, LinkedIn and kairoxai.live appear as plain words in grid cells. The colophon follows. It names the face, the grid, this visitor's solved values for the name, the published scheduled-job rule, the gh-skyline credit and the build age, which is computed in the browser from the build timestamp.
- **Motion:** It hard-cuts in with the rest of the flow, with no giant word or solved address.
- **Interaction:** Clicking the address opens mail. A 'Copy address' button sets 'Copied.' in the caption.

### Paper pages (Tier 2)

- **Visual:** Same paper and grid, rebuilt at the existing /pages/*.html paths. The H1 is solved line by line so every line ends on the same rule. Body copy is 18/24 across columns 4 to 9. Columns 1 and 2 hold the fingerprint rail as the navigator, with the current paragraph's line in ink and the rest at 14%.
- **Motion:** The page arrives through 12 column strips while the cover title morphs into the H1. The H1 then runs the last four bisection outlines to fit its new measure in 270 ms. The rail fills as you read.
- **Interaction:** Clicking a rail line jumps to that paragraph. Back or Esc returns through reversed strips to the Index, with the cover in place.

### 404 (Tier 3)

- **Visual:** The same grid holds one sentence the solver can't fit: 'Nothing is filed at this address.' Blue outlines alternate either side of the column-12 rule and never converge. The red period hangs above the rule.
- **Motion:** The outlines run on the bisection schedule without ever converging. The period bobs on the 'period' spring along y only.
- **Interaction:** A click or tap anywhere drops the period, and the line locks in ink. A View Transition then carries the period home to the end of 'Bankier'.

## Type system

FAMILY
Archivo Variable (Omnibus-Type, OFL) is used for everything: wght 100 to 900, wdth 62 to 125.
- The name's 12 glyphs are inlined at about 6 KB.
- A Latin subset of about 75 KB is self-hosted and preloaded, with swap and a size-adjust fallback.
It's a grotesque with a real width range, and it isn't GitHub's identity. There's no second face and no monospace. Commit SHAs are set in Archivo at wdth 62 with tabular figures. Verify that tnum survives the subset, and fall back to fixed-width digit spans if it doesn't. There are no uppercase tracked labels and no italics.

SCALE AND RHYTHM
The scale is 3:2 from 12 on an 8 px baseline: 12, 18, 27, 40.5, 61, 91, 137, 205, plus solved display sizes. Motion durations use the same ratio. Line heights are multiples of 8, and text-box-trim snaps display baselines onto the rules.

THE SOLVER
Display lines are solved rather than sized. A 14-step bisection over a per-glyph advance lookup table puts the last glyph on the rule. The table is built at deploy with fontkit on a 17 x 11 (wght, wdth) lattice. Every name has a single wght, so kerning stays intact. Per-frame solves are pure arithmetic with zero DOM reads. After resizing settles, one getBoundingClientRect applies a correction factor, and the colophon reports the measured value, never the modelled one.

THE HOUSE RULE
Every display line fills its measure, and the measure carries the meaning:
- The name spans 12 columns.
- The products share 12 columns at one size.
- A repo's column count comes from its year of commits.
- A paper title gets 3 columns.
Weight never decorates and never follows the cursor.

ROLES
- Name: solved, wght 700.
- Index names: solved per row, wght 700.
- Bio: 27/32, wght 450.
- Body: 18/24, wght 400.
- Captions and readouts: 12/16, wght 500, sentence case.
- Dates and counts: tabular figures.
Headings are sentences ending in a full stop. Dates are written as '22 Aug 2026'.

## Palette

Three inks and one construction colour, all flat. There are no gradients, glows, grain or blur.

- Paper #F4F3EF: a neutral offset white with b* near 0.
- Ink #0D0D0C: all type, solid cubes, edges and hatching. Derived tones are never new colours. Hairlines and shadows are ink at 14%. Hatching is 1 px ink lines at a 4 px pitch. Private cubes are paper with ink edges.
- Signal red #E30613: governed by one rule, printed in the Year caption. Red marks something he made public, and every red mark links to its receipt. It covers:
  - the one travelling full stop, which marks the newest launch, release or paper
  - launch and release tiles, with their leaders, in the Year
  - red ticks in Index strips on those days
  - the favicon
  Nothing else is ever red. Focus rings are 2 px ink.
- Non-photo blue #A4DDED: construction only. It covers the bisection outlines, grid assembly, fingerprint lines while they draw, ::selection as a blue pencil, and the 404 outlines. It's stripped from the print stylesheet.

Colour carries state across the page: blue is being set, ink is set, and red has gone public. A typical screen is about 70% paper, 28% ink and 2% red.

Dark scheme is the negative:
- paper #0D0D0C and ink #EDEDEA
- hairlines at 18%
- solid cubes light, private cubes dark with light edges, and light hatching
- shadows in black at 45%
- red unchanged and blue at 40%

## Textures and layers

There's no grain, noise, paper texture, bloom, blur or occlusion shading. Materiality comes from line drawing, one hard key light and the density of cells.

LAYERS, BACK TO FRONT
- L0, paper.
- L1, the column rules: 1 px ink at 14%. They're DOM at rest and drawn by GL while the pin runs.
- L2, DOM content: all text, selectable and crawlable, and the source of truth.
- L3, the GL canvas: fixed, pointer-events none, present only from the hero through the re-file. Cubes are paper or ink faces with 1 px ink edges and hidden lines removed, with face-space hatching on scheduled cubes and stencil-once 14% shadows.
- L4, an SVG overlay for the Year leaders and the per-row Index strips after the hand-off.
- L5, the red full stop. It's one DOM node for the whole page, swapped for a red GL cube only during the Sort and the re-file.
- L6, the masthead.

SECOND-VISIT DETAILS
- The favicon is the red full stop.
- Each day's og-image is that day's Year frame, captioned 'Filed 8 Oct 2026.'
- The print reshuffles as the count changes, so a returning visitor sees a slightly different face.
- View-source opens with a comment giving the grid spec, and the console prints the build line.
- The print stylesheet outputs a clean A4 index with the Year still and the blue removed.

## Transitions

MOTION GRAMMAR
- Things move along x, y or z only. Only the camera rotates, and it stays orthographic.
- Durations come from the 3:2 scale.
- Everything resolves to exact alignment.
- Scroll-linked values are pure functions of scroll position, and time-based extras fire only on snap complete.
- Keyboard actions finish in 120 ms or less.

WITHIN THE PAGE
- Hero to Sort: there's no transition. The page you're reading lies down.
- Sort to Index: the re-file. Cells slide, topple and land as the Index's strips while the camera returns to plan. There's no wipe.
- Into the papers: fingerprint lines draw on the view timeline.
- No in-page blinds or wipes anywhere.

STATE CHANGES
- Exploded view: an orthographic zoom 2x plus z separation, 608 ms 'cut' in and out. Esc closes it.
- Strip cell click: scrolls to the Year label over 911 ms 'cut', then opens that day.

BETWEEN PAGES
Cross-document View Transitions on the static build (@view-transition navigation auto). This is the only place the column strips are used.
- Each page carries 12 fixed paper strips named strip-1 to strip-12. They animate transform scaleY over 405 ms 'cut', staggered 24 ms outward from the column you clicked. pageswap stores that column in sessionStorage, and pagereveal adds the matching type.
- Shared elements: the masthead; the red full stop, which flies from the end of one title to the next; and the clicked cover title, which morphs into the H1 and runs the last four bisection outlines. The cover fingerprint morphs into the navigator rail.
- Back navigation adds the 'backwards' type: the strips drop instead of lifting and the full stop flies back.
- Firefox and older browsers navigate normally, and reduced motion gets a 120 ms crossfade.

## Sound design

Tier 3. Sound is off by default. The toggle lives in the Sort's first caption as 'Sound is off.' because that's where sound is earned. The choice persists in localStorage wrapped in try/catch, and the AudioContext is created only on that click.

Everything is synthesized, with no audio files, in about 3 KB of code. The master chain is gain 0.15 into a DynamicsCompressor, and envelopes ramp exponentially to 0.001. At most one discrete cue plays per 60 ms, and repeated cues vary by 6% in pitch. Nothing plays on hover, and nothing plays during the intro.

THE SCALE
The 12 columns map to A minor pentatonic upward from A4, so a month always has the same pitch.

VOICES
- Filing: the only scroll-linked sound. Each frame counts cubes finishing their drop per lane and schedules up to 12 grains (3 ms each, at the lane's pitch). It sounds like a music box played left to right, and scrolling back plays it in reverse. Above a scroll-velocity threshold it collapses to one grain per lane per 60 ms, so trackpad flings stay clean.
- Full stop landing: a 110 Hz sine with a 70 ms decay plus a 3 ms click, fired only on snap complete.
- Re-file: one low woodblock per Index row as its last segment lands.
- Play the year: a 6 s sweep. Public contributions pluck at their lane's pitch, scheduled jobs tick as a steady muted woodblock, private work is a soft filtered tick, and red days add a 400 ms low thump.
- Copy address: one 4 ms tick.

Under reduced motion, cues play only on clicks.

## Mobile

Phones get the same story, re-staged for a tall screen. Hover effects apply only under @media (hover: hover).

GRID
4 columns with 16 px margins, on the same 8 px baseline. At load the grid divides into 2, then 4.

HERO
- The name breaks into 'Philip' and 'Bankier.', each solved to the full measure. 'Philip' runs extended and 'Bankier.' runs condensed.
- The bio and product lines are present at first paint.
- The print spans all 4 columns with the same 1,470 cells at about 4.8 px, so the instance count matches desktop.
- Touch-drag drives the pinscreen, and a tap names the cell under the finger.

THE SORT
- Pinned for 240svh, with ignoreMobileResize, snap set to directional with inertia off, and CSS scroll-snap anchors as the iOS fallback.
- The plate rotates so the 12 months run as 12 rows receding up the screen, a long avenue that suits portrait orientation. The caption reads 'Twelve months, one row each.'
- Each row is still a 7 x 6 calendar.
- Tap a stack for the exploded view. Nothing needs two fingers.
- Leader captions become a block set below the floor.

RE-FILE AND INDEX
- At 343 px, a day is under 1 px wide, so strips bin by week: 52 positions of about 6.6 px, with 2 px cells stacked upward. Every cell is still filed.
- Rows solve to the 4-column measure. Products share it at one size, and repos run from 2 to 4 columns by activity.
- References sit under each name.

PAPERS
Four full-width covers, stacked, with fingerprints at full width. A tap on a line opens the paper at that paragraph.

TECHNICAL
- DPR = min(devicePixelRatio, 1.25).
- MSAA off, with pillar edges pixel-snapped in plan.
- Native scroll.
- Hit-testing for cells is computed on the CPU from the orthographic projection, with no GPU picking.

## Reduced motion

prefers-reduced-motion keeps every composition and removes the travel.

- Intro: the grid, the solved name, the print and the red full stop are all present at first paint, with no outlines.
- The Sort becomes a stepper in the same frame. It shows three build-time stills from the real renderer (Print, Relief and Year), swapped instantly by three text buttons or the arrow keys, each with its caption. The full stop stays in the name.
- Year: hover and focus readouts still work on the still through precomputed hit maps. Clicking a stack opens its contribution list in place instead of the exploded view.
- Re-file: the Index strips are present from the start. The full stop also appears at the end of its target title, marked 'Last shipped' for screen readers.
- The pinscreen still responds, because it moves only under the user's hand, but it has no spring tail.
- Index names are already justified, and paper fingerprints are fully drawn in ink.
- View Transitions become a 120 ms crossfade.
- Sound stays opt-in, and cues play only on clicks.

Visitors without WebGL, and any context loss, get the same stills with the DOM intact. With JS off, the page is a complete static index showing the print PNG and the Year still.

## Tech stack

BUILD AND DEPLOY
A static Vite multi-page build in vanilla TypeScript, with no framework runtime. It deploys through the existing GitHub Pages deploy.yml with an added hourly schedule.
- Pages: index, the four papers at their current /pages/*.html paths, and a real 404 that replaces the copied index.html.
- vite-plugin-manus-runtime is removed, dropping the 367 KB inline runtime.

RUNTIME JS (about 95 KB gz eager)
- ogl, about 14 KB: Renderer with stencil, Program, instanced Geometry, orthographic Camera. One WebGL2 context.
- GSAP 3.13 core plus ScrollTrigger, about 39 KB, all free.
- Site code, 45 to 55 KB: shaders, Sort and re-file choreography, the camera-to-sheet 2D matrix, the solver and the pinscreen.
- Loaded on intent: the exploded view, sound and the 404 solver.
Not included: three.js, Lenis, Flip, SplitText, snapDOM or any second font.

CSS-NATIVE
- view() timelines for row justification and fingerprint draws.
- @property-registered axis values.
- text-box-trim.
- @view-transition with types, and 12 strips with view-transition-name animating transform scaleY on the compositor.
- @supports fallbacks.

DATA AT BUILD (deploy.yml, never committed)
- GraphQL contributionsCollection and REST (Octokit, Node 20), with commit pages cached through actions/cache keyed by date.
- GITHUB_TOKEN is used first. If the installation token can't read contributionsCollection, a zero-permission fine-grained token is stored as a repo secret instead. Test this on day 1.
- ledger.yml (checked in on a branch through a PR) holds the featured repos, curated launch dates, the scheduled-job rule and the commit-message allowlist.
- The Living Edge issue count comes from the Substack archive, with a cached last good issues.json so a failed fetch never fails the deploy.

BUILD-TIME TOOLS
- fontkit builds the advance lookup table and the pre-solved name widths.
- sharp plus the exact-count Atkinson solver produce print.png and cells.bin.
- Paper fingerprints are extracted from the papers' sources.
- Playwright renders the reduced-motion stills and the daily og-image from the real renderer. It runs once a day, is pinned to a Chromium version, and the build skips it if it fails.

ONE-TIME OFFLINE
rembg or HyperFrames remove-background for the matte, Depth Anything V2 small for depth, and sharp to pack the channels.

TIERS
- Tier 1, about 20 days: data pipeline, print solver, hero, the Sort through the Year with the exploded view, the re-file, the Index, reduced-motion stills and the no-JS page.
- Tier 2, about 6 days: paper fingerprints, paper pages, cross-document View Transitions, footer and colophon, daily og-image.
- Tier 3, about 4 days: sound, the 404 and the print stylesheet.

## Performance plan

BUDGETS
- LCP under 1.5 s. The name is real HTML text in an inlined glyph subset, at a width solved at build, and the print is a 1 KB inline PNG.
- CLS 0. Display lines are solved before paint, with fixed line boxes.
- INP under 100 ms.
- 60 fps on an M1 MacBook and a Pixel 7.
- About 95 KB gz of eager JS.

WEBGL
- One WebGL2 context with stencil.
- About 4,200 matte-cell instances through Relief, and 1,470 after the Sort.
- Cubes are a box with the bottom face dropped (20 vertices), so under 90k vertices in total.
- Two draws: cubes, and stencil-once shadows. Edges come from the fragment shader with no line pass.
- Per frame, JS writes only the camera, five uniforms and one 2D matrix per visible DOM section. Nothing is written per instance.
- Assignment is solved once on the main thread in under 5 ms.
- The touch texture uploads only during pointer activity.
- The pillar program compiles during idle after first paint, using KHR_parallel_shader_compile.
- DPR = min(devicePixelRatio, 1.5, sqrt(8e6 / (w x h))), with MSAA off above 6 MP.
- The render loop runs only while the hero, the Sort or the re-file is in view or a tween is live. After the SVG hand-off the canvas is display none.
- On context loss, the page swaps to stills.

DOM UNDER THE CAMERA
- Each section in view gets the same affine matrix, offset by its position in the document.
- will-change is set only while the camera moves and removed at each snap, so type re-rasterizes crisp at rest.
- Rules and month labels move to GL during the pin, so a one-frame present mismatch can only touch text, where it can't be seen.

SOLVER
- Zero DOM reads per frame and one measurement after settle.
- Writes go only to values that changed.
- Line boxes get contain: layout paint.

SCROLL
Scroll is native. ScrollTrigger is limited to the pin, the re-file and the full stop's legs. Time-based extras fire only on onSnapComplete. Justification and fingerprints are CSS scroll-driven animations, with a ScrollTrigger fallback where animation-timeline is missing.

DATA
- Initial JSON plus cells.bin is about 14 KB gz.
- Shards load on click, with the current month and launch months prefetched at idle.
- The client never calls the GitHub API.

CI
Hourly data builds are cheap and use cached commit pages. Playwright stills and the og-image render once a day and are skipped on failure.

## Prototype first

Build the data-to-plate spike first, about 4 days, before any page design.

THE SPIKE
1. A Node script that pulls the real contribution calendar and the per-day, per-repo counts, reconciles public against private, and solves the exact-count Atkinson print (N = 1,470 today).
2. One bare page. The print shows as its 1 KB PNG, then ogl takes over with a single scroll-scrubbed slider through Relief, Tip, Sort and Year. Cubes are line-drawn with hidden lines removed, with stencil shadows. A DOM element holding the name sits under the shared 2D camera matrix.

WHY THIS FIRST
It covers the three facts the whole concept rests on, and any of them could fail:
- Does the face read at the real count? A quick test today says yes, at 72 x 90 cells with Atkinson and a head-to-forearms crop. Bayer at the same count blurs the face, and the 267-cell public-only print shows no face at all.
- Is the real year worth looking at as a line-drawn plate? February peaks at 47 in one day and November holds 2.
- Does DOM text stay registered to GL through the tip in Safari on macOS and iOS and on a Pixel 7?
If any of these fails, the concept changes for 4 days of cost instead of 30.

CONFIRM WITH PHILIP BEFORE THE SPIKE
1. That private contribution counts may appear. They're already visible on his GitHub profile.
2. That this site's tracker commits may appear as hatched cubes showing SHAs only.

## Copy samples

- Philip Bankier.
- Co-founder of Kairox AI. I build the machinery that runs the work, in the open.
- ActRun is AI that runs your work.
- PromptCache is a free library to save and share prompts.
- Printed in 1,470 cells, one for each contribution GitHub counted since 1 Nov 2025.
- Read left to right, the print runs from November to October.
- A busier year prints a finer face.
- Private contribution on 23 Feb 2026.
- The red full stop is the last thing I shipped: {item} on {date}.
- Keep scrolling and every cell gets filed by month.
- Twelve months, one column each. Every stack is as tall as that day's contributions.
- Solid cubes are public. Click one to open its commit.
- Hatched means a scheduled job of mine made the commit.
- Outlined cubes are private work. GitHub counts them, but the code isn't public.
- Solid cubes include work I directed agents to write.
- 23 Feb 2026 was my busiest day, with 47 contributions.
- PromptCache launched on 22 Aug 2026.
- codex-handoff-skill 1.2.0 was released on 20 Jun 2026.
- Red marks something I made public. The full stop is the newest one.
- 1,203 private contributions since 1 Nov 2025, counted by GitHub.
- The Living Edge. Issue 69 is the latest.
- A scheduled job of mine updated awesome-agent-skills on {k} of the last 30 days.
- Every cell from the portrait is filed in this index, 1,470 in all.
- {n} more public repositories I started are on GitHub. Forks are left out.
- Four long reads. Each cover is drawn from its paper, one line per paragraph.
- Write to philip@kairoxai.live.
- Set in Archivo on a 12-column grid. On your screen the name was set at width {w}.
- The rule that marks a commit as scheduled is public in ledger.yml.
- Rebuilt from GitHub 38 minutes ago.
- The skyline idea comes from GitHub's gh-skyline.
- Sound is off.
- Nothing is filed at this address.
- Click anywhere to set the full stop and go back.
- Filed 8 Oct 2026.

## Why this escapes generic design

- The portrait is a count. It's printed in exactly as many cells as the contributions GitHub counted this year, so its resolution is his output, and the build reprints it every hour.
- No Bayer shader. The print is an exact-count Atkinson dither computed at build and shipped as a 1 KB 1-bit image, then handed to GL cell for cell.
- No perspective 3D and no shaded voxel chart. Every view is a parallel projection with line-drawn cubes and hidden lines removed, so the year reads as an axonometric plate.
- No contribution is discarded. Every cell of the face lands in an Index row, and the page states that the totals match.
- No contribution calendar appears anywhere. The year ends as strips under the work it belongs to.
- Private work is drawn as outlines. It's counted and visible but never dressed up as public, and the scheduled-job rule is published.
- The 12 grid columns are the 12 month lanes, and the grid assembles by dividing 12 at load.
- Red has a printed rule, with a receipt behind every red mark. The one full stop travels to whatever he shipped last.
- Hierarchy comes from data. The products share the full measure, and each repo's measure is set by its year of commits.
- Every tell the critics named is cut: the cursor weight field, Press G, the status chip, the masthead sound toggle, the tick-ruler minimap, accordion rows, expanding panels, the giant footer word or email, and in-page wipes.
- It doesn't wear GitHub's identity. It uses one non-GitHub grotesque, and the colophon credits gh-skyline as the skyline idea's source.
- Calm at rest. Nothing idles, and the machine moves only when you scroll or touch.

## Borrowed from (verified references)

- <https://tympanus.net/codrops/2026/04/01/animating-160000-cubes-in-three-js-to-visualize-dithering/>: An instanced 1-bit cube field with per-instance delay in the vertex shader. It's the mechanical core of the relief and the sort, scaled down to about 4,200 instances.
- <https://en.wikipedia.org/wiki/Dither>: Atkinson error diffusion, which loses a quarter of the error and holds highlights at very low resolution. Run here at build to an exact cell count.
- <https://en.wikipedia.org/wiki/Axonometric_projection>: Plan-oblique and orthographic axonometric drawing as the page's only projections, so the DOM sheet only ever takes a 2D matrix.
- <https://github.com/github/gh-skyline>: A contribution year as a physical skyline. Credited in the colophon and re-staged so the lanes are the page's own columns and the plate is line-drawn.
- <https://oryzo.ai>: The 2D to 3D to 2D arc with restraint: one family and a handful of colours, so the moving piece carries the page.
- <https://abcdinamo.com/custom/d-ad-dumbar-marfa-2021>: A width axis solved to fill a measure. It became the house rule that lets the measure carry meaning.
- <https://pretextjs.dev/>: Layout as pure arithmetic. Glyphs are measured once, so per-frame solves read zero DOM.
- <https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/>: Echo outlines collapsing into one word. Here the echoes are the solver's real iterates.
- <https://github.com/brunoimbrizi/interactive-particles>: A decaying 2D touch texture that displaces instances, repurposed as the pinscreen.
- <https://tympanus.net/codrops/2026/08/19/relighting-images-with-depth-maps-and-three-js>: Depth-map prep, including blurring depth to remove banding before using it as height.
- <https://oxide.computer>: Hairline leaders joining DOM captions to points on a drawn 3D object, used for launch and release days.
- <https://benfry.com/traces/>: Every mark is a real line of the record that you can open. Also the paragraph-line fingerprints on the paper covers.
- <https://tympanus.net/Development/OneElementScroll/>: One element carried through waypoints. The red full stop goes from the name to its day in the Year, then to the title of what shipped.
- <https://developer.chrome.com/docs/web-platform/view-transitions/cross-document>: pageswap and pagereveal with transition types, used for column-origin strips, the backwards direction and the shared full stop.
- <https://cydstumpel.nl>: Named elements that persist across real page loads on a static site.
- <https://scroll-driven-animations.style/>: Zero-JS view() timelines for row justification and fingerprint draws.
- <https://fonts.google.com/specimen/Archivo>: A grotesque with wdth 62 to 125 and wght 100 to 900 under the OFL. That range is what the solver needs, and it isn't GitHub's face.
- <https://www.igloo.inc/>: Sound synced to the motion of many objects. The model for the Tier 3 filing sound.
- <https://github.com/rittikbasu/spanda>: Durations and levels for synthesized UI cues, with no audio files.

## Critiques rejected, with reasons

- Juror, set the residual large under the rule: rejected. Numbers in the hero read as type-tool output to founders. The blue outlines closing on the rule already show the fit, and the real values live in the colophon.
- Juror, make the column-12 rule a drag handle: rejected. The hero gets one touchable thing, the print, where every cell is a contribution. A second type toy beside it is the costume the brand guardian flagged.
- Juror, keep the cursor weight field on the name only: cut everywhere instead, since two critics list it as the most-shipped variable-font gimmick.
- Juror, bake per-instance ambient occlusion: rejected. It puts grey gradients on a drawing that's flat by rule. Hidden-line edges, hard 14% shadows and the raking light carry the depth.
- Juror, use screen-space hatching: changed to face-space hatching, because screen-space lines slide through moving cubes (the shower-door effect).
- Juror, set Index measure from hand commits in the last 90 days: changed to all commits in 365 days, scheduled jobs included. In the last 90 days only two public repos got any of his commits (38 to this site, 12 to awesome-image-prompts), so every row would sit at the minimum.
- Juror, widen to all-time or use k cells per commit if the face doesn't read: not needed. A test today at 1,525 cells gave a readable face at 72 x 90 with Atkinson, and a rolling year keeps the print about now.
- Juror, add a separate 'directed' tone for agent-written work: rejected. Trailers can't classify 1,203 private contributions, so the tone would claim precision the data lacks. The legend states that solid includes work he directed agents to write.
- Juror, cut Plan to a 10vh beat: removed it entirely. The camera returns to plan only as cells land in the Index, so the GitHub-style calendar never appears.
- Engineer, develop the print in a fragment shader at 32/16/8/4: rejected. The print ships as a 1 KB 1-bit PNG at first paint, and a staged develop would only fake loading.
- Engineer, add matrix3d guards (the w > 0.05 check and sheet clip-path) and spike CSS3D: moot. Every view is a parallel projection, so the sheet only takes a 2D matrix() that matches GL exactly.
- Engineer, scale cubes from 4 to 9 px and add a cell-tier watchdog: moot. The cell count is set by data (1,470), so the print cell is already about 9 px at 1440 and doubles as the cube size, and 4K just gets larger cells.
- Brand guardian, put 'Last shipped' in the masthead: rejected. A masthead status line is a generic tell, and the newest launch is weeks old. The full stop's hover and the hero caption say it with a date.
- Brand guardian, set commit literals in a mono face: rejected. The page uses one family, with SHAs in Archivo at wdth 62, and messages appear only for allowlisted repos because HOUSE.md keeps internal names out of public copy.

## How the panel scored the three pitches

- **spectacle**: breathtaking 9, coherence 6.5, buildability 5. This is the only centrepiece that meets the client's bar. The face stands up as ink pillars, files itself into his real year, then lies flat as a calendar. It's one reversible idea with a thesis: the portrait is made of the same units as the data. The ideas around that core don't hold together. There are seven more toys: the ActRun dial, the PromptCache ribbon, flow fields seeded from a title hash, tile ripples, velocity skew, an idle Lissajous autopilot and a cube-word footer. Two of them are yet another Muller-Brockmann ring. It's buildable on a static host but heavy. The snapDOM swap has to be pixel-identical through a dolly zoom. The pin is 500vh long, there's scroll-scheduled audio, SDF flow fields traced in a worker and a second GL scene in the footer. That's roughly three to four times the scope of the others. It also plays an intro sound tick, which autoplay policy blocks before a gesture.
- **craft**: breathtaking 6, coherence 9.5, buildability 9. This is the best system on the table. It has a bisection you can watch, conservation of measure and one red full stop that makes a journey. Type and time share a 3:2 ratio, scroll stays native, and the JS is under 50 KB. Every mechanic prints its rule, which is how a serious builder should read. It falls short of 'breathtaking': the largest moment is 1.2 s of outlines plus a quarter-fan SVG. The ruled portrait is beautiful but has no job beyond being looked at. The fan is the third ring poster across three pitches. The A to Z rail and the 5x5 specimen matrix are over-built for about ten entries.
- **world**: breathtaking 7.5, coherence 7, buildability 7. This one has the best world logic. 'Blue is proof, ink is set, red is shipped' is a colour grammar that explains itself. The daily og-image edition is ownable, and the paper covers drawn from each paper's own outline are honest data. Splitting automation commits from hand commits is the most credible idea in any of the three pitches. The Score's tumblers locking into register is strong, but it's another ring poster. It has three liabilities. First, the name's weight is bound to a streak that an automation sustains, which overstates effort, and a reset visibly thins his name. Second, the halftone portrait repeats the Plumber treatment the client already rejected. Third, it sprawls: an editions archive, an odometer, a gyroscope behind an iOS permission prompt, and nightly Playwright product screenshots.

## What was grafted from the other pitches

SPINE: Spectacle's The Sort is the signature and the narrative, because it's the only moment that meets the client's word 'breathtaking' and it gives the low-res portrait a job. Craft's programme governs it. That programme brings the measure solver, one red full stop as a single travelling object, the 3:2 ratio shared by type and time, native scroll, hard cuts for computed answers, and blue for construction. The result is Swiss discipline around one big machine, so it reads as one designer's work.

GRAFTED FROM CRAFT:
- The bisection intro, with ghosts drawn in non-photo blue.
- Conservation of measure as the single type interaction across the site.
- The period's journey, with a hollow masthead ring whenever it's away.
- A grid that assembles by division. Here it divides 12 as 1/2, 1/3, 1/4, 1/6, 1/12.
- G guides, and Shift for 0.1x speed.
- A 404 that never converges.
- The bisection kept as a still diagram for reduced motion.
- A colophon that states this visitor's solved values.
- References in the right margin of the Index, like page numbers.

GRAFTED FROM WORLD:
- The blue to ink to red state grammar.
- Automation commits drawn grey and hand commits drawn black, in the skyline, the barcodes and the Play the year audio (a pulse versus a melody).
- Paper covers drawn from each paper's real H2 outline.
- A daily og-image edition showing that day's plan view.
- Index lines that arrive ragged and justify to measure as they enter.
- The 79-name paragraph.
- The email address solved flush as the footer, with the period's last landing as its dot.
- The Living Edge ruler of 69 dated ticks.
- Blue-pencil ::selection.
- Monaspace Neon, used only on literal SHAs.
- Excluding the site's own repo from the ledger.

CUT:
- Craft's polar fan and World's Score. The Sort already is the ledger, and with three ring posters it would read as a collage. Muller-Brockmann rings are now gone entirely.
- The ActRun dial and PromptCache ribbon posters. They're toys unrelated to the machine. The products become the two largest Index lines instead, since short names solve largest.
- Flow-field covers. Hash-seeded decoration.
- The tile-slice ripple and velocity skew. They break the measure the page promises.
- ScrambleText decodes. A cliche.
- The snapDOM capture-and-swap. Replaced by CSS3D camera sync, which keeps type vector-crisp and removes the seam.
- Lenis. Scroll stays native.
- The ruled and halftone portraits. One treatment only, and halftone was the rejected Plumber look.
- Streak-bound name weight and commit-bound row weight. The automation inflates both, and a reset thins his name. Data lives in marks, never in weight.
- The A to Z rail, the specimen matrix, the editions archive, the gyroscope, the nightly product screenshots and the Living Edge odometer.
- Desktop idle autopilot.
- The slice-assembled name. The bisection replaces it.
- The 'Open.' cube footer. GL stays in one region, and the address is a more useful last word.

CONFLICTS RESOLVED:
- Grid: 12 columns, not Gerstner's 58 units, because the columns are the month lanes.
- Pin length: cut from 500vh to 400vh, with 4 snap labels instead of 6.
- Idle motion: none on desktop. Touch devices get one tell, which never repeats.
- Scroll sound: only the filing grains in the Sort, where the sound is the data.
- Red: marks something that went public, and every red mark has a receipt.
- Hero dock versus name on the floor: the name tips with the sheet, and the masthead carries a small name from first paint.
- Intro audio: dropped. Turning sound on replays the bisection with ticks as the reward.

VERIFY BEFORE BUILD:
- Mona Sans tnum survives the subset.
- Launch dates for slop-engine and awesome-image-prompts come from a curated ledger.yml. The API gives created_at, not the date a repo went public.
- Paper dates and outlines come from their sources.
- Substack archive endpoint for issue dates.
- The new data Action stays separate from the existing tracker cron.
- Text raster sharpness of the 3D-transformed DOM sheet in Chrome and Safari.

## Critic verdicts (before refinement)

- **juror (6.5/10):** Not Site of the Day as written. It's the closest anything in this round has come, though, and one structural fix could get it there. The portrait-to-year idea is real authorship: the face is made of the same units as the work, and grey versus black commits is an honesty move I haven't seen on a founder site. But the signature moment breaks on arithmetic. About 14k black cells can't map onto a year of public commits, which is probably 1 to 2k. So "the face files itself into the year" really means most of his face falls through the floor. Then the 400vh climax ends on the contribution graph that's already on his GitHub profile. Around that core, too many parts are this year's standard type-portfolio parts: the fitted name with a red period, cursor-proximity weight, the Bayer dither, column-blind wipes, a giant footer email, a sound toggle, Press G for the grid and a status chip in the masthead. Built perfectly, it's a likely Developer Award and a coin-flip for SOTD. To be remembered a month from now, it needs three changes. Every cell has to be a commit, with nothing discarded. The year should be drawn like an axonometric plate, so it doesn't read as a 3D bar chart. And the cubes should keep travelling into the Index, so the page never wipes to a new scene.
- **engineer (6/10):** Buildable on static GitHub Pages, and the signature is a cheap GPU problem. Print to Relief to Sort to Plan comes to 14k to 30k instances, 2 draws and about 280k to 600k vertices a frame, which is trivial on an M1 and fine on a Pixel 7 at DPR 1.25. First load is about 280 KB: font 70, JS 90 to 110 gz, texture 60 to 90, data 14. That is after the current 367 KB inline Manus runtime is dropped.

It can't ship as written. Five problems in the spec block it:
1. The intro hides the name until about t0+1.2 s and the bio until t0+2.04 s. LCP lands at font load plus about 2 s, which is around 2.5 to 3 s on a mid phone. That breaks its own 1.5 s budget.
2. Only black cells extrude, so the relief reads as perforated noise. The face highlights, including the nose that is meant to "lead", are white cells and never rise.
3. Slot geometry for the Sort is missing. Four-pixel cubes in a 90 px lane give a skyline you can't read at 1440.
4. The automation versus "hand" split has no classifier. Both the tracker and his automations commit as philipbankier, and many interactive commits are co-authored by Claude. "By hand" breaks the no-unverifiable-claims rule.
5. A /data Action that commits to main races the external tracker cron, which pushes from a /tmp clone.

Riskiest piece: the live DOM sheet in matrix3d, registered to the GL camera through a dolly zoom from near-orthographic. The risks are a one-frame present desync on Safari between the WebGL canvas and the compositor transform, garbage when a corner reaches w<=0, and blurred text while the sheet is magnified. This needs a day-1 spike.

At 4K, fixed 4 px cells give 460+ cells across from a 280 px texture and 100k+ instances, and a DPR 1.5 clamp gives an 18 MP MSAA buffer. Cell tiers and a pixel budget fix it.

The full spec is about 12 bespoke systems and roughly 48 engineer-days. A cut of Hero, Sort, Index and Write, with the corrected recipes below, is about 22 days and keeps everything that makes it breathtaking.
- **brand (6/10):** Serious builder, with one costume layer and one data problem that needs fixing before the build. Every line in the 28 copy samples passes the voice rules: no em dashes, triplets, "not X, it is Y" constructions, emoji or exclamation marks. Making him "show receipts" is the right brand move for founders and partners. The problem is what the receipts would actually show. I checked GitHub on 2026-10-07. Over the last year he has 227 public commit contributions against 1,257 private ones, and some of the public ones are tracker commits to the site repo, which the concept excludes. The awesome-agent-skills "daily automation" is github-actions[bot] posting "sync: update data" on irregular days, with nothing between Oct 3 and Oct 6. As specified, the signature section would show a thin year that's mostly a bot. It would hide ActRun, which is private, and the page's single red accent would usually point at a bot sync commit. Smaller issues: four copy claims are already false or stale, the hero holds back the bio for 2 seconds, and the GitHub-made typefaces plus the 3D commit skyline (adapted from github/gh-skyline) give the page a GitHub look rather than a Kairox AI one. Fix the data model and the claims and it's a 8. As written it's a 6.
