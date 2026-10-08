# Four directions, one decision

**Verdict:** build **Plates**, and keep **Plumber** as the alternate. Prove Plates in about 8 working days before committing the remaining 20 or so. Swiss goes ahead only if Philip agrees to publish private contribution counts. Phosphor gets prototyped last.

---

## 1. Comparison

| Option | Signature moment | What you see in 10 seconds | Biggest risk | Build days | Best for |
|---|---|---|---|---|---|
| **Plumber** (PB-0001: The Works) | You turn valve V-01 and the camera pulls back from 1x to 0.16x. The hero turns out to be Detail A on an A0 plant drawing, and red ink floods only the lines that are live today. | Cool drafting film. Four pens plot the border and his contoured face, then the name hatches in solid graphite. A red "AI Agent Plumber" stamp soaks into the fibres, and a valve tag reads "Closed." | Scope. A custom WebGL2 line engine and a netlist router both have to exist before the money frame does. The 0.16x frame also has to read as a dense black plant at 300px wide. Today only one of the eight featured repos would run red. | 45 (v1 26, v2 19) | Making "AI Agent Plumber" literal. It's the strongest builder read: partners see his operation as one system, with ActRun as the largest pump. |
| **Swiss** (Set and Filed) | His portrait, printed in exactly 1,470 cells (one per contribution GitHub counted this year), files itself into a line-drawn axonometric year. It then topples into the Index rows of the work it belongs to. | A warm white 12-column grid holds the name in heavy black beside a cell print of his face. Blue outlines of the name close in on the right-hand rule, and a red full stop drops into place. The first scroll tips the page over into a drawn plate. | The face exists only if Philip publishes private counts. 1,203 of the 1,470 cells are private, and the public-only print (267 cells) shows no face. Second risk: keeping DOM text registered to GL through the tilt on iOS Safari. | 30 (Tier 1 is 20) | Checkable proof of output. Every number reconciles with his GitHub graph, and it's the calmest page of the four. |
| **Phosphor** (Long Persistence) | One beam signs his name and draws his face in 96 lines. The face then collapses into one white-hot line, which swings round as the radar arm and lights everything he shipped. | A putty-grey lab instrument with one dark glass window. A blue-white point signs "Philip Bankier" in one stroke, then 95 lines pay out and rise into his face. The cursor bends the scan lines like a magnet. | At thumbnail size it can still read as a CRT portfolio. The physics that set it apart (two-part P7 decay, beam dwell) only show in motion. It also needs a real signature and an approved ActRun run log from Philip. | 34 (v1 26) | The most shareable moment. "Hear the drawing" plays the beam path as stereo audio, and it's the feature people will screen-record. |
| **Plates** (Open Edition) | Scroll turns the crank of a real etching press. The inked copper plate is driven under a fixed roller and you peel your own print. The plate carries one engraved line for every day since 28 Feb 2026. | A black press room, with his name in Bodoni and the bio already readable. A copper plate holds his mirror-image portrait in about 220 lines. Today's line is ruled in, then the plate is inked and wiped until his face shows as bright copper in black ink. | The whole site depends on one image. 222 lines have to hold the likeness on a 375px phone without moiré, and hand-cut lines have to read apart from ruled lines at 1x. Secondary risk: the printmaker setting reads as craft before it reads as builder. | 26 (single phase) | The most beautiful single frame and the easiest story to retell: "his face gains a line every day he ships." It's also the cheapest full build. |

**Critique context.** All scores below are for the versions before refinement. The juror, engineer and brand scores averaged 6.0 for Plumber, 6.2 for Swiss, 5.8 for Phosphor and 5.8 for Plates. Each final concept addresses its top critique. The juror's forecast after fixes was strongest for Plates: "8.5 and a likely SOTD."

**Real data, from a rough GitHub search on 8 Oct 2026** (the pipeline must recompute this at build):
- **Hand-commit days:** about 89 of the 222 days since 28 Feb 2026.
- **Last 30 days:** 8 hand days, all in post-apoc-benchmark, which isn't one of the featured eight.
- **Latest hand commit:** 30 Sep.

What that means for each direction:
- **Plates** prints roughly "Cut by hand on 89 of 222 days." The remaining days are split between ruled automation days and quiet pencil days.
- **Plumber's** flood shows one red repo out of eight.
- **Phosphor's** "last ship" LED reads about 8 days.
- **Swiss** depends entirely on private counts.

The tracker cron commits as philipbankier with inconsistent messages ("Update Yohei tracker artifact", "Intel Tracker: Daily update", "tracker(yohei): ..."). Commits should therefore be classified by path (`client/public/pages/tracker`), because message filters miss some of them.

---

## 2. Shared craft foundation

All four directions sit on the same platform. Build it once.
- **Stack:** Vite multi-page app in vanilla TypeScript.
- **Remove:** the 367 KB Manus runtime and the index-to-404 copy step. Replace them with a real 404 page.
- **Rendering:** one WebGL2 context site-wide, with GSAP 3.13 and ScrollTrigger.
- **Data:** a scheduled data step in `deploy.yml` that writes to `dist`. It never commits, so it can't race the tracker cron.
- **Posters:** baked from the real renderer.

### 2.1 Motion tokens

**Durations.** These use a 3:2 scale, which fits nearly every timing in the four specs to within 10%.

| Token | ms | Use |
|---|---|---|
| `tick` | 60 | Key travel, flickers, detents |
| `snap` | 120 | Hover feedback. Every keyboard action finishes by here |
| `quick` | 180 | Eraser pass, interrupt fast-forward, canvas-over-poster crossfade |
| `base` | 270 | Small state changes, rule draws |
| `settle` | 405 | Arrivals, snaps, each leg of a View Transition |
| `move` | 608 | Short camera moves, morphs, scrollTo under one screen |
| `travel` | 911 | Camera flights, long scrollTo |
| `dry` | 1367 | Material decay: ink drying, wet specular, phosphor cooling |

**Rates**, for anything drawn, where the stroke order is the animation:
- Each stroke gets a fixed time window, and its speed is derived from that window: `pens = ceil(L / (6000 × window))`, with a cap of 6,000 px/s per pen.
- Fixed windows make an intro take the same time on a phone and on a 4K screen. Phosphor's fixed 2,400 px/s signature breaks this rule, so it moves to a fixed 1.1 s window.
- Pencil text is written at 22 ms per character.

**Easing curves**

| Name | Curve | Use |
|---|---|---|
| `out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Arrivals, settles |
| `inOut` | `cubic-bezier(0.65, 0, 0.35, 1)` | Camera moves, travel |
| `cut` | `cubic-bezier(0.83, 0, 0.17, 1)` | Decisive state changes, zooms, transition strips |
| `in` | `cubic-bezier(0.55, 0, 1, 0.45)` | Drops and exits |
| `lift` | `cubic-bezier(0.32, 0.72, 0, 1)` | A page lifting off on navigation |
| `dry` | `linear(0, .39 10%, .63 20%, .78 30%, .86 40%, .95 60%, .99 80%, 1)` | Exponential material decay (about 1 − e^−5t) |
| `linear` | `linear` | Pens, beams and scroll progress. Easing is applied to each shot, never to the scroll mapping |

**Springs** (mass 1)

| Name | Stiffness / damping | Use |
|---|---|---|
| `settle` | 420 / 41 | Critically damped, no overshoot. Registration, docking, View Transition landings |
| `pop` | 400 / 22 | Keys and stamps, with one visible overshoot (about 12%) |
| `swing` | 180 / 12 | Hanging things: tags, sheet flutter (about 20%) |
| `return` | 180 / 14 | Spring-back after a drag, carrying the release velocity |

**Staggers**
- Order every stagger by something meaningful: date, distance from the click or origin, or depth. Never order by DOM position.
- Steps are 24 ms for strips and glyphs, 35 ms for lanes, rows and parts, and 60 ms for tiers and layers.
- Cap: the whole group lands within one `settle` (405 ms) of the first item. If n × step goes over that, shrink the step.

**Global motion rules**
1. Every scroll-linked value is a pure function of scroll position, so scrolling back reverses it exactly. Timed flourishes fire only when a snap completes or on direct input.
2. Any wheel, key, touch or pointerdown during an intro ramps the master timeScale to 5 over 180 ms. Scroll is never blocked.
3. Each site gets at most one ambient motion, and rendering stops at rest.

### 2.2 Preloader and page transitions

**Preloader: there isn't one.** The first paint is the finished page. Steps by time:
1. **0 ms:** inline critical CSS paints the final layout. The name and bio are real HTML text in their final positions and form the LCP. The hero box reserves its aspect ratio and shows a static plate (SVG, or an AVIF of 60 KB or less) baked from the real renderer.
2. **In parallel:**
   - Shaders compile with `KHR_parallel_shader_compile`, polled in rAF, and each program is warmed with a 1px draw. Safari reads `LINK_STATUS` only after a dummy draw.
   - Data textures are RGB-only lossless WebP or PNG, with no alpha, because browsers premultiply alpha on decode. They're decoded with `createImageBitmap(..., {premultiplyAlpha: 'none', colorSpaceConversion: 'none'})`.
3. **t0 is the first presented GL frame.** The canvas crossfades over the static plate in 180 ms. Every intro timeline is anchored to t0, never to navigation start.
4. **1.5 s deadline:** if WebGL2 isn't ready by then, the static plate stays and the page is already complete.
5. **Idle by 3.4 s at the latest.** An interrupt finishes the intro in about 300 ms.
6. **Return visits:**
   - Same session (sessionStorage, wrapped in try/catch): open on the settled frame with a 180 ms crossfade.
   - New build: a short replay that shows only what changed. That's revision clouds for Plumber, the newest line for Plates and a warm start for Phosphor.

**In-page transitions**
- Total pinned scroll stays at or under 400vh.
- Snapping uses Lenis idle detection (150 ms of stillness, then a 0.5 s scrollTo), on fine pointers only. Nothing snaps on touch.
- Lenis runs only on fine pointers, driven from `gsap.ticker` with `lagSmoothing(0)`. Touch devices use native scroll with `ScrollTrigger.config({ignoreMobileResize: true})` and pins sized in svh.

**Cross-document transitions**
- `@view-transition { navigation: auto }` works as-is on GitHub Pages.
- Each direction gets one persistent shared element that holds still while sheets swap beneath it: the title block, the masthead, the nip or the storage tube.
- `pageswap` sets `view-transition-name` only on the clicked element, keyed off `activation.entry.url`.
- `pagereveal` adds a forward or backwards type from `navigation.activation`, with a sessionStorage fallback.
- Total duration is 450 ms or less, because input is blocked during a transition.
- The destination hero uses `rel=expect blocking=render`.
- Set `history.scrollRestoration = 'manual'` and restore scroll after `ScrollTrigger.refresh()`.
- Firefox and older Safari navigate normally and still play the arrival settle.
- Outbound links navigate plainly, and modifier-clicks are never delayed.

### 2.3 Performance budget

| Metric | Budget |
|---|---|
| LCP | ≤ 1.5 s on mid-range 4G, with HTML text as the element. Plates is the exception: its LCP is a 60 KB poster, at ≤ 1.8 s |
| INP | ≤ 100 ms |
| CLS | 0 |
| TBT | ≤ 150 ms |
| Critical-path transfer | ≤ 350 KB (HTML, CSS, fonts, LCP image, inline data) |
| First-load JS | ≤ 100 KB gz, loaded after LCP |
| Total JS, home page | ≤ 150 KB gz. Secondary pages ≤ 5 KB |
| Fonts | 2 families at most, subset woff2, ≤ 120 KB, preloaded, with size-adjusted fallbacks |
| GPU contexts | One WebGL2 context site-wide, rendering on demand, zero frames at rest |
| DPR caps | Desktop min(dpr, 1.5). Phones 1.25. Hero-region quads (plate, portrait, line work) up to 2 |
| Pixel budget | Full-viewport passes ≤ 4 MP of backing store, with MSAA off above that |
| GPU memory | ≤ 64 MB desktop, ≤ 16 MB phone |
| Frame rate | 60 fps on an M1, an iPhone 12 and a Pixel 7. 30 fps floor on an iPhone SE (2020) |
| Governor | 60-frame median with hysteresis. Drop bloom and halation first, then backing scale 1.0 → 0.8 → 0.65, then geometry |

**Where each direction stands:**
- **Plumber:** fits (about 300 KB, 75 KB JS).
- **Swiss:** fits (95 KB JS).
- **Phosphor:** fits (230 KB, 100 KB JS).
- **Plates:** over budget today (about 700 KB on a first visit, 140 KB JS). To fit, it has to:
  - defer `data-b.webp`, the print poster and the italic font until first interaction
  - drop CustomEase, since CSS `linear()` already covers the drying curve

**Global rules:**
- No layout reads in rAF. Element rects come from ResizeObserver plus scroll offset.
- Shaders use `highp` throughout on mobile.
- On context loss, the page swaps to the posters.

### 2.4 Reduced motion

- **Every sequence resolves to its designed final frame,** finished to print quality. That one set of plates serves reduced motion and every no-WebGL case, including context loss.
- **Pins are removed.** Each scrubbed sequence becomes a stepper of 3 or 4 stills, switched by text buttons and arrow keys with a 150 ms crossfade.
- **Direct manipulation stays,** because the visitor starts it: wiping, knobs, the light table, the pinscreen.
- **Ambient motion stops:** idle boil, autopilots, drifting lamps, refresh bands.
- **Changing values swap instantly.** No eraser and no pen.
- **View Transitions** become 150 ms crossfades.
- **Sound** stays opt-in, and cues play only on clicks.
- **With JS off,** the page is complete and static, using the same plates.

### 2.5 Audio policy

- **Off by default.** One AudioContext, created inside the opt-in gesture. The preference is saved in localStorage (wrapped in try/catch), but a new visit still waits for a gesture.
- **Master chain:** gain 0.15 into a DynamicsCompressor (threshold −18 dB, ratio 4). Peaks stay under −18 dBFS.
- **Synthesized only:** no audio files, about 3 KB of code. Phosphor's x-y voice reuses the beam's own path buffer.
- **Cues are tied to physical events.**
  - Nothing plays on hover.
  - Scroll makes sound only where it visibly drives a mechanism: the press rumble, the flow, the filing.
- **Limits:**
  - At most one cue per type every 60 ms.
  - playbackRate jitter from 0.9 to 1.1.
  - Exponential ramps end at 0.001, never at 0.
- **No music bed.** Nothing autoplays, and audio suspends when the tab is hidden.
- **The iOS silent switch is respected.** The one exception is Phosphor's "hear the drawing" lever, where sound is the content, so it sets `navigator.audioSession.type = 'playback'`.

---

## 3. Recommendation

### Build Plates

1. **One mechanic runs the whole site.** The roller that prints the hero becomes the nip that every later section comes up out of. That answers "no well thought out animations" directly: every motion on the page is the same press doing its job.
2. **It has the most beautiful frame of the four:** lit copper, warm black ink, a backlit sheet peeling away. In a grid of thumbnails it's the only dark, warm, material image.
3. **The portrait carries the brand line.** Cut lines are days he shipped by hand, and ruled lines are days his automations ran. "I build the machinery that runs the work" becomes something you can see under a moving lamp, and the real count (about 89 hand days of 222) holds up honestly.
4. **It's the cheapest full build, and its risk is concentrated.** It's 26 days with no deferred phase, and nearly all the risk sits in one image that can be proven in 1.5 days.

**Conditions.** Plates goes ahead only if:
- **The plate spike passes:** Philip is recognisable at 375px, and cut and ruled lines read apart at 1x.
- **It fits the shared budget** in section 2.3.
- **The builder signal stays early:** the ActRun line stays in the hero and Work stays directly after the pull.
- **It stays pure.** Don't graft in parts of the other three, because a hybrid would blur the one mechanic that makes it work.

**Alternate: Plumber.** Choose it if Philip wants "AI Agent Plumber" as his headline identity. It gives the strongest builder read and its v1 also costs 26 days, but it carries the most new code (the line engine and the netlist router) before its money frame exists.

**Swiss** stays on hold until Philip agrees to publish private counts. Without them there's no face, and the concept falls apart.

**Phosphor** has the highest ceiling for a shared clip. It also has the highest risk of reading as a trope, and the most dependencies on Philip.

**Plan for 25% contingency.** The engineering reviews found the earlier estimates 2 to 2.5x low. The finals were re-estimated after that, but treat Plates as 32 days on the calendar.

### Prototype order: fastest proof first

**Day 0: one message to Philip.** These decisions cost nothing to make, and they can kill or unblock directions:
1. **May private contribution counts appear?** A no removes Swiss.
2. **Does the tracker cron move off main or come down?** This affects all four. The build excludes it by path either way.
3. **Can he supply five photographed signatures and an approved, sanitized ActRun run log?** Phosphor needs both.
4. **Factual confirmations:**
   - philip@kairoxai.live as the contact address
   - that PromptCache sits inside Kairox AI
   - which product screens may be engraved or traced
   - the automation identities used to classify commits
5. **Can he name five people who know him** for the recognition panel?

**Then, in order:**

1. **Shared groundwork (2 days).** Both pieces are needed whichever direction wins, so nothing here is wasted.
   - The ledger pipeline with hand and automation classes, excluding the tracker by path.
   - The portrait maps: rembg matte, Depth Anything V2 Small depth and MediaPipe landmarks.
2. **One likeness panel for all four (2 days).** Render the four static portraits from the same maps:
   - the Plates engraving at 222 lines
   - the Plumber contour plate
   - a still of Phosphor's 96-line raster
   - the Swiss Atkinson print at 1,470 cells

   Show each at 375px and at full size to the five people in one sitting. A portrait that nobody names unprompted gets one tuning pass, and a second failure drops that direction. This is the cheapest test that can kill a direction, and it covers all four at once.
3. **Plates: the plate and the pull (4 days).** First the plate on real data on a phone, a laptop and a 4K screen (1.5 days), then the drive and the peel, scrubbed on a bare page.
   - **Pass criteria:**
     - Philip is recognisable at 375px.
     - Cut and ruled lines read apart at 1x.
     - No line folds at the hair or the crossed arms.
     - The peel reaches "pulled" at 60 fps on an iPhone 12.
   - **Deliverable:** a 10-second screen recording for Philip. **Decision point at about day 9.** If he approves, build the remaining 20 or so days.
4. **Plumber: the pull-back (6 days).** The WebGL2 line engine on the real netlist, the move from 1x to 0.16x, and the flood.
   - **Pass criteria:**
     - 60 fps on an iPhone 12.
     - At 300px wide, the 0.16x frame reads as a black plant with red veins, with ActRun as the largest object.
     - The dive back to 1x has no visible cut.
   - **When to run it:** in parallel with step 3 if a second builder is available. Otherwise only if Plates fails a gate, or if Philip picks the Plumber identity after seeing step 2.
5. **Swiss: the data-to-plate spike (4 days),** only if Philip agreed to private counts.
   - **Pass criteria:** the DOM name stays registered to GL through the tip in Safari on macOS and iOS, and on a Pixel 7.
6. **Phosphor: one tube (5 days), last.** Its open questions are about perception: does the P7 decay read as physics, and does the line beat actually reach white-hot. Answering them needs real devices and Philip's signature.
   - **Pass criteria:**
     - 4 of 5 people name him from a 375px screenshot.
     - The line beat reaches white.
     - At least 30 fps on an iPhone SE (2020).

**Next step:** send Philip the five Day 0 questions today. His answer on private counts settles whether Swiss stays in the running.