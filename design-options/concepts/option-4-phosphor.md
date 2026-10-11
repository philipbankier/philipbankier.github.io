# Option 4 · Long Persistence

> philipbankier.com is a putty-grey lab instrument with one long-persistence P7 tube in it. A single beam signs his name, pays the signature out into a 96-line portrait, stands the face up as a ridge relief, crushes it into one white-hot line and swings that line into the radar arm whose first turn lights everything he has shipped. Every mark is written blue-white and cools to yellow-green, so colour on the page always means age, and every blip links to its source.

**Build estimate:** 34 days · **Critique scores before refinement** (out of 10): juror 6.5, engineer 5, brand 6

## What you see in the first 10 seconds

0.0s:
- A putty-grey instrument fills the window: lab-enamel housing, a blue-grey control panel, and a narrow rail with four lowercase keys (shipped, products, papers, contact).
- In the middle is one large window of dark green-black glass, recessed behind a rubber gasket.
- Under the glass the bio is already sharp: 'Co-founder of Kairox AI. I build the machinery that runs the work, in the open.'
- Beside it, 'ActRun is AI that runs your work.' and one push-button, 'open actrun.ai'. Nothing is moving yet.

0.25s: a hard blue-white point lands near the bottom of the glass and signs 'Philip Bankier' in one continuous stroke, in about a second. Corners flare brighter, quick diagonals run hairline-thin, and the trail behind the point visibly cools from icy blue-white to yellow-green.

1.4s: the signature's first stroke pays out upward into 95 horizontal lines, smeared like a long exposure of thread coming off a spool.

1.8 to 2.8s:
- The lines swell from the bottom up: crossed forearms, then collar, then jaw, nose, brows and hair.
- His face stands just right of centre on a field of calm flat lines, with the signature as the last line under his arms.
- An amber LED in the rail ignites with the age of the last thing he actually shipped.

3 to 6s:
- A faint blue-white band rolls down his face every 1.6 seconds, re-lighting it as the rest slowly dims.
- Moving the cursor over the glass bends the scan lines away from it like iron filings near a magnet. The bend heals over about 20 seconds.

6 to 10s, on the first scroll:
- The face tips back into a ridge terrain, the ridges slide together, and about a screen later the whole glass holds one white-hot line, the brightest thing on the page.
- The line folds in half into a single radius, the window rounds into a circle, and the radius starts turning.
- Blips flare blue-white as it passes and cool to yellow-green: his launches, writing, papers and code, each one a link.

It's silent unless the visitor flips 'hear the drawing'.

## Signature moment

THE ARM: his face becomes the radar arm that reveals his shipping record. One beam draws all of it.

Setup:
- The receiver tube pins for 260vh on desktop and 200vh on touch, with scrub 0.8. Directional snap to four labels (face, relief, line, sweep) fires only on scroll end, after a 150ms delay. On touch, snap is off and the ruler ticks give exact stages.
- One beam path of 24,576 points (96 lines x 256 samples). Every state is a keyframe texture built on the CPU at load (RGBA32F: xy, intensity and a blank flag): signature, face, relief, line, radius and arm. The vertex shader fetches states A and B by gl_InstanceID and mixes them with a per-point delay, all in one draw call.
- Inside the pin, phosphor ages by progress as well as by time: decay = exp(-(dt/tau + |dp|/0.04)). A given scroll position looks the same at any scroll speed and in reverse. The beats that matter are authored layers keyed to p and never left to accumulation.

BEAT 1, FACE (p 0 to 0.04): the idle hero. At p 0.02 the refresh band stops and the face holds on the slow component.

BEAT 2, RELIEF (0.04 to 0.30):
- Pitch goes 0 to 58deg and yaw 0 to -14deg (the pointer adds plus or minus 5deg). Displacement moves from screen-y into z, and the 96 lines stand up as ridge profiles.
- Hidden lines come from a depth-only fill pass from each ridge down to its baseline, followed by woscope segments drawn with LEQUAL depth and a polygon offset.
- Brow, nose, collar and the crossed forearms become ridges, with the signature line as the front ridge. The magnet still bends them.

BEAT 3, LINE (0.30 to 0.52):
- The fill fades and the depth test switches off by 0.36, so the stack turns additive.
- Line spacing goes to 0 (expo.in) while the projection blends from perspective to orthographic with dolly compensation, so the framing holds and depth precision never degrades. The signature line lands last, on top.
- An intensity uniform peaks at p 0.48 and holds to 0.52. Luminance tone mapping (Khronos PBR Neutral) turns the clamp white with a yellow-green fringe, bloom rises from 1.0 to 2.2, and the glass smudges show for the only time on the site.
- This is the brightest frame on the site. It's also the og-image, the Awwwards thumbnail and the print cover.

BEAT 4, SWEEP (0.52 to 1.0):
- 0.52 to 0.60: the line's left half folds over onto its right half (power3.inOut), which leaves one radius from the centre to the rim. That radius swings to the bearing of the newest authored blip. Meanwhile the bezel SDF morphs rect to circle, with a matching clip-path on the tube's box.
- 0.60 to 0.95: the radius is now the arm, and it makes its first revolution clockwise, scrubbed by scroll. It's deposited as a filled sector every frame, so it never strobes. Each blip flashes blue-white in the frame where the arm's swept interval crosses its bearing, then cools to yellow-green. Sector labels are written at the rim as the arm reaches them. The yellow-green ghost of the face is still fading under the first quarter-turn. The newest blip is the first and last thing to flare, because the turn starts and ends on it.
- 0.95 to 1.0: the arm hands off from scroll to the clock at 4s a turn, the pin releases, and the same tube scrolls on into Shipped.

Payoff: the line that was his face is the arm that lights his work, and scrolling back folds it into his face again.

WITH SOUND ON (the 'hear the drawing' lever): the speakers play the same Float32 path buffer that drives the beam, with L = x and R = y.
- The face is a low growl at about 8 loops a second, and the relief shifts the chord as depth enters.
- At the line beat the sound collapses to a pure 220 Hz sine in the left channel, with a faint 60 Hz mains ripple on the right. The brightest frame is also the purest tone.
- As the arm turns, its tone pans around the listener, because x and y are the channels.
- Pointer x detunes by up to 2 semitones through playbackRate. Pointer y rotates the picture and the sound together, using a 2x2 gain matrix in the audio graph and the same matrix in the shader.

## Intro sequence

The loader is the hero's first frame, and it never hands off. There's no spot-line-raster boot.

0ms:
- Inline critical CSS paints the putty housing, the rail and the bio at their final positions. The bio text is the LCP element, and the glass shows unlit P7 coating #0E120F.
- In parallel: KHR_parallel_shader_compile runs on every program, the 30KB portrait PNG is decoded with createImageBitmap(premultiplyAlpha 'none', colorSpaceConversion 'none'), and document.fonts.ready resolves. Ledger and path data are already inlined.
- If WebGL2 isn't ready by 1.5s, the long-exposure AVIF poster fades into the glass and the page is complete as it is.

250ms, signature: a blue-white point lands near the bottom of the glass and writes 'Philip Bankier' as ONE continuous path at a constant 2,400px/s, in about 1.1s.
- There are no pen-ups, so the write-on reads as beam physics.
- Corners pool bright and fast diagonals run thin, and the trail cools from blue-white to yellow-green behind the point.

1,350ms, pay-out: the signature's first stroke pays out upward into 95 horizontal lines in path order, with a per-line delay (450ms, power3.inOut). Persistence records the travel as a long-exposure smear, like thread coming off a spool. The signature stays put as line 96.

1,800 to 2,600ms, rise: the lines lift by depth and luma into his face on a spring (k170/c18, 8% overshoot), from the bottom up: forearms, then collar, then jaw, nose, brows and hair. Flat calm lines run either side.

2,300ms: the rail LED ignites 'last ship {age} ago' through Bitcount ELXP 60 to 0 over 320ms (back.out(1.7)). The value is computed from authored events only.

2,800ms: idle. The refresh band starts rolling.

Interruptible: any scroll, key or click tweens the master timeline's timeScale to 4 over 200ms. It never jumps, and the page is usable from the first frame.

Return in the same session (sessionStorage, in try/catch): a 400ms warm start, with the face rising straight out of persistence.

Reduced motion: no intro. The long exposure is there at first paint.

All timings and spring constants are starting values. The prototype tunes them on real screens.

## Portrait treatment

A 96-LINE VARIABLE-PITCH SLOW-SCAN PORTRAIT, signed by its own last line, laid as one continuous beam path. The 449x561 photo is never displayed.

Offline prep, done once:
- Crop the source to rows 48 to 520 (hair top to just below the forearms).
- rembg mattes out the park.
- Depth Anything V2 small produces depth, blurred 3px to kill 8-bit stepping.
- MediaPipe Face Landmarker builds an importance map from his eyes, brows, nose and lip line.
- Linear-light luma gets a pow 1.4 contrast curve.
- Sobel on luma gives the edges.
- Everything packs as RGB only into a two-tile 448x280 PNG of about 30KB. Tile 1 holds luma, depth and matte, and tile 2 holds edge and importance. The ICC profile is stripped, and the PNG decodes with premultiplyAlpha 'none' and UNPACK_PREMULTIPLY_ALPHA_WEBGL false, so no channel is corrupted.

Line allocation (variable pitch):
- 58 lines from crown to collar (source rows 62 to 280), so his eyes-to-mouth span gets about 14 lines where uniform spacing gave about 5.
- 37 lines from collar to the lower edge of the forearms.
- Line 96 is the signature.
- Samples are 256 per line, with x spacing warped by importance so the face columns get 1.5x the density.
- Mobile uses 44 + 27 + 1 lines at 192 samples.

Render:
- Face region: y offset = (0.25 depth + 0.2 luma) x 1.0 pitch, so depth goes mostly into intensity and the eyes and mouth survive. Intensity = 0.15 + 0.85 luma^1.2.
- Body region: y offset = (0.55 depth + 0.45 luma) x 1.6 pitch, which gives the forearms their strong ridge.
- Beam dwell = 1 + 2 edge + 1.5 importance. The beam slows at the jaw, brows, eyelids and lip line, so they burn brighter, while steep relief runs thin. The engraved look comes from beam physics alone.
- Where the matte is 0, lines run flat at 12% across the full glass, so he rises out of a calm field.
- Retraces are blanked to 3%.

THE SIGNATURE: Philip's real handwritten signature, digitised as one continuous path with no pen-ups, is resampled onto line 96 beneath his arms. In the intro, the other 95 lines pay out of its first stroke. Through the chain it stays the front ridge and lands last on the white-hot line. A name across the chest would read as a booking placard. Under the arms it reads as a signed plate. Until he supplies a signature, a custom monoline built on Relief SingleLine skeletons and joined by blanked connectors stands in.

RECOGNITION GATE: the portrait ships only if 4 of 5 people who know him name him from a 375px-wide screenshot at the calibrated focus stop. If it fails, the face gets 64 lines and the body 31, and the test runs again.

Why it reads as deliberate: 96 lines is a chosen resolution with a lineage in slow-scan TV and Rutt-Etra video synthesis. The density is spent where recognition lives, and the plate is signed. The source's low resolution never shows.

Fallback: a long-exposure AVIF of the full raster at steady intensity, baked locally once and committed. It's used for no WebGL2, Save-Data and reduced motion, and it doubles as the recognisable print portrait.

## The ledger moment

SHIPPED: the record as a P7 radar PPI, the display P7 was made for, reached when his face becomes its arm.

DATA (honest by construction):
- A ledger step runs inside the existing deploy.yml, which already fires on every push, with a weekly scheduled fallback. It queries GitHub for public, non-fork repos and The Living Edge's feed, then writes data/ledger.json.
- Each entry is {date, kind, source, title, url, sha?, authored}.
- Kinds: launch, release, repo-public, commit, paper, issue and sync.
- authored = false when the author is github-actions[bot] or the message matches ^sync:.
- This site repo's tracker commits are excluded by path and message, and forks are excluded entirely. slop-engine is fork:true today, so it doesn't appear.
- Private repos never appear by name. If Philip turns on private contributions on his GitHub profile (his call), a dim, count-only 'private work' sector shows daily counts with no messages, linked to his public contribution graph, where the counts can be checked.
- Every number in copy reads from data/*.json. A build check fails if any copy string contains a literal count that isn't present in the data. The '15 stars' that is already stale at 20 can't happen again.
- The ledger is inlined in the HTML and published at /data/ledger.json as open data.
- GitHub stats calls retry on 202 with backoff and fall back to the last good JSON.

RECENCY BINDINGS: 'last ship', the hero persistence floor, the rail lamp and the favicon all read authored entries only. The scheduled sync never feeds them.

MAPPING:
- Centre is today, with radius = log(1 + days)/log(1 + range). Rings sit at 7, 30, 90 and 365 days, and the default RANGE is 365.
- Bearing is kind: four 90deg sectors run clockwise from north (launches and releases, The Living Edge, research and code), and inside a sector the true UTC hour spreads the entries.
- The scheduled sync is a dim dotted ember track along the code sector's edge, captioned 'The dim dotted track is a scheduled job that syncs awesome-agent-skills. It ran on {n} of the last 90 days and isn't counted as shipping.'

WHAT IT SHOWS (as checked 2026-10-07):
- The August cluster sits in the 30-to-90 band: site relaunch 19 Aug, PromptCache 22 Aug, and awesome-image-prompts built 25 to 31 Aug.
- tastekit's releases (v0.1.1 in April, v1.0.0 in May) and the spring wave of public repos sit in the outer band.
- The four papers sit in research, and the newsletter is a regular ring of marks once the feed confirms its dates.
- Quiet stretches show as gaps, and that's left as it is.

ARRIVAL: the face's line folds into a radius pointed at the newest authored blip, so its first scroll-driven turn starts and ends on the newest thing he shipped.

SWEEP: 4s a turn, deposited as a swept sector. Blips flash blue-white and cool to yellow-green over a 0.12 floor, older blips peak lower, and launches pulse a ring.

CONTROL:
- RANGE knob with detents at 30, 90, 365 days and all.
- Hovering or tapping a blip brings up an amber bracket, a leader and a beam-written entry, while the plot strip prints the date, source, title and short SHA. A click opens it.
- Arrow keys step from newest to oldest. The repo rows below isolate their blips, and mobile adds prev and next steppers.

SOUND (v2, opt-in): authored blips under 30 days ping as the arm crosses them (1.15 kHz, 45ms, a pentatonic pitch per sector, -34dB). The sync track is silent.

ACCESS: 'list' opens the full ledger as plain text. The same list is the screen-reader path and appears in print.

## Section by section

### Rail (sticky header)

- **Visual:** A 48px strip of putty housing pinned to the top.
- Left: 'philip bankier' in lowercase silkscreen, which links home. Beside it is one recessed amber LED window, 'last ship {age} ago', computed from authored events only and linked to that event. Its lamp brightness is e^(-days/14).
- Centre: a bank of four latching push-buttons on a blue-grey panel, labelled shipped, products, papers and contact.
- Right: a latched 'sound' key appears only while sound is on, and pressing it turns sound off.
- There's no status line, no degauss, no UNCAL and no speaker grille.
- **Motion:** Position equals state: ScrollTrigger latches the key for the section in view.
- The pressed key travels 2px down in 60ms (power4.in), and its label's wdth compresses from 100 to 88 over 90ms.
- The previously latched key pops up on a spring (k400/c22).
- The LED pulses (ELXP 0 to 40 to 0, 500ms) only when the age value changes.
- **Interaction:** The keys are real <button aria-pressed> elements. A click scrolls to that section's label (ScrollToPlugin, 0.6s plus distance/4000px, expo.inOut). Tubes passed on the way are written and decay as they would.

Number keys 1 to 4 select a section only while focus is inside the rail, which meets WCAG 2.1.4. Shortcuts are listed in the rail's accessible description.

### Receiver (hero)

- **Visual:** One 16:10 tube, max 1200px wide, recessed into putty enamel behind a 6px rubber gasket, with inset occlusion and a 16px glass radius.

The glass holds one picture with no split. A 96-line slow-scan portrait of Philip stands just right of centre on a field of flat lines that run edge to edge. Line 96, under his crossed forearms, is his signature, so the plate is signed by its own last line. The park is gone.

On the housing below the tube:
- left: the bio line in Archivo 24/32, with the now line under it at 16.5px ('Right now I'm working on {now_focus}. Updated {now_date}.')
- then 'ActRun is AI that runs your work.' beside the primary push-button 'open actrun.ai'
- right, on a blue-grey panel: the knobs focus and persist, and a chrome bat-handle lever with a full-brightness legend, 'hear the drawing'
- an engraved 'Kairox AI' plate with a small 'co-founder' legend, which links to kairoxai.live
- a dim line, 'Glow tracks the last thing I shipped, {age} ago.'
- **Motion:** Idle never stops, and it never performs.
- A blue-white refresh band rolls down the face every 1.6s while the slow component (tau 2.4s) holds the image.
- The persistence floor is bound to authored recency: 0.14 when the newest authored event is under 7 days old, falling to 0.06 past 30 days. The number is printed in the dim line.
- The glass sheen slides plus or minus 2% with the pointer.
- After 30s with no input, rendering drops to slow-scan only at 30fps. Time-based decay makes the two look the same.
- **Interaction:** The cursor is a magnet.
- Scan lines bow away from it with a dipole falloff (R 90px), and press-and-hold attracts them.
- Dwelling writes residual magnetization into a 32x40 texture, which bends the raster for about 20s and then heals by itself.

Knobs (role=slider, 160px of drag covers the range, 11 detents, arrow keys):
- focus scrubs beam sigma from 0.7 to 4px. Its calibrated stop is the sharpest, most recognisable face.
- persist scrubs afterglow tau from 0.2 to 4s. At max, dragging the magnet through the face paints long smears.

The lever creates the AudioContext and starts the x-y voice.

Touch: drag is the magnet (touch-action: pan-y). After 4s idle, an autopilot magnet traces a slow 3:2 path.

### Signal (signature chain)

- **Visual:** The receiver tube on a 260vh pin, in four beats: face, relief, one white-hot line, sweep.

Beside the tube is a vertical housing ruler with four engraved ticks. Each beat has one Archivo caption line on the housing, never on the glass:
- 'One beam draws this face in 96 lines.'
- 'The same lines, stood up by depth.'
- 'All 96 lines, stacked into one.'
- 'That line is the sweep arm now. Each blip it lights is something I shipped.'
- **Motion:** Fully scrubbed (scrub 0.8), and the same position looks the same in either direction. Progress-plus-time decay keeps the persistence deterministic.

These are all uniforms on one GSAP timeline:
- camera pitch and yaw, and the perspective-to-orthographic blend
- line spacing, the fill fade and the line-beat intensity
- the fold, the bezel SDF and the arm angle

The bezel's rect-to-circle morph runs in sync with a clip-path on the tube's box.
- **Interaction:** Scroll is the main control. Dragging or clicking the ruler's ticks scrubs the same timeline (role=slider, with aria-valuetext naming the beat). On touch, the ruler and 44px prev and next steppers replace snap.

The magnet stays live in every beat, so visitors can bend the ridge terrain or the line by hand. With sound on, the chain is audible as described in the signature moment.

### Shipped (the ledger)

- **Visual:** The same tube, now a round plan-position indicator (640px desktop, full width on mobile).
- Centre is today, with rings at 7, 30, 90 and 365 days on a log radius.
- Four 90deg sectors run clockwise from north: launches and releases, The Living Edge, research and code. Each is lettered at the rim in single-line beam text.
- Inside a sector, each entry's angle is its true UTC hour spread across the sector, so entries from the same week separate without invented jitter.
- The scheduled sync of awesome-agent-skills is a dim dotted ember track along the code sector's edge, labelled 'scheduled sync'.
- Blip shapes: commits are 3deg arcs, releases and launches are double returns, and newsletter issues and papers are small filled marks.

On the blue-grey panel below:
- a RANGE knob (30, 90, 365 days, all)
- an amber LED for the selected entry's date
- a one-line plot strip and a 'list' push-button
- the caption 'The middle is today. The rings are 7, 30, 90 and 365 days back.'

Below that, eight repo rows in plain DOM: name, one-line description, last push age, and a stars LED shown only at 5 or more.
- **Motion:** The arm turns once every 4s and is deposited as a swept sector, so the 40deg wedge comes from the slow component for free.
- A blip flashes blue-white (tau 60ms) in the frame the arm's swept interval crosses it, then cools to yellow-green (tau 1.6s) over a 0.12 floor.
- Blips older than 90 days peak at 0.6, so brightness reads as recency.
- Launches emit a 24px ring pulse over 600ms.
- The sync track never flashes write-colour.
- RANGE changes glide the blips along the log radius on springs (k180/c26) while the beam re-letters the ring labels.
- **Interaction:** Hovering or tapping a blip (14px hit radius, 22px on touch, from a 16x16 spatial hash):
- an amber four-stroke bracket draws in 160ms
- a leader runs to the rim
- the beam writes the entry, for example 'PromptCache launched on 22 Aug 2026'
- the plot strip prints the date, source, title and short SHA where one exists

A click opens the source. Arrow keys step through entries from newest to oldest, and Enter opens one.

Hovering or focusing a repo row isolates that repo's blips, with the others dropping to 25% over 140ms.

'list' expands the whole ledger as plain DOM text. That list is also the screen-reader path and appears in print. Mobile adds 44px prev and next steppers.

### Products (ActRun and PromptCache)

- **Visual:** A 4:3 tube with a silkscreened external graticule (10x8, with minor ticks), beside a knurled rotary with two detents labelled 'actrun' and 'promptcache'.

ACTRUN: a real ActRun run, sanitized and approved by Philip, is exported as an event log at build. Each step is a stroke along a time axis whose length is its log duration, labelled with its generic step name in single-line beam text, with the run duration in an amber LED. The run contains no customer names, prompts, model names or tool names.

PROMPTCACHE: the beam writes one real public prompt from the library, chosen at build and rotated weekly. Its save count goes in the LED only if a public source exposes it.

The housing carries two plain sentences per product and one push-button that relabels itself 'open actrun.ai' or 'open promptcache.live'.
- **Motion:** On arrival, the beam replays the ActRun run compressed to 6s. Steps are written left to right at constant velocity, and a step stays bright while it's running, so you watch a run happen.

A channel change is a 700ms morph on a critically damped spring, with per-point delay keyed to x, so it sweeps left to right and smears through persistence. An interrupted switch reverses from the current shape.

The graticule shifts up to 2px against the trace with the pointer, matching the parallax of a real external graticule on thick glass.
- **Interaction:** Drag the rotary, use the arrow keys, or click a detent legend (role=radiogroup).

Hovering a step in the ActRun trace highlights it, and the plot strip prints its step name and duration.

The push-button is a plain link. There's no leave-site animation, and Cmd, Ctrl and middle-click behave normally. On mobile, the rotary becomes a two-position slide switch.

If no approved run log exists at launch, the channel raster-scans a sanitized screenshot at 240 lines through the portrait pipeline, dated 'traced from the {month} interface'.

### Papers (4 research artifacts)

- **Visual:** A 4:3 bistable storage tube after the Tektronix 4010 family. Strokes hold at constant brightness, with no decay, over a mottled flood-gun haze at 6% in the afterglow colour.

Four latching page keys sit below, each with its month: agent playbook, april roundup, taste transfer and mobile agent nodes.

The tube holds one paper's key figure as vector line art traced at build from the paper itself, with the title written beneath:
- the Playbook's scoring matrix
- the Roundup's month strip
- the Taste Transfer map
- the phone-node network

There's also a 'read' push-button. The caption reads 'Four long reads. Picking one wipes the tube and draws its key figure.'
- **Motion:** Selecting a paper fires ERASE: the whole tube floods to 0.9 in 40ms, holds for 60ms, then falls to haze over 380ms (expo.out). The beam then writes the figure at 1,200px/s in nearest-neighbour order, like a plotter.

While the tube is idle, the haze brightens by 0.2% a second, the way real storage tubes fogged.
- **Interaction:** Hovering a key previews its figure at 30% in non-storing write-through mode, so browsing commits to nothing.

Pressing a key latches it and stores the figure. The left and right arrows select, and so does a swipe on the tube on mobile.

'read' opens the paper page. In v2, that's a cross-document View Transition where this tube's in-flow canvas is the shared element and becomes the article's header tube. In v1 it's plain navigation.

### Contact (footer)

- **Visual:** The bottom of the putty housing.
- philip@kairoxai.live in Archivo at 32px (wght 560) beside a copy key. There's no giant footer type.
- A small round tube draws 'AI Agent Plumber' as a continuous X-Y figure, with its own small lever.
- An amber LED reads 'The Living Edge, issue {issue}'.
- Push-buttons for X, GitHub, LinkedIn and The Living Edge.
- A plain-text stamp reads 'Rebuilt {build_date}.', and the Relief SingleLine OFL credit sits beneath it.
- **Motion:** The X-Y figure refreshes continuously with P7 tails, and nothing slides in.
- **Interaction:** Clicking the email copies it. The small tube flares to 1.6 for 120ms, and the LED reads 'copied' for 1.4s.

Flipping the small lever plays 'AI Agent Plumber' as stereo x-y audio. It can also be the gesture that first turns sound on.

There's no power switch.

### 404

- **Visual:** One tube on putty housing. The beam writes the requested path in single-line text, and the text then cools to an ember ghost and stays there. Below it, in Archivo: 'Nothing is published at this address.' and a plain link, 'back to philipbankier.com'.
- **Motion:** One write at constant velocity, then a 4s decay to ember. There's no sync loss, no rolling picture and no hum bar.
- **Interaction:** The link takes focus on load. The magnet works on the ghosted path. It's a real 404.html from the Vite multi-page build.

### Edges (favicon, og-image, print, tab)

- **Visual:** Favicon: a 16px PPI, a graphite disc with a sweep line and one blip whose colour shows authored recency. It's blue-white under 7 days, yellow-green under 30 days, and ember after that.

og-image: 1200x630. It shows the line-beat frame, the white-hot line over a ghosted face, inside the putty housing, with 'Philip Bankier' and the bio set in Archivo on the housing. It's baked once and committed, since it has no data.

Print stylesheet: a plain operator's manual with the bio, the now line, the full ledger list, the papers and the recognisable long-exposure portrait.
- **Motion:** The favicon is chosen at load from three prebuilt SVGs by reading the inlined ledger. There's no other runtime motion.
- **Interaction:** When the tab is hidden, the beam blanks. On return, one decay pass for the elapsed time shows a dimmed afterglow, and the beam resumes 120ms later.

## Type system

Three faces, one for each way the station makes a mark.

1) BEAM, which only the tube draws:
- The name is ONE custom continuous path from his real signature (stand-in: a joined monoline). It's written at beam sigma 2.2 to 2.8px, has no pen-ups, and gives clean x-y audio.
- Every other beam string is in Relief SingleLine (OFL, a designed single-stroke face): sector labels, ring labels, callouts, step names, paper titles and the 404 path. Minimum cap height is 11px at sigma 1.0, tested at 1x DPR.
- Strings are written at constant velocity, so the stroke order is the animation. Brightness pools at corners and thins on fast strokes, and stroke width follows the focus knob.
- Every beam string has a visually hidden DOM twin, and the name is the real h1.
- Hershey-Noailles is the fallback if Relief SingleLine's single-line source proves awkward to convert.

2) HOUSING: Archivo variable (wdth 62-125, wght 100-900), Latin subset.
- Silkscreen legends are lowercase, 12.5px, wght 520, tracking 0. Each legend's wdth is solved once at layout so it exactly fits its control.
- On press, wdth drops by 12 over 90ms, so the label compresses with the key.
- Bio is 24/32 at wght 420. Body is 16.5/25 at wght 400, max 60ch. Section heads are 17px at wght 620, because hierarchy comes from the tubes.
- The email is 32px at wght 560. No housing type is oversized.

3) LED: Bitcount Single, amber, tabular, only inside recessed windows.
- ELSH 0 for counts and ELSH 100 for ages and dates.
- ELXP 60 to 0 ignites a value, and a 0 to 40 to 0 pulse marks a change.

RULES: beam faces never appear off the glass, Archivo never appears on it, and Bitcount appears only in LED windows. There's no monospace, no uppercase tracked micro-labels, no numbered eyebrows, no middle-dot metadata and no italic accent words. DOM type never glows.

Copy uses US spelling ('center', 'color') pending a check against his VOICE.md, and the copy avoids the contested words where it can.

## Palette

Every colour has a physical source.

DAYLIGHT (the designed default, and prefers-color-scheme: light). This is the thumbnail nobody else has: a lit lab instrument with one dark glowing window.
- --housing #CFCBBF (putty enamel), --housing-raised #D8D4C9
- --panel #525D64 (blue-grey control panel, as on Tektronix and HP gear)
- --gasket #1E201F
- --silk #24262A (9.3:1 on putty), --silk-dim #54524C (4.8:1)
- --silk-on-panel #ECE7DB (5.5:1 on the panel)
- --focus #9A4F00 (a 2px ring at 3.7:1 against putty)

NIGHT (prefers-color-scheme: dark only):
- --housing #1A1B19 (graphite powder-coat), raised #20211E, panel #2A2E31, gasket #0B0B0A
- --silk #E6E1D5 (13.3:1), --silk-dim #8A877E (4.8:1)
- --focus #FFA62B

GLASS (both themes): #0E120F, unlit P7 coating, never pure black.

P7 LIGHT, emitted by the simulation and never painted as flat CSS:
- --p7-head #DCE8FF: blue-white fluorescence, under 100ms per mark, which means 'now'
- --p7-glow #B9D86A: yellow-green phosphorescence and the signal colour, which means 'recent'
- --p7-ember #4E5C2C: old marks, and the scheduled sync track

The beam deposits into both components, and emission = fast x head + slow x glow, tone mapped on luminance. Low energy stays saturated yellow-green, and energy near the clamp desaturates to white with a green fringe.

--lamp #FFA62B: amber is where your hand is. It's used for LED windows (on recessed #0B0B0A at 10:1), indicator lamps, the selected blip and the bracket, and stays under 3% of pixels.

Both themes are tokens on :root with an explicit body background. Switching crossfades the housing over 300ms and leaves the tubes untouched.

BANNED: CSS text-shadow and box-shadow glows, decorative gradients, acid green #3BFF9E, and any other hue.

## Textures and layers

Back to front:

(1) HOUSING (DOM):
- Putty enamel (or graphite at night), with a baked 64px powder-coat noise tile at 2.5%, a 1px top bevel on raised parts, and blue-grey control panels inset 1px.
- Tube cutouts are recessed: a 6px rubber gasket, an inset 0 0 0 1px #000 shadow plus 24px of ambient occlusion, a hairline bezel lip and a 16px glass radius.
- In night mode only, silkscreen near a tube mixes from --silk-dim toward --silk by tube energy (--spill-energy per tube, written each frame), so the room light really comes from the glass. In daylight, a lit room overwhelms spill, so there's none, as with real gear.

(2) GLASS (WebGL, per tube):
- unlit coating #0E120F, barrel 0.035-0.06 and a curvature vignette
- a specular sheen at 3% that slides with the pointer
- a smudge and fingerprint texture multiplied by bloom luminance, visible only at the line beat and on the copy flare
- a 6% halation ring around bright content

(3) FACEPLATE:
- an SVG external graticule on the Products tube only, in silkscreen at 28%, shifting up to 2px with the pointer for parallax
- a mottled flood-gun haze on the Papers storage tube only, which slowly brightens

(4) PHOSPHOR: the two-component P7 buffer per tube, aged by time (and by progress inside the pin).

(5) BEAM: woscope erf segments with additive blending, with energy scaled by each segment's time slice.

(6) BLOOM: half-res separable 13-tap, then one luminance tone map.

(7) DOM OVERLAY: visually hidden twins of beam text (the h1, callouts, the ledger list and the run steps), 44px hit targets and focus rings.

DELIBERATELY ABSENT: scanlines on vector tubes, an RGB mask, grain over text, glassmorphism, decorative gradients and returning-visit burn-in.

The material rule: a layer behaves physically or it isn't there.

## Transitions

Grammar: each effect means exactly one thing.

1. MORPH (the same tube shows new content): the current path resamples to the target keyframe and mixes on a critically damped spring, with a per-point delay along the sweep axis. P7 persistence turns each morph into a luminous smear, and an interrupted morph reverses from the current shape. Used for the signature pay-out, the signal chain, channel switches, RANGE changes and repo-row isolation.

2. WRITE (a tube arrives): the beam simply starts drawing that tube's content at constant velocity, with no spot, line or raster boot.

3. DECAY (a tube is left): no animation. It stops refreshing and its phosphor decays, then it's stored as a timestamped ghost, so scrolling back shows a dimmer afterimage. Persistence acts as scroll memory.

4. ERASE (a page change on the storage tube): flood 40ms, hold 60ms, decay to haze over 380ms (expo.out), then the beam writes. In v2, going into a paper page uses @view-transition {navigation: auto} and a shared view-transition-name, storage-tube, on the in-flow canvas. The article's header figure writes itself as SVG stroke-dashoffset at constant beam velocity in P7 colours.

5. BACK: pagereveal adds a 'backwards' type when navigation.activation shows a return, and the station warm-starts in 400ms on the papers tube the visitor left. A bfcache return restores through a pageshow warm start.

6. THEME: housing tokens crossfade over 300ms, and the tubes are untouched.

7. RAIL JUMPS: ScrollToPlugin with expo.inOut. Tubes passed on the way are written and decay.

Links that leave the site navigate plainly, with no collapse animation. Power-off, degauss and sync loss don't exist.

Under reduced motion, 1 to 5 become instant swaps, or 150ms crossfades for View Transitions.

## Sound design

Off by default. Sound turns on with the 'hear the drawing' lever in the hero or the small footer lever, and the AudioContext is created inside that gesture. While sound is on, a latched 'sound' key sits in the rail, and pressing it turns sound off. The preference is kept in localStorage (try/catch), but a new visit still waits for a gesture. On iOS, navigator.audioSession.type is set to 'playback' so the silent switch doesn't mute the page.

CHAIN: a master GainNode at 0.15 feeds a DynamicsCompressor. There are zero sample files.

X-Y VOICE (v1), the heart of it:
- The beam's current path lives in one Float32 L/R buffer at 48 kHz (L = x, R = y) and plays through an AudioBufferSourceNode at about -24dB, through a 9 kHz lowpass. The renderer reads the same buffer at (currentTime - t0 - outputLatency) x sampleRate x playbackRate, so the glass shows exactly what the speakers play. There's no AnalyserNode round trip.
- Pen-ups are single-sample jumps, and the beam's velocity dimming hides them, so no Z channel is needed.
- The face, decimated to 6,144 points, loops about 8 times a second as a low growl. The relief shifts the chord as depth enters.
- The line beat is a pure 220 Hz sine on the left, with a faint 60 Hz mains ripple on the right.
- The turning arm's tone pans around the listener. The signature alone is a thin buzzing figure.
- Pointer x detunes by up to 2 semitones through playbackRate. Pointer y rotates both picture and sound through a 2x2 gain matrix, with the same matrix in the shader.
- Scrolling out of the receiver and chain sweeps the lowpass from 9 kHz down to 600 Hz and stops at 30% visibility.
- The footer lever plays 'AI Agent Plumber' the same way.

SYNTH CUES (v2):
- Latching keys: an 8ms noise burst bandpassed at 3 kHz plus a 30ms 120 Hz knock, with pitch varied plus or minus 8%.
- Knob detents: 4ms ticks whose pitch rises with the value.
- Rotary: a relay double-click, 18ms apart.
- Storage erase: 220ms of pink-noise fizz through a bandpass sweeping 6 kHz down to 2 kHz.
- Radar pings for authored blips under 30 days: 1.15 kHz, 45ms, a pentatonic pitch per sector, -34dB. The sync track is silent.
- Email copy: one relay click.

CUT: degauss, power-off whine, the hum bed, the Lissajous walk and the .wav export.

RULES: at most one cue per 60ms, exponential ramps to 0.001 and never to 0, no sound on hover or scroll, and nothing ever autoplays.

## Mobile

The station becomes a handheld: one column of putty housing, 16px gutters, tubes full width minus the gutters, and no horizontal scroll.

Rail: 'philip bankier', the LED, and a four-stop slide switch in place of the latch bank. Its thumb travels with scroll, so position equals state. The sound key appears only while sound is on.

Receiver:
- The tube goes 4:5, the photo's own ratio.
- The raster is 72 lines (44 face, 27 body and the signature) at 192 samples. The signature's cap height is 13% of tube width so it reads at 375px.
- Below the tube: the bio, the now line, the ActRun sentence and its button, then focus, persist and 'hear the drawing' in one row of 44px controls.
- Finger drag is the magnet (touch-action: pan-y). After 4s without touch, an autopilot magnet traces a slow 3:2 path so the face keeps moving.

Signal:
- Pinned for 200vh with snap off. The ruler and 44px prev and next steppers give exact beats.
- The hidden-line fill stays (still one draw call), and bloom runs at quarter resolution.
- ScrollTrigger ignores mobile resizes, and the pin is sized in svh, so the URL bar never jolts it.

Shipped:
- The radar fills the width. Four sector labels fit at the rim, with the selected entry also lettered.
- Blips have a 22px hit radius, there are prev and next steppers, and the plot strip sits below.
- The repo rows follow, with the row nearest the viewport centre isolating its blips as you scroll.

Products: the rotary becomes a two-position slide switch.

Papers: swipe on the tube to erase and write the next paper. The first tap on a key writes, and the second opens.

Haptics: navigator.vibrate(8) on detents and levers, on Android only and only while sound is on.

Quality tier:
- DPR 1.25, persistence at 0.75x device resolution, one bloom level, and at most two live tube buffers.
- A 60-frame median with hysteresis drops halation first, then bloom, to hold a 30fps floor on an iPhone SE (2020). The iOS Low Power Mode cap doesn't trigger downgrades.
- Every tube is still beam-drawn and decaying. Mobile just gets fewer lines.

## Reduced motion

Long exposure mode, presented as scope-camera photographs, the way real traces were archived, with a small 'long exposure' legend beside the knobs.

- Every tube shows one accumulated frame: the full path at steady intensity with soft bloom and no decay animation. These AVIF posters double as the no-WebGL2 and Save-Data fallback.
- No intro and no pinning. The chain becomes four stacked stills captioned 'Long exposure, frame 1 of 4: the face', then the relief, the line and the radar.
- The radar paints every blip at a brightness equal to its recency, with the arm parked at north. RANGE, blip selection and repo-row isolation still work, and each change redraws one still.
- Channel and paper changes are instant swaps with no morph and no erase flash. In v2, View Transitions become 150ms crossfades.
- The autopilot magnet and refresh band are off. LED values render final with no ELXP pulse, and lamps are steady.
- Knobs, levers and 'hear the drawing' stay available, because direct manipulation isn't ambient motion. With sound on, the glass shows the static face and the voice still plays.

It still looks like a lit instrument, and it's never a blank or 'lite' page.

## Tech stack

BUILD:
- Vite 7 (already in the repo) as a multi-page build: home, four paper pages and a real 404.html, each a vanilla TypeScript entry with no React. build:gh stops copying index.html to 404.html.
- Output is static files for GitHub Pages.

RENDERER: raw WebGL2, about 18KB gz of our own code including shaders, with no three.js.
- One context renders into an OFF-DOM canvas used as a render atlas. Each tube owns an in-flow <canvas> with a 2D context, and in the same rAF the tube's rect is copied with drawImage, GPU to GPU at about 0.1ms per visible tube. Tubes scroll and pin natively and never drift against their gaskets. The storage tube is a real element that View Transitions can capture. GPU cost scales with tube area.
- Beam: woscope erf-integrated Gaussian on instanced segment quads, ONE/ONE additive into RGBA16F. Energy = beam current x segment time slice x intra-frame decay, so deposits don't depend on frame rate.
- Persistence: a two-component P7 ping-pong per tube. R is fast (tau 45-60ms) and G is slow (tau 1.6-2.4s, scaled by the persist knob), with exp(-dt/tau) and, inside the pin, exp(-|dp|/0.04). Clamp at 2.5.
- Relief: a depth-only fill pass, then segments with LEQUAL depth, with a perspective-to-orthographic blend plus dolly compensation.
- Paths: RGBA32F keyframe textures for every state, mixed per point by gl_InstanceID.
- Radar arm: a swept-sector deposit (an 8-slice fan), with blip flashes on swept-interval crossing.
- Bloom: half-res separable 13-tap, scissored to the visible tubes, plus a 6% halation ring.
- Composite: SDF bezel (rect to circle), barrel 0.035-0.06, curvature vignette, smudges multiplied by bloom luminance, and the Khronos PBR Neutral tone map on luminance, applied once.

MOTION:
- GSAP 3.13 (all free): core, ScrollTrigger and ScrollToPlugin, about 47KB gz.
- Native scroll, no Lenis. ScrollTrigger.config({ignoreMobileResize:true}), with svh sizing.
- Our own 0.6KB critically damped spring, and pointer-driven knob, lever and rotary controls with ARIA roles and arrow keys.

AUDIO: our own Web Audio code with zero samples. The x-y voice plays the renderer's own Float32 L/R path buffer through an AudioBufferSourceNode, and the beam reads the same buffer at (ctx.currentTime - t0 - outputLatency) x sampleRate x playbackRate. Rotation is a 2x2 gain matrix (ChannelSplitter, four GainNodes, ChannelMerger), and on iOS navigator.audioSession.type = 'playback'. The v2 synth adds latches, ticks, relay, erase fizz and pings.

DATA:
- A Node ledger step inside deploy.yml writes data/ledger.json and data/repos.json (with the authored/automated split and forks and tracker commits excluded), plus now.json, which Philip edits by hand.
- The copy-literal check runs in CI.
- Inline data is about 10KB gz. The portrait PNG is 30KB, the signature and Relief SingleLine subset are about 8KB gz, and the ActRun run log and paper figures are lazy-loaded at about 12KB.

FONTS: Archivo variable subset woff2 (about 58KB) and a Bitcount Single subset (about 14KB), preloaded with size-adjusted fallbacks.

OFFLINE:
- Python with rembg, Depth Anything V2 small and the MediaPipe Face Landmarker builds the portrait texture.
- Node scripts handle the signature SVG to a single path, Relief SingleLine to polylines, paper figures from SVG to polylines, and the run-log normaliser.
- Data-independent posters (portrait, chain stills, og-image) are baked locally once with Playwright and committed.
- Data-dependent stills (the radar poster and the three favicons) are generated in CI as SVG and rendered with resvg-js plus sharp, with no headless browser.

PLATFORM: cross-document View Transitions (@view-transition, pageswap and pagereveal) in v2.

TOTALS (realistic): about 100KB gz of JS, about 40KB of inline data, 72KB of fonts and about 230KB of initial transfer.

## Performance plan

TARGETS: LCP under 1.5s on 4G (the bio text is the LCP element), CLS 0, INP under 100ms, 60fps on M1 and Pixel 7, and a 30fps floor on iPhone SE (2020), checked on a real device during the prototype week.

ARCHITECTURE:
- One WebGL2 context on an off-DOM canvas. Each tube is an in-flow 2D canvas, filled by drawImage in the same rAF after rendering.
- There's no full-viewport fixed canvas, so tubes never drift against their gaskets, pinned rects are always right, and a 4K screen doesn't pay a viewport-sized clear.
- Rects come from ResizeObserver and ScrollTrigger callbacks, with no layout reads in rAF.

MEMORY:
- Each tube gets its own RGBA16F FBO pair at 0.75x device resolution, with sigma scaled to match. A pair is allocated only while its tube is within one viewport of the screen, so at most 3 are live (2 on mobile).
- When a tube leaves, it's downsampled to a quarter-res RGBA8 ghost with a timestamp. On return it's upsampled, exp(-elapsed/tau) is applied once, and it resumes.
- That holds memory to about 40MB on desktop and 12MB on mobile. RGBA8 with dithered decay is the fallback when EXT_color_buffer_float is missing, and it's verified against the 16F look so no banding shows.

DRAW COST:
- At idle the hero slow-scans about 1.25 lines per frame.
- Full redraws of 24,576 segments (13,824 on mobile) in one instanced call happen only during the intro and the chain.
- Bloom runs at half resolution, scissored to the visible tubes.

SLEEP:
- Rendering is capped at 60fps even on 120Hz ProMotion, and idle scenes run at 30fps. After 30s with no input, the hero drops to slow-scan only.
- The rAF loop stops when no visible tube has energy above 0.002 and no beam is active, and wakes on input or scroll.
- A hidden tab blanks the beam, and one decay pass for the elapsed time runs on return.

STARTUP:
- KHR_parallel_shader_compile runs during the first 250ms, before the first stroke.
- The portrait PNG loads at fetchpriority high and decodes with createImageBitmap, premultiplyAlpha 'none'.
- Ledger, path and Relief SingleLine data are inlined.
- Fonts are preloaded subsets with size-adjusted fallbacks, and every tube has a fixed aspect box.

CLOCK: the GSAP ticker is the single clock, and scroll writes uniforms only.

QUALITY TIER: a 60-frame median with hysteresis, plus EXT_disjoint_timer_query_webgl2 where available. It drops halation, then bloom, then line count, in that order.

RESILIENCE:
- On context loss, swap to the posters, rebuild, and play a 400ms warm start.
- No WebGL2, Save-Data or deviceMemory under 4 gets the AVIF posters over the full DOM.
- The AudioContext is created only inside a gesture.
- GitHub Pages can't set headers, so nothing depends on SharedArrayBuffer and the audio needs no worklet.

BUDGET (realistic): about 100KB gz of JS (GSAP about 47KB, renderer 18KB, app 28KB, audio 6KB), 40KB of inline data and 72KB of fonts.

## Prototype first

BUILD FIRST: one tube on one page, timeboxed to 5 days.
- The core renderer: woscope erf segments, two-component P7 ping-pong with progress-plus-time decay, the luminance tone map, half-res bloom, and the off-DOM canvas copied into an in-flow tube canvas.
- It drives the variable-pitch 96-line portrait and scrubs chain beats 2 and 3 (relief, then the white-hot line), with focus and persist exposed as sliders.

WHY: this retires the four risks that can kill the direction before anything else gets built.
1. Likeness. Gate: 4 of 5 people who know Philip name him from a 375px screenshot.
2. Does P7 decay read as physics or as a green filter?
3. Does the line beat actually reach white-hot?
4. Does it hold 30fps on a real iPhone SE (2020), with the canvas copy and no jitter during momentum scroll?

Everything else is known technique. If likeness fails at 96 lines, the hero gets reworked before a single radar line is written. Deliverables: a static page on a branch, a 10s screen recording from face to line, the recognition tally and the SE frame-time log. A stand-in monoline signature fills line 96.

PHASES AFTER THE PROTOTYPE:
- v1 launch, about 26 days including the prototype:
  - housing and rail, plus the receiver with its intro and magnet
  - the four-beat chain
  - Shipped with the authored ledger pipeline, list and repo rows
  - Products with the run replay or its raster fallback
  - Papers without View Transitions, and Contact
  - the x-y voice and chain audio
  - reduced-motion posters, og-image, favicon, print and the 404
- v2, about 8 more days:
  - paper-page View Transitions and the UI synth with pings
  - footer x-y audio, the private-work sector if opted in, and tuning

NEEDS FROM PHILIP before v1 locks:
- five photographed signatures, or approval of the monoline
- a sanitized ActRun run he approves for publishing
- The Living Edge feed URL and issue dates
- confirmation of kairoxai.live and philip@kairoxai.live
- a decision on the Yohei tracker commits in the site repo (the ledger and build stamp exclude them either way)
- yes or no on showing private contribution counts
- US or UK spelling per VOICE.md
- five people who know him for the recognition test

## Copy samples

- Co-founder of Kairox AI. I build the machinery that runs the work, in the open.
- AI Agent Plumber
- ActRun is AI that runs your work.
- open actrun.ai
- hear the drawing
- last ship {age} ago
- Glow tracks the last thing I shipped, {age} ago.
- Right now I'm working on {now_focus}. Updated {now_date}.
- One beam draws this face in 96 lines.
- The same lines, stood up by depth.
- All 96 lines, stacked into one.
- That line is the sweep arm now. Each blip it lights is something I shipped.
- The middle is today. The rings are 7, 30, 90 and 365 days back.
- The dim dotted track is a scheduled job that syncs awesome-agent-skills. It ran on {n} of the last 90 days and isn't counted as shipping.
- A brighter blip shipped more recently. Each one links to its source.
- PromptCache launched on 22 Aug 2026.
- Eight of my {public_repos} public repos, newest push first.
- {repo} has {stars} stars. Last push {age} ago.
- A real ActRun run from {run_date}, replayed step by step. It took {run_duration}.
- PromptCache is a free library to save and share prompts.
- Four long reads. Picking one wipes the tube and draws its key figure.
- You're hearing the drawing. The left channel moves the beam across and the right one moves it up and down.
- Write to philip@kairoxai.live. The Living Edge is at issue {issue}.
- copied
- Nothing is published at this address.
- back to philipbankier.com
- Long exposure, frame 1 of 4: the face.
- Rebuilt {build_date}.

## Why this escapes generic design

- A putty-enamel lab instrument in daylight, with one dark glass window, replaces the green-on-black retro-terminal thumbnail. Phosphor exists only on the glass, and only where the beam has passed.
- Colour is measured P7 physics with no CSS glow. Marks are blue-white for under 100ms, then yellow-green, then ember, so colour always means age.
- The photo is never shown. A 96-line raster spends its density on the eyes, brows and mouth, is signed by its own last line and must pass a recognition test before it ships.
- One beam path carries the whole story: signature, face, relief, one white-hot line, then the radar arm. His face becomes the arm whose first turn lights his work, and the brightest frame is also the purest tone.
- The radar plots authored work only. The bot sync is a labelled dim track that feeds no recency signal, forks and the tracker commits are excluded, every blip links to its source, and the build fails on a literal number in copy.
- The control count drops from about 20 to the few that scrub a real parameter: focus is sigma, persist is tau, RANGE is scale and 'hear the drawing' is the path as audio. Degauss, UNCAL, v-hold, the power switch and the speaker grille are gone.
- The CRT cliches are cut: no spot-line-raster boot, no collapse on leaving, no sync-loss 404, no Lissajous walk, no burn-in gimmick and no 'N new since your last visit'.
- There's no name-left, face-right hero split. It's one picture, and the name is part of the raster.
- Navigation uses plain words (shipped, products, papers, contact). Instrument words appear only on controls that do that instrument thing.
- Products are shown by what they do: a real ActRun run replayed step by step and a real PromptCache prompt written out, in place of three cards or a traced screenshot.
- Papers live in a storage tube that holds one figure at a time and erases into the article.
- Scope and its sparkline rows are cut. The eight repos are plain rows that isolate their blips on the radar, with no zero-star LEDs.
- Each transition has one meaning: morph is new content on the same tube, write is arriving, decay is leaving, and erase is a page change.
- The footer email is set at 32px with no giant type, and the build stamp is plain text that never links to a tracker commit.

## Borrowed from (verified references)

- <https://m1el.github.io/woscope-how/>: Erf-integrated Gaussian beam on per-segment quads with additive blending. Slow strokes burn bright and fast ones run thin, which gives the portrait its edge dwell and the signature its pooled corners.
- <https://discourse.threejs.org/t/phosphor-vintage-oscilloscope-simulator-with-multi-pass-phosphor-rendering/91293>: Pass order: HalfFloat beam, then exponential-decay ping-pong clamped at 2.5 in linear HDR, then half-res bloom, then one tone map in the composite. Its sliders became the focus and persist knobs.
- <https://github.com/TheMarco/retrozone>: Per-channel persistence rates, repurposed as P7's fast blue-white and slow yellow-green components in the R and G channels of one buffer, so colour encodes age.
- <https://oscilloscopemusic.com/>: An XY path played as stereo audio (L = x, R = y), the basis of 'hear the drawing'. The face growls, the line becomes a pure tone and the arm pans as it turns.
- <https://github.com/KhronosGroup/ToneMapping>: PBR Neutral tone mapping on luminance with highlight desaturation, so the line beat reaches white with a green fringe and doesn't top out as a dull green bar.
- <https://github.com/isdat-type/Relief-SingleLine>: A designed single-stroke OFL face for every beam string except the name, which replaces the spindly Hershey Simplex.
- <https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker>: Offline landmarks that build the importance map, so scan-line density and beam dwell go to the eyes, brows and lip line where likeness lives.
- <https://oryzo.ai>: The 3D-to-2D flatten. In the chain, the relief's projection blends to orthographic while 96 profiles land on one line.
- <https://www.stripe.press/poor-charlies-almanack>: A portrait driven by a depth map, turned here into a ridge relief that stands up on scroll.
- <https://ciechanow.ski/mechanical-watch/>: Direct manipulation where each control scrubs one real parameter: focus is sigma, persist is tau, RANGE is the radar scale, and the ruler scrubs the chain.
- <https://exat.hottype.co>: Position equals state. Every scroll change is scrubbed and reversible, and the rail latches follow scroll.
- <https://benfry.com/traces/>: Every mark is real, and hovering reads the actual sentence. Each blip prints its real title and links to its source.
- <https://design.google/library/climate-crisis>: Data-bound expression with the number printed beside it. Hero glow, the rail lamp and the favicon follow authored recency, and the value is shown.
- <https://tympanus.net/codrops/?p=63293>: The loader is the hero's first frame. Here that's the signature stroke, written in the final hero position.
- <https://tympanus.net/codrops/?p=83842>: Glass smudges that show only where light passes behind them, used once at the line beat.
- <https://oxide.computer>: Real product paired with the hardware object, and leader lines that point only at something the beam actually drew.
- <https://fontsource.org/fonts/sixtyfour/about>: The Bitcount ELXP and ELSH ignition recipe for LED values, which pulse only when the value changes.
- <https://developer.chrome.com/docs/web-platform/view-transitions/cross-document>: Cross-document transitions on GitHub Pages, with the storage tube's in-flow canvas as the shared element that erases into each paper.
- <https://tympanus.net/codrops/2025/06/05/how-to-create-responsive-and-seo-friendly-webgl-text/>: HTML is the layout source of truth. Tube boxes and hidden DOM twins of beam text drive what WebGL draws.
- <https://github.com/rittikbasu/spanda>: Durations and envelopes for the v2 synthesized cues, so the site ships with no audio files.

## Critiques rejected, with reasons

- Juror, radar bearing as hour of day: rejected. His public authored record is about two dozen commits in 90 days, so the disk would stay mostly empty and would publish his working hours. Bearing is kind, and the true hour only spreads entries inside each sector.
- Juror, name written on the scan line through his folded arms: placement rejected. A name across the chest reads as a booking placard, so the name is the raster's last line under the arms, a signed plate, and the one-picture idea stands.
- Juror, crop rows 40 to 470: adjusted to 48 to 520, because his forearms end near row 510 and the signature line sits under them.
- Juror, the x-y lever as the hero's single primary control: rejected. ActRun has to be stated in the first viewport, so 'open actrun.ai' stays primary and 'hear the drawing' is the second control at full brightness.
- Juror, 'Save as .wav' as a shareable permalink: rejected, and the export is cut. A sound download reads as a hobby toy to founders, and screen recordings already carry the moment.
- Juror, a second LED reading 'automation 14 h': rejected. An LED for the bot still advertises the bot, so the rail shows one authored LED and the sync appears only as a labelled dim track with its count of days.
- Juror, cut Channels outright: rejected. ActRun and PromptCache need a home with real substance, so the section stays as Products with a replayed run and a real prompt in place of traced outlines.
- Juror, keep the power-on for tubes entering the viewport at 180ms: rejected. Any spot-line-raster boot is the trope, so an arriving tube simply starts being written by the beam.
- Juror, a 3% burned-in wordmark ghost at 0ms: rejected. A first-time visitor's tube has no history, and burn-in is on the award-site checklist, so the glass starts unlit and the first stroke lands at 250ms.
- Juror, rail label 'record': replaced by 'shipped', the plainer word for what a founder is looking for, with repos folded into it.
- Engineer, Playwright DOM-extracted product outlines: rejected. A traced interface still reads as boxes, and a replayed run shows what ActRun does.
- Engineer, defer the sound signature to v2: rejected for the x-y voice and chain audio, which read the Float32 path buffer the renderer already builds, about 2.5 days. The UI click synth and pings move to v2.
- Engineer, Relief SingleLine for the hero name: rejected for the name only. A font still has pen-ups and reads as typesetting, so the name is one continuous custom path, and Relief SingleLine sets every other beam string.
- Brand, show slop-engine as a 'fork' kind: took the other option offered and excluded forks from the ledger entirely, which leaves nothing to explain.

## How the panel scored the three pitches

- **spectacle**: breathtaking 9, coherence 7, buildability 6. Has the best single moment of the three: face, then ridge relief, then one white-hot line, then the shipping trace, then the radar. It's scroll-scrubbed and reversible, and every visitor sees it without opting in. It loses coherence through sprawl. There are about 13 tubes, plus Robot36 SSTV. The Lissajous figures are seeded from a hash of the repo name, so they decorate instead of report. Sync-loss and morph both mean 'change'. The radar uses date as bearing, and since most of the record sits in recent months (launches cluster in Aug 2026), most of the one-year circle would be empty. It's buildable but heavy: a six-stage pin, hidden-line relief, a multi-tube atlas, and an SSTV encoder that needs a verification project of its own.
- **craft**: breathtaking 7, coherence 9, buildability 8. The most rigorous system. It has one tube, and a MODE rotary that both follows scroll and drives it. Every knob changes the render. It also has the best ledger mapping: bearing is source and log radius is age, so the daily automation shows up as a solid track due north. The X-Y lever ('hear the drawing') is the most original idea in all three pitches. But it sits behind a sound opt-in, so the default visit is a quieter sticky-tube scrollytelling layout (58/42 split) that reads as a template on desktop and takes 42svh on phones. Cheapest to build: one canvas and about 62KB of JS. The real-UI outlines need hand cleanup or they'll look like noisy wireframes.
- **world**: breathtaking 8, coherence 6, buildability 6. The richest world. The name unravels into the face. The waterfall shows the automation as an unbroken carrier. Staleness is shown honestly, the favicon and og-image carry the data, and the 404 is fixed with v-hold. Then the rack fills with props and starts to read as a collage: verlet patch cables that delay every link, a thermal printer that brings in a fourth raster font, a meter bridge that brings gauges back, a missing-screw egg, and caps silkscreen next to the tracked-caps tell. The waterfall is also a raster display inside a vector-beam thesis. That's too many module types and physics systems for one builder to finish well.

## What was grafted from the other pitches

SPINE: Spectacle. It's the only pitch whose central move turns the most personal asset (the face) into the most credible one (the daily record) with one continuous, reversible object that every visitor sees. I kept its section order (signal path: receive, process, display, store, transmit), its P7 two-component physics, the magnet with residual magnetization and degauss, the focus knob, the storage tube, the spill-lit silkscreen, the power-off, the 'last ship' LED, and the rule that tubes you scroll past keep decaying, so persistence acts as scroll memory.

GRAFTED FROM CRAFT:
(1) The radar mapping: bearing is source, log radius is age, centre is now. Spectacle's date-as-bearing would leave most of a one-year circle empty. Craft's mapping also makes the daily automation a visible solid track due north. The chain's last shots were rebuilt to land on this mapping: the trace pivots on today into one spoke, then fans out to 14 bearings.
(2) The X-Y lever as an opt-in second signature, analyser-driven so the picture and the sound are one signal, with the probe detune, rotation and .wav export.
(3) Position equals state for the nav latch.
(4) Interruptible spring morphs, and the intro timeScale fast-forward.
(5) Persistence floor bound to commit recency, with the number printed.
(6) One 8-channel scope of real 26-week commit data, replacing 8 hash-seeded tubes.
(7) Real product interfaces traced by the beam.
(8) External graticule parallax, and glass smudges visible only under bloom.
(9) Daylight enamel housing with tubes that stay dark.
(10) Native scroll with no Lenis.
(11) Archivo with widths solved per control.
(12) Bio text as LCP.
(13) VFD lamp test.

GRAFTED FROM WORLD:
(1) The name unravels into the face as one path, as the intro payoff. The x-y lever replays it with sound, so the intro and the opt-in moment are the same idea.
(2) The UNCAL lamp, which resets knobs.
(3) 'N new since your last visit' on the radar.
(4) Favicon colour as real recency.
(5) og-image as a daily scope-camera print.
(6) 404 as loss of sync, fixed with v-hold.
(7) Serial plate with the real build SHA.
(8) Print stylesheet as an operator's manual.
(9) PERSIST as a knob.

CUT:
- Robot36 SSTV: 36s of screech and its own verification project.
- Hash-seeded Lissajous ID figures: decoration posing as data.
- The 8-tube scope wall: competes with the hero.
- Sync-loss roll on channel change: sync loss now means one thing, on the 404.
- Footer clock: a portfolio trope.
- deviceorientation tilt.
- ScrambleText decode: generic.
- Lenis.
- The 1U rack grid, meter bridge and patch-bay verlet cables (props).
- Thermal PRINT tape and Workbench: a fourth font, and raster type on a vector thesis.
- Missing-screw egg.
- Caps silkscreen.
- Craft's single sticky 58/42 tube: scrollytelling template, and 42svh on phones.
- Craft's stippled single-line portrait: a second portrait language. The raster has to carry the relief chain.
- Measurement cursors.
- Spectacle's step-response diagram: the real interface is more credible to founders.
- The LINES knob.
- A separate P1 green for the storage tube.

RESOLVED CONFLICTS:
- Portrait: one 96-line raster laid as a single boustrophedon path of 21,120 points. The name is resampled to the same length, so name and face can unravel into each other in the intro, in the chain and in the audio.
- Type: Archivo lowercase silkscreen, Hershey on glass only, Bitcount in LED windows only.
- Amber means only 'where your hand is'.
- One meaning per transition effect: morph means the same tube changes content, power on/off means arriving/leaving, erase means a storage page change, collapse means leaving the site, sync loss means the 404 only.
- Ledger data comes from a new whitelisted build step. It isn't the existing yohei tracker cron, whose commits to this repo must be excluded.
- build:gh must stop copying index.html to 404.html so the real 404 page can ship.

## Critic verdicts (before refinement)

- **juror (6.5/10):** It wouldn't win Site of the Day as specced. It would get an Honourable Mention and maybe a Developer Award nomination if the renderer ships at full fidelity. It's the most rigorous concept of the four by a distance, and the one-beam idea (name becomes face becomes one white-hot line becomes his record) has a real lineage and real meaning. The trouble is that nearly every surface a juror sees in the first 5 seconds is a known CRT trope, executed carefully:
- the spot, line, raster power-on
- the write-on name
- the Unknown Pleasures face
- the radar sweep
- the knobs, degauss and the sync-loss 404

The two-component P7 decay, erf beam and edge dwell are what make it special, and they're invisible in a thumbnail and in a 5-second scroll. At a glance it reads as a green-on-black CRT portfolio.

It's also overbuilt. That's 10 sections and about 20 bespoke controls, and the 6-shot pin has 2 shots (trace, fan) that muddy the one gesture that's actually new.

The version I'd remember a month later:
1. Cut the chain to face, relief, line, and the line itself becoming the sweep arm, which paints his record on its first turn.
2. Make the face recognisable.
3. Put the dark glass in a light putty instrument housing.
4. Make "hear the drawing" the headline control, with the collapse to one line also being the collapse to one pure tone.
5. Cut Channels, Scope and the Fan shot.

With those changes it's a real Site of the Day contender.
- **engineer (5/10):** Buildable at its core, but not as written. The proven pieces are the woscope erf beam, two-component RGBA16F persistence, half-res bloom and a 96-line Rutt-Etra raster. They run comfortably on an M1 and a Pixel 7, and reach a 30fps floor on an iPhone SE at 72 lines. LCP (the bio text), CLS 0 and INP under 100ms are all reachable on GitHub Pages.

The spec has about ten recipes that are wrong or hand-wavy, and the architecture under them has the wrong foundation. One fixed canvas behind the DOM with native scroll will make the WebGL glass slide against the DOM gasket during scroll. It also breaks the pinned-rect caching, and the View Transition shared element would snapshot an empty hole.

Other problems:
- The 2048 squared atlas cannot hold the tubes at DPR 1.5. The receiver alone is 1800x1125.
- The signature chain mixes scroll-scrubbed progress with wall-clock persistence, so 'reverse replays exactly', the 1.5s face ghost and the brightest frame are all scroll-speed dependent.
- Reinhard applied per channel never reaches 'white-hot'.
- The radar arm will strobe.
- The portrait data packed into PNG alpha will be destroyed by premultiplication.

The riskiest piece is the signature chain: eight path states, a 3D relief with hidden lines, a near-orthographic flatten, a fan split and a sweep, all in one pin with snap on iOS. Scope is roughly three times a sane v1, at about 62 engineer-days for everything. A v1 with the receiver, the chain, Sweep and the list fallback is about 24 days, with the sound signature, Scope, Channels outlines, the 404 and the footer X-Y deferred.
- **brand (6/10):** The craft reads as a serious builder, but the data it's built on doesn't hold up yet. Fit is 6/10. Voice: all 22 copy samples pass the mechanical rules, with no em dashes, triplets, "not X, it is Y" constructions, emoji or exclamation marks. The problem is the facts behind the copy. I checked GitHub on 2026-10-07. The headline payoff ("his face becomes his shipping record") ends on a github-actions[bot] "sync: update data" job. It ran on 60 of the last 90 days in awesome-agent-skills, and there were 0 human commits in that window. "last ship", the hero glow, the favicon, the rail lamp and "3 new since your last visit" are all bound to that bot. A founder who clicks the "last ship" LED lands on a cron commit, and that link is where costume starts. Two samples are false today: "commits to it once a day" (it ran 60 of 90 days) and "15 stars" (it has 20). slop-engine is a fork (fork:true) but the concept shows it as a launch, and the brand kit says forks are not presented as original work. Seven of the eight Scope repos were last pushed between March and June, and three of them would show a "0" star LED. The navigation labels (sweep, channels, scope, store, hail) and the controls (UNCAL, degauss, v-hold) push it further toward costume. ActRun is only explained about six viewports down, and "made by Kairox AI" wrongly says the company built the site. The restraint rules are the strongest brand asset: no CSS glow, lowercase silkscreen, plain sentences, every number printed. Fix the data definition and the navigation words, and this becomes a credible 8.
