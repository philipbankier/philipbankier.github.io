# Elevating the four directions

2026-10-08. Replaces the first-round mockups, which the client judged weak, and rightly: they were static CSS pages whose only motion was a fade-up.

## How this was made

- **Research:** seven sweeps, 110 references cited. A separate fact-check agent opened every URL; 107 survived, 3 were dropped for mismatched claims. Library: [research/references.md](research/references.md). 82 build recipes: [research/techniques.md](research/techniques.md). Audit of what reads as generic, including the first-round mockups: [research/anti-patterns.md](research/anti-patterns.md).
- **Concepts:** per direction, three art directors pitched through different lenses (spectacle, interaction craft, world-building). A judge merged them, then an awards juror, a WebGL engineer and a brand guardian attacked the result, then a final pass applied the critiques.
- **Full specs** (65 to 75 KB each, shot-by-shot, with timings, recipes and copy samples): [concepts/](concepts/). Shared motion system, perf budget and prototype plan: [concepts/compare-and-foundation.md](concepts/compare-and-foundation.md).

## The idea all four found independently

**The portrait is built from his real record.** Philip has one low-res casual photo. Instead of hiding that, every direction turns it into a deliberate image made of his actual output, pulled from GitHub at build time, so the hero is both the most beautiful thing on the page and the proof that he ships. The directions differ in material: ink on drafting film, dithered cells, a phosphor beam, an engraved copper plate.

## The four

### Option 2 · The Plumber: "PB-0001: The Works"

**Ten seconds in:** cool green-grey drafting film under a lamp. Pens plot the sheet border, then draw his face as contour lines lifted from a depth map. His name is lettered in outline, then hatched solid. A red "AI Agent Plumber" stamp lands and bleeds into the paper fibres. Under the portrait hangs a valve tag: "V-01 Main. Closed."

**Signature moment:** turn the valve, by dragging the hand-wheel or by scrolling. Red ink pushes through a pipe under pressure, then the camera pulls back from 1x to 0.16x. The hero was only Detail A on one large engineering drawing of his whole operation. Red floods only the lines that are live today, and ActRun is the biggest pump on the sheet.

**More:** holding on the portrait turns on a light table so the real photo glows faintly through the film. The ledger is "The Mains," a pipe that snakes one row per month and draws hand-made work and automation differently. Return visitors see revision clouds around what changed. At the bottom the A0 sheet folds into an A4 packet whose title block is the contact card. Blueprint (diazo) is the dark mode.

**Build:** 45 days (v1 26). **Prove first:** a half-day likeness test, then 6 days on the pull-back. Pre-refinement scores: juror 6, engineer 5, brand 7.

### Option 3 · Swiss Index: "Set and Filed"

**Ten seconds in:** warm paper, a 12-column grid, the name in heavy black. Pale blue outline guesses of the name converge on the right-hand rule, the typesetting made visible, and a red full stop drops into place. His face is a dithered print in which every cell is one GitHub contribution from this year. Hovering lifts cells like a pinscreen and names the contribution under the cursor.

**Signature moment:** scroll and the face rises into a relief. The page then tilts and lies down as a drafted plate, and every cell files itself into its month as cubes. You see the real shape of his year: November nearly empty, February towering, a peak of 47 in one day. Then the towers topple into the index rows of the work they belong to, and one red full stop travels to the last thing he shipped.

**Build:** 30 days (tier 1 is 20). **Prove first:** 4-day data-to-plate spike. Pre-refinement scores: juror 6.5, engineer 6, brand 6.

**Blocker:** 1,257 of his 1,525 contributions this year are private. With public work only the print has about 268 cells, too few to form a face. It needs Philip's permission to show private counts. They're already visible on his GitHub profile, but it's his call.

### Option 4 · Phosphor: "Long Persistence"

**Ten seconds in:** a putty-grey lab instrument with one dark glass tube window. A blue-white beam signs "Philip Bankier" in a single stroke. That stroke unspools into 96 scan lines that swell into his face, and the trail cools from blue-white to yellow-green the way real P7 phosphor does. The cursor bends the scan lines like a magnet.

**Signature moment:** scroll and the face stands up as a ridge relief, then crushes into one white-hot line. That line swings into the arm of a radar sweep, and its first turn lights everything he has shipped as blips. Colour means age, and every blip links to its source.

**More:** a "hear the drawing" lever plays the beam's own path as stereo oscilloscope audio, which is the moment people will screen-record.

**Build:** 34 days (v1 26). **Prove first:** one tube on one page, 5 days. Pre-refinement scores: juror 6.5, engineer 5, brand 6. **Needs from Philip:** a real signature, and an approved ActRun run log.

### Option 5 · Plates: "Open Edition"

**Ten seconds in:** a dark press room. His name in tall Bodoni, the bio already readable. Under a steel roller sits a copper plate engraved with his mirror-image portrait in about 220 lines, one line for every day since 28 February 2026. Today's line is cut live. A roller inks the plate and a cloth wipes it, and his face comes up as bright copper in black ink. You can wipe the plate yourself with the cursor.

**Signature moment:** scroll cranks a working etching press. The bed drives under the roller and felts, and you peel your own print. Every later section comes up out of that same roller, so one mechanism runs the whole site.

**The honest part:** lines cut by hand are days he pushed work himself. Machine-ruled lines are days only his automations committed. About 89 of the 222 days are hand days. The brand line, "I build the machinery that runs the work," becomes something you can see under a moving lamp.

**Build:** 26 days, the cheapest full build. **Prove first:** the plate on real data, 1.5 days. Pre-refinement scores: juror 6.5, engineer 5, brand 6. The juror's forecast after the fixes: about 8.5, a likely Site of the Day. **Watch:** it's over the shared performance budget as specced (about 700 KB first visit) and needs deferral fixes. The brand guardian warns it can read as printmaker costume before builder, so the ActRun line has to stay in the hero.

## What this really costs

Each direction is **26 to 45 days** of build. The first-round mockups took about an hour each, and that gap is the honest difference between "standard output" and breathtaking. The engineering reviews found the first estimates 2 to 2.5x low. The finals were re-estimated, but plan on about 25% contingency.

## Recommendation

Don't commit to a 26-to-45-day build from a document. Spend about 4 days making the decision cheap:

1. **Shared groundwork, 2 days.** Build the real ledger pipeline (hand vs automation commits, tracker cron excluded by path) and the portrait maps (matte, depth, face landmarks). Every direction needs both, so nothing is wasted.
2. **Likeness panel, 2 days.** Render all four portraits from that same real data: the Plates engraving, the Plumber contour plate, a Phosphor raster still, the Swiss cell print. Five people who know Philip try to name him at phone size. Any direction whose portrait fails twice is out.
3. **Then the signature-moment spike for the leader**, with a 10-second screen recording for Philip before anything else gets built.

My lean is **Plates**: the most beautiful single frame, the cheapest build, one mechanism carrying the whole site, and its risk concentrated in one image that can be proven in a day and a half. **Plumber** is the alternate if Philip wants "AI Agent Plumber" as his headline identity, since it gives the strongest builder read.

## Questions only Philip can answer (they gate directions)

1. May private contribution counts appear on the site? A no removes Swiss.
2. Does the Yohei tracker cron stay on `main`, move off it, or come down? It commits as him, which pollutes every data-driven version.
3. Can he supply a few photographed signatures and an approved, sanitized ActRun run log? Phosphor needs both.
4. Confirm: `philip@kairoxai.live` as the contact address, PromptCache as part of Kairox AI, and which product screens may be traced or engraved.
5. Who are five people who know him well enough for the likeness panel?

## Facts checked along the way

- `slop-engine` is a fork of `harry0703/MoneyPrinterTurbo`. The first-round mockups listed it as his work, which the brand kit forbids, and it has now been removed from all four.
- The live site's "What shipped" ledger is still the hardcoded 22 August snapshot.
- `awesome-agent-skills` is at 20 stars; the briefing I gave the agents still said 15. Every number in the new builds is read from build-time data, never hardcoded.
