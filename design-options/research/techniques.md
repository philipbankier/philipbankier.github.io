# Technique recipes

82 build recipes gathered during research.

### Shared asset prep: one 'portrait data texture' for all four directions

This is done once, offline. 1) Subject matte: run background removal on profile.webp (the local HyperFrames CLI has remove-background; rembg or MediaPipe also work) and get an alpha mask. 2) Depth: run Depth Anything (for example the huggingface.co/spaces/Xenova/depth-anything-web space), export 16-bit if you can, then blur it 2-3px to kill 8-bit stepping (the Codrops relighting article notes this). 3) Edges: Sobel on luma, thresholded. 4) Pack everything into one 449x561 RGBA PNG: R = linear luma, G = depth, B = matte, A = edge strength. Every shader below reads this one texture. Display rule: never show the raw photo above 1:1. Choose cell, dot or line pitch at 2.2 source px or more on screen (for example 4-6 CSS px cells), so the effect, not the photo's resolution, is what the eye resolves. Optional: run Apple SHARP offline to get a .ply for the volumetric variant.

*Cost: 1-2 hours, with no runtime cost* · <https://tympanus.net/codrops/2026/08/19/relighting-images-with-depth-maps-and-three-js>

### Depth parallax plus cursor-bound relight (base layer for every direction)

Use an ogl or raw WebGL full-quad fragment shader. Parallax: uv2 = uv + (depth - 0.5) * mouse / threshold, with threshold around 35-60 so the offset stays under 1.5% of width. Use mouse += 0.05*(target - mouse), and a deviceorientation fallback clamped to ±15°. Relight: n = normalize(vec3((dL - dR)*k, (dB - dT)*k, 1.0)) from 1-texel neighbours with k around 4-8; L = normalize(vec3(mouseNDC*0.8, 0.6)); shade = 0.55 + 0.6*max(dot(n,L), 0). For the soft shadow, march 12-16 steps from the pixel toward L in uv and accumulate occlusion where depth(sample) exceeds the ray height. Multiply the shading into whatever stylized output comes next, before dithering or halftoning, so the dots and lines respond to the light. Gate edge tearing with the matte by blurring depth across the matte boundary.

*Cost: About half a day; one draw call* · <https://github.com/akella/fake3d>

### Image-space Bayer dither with pixelating cursor wake and depixelating load (phosphor)

Fragment: cell = 3 CSS px * DPR. uvP = cell*floor(uv/cell). Luma in linear light. Threshold from an 8x8 Bayer matrix indexed by the cell coordinate in image space, not gl_FragCoord, so the pattern doesn't crawl when the element scrolls or parallaxes. out = luma + (bayer - 0.5)*spread > 0.5 ? phosphorGreen : nearBlack. Wake: render the pointer into a 128x128 ping-pong FBO each frame (new soft disc at the pointer, previous frame * 0.94, store velocity in .rg). In the main pass, cell = mix(3, 24, trail) and uv -= trail.rg*0.04, and inside the wake mix toward the amber palette. Load: progress 0→1 over 1.4s, LEVELS = 5, basePixel = pow(2, LEVELS), level = floor(progress*LEVELS), with rows below the scan line taking the next level so it resolves like a raster. CRT finish: scanline multiply 0.85 + 0.15*sin(y*PI*2/3px), 3-stripe RGB aperture mask at 8% strength, barrel distortion 0.03, and an afterglow pass of feedback buffer * 0.9 + current.

*Cost: About 1 day; 2 FBOs at 128px plus 1 full pass* · <https://blog.maximeheckel.com/posts/post-processing-as-a-creative-medium/>

### Shape-aware ASCII portrait rendered as real DOM text (phosphor, swiss)

Precompute: for the chosen monospace font (for example JetBrains Mono at 10px), render the 95 printable glyphs to a canvas and measure 6 sampling circles in a 3x2 layout for each, giving a normalized 6D vector per glyph. Runtime or build time: cut the portrait into an 80x56 cell grid (cell aspect around 0.55) and sample the same 6 circles from the data texture's luma. Apply contrast v = pow(v, 1.6), plus directional contrast using external circles. Pick the nearest glyph with a k-d tree, or with a cache keyed on 5-bit quantized components. Write the result into a <pre aria-hidden> with an sr-only alt line next to it. Motion: on load, each cell cycles through random glyphs and settles on its target with stagger = depth*400ms + noise*200ms, so the face resolves from front to back. On hover, cells within 60px switch to a higher-contrast exponent and the amber color. Optional: limit the glyph set to characters taken from the real shipped-ledger commit text so the portrait is literally made of his work log (play.ertdfgcvb.xyz shows the per-cell main() programming model).

*Cost: About 1 day; DOM text at 80x56 = 4.5k chars, repaint only on change* · <https://alexharri.com/blog/ascii-rendering>

### Press-run halftone: CMYK or mono screen that inks and registers on scroll (plumber, plates)

For each channel, rotate uv by its screen angle (C 15°, M 75°, Y 0°, K 45°) and scale to the cell pitch (65 LPI reads as about 6 CSS px). Loop over the 3x3 neighbouring cells. For each, sample the source color at the cell center, convert to that channel's coverage, use radius = sqrt(coverage)*0.7*cell*inkLoad, and accumulate with a smooth-min of the circle SDFs (k around 0.3*cell) so neighbouring dots gel like real ink. Add grid jitter: center += (noise(cellId) - 0.5)*0.12*cell. Add misregistration: offset each channel's uv by reg*vec2(cos, sin)(channelAngle). Scroll choreography with ScrollTrigger scrub: inkLoad goes 0 to 1 (blank sheet to printed) while reg goes 6px to 0.6px (plates settle into register). Finish with a multiply over a paper-grain texture and FBFAF4 paper. Plumber variant: K only plus one spot red, and the dot shape switches to a crosshair or part-number micro-glyph inside the darkest cells. Plates variant: duotone ink-blue plus black at 133 LPI.

*Cost: About half a day; single pass with a 9-tap loop* · <https://paper.design/blog/retro-print-cmyk-halftone-shader>

### Engraved line-screen warped around the head (plates, plumber)

Line field: v = dot(uv, dir)*freq + warp, where warp = depth*1.8 + cylinder curvature (x' = asin(2x - 1)/PI over the matte's horizontal extent, following Rosin and Lai's cylinder-proxy idea) so lines curve around the skull and cheekbones. d = abs(fract(v) - 0.5). Ink where d < (1 - luma)*0.48, antialiased with smoothstep(w - fwidth(v), w + fwidth(v), d). Cross-hatch: a second field at dir rotated 60°, active only where luma < 0.38. A third, stippled layer below 0.15 gives a mezzotint feel in the deepest shadow. Hover: a burin lens, with warp += 0.6*exp(-dist(cursor)^2/0.01), so lines bulge toward the cursor. Scroll: freq goes 18 to 90 lines per image height, so the plate looks like it's being cut pass by pass. Plates ink color is deep blue on bone; plumber uses graphite and adds an Imbrizi-free Sobel outline layer for a drafting look.

*Cost: About 1 day; single pass, cheap* · <https://arxiv.org/abs/2008.05336>

### Matte-confined instanced particle portrait that assembles and scatters (plates, phosphor)

Read the data texture into JS once. Keep pixels where matte > 0.5 and luma > 0.13, then stride by 2, giving about 20-30k instances of a 2-triangle quad with attributes pindex, offset and angle. Vertex: pos = offset + vec3(0, 0, depth*uDepthAmt) + noise(pindex*0.1, t*0.1)*uRandom. Touch texture: a 64x64 canvas 2D where pointermove draws radial gradients with an age-based fade, uploaded each frame. displaced.xy += vec2(cos, sin)(angle)*touch*20*rnd and z += touch*20*rnd. size *= max(grey, 0.2). Fragment: soft circle with alpha by luma. Intro: GSAP tweens uRandom 2.0→0.0 and uDepthAmt 40→4 over 2.4s with expo.out, so the face condenses out of a cloud. ScrollTrigger scrub on exit reverses toward scatter, or blends into the next section's layout (Tibi's progress-uniform morph). The camera yaws ±6° with the mouse so the depth relief shows. For a step further, replace the pixel-derived offsets with points from the offline SHARP .ply.

*Cost: 1-1.5 days; 1 draw call, 25k instances, fine on mobile at DPR 1.5* · <https://github.com/brunoimbrizi/interactive-particles>

### Instanced dither relief that turns 3D on scroll (swiss, plumber)

InstancedMesh of boxes on a 140x175 grid (24.5k). Per instance in the vertex shader: sample luma and depth at the cell center. visible = luma > bayer4x4(cellId) ? 1 : 0, so scale goes to 0 when off. height = depth*h. delay = distance(cellId, origin)/maxDist*0.6, with p = clamp((uProgress - delay)/0.4, 0, 1) eased, so the image decodes in a wave from a corner or from the cursor click point. Use an orthographic camera that starts straight-on, where it reads as a flat 1-bit print aligned to the swiss column grid, then rotate the camera 0→24° on the X axis via ScrollTrigger to reveal that each dot is a column. Color is ink-black on warm white with one red instance at the period of his name. Plumber variant: a wireframe edges material on the boxes plus callout leaders to 'part numbers'.

*Cost: About 1 day; 1 draw call* · <https://tympanus.net/codrops/2026/04/01/animating-160000-cubes-in-three-js-to-visualize-dithering/>

### Depth-following scan sweep with phosphor persistence (phosphor, plumber)

uScan tweens 0→1 (on load, or scrubbed by scroll). The scan line position bends over the face: s = uv.y - uScan + (depth - 0.5)*0.08. band = exp(-s*s/0.0006). Inside the band, reveal a cell-noise dot grid: cell = 5px, dot radius = band*hash(cellId)*luma. Behind the line (s < 0) keep the dithered portrait. Ahead of it, show only the faint grid. Persistence: draw into a ping-pong buffer, new = max(current, prev*0.92), so the sweep leaves a decaying green afterglow. Optional audio: tie a short Web Audio click-tick to scan crossings of the matte edge. Plumber variant: draw a red survey line plus coordinate ticks at the intersections with the matte edge.

*Cost: About half a day; 1 FBO* · <https://tympanus.net/codrops/?p=90674>

### Scroll-velocity pixel sort (swiss, phosphor transitions)

Fast path: VFX-JS PixelSortEffect on the portrait img, with params updated each frame from Lenis velocity: range = [0.5 - v*0.4, 0.5 + v*0.4] luma band, angle = 90° (vertical sort that drips downward), and it eases back to range 0 when still, so the portrait smears into luma-sorted bands only while you scroll and heals at rest. Custom path: an odd-even transposition sort over a 449x561 ping-pong texture running N = 6-12 passes per frame. Each pass compares a pixel with its partner (parity alternates per pass) along the sort axis, swaps if the key (luma) is out of order, and only swaps when both pixels sit inside the mask band. Clear back to the source when velocity drops to 0.

*Cost: 2 hours with VFX-JS; about 1 day custom* · <https://amagi.dev/vfx-js/docs/classes/_vfx-js_effects.PixelSortEffect.html>

### Painterly or ink-bleed reveal (plates)

Base: anisotropic Kuwahara at 8 sectors with polynomial weights and a structure tensor from Sobel. Animate kernel radius 0→7px as the plate scrolls into view, so the photo becomes gouache. Watercolor finish: darken edges, with out *= 1 - 0.25*smoothstep(0.05, 0.2, length(grad(out))); add granulation by multiplying paper fiber noise weighted by (1 - luma); bleed with a 2-tap noise-offset blur at boundaries. Ink-bleed reveal: run a 128x128 stable-fluids sim (or VFX-JS FluidEffect) where the cursor injects dye. mask = smoothstep(0.35, 0.45, dye + fbm*0.15). Show bare paper outside the mask and the painted plate inside, with a pooled-ink rim where rim = band(mask, 0.35..0.42) darkens by 40%. The dye slowly dissipates so the image keeps reforming.

*Cost: 1-1.5 days; Kuwahara is the heavy part, so cap it to the plate's rect and render at DPR 1* · <https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders>

### Phosphor beam and persistence pipeline (the core of Phosphor)

WebGL2 or ogl, three float render targets (RGBA16F). (1) BEAM: for each polyline segment p0->p1, emit a quad padded by 4*sigma. In the fragment shader compute woscope's integrated Gaussian I = 1/(2l)*exp(-py*py/(2s*s))*(erf(px/(1.414*s)) - erf((px-l)/(1.414*s))) in segment-local coords, multiplied by beam energy. Blend ONE,ONE. (2) PHOSPHOR: ping-pong P = min(Pprev*exp(-dt/tau) + B, 2.5), with tau ~0.25s for green P31 and ~0.8s for amber. (3) BLOOM: downsample to half-res, separable 13-tap Gaussian H then V. (4) COMPOSITE: c=uv*2-1; c*=1+0.08*dot(c,c) (barrel); scan=0.86+0.14*sin(uv.y*resY*3.14159); col = reinhard(P+0.6*bloom)*phosphorRGB*scan*vignette, plus faint noise. Tone-map only here. Content ideas: the nameplate and all meters are drawn as beam strokes, not DOM. Hovering a repo row morphs the trace into that repo's sparkline (resample both to N points, lerp). Scroll changes a Lissajous ratio a:b, and persistence makes every transition smear. Optionally run RetroZone's per-channel persistence (different tau for R, G, B) for chromatic ghosting on motion.

*Cost: About 300 lines GLSL and JS, no framework needed. 4 full-screen passes, so clamp DPR to 1.5 and run the phosphor buffer at 0.75x on mobile. Pause via IntersectionObserver. Reduced-motion: render one long-exposure frame.* · <https://discourse.threejs.org/t/phosphor-vintage-oscilloscope-simulator-with-multi-pass-phosphor-rendering/91293>

### Single-stroke type as a beam path, made audible (Phosphor)

Use a Hershey single-stroke vector font (public-domain line fonts made for plotters and vector displays) or Leon Sans glyph coordinates to get polylines for the name and section titles. Resample by arc length to N=2048 points per frame. Mark pen-up moves with intensity 0 (beam blanking). Draw through the beam pipeline. Morphs: resample source and target to the same N and lerp with an ease, and the persistence buffer turns the morph into a luminous smear. Sound (opt-in button, muted by default): write the same x,y arrays into a 2-channel AudioBuffer (L=x, R=y), loop at about 120-200 path repeats per second so it has pitch, gain 0.08, ChannelMergerNode to destination. An AnalyserNode on that output can drive the scope, so what you see is literally what you hear, as in Oscilloscope Music.

*Cost: About 150 lines on top of the beam pipeline, with an 8-20KB font JSON. Web Audio needs a user gesture to start, which is fine since it's opt-in.* · <https://oscilloscopemusic.com/>

### Ink-drawn procedural pipe network with live flow (Plumber hero)

three.js. Nodes are real things (ActRun, PromptCache, the 8 repos, The Living Edge). Route Manhattan paths between them with A* on a coarse 3D lattice (occupancy grid like 1j01/pipes) so every turn is 90 degrees, as in a P&ID. Geometry: CylinderGeometry runs, quarter TorusGeometry elbows (arc PI/2), flanges as short wide cylinders, valves as two cones plus a hand-wheel torus. Render normals and depth to targets, then Sobel both (Heckel Moebius pass). Make it hand-drawn with uv += vec2(sin(uv.y*90.+T), cos(uv.x*90.+T))*0.0012 where T = floor(time*8.) (8fps 'line boil'). Crosshatch with luma<0.55: mod(gl_FragCoord.x+gl_FragCoord.y, 7.)<1., and luma<0.3 adds the opposite diagonal. Composite over manila (#e8dcc0) with fbm paper grain. FLOW: a second material on 'live' pipes (repos with a commit in the ledger today) outputs a red-ink dash, step(.5, fract(vUv.x*len/dash - time*speed)), with speed = base + Lenis velocity, so scrolling pumps the system. BLUEPRINT TOGGLE: gradient-map luma to a Prussian ramp (#0b2447 to #1d4e89 to #dfe8f1), invert lines to white, and reveal with a View Transition circle clip-path from the cursor.

*Cost: three.js (justified here) about 170KB gz plus about 400 lines. A single canvas, with static geometry merged per material. Line boil at 8fps is cheaper than a continuous wobble.* · <https://blog.maximeheckel.com/posts/moebius-style-post-processing>

### Scroll-scrubbed exploded assembly with live leader lines (Plumber)

Pin a section for 300vh. GSAP ScrollTrigger with scrub:1 animates a proxy {e:0->1} rather than the meshes (Kondrashova's proxy pattern from the Codrops cardboard-box tutorial). Each part i has an assembled pose and an explode axis: pos = base + axis*dist_i*ease(clamp((e - i*0.06)/0.55, 0, 1)). Leader lines: every frame, project each part's anchor with v.clone().project(camera), convert to px, and set the SVG <line> x2/y2 and the callout label position. Labels use part numbers ('P-03 tastekit', 'P-07 riskradar'). When e reaches 1, DrawSVG draws dimension lines and the numbers in the title block count up. Also provide a Ciechanowski-style range input that scrubs the same e for direct manipulation. No-WebGL fallback: an isometric SVG with groups translated along the iso axes (cos30, sin30).

*Cost: About 200 lines on top of the pipe scene, reusing its renderer and ink pass. The SVG overlay costs nothing to render.* · <https://tympanus.net/codrops/2022/12/13/how-to-code-an-on-scroll-folding-3d-cardboard-box-animation-with-three-js-and-gsap>

### Plotter-grade SVG self-drawing (Plumber title block, Swiss rules)

Set pathLength="1" on every path with stroke-dasharray:1 and animate stroke-dashoffset 1->0, or use DrawSVGPlugin (free in GSAP 3.13+). Make durations proportional to real length, dur = path.getTotalLength()/600 px/s, so the pen moves at constant speed like a plotter. Order paths by nearest neighbor from the previous path's end point and insert pen-up gaps equal to travel distance/1200 px/s. Draw a small pen-tip circle that rides the active path via getPointAtLength in rAF, or MotionPathPlugin. Sequence: outlines, then hatching fills (clip-path mask sweeping at 45 degrees), then dimension lines with arrowheads, then numbers counting. Hand-inked wobble: an SVG filter with feTurbulence (baseFrequency .02, numOctaves 2) into feDisplacementMap scale 1.5, swapping the seed attribute every 125ms for a classic animation 'line boil'. Use Leon Sans for display type that writes itself.

*Cost: Under 100 lines plus GSAP core and DrawSVG (about 30KB gz). Pure SVG and DOM, so it's accessible and works without WebGL.* · <https://gsap.com/blog/3-13/>

### Kinetic tile-sliced name on the exposed grid (Swiss hero)

Canvas 2D. Render 'Bankier.' in Inter Tight 900 at about 1600px to an offscreen canvas, with the red period drawn separately. Split the main canvas into tiles that match the page's real CSS grid (12 columns x 6 rows, so tile edges sit on the exposed column rules). Per frame, for each tile: sx = x*tw + sin(t*1.1 + x*0.45 + y*0.3)*amp; drawImage(off, sx, y*th, tw, th, x*tw, y*th, tw, th). Pointer distance from the name sets amp (0 to 90px, eased). Scrolling into content eases amp to 0 so the word locks into perfect alignment, which is the Swiss payoff. Variant 2 (Muller-Brockmann Tonhalle): SVG concentric arcs, each with its own rotate() and stroke-dashoffset, durations in modular ratios 1 : 1.5 : 2 : 3 so the composition resolves on a downbeat. Rule: motion only along grid axes, never diagonal drift.

*Cost: About 120 lines, no libraries, and very cheap (72 drawImage calls per frame). Reduced-motion renders amp=0.* · <https://ecal.ch/en/feed/projects/5177/typemachines/>

### Grid-locked index reflow and mask-line type (Swiss)

The index table is a CSS grid. Filter chips (Shipped / Repos / Research) call Flip.getState(rows), apply the filter or sort, then Flip.from(state, {duration:.6, ease:'power3.inOut', stagger:.015, absolute:true}), so rows travel along the grid. Headings: SplitText with mask:'lines' (GSAP 3.13), lines rise from under the column rule with yPercent:100 -> 0. Column rules: CSS scroll-driven, animation-timeline: view(); scale: 1 0 -> 1 1 with transform-origin top, so the grid draws itself as you arrive. Numerals: @property --n {syntax:'<integer>'} animated, displayed via counter-reset: n var(--n), using tabular figures. Giant footer word: per-character rotateX(90deg) -> 0 with transform-origin bottom, scrubbed and staggered (Codrops 2023 perspective typography).

*Cost: GSAP core, Flip and SplitText about 45KB gz, plus about 80 lines. The scroll-driven CSS part costs no JS.* · <https://tympanus.net/codrops/2023/02/22/some-more-on-scroll-typography-animations>

### Cursor-lit letterpress, deboss and foil on paper stock (Plates)

Raw WebGL2 or ogl. Height field: draw the name, plate numbers and colophon mark black on white into a canvas, composite blurred copies (ctx.filter='blur(1px)', 'blur(4px)') for a rounded bevel, and upload as a texture. Shader: h = -depth*mask(uv) + 0.004*fbm(uv*380.) (paper fibers). N = normalize(vec3(h(x-1)-h(x+1), h(y-1)-h(y+1), 2./scale)). The light follows the cursor with weight and settle: L += (target-L)*(1.-exp(-dt*5.)), z=0.5. diffuse = max(dot(N, normalize(L-P)), 0). Letterpress ink fills the debossed mask, darkened slightly at the rim by length(grad h) (ink squeeze). Spot UV: pow(max(dot(N,H),0.), 140.) only inside a mask, so it appears only when the light grazes. Foil: hue = fract(dot(N,H)*3. + uv.x*.5) into a spectral ramp, masked. Mobile: a slow automatic light orbit instead of the cursor.

*Cost: About 200 lines with a single full-bleed quad, cheap enough to run at full DPR. Only redraw when the light moves or settles.* · <https://www.framer.com/community/marketplace/components/press-foil/>

### Closed-form marbled endpapers that the visitor combs (Plates)

Canvas 2D, no fluid solver. Each ink drop is a polygon of about 400 vertices. New drop at C with radius r: for every existing vertex, P' = C + (P-C)*sqrt(1 + r*r/|P-C|^2), then add the new circle. Tine stroke along unit direction M through point B, with d = |(P-B)·N|: P' = P + (alpha*lambda/(d+lambda))*M, with alpha about 60 (shift) and lambda about 24 (sharpness). Pointer drag adds tine strokes along the drag direction. On load, seed 10-14 drops in the book palette (ink blue, bone, oxblood, ochre) over 1.5s, then hand control to the reader. Bake to a dataURL for endpapers and section dividers. Deckle edges: an SVG filter (feTurbulence baseFrequency .04, then feDisplacementMap scale 6) on a rect used as mask-image for each plate, so every edge is torn differently.

*Cost: About 150 lines, CPU only. Cap vertices at about 20k and stop the loop when idle.* · <https://blog.amandaghassaei.com/2022/10/25/digital-marbling/>

### Bending page turns for research plates (Plates)

three.js. Use PlaneGeometry(1.28, 1.71, 30, 2) shifted so x=0 is the spine. Make it a SkinnedMesh with a 31-bone chain along x, skinIndex = floor(x/segW), weight 1. On turn, bone[0].rotation.y = progress*PI. Every other bone gets an extra bend of curl*sin(progress*PI)*(i/N), so the page arcs mid-flip and lands flat. Damp toward targets with easing.dampAngle (maath) or a critically damped spring. Use MeshStandardMaterial with roughness .9 and a raking key light so the curve reads as paper, front and back textures are the plate image and the next plate, and add a short pitch-randomized paper sample via Web Audio. Cheap fallback for page-to-page navigation: a cross-document View Transition where ::view-transition-old(root) animates a diagonal clip-path polygon with a linear-gradient shadow overlay.

*Cost: three.js about 170KB gz if not already loaded, plus about 250 lines. The View Transition fallback is CSS-only.* · <https://book-slider-3d.vercel.app>

### Make the 449x561 portrait intentional: a quantized treatment per direction

Every treatment quantizes, so source resolution stops mattering. PLUMBER: cyanotype, i.e. a gradient map of luma to the Prussian ramp, with a Sobel edge overlay in white ink and crosshatched shadows, captioned 'FIG. 1' in the title block. SWISS: a single-ink 45-degree halftone with cell-center sampling, radius proportional to (1-luma), and fwidth antialiasing. Within 120px of the pointer, dots spring outward and merge via smoothmin. PHOSPHOR: a Rutt-Etra raster where the face is about 90 horizontal scan lines, each vertex displaced upward by luma*14px and drawn as beam strokes through the persistence pipeline, so the face is drawn by the beam and fades. Hover raises the line count, and an alternate is an ordered 4x4 Bayer dither in P31 green. PLATES: CMYK halftone at C15/M75/Y0/K45 with per-plate misregistration offsets of 0.5-1.5px that animate to zero on load (the press 'settling into register'), on warm stock. Paper's defaults are 00B3FF, FC4F9D, FFD900, 231F20 on FBFAF4. Or use a single ink-blue gravure. Audition the looks first in Paper Shaders (Halftone CMYK, Image Dithering, Paper Texture) or basement.studio Shader Lab (Halftone, Dithering, Edge Detect, Plotter, Ink, CRT) before hand-writing GLSL.

*Cost: Each is a single fragment shader, about 60-120 lines, run on one quad. The Rutt-Etra version reuses the beam pipeline.* · <https://paper.design/blog/retro-print-cmyk-halftone-shader>

### Depth-map relief portrait (isolines for Plumber, bas-relief for Plates)

1) Offline, run Depth Anything V2 (small) locally on profile.webp to get a 16-bit depth PNG. Matte out the park background (rembg or a hand mask) so it sits at depth 0, then blur 2px. 2) ogl or three.js: PlaneGeometry 200x250 segments, vertex shader pos.z = texture(uDepth, uv).r * uRelief. 3) Plumber fragment, contour drawing: float d = depth*24.0; float l = abs(fract(d)-0.5)/fwidth(d); float ink = 1.0 - smoothstep(0.0, 1.2, l); thicken every 5th band (index contour); drafting ink on manila; 45° section hatching where depth > 0.8. 4) Plates fragment: n = normalize(cross(dFdx(vPos), dFdy(vPos))); raking light at about 15° elevation whose azimuth follows the cursor; lambert * paper texture * gravure ink-blue, so the face reads as carved into the page. 5) GSAP ScrollTrigger scrub: uRelief 0 to 1 plus camera yaw ±12° (the flat drawing inflates to an object, Oryzo-style 3D to 2D to 3D). 6) A 120px cursor radius swaps isolines for the halftone photo. One draw call and ~50k vertices; mobile-safe.

*Cost: Medium: half a day for the depth pipeline, one day for the shader. ~30 KB depth PNG plus ogl.* · <https://www.awwwards.com/inspiration/wireframe-reveal-poor-charlies-announcement>

### Fluid blob reveal mask over the portrait (Lando-style)

Ping-pong FBO, 256x256 RG16F 'trail' texture. Each frame: trail = texture(prev, uv - vel*0.002).r * 0.965 + splat(mouse, radius = 0.06 + speed*0.1), with optional curl-noise advection for swirl. Final pass: m = smoothstep(0.35, 0.55, trail + fbm(uv*3.0 + t*0.1)*0.25), which gives gooey, helmet-like edges; out = mix(baseTreatment, revealTreatment, m). Pairs per direction: Plumber halftone to isolines; Swiss 1-bit dither to full-colour crop; Phosphor ASCII to beam; Plates engraving to cyanotype. On idle and on touch devices, drive the 'mouse' along a slow Lissajous path so it moves on load. prefers-reduced-motion: render a static 50/50 split.

*Cost: Low-medium: about 150 lines of GLSL/JS, 2 FBOs at 256².* · <https://landonorris.com/>

### Ordered-dither / halftone portrait that 'develops' on load

Fragment: pixelate uv = floor(uv*res/cell)*cell/res; lum = dot(rgb, vec3(.2126,.7152,.0722)); compare lum + bias against an 8x8 Bayer matrix (const float[64], indexed by ivec2(gl_FragCoord.xy/cell) % 8) to choose ink or paper. For colour, quantise with floor(c*(n-1.)+.5)/(n-1.). Animate cell from 24 to 3 px over 1.2 s on load (the photo 'develops'), then tie bias to scroll so the portrait darkens or burns out as you leave the hero. No-dependency alternative: @paper-design/shaders HalftoneDots (type 'gooey' | 'holes', grid 'hex', grainOverlay) or Dithering (2x2/4x4/8x8/random). Why it rescues the 449x561 source: output resolution is the cell grid (~150x190 cells), far below the source.

*Cost: Low: one fragment shader, or the Paper Shaders package (pure WebGL2, zero runtime deps).* · <https://blog.maximeheckel.com/posts/the-art-of-dithering-and-retro-shading-web>

### Phosphor beam renderer: name, meters and ledger drawn by a simulated electron beam

1) Turn the name and sparklines into XY point streams: opentype.js font.getPath(...), sample ~2,000 points along the commands in draw order. 2) Draw them woscope-style: one quad per segment, intensity = erf(x/(√2σ)) - erf((x-len)/(√2σ)), additive blend into an RGBA16F target, so brightness falls as beam speed rises. 3) Phosphor buffer, ping-pong: next = prev*exp(-dt/τ) + beam (τ ≈ 0.12 s green, 0.4 s amber), clamp 2.5, kept in linear HDR. 4) Bloom: half-res separable 13-tap Gaussian. 5) Composite: Reinhard, barrel distortion (k ≈ 0.06), scanlines, vignette, faint burn-in texture of the nameplate. 6) Optional, opt-in on click: route the same XY stream into a stereo AudioBuffer (L = x, R = y) so the name is audible as oscilloscope music. Count-up meters become needles with afterglow trails.

*Cost: Medium-high: 2-3 days. Reuse the MIT playground's pass structure.* · <https://discourse.threejs.org/t/phosphor-vintage-oscilloscope-simulator-with-multi-pass-phosphor-rendering/91293>

### GPU text scramble and glitch from an SDF atlas (Igloo-style)

Generate an MSDF atlas for the display face (msdfgen / msdf-bmfont-xml). Render labels as instanced quads with per-glyph attributes (index i, target glyph g). Scramble: glyph = mix(hashGlyph(i + floor(t*30.)), g, step(stagger_i, progress)), so each glyph cycles random characters until its staggered threshold passes, then locks. Glitch: x-offset = step(0.97, hash(floor(uv.y*40.) + floor(t*12.))) * 0.02 plus a 1-2 px RGB split on the same rows. Trigger on hover, on route change and when a new ledger entry arrives. Nothing touches the DOM, so there's no reflow; keep a visually hidden DOM copy for accessibility and SEO.

*Cost: Medium: one day, including the atlas build step.* · <https://awwwards.com/igloo-inc-case-study.html>

### Swiss kinetic system: masked SplitText, variable-weight proximity, scroll-timeline rules

1) SplitText.create('.name', {type:'lines,chars', mask:'lines', autoSplit:true, onSplit: s => gsap.from(s.chars, {yPercent:110, stagger:0.02, ease:'expo.out'})}). GSAP and SplitText are free; the mask option gives clean clipped reveals and autoSplit re-splits on font load or resize. 2) Proximity weight: per char, gsap.quickTo(el, '--wght') where wght = 300 + 600*(1 - clamp(dist/220)), applied via font-variation-settings: 'wght' var(--wght) (Inter Tight is variable on Google Fonts). The name thickens under the cursor like ink pooling. 3) Native CSS for the exposed column rules: .rule{transform-origin:top; animation: draw linear both; animation-timeline: view(); animation-range: entry 0% cover 35%} with @keyframes draw{from{scale:1 0}}. The giant clipped footer word slides on animation-timeline: scroll(root). 4) Index table rows: on hover, run the SDF or DOM scramble on the row's year and repo name.

*Cost: Low: GSAP core + SplitText ~ tens of KB; scroll-driven CSS is zero JS.* · <https://scroll-driven-animations.style/>

### Cross-document View Transitions as plate turns and sheet swaps (works on GitHub Pages)

On every page: @view-transition { navigation: auto; types: forwards; }. Give persistent objects stable names: the portrait plate view-transition-name: plate-hero; the title block or nameplate view-transition-name: masthead. In pagereveal, read navigation.activation.from/entry to add 'backwards' via e.viewTransition.types.add(). CSS: ::view-transition-old(root){animation: 600ms cubic-bezier(.7,0,.2,1) lift} with clip-path inset sweeps (Plates: the plate slides under the next like a turned leaf; Plumber: the sheet slides out of a flat-file drawer; Phosphor: the old page collapses to a horizontal line like a CRT power-off, scaleY to 0.002 then scaleX to 0). Add <link rel='expect' blocking='render' href='#hero'> so the target exists. Supported in Chrome/Edge 126+, Safari 18.2+, partial in Firefox 147+; otherwise falls back to a normal navigation.

*Cost: Very low: CSS-only, no SPA router needed.* · <https://developer.chrome.com/docs/web-platform/view-transitions/cross-document>

### ASCII glyph-atlas post-process for the Phosphor portrait

Render the portrait (or the depth relief) to a target, then run a ShaderPass: cell = 8 px; lum = average of the cell; glyph index = floor(lum*9.) into a 10-glyph ramp ' .:-=+*#%@' packed in a 1x10 atlas texture; sample atlas at fract(fragCoord/cell). Colour mode: phosphor green multiplied by lum. Progressive reveal: show the glyph only where cellIndex < uReveal*totalCells, with uReveal driven by load or by the day's commit count. Feed the output into the phosphor decay buffer so glyph changes leave afterglow. Combine with the blob mask so the cursor 'tunes' ASCII into the clean beam image.

*Cost: Low: one pass. Demo to study: https://fwdapps.net/l/asci/* · <https://discourse.threejs.org/t/asci-threejs-post-processing/89064>

### Static-host live ledger: daily commits become the spectacle

Extend the existing tracker cron (GitHub Action) to write /data/ledger.json (date, repo, message, short sha) and /data/repos.json (stars, last push) to the Pages branch at build time. No client-side GitHub API calls, so no rate limits. On load, fetch the JSON and seed each visual by the sha hash so positions stay stable across visits. Per direction: Plumber, each commit is a rubber stamp thumped onto the work order (scale 1.35 to 1, 80 ms, feTurbulence + feDisplacementMap ink spread, click sound); Swiss, rows type on with SplitText and the newest pins to the top; Phosphor, each commit is a beam blip on a strip-chart recorder with persistence; Plates, each is a numbered accession placard. Show 'last commit 14 h ago' computed client-side from the timestamp.

*Cost: Low: reuses existing automation. ~50 lines of Action YAML/JS.* · <https://www.awwwards.com/sites/messenger>

### Opt-in sound layer (Igloo / Bruno / Immersive Garden pattern)

Off by default with a corner toggle (Immersive Garden uses 0/Off/On); remember it in try/catch-wrapped localStorage. One 30 ms click sample through an AudioBufferSourceNode with playbackRate = 0.9 + Math.random()*0.2 so repeats never sound identical (Bruno's UI approach). Phosphor: 60 Hz sine via OscillatorNode at about -42 dB through a lowpass, gain following beam brightness. Plumber: stamp thud and paper slide. Plates: page-turn rustle on view transitions. Sync to motion as Igloo did: map particle or beam velocity to a filter cutoff. Create the AudioContext only on the first user gesture.

*Cost: Low: under 3 KB code plus ~20 KB of samples.* · <https://www.awwwards.com/brunos-portfolio-case-study.html>

### Exploded assembly with self-drawing dimension lines (Plumber)

Draw the 8 open-source repos as parts of one isometric SVG assembly (manifold, valves, gauges), each part tagged with data-explode='dx,dy'. Pin the section for 300vh with ScrollTrigger. Timeline: parts translate along their explode vectors (ease 'power2.inOut'); leader lines and dimension lines draw with DrawSVG from '0%' to '100%' (free GSAP plugin); part-number balloons pop with a short back.out; dimension text counts up to real values (stars, commits, release count) with gsap.to(obj, {val, snap:1}). At the end, the assembly collapses back to an orthographic 2D section view (Oryzo 3D to 2D to 3D). On hover, a part gets a red stamp label and its schedule-of-work row highlights.

*Cost: Medium: SVG authoring is most of the work. Runtime is GSAP only.* · <https://oryzo.ai>

### Engraving / intaglio line shader for the Plates portrait

Fragment: rotate uv 30°; v = fract(dot(uv, dir)*freq + lum*0.15); line width w = (1.0 - lum)*0.48; ink = smoothstep(w+aa, w-aa, abs(v-0.5)) with aa = fwidth(v). Add a second crosshatch set at -30° only where lum < 0.35. Ink-blue on bone with a paper-fibre texture multiplied in and a 1 px plate-mark emboss around the image. Feed lum from the bas-relief lighting so moving the cursor re-engraves the face as the light rakes across. Load: sweep a mask across the plate so lines appear as if being cut. Pair with Lenis for the slow museum scroll.

*Cost: Low-medium: one shader; reuses the depth map from the relief technique.* · <https://shaders.paper.design/halftone-dots>

### Rubber-stamp impact on live HTML text (SVG filter, GSAP)

1) Markup: the real text in a span, plus an aria-hidden clone for the stamped look. 2) Filter, one per stamp with a unique seed hashed from the ledger entry id: <filter id='stamp-N' x='-20%' y='-20%' width='140%' height='140%'><feGaussianBlur in='SourceGraphic' stdDeviation='0' result='b'/><feColorMatrix in='b' type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7' result='goo'/><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='N' result='grain'/><feDisplacementMap in='goo' in2='grain' scale='0' xChannelSelector='R' yChannelSelector='G' result='d'/><feComposite in='d' in2='SourceGraphic' operator='atop'/></filter>. For ink starvation, add a second thresholded turbulence used with operator='out' to punch small holes. 3) Impact timeline: gsap.timeline().fromTo(clone,{scale:1.6,rotation:gsap.utils.random(-6,6),opacity:0},{scale:1,opacity:1,duration:0.18,ease:'power4.in'}).to(blurNode,{attr:{stdDeviation:0.6},duration:0.35,ease:'expo.out'},'<0.18').fromTo(dispNode,{attr:{scale:14}},{attr:{scale:2.5},duration:0.4},'<'). Add a 1-2px offset ghost at 25% opacity for a double strike, and a 3px translateY shake on the container. 4) Trigger per ledger row with ScrollTrigger (once: false, so it re-stamps on scroll back). 5) Budget: animate only in-viewport stamps. After settle, leave the static filter values (cached), or swap in a pre-rendered SVG.

*Cost: Low: no WebGL, about 80 lines. SVG filters repaint on every frame of the animation, so keep it to 6 or fewer simultaneous stamps.* · <https://tympanus.net/codrops/2024/08/22/scroll-based-svg-filter-animations-on-text/>

### Scroll-scrubbed variable axes with CSS scroll-driven animations ('position equals state')

1) Register each axis so it interpolates independently: @property --soft {syntax:'<number>'; inherits:true; initial-value:100} (repeat for --wght, --wonk, --bled, --scan). 2) h1 { font-variation-settings: 'SOFT' var(--soft), 'WONK' var(--wonk), 'opsz' 144; animation: dry linear both; animation-timeline: view(); animation-range: entry 0% cover 45%; } @keyframes dry { from {--soft:100; --wght:300} to {--soft:0; --wght:560} }. 3) Per-letter phase: split chars (SplitText) and set style='--i:n', then animation-range: entry calc(var(--i)*1.5%) cover calc(30% + var(--i)*1.5%), so the drying travels across the word. 4) Fallback: @supports not (animation-timeline: view()) runs a GSAP ScrollTrigger with scrub:0.6 that writes the same custom properties via el.style.setProperty. 5) Never use one-shot triggers for these: reversibility is what makes it feel engineered (Exat). 6) prefers-reduced-motion sets the final keyframe values statically.

*Cost: Very low: CSS only on Chromium and Safari 26+, GSAP fallback elsewhere.* · <https://exat.hottype.co>

### Cursor-proximity glyph field with quantized rings (weight, width and color)

1) Split the target (hero name or index table) into chars and cache each char's center from getBoundingClientRect on load and resize, not per frame. 2) pointermove stores the cursor, and one rAF loop runs only while the cursor moved in the last 600ms or chars are still settling. 3) For each char: d = hypot(cx-mx, cy-my); ring = Math.min(6, Math.floor(d / R)) with R about 0.6em of the font size; targets come from arrays indexed by ring, e.g. WGHT=[900,780,660,540,440,360,300] and WDTH=[125,118,110,104,100,100,100]; color token from a 7-step ramp. 4) Ease current toward target with c += (t-c)*0.18 and write el.style.setProperty('--w', c), with font-variation-settings: 'wght' var(--w), 'wdth' var(--x). 5) On touch, drive a virtual cursor along the line from scroll progress. 6) For a table, apply rings by row distance only, so the column grid never jitters.

*Cost: Low: about 60 lines. Fine for 200 or fewer chars. For more, render with MSDF and do the distance in the vertex shader.* · <https://abduzeedo.com/exat-variable-font-microsite>

### Fit-to-measure name: solve the wdth axis to the column span every frame

1) Use a grotesk with a real wdth axis (Inter Tight has none, so swap the display face for Swiss, e.g. GitHub's open-source Mona Sans or any wdth-capable grotesk). 2) solveWidth(el, targetPx): binary search wdth in [min,max] for 12 iterations, setting font-variation-settings and reading el.scrollWidth. Cache results by targetPx bucket (8px buckets) to avoid layout thrash. 3) Bind targetPx to a ScrollTrigger-scrubbed column count: the exposed column rules animate from 12 to 4 columns as you scroll past the hero, and the name re-solves each frame, so letters compress in width while height stays fixed. 4) Keep the red period outside the solved span at a fixed size as the visual pivot. 5) Do the same on resize so the name always hits the grid edge to the pixel. That precision is the Swiss signature, versus a clipped giant word.

*Cost: Low to medium: binary search costs about 12 layouts per frame. Bucket-cache it, or precompute a width-to-wdth lookup table once per font size.* · <https://abcdinamo.com/custom/d-ad-dumbar-marfa-2021>

### DOM-synced MSDF text with per-glyph choreography and a noise dissolve

1) Generate an MSDF atlas for the display face with msdf-bmfont-xml (JSON plus PNG, committed to the repo, static-host safe). 2) Render with three-msdf-text-utils (https://github.com/leochocolat/three-msdf-text-utils). Its geometry exposes per-glyph attributes (glyphUv, layoutUv, lineIndex, lineLetterIndex, wordIndex, letterIndex), so every letter can be offset in the vertex shader by its own index. troika-three-text is the simpler alternative. 3) Sync to hidden HTML per Haakana: visibleH = 2*tan(fov/2)*camDist; unitsPerPx = visibleH/innerHeight; mesh.position from rect center, scale from computed font-size. 4) Dissolve (Gommage): n = pow(texture(noise, glyphUv).r, 2); alpha *= smoothstep(progress-0.04, progress, n); edge = smoothstep(progress, progress+0.03, n) - smoothstep(progress+0.03, progress+0.06, n); color = mix(ink, hotColor, edge). Use ink-blue on bone paper for plates, phosphor green plus bloom for phosphor. 5) Particles: an InstancedMesh of 2-4k quads seeded at random glyph positions, released when progress passes their sampled noise value, with curl-noise drift. 6) Scroll-speed bend (Faure 3D circle text): uSpeed = lerp(uSpeed, (target-current)*0.001, 0.1), rotating each glyph around its own center by uSpeed*letterIndex.

*Cost: Medium to high: about 120KB three.js (or ogl at about 30KB with its own MSDF example), one draw call per text block. Gate WebGPU/TSL behind feature detection and fall back to GLSL ShaderMaterial.* · <https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/>

### Letters (or part tags) as physics bodies that can reassemble into type

Tier A, choreographed and cheap: GSAP Physics2DPlugin on SplitText chars, gsap.to(chars, {physics2D:{velocity:'random(250,650)', angle:'random(250,290)', gravity:900}, rotation:'random(-120,120)', duration:2.2}) fired by ScrollTrigger when a row 'ships'. Tier B, interactive pile with matter.js: for each char span measure its rect, then Bodies.rectangle(x+w/2, y+h*0.55, w*0.92, h*0.7, {chamfer:{radius:3}, restitution:0.15, friction:0.7, density:0.002}). Trim the box to the x-height band so glyphs stack tightly. Add a static floor at the next section's top and side walls at the column rules, MouseConstraint for drag and throw, and enableSleeping:true. Each afterUpdate writes transform: translate3d(dx,dy,0) rotate(a) to the span. Reassemble: stop the runner and FLIP every span back with gsap.to(span, {x:0, y:0, rotation:0, ease:'elastic.out(1,0.55)', stagger:{each:0.008, from:'random'}}). Sound (Type Physics model): Events.on(engine, 'collisionStart') takes pairs with relative speed above 2 and triggers a 25ms bandpassed noise burst via Web Audio, with gain proportional to speed and filter frequency mapped from glyph width. Throttle to 10 per frame, create the AudioContext only after a user gesture, and keep sound off by default with a visible toggle.

*Cost: Medium: matter.js is about 80KB, so keep it to 150 or fewer bodies. Tier A adds only the free GSAP plugin.* · <https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/>

### Slice-assembled words (glass parallax split)

1) For each heading word, create N clones (N = number of exposed grid columns it spans, 6-12). Clone i is an absolutely positioned span with left: i/N*100%, width: calc(100%/N + 0.01%), overflow: hidden, containing the full word offset by -left so the slice shows the correct part. 2) Inner offset: x0 = (i - N/2) * 0.35em, alternating sign for odd i. Optionally add filter: blur(4px) to 0. 3) gsap.fromTo(inners, {x:(i)=>x0[i], opacity:0}, {x:0, opacity:1, duration:1.1, ease:'expo.out', stagger:{each:0.035, from:'center'}}), scrubbed by ScrollTrigger for reversibility. 4) Keep the real word as visually hidden text and mark the clones aria-hidden. 5) For the loader, echo the initials (Vitasovic): render 'P' and 'B' as 5 tinted copies spaced 0.6em apart, then collapse the copies onto one with stagger.

*Cost: Very low: CSS plus GSAP, no canvas.* · <https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/>

### Text-mode (ASCII) portrait and hero renderer

1) Canvas 2D: pre-render a monospace atlas (one row of glyphs) with ctx.fillText into an OffscreenCanvas and record the cell size. 2) Downsample profile.webp to the grid (cols = floor(canvasW/cellW), about 90; rows from the aspect ratio) with drawImage onto a cols x rows canvas, then read getImageData once. 3) Per frame at 30fps (play.core cap): L = 0.299r+0.587g+0.114b, with a contrast curve; char = RAMP[floor(L*(RAMP.length-1))] where RAMP=' .:-=+*#%@'. 4) Cursor heat: inside radius r of the pointer, replace the ramp char with the next char of a real commit hash or ledger line streamed from a JSON file, and add +0.25 brightness that decays at 0.92 per frame (a beam trail). 5) Boot: reveal rows top-down at 2 rows per frame, with BLED spike on the Workbench font if DOM-rendered. 6) GPU path (Efecto): fragment shader with procedural 5x7 glyph functions and cell = floor(uv*grid), then CRT post: c = uv*2-1; c *= 1 + 0.08*dot(c,c); scanline = 0.85 + 0.15*sin(uv.y*rows*3.14159); RGB offset of 0.0015.

*Cost: Low for Canvas 2D (no libs), medium for the GPU path.* · <https://play.ertdfgcvb.xyz/abc.html>

### CRT and dot-matrix boot using font axes (Workbench, Sixtyfour, Bitcount)

1) Self-host the variable Workbench or Sixtyfour WOFF2 (OFL) and set font-variation-settings: 'BLED' var(--bled), 'SCAN' var(--scan). 2) Boot: animate --bled 100 to 0 over 900ms with steps(14) easing (phosphor settle) while --scan goes 0 to 45. Stagger lines by 40ms top-down. 3) Hover on a tape-log row: --bled spikes to 70 and decays over 450ms (beam dwell). 4) Scroll velocity: --scan = clamp(-53, 45 + v*0.6, 100) through a lerped ScrollTrigger getVelocity(). Per Fontsource, BLED and SCAN don't change widths or line breaks, so this is safe on live tables. 5) For meters and counters, use Bitcount (https://fontsource.org/fonts/bitcount/about): ELXP 0-100 pushes the pixel elements apart (explode a number before it changes), ELSH 0-100 morphs the element shape (square LED to round dot). Tween ELXP 0 to 60 to 0 around each count-up tick. 6) Combine with a DOM scramble on value change (GSAP ScrambleTextPlugin, chars:'0123456789').

*Cost: Very low: fonts plus CSS custom properties.* · <https://fontsource.org/fonts/sixtyfour/about>

### Data-bound type axis (truthful kinetic type)

1) The GitHub Action that already commits daily also writes /data/pulse.json with real numbers, e.g. {shipStreakDays, commits7d, lastShipISO}. 2) At page load, map one metric to one axis: e.g. Fraunces wght = 300 + min(streak,60)/60*600, Workbench BLED = min(commits7d,40)/40*100, or Bitcount ELXP for idle days. 3) Always print the source number next to the type (e.g. 'weight = 12-day ship streak') so the motion encodes a checkable fact. 4) Animate from the neutral axis value to the data value on first view (scrubbed), so visitors watch the fact arrive. 5) If data is stale (lastShipISO older than 2 days), show it at its actual value rather than faking motion.

*Cost: Very low: build-time JSON plus one CSS variable.* · <https://design.google/library/climate-crisis>

### Peel-up letters with a ground shadow (decals, placards, stamps)

1) Draw the label or name into a canvas texture at 2x DPR (crisp), and draw a second texture with ctx.filter='blur(12px)' at 35% alpha for the shadow. 2) Two meshes: a shadow plane at z=0 and a text plane PlaneGeometry(w, h, 100, 100) at z=0.001. Use an OrthographicCamera tilted about 35 degrees for the diagonal view, or a straight-on camera with a small perspective for a subtler lift. 3) Raycast the pointer onto an invisible oversized plane and pass uDisplacement in world space. 4) Vertex: d = length(uDisp - (modelMatrix*vec4(position,1.)).xyz); t = clamp(1. - d/uRadius, 0., 1.); position.z += easeInOutCubic(t) * uLift. Add a small roll, position.y += t*t*0.04, so it reads like peeling paper. 5) Spring the uniform toward the pointer: current += (target-current)*0.12. 6) Fragment: discard if alpha < 0.01 and multiply by a paper-grain texture for plates or manila for plumber.

*Cost: Low to medium: three.js or ogl with a single shader material. Can run on any WebGL1 device.* · <https://tympanus.net/codrops/2025/03/24/animating-letters-with-shaders-interactive-text-effect-with-three-js-glsl/>

### Constrained-charset scramble and terminal cursor reveal

1) Per char: settleAt = i*16ms + random(0,140ms). Until then, each frame shows a random glyph from a context charset: hex '0123456789abcdef' for commit hashes, '[A-Z0-9-]' for plumber part numbers, box-drawing for phosphor rules. After settleAt, lock the final char. 2) Prevent width jitter with a monospace face or font-variant-numeric: tabular-nums plus a fixed min-width per span. 3) Lead with a block cursor element (the ▉ glyph or a 0.6em-wide span) whose x tweens with the settle front, plus a background bar with transform: scaleX(0 to 1), transform-origin left (Codrops LineTextHoverAnimations). 4) GSAP shortcut: gsap.to(el, {duration:0.9, scrambleText:{text:final, chars:'0123456789abcdef', revealDelay:0.15, speed:0.5}}). 5) Use it for real data only (ledger timestamps, repo names), never for prose paragraphs.

*Cost: Very low.* · <https://tympanus.net/codrops/2024/06/19/hover-animations-for-terminal-like-typography/>

### Physarum 'pipe network' pulsed by real ledger commits (plumber, phosphor)

1) At deploy, a GitHub Action writes ledger.json with {date, repo, sha, kind} rows. 2) In WebGL2 (gpu-io or raw), store agent state in a 512x512 RGBA32F texture (x, y, heading, spare), which gives 262k agents. Keep the trail map as an R16F texture at half viewport resolution. 3) Agent pass (fragment shader into the ping-pong state FBO): sample the trail at three sensors at distance SD and angle +/-SA, rotate by RA toward the maximum, step 1px, wrap or bounce at the edges. Start at SA 22-45 deg, SD 9px, RA 45 deg, then tune by eye. 4) Deposit pass: draw agents as GL_POINTS with additive blending into the trail. 5) Diffuse/decay pass: 3x3 mean filter, then multiply by 0.90-0.95. 6) Food: fixed nodes at ActRun, PromptCache and each of the 8 repos write constant attractant. On load, replay the last 30 days of ledger rows as attractant pulses (1 day = 150ms) so the network forms around where work actually shipped, then settles. The pointer acts as a temporary food source. 7) Render plumber as trail > 0.2 thresholded to 1-bit red ink, misregistered 1px over a black pass on manila, with node labels as stamped part numbers. Render phosphor as trail mapped to a green ramp, plus a feedback persistence of 0.92 and a 1-bit Bayer dither at 3px.

*Cost: Medium-high: about 1 day for the sim and 1 day for art direction. Cap DPR at 1 and run at half resolution, drop to 65k agents on mobile, and pause with IntersectionObserver. With prefers-reduced-motion, run 600 steps hidden and show the frozen frame. Ship a build-time PNG as the no-WebGL fallback.* · <https://apps.amandaghassaei.com/gpu-io/examples/physarum/>

### Image-modulated reaction-diffusion portrait (plates, phosphor)

1) Downsample profile.webp to a 256x320 luminance texture (L = 0.21R + 0.72G + 0.07B) and apply a contrast curve so face and background separate cleanly. 2) Run Gray-Scott on ping-pong RGBA16F textures at 512x640 (WebGL2 plus EXT_color_buffer_float): A' = A + (dA*lapA - A*B*B + f*(1-A))*dt and B' = B + (dB*lapB + A*B*B - (k+f)*B)*dt, with dA = 1.0, dB = 0.5, dt = 1. Laplacian weights: center -1, edges 0.2, corners 0.05. 3) Per pixel, mix f/k between a dark preset (the commonly cited 'coral' values, f = 0.0545, k = 0.062) and a light preset ('mitosis' spots, f = 0.0367, k = 0.0649), or use a high-kill 'dead' preset for the background. Tune visually in Jason Webb's playground with its style-map upload first. 4) Seed B in random 3px squares and run 12-16 iterations per frame; the face resolves in about 4-6s. 5) The pointer adds B in a 12px radius, and the disturbed area grows back toward the image. 6) Every 60 frames, read a 32x32 downsample and stop the sim once mean |deltaB| < epsilon. 7) Display shader for plates: smoothstep(B) mapped to ink-blue on bone, multiplied by a paper texture, with a placard that reads 'Gray-Scott, f 0.0545 / k 0.062'. For phosphor: B mapped to green plus bloom.

*Cost: Medium: about 1 day. Idle GPU cost is zero after convergence. Fallback is a build-time PNG of the converged state.* · <https://github.com/piellardj/reaction-diffusion-webgl>

### Oscilloscope-beam typography with an audible signature (phosphor)

1) Turn the name, the numerals and the meter needles into single-stroke polylines: a stroke font, or hand-drawn SVG paths sampled with getPointAtLength. Resample to 2,000-4,000 evenly timed points. 2) For each consecutive pair, build a quad about 4 sigma wide. The fragment shader uses woscope's erf integral for intensity, multiplied by 1/segment length so slow passes glow. 3) Blend additively (SRC_ALPHA, ONE) into a float FBO. A persistence pass multiplies the previous frame by 0.85-0.9 before adding the new beam, followed by a 2-3 level mip bloom. 4) Move a beam head through the point list at 1-2 traces per second so glyphs are drawn rather than displayed. Count-up meters become needle paths drawn the same way. 5) Add an opt-in 'listen' control that creates a 2-channel AudioBuffer (L = x, R = y) at 48kHz looping the path through a GainNode at about 0.08. The visitor hears his nameplate as oscilloscope audio, and the visuals and sound share one data source.

*Cost: Medium: about 1 day. One draw call per frame, and audio starts only on an explicit gesture.* · <https://m1el.github.io/woscope-how/>

### Halftone that behaves like wet ink (plumber, plates)

1) Size the cell grid at 6-8 CSS px per cell. That's coarser than the source pixels, which hides the 449px limit. 2) Sample luma at the cell center from a pre-blurred portrait texture and set radius = 0.5 * cell * sqrt(1 - luma), antialiased with fwidth. 3) Loop over 3x3 neighbors so large dots can overlap. For the gooey variant, use smin(d, dNeighbor, k = 0.15). 4) Cursor brush: render the pointer into a 128x128 R16F 'pressure' FBO that decays by 0.94 per frame, take its gradient, and offset each dot center by -gradient * cell * 1.5. Dots part like iron filings and settle back. 5) Plumber uses a red screen at 45 deg over a black screen at 75 deg, offset 1.5px for misregistration. Plates uses a single ink-blue screen at 45 deg multiplied by paper texture. 6) On scroll-in, animate the grid density from 24 cells to its final value so the plate resolves from coarse to fine, like a proof being pulled.

*Cost: Low-medium: about half a day. One fullscreen-quad shader, limited to the portrait rectangle.* · <https://blog.maximeheckel.com/posts/shades-of-halftone/>

### Plotter line portrait with line boil and a downloadable plot file (plumber, swiss, plates)

1) A build-time Node script (canvas-sketch style workflow) loads the portrait and computes luminance. 2) Pick one method. Either SquiggleDraw rows (about 90 lines, sine amplitude and frequency proportional to darkness), or a Hobbs-style flow field whose streamline separation scales from 2px (dark) to 9px (light), enforced with a collision grid. 3) Export SVG polylines, sort them for pen travel (nearest neighbor), and simplify to 0.5px tolerance. 4) Generate 3 variants with different seeds. 5) At runtime, draw the lines on with stroke-dasharray/dashoffset in pen order, with a 4px 'pen' dot at the head, over about 3-4s. 6) When the drawing finishes, cycle the 3 variants at 8fps for 600ms and then hold. That's the hand-drawn 'line boil' Golan Levin's Plottimation produces from photographed frame sheets (golanlevin.github.io/plottimation/). 7) Plumber's title block links 'PLOT FILE (SVG)' so the drawing is a real machine-ready output.

*Cost: Low runtime (SVG only; keep it small through simplification) plus 0.5-1 day of build tooling. No GPU needed.* · <https://github.com/msurguy/SquiggleCam>

### Hairline flow field that bends around the type (swiss)

1) Render the clipped display name into an offscreen canvas and compute a distance field (a simple Euclidean distance transform in JS is enough). 2) Flow angle = a low-frequency noise angle, blended toward the distance-field tangent within 40px of glyph edges, so streams wrap around the letters. 3) Trace 600-1,200 streamlines with Hobbs' rules: step 0.2% of width, collision distance 4px, start points from circle packing. 4) Draw 0.5px #111 hairlines on warm white in a canvas sitting under the exposed column rules, with 1 line in 40 in the signature red. 5) Scroll-driven: map scroll progress (CSS animation-timeline: scroll() or ScrollTrigger) to how much of each line is drawn, so the field fills in as you read and is complete when the index table arrives. Recompute on resize only.

*Cost: Low: canvas 2D, computed once. Typically under 100ms to trace on desktop. Static after drawing.* · <https://tylerxhobbs.com/essays/2020/flow-fields>

### Living period: text reflow around a docking flock (swiss)

1) The red period of the name is a separate object, not a glyph. 2) On load it splits into 40-80 2D boids: separation radius 12px, alignment 40px, cohesion 60px, max speed 2px/frame, drawn as 3px red squares on a canvas overlay. The cursor is a predator that repels within 80px, as in three.js' GPGPU birds (threejs.org/examples/webgl_gpgpu_birds.html). 3) Each frame, the union of boid bounding circles becomes the exclusion shape. Pretext layout() reflows the intro paragraph around it, and lines render as absolutely positioned spans moved with transform only. 4) After scrolling past the intro, switch each boid's steering to arrival behavior toward one row marker in the index table. The flock docks and becomes the table's bullets, then the canvas stops. 5) With prefers-reduced-motion, skip the flock and render the docked state.

*Cost: Low-medium: about 1 day. CPU only and under 100 agents, so it's cheap. Stops after docking.* · <https://pretextjs.dev/>

### Ledger as 'favoured traces' data art (plates, swiss)

1) ledger.json rows: {date, repo, kind: commit|release|launch, message, sha}. 2) Layout: one column per month. Each entry is a hairline whose length is log(message length) or diff size, colored by repo (6 hues max, the rest gray). 3) Launches (PromptCache 2026-08-22, slop-engine, awesome-image-prompts) and tastekit releases get thicker marks with hanging captions in the plate-placard style. 4) A replay scrubber runs from the first commit to today, with entries appearing in chronological order at a 30ms stagger and the counter ticking. 5) Hovering shows date, repo, message and short SHA, linked to the commit on GitHub. 6) The existing daily automation commits trigger a Pages rebuild, so the artwork grows on its own every day. Optionally add a circle-pack 'fingerprint' per repo (files sized by bytes, colored by type), following Amelia Wattenberger's GitHub Next repo visualization (flowingdata.com/2021/08/10/visualizing-github-repos/).

*Cost: Low: SVG or canvas 2D with a few thousand marks. Data comes from the existing automation.* · <https://benfry.com/traces/>

### Marbled endpapers via domain warping, seeded daily (plates)

1) Fragment shader: q = vec2(fbm(p), fbm(p + 5.2)); r = vec2(fbm(p + 4q + 1.7), fbm(p + 4q + 9.2)); v = fbm(p + 4r). 2) Color: mix three inks (bone, ink-blue, oxblood) by v, length(q) and r.x, then posterize to 4-6 levels with a slight 1px edge darkening to imitate marbling combs. 3) Seed = a hash of that day's commit SHAs (mulberry32), offsetting p, so each day has a unique endpaper. 4) The time uniform advances at 0.02 plus a scroll-velocity term, so the marbling drags only while you scroll past the covers. 5) Render only on the front and back endpaper spreads, never behind text. Alternatively, use Paper Shaders' warp at speed 0 for a static build.

*Cost: Low: one shader, idle when not scrolling. Can also render to PNG at build time for OG images.* · <https://iquilezles.org/articles/warp>

### ASCII commit-fire under the nameplate (phosphor)

1) Character grid of 120 columns by 28 rows in a monospace face, rendered to canvas using a glyph atlas (pre-rendered with fillText once). 2) Classic Doom-fire cellular automaton: the bottom row's heat is set by the ledger, one column per day over the last 120 days, heat = min(36, commits * k). Each frame, every cell copies the cell below minus (rand & 1), with a lateral offset of rand(-1..1). 3) Map heat to the ramp ' .:-=+*#%@' and to a green-to-amber color ramp, so a big shipping day burns amber. 4) Hovering a column adds heat there and shows that day's entries in the tape log. 5) Run at 20fps to match the instrument feel. Pause when offscreen.

*Cost: Low: canvas 2D, about 3,400 cells per frame.* · <https://play.ertdfgcvb.xyz/>

### Tissue guard over the portrait plate (plates) / taped drafting sheet (plumber)

1) 20x26 particle grid with the top row pinned (plumber: three corners pinned). Structural plus shear constraints, Verlet with 0.99 damping, gravity 0.4px/frame^2, 4 relaxation iterations. 2) Render as textured triangles (WebGL2 mesh or canvas 2D affine triangles) using a translucent tissue texture: alpha 0.55, fiber noise, and the plate caption faintly printed in reverse. 3) Pointer grabs the nearest particle within 30px, and release keeps its velocity. 4) On first scroll into view, apply an upward wind impulse and then unpin, so the tissue lifts and slides out of frame to reveal the portrait plate. Keep tearing off; stretching is enough and reads as more serious. 5) With prefers-reduced-motion, cross-fade the tissue out instead.

*Cost: Low-medium: about half a day. 520 particles is trivial on the CPU.* · <https://www.cloudofoz.com/verlet-test/>

### Opt-in synthesized sound palette per direction (all)

1) Sound is off by default, with a visible header toggle. Persist the choice in localStorage wrapped in try/catch. 2) Create one AudioContext on that gesture, routed through a master GainNode at 0.15 and a DynamicsCompressor. 3) Voices: plumber stamp = 80ms noise burst through a 900Hz lowpass plus a 110Hz sine, both decaying exponentially to 0.001 over 120ms. Swiss tick = 4-15ms bandpass noise at 4-5kHz. Phosphor relay = two clicks 18ms apart, plus an optional 50Hz hum bed at about -40dB while the beam draws. Plates page turn = 200-300ms pink noise through a bandpass sweeping 800 to 2,400Hz. Confirm = C5-E5-G5 arpeggio over 300-500ms at 0.25 peak. 4) Exponential ramps must target 0.001, never 0. 5) Allow at most one sound per 60ms. Never play on scroll or hover; only on discrete actions (stamp lands, plate opens, toggle flips). spanda (tactile profile) covers most cues in 4.2kB, and Heydon Pickering's Hyperblam (hyperblam.how) can declare a generative drone bed in HTML.

*Cost: Very low: under 5KB, no audio files.* · <https://mintlify.wiki/raphaelsalaja/userinterface-wiki/technical/web-audio-api>

### Preloader that becomes the hero (Flip handoff with real load progress)

1) Markup: #loader holds .loader-media (the portrait at about 120px, already in its treatment: halftone, dither or gravure) plus a .count in tabular-nums. The hero has an empty .hero-media slot. 2) Progress: Promise.all([document.fonts.ready, portraitImg.decode(), firstShaderCompiled]). Tween a proxy {v:0} to 100 over max(1.2s, actual load time), rendering Math.round(v) into .count. 3) Handoff: const s = Flip.getState('.loader-media'); heroSlot.appendChild(media); Flip.from(s,{duration:1.1, ease:'expo.inOut', absolute:true, scale:true}). In parallel, animate the loader background clip-path from inset(0 0 0 0) to inset(0 0 100% 0) over 0.9s. 4) Title: SplitText(h1,{type:'lines,chars', mask:'lines', autoSplit:true, onSplit:self=>gsap.from(self.chars,{yPercent:110, stagger:0.018, ease:'expo.out', duration:0.9})}). 5) Skin per direction: plumber counts 'SHEET 01 REV 69' in the title block while border rules draw in; phosphor prints a boot log of real repo names; plates counts a roman plate numeral; swiss drops the column rules before the name. 6) Set a sessionStorage flag so return visits jump to tl.progress(1). Under prefers-reduced-motion, use a 200ms crossfade instead.

*Cost: 0.5 to 1 day. GSAP core + Flip + SplitText (all free since 2025), no WebGL needed.* · <https://tympanus.net/codrops/?p=63293>

### Scroll-scrubbed exploded assembly (SVG first, frame sequence second)

SVG version: draw the 'agent pipeline' as an isometric assembly where each part is a <g> carrying data-d (explode distance) and data-axis (one of three iso axes: (0.866,0.5), (-0.866,0.5), (0,-1)). Build gsap.timeline({scrollTrigger:{trigger:'#assembly', pin:true, scrub:1, end:'+=250%', snap:{snapTo:'labels', duration:0.4, ease:'power2.inOut'}}}) with labels 'closed', 'exploded', 'annotated' and 'reassembled'. Parts translate along their axes with stagger 0.06. Leader lines go from drawSVG '0%' to '100%'. Part-number balloons (the repo index, e.g. 03 tastekit) scale from 0 with ease back.out(2). onUpdate highlights the matching row in the schedule-of-work table. Frame version (Apple): animate the explode in Blender, export 90 to 120 WebP frames at 1440w, preload them with createImageBitmap, and draw frames[Math.round(p*(n-1))] to the canvas on scroll. Rive alternative: expose a scroll_y number through data binding and blend scroll_0 and scroll_1000 timelines (the OFF+BRAND Frontify approach).

*Cost: SVG: 1.5 to 2 days, about 0 KB of assets. Frames: 2 to 3 days including modeling, roughly 2 to 4 MB of WebP.* · <https://gsap.com/community/forums/topic/25188-airpods-image-sequence-animation-using-scrolltrigger/>

### Flow-route camera through the shipped ledger

Lay out the ledger as one long SVG pipe path with junction nodes, one per real ship event (2026-08-22 PromptCache launch, the slop-engine and awesome-image-prompts launches, tastekit releases). Wrap it as <g class='pov'><g class='pan'>. gsap.timeline({scrollTrigger:{trigger:'#ledger', pin:'.map', scrub:1, end:'+=400%'}}) .from('.pipe',{drawSVG:'0 0'},0) .to('.flow',{motionPath:{path:'.pipe'}},0) .fromTo('.pov',{scale:2.5},{scale:4},0). Each frame, quickTo pans .pan to center the flow dot. Precompute every junction's fraction of the path (sample getPointAtLength in about 400 steps and keep the nearest). When progress crosses a fraction, fire the junction: a red stamp scales from 1.4 to 1 at a random rotation of ±6deg with a 2-frame x-jitter, and the date decodes with ScrambleText.

*Cost: 1 to 1.5 days. DrawSVG + MotionPath + ScrollTrigger.* · <https://tympanus.net/codrops/2026/05/21/creating-scroll-driven-svg-map-animations-with-gsap/>

### Dual-layer fluid reveal on the portrait

Two textures of the same 449x561 crop. On top is the treatment (halftone, Bayer dither, ink-blue gravure, or phosphor-green threshold). Underneath is the alternate reading: a blueprint line trace for plumber (Canny/Sobel edges run offline, inked in cyan on blue), the raw color photo for plates, or a contour wireframe for phosphor. Mask: a 2D canvas at 25% resolution. Each frame, draw a soft radial blob at the pointer whose radius follows pointer speed, then fade the canvas with fillRect('rgba(0,0,0,0.035)'). Upload it as a texture into a ping-pong FBO pass that samples five offsets, keeps the min, and adds fbm(uv*3 + t*0.1)*0.02 displacement. The final shader is mix(top, under, smoothstep(0.2, 0.6, mask)), with a 1px bright rim where the mask is near 0.4. Phosphor adds scanlines (sin(uv.y*800)*0.04) and grain. Use ogl (about 8KB) instead of three.js. On touch, a slow auto-wandering point drives the mask.

*Cost: 1 to 2 days. ogl plus two image textures, under 150KB total.* · <https://tympanus.net/codrops/2026/03/23/building-a-dual-scene-fluid-x-ray-reveal-effect-in-three-js/>

### Ink/paint reveal shader (pencil to ink, blind emboss to printed plate)

Fragment: vec4 a = texture(uBlind, uv); vec4 b = texture(uInked, uv); float m = (1.0 - uv.y) + noise(uv*15.0)*0.15; float t = uProgress*1.5; float e = smoothstep(t, t-0.03, m); color = mix(a, b, e). Darken the edge band where abs(m-t) < 0.015 to fake ink pooling. Plates: uBlind is the plate-mark emboss (precompute a grayscale emboss of the portrait, a bone background with 1px highlights and shadows), and uInked is the gravure. ScrollTrigger scrub drives uProgress from 0 to 1 as the plate enters, so the plate prints as you arrive. Plumber: uBlind is a graphite-pencil version of each assembly drawing and uInked is the inked final. Hover drives a quick 0.6s fill on the callouts.

*Cost: About 1 day. One ogl Mesh per plate, two textures each.* · <https://tympanus.net/codrops/2026/06/11/sketching-the-impossible-a-3d-portfolio-built-without-a-single-3d-model/>

### Scene chain with texture hand-off (shred, peel, or CRT power-down between sections)

Following Shader.se: keep one fullscreen canvas and render sections in reverse order. Scene N+1 renders into an FBO, and scene N receives it as uNext and samples it in screen space (gl_FragCoord.xy/uRes) wherever its transition mask is open. Masks per direction: plates is a page peel (a curl-line SDF moving diagonally, with a shadow gradient under the lifted part); plumber is a sheet tear (a jagged noise edge advancing, plus a 2px paper-fiber highlight); phosphor is a CRT collapse (scaleY to 0.002, then scaleX to 0, then the next scene power-on). Skip the render pass for any scene outside [scrollY - vh, scrollY + 2vh], and pre-render the next scene one viewport early. To keep real HTML text, snapshot the outgoing DOM section with snapDOM into a texture only during the transition (the stamps-site trick), then hand back to live DOM.

*Cost: 3 to 5 days. This is the most ambitious recipe; build one transition first.* · <https://tympanus.net/codrops/2026/05/19/80s-business-tech-seamless-scene-transitions-inside-shader-ses-scroll-driven-webgpu-pipeline/>

### Cross-document View Transitions for the static multi-page site

Add @view-transition { navigation: auto; } to both pages. On the index, each research artifact or repo card gets style='view-transition-name: art-<slug>' on its plate image and title, and the detail page uses the same names on its hero. Then ::view-transition-group(*){animation-duration:.6s; animation-timing-function:cubic-bezier(.2,.8,.2,1)}. For direction, a parser-blocking <script> in <head> listens for pagereveal, compares navigation.activation.from and navigation.activation.entry, and runs e.viewTransition.types.add('backwards'); style with html:active-view-transition-type(backwards). Add <link rel='expect' blocking='render' href='#hero'> sparingly. It is same-origin only with a 4s timeout, and works in Chrome/Edge 126+ and Safari 18.2+. Firefox simply navigates normally. Disable it under prefers-reduced-motion.

*Cost: Half a day, zero JS libraries. It works on GitHub Pages as-is.* · <https://developer.chrome.com/docs/web-platform/view-transitions/cross-document>

### Scroll velocity as a material property

Run Lenis with gsap.ticker: lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0). In the scroll handler, vT = clamp(e.velocity/30, -1, 1). Each tick, v = lerp(v, vT, 0.08); this damping sets how long the 'breath' lasts after you stop. Snap |v| < 0.001 to 0. Mappings: swiss sets font-variation-settings 'wght' to 400 + abs(v)*450 on the giant name and skewY(v*-3deg) on the index rows. Phosphor raises the CRT uJitter uniform and needle wobble amplitude (a spring with stiffness 120, damping 14). Plates gives the plates a slight rotateX(v*4deg) flutter, like turning heavy paper. Plumber sets the flow-particle speed in the pipes to 1 + abs(v)*6.

*Cost: Half a day. Lenis is under 5KB.* · <https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/>

### CSS-only pinned horizontal section (index or plates strip)

#pin{height:500vh; view-timeline-name:--pin; view-timeline-axis:block} .sticky{position:sticky; top:0; height:100vh; overflow-x:hidden} .track{width:250vmax; animation:move linear forwards; animation-timeline:--pin; animation-range:contain 0% contain 100%} @keyframes move{to{transform:translateX(calc(-100% + 100vw))}}. Wrap it in @supports (animation-timeline: view()) and fall back to a GSAP ScrollTrigger pin. Swiss: the repo index runs sideways across the exposed column rules, with each column header's counter driven by its own view() timeline. Plates: a strip of four research-artifact plates slides past like turning gallery walls.

*Cost: 2 to 3 hours, zero JS on supporting browsers.* · <https://scroll-driven-animations.style/demos/horizontal-section/css/>

### SVG mask blinds and grid section transitions

Use one <svg viewBox='0 0 100 100' preserveAspectRatio='none'> containing <mask> with a black base rect and a <g> of generated white rects, applied to the incoming section's image or color field. For swiss, generate 12 columns on desktop and 6 on mobile, aligned exactly to the page's exposed column rules, so the grid itself opens to reveal the next section. Animate the rect widths from the column centers with stagger {each:0.03, from:'random'} and scrub:true. Add shape-rendering='crispEdges' and +0.02 overlaps so no subpixel seams show. For plates, use horizontal blinds opening from center (alternate rects moving to y-h or y) to suggest a plate lifting off the press.

*Cost: Half a day.* · <https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/>

### Decode-in text and true meters (phosphor signal layer)

Every label on the instrument panel enters through gsap.to(el,{duration:0.8, scrambleText:{text:el.dataset.v, chars:'0123456789ABCDEF', revealDelay:0.25, speed:0.4, tweenLength:false}}) on ScrollTrigger onEnter. Meters show real values only (79 public repos, 15 stars on awesome-agent-skills, issue 69): gsap.to(proxy,{v:79, duration:1.6, ease:'power3.out', onUpdate:render}). Needles overshoot through a spring so they swing past and settle. The tape log streams real commit lines from a JSON file generated at build time (the automation already commits daily), revealing one char per 12ms, with an amber cursor blinking at 1.06s. Igloo's WebGL route offsets SDF glyph UVs instead; reach for it only if text moves into the canvas.

*Cost: 2 to 4 hours.* · <https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/>

### Grabbable physical tag (lanyard or inspection tag)

2D version without three.js: matter.js Composites.chain of 8 small bodies (6x18) with Constraint stiffness 0.9 and length 2, the top body static at a nav anchor, the last joined to a 220x130 tag body. Each tick, write body.position and angle into an SVG <g> transform; the strap is a Catmull-Rom path through the chain points, rendered as a 10px stroke. A MouseConstraint lets you grab and fling it. The tag reads 'AI Agent Plumber' over the name with a red stamp (plumber direction) and swings on load as the intro's last beat. 3D version (Vercel): a rapier fixed body plus 3 useRopeJoint bodies plus a useSphericalJoint card; CatmullRomCurve3 with 32 points into MeshLine; while dragged the card is kinematicPosition, otherwise dynamic.

*Cost: About 1 day for 2D (matter.js is about 80KB min). 2 to 3 days for 3D.* · <https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber>

### Dither-develop portrait with cursor lens

Stack: ogl or raw WebGL2, one full-screen triangle, profile.webp as a texture. Fragment shader: cell = floor(gl_FragCoord.xy/uPx)*uPx; sample at the cell centre. Linearise with c = pow(c, vec3(2.2)) before thresholding, as Surma recommends, or the midtones blow out. Take l = dot(c, vec3(.2126,.7152,.0722)), apply levels with smoothstep(uLo,uHi,l), then threshold against Bayer8 (the Codrops recursive macros) or a 64x64 blue-noise texture. Output mix(uInk,uPaper,step(t,l)). Scroll: ScrollTrigger scrubs uPx from 24 to 3 device px as the portrait enters, so the image 'develops'. Cursor: inside a spring-damped lens (radius about 0.15 of the image), uPx drops to 1 and contrast rises, so the true 449px photo only appears under the pointer. Add the Codrops click-ripple arrays to perturb the threshold. Per direction: plumber uses Bayer4 at 4px in ink #241D12 on manila (photostat); phosphor uses Bayer8 at 3px in green with bloom; plates uses blue noise in ink-blue. Fallback: a build-time Atkinson-dithered PNG in the <img> for no-WebGL and prefers-reduced-motion.

*Cost: About 1 day. ~3 KB GLSL plus ogl (~8 KB gz). Under 0.5 ms/frame.* · <https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/>

### Engraved line-screen portrait that engraves in on scroll (plates)

Rotate UVs by θ≈0.35 rad. Set s = rot.y*uFreq. Take lum from a 2px-blurred linear luminance to avoid moiré. Line half-width w = 0.5*pow(1.0-lum, 0.8). Set d = abs(fract(s + 0.15*sin(rot.x*6.0 + lum*4.0)) - 0.5); the sine term bends lines along the face's contours like a burin. ink = 1.0 - smoothstep(w - fwidth(s), w + fwidth(s), d). Add a second hatch at θ+60° only where lum < 0.3. Multiply over a paper substrate (Paper Shaders 'Paper texture'). Scroll scrubs uFreq from about 10 to 110 lines, so the portrait goes from bold bars to fine gravure. On hover, widen the line pitch locally under the cursor to make a 'loupe'. Colour it deep ink-blue on bone, matching the Stripe Press cover treatment.

*Cost: Half a day to 1 day. Single shader.* · <https://press.stripe.com>

### Phosphor vector beam with persistence (phosphor)

Convert 'PHILIP BANKIER' (a Hershey single-stroke font looks most like a vector display, or flatten opentype.js glyph.getPath().commands) and the daily-commit sparkline into polylines. Animate a beam head along the points over time. Render each segment as a quad with woscope's erf gaussian intensity and additive blending (gl.blendFunc(gl.SRC_ALPHA, gl.ONE)). For persistence, ping-pong two FBOs: each frame draw prev*uDecay (about 0.92 for P31 green, 0.96 for amber accents) and add the new segments. Bloom with a 2-level downsample-blur, then a final CRT pass (scanline count matched to output rows, curvature about 0.1, vignette, flicker about 0.01, small RGB shift). Cursor: the pointer adds a spring-damped deflection to the beam, so the letters wobble like a scope probe. When idle, the beam draws a slow Lissajous (x=sin 3t, y=sin 2t) between redraws of the name.

*Cost: 1.5 to 2 days, raw WebGL2, ~6 KB.* · <http://m1el.github.io/woscope-how/>

### Boot-sequence tape log with glyph scramble (phosphor, swiss)

Split each ledger row into chars with GSAP SplitText (free since 2025). When a row enters view, sweep a block cursor across its width (scaleX 0 to 1 over 120 ms). Then resolve chars left to right with a 12 ms stagger; each char cycles 4 to 8 random glyphs from '▓▒░#%&@*+=-:.' before landing. Timestamps resolve first, then the message. On hover, rerun at 2x speed (the Codrops LineTextHover pattern). Rows print one at a time on first load, so the tape visibly boots. Optional Web Audio: a 1 ms square-wave click per resolved char at gain 0.02, behind an off-by-default toggle. Feed it the real daily-rebuild ledger JSON, never placeholder rows. Under prefers-reduced-motion, show the final text instantly.

*Cost: Half a day. GSAP core + SplitText.* · <https://tympanus.net/Development/LineTextHoverAnimations/>

### Exploded ActRun assembly on scroll (plumber)

Model ActRun as an isometric assembly of five parts (Trigger, Planner, Tool rack, Runner, Output). Use three.js with MeshBasicMaterial plus EdgesGeometry for ink line-art, or isometric SVG groups for an SVG-only build. Give each part an explode vector. Pin the section for 250vh with ScrollTrigger; progress p sets part.position = base + explodeVec * easeInOutCubic(p). Leader lines are SVG paths with pathLength=1 that draw (stroke-dashoffset 1 to 0) at a staggered p to callouts with real part numbers: the actual repos (tastekit, codex-handoff-skill, agent-cli-skills) wired into the job. Pointer-drag orbits ±25°, Ciechanowski-style, and a visible slider mirrors scroll for people who want direct control. Under reduced motion, render a static exploded plate.

*Cost: 1.5 days SVG-only, 2 to 3 days with three.js.* · <https://ciechanow.ski/mechanical-watch/>

### Ledger as pressure pulses through a live pipe network (plumber)

Lay an SVG pipe network down the page spine: an outer stroke of 14px ink, an inner stroke of 8px paper for the bore, with elbows and tees at each section. Each ledger entry is a pulse: a 40px gradient slug animated along the path with GSAP MotionPathPlugin (free), or a moving stroke-dasharray window. On load, today's entries flow from a source valve at the top into their rows in the schedule table. Valve SVGs rotate 90° as a pulse passes. A pressure gauge needle springs (stiffness about 180, damping about 12) to the count of commits in the last 7 days, so the gauge is real data. Lenis scroll velocity scales the flow speed. Lusion's glossy pipe-cross fittings show the premium version of this vocabulary.

*Cost: About 1.5 days. SVG + GSAP.* · <https://lusion.co>

### Riso two-plate misregistration with press-slap (plates)

Split the portrait or hero art into two ink plates: plate A (fluorescent pink) from a highlight mask, plate B (blue) from a shadow mask. Take ink values from mattdesl/riso-colors. Dither each plate with blue noise at high density. Offset each plate by vec2(fbm(t*0.1))*1.5px plus Lenis scroll velocity * 0.02px, so fast scrolling jolts registration like a drum slap and then settles. Modulate ink density with low-frequency fbm between 0.85 and 1.0 and multiply over a paper texture. The Codrops riso piece shows the channel-separation model: render light colours as pure channels, then extract each channel as a plate.

*Cost: About 1 day.* · <https://tympanus.net/codrops/2024/06/27/digital-meets-physical-risograph-printing-with-webgl/>

### One portrait, many waypoints via GSAP Flip (plates, swiss, all)

Create the portrait element (or its shader canvas wrapper) once. At each waypoint (hero full-bleed, frontispiece mat, colophon thumbnail): state = Flip.getState(el), reparent el into the next slot container, then Flip.from(state, {absolute: true, scale: true}) inside a ScrollTrigger timeline with scrub: true. If the portrait is a WebGL canvas, read getBoundingClientRect() each frame and update the camera and viewport. Change the treatment uniform per waypoint (dither to engraving to riso) so the same photo is reprinted as it travels.

*Cost: Half a day.* · <https://tympanus.net/Development/OneElementScroll/>

### Zero-JS kinetic Swiss: named view-timelines, variable axes, cross-document View Transitions (swiss)

Hero: set view-timeline-name: --hero. On h1, set animation: collapse linear both; animation-timeline: --hero; animation-range: exit 0% exit 100%. The keyframes go from font-size 16vw, 'wght' 200, 'wdth' 125 to 2rem, 'wght' 800, 'wdth' 75, translating into the masthead slot, so the name becomes the logo the way Cyd Stumpel's does. This needs a variable grotesk with a wdth axis (Archivo, already loaded at wdth 62..125, works; Inter Tight has no wdth). Index: give each row view-transition-name: row-<slug>, put the same name on the paper page's title, and add @view-transition { navigation: auto; } to both documents. The row then morphs into the page header across a real GitHub Pages navigation. Add a ruler minimap (Rauno-style ticks) on a scroll() timeline. Wrap everything in @supports (animation-timeline: view()) and prefers-reduced-motion; other browsers get a static page.

*Cost: About 1 day. 0 KB JS.* · <https://cydstumpel.nl>

### Cursor-painted reveal of a second portrait layer (all)

Stack two layers: A is the treated portrait, B is the alternate identity. For plumber, B is a line-drawn 'service drawing' of him with callouts; for phosphor, raw grayscale with heavy scanlines; for plates, the untreated colour original. Keep a mask in a 256x320 FBO. Each frame, set mask *= 0.94, then splat a soft brush at the pointer (radius 0.12, smoothstep falloff, size scaled by pointer velocity). Composite mix(A, B, smoothstep(0.4, 0.6, mask + fbm(uv*8.0)*0.2)) for an organic edge. On touch devices the brush follows touchmove; when idle, an autopilot traces a slow path so phones still see the reveal. This is the Lando Norris face-to-helmet move, applied to Philip and AI Agent Plumber.

*Cost: About 1 day.* · <https://landonorris.com>

### Click-stepped camera dive for research artifacts (all)

Use a three.js plane with an animated dither or engraving shader, tilted isometrically (rotation.x ≈ -0.6, rotation.z ≈ 0.35). Define steps = [{camPos, zoom, caption}]. A right-half click or the ArrowRight key advances with a gsap.to(camera, {...steps[i], duration: 1.1, ease: 'expo.inOut'}); left-half or ArrowLeft goes back. Frame the last step so one shader cell is about 40 screen px. Captions are inverse-video spans. Use one per paper cover (zoom into the Taste Transfer map), or for a 'how ActRun runs a job' walkthrough. Include a progress tick bar like visualrambling's.

*Cost: About 1.5 days.* · <https://visualrambling.space/dithering-part-1/>

### ASCII glyph-density portrait (phosphor)

drawImage the portrait into an offscreen 96x120 canvas and read luminance per cell. Map it to a ramp ' .:-=+*#%@' (or ░▒▓█ for blockier output) and render with fillText in IBM Plex Mono at about 8px, or as a <pre> for selectable text. Animate: cells within 80px of the cursor flip to random glyphs and resolve back over 300 ms. Scroll scrubs cell size from 16 to 6px, so the face sharpens as you read down. The per-cell main(coord, context, cursor, buffer) model from ASCII Play keeps this to about 40 lines. Pair it with the CRT pass for the hardware feel.

*Cost: Half a day. Canvas 2D, no WebGL needed.* · <https://play.ertdfgcvb.xyz>
