# Option 5 · Plates: Open Edition

> A working etching press in a dark room, cranked by your scroll. Philip's portrait is a copper plate engraved with one line for every day since 28 February 2026: burin-cut on days he pushed public work himself, machine-ruled on days only his scheduled automations committed. You wipe the plate, drive it through a fixed steel roller and peel your own print, then read the rest of the site as sheets coming up out of that same roller.

**Build estimate:** 26 days · **Critique scores before refinement** (out of 10): juror 6.5, engineer 5, brand 6

## What you see in the first 10 seconds

0s. A black room. On the left is 'Philip Bankier' in tall rag-white Bodoni. Under it the bio is already sharp and readable: 'Co-founder of Kairox AI. I build the machinery that runs the work, in the open.' On the right, seen from straight above, a polished roller crosses a steel press bed, with two charcoal felts thrown back over it. Below the roller lies a copper plate. Engraved in it is a mirror-image portrait of a young man with his arms crossed, made of about 220 fine near-horizontal lines that bend around his face, with his name in reversed capitals beneath. A streak of light slides across the copper.

About 1s. The poster comes alive. The view pushes in toward the top of his head and a steel point crosses the crown. Today it's a ruling machine's diamond, leaving a straight, even, shallow line. Pencil writes in the margin '7 October 2026, ruled at 07:17 UTC. Only my automations committed that day.' Then the view settles back.

About 2.5s. A small roller drops in below the big one and rolls warm black ink down the plate. The copper goes glossy black.

About 3.2s. A cloth wipes a figure eight across the face, and the portrait comes up as bright copper lines filled with black ink. Pencil writes 'Press and drag to wipe the plate. Scroll to pull a print.'

4 to 7s. Moving the mouse swings the light. Some lines flash bright along their walls (cut by hand) and others stay dull (ruled by machine). Dragging across the plate wipes ink away under the pointer.

7 to 10s. The first scroll tilts the whole view back 26 degrees. The roller's iron cheeks and the bed rails appear, and it's clearly a press. A damp sheet drops onto the plate and the felts fold down over it. The bed starts sliding up under the roller at exactly the speed of the scroll, while the star wheel in the top bar turns. With sound on, a low rumble plays and stops the instant the scroll stops.

## Signature moment

THE PULL. It's pinned for 160vh on desktop and 140vh on mobile. Every shot is scrubbed by scroll and reverses on scroll-up, and only the drying at the end is timed. There's one snap label, 'pulled'. Lenis applies it by idle detection on pointer devices only (lenis.scrollTo(labelY, {duration: .5}) after 150ms of stillness), and never on touch. The press works like a real etching press: the roller stays fixed and the bed is driven through it under felt blankets.

AT REST. Seen from straight above, a steel bed with rails runs down the centre-right of the frame. A brushed-steel roller crosses it at 30% of viewport height, with two charcoal felt blankets thrown back over it. Below the roller lies the inked, part-wiped copper plate, from 34% to 94% of viewport height.

SHOT 1, SET (p 0 to .14). The camera pulls back to 1.55x distance and tilts from 0 to 26 degrees (power2.inOut). The roller's cast-iron cheeks, the bed rails and the gear housing come into view, and the visitor sees the whole press. A damp rag sheet with a torn deckle drops onto the plate on a 40x50 vertex grid, its corners lagging (sag z = -0.04 sin(pi u)(1-p)). It's 18% translucent, so the inked lines show through it, mirrored. Then the two felts fold forward off the roller one after the other and lie over the sheet. They're baked curls of 28 frames each, scrubbed.

SHOT 2, DRIVE (p .14 to .52). The bed moves up through the nip at exactly scroll speed. One CSS pixel of scroll moves the bed one pixel at the nip line, so it feels like ordinary scrolling while the press does the work. Roller rotation equals distance over radius, and the star wheel in the running head turns through the same angle. The felts ride into the nip with a 4px bulge along the contact line. When the plate's leading edge meets the roller, the frame judders 1px for two cycles over 90ms. With sound on, the rumble follows bed speed, because here the scroll is the crank.

SHOT 3, BLANKETS BACK (p .52 to .58). The felts are thrown back over the roller one at a time.
RELIEF (p .58 to .62) is a plateau in the progress curve where only the light moves. The back of the sheet shows the face as white-on-white relief, mirrored, with damp ink wicking faintly through. A crisp plate mark is pressed in by the blankets the visitor just watched go through. Moving the cursor rakes the light across it.

SHOT 4, PEEL (p .62 to .84).
- The tack holds first: curl progress stalls for 3% of p, then jumps 1.5% as the ink lets go.
- The sheet lifts from its far edge and turns over the plate's right edge like a book leaf. The curl radius grows from 18 to 64px on cubic-bezier(.45,.05,.25,1). The fibre is backlit, the curl edge shows a 1.5px paper thickness, and the curl casts a soft shadow.
- The underside is the print, right-reading, with a 3px band of tack stipple along the separation line. The name that read backwards on the copper becomes legible as it rolls over.
- Camera tilt eases from 26 to 12 degrees.
- The sheet lands printed side up beside the plate on an air cushion (cubic-bezier(.16,1,.3,1)). A 0.35 degree two-cycle flutter plays as the trapped air escapes, and the ink-tinted contact shadow tightens from 24px to 2px.
'pulled' snaps on the frame people will screenshot: the copper plate and the print side by side on the steel bed, mirror images across the hinge, with the roller and its iron cheeks below them.

SHOT 5, CLEAR (p .84 to 1.0). The plate lifts (scale 1.03 as its shadow opens) and slides off the far end of the bed (power3.in). The camera flattens to 0 degrees and dollies along the bed until the print sits centre-right and the roller rests at the bottom edge of the viewport. The roller stays there for the rest of the site as the nip. When the pin releases, scroll keeps driving the bed, and every later section comes up out of that roller.

DRY (timed, plays once). The wet specular decays from 0.6 to 0.08 over 1400ms (sine.out) and the cockle normals flatten. Pencil writes at 22ms per character: 'Impression of 8 October 2026, wiped by you.' at lower left and 'Cut by hand on {cuts} of {days} days.' at lower right. At +900ms the PB chop embosses into the lower right corner (scale 1.06 to 1, 140ms power4.in).

INTERRUPTS. Scroll position is the only state.
- Clicking the plate calls lenis.scrollTo('pulled') over 1.6s.
- During the peel, the sheet's corner (96px hit area) works as a scroll proxy: pointer delta maps to lenis.scrollTo(y, {immediate: true}). Released past 55% it completes; otherwise it springs back (stiffness 180, damping 14).
- Dragging the star wheel cranks the whole page.
- The 'Work' and 'Record' links fast-forward the pull at 4x, so the state stays coherent.

## Intro sequence

First visit on a new build, desktop. Two clocks run in turn, and the handoff between them is explicit.

CSS CLOCK, FROM FIRST PAINT
- 0ms: HTML paints the press room (#0A0B0D), the running head and the left text block, all fully inked. The block holds the h1 'Philip Bankier' in Bodoni Moda, the bio, the plate label and the hero link. The bio isn't animated, because it's the one line every founder reads.
- At centre-right sits poster-press.avif (about 60KB, fetchpriority=high), which is the LCP element. It shows yesterday's finished plate in bare polished copper on the steel bed, under the roller and its thrown-back felts. The daily build renders it from the same shader.
- 0 to 700ms: a lamp sweep crosses the poster. It's a mask-image linear-gradient specular band on a 700ms keyframe and needs no JavaScript, so the copper catches light while the runtime is still loading.

GL CLOCK, FROM THE FIRST PRESENTED FRAME (t0)
Runtime JS loads after LCP and compiles programs small-first: copper, then ink, then print. t0 is the first frame actually presented, typically 0.6 to 1.2s on a laptop and 1.5 to 3s on a phone. The canvas crossfades over the poster in 200ms, and nothing claims to be pixel-identical.

- t0 to t0+350ms: the camera pushes in 1.8x toward the crown (power2.out).
- t0+350 to t0+1050ms, THE NEWEST LINE: exactly one line is cut, for the newest complete UTC day in the record, and the day's kind decides the tool.
  - Hand day: a burin cuts left to right with a swelling entry and a fine exit taper. A curl of copper swarf lifts off the tip, and a burr glint rides along and cools over 400ms.
  - Automation-only day: a ruling machine's diamond point crosses in 420ms, dead even, with no swarf.
  - Quiet day: a graphite guide line is drawn and left uncut.
  Pencil writes in the margin at 22ms per character. For 7 October 2026, a day when only automations committed, it reads '7 October 2026, ruled at 07:17 UTC. Only my automations committed that day.'
- t0+1050 to t0+1500ms: the camera settles back to 1x (power2.inOut).
- t0+1500 to t0+2100ms, INKING: a brayer drops just below the roller (back.out(1.4), 200ms) and rolls down the plate, its rotation equal to distance over radius. The ink front is smoothstep(edge, edge+0.02), offset by fbm(uv*6)*0.06 so it reads as hand-rolled. The film rises to full over 600ms, and the copper turns glossy warm black.
- t0+2100 to t0+3000ms, AUTOPILOT WIPE: a tarlatan path traces a figure eight centred on the face (amplitude .32 x .22 uv, sine.inOut). It's seeded from the newest SHA, so each day's plate is wiped differently. Coverage reaches about 55%, and the face reads as bright copper lines in black ink. Pencil writes 'Press and drag to wipe the plate. Scroll to pull a print.'

IDLE. The light's angle follows the cursor with weight and settle: L += (target - L)(1 - exp(-dt*5)). After 2500ms without pointer input the autopilot resumes at 0.35x until coverage reaches 85%, then the render loop sleeps.

INTERRUPTS. Any scroll ramps the intro's timeScale to 3.5 over 180ms and hands straight into Shot 1 of the pull. Any key jumps to the wiped state in 240ms.

RETURN VISITS (localStorage keyed by build date, wrapped in try/catch)
- Same build already seen: frame 0 already includes the newest line, which glints once. Inking and wiping play at 2x.
- Same session: opens on the inked, wiped plate with no intro.
- New build: the full sequence, with the new line and a new wipe seed.

## Portrait treatment

A LINE ENGRAVING WITH ONE LINE PER DAY, DRAWN BY ONE ANALYTIC SHADER. The raw photograph never appears anywhere, not even under the linen tester.

OFFLINE, ONCE (about half a day)
1. rembg (u2net_human_seg) mattes out the park. The curly hairline and the gaps between the crossed arms are fixed by hand.
2. Depth Anything V2 Small gives depth. It's blurred at sigma 12px, forced to 0 outside the matte and feathered over 24px, so no line folds at the silhouette.
3. Luma is taken in linear light, pre-blurred 1.2px, then run through levels (0.08 to 0.92, gamma 0.9) and light CLAHE. The lilac shirt holds a clean midtone and the crossed arms supply the darks.
4. A contour field derived from the depth normals bends lines around the eye sockets, cheekbones, jaw and forearms.
5. Everything is packed into two RGB lossless WebPs with no alpha, because browsers premultiply alpha on decode and corrupt data channels. data-b holds the matte in R, depth for normals in G and Sobel edge in B.

DAILY, IN THE BUILD (node and sharp, about 2s)
- The line field is phi = y' + M(x, y') * warp(x, y'), where y' is uv rotated by -6 degrees and M is the feathered matte.
- warp has three terms:
  - the cylinder proxy asin(2x-1)/pi, with x clamped to [.05, .95] and per-row extents Gaussian-smoothed over 20 rows
  - the blurred depth x0.03
  - the contour field
- M takes the warp to zero outside the figure, so the park becomes straight hairline machine ruling, like the sky in a classic engraved portrait.
- The slope is clamped (d warp/dy stays above -0.6), so lines never fold or cross.
- phi is written at 16 bits across R and G of data-a, with luma in B. The shader and the CPU read this one bitmap, so the record's SVG textPath and the GL line can't drift apart.

SHADER (one quad, precision highp float throughout, so fract(v) holds on mobile GPUs)
- v = phi * N, where N is the number of days in the current state. floor(v) is the day index, with the newest day at the crown and 28 February 2026 at the bottom edge.
- Base half-width is w = 0.5 * mix(0.06, 0.92, pow(1-luma, 0.85)), and ink = 1 - smoothstep(w - fwidth(v), w + fwidth(v), abs(fract(v) - 0.5)).
- A 1D texture built from ledger.json gives each day's kind, and the kind sets the mark:
  - Hand day (burin): a V-groove profile. The width swells in over a 12% entry taper and thins to a hairline exit. Dot-and-lozenge flicks sit in the midtones on either side; they're the engraver's work and carry no data.
  - Automation-only day (ruling machine): the same path and the same luma, so the likeness holds. Its width is quantised to four even steps, its ends are square, its groove is flat-bottomed at 75% depth, and it gets no flicks. It prints lighter and stays dull under the light, while burin grooves flash along their walls.
  - Release or launch day: 1.35x wider, with a burnished halo.
  - Quiet day: a 0.4px graphite guide line, left uncut.
- Normals are analytic. The groove profile's derivative times the gradient of the continuous, unwrapped v gives n = normalize(vec3(-k * dh/dv * grad v, 1)). The anisotropic tangent is perpendicular to grad v, so there are no dFdx facets from the fract'd profile.
- Luma and phi are sampled with a 4-tap bicubic B-spline wherever magnification goes above 1.5x, so the 449x561 grid never shows as kinks under the tester.

DENSITY. The record has 222 lines today. On a 640px desktop plate that's a pitch of about 2.9 CSS px, inside the 2.5 to 3.2px range of a banknote portrait. On phones the plate and print regions render at DPR 2 while the rest of the canvas stays capped at 1.25, which holds the pitch at 3.9 device px on a 375px screen. The source only decides line widths, never pixels, and bicubic sampling covers magnification.

STATES. A state holds 240 lines, so the pitch never gets tighter than that.
- State I runs at -6 degrees and fills on 25 October 2026.
- State II begins on 26 October. New days are cut as a second system at +60 degrees, only where luma is below 0.38, so the portrait deepens in the shadows instead of getting finer than the eye can resolve.
- State III will run at -60 degrees.

THREE READINGS, ONE FUNCTION
- Copper: mirrored, with grooves as a height field. It's GGX copper (albedo #B4704A, F0 0.95/0.64/0.54, roughness 0.35) with patina fbm and the anisotropic glint, lit by the lamp.
- Inked: groove ink plus a surface film with Beer-Lambert absorption, so a thin film reads warm grey-brown and pooled ink reads near-black. The wipe mask removes the film.
- Printed: right-reading, with the ink standing as raised relief. The plate tone equals the film this visitor left. It has a 2px plate-mark bevel, cotton-fibre normals and a wet sheen that dries.

MICROTEXT. A canvas-2D atlas is built in idle time from ledger.json, set in a static Newsreader instance. It's packed as a 2D grid, with rows no taller than 4096px and 2px padding against mip bleed. Each day gets one 14px row, squeezed into its band and mipmapped, so at 1x it merges into a solid line. Only the line at reading height ever becomes a real, selectable SVG textPath.

LETTERING. 'PHILIP BANKIER' under the portrait and 'AI Agent Plumber' in the remarque are baked offline with msdfgen from Bodoni Moda (opsz 96, wght 500), about 6KB in all. They're cut as hatched grooves, mirror-reversed on the copper, next to a tiny engraved pipe wrench in the lower plate margin.

## The ledger moment

THE RECORD IS THE FACE. There's no table. Every line of the portrait is one calendar day since 28 February 2026, the day awesome-agent-skills was created, which is the earliest public artifact in the record. The newest complete UTC day sits at the crown and the first day at the forearms. Today that's 222 lines.

WHAT EACH LINE MEANS
- A swelling, burin-cut line is a day Philip pushed public work himself.
- A shallow, evenly ruled line is a day only his scheduled automations committed.
- Releases and launches are cut 1.35x wider, with a burnished halo.
- Quiet days stay as pencil guide lines.
A first pass over the GitHub API finds hand commits in every month since March, interleaved with automation days. That's why the distinction lives in each line's mark rather than in bands across the face.

DATA. deploy.yml computes everything at build and writes it to dist only. Nothing is committed.
- Commits come from all 79 of his public repositories.
- automations.json holds reviewed rules that mark automation commits, each with a plain description used in the copy. It covers github-actions[bot], such as the daily 'sync: update data' commits to awesome-agent-skills. It also covers commits under his own name that match a rule, because the tracker cron in philipbankier.github.io commits as philipbankier. Author alone can't separate hand from machine.
- Releases come from the GitHub API: tastekit v0.1.1 on 3 April 2026 and v1.0.0 on 10 May 2026.
- launches.json is reviewed by hand, and every row carries a public source URL. The build fails if any of those URLs returns 404. It starts with PromptCache (22 August 2026), awesome-image-prompts (25 August 2026) and slop-engine (26 August 2026). ActRun is added only once it has a public launch date. The text view says 'Launch dates are entered by hand, with sources.'
- A day's kind is the strongest thing that happened that day, in this order: launch, release, hand, automation, quiet.

THE DESCENT. The record sheet carries a large proof of the same plate, wiped clean and 88vh tall on desktop. It's pinned for 140vh on desktop and 120vh on mobile. Five milestones are held as plateaus in the progress curve. Lenis idle-snaps to them on pointer devices, and nothing snaps on touch. 'Skip the record' sits in pencil beside the sheet throughout.

D0, LOOK CLOSER (p 0 to .08). Pencil writes 'Look closer.' A brass linen tester unfolds over the newest line (hinge 90 to 0 degrees, 300ms back.out(1.4)). It has a folding frame, a flat lens and a millimetre reticle on its base.

D1, THROUGH THE GLASS (p .08 to .18). The tester's frame scales until it is the viewport, and magnification rises to 4.5x on desktop and 8x on phones (expo.inOut, scrubbed). That puts the reading band at 16px. The engraver's rule draws down the inner margin, with a tick per line and month names where the months turn. It's computed from the same phi at the margin, so every tick meets its line.

D2, FLIGHT (p .18 to .88). The camera travels down the face from the newest line to the first. Its x follows the matte centroid at each height, so the path runs from hair to brow, eyes, mouth, chin, collar and forearms. Between stops the lines stream past, and at this scale the even ruled lines and the swelling cut ones are plainly different. Five stops each hold for about 6% of p:
1. The newest line.
2. 22 to 26 August 2026. Three lines lift together: PromptCache, awesome-image-prompts and slop-engine. PromptCache's caption hangs at 108px, '22 August 2026. PromptCache launched.' The two repo launches get 48px captions, so a repo name never reads as a headline.
3. 10 May 2026, tastekit 1.0.0.
4. 3 April 2026, tastekit 0.1.1.
5. 28 February 2026, the first line.
At each stop:
- The line at reading height lifts on a 3px ink-tinted shadow and its band opens 2.5x.
- Its microtext hands off to a selectable 13px SVG textPath (date, repo, commit subject, short SHA), built on the CPU from the same phi bitmap.
- A placard prints wet in the outer margin and dries. It holds the date in Bodoni Moda opsz 48, the repo and subject in Newsreader, and the SHA linked to its commit.

D3, PULL BACK (p .88 to 1.0). Magnification returns to 1x, the sentences reassemble into the face, and the newest line glints under the light. Pencil reads 'Cut by hand on {cuts} of {days} days.' and beneath it 'Faint pencil lines are quiet days.' If the morning build didn't run, it reads 'The press didn't run this morning. The newest line is {date}.'

OUTSIDE THE DESCENT
- 'Look closer' opens the tester in place for free reading, from the pencil link or by pressing and holding on any print. Drag, or use the arrow keys, to move one day at a time. Ruled days read 'Ruled by my automation, which synced the skills index.'
- 'Show only hand-cut lines' lets the ruled and pencil lines fall to plate tone over 400ms, leaving the portrait his own hand cut.
- 'Read the record as text' drives uUnweave from 0 to 1 over 1400ms (power2.inOut). Lines straighten, widths equalise and rows spread to 28px until the face is a ruled page. At 1.0 a DOM ordered list takes over, and each run of consecutive automation days is grouped into one entry, for example '{start} to {end}. Ruled by my automation, which synced the skills index.' Pressing it again reweaves the face.

The face gains a line every morning the press runs, and the cuts show which of those days were his.

## Section by section

### Running head and the nip (persistent)

- **Visual:** TOP. The running head sits on press-room black.
- At left, 'Philip Bankier' in Newsreader 15px, rag.
- Five plain links in Newsreader 15px: Work, Record, Code, Research, Write. The current section's link sits on a 1px rag rule.
- A 40px star wheel with four spokes and ball ends, drawn in SVG and shaded from the light angle.
- 'Sound off' at far right.

BOTTOM, THE NIP. A brushed-steel roller lies across the bottom edge of the viewport. It's 56px in diameter with its top 30px showing, knurled at both ends where the bed rails run out, and its long horizontal highlight slides as it turns. Everything above the roller has just been printed.
- **Motion:** The roller and the star wheel turn with scroll for the whole page, with rotation equal to distance over radius. When a sheet's leading deckle edge enters the nip, the frame judders 1px for two cycles over 90ms.

Text that comes up out of the nip for the first time prints wet. A registered @property --wet drives -webkit-text-stroke from 0.5px to 0 and a same-ink 0.6px text-shadow to 0, on the drying curve over 1400ms. Text you scroll back to is already dry.

The current-section rule draws in (scaleX 0 to 1, 320ms power2.out). The running head never swaps in section names.
- **Interaction:** - Links jump with lenis.scrollTo over clamp(0.8, distance/2400, 1.6)s on expo.inOut. Jumping past the pull fast-forwards it at 4x.
- Dragging the star wheel cranks the page as a scroll proxy, with one full turn equal to 100vh. Arrow keys on the focused wheel step one section.
- On mobile the links fold into 'Index', which opens them as a sheet. The nip shrinks to an 18px band above env(safe-area-inset-bottom).

### The press (hero)

- **Visual:** Press-room black. The left text block sits on a Van de Graaf canon, with inner, top, outer and bottom margins in the ratio 2:3:4:6. It holds:
- the h1 'Philip Bankier' in Bodoni Moda opsz 96, wght 500, clamp(64px, 9vw, 144px), line height .92, tracking -0.01em, rag
- the bio in Newsreader 22px
- the plate label in Newsreader italic 15px: 'One line for each day since 28 February 2026. Cut lines are days I pushed public work myself, and ruled lines are days only my scheduled automations committed.'
- the hero's one link: 'Building ActRun now. It's AI that runs your work.'

Centre-right, seen from directly above, is the press bed with its rails. The roller crosses it at 30% height with two felts thrown back over it. Below the roller lies the copper plate, 60vh tall at 449:561 plus a plate margin. It carries the mirror-engraved portrait, 'PHILIP BANKIER' in reversed engraved capitals beneath it, and a tiny engraved pipe wrench as a remarque in the lower margin.
- **Motion:** The intro (lamp sweep, newest line, inking, wipe) runs into the pull's five scrubbed shots.

Under the moving light, hand-cut grooves flash along their walls and ruled grooves stay dull, so the two kinds of day separate before anyone reads a word.

After 4s without input the light drifts on a 14s Lissajous until the autopilot finishes, then everything sleeps.
- **Interaction:** Moving the cursor changes the light's angle (azimuth 160 to 235 degrees, elevation 6 to 30 degrees). There's no spotlight circle: the pool of light stays put and only the raking angle moves.
- Press and drag on the plate to wipe (radius .10 uv, strength 1.0). The film smears in the drag direction and stays wiped.
- Click the plate to run the pull to 'pulled'.
- Press and hold for 350ms on the plate or the print to open the linen tester at 4.5x.
- Click the remarque: the tester snaps onto it and pencil writes 'Remarque, cut in the margin. My other title: AI Agent Plumber.'

### Work (ActRun and PromptCache)

- **Visual:** One deckled sheet with two plates side by side, ActRun on the left and PromptCache on the right (stacked on mobile).

Each plate is a line engraving of the product's real homepage hero, taken from a hand-approved capture. The same line shader cuts it at a 3px pitch, and the headline lettering is cut from MSDF so the product's own words stay crisp. It sits in a blind plate mark.

Beside each plate, in DOM ink and readable the moment it leaves the nip:
- the name in Bodoni Moda opsz 72, wght 500
- the product's line in Newsreader 21px: 'ActRun. AI that runs your work.' and 'PromptCache. A free library to save and share prompts.'
- the URL as a plain link

An italic caption names the source: 'Engraved from a capture of actrun.ai taken on {date}.' The foot of the sheet reads 'Both are Kairox AI products.', linked to kairoxai.live. There's no tissue and no third card.
- **Motion:** Each plate prints as it crosses the nip. The plate-mark bevel presses in 2px over 180ms, the lines stand up as inked relief, and the wet sheen dries over 600ms on the drying curve.

PromptCache prints one gutter-width after ActRun, so the two land a beat apart with no staggered timer.
- **Interaction:** - Hovering a plate narrows the light's specular so the plate-mark bevel sharpens (200ms).
- Mousedown deepens the impression 1px in 90ms and releases it in 160ms, then opens actrun.ai or promptcache.live.
- Press and hold opens the tester on the engraving.

### Record (the daybook)

- **Visual:** A second deckled sheet carries a large proof of the same plate, wiped clean, 88vh tall on desktop and captioned 'Proof, wiped clean for reading.'

An engraver's rule runs down the inner margin, with one tick per line and month names where the months turn. A placard hangs in the outer margin. Pencil controls sit under the proof: 'Look closer', 'Show only hand-cut lines' and 'Read the record as text'.
- **Motion:** The descent is pinned for 140vh (120vh on mobile). The tester unfolds, its frame becomes the viewport and magnification climbs to 4.5x. The camera then flies down the face through five held milestones and pulls back to 1x. The full sequence is in the ledger moment.

Nothing else on the sheet moves.
- **Interaction:** - At 1x, hovering a line draws a graphite leader from it to its note in the margin. Nothing dims, and the other lines stay as they are.
- Clicking a line travels to its day (Lenis, 900ms, expo.inOut).
- Up and down arrows step one day, and every SHA links to its commit.
- 'Skip the record' in pencil jumps to the next sheet.

### Code (eight repositories)

- **Visual:** A type specimen sheet set flush left on the canon. The head reads 'Eight of my 79 public repositories. Names print wet for about a week after I push to them myself.' The count comes from the GitHub users API at build.
- One repo per line in Bodoni Moda opsz 72 at clamp(36px, 5vw, 72px), leading .98: awesome-agent-skills, codex-handoff-skill, tastekit, brain-dump, agent-cli-skills, lex-the-computer, technical-visualizer, riskradar.
- Sidenotes in the outer margin, in Newsreader italic, give the repo's own description, its stars where non-zero, and 'Last pushed by hand {d} days ago'. awesome-agent-skills adds 'My automation pushes here daily.'
- A ninth line at the foot, in Newsreader, names the public repo he most recently pushed to by hand. The sheet always shows his latest work, even when the featured eight are dry.
- **Motion:** Wetness is 1 - smoothstep(5, 8, days since the last push by hand). It's computed client-side from repos.json timestamps, so the ink keeps drying between builds.

Wet names carry gloss and 0.5px of ink gain, and dry names are matte. Every name prints wet as it leaves the nip, then dries to its data value over 1400ms, so a moment later only recent work is still wet.
- **Interaction:** The gloss is a light-keyed sheen (background-clip: text) multiplied by wetness, so wet names glint as the light moves and dry ones don't.
- Dragging across a wet name smears it in the drag direction, using an feDisplacementMap on that word, and the smear lasts for the session. Dry names don't move.
- Hovering a name extends its sidenote with the latest commit subject he pushed by hand (180ms). Nothing else changes.
- Clicking opens the repo, and keyboard focus draws a pencil ellipse around the name.

### Research and the newsletter

- **Visual:** A sheet holding four title-page proofs in a two-by-two grid (one column on mobile): The 2026 AI Agent Playbook, April 2026 Agent Roundup, Landscape of Taste Transfer and Mobile Devices as Agent Nodes. Each proof carries:
- the title in Bodoni Moda opsz 48
- the month in Newsreader italic
- the first sentence of the abstract, from papers.json
- a reading time
- one real figure from the paper, engraved through the line shader at build

Below sits The Living Edge: a fore-edge block of hairlines, one per issue, beside 'The Living Edge, my newsletter. Issue {n}: {title}.' The issue number is parsed from the latest post title in the RSS feed. If it can't be parsed, the count and the block are left out.
- **Motion:** No pin. The proofs print as they leave the nip, and a plate mark presses in under each figure. The hairline block settles with a 2px drop as it prints.
- **Interaction:** - Clicking a title opens the paper through the nip transition.
- Hovering a proof narrows the light so its figure's bevel sharpens.
- The newsletter line opens the latest issue.

### Write (contact)

- **Visual:** The last sheet.
- 'Write to me.' in Bodoni Moda opsz 96 at clamp(72px, 12vw, 176px), as a blind deboss.
- Directly beneath it, the email address in full ink at body size (about 15:1), visible from the first frame on every device.
- Outbound links as plain words on separate margin lines.
- One colophon line: 'Reprinted every morning by a scheduled workflow. Build {sha}, {time} UTC.'
- The PB chop at lower right.
- On touch devices, a pencil note reading 'On a phone, you can tilt to move the lamp.' with an 'Allow tilt' link.
- **Motion:** On entry, the light makes one automatic pass across the deboss (azimuth 200 to 135 degrees, 1400ms sine.inOut) and then hands control back to the cursor.

Over the last 30% of the scroll, 'Write to me.' scrubs from blind to kiss impression to full ink (deboss 0 to 2px, ink density .6 to 1), then dries on the curve.
- **Interaction:** - Hovering 'Write to me.' deepens the impression from 2 to 3px in 160ms.
- Clicking the address opens a mail draft. Alt-click copies it, and pencil writes 'Copied.' beside it.
- Pressing the chop embosses it again.

### Paper pages (/papers/*)

- **Visual:** Each paper is one long sheet on the same black bed, set on the canon:
- a title page
- body in Newsreader 19/30px at a 64ch measure, with sidenotes hung in the outer margin
- figures engraved offline through the line shader and shipped as AVIF
- a letterpressed 'Cite this paper' card at the end, with the real title, date and URL

The nip sits at the bottom edge as on the home page, drawn here in CSS. These pages ship no WebGL and about 3KB of JS.
- **Motion:** The page arrives through the nip transition. Headings print wet as they leave the nip, then dry.

The roller's highlight runs on a scroll() timeline. A pencil line on the fore-edge grows with reading progress. Neither needs JS.
- **Interaction:** - The light's angle still follows the cursor for debossed type.
- Hovering a sidenote underlines its anchor in pencil, and hovering an anchor underlines its note.
- 'Copy citation' copies the BibTeX.
- Going back sends the sheet down into the nip.

### The cancelled plate (404) and edges

- **Visual:** The 404 is a static page. It shows a poster of the portrait plate with a deep diagonal score cut corner to corner, the mark printers make when an edition is finished. Pencil reads 'This plate was cancelled. Nothing was printed at this address.', with a link 'Back to the press room'. The build stops copying index.html to 404.html.

EDGES
- og-image: that morning's plate pulled as a print at 1200x630 and rendered by Playwright, so a link shared on Monday unfurls differently from one shared on Tuesday.
- Favicon: the PB chop as an SVG blind emboss, with a dark-scheme variant.
- Print stylesheet: an A4 broadside with the print, the bio and the record as a ruled list.
- **Motion:** On the 404, the CSS lamp sweep crosses the score once (700ms). Nothing else moves.
- **Interaction:** - 'Back to the press room' returns home through the nip transition.
- Cmd+P prints the broadside.

## Type system

Two families, both self-hosted woff2 Latin subsets. There's no monospace, no all-caps in the interface, no letter-spacing on labels, no italic accent words in headings and no middle dots.

BODONI MODA (variable, OFL, opsz 6 to 96, wght 400 to 900, roman only, about 80KB). It's a Didone, the type that grew out of copperplate engraving, so its hairlines match the plate.
- Name: opsz 96, wght 500, upright, clamp(64px, 9vw, 144px), line height .92, tracking -0.01em.
- Section heads: opsz 72, wght 500, upright, in one weight and one ink.
- Placard dates and title pages: opsz 48.
- Plate lettering: Bodoni Moda capitals, baked to MSDF offline and cut as hatched grooves, mirrored on the copper. Capitals appear only cut into metal, the way plate lettering was done.

NEWSREADER (variable, opsz 6 to 72, roman and italic, about 90KB).
- Body: 18/29px at a 62ch measure, with text-wrap: pretty and old-style figures in prose.
- Data (dates, counts, SHAs): opsz 6 to 12 with tnum and lnum, so even a hex SHA is set in a serif.
- Captions, placards and pencil notes: italic at opsz 6 to 8, 14px, in sentence case. Pencil is set in graphite with feTurbulence grain.
- Microtext atlas: a static Newsreader instance, because canvas 2D can't select variable axes.

SCALE. A perfect fifth: 14, 21, 32, 48, 72, 108, 162.

INK MECHANICS
(a) Wet ink is ink gain.
- On body and caption text, a registered @property --wet (0 to 1) drives -webkit-text-stroke (0 to 0.5px) and a same-ink text-shadow (0 to 0.6px blur).
- Display type uses an SVG filter: feMorphology dilate from 0.6px to 0, into a 0.4px blur and an alpha threshold. That covers the section heads, the product names and 'Write to me.'. JS drives the filter on the one element printing at a time.
(b) The drying curve is linear(0, .39 10%, .63 20%, .78 30%, .86 40%, .95 60%, .99 80%, 1), which approximates 1 - e^-5t. It runs over 1400ms when timed, or is scrubbed where it's tied to scroll.
(c) Wetness carries data only on the Code sheet, and there it's always printed beside its source number.
(d) Letterpress. Debossed display type reads the light angle through --lx and --ly and recomputes its highlight and shadow pair.

All @property motion sits behind @supports, with a GSAP fallback. Hierarchy comes from optical size and position on the sheet. Emphasis comes only from ink state, wet against dry or blind against inked. Fallback faces are size-adjusted, so CLS stays at 0.

## Palette

One ink on one paper in one room. Copper and steel appear only as lit materials, and graphite is kept for the printer's hand.
- Press-room #0A0B0D is the ground of every page. The site never swaps to a paper background.
- Rag #ECEAE4 is used for sheets only, cool and deliberately away from cream. Sheets sit in the lamp's pool, which is brightest at 40% of viewport height and falls to 0.82 at sheet edges and near the nip. Fibres modulate it by ±2.5%.
- Intaglio black is a warm carbon black, like etching ink in the tin, rendered by absorption. A thin film reads about #5A4E44 and pooled ink about #15110E. Body text is #1A1612, about 14.7:1 on rag at full light and 9.7:1 at the 0.82 falloff. There's no accent colour; density comes only from line width.
- Blind emboss is made of light: highlight rgba(255,255,255,.55), shadow rgba(21,17,14,.12).
- Graphite #4F4E4B is used for pencil notes, leaders, the engraver's rule and focus rings. It holds at least 4.5:1 anywhere on a lit sheet.
- Copper is never a CSS colour. It exists only as a WebGL material on the plate (albedo #B4704A, highlight #F3C9A6, oxide #5A3B2A). It's the only hue on the site, and it always appears with light on it.
- Steel (bed, roller, star wheel) and charcoal felt (#2B302C, pull only) are also materials only.
- Rag type on press-room black is about 16:1.
- Every shadow is tinted with the ink's warm hue, never grey. There are no glows, no bloom and no decorative gradients.

DARK MODE. The room is already dark, so a dark preference only lowers the lamp. Sheets peak at #D6D3CC and the pencil grain drops, which keeps the page from glowing at night. There's no second material theme.

## Textures and layers

From back to front, all lit by one lamp.

0. Press-room #0A0B0D, the CSS ground everywhere.

1. CSS rag sheets with a baked fibre AVIF tile, for browsers without WebGL.

2. The persistent WebGL2 canvas, which carries every material:
- copper, with anisotropic polish that flashes on burin V-grooves, dull flat-bottomed ruled grooves, a fresh burr that cools over 400ms, and oxide at the bevel
- the intaglio-black ink film, with roller-stipple normals and a wet specular of 0.6 that dries to 0.08
- cotton rag, with a fibre normal tile, a torn deckle, damp cockle that flattens as it dries, plate-mark bevels and a 1.5px edge thickness on the curl
- fulled charcoal felt for the blankets
- brushed steel for the bed, the rails and the roller, with a long horizontal highlight
- the brass linen tester, with a flat lens and a millimetre reticle on its base

3. The lamp's pool: a screen-space multiply on the sheets, peaking at 40% of viewport height and falling to 0.82 at sheet edges and near the nip.

4. DOM text, the source of truth, set on the Van de Graaf canon. Letterpress text reads the light angle through --lx and --ly.

5. Contact shadows, ink-tinted and cast away from the lamp, 6px at most.

6. SVG graphite: pencil notes, leaders, the engraver's rule and focus rings, with grain and a faint sheen at grazing angles.

7. The running head on top, and the nip's roller drawn in the canvas's bottom band, with a CSS gradient fallback.

There's no global grain overlay. Every texture is a normal map or a density that the light or the press acts on.

## Transitions

IN PAGE. Every change of state is a press event, scrubbed and reversible.
- Plate to print: the pull.
- Press to page: the camera flattens and dollies until the roller rests at the bottom edge, and the pin releases. From then on, scrolling moves the bed.
- Sheet to sheet: each section is a deckled sheet lying on the black bed, with about 72px of steel between sheets. Sheets come up out of the nip at plain scroll speed. Each leading edge judders the frame 1px, and text prints wet and dries.
- Proof to record: falling through the linen tester, then pulling back out at the end.
- Blind to inked: 'Write to me.'.

BETWEEN PAGES. Cross-document View Transitions (@view-transition { navigation: auto }) work on GitHub Pages with no router.
- The roller is a shared element (view-transition-name: nip), so it stays put. The old sheet is carried up and out (translateY -100vh, 560ms, cubic-bezier(.7,0,.2,1)) while the new sheet rises from under the roller.
- A pagereveal script compares navigation.activation.from with entry and adds the 'backwards' type, so history navigation runs the sheet back down into the nip.
- Firefox and older Safari navigate normally, and reduced motion gets a 150ms crossfade.
- Return visits in the same session skip the intro.

## Sound design

Off by default. 'Sound off' sits in the running head, and the choice persists in localStorage wrapped in try/catch. A single AudioContext is created on that click and routed through a master gain of 0.15 into a DynamicsCompressor (threshold -18dB, ratio 4). Everything is synthesised: four voices, no files, about 2KB of code.

VOICES
- Press rumble: a 48Hz sine plus brown noise through a 180Hz lowpass. Gain follows bed speed, with a ceiling of -30dBFS. It plays during the drive, and as a single 120ms tick when a sheet's leading edge enters the nip. It goes silent the moment scrolling stops. It's the site's only scroll-linked sound, because the scroll is the crank.
- Cut: 12ms bandpassed noise grains at 4.2kHz along a burin cut, or a steady 6kHz hiss for the ruling machine. It plays only on return visits with sound already on, because the cut happens before anyone can opt in.
- Peel: a granular crackle of 3 to 6ms grains through a 2kHz highpass, with grain rate following curl speed. It ends in a 60ms lowpassed 300Hz thup when the sheet lands.
- Chop: a 110Hz sine plus 80ms of 900Hz lowpassed noise, for the chop and for pressing 'Write to me.'.

RULES
- Exponential ramps end at 0.001, never 0.
- At most one cue of a type plays per 60ms.
- playbackRate is jittered 0.9 to 1.1.
- Nothing plays on hover or passive reading.
- The context suspends when the tab is hidden.

## Mobile

Below 760px each sheet becomes a single column with 16px side gutters and no horizontal scroll.
- Hero: the h1 and bio sit above the bed. The roller crosses the bed above the plate, which fills the width (343x429 on a 375px screen). The autopilot wipe plays, and a finger drag wipes.
- Light: there's no permission prompt on load. The light drifts on a 40s Lissajous, and a two-finger drag moves it. Tilt is offered only in the Write sheet ('On a phone, you can tilt to move the lamp.'). Once allowed, tilt is clamped to ±15 degrees and eased at 0.05.
- Pull: runs over 140vh, with a camera tilt of 18 degrees, a 1.35x pull-back and a 32x40 curl mesh. The sheet peels from its top edge and turns up over the plate like a calendar leaf. Plate and print share the frame for about 20vh before the plate slides away. Nothing snaps.
- Nip: a 36px roller with an 18px band showing, above env(safe-area-inset-bottom). The star wheel stays in the running head.
- Record: runs over 120vh. A vertical swipe drives the flight, the placard docks as a bottom sheet above the nip, and nothing snaps. The tester opens on a 350ms long-press and sits 90px above the finger.
- Work: one product per screen.
- Code: names drop to clamp(30px, 9vw, 40px), with the sidenotes under each name. Smearing a wet name needs a 250ms long-press first, so it never fights scrolling.
- Research: one column of proofs.

Low tier (mobile, 4 or fewer cores, or 4GB or less of memory):
- canvas DPR 1.25, with plate regions at 1.75
- a 96x120 wipe mask
- 12px microtext rows
- the governor starting at .8
It's still the whole experience, with no stripped-down fallback page.

## Reduced motion

prefers-reduced-motion renders the finished, well-lit press room from the first frame.
- Hero: opens on poster-print.avif, the dry print lying on the bed with the pencil notes and chop in place. The copper plate appears as a small static figure in the margin, mirror-reversed and captioned 'The plate this was pulled from', so the reversal still lands. There's no cut, inking, wipe, pull or camera move.
- Nip: a still steel band that doesn't turn, and text arrives already dry.
- Light: rests at azimuth 135 degrees and elevation 24 degrees, low enough to show every deboss. Clicking moves it, so the light stays a toy the visitor chooses to start.
- Record: no pins. The proof shows at 1x beside the DOM list. Tapping a line reads it in the placard, 'Look closer' opens a static snapshot of the tester, and 'Read the record as text' swaps instantly.
- Code: names sit at their data wetness. Smearing still works, because it's user-driven.
- View transitions become a 150ms crossfade.
- Sound is unaffected, because it's opt-in.
- Browsers without WebGL get the same layout over the posters, so every path lands on a composed page.

## Tech stack

A static site on GitHub Pages, built as a Vite multi-page app in vanilla TypeScript to replace the current React single-page app. The rewrite:
- keeps /pages/*.html, /pages/tracker and /pages/untweeted working
- drops vite-plugin-manus-runtime, which injects about 367KB of inline runtime
- stops copying index.html to 404.html

RUNTIME JS on the home page: about 140KB gz, deferred until after LCP
- ogl, tree-shaken to Renderer, Program, Mesh, Geometry, Plane, RenderTarget, Texture, Camera and Transform: about 15KB.
- GSAP 3.13 core with ScrollTrigger and CustomEase: about 45KB.
- Lenis: 4KB, on gsap.ticker with lagSmoothing(0).
- App modules: about 45KB. They cover the press scene and camera, the wipe mask, the curl sheet, the nip and sheet regions, the linen tester, the record flight with its textPath handoff, unweave, and Web Audio.
- About 16KB of hand-written GLSL, highp throughout.
- One WebGL2 canvas, fixed and sized to 100lvh. During the pull it renders the press as one perspective scene. Everywhere else an orthographic camera draws sheets and plates as scissored regions bound to DOM rects.
Paper pages ship no WebGL, only about 3KB of JS for the light angle and the View Transition.

FONTS. Bodoni Moda subset (about 80KB, preloaded) and Newsreader roman and italic (about 90KB).

DATA AND IMAGES. A first visit comes to about 700KB.
- data-a.webp and data-b.webp: two RGB lossless textures, about 150KB together. They load with createImageBitmap(blob, {premultiplyAlpha: 'none', colorSpaceConversion: 'none'}), with UNPACK_COLORSPACE_CONVERSION_WEBGL set to NONE.
- poster-press.avif (about 60KB, fetchpriority=high) and poster-print.avif (about 45KB).
- ledger.json, repos.json and papers.json: about 14KB gz.
- Product plate data: about 50KB each, lazy-loaded.
- Fibre and felt normal tiles 60KB, deckle masks 8KB, MSDF lettering 6KB.

PIPELINE: one workflow
- deploy.yml runs on a schedule ('17 7 * * *'), on push and on workflow_dispatch. It fetches everything at build time into dist and never commits generated data, so it can't race the tracker cron. The cron's daily push just triggers another fresh deploy.
- GitHub API: all 79 public repos with their commits and releases, plus public_repos from the users endpoint. automations.json classifies the commits.
- launches.json is link-checked, and any 404 fails the build.
- The Living Edge RSS supplies the latest title and issue number.
- The daily phi bake runs in node with sharp, including the slope clamp.
- Posters and the og-image render in Playwright Chromium with --use-angle=swiftshader --enable-unsafe-swiftshader.
- Product captures run only on workflow_dispatch with a recapture input. Each must pass health checks: HTTP 200, no consent-banner selector, and a pixel difference against the last approved capture under a threshold. Otherwise the last approved capture is restored from actions/cache.
- Every external step is non-fatal and falls back to the last good copy in actions/cache.
- Offline, once: rembg, Depth Anything V2 Small and msdfgen.

three.js isn't needed, because nothing here needs a scene graph.

ESTIMATE: 26 days.
- Plate spike on real data: 1.5
- Pipeline: 2.5
- Multi-page rewrite: 2
- Plate shader, wipe, newest-line intro and posters: 4
- Press (bed, roller, felts, drive, relief, peel, camera, dry): 4.5
- Nip, sheets, lamp pool and wet printing: 1.5
- Work plates: 1.5
- Record: 3
- Code: 0.5
- Research, paper pages and transitions: 1.5
- Write, 404 and edges: 0.5
- Mobile, reduced motion and no-WebGL: 1.5
- Sound: 0.5
- Performance and cross-browser QA: 1

## Performance plan

- One WebGL2 canvas sits fixed behind the DOM, sized to 100lvh, and ignores height changes under 120px. Sheet and plate regions are scissored and bound to DOM rects, cached through ResizeObserver plus scroll offset, so there are no layout reads per frame. IntersectionObserver skips offscreen regions.
- Rendering is on demand. Frames are drawn only while something is moving (the light, a scrub, the wipe, the curl, the nip or a timed tween), plus 300ms. At rest the GPU cost is zero.
- DPR is capped at 1.5 on desktop and 1.25 on mobile. The exception is the plate and print regions, which render at 2 on phones, because one quad is cheap and the line pitch needs it.
- A frame-time governor steps the backing-store scale from 1.0 to .8 to .65 when the moving average passes 18ms. It caps the full-viewport phases of the pull at 3.7MP.
- Full GGX with anisotropy runs on the copper only. Sheets use Blinn-Phong plus the wet specular, with fibre and cockle baked into the normal tile.
- The wipe mask is a 192x240 R8 ping-pong target that exists only before the pull. A 96x120 CPU copy covers context-loss recovery.
- The curl mesh is 64x80 (32x40 on mobile). The felts are baked curls with no simulation.
- The microtext atlas builds in requestIdleCallback after first paint (setTimeout on Safari) and is mipmapped. Only one line at a time becomes an SVG textPath.
- Programs compile small-first: copper, then ink, then print. Safari lacks KHR_parallel_shader_compile, so there LINK_STATUS is read only after a dummy draw, and the newest-line cut waits rather than hitching.
- There are exactly two pins: the pull at 160vh and the record at 140vh. Snapping uses Lenis idle detection, never ScrollTrigger snap, and never runs on touch. ScrollTrigger.config({ignoreMobileResize: true}) is set.
- Lenis and ScrollTrigger share gsap.ticker with lagSmoothing(0).
- Wet printing at the nip is a class toggled by an IntersectionObserver whose root margin sits on the nip line. Drying runs on @property transitions with no per-frame JS.
- On webglcontextlost, the AVIF posters underneath show through, and everything restores on webglcontextrestored.
- Targets: LCP under 1.8s on 4G (the h1 and the 60KB poster), CLS 0, INP under 150ms, and 60fps on an M1 laptop and an iPhone 12.

## Prototype first

Build the plate itself first: from the real record, at the real line count, on a phone, a laptop and a 4K screen. It takes one and a half days, before any press or UI work.
1. Build ledger.json from the GitHub API, with automations.json classifying the commits. It has to catch github-actions[bot], and also the tracker cron, which commits to philipbankier.github.io under Philip's own name.
2. Run the offline matte, depth and contour prep, then the daily phi bake with the slope clamp.
3. Render the copper and printed readings at 222 lines on three screens:
   - a 640px plate on a 1440x900 laptop (about 2.9px pitch)
   - a 375px phone at DPR 2 (about 3.9 device px)
   - a 4K screen
4. Compare them at arm's length against a banknote portrait and a WSJ hedcut.

It passes only if all four hold:
- The likeness holds.
- Hand-cut and ruled days read apart at 1x, as glint on the copper and as density on paper.
- The gaps left by quiet days look deliberate.
- No line folds at the hair or the crossed arms.

Why this goes first: the intro, the pull, the record and every honest sentence in the copy depend on this one image. If it doesn't hold, stop here and build nothing else.

## Copy samples

- Co-founder of Kairox AI. I build the machinery that runs the work, in the open.
- Building ActRun now. It's AI that runs your work.
- One line for each day since 28 February 2026. Cut lines are days I pushed public work myself, and ruled lines are days only my scheduled automations committed.
- 7 October 2026, ruled at 07:17 UTC. Only my automations committed that day.
- {date}, cut at 07:17 UTC. {repo}: {commit subject}.
- {date} was a quiet day, so its line stays in pencil.
- Press and drag to wipe the plate. Scroll to pull a print.
- Impression of 8 October 2026, wiped by you.
- Cut by hand on {cuts} of {days} days.
- Remarque, cut in the margin. My other title: AI Agent Plumber.
- Hold to look closer.
- ActRun. AI that runs your work.
- PromptCache. A free library to save and share prompts.
- Engraved from a capture of actrun.ai taken on {date}.
- Both are Kairox AI products.
- Proof, wiped clean for reading.
- Look closer.
- 22 August 2026. PromptCache launched.
- 10 May 2026. tastekit 1.0.0 released.
- Ruled by my automation, which synced the skills index.
- {start} to {end}. Ruled by my automation, which synced the skills index.
- Faint pencil lines are quiet days.
- Launch dates are entered by hand, with sources.
- Show only hand-cut lines
- Read the record as text
- Skip the record
- The press didn't run this morning. The newest line is {date}.
- Second state, from 26 October 2026. New days are cut as cross-hatching in the shadows.
- Eight of my 79 public repositories. Names print wet for about a week after I push to them myself.
- awesome-agent-skills. 20 stars. My automation pushes here daily, and my last push by hand was {d} days ago.
- Most recent push by hand: {repo}, {d} days ago.
- The Living Edge, my newsletter. Issue {n}: {title}.
- Write to me.
- Reprinted every morning by a scheduled workflow. Build {sha}, {time} UTC.
- On a phone, you can tilt to move the lamp.
- This plate was cancelled. Nothing was printed at this address.
- Back to the press room
- The plate this was pulled from
- Sound off
- Copied.

## Why this escapes generic design

- Warm cream editorial (the old Plates used bone #F4EFE3 with #2240C8 as an accent): the site never leaves a black press room. Paper exists only as sheets lying in one lamp's pool on a steel bed. The ink is a warm intaglio black rendered by absorption, and copper, a lit WebGL material, is the only hue on the site.
- The AI-default type pairing (Fraunces with SOFT and WONK play over Newsreader): the display face is now Bodoni Moda, a Didone from the copperplate tradition, with no axis play. Wetness is physical ink gain that works on any face.
- A CSS-filter portrait captioned 'Gravure': replaced by an analytic line engraving with one line per day, inked, wiped, pressed and peeled by one shader. The raw 449x561 photo never appears, even under the tester.
- A streak counter dressed up as art (GitHub Skyline lineage): the plate separates his hand from his machinery. Burin cuts mark days he pushed public work himself. Shallow ruled lines mark days only scheduled automations committed, including the tracker cron that commits under his own name. Pencil marks quiet days, and the print states the ratio.
- A 100-line draw-on intro: frame 0 is yesterday's finished plate, served as the LCP poster. The intro cuts exactly one line, the newest day, with the tool that day earned.
- Wrong-way skeuomorphism: it's a real etching press. The bed goes through a fixed roller under felt blankets, the plate mark comes from pressure the visitor just watched, and the scroll is the crank at 1:1.
- The back half turning into a Stripe Press book: every section is another sheet coming up through the same roller at the bottom of the screen, so one mechanic runs from the first scroll to the last.
- A collage of toys (tissue cloth, marbling, riffle, keepsake download, console egg, favicon swap): all cut. Every interaction is something done at a press: wiping, cranking, peeling, looking closer, smearing wet ink or pressing a deboss.
- Fade, slide and blur reveals, including the word-by-word blur on the bio: the bio is fully inked at 0ms. Text arrives by coming out of the nip wet and drying.
- Hover-dim-siblings lists: removed everywhere. Hovering a line draws a pencil leader, and hovering a plate sharpens its bevel by narrowing the light.
- The cursor spotlight: the cursor changes the angle of one fixed lamp, so the emboss and copper respond while the pool of light stays put.
- The Codrops magnifier with rim warp and chromatic offset: replaced by a real linen tester, with a brass folding frame, a flat field and a millimetre reticle on the base.
- Scroll-jacking with many snap labels: there are two pins totalling 300vh, one snap label in the pull and five milestone holds in the record. None of them snap on touch, and during the drive the bed moves at exactly scroll speed.
- Mono uppercase labels, numbered eyebrows and middle dots: none. Capitals exist only cut in copper, and navigation is five plain words.
- Unverifiable numbers: every number is computed at build and printed beside its source. public_repos comes from the users API, the issue number from the latest title, and launch dates from a reviewed file whose links fail the build if they 404.
- Page-curl view transitions: between pages the roller stays put as a shared element and the next sheet comes up out of it.

## Borrowed from (verified references)

- <https://www.stripe.press/poor-charlies-almanack>: The portrait as the event of the page, with the cursor revealing a second reading of the figure. Here the second reading is the copper behind the print and the record in its lines.
- <https://en.wikipedia.org/wiki/Intaglio_(printmaking)>: Real press mechanics: the plate is inked and wiped, then damp paper under felt blankets is driven through a fixed roller, and the blanket pressure makes the plate mark.
- <https://en.wikipedia.org/wiki/Claude_Mellan>: A portrait built from swelling engraved lines whose width carries the tone. It's the model for the burin mark that distinguishes hand days.
- <https://oryzo.ai>: The 3D to 2D to 3D flip: a flat plate tilts back into a press, a sheet peels and bends, and the camera flattens onto the page again. Also deadpan rigour applied only to real data.
- <https://www.framer.com/community/marketplace/components/press-foil/>: A light with weight and settle, plus deboss and gloss that only show in grazing light. Recast as a fixed lamp whose angle the cursor moves, with no spotlight circle.
- <https://arxiv.org/abs/2008.05336>: The cylinder-proxy warp asin(2x-1)/pi that bends day-lines around the skull and forearms. Clamped and smoothed here so lines never fold.
- <https://tympanus.net/codrops/2026/08/19/relighting-images-with-depth-maps-and-three-js>: Blurring depth to remove 8-bit banding and deriving normals from it, used for the contour field, the relief beat and the raised ink.
- <https://tympanus.net/codrops/2026/03/23/building-a-dual-scene-fluid-x-ray-reveal-effect-in-three-js/>: A ping-pong mask between two treatments, recast as a persistent tarlatan wipe that becomes this visitor's plate tone.
- <https://benfry.com/traces/>: A whole record visible at once, where any mark reads as its real sentence.
- <https://design.google/library/climate-crisis>: Data-bound form, with the source number printed beside the object that embodies it.
- <https://visualrambling.space/dithering-part-1/>: A camera dive into an image until single marks fill the view, used for falling through the linen tester into the day-lines.
- <https://exat.hottype.co>: Position equals state: every scroll-linked change is scrubbed and reversible.
- <https://tympanus.net/codrops/2024/08/22/scroll-based-svg-filter-animations-on-text/>: SVG filters on live DOM text, recast as feMorphology ink gain for wet display type.
- <https://tympanus.net/codrops/2026/06/11/sketching-the-impossible-a-3d-portfolio-built-without-a-single-3d-model/>: A noise-front reveal with a pooled edge, used for the brayer's inking front.
- <https://tympanus.net/codrops/?p=63293>: The loader as the hero's first frame. Here poster-press.avif is yesterday's finished plate and the LCP image.
- <https://awwwards.com/igloo-inc-case-study.html>: A real-time intro that flows into the site without a cut, compiling shaders while it plays.
- <https://lusion.co/>: One persistent canvas behind the DOM, bound to placeholder elements.
- <https://tympanus.net/codrops/2025/06/05/how-to-create-responsive-and-seo-friendly-webgl-text/>: HTML stays the layout and the source of truth, and WebGL mirrors DOM boxes.
- <https://developer.chrome.com/docs/web-platform/view-transitions/cross-document>: Navigation between static documents, with the roller as a shared element and a 'backwards' type for history.
- <https://developer.nvidia.com/gpugems/gpugems2/part-iii-high-quality-rendering/chapter-20-fast-third-order-texture-filtering>: Fast 4-tap bicubic B-spline sampling, so the 449x561 source never shows its grid under magnification.
- <https://github.com/Chlumsky/msdfgen>: Multi-channel SDF lettering baked offline for the engraved name, the remarque and the product headlines.
- <https://fonts.google.com/specimen/Bodoni+Moda>: A free variable Didone with optical sizes up to 96, from the copperplate tradition.

## Critiques rejected, with reasons

- Fixed line count per display tier (engineer): rejected. One line per day is the idea, so density is handled instead by 240-line states, DPR 2 on the plate regions and a 4.5x to 8x tester, which keep phone pitch at or above 3.6 device px.
- Collapsing runs of automation days into one hairline (engineer): rejected on the plate, where every day keeps its own ruled line so the count stays true. Adopted in the text view, which groups each run into one entry.
- Dead-straight ruled lines (juror): modified. The real record interleaves hand and automation days in every month, so straight lines between contoured ones would cross. Ruled days keep the contour and differ in the mark: shallow, stepped, square-ended and dull under the light.
- A separate 60vh pinned pass for each later sheet (juror): rejected, because five more pins would blow the scroll budget. The roller sits fixed at the bottom edge instead, and every sheet passes through it at plain scroll speed.
- Set-off ghosts on the next sheet's underside (juror): rejected, because sheets never stack on this bed. Wetness shows as light-keyed gloss and as a smear under a drag, with the source date printed beside each name.
- A record with no default pin (engineer): rejected. The descent is the proof, so it stays as a 140vh flight with five holds, no snap on touch and a visible skip. Free day-by-day reading is the opt-in part.
- CSS hinged tissue on one damped spring (engineer): moot. The tissue is cut, and each product's line prints in ink beside its plate.
- Dropping the second state and keeping cross-hatching for 4K only (engineer): rejected. States are how a plate keeps growing, and State II starts on 26 October 2026 on every screen.
- Two stacked copies of the h1 clipped to the sheet (engineer): moot. The ground never swaps, so the h1 stays rag on press-room black.
- Tiled rendering for 'Keep this impression' and forward-polygon marbling (engineer): moot, since the keepsake download and the marbled covers are both cut.
- Thumb index with plain labels (brand): replaced. A press room has no fore-edge, so five plain words in the running head do the wayfinding.
- A timed 600ms pull-back to 28 degrees (juror): the commitment is kept at 26 degrees but scrubbed, so it reverses with the rest of the pull.
- Licensing Klim Signifier or Ogg (juror): deferred. Bodoni Moda is free, reaches opsz 96 and comes from the copperplate tradition, and a licence can follow later if he wants one.

## How the panel scored the three pitches

- **spectacle**: breathtaking 9, coherence 8, buildability 5. Has the best single beats of the three: the burin cut as an honest loader gated on real data, the plate's line count as the shipped-day count, the white-on-white relief beat under the press, the engraver's rule with a reading line, the unweave from face to list, and the press-room to paper ground swap. The trade is wrong for founders, though. A 420vh pinned pull with a camera dolly, a sheet standing vertical and an FBO scene chain on every section change puts six shots between the visitor and any information. The job case, the solander box and the serial block also bring three more objects with three more motion systems. It's coherent in theme and heavy in execution.
- **craft**: breathtaking 7, coherence 9, buildability 7. This is the most disciplined system. It uses one ink and one lamp, and blind versus inked carries meaning: a blind impression is a commit and ink marks a launch. Repo-name wetness bound to days since push is the best data binding in any pitch. Sticky deckled sheets, the thumb index, tissue guards and real product aquatints are all cheap and all belong. It's weaker on wonder. The pull auto-plays, so the visitor only watches. The impressions calendar competes with the face as a second ledger and almost disappears without a cursor. The 450vh volume pin is long, and WONK on hover spends the font's one wild axis on a toy.
- **world**: breathtaking 9, coherence 7, buildability 5. This one involves the visitor most. They wipe the plate themselves, their plate tone goes into their own print, and the mirror-pair frame of print and plate is the shot people will screenshot. Falling through the loupe into a face made of commit sentences is a strong idea. The AI Agent Plumber remarque, the cancelled-plate 404 and a daily og-image all make it feel like a real place. It sprawls, though. The 3D NPR governor and commonplace book need a second renderer, and the governor misdescribes ActRun. The plate chest, insert card, archive wall and contents leaf push toward collage. 16x MSDF microtext at 25k quads costs a lot for one reading moment, and one copy line ('tastekit joins the Kairox scope') can't be verified.

## What was grafted from the other pitches

SPINE: Open Edition from the world pitch. It's the only one where the visitor works the press, keeps their own impression, and finds the record inside the lines of his face. The craft pitch sets the rules: one ink, one lamp, blind against inked, wetness as recency, sticky deckled sheets, the thumb index, tissue guards, aquatint product plates and the drying curve. The spectacle pitch supplies its strongest beats: the burin cut as an honest loader, the relief beat under the roller, the press-room to paper ground swap, the engraver's rule and reading line, the unweave to text, suminagashi covers with one ring per section, the 69-sheet serial, and dark mode as the plate side.

CONFLICTS RESOLVED:
(1) The cursor is the lamp on hover everywhere, and it's the wiping cloth only when pressed and dragged on the plate. Wiping on hover would be accidental and noisy.
(2) The pull is scrubbed over 220vh. That's shorter than 420vh and still not auto-played, so the visitor's scroll turns the crank. The home page has exactly two pinned scenes, the pull and the daybook.
(3) Today's line sits at the crown and the oldest at the forearms. Scrolling down then moves down the face, the record leads with the newest fact, and the intro burin finishes on the head, so the face completes last.
(4) The daybook magnifies to 3.2x, and the reading line hands off to a real SVG textPath. That's crisp, selectable and accessible, where 16x MSDF would need 25k quads.
(5) Quiet days stay as uncut graphite guide lines, so the face shows gaps honestly. Launch days are cut wider with a burnished halo.
(6) The works are real product aquatints under tissue guards. The governor emblem is cut because it needs a second renderer and its metaphor doesn't describe ActRun.
(7) The repos are a specimen page whose wetness is data. It replaces the job case and the plate chest.
(8) The papers are unpinned fanned chapbooks, which replaces the 450vh volume. The serial is a block with one sheet per issue, which replaces the ribbon rope.
(9) WONK is reserved for the AI Agent Plumber remarque.
(10) There's one ledger, and it's the face. The impressions calendar is cut.

CUT: the camera dolly and vertical sheet, the FBO scene chain, the job case, the plate chest, the governor and commonplace book, the ribbon, the insert card, the Alt copper lens, the contents leaf, the lamp colour-temperature drift, the impressions archive (deferred to phase 2), and every hand-typed date.

GROUND TRUTH TO RESPECT:
- ledger.json comes from a NEW scheduled workflow in philipbankier.github.io that reads a whitelist of public repos. Don't extend the external tracker cron. It commits a third-party dossier to main from an unknown machine and must never feed this record.
- Launch dates print from ledger.json. PromptCache 2026-08-22 is confirmed. The slop-engine and awesome-image-prompts dates must come from their repos' public events.
- The rebuild drops vite-plugin-manus-runtime, which injects about 367KB of inline runtime.
- The Kairox AI imprint links to kairoxai.live, the brand kit's canonical domain.

## Critic verdicts (before refinement)

- **juror (6.5/10):** Best of the four by a distance, and the first concept this round that a juror would still remember. The copper plate, the pull and the white-on-white relief beat are a signature I haven't seen in the portfolio category, and the record as the line structure of the face is a real idea. As written it would not take Site of the Day. The first 520vh plays like a film. After the ground swap it turns into a well-set Fraunces book with six CodePen toys attached: tissue cloth, marbling comb, serial riffle, dithered screenshots, a hover-dim list and a blur-in bio. That back half is the 'standard Claude output' the client already rejected. Three problems sit under the hero too. The press is mechanically wrong for intaglio. At the real line count the portrait risks being a 100-line 'linify' sketch. And most of the 'days something shipped' are bot commits. Fix those four things in this order: (1) make scroll drive the press bed, (2) prove the plate at the real line count on day one, (3) split machine-ruled lines from hand-cut ones, (4) cut the toys and reuse the one press mechanic instead. Then it's an 8.5 and a likely SOTD, and the site people describe a month later is 'the guy whose face gains a line every day he ships'.
- **engineer (5/10):** Every technique here can be built on GitHub Pages, and the hero (copper plate, ink, wipe, pull) can be the breathtaking piece the client asked for. But the core idea, one engraved line per day with the record written inside the face, breaks on the real data. I checked it against the GitHub API.

**Line count.** The earliest whitelisted repo (awesome-agent-skills) was created 2026-02-28, so N is about 221 today, not the "about 100" the concept assumes.
- That's a 3.1 CSS px line pitch on a 1080p desktop plate and 1.9 CSS px (2.4 device px) on a 375px phone. On the phone the engraving turns into grey moire.
- The plate passes the concept's 160-line "second state" before it even launches, and reaches 365 lines by Feb 2027.
- Under the daybook's 3.2x magnifier the lines sit about 10px apart, not 20px, so the microtext can't be read.

**The daily commits are a bot.** The "daily" ships are github-actions[bot] commits titled "sync: update data YYYY-MM-DD", with gaps of up to four days. Most featured repos haven't been pushed since May or June, and tastekit has only two releases. The daybook's main content would be months of bot sync messages, and the copy "Each one is a day something shipped" would mislead the founder audience it's meant to impress.

**Wrong or hand-wavy recipes:**
- The data texture keeps edge strength in the alpha channel, and browsers premultiply alpha on decode, which corrupts the other channels.
- The depth warp is feathered over only 3px, so engraved lines fold back on themselves at the silhouette (warp slope about 5.6; it needs to stay below 1).
- Copper normals come from dFdx of the cut-line profile, which gives blocky, aliased highlights.
- The data texture is sampled bilinearly, so the source's pixel grid shows as facets once the magnifier zooms in.
- The intro is timed from navigation start, but the JS doesn't load until after LCP.
- The plan has a data workflow commit and then trigger deploy.yml. GitHub doesn't run a second workflow off a push made with the default Actions token, and those commits would also collide with the tracker cron that pushes to main daily.
- The page also contradicts itself in places. Paper pages are meant to ship no WebGL but have aquatint shader figures. The plate is drawn in a scissored box tied to its DOM rect, but the pull fills the whole viewport in perspective.

**Effort.** The 11 to 13 day estimate is about 2.5x low, because the spec bundles roughly 15 separate bespoke systems and a full rewrite from the current React single-page app to a multi-page site.

Fix the data binding, run a 1-day spike on how the engraving reads on a phone and a 4K screen, and cut scope. Then the press and the pull alone are worth building.
- **brand (6/10):** Serious craft with an honest core, but as specced it reads about 60% printmaker costume and 40% builder. The builder signal only arrives once a visitor works out that the lines are commits, and two of the claims that carry it are false as written. Every line is called "a day something shipped", yet the spec makes N calendar days with quiet days included, and most cut lines will be the daily awesome-agent-skills automation commit. A founder who clicks a SHA and lands on a bot commit stops trusting the whole face. Voice mechanics are clean: no em dashes, emoji, exclamation marks, triplets or "not X, it is Y" in any copy sample. The failures are about accuracy and burial. Products don't appear until after 520vh of pinned scroll and then sit under tissue. The contact line is a blind deboss you can only read under the lamp. Navigation is print jargon. The concept also breaks its own "no metaphor relabelling" rule with "Published by Kairox AI". Fix the line semantics so human cuts are told apart from automation ruling, which turns the brand's "machinery that runs the work" into a visible fact. Then move products ahead of the daybook and ink the contact. Done, this is an 8.
