# Verified reference library

103 references, each fact-checked by a separate agent (WebFetch, corroborated by search where sites are heavy WebGL). 3 were dropped for mismatches. Collected 2026-10-07/08.

## Award-winning sites (11)

### [Igloo Inc (abeto + Bureaux), Awwwards Site of the Year 2024 + Developer Award](https://www.igloo.inc/)

*For: phosphor, plumber, all · verified*

- **Moment:** A real-time intro (no video) flows straight into the site. Each portfolio company sits frozen inside its own ice block, and the crystals inside were procedurally 'grown'. Section changes frost over with chromatic aberration and a 'tech displacement' smear. In the links section, particles swirl into shapes, change colour with velocity and glow mid-transition, and the sound is synced to their motion. Even the UI labels glitch and scramble, with zero layout jank.
- **Built with:** Three.js + custom GLSL, Svelte, GSAP, Vite, three-mesh-bvh. Ice modelled in Houdini with a custom crystal-growth algorithm; volume data shipped through a custom VDB-to-browser converter with compression (smaller than image formats). The glitch is a cheap WebGL shader. The text scramble shifts SDF atlas offsets instead of rewriting DOM text. Shaders compile in the background during and after initial load. Source: https://awwwards.com/igloo-inc-case-study.html. Dev jury gave animations/transitions 9.6/10.
- **Why it works:** One material language (frost + chromatic aberration) is applied to everything, typography included, so the brand reads as a physical substance and not a colour theme. The current mockups style a theme with CSS; Igloo makes the theme a process.

### [Lando Norris by OFF+BRAND, Awwwards Site of the Year 2025 + Users' Choice](https://landonorris.com/)

*For: all · verified*

- **Moment:** The hero photo is a live surface. As the cursor moves, blob-like fluid overlays shaped like his helmet graphics animate across the image and reveal or cover it in neon lime (#D2FF00 on #111112), so the portrait feels painted by your hand. Smooth-scrolled modular sections split 'On Track' results from 'Off Track' culture.
- **Built with:** Webflow + GSAP + WebGL + CSS animations (Awwwards listing, SOTD 17 Nov 2025, creativity 8.71). Lenis smooth scroll (listed in the lenis.dev showcase). The reveal pattern is a decaying mouse-trail texture thresholded with noise, used as a mask between two image treatments (see technique 'Fluid blob reveal mask').
- **Why it works:** This is a one-person portrait site, the same job as Philip's. The person's photo becomes the interactive centrepiece and stops being an avatar. It's the clearest award-level proof that a single ordinary photo can carry a SOTY homepage.

### [Lusion v3, Awwwards Site of the Year 2023 + Developer Award](https://lusion.co/)

*For: swiss, phosphor, all · verified*

- **Moment:** A strict two-tone world (electric blue #1a2ffb on lavender #f0f1fa). The 3D hero reacts to the cursor, scroll drives continuous animation with no section-by-section fades, and opening a project is a seamless transition, not a hard page load.
- **Built with:** Real-time WebGL from a studio that specialises in real-time applications. SOTD 2 Oct 2023; dev jury gave animations/transitions 10/10 and performance 9/10. Lusion doesn't publish the stack. The pattern to copy is one persistent canvas behind the DOM, where route changes animate the canvas without replacing the page.
- **Why it works:** It's the benchmark for continuity. Nothing ever 'loads'; it morphs. The four mockups are currently separate static sections with no state carried between them.

### [Oryzo AI by Lusion, Awwwards Site of the Month April 2026 + Developer Award](https://oryzo.ai)

*For: plumber, plates · verified*

- **Moment:** A cork coaster launched with the deadpan seriousness of a flagship chip: '37.9% More Circular', an estimated friction coefficient of 0.80, a Thermal Diffusion Model visualisation, and 'Smart flip encryption' where you encode and decode a message. A 3D to 2D to 3D transition flattens the object into a drawing and re-inflates it. It also has WebGL sketch interactions, a particle footer, and a mock research paper with abstract, peer-review quote and BibTeX citation.
- **Built with:** Three.js + WebGL + GSAP (SOTD 13 Apr 2026). Named Awwwards elements: 'WebGL Sketches Interaction', '3D → 2D → 3D Transition', 'Footer Interactive Particles', 'Reveal/Intro/Gallery Transition'. Practical rebuild of the dimension flip: the same mesh cross-fades from a lit material to an orthographic line/hatch render while the camera FOV lerps toward orthographic.
- **Why it works:** It proves an engineering spec sheet can be the spectacle when every number is animated and interactive. Philip should use the register with his real numbers only (79 public repos, daily commit ledger, release dates, 15 stars) to stay inside the no-unverifiable-claims rule. The BibTeX/paper framing fits his four research artifacts directly.

### [Poor Charlie's Almanack announcement (Stripe Press), Awwwards SOTD 5 Jun 2023 + Developer Award](https://www.stripe.press/poor-charlies-almanack)

*For: plates, plumber · verified*

- **Moment:** A book launch where the portrait is the event. A depth-map-driven wireframe reveal follows the mouse across the figure. A 'Drag Warren' interaction lets you physically pull a figure around, the hero flips into inverted colours, and a marquee runs through it, all in black and #DFDDDF.
- **Built with:** Next.js; Awwwards element tags for the reveal are wireframe + depth map + marquee + mouse interaction (https://www.awwwards.com/inspiration/wireframe-reveal-poor-charlies-announcement). Designed by Devin Jacoviello and Nick Jones. Rebuild: a depth map of the photo displaces a dense plane, and a wireframe/isoline shader is revealed inside a cursor radius.
- **Why it works:** It's the closest precedent for making one ordinary photo look deliberate. A depth map turns a flat portrait into an object you can probe, and the two-colour palette hides source quality. It's also from a publisher, which matches the art-book register.

### [Bruno Simon portfolio (2025 WebGPU rebuild), Awwwards Portfolio Honors Dec 2025, Site of the Month Jan 2026](https://www.awwwards.com/brunos-portfolio-case-study.html)

*For: plumber, all · verified*

- **Moment:** You drive a small car through a stylised world with a day/night cycle, seasons, rain, snow and lightning. Other visitors leave flame 'whispers', a shared cookie counter ticks, and a circuit leaderboard ranks drivers. Cryptic achievements unlock vehicle skins, and the whole world has spatialised sound (birds, crickets, wind, engine, collisions).
- **Built with:** Three.js with WebGPU and TSL (shaders written in JS), with automatic fallback. Blender is the level editor: object naming conventions and Empties export as metadata that becomes JS objects (e.g. 'refLandingPhysicalFixed'). 78,400 single-triangle grass blades loop to fill the viewport, and trees are camera-facing planes with SDF leaf textures. Instancing, frustum culling, a palette-UV colour technique, KTX2 ETC1S/UASTC textures and Draco. A mobile tier drops blur/DOF and shadow resolution. UI click sounds vary playback rate. Took a little over a year, documented in YouTube devlogs.
- **Why it works:** Personality comes through systems. The portfolio is a place with rules, weather and other people in it. For Plumber, the Blender-as-level-editor trick makes a pipe/assembly diorama authorable without hand-coding coordinates.

### [Messenger by abeto, Awwwards Developer Site of the Year 2025](https://messenger.abeto.co)

*For: phosphor, plumber · verified*

- **Moment:** You're a mail carrier on a tiny planet. You see other live visitors walking the same planet in real time and react to them with 3D emojis, alongside NPCs and character customisation. It's a cosy browser game that downloads nothing.
- **Built with:** Three.js/WebGL with WebSockets for live multiplayer; models built in Houdini and Blender (Vicente Lucendo, Michael Sungaila). SOTD 10 Nov 2025, animations 9.0/10 (https://www.awwwards.com/sites/messenger).
- **Why it works:** Live presence is what the 2025 juries rewarded. Philip already has a real live signal, his automation commits every day, and a static site can show that pulse without a server (see technique 'Static-host live ledger').

### [woscope (m1el), WebGL XY oscilloscope emulator](http://m1el.github.io/woscope/)

*For: phosphor · verified*

- **Moment:** Oscilloscope music: a stereo audio file in XY mode draws glowing vector figures that look like a real CRT beam. Lines are brighter where the beam moves slowly, thin and faint where it whips, with afterglow trailing behind.
- **Built with:** Each line segment is a quad expanded in the vertex shader along the segment and its normal. Beam intensity is a Gaussian integrated analytically along the segment: alpha = erf(x/(√2σ)) - erf((x-len)/(√2σ)) with a polynomial erf approximation. Brightness accumulates with gl.blendFunc(SRC_ALPHA, ONE), and an afterglow smoothstep fades older traces. Write-up: https://habr.com/en/articles/268801.
- **Why it works:** It's the physically correct way to draw phosphor. The current Phosphor mockup uses green CSS text, which reads as a terminal theme. A beam with velocity-dependent brightness reads as an instrument.

### [cool-retro-term-webgl (Remo Jansen)](https://github.com/remojansen/cool-retro-term-webgl)

*For: phosphor · verified*

- **Moment:** A live terminal on a curved CRT with phosphor bloom, scanlines and rasterisation, RGB chromatic split, flicker, static, burn-in persistence and horizontal-sync jitter. Demo: https://remojansen.github.io/
- **Built with:** WebGL shaders ported from Filippo Scognamiglio's Qt cool-retro-term, wrapped around xterm.js. GPL-3.0, so study the pass order and parameters but don't paste the code into the site unless GPL is acceptable.
- **Why it works:** A complete inventory of the CRT failure modes that sell authenticity (burn-in and sync jitter matter more than scanlines).

### [Immersive Garden studio site, Awwwards Agency of the Year 2025, SOTD 7 Jan 2025](https://immersive-g.com/)

*For: plates · verified*

- **Moment:** Only black and #c2c2c2. A 3D bas-relief detail sits in the homepage background, a 'rapid scroll' runs through a decade of projects, the menu morphs between two states, and a sound toggle (0 / Off / On) sits in the corner.
- **Built with:** WebGL 3D + Contentful; dev jury gave animations/transitions 8.8, creativity 8.4 (https://www.awwwards.com/sites/immersive-garden-website, element: https://www.awwwards.com/inspiration/bas-relief-immersive-garden-website).
- **Why it works:** Bas-relief is a museum material, the exact register Plates wants. Philip's portrait can be carved into the bone paper and lit by the cursor instead of printed on it.

### [Cerebrium by Louis Paquet, KOKI-KIKO, Mathis Biabiany et al., Awwwards SOTD 10 Sep 2026](https://cerebrium.ai/)

*For: phosphor, swiss · verified*

- **Moment:** An AI-infrastructure site (serverless for voice agents and LLMs) that opens on WebGL intro scenes, has an interactive WebGL globe with a force-field effect, and reveals About sections through 3D parallax masks, in deep blue #172B76 and magenta #902177.
- **Built with:** Three.js, GSAP, Cinema 4D, WebGL, Lottie feature animations. Louis Paquet was Awwwards Independent of the Year 2025 (https://www.awwwards.com/annual-awards/winners).
- **Why it works:** It speaks to the same audience as Philip (AI builders and founders) and comes from the year's top independent. It shows AI-infra content carrying award-level motion without sci-fi cliché.

## Portrait and image shaders (15)

### [Maxime Heckel: Post-Processing Shaders as a Creative Medium (Feb 2025)](https://blog.maximeheckel.com/posts/post-processing-as-a-creative-medium/)

*For: all, phosphor, swiss · verified*

- **Moment:** Several moments here could each carry a hero. (1) Progressive depixelation: the image loads as 32px blocks and sharpens one row at a time through 5 power-of-two levels, so it reads like a slow fax or a scanner pass. (2) Pixelating mouse trail: the cursor leaves a wake where pixel cells swell and the image drags in the direction of motion, then heals behind it. (3) Staggered LED cell panel: the image is rebuilt as offset LED cells with bordered sub-pixels. (4) Receipt-bar pattern: luma is drawn as horizontal bars of varying width, a look the article credits to @samdape. (5) Fluted glass: the image refracts through vertical glass ribs with specular highlights.
- **Built with:** R3F plus the postprocessing library with custom Effect classes. Pixelation: uvPixel = cell*floor(uv/cell). Sub-cell sculpting: cellUV = fract(uv/cell), compared against luma using SDFs or 8x8 threshold matrices. Depixelation: basePixelSize = pow(2, LEVELS), currentLevel = floor(progress*LEVELS), and rows that haven't been processed keep the old size. Mouse trail: the trail renders into a separate FBO through createPortal with ping-pong. pixelSize = 32 + length(trail.rg)*distToCenter, and uv -= trail.rg*dist*mouseDir. Fluted glass: the surface is sin(uv.x*PI), its derivative cos(uv.x*PI)*PI drives the distortion, and Blinn-Phong lighting comes from a reconstructed normal.
- **Why it works:** Each effect gives the portrait a state change the visitor can see happen (resolving, wounding, healing), where a static filter never changes. The depixelation pass makes a load-in reveal that suits any of the four directions. The LED panel fits phosphor. The receipt bars and fluted glass fit swiss.

### [Maxime Heckel: The Art of Dithering and Retro Shading for the Web (Aug 2024)](https://blog.maximeheckel.com/posts/the-art-of-dithering-and-retro-shading-web)

*For: phosphor, plumber · verified*

- **Moment:** Interactive figures throughout the post: you drag sliders and a shaded 3D scene drops into 1-bit patterns, moving from coarse 2x2 Bayer crosshatch to fine 8x8 and then to organic blue-noise grain. Palette quantization pushes the scene into 2, 4 or more tones.
- **Built with:** A postprocessing Effect with mainImage(inputBuffer, resolution). Bayer threshold lookup is bayer[int(uv*res) % N]. Blue noise samples a 128px noise texture at gl_FragCoord.xy/128. Quantization is floor(c*(n-1)+0.5)/(n-1), with the threshold added to luma before quantizing. The post notes that error diffusion (Floyd-Steinberg) doesn't map to fragment shaders because each pixel depends on the ones before it.
- **Why it works:** It's the canonical reference for getting ordered dithering right and choosing between Bayer and blue noise. That choice decides whether the portrait reads as a machine readout (Bayer) or as print grain (blue noise).

### [Maxime Heckel: On Crafting Painterly Shaders (Oct 2024)](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders)

*For: plates · verified*

- **Moment:** A crisp render melts into gouache or watercolor brushwork as the kernel grows. Edges stay sharp while flat areas turn into directional brush strokes that follow the forms.
- **Built with:** The post walks up from a basic 4-sector Kuwahara filter to Papari's circular 8-sector version, then to Gaussian and cheaper polynomial sector weighting, and finally to anisotropic Kuwahara. The anisotropic step uses a Sobel structure tensor to squeeze and rotate the kernel along the local edge direction. Color quantization, tone mapping and texture overlays are added on top.
- **Why it works:** It turns a casual park photo into something that reads as a painted plate. Animating the kernel radius on hover or scroll gives a 'photograph becomes painting' moment that suits an art-book direction.

### [Alex Harri: ASCII characters are not pixels (Jan 2026)](https://alexharri.com/blog/ascii-rendering)

*For: phosphor, swiss · verified*

- **Moment:** The ASCII renders hold crisp silhouettes. Edges pick characters by shape, so a jawline becomes / ( L and a shoulder becomes _ - instead of a blurry density ramp. The interactive demos let you rotate 3D cubes, drag contrast sliders and compare split views.
- **Built with:** Each character cell is sampled with 6 circles in a 3x2 layout, giving a 6D shape vector, and every glyph in the font is precomputed the same way. The renderer applies global contrast (an exponent that crunches dark components) and directional contrast (sampling circles outside the cell sharpen the edges). The glyph is chosen by nearest neighbour in 6D, using a k-d tree (about 10x faster than brute force) or a cache of 5-bit quantized vectors packed into one key. The GPU path runs in 6 shader passes.
- **Why it works:** Most ASCII portraits look like mush. A shape-aware one, rendered as real monospace text, reads as a crafted terminal artifact and holds up at a low cell count, which suits a 449x561 source.

### [Animating 160,000 Cubes in Three.js to Visualize Dithering (Damar Aji Pramudita, Codrops, Apr 2026)](https://tympanus.net/codrops/2026/04/01/animating-160000-cubes-in-three-js-to-visualize-dithering/)

*For: swiss, plumber, phosphor · verified*

- **Moment:** A photograph is decoded by a 400x400 field of physical cubes. Each cube rises or sinks on z according to the image's brightness, and a threshold matrix switches cubes on and off, so a 3D halftone relief that seems to breathe comes into being in a wave.
- **Built with:** A single InstancedMesh draws all 160k matrices in one call. Per-cube delay, scale target and z offset are computed in the vertex shader, so JS stays out of the loop. The fragment shader reads the normalized cell index, samples luminance and compares it to a threshold matrix to toggle visibility. A shader uniform drives the animation. The source is a 10-step Codrops tutorial; details here come from the abduzeedo summary and search listing.
- **Why it works:** It gives a flat dither real mass. On a swiss grid the relief can align to the column rules. On plumber it reads as a machined part. Feeding a depth map in as the height signal gives the relief the shape of his actual face.

### [Bruno Imbrizi: Interactive Particles with Three.js (Codrops)](https://github.com/brunoimbrizi/interactive-particles)

*For: phosphor, plates · verified*

- **Moment:** A photo turns into a field of glowing particles. Moving the cursor across it blows particles outward along individual random angles and toward the camera, leaving a soft, fading wake that drifts back into the portrait. Between images the particles scatter and reassemble.
- **Built with:** Each non-dark pixel becomes an instanced quad. Interaction comes from an offscreen 2D canvas 'touch texture' where the pointer paints fading radial blobs. Vertex shader: t = texture2D(uTouch, puv).r, displaced.z += t*20*rndz, displaced.x += cos(angle)*t*20*rndz. rndz combines a random value with simplex noise of (pindex*0.1, uTime*0.1), and psize *= max(grey, 0.2) so brighter pixels draw larger. Built with three.js, glslify and GSAP. Article: tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/
- **Why it works:** It's from 2019, but it remains the cleanest image-to-particles recipe. It was built for small source images, so it suits a 449x561 portrait. With a subject matte, only Philip becomes particles and the park disappears.

### [Particles Transition (Tibi, three.js forum, Jan 2026)](https://discourse.threejs.org/t/particles-transition/89134)

*For: all · verified*

- **Moment:** An image dissolves into particles, explodes outward at the midpoint, then reconstitutes as the next image. The camera can orbit the cloud while the particles stay correctly layered. Demo at fwdapps.net/l/particles-transition/ (click plus a GUI).
- **Built with:** three.js GPGPU (FBO ping-pong) particle simulation. A single progress uniform drives the morph and the midpoint explosion. Particles render as radially masked point sprites, with optional bitonic GPU depth sorting so transparency survives camera rotation.
- **Why it works:** It works as a section transition: the portrait can explode on scroll and reassemble as the next element (the ledger, a repo grid or the nameplate), which ties the visual to the page structure.

### [Tyler Cagle (@tjcages): SHARP particle generator (80.lv, Apr 2026) + Apple SHARP](https://80.lv/articles/magical-particle-generator-made-with-apple-s-sharp-model)

*For: plates, phosphor · verified*

- **Moment:** A single flat photo becomes a soft, fuzzy, ethereal 3D particle scene you can orbit slightly. The subject has real volume, so moving the camera shows parallax between face, shoulders and background.
- **Built with:** Apple's SHARP (apple-aiml-research.github.io/ml-sharp, code at github.com/apple/ml-sharp) turns one image into a metric 3D Gaussian representation in under a second on a GPU, and it renders at over 100fps for nearby views. Cagle renders the Gaussians as tunable particles (count, size), inspired by a Cullen Webber three.js flow field. For a static site, run SHARP once offline on profile.webp and ship the .ply, decimated to around 50-100k points, as points in three.js.
- **Why it works:** It's the strongest way to make a low-res casual photo look intentional: it becomes a volumetric object. Keep camera moves small (SHARP is designed for nearby views), and check the ml-sharp license before shipping. The article notes the output files are large.

### [Yuri Artiukh (akella): Fake 3D Image Effect with WebGL (Codrops)](https://github.com/akella/fake3d)

*For: all · verified*

- **Moment:** A still photo seems to turn its head. As the cursor moves, or the phone tilts, near parts of the face slide against the background with an eased, slightly lagging motion that feels like a 3D photo.
- **Built with:** Plain WebGL, with no three.js. Fragment: fake3d = vUv + (depth.r - 0.5)*mouse/threshold, with per-axis thresholds from data attributes. Mouse easing: mouseX += 0.05*(target - mouseX). Gyroscope beta and gamma are clamped to ±15° and normalized to [-1, 1]. Demo at tympanus.net/Tutorials/Fake3DEffect/.
- **Why it works:** It's about 40 lines and works on every device, and it's the base layer under every other treatment once a depth map exists. It dates from 2018, so it's best combined with the 2026 relighting technique below.

### [Relighting Images with Depth Maps and Three.js (Codrops, Aug 2026)](https://tympanus.net/codrops/2026/08/19/relighting-images-with-depth-maps-and-three-js)

*For: plates, plumber · verified*

- **Moment:** A flat photo takes dynamic light: shading wraps around the face's real relief and soft shadows fall behind features as the light moves, as though the photo were a sculpted plate under a moving lamp.
- **Built with:** A depth-estimation model produces the depth map. The 8-bit depth is converted to floats and blurred to remove 256-step banding. Normals come from neighbouring depth differences, with z = 1, then normalized. Soft shadows are raymarched through the depth map. Albedo, normals and AO are combined in a MeshPhongNodeMaterial using three.js TSL on WebGPU. Details come from the daily.dev summary and search listing, since the article returned 403 to fetches.
- **Why it works:** Binding the light to the cursor gives plates a museum raking-light moment, and plumber a drafting-lamp one. It's lighting rather than a filter, which is what reads as expensive.

### [WebGPU Scanning Effect with Depth Maps (Codrops)](https://tympanus.net/codrops/?p=90674)

*For: phosphor, plumber · verified*

- **Moment:** A scan line sweeps across the image. Near the line, a procedural dot grid lights up and fades, and depth-driven UV displacement gives the image a slight parallax warp as the scan passes. The demo ships three visual variations.
- **Built with:** three.js WebGPU with R3F and TSL. A base image plus a depth map; depth offsets the UVs. A cell-noise dot grid is masked by distance to the scan line combined with noise brightness. A uniform tweens from 0 to 1 with GSAP.
- **Why it works:** It translates directly to a radar or oscilloscope sweep over the operator portrait in phosphor, or a surveyor's scan in plumber, and it can run as a scroll-scrubbed reveal.

### [Paper Shaders: Halftone CMYK (Ksenia Kondrashova and Agu Seguí, Feb 2026) + Halftone Dots + Image Dithering](https://paper.design/blog/retro-print-cmyk-halftone-shader)

*For: plumber, plates, swiss · verified*

- **Moment:** The image looks like it came off a real press: four ink layers of overlapping round dots with slight misregistration, warm off-spec pigments, and a gooey 'ink' dot mode where neighbouring dots bleed into each other.
- **Built with:** A single-pass WebGL2 shader that samples color at dot centers, not per pixel, so dots stay round. Dots may overlap across up to 3 grid cells. Grid jitter noise simulates press imprecision. Dot types are dot, sharp and ink (gooey, smoothstep softness). Pigment controls include gain and flood. The palette is 00B3FF, FC4F9D, FFD900, 231F20 on a FBFAF4 paper. The sibling Halftone Dots shader (shaders.paper.design/halftone-dots) adds square or hex grids and classic, gooey, holes or soft dots with grain. Available as @paper-design/shaders-react or as raw fragment strings.
- **Why it works:** These are well-tuned print physics to borrow parameters from. Animate the gain and flood values and the grid jitter on scroll so the portrait looks like it's being inked and registered on the press.

### [VFX-JS by Amagi (fand)](https://amagi.dev/vfx-js/)

*For: all · verified*

- **Moment:** Ordinary img, video and text elements on a normal HTML page glitch, halftone or slit-scan as they enter the viewport, while the DOM layout stays intact. Effects can spill past the element's box (overflow).
- **Built with:** vfx.add(img, {shader | effect: [...], overflow, uniforms}) on one shared WebGL canvas. @vfx-js/effects ships 33 classes, including AsciiEffect, DitherEffect, HalftoneEffect (RGB or CMYK), PixelSortEffect (ported from an FMS_Cat Shadertoy; params key, range and angle), ParticleExplodeEffect, FluidEffect (pointer-driven), ScanlineEffect, VoronoiEffect (around cursor), SliceShift and JPEGGlitch. Effects chain in arrays. MIT licensed (github.com/fand/vfx-js).
- **Why it works:** It's the fastest route to prototyping all four directions on the real markup in hours. Use it for secondary images and transitions, and hand-write the hero shader so the result doesn't look like presets.

### [basement.studio Shader Lab](https://eng.basement.studio/tools/shader-lab/community/effects/ink)

*For: plumber, phosphor, plates · verified*

- **Moment:** A browser lab where you stack effects on an image and animate them on a timeline. The Ink effect adds smeared glow and fluid bleed for neon ink-like edges. Other effects include Plotter, CRT, Pixel Sorting, Fluted Glass, Voxel, Circuit Bent, Halftone, Dithering and ASCII.
- **Built with:** A layered GPU effect stack with timeline keyframes and remixable community scenes. Code export wasn't confirmed, so use it for art direction: tune a look on profile.webp, then reimplement it.
- **Why it works:** It's a quick place to art-direct the hero stack before writing GLSL. Plotter suits plumber, CRT plus Circuit Bent suits phosphor, and Ink suits plates.

### [Florian Berger (flockaroo): notebook drawings (Shadertoy XtVGD1)](https://www.shadertoy.com/view/XtVGD1)

*For: plumber, plates · verified*

- **Moment:** A live image turns into a convincing pencil study on gridded notebook paper. Strokes follow the forms of the face, with hand-drawn irregularity and a vignette.
- **Built with:** For each pixel, gradients are sampled along 3 angles (AngleNum 3) × 16 distances (SampNum 16), and strokes are deposited where the local gradient aligns with the stroke direction. getColHT applies randomized threshold smoothing for ink variation, a sine-modulated grid makes the paper, and vign = 1 - r^3. A readable port is at godotshaders.com/shader/notebook-drawings/.
- **Why it works:** It's a draftsman's study of the portrait, which is the right visual for the plumber drawing set. It's licensed CC BY-NC-SA 3.0, so study it and reimplement rather than paste it.

## Kinetic typography (16)

### [Efecto: Real-Time ASCII and Dithering Effects with WebGL Shaders (Pablo Stanley, Codrops, Jan 2026)](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/)

*For: phosphor · verified*

- **Moment:** Per the Codrops listing, the article shows classic image algorithms and CRT-era visuals running live in real-time shaders, with ASCII and dithering applied to images as you watch.
- **Built with:** A WebGL shader pipeline covering ASCII glyph mapping, dithering and CRT-style post effects. The article page returned 403 to automated fetches, so the details here come from the Codrops search listing only. Read it in a browser before building.
- **Why it works:** It's a recent, production-minded walkthrough that combines the ASCII, dither and CRT layers in one tool, which is the phosphor stack.

### [Stefan Vitasović Portfolio25, Awwwards SOTD 20 Sep 2025 + Developer Award](https://stefanvitasovic.dev/)

*For: swiss · verified*

- **Moment:** Swiss-print offset grids, deliberately unbalanced, with generous empty space. Geometric shapes and type act as pivot points during page transitions and loading: the letters themselves carry you to the next page. A WebGL video grid, glitchy shader effects over a noisy lo-fi background, and infinite scroll, all in one ink colour (#066bbd).
- **Built with:** Next.js + WebGL; dev jury gave animations/transitions 8.80. Codrops case study, March 2025: https://tympanus.net/codrops/?p=88357.
- **Why it works:** It shows International Style surviving heavy motion. The grid stays rigid while type becomes the transition device. That's the upgrade path for the Swiss mockup, whose giant clipped name currently just sits there.

### [Exat variable font microsite (Studio Size for Hot Type, built with RISE2 Studio), European Design Awards 2026 Gold](https://exat.hottype.co)

*For: swiss, plumber · verified*

- **Moment:** You land on a flat orange field with a giant white 'Exat' cropped by the bottom edge of the viewport. Scrolling cuts to a near-black essay section, then a full-bleed blue 'a' glyph, then a glyph construction diagram where the outline shows every on-curve point labelled with its x,y coordinates, like a technical drawing. Further down, a wall of tiles repeats one 'c' at different widths and rotations, then a poster board (a stacked, clipped '28', an 'M' next to a dot grid, a repeated 'exat exat'), then a yellow type tester with size, line-height and tracking sliders. Per the Abduzeedo write-up: an opening field of lowercase glyphs reacts to the cursor in seven concentric rings of influence, shifting weight and color; hovering style names in the Design Space section morphs the specimen across weight and width in real time. Scroll position equals state, so scrolling back restores earlier forms.
- **Built with:** WordPress, GSAP + ScrollTrigger (scrubbed, so the animation is reversible), Lenis smooth scroll, and font-variation-settings on split glyphs. The cursor field quantizes distance into 7 discrete rings, so the field reads as stepped. A continuous blur would read as fuzz. Process write-up: https://abduzeedo.com/exat-variable-font-microsite
- **Why it works:** Each section shows one axis of the system and then moves on. Swiss: the ring-quantized cursor field over the index table, plus the oversized name cropped by the viewport edge. Plumber: the glyph construction diagram (bezier points plus coordinate labels) is exactly how 'AI Agent Plumber' could draw itself as a part drawing.

### [D&AD Festival identity 2020-21: custom variable ABC Marfa (Studio Dumbar x Dinamo)](https://abcdinamo.com/custom/d-ad-dumbar-marfa-2021)

*For: swiss · verified*

- **Moment:** Lowercase words stretch to absurd widths and wind around the nominated work like a ribbon. Studio Dumbar wanted the word 'everything' as a very extended lowercase that 'could stretch till infinity', and the type itself frames each image.
- **Built with:** A bespoke variable Marfa with an extreme width range and re-engineered steep italics, driven in motion graphics and Instagram-style filters. On the web the equivalent is a wdth axis solved per frame to fill a container exactly.
- **Why it works:** It proves that one axis pushed to its extreme can carry a whole identity. Swiss: the name solves its width to the column span on every resize and scroll, so it compresses as a measured fit. Scaling it would look cheap.

### [Codrops: Scroll-based SVG Filter Animations on Text (Manoela Ilic, 2024), inspired by EDITORA by Garden Eight](https://tympanus.net/codrops/2024/08/22/scroll-based-svg-filter-animations-on-text/)

*For: plumber, plates · verified*

- **Moment:** Big HTML headings scroll in through liquid states. One heading starts as a gooey ink blob and condenses into crisp letters. Another resolves out of horizontal noise streaks, another out of vertical rain-like displacement. The replay button under each heading re-runs the melt and settle. The text stays real, selectable HTML throughout.
- **Built with:** Seven filters were read from the live demo (https://tympanus.net/Development/OnScrollSVGFilterText/). Each chains feGaussianBlur (stdDeviation animated) into feColorMatrix with an alpha threshold row such as '0 0 0 13 -6' (the goo), then feTurbulence (fractalNoise, anisotropic baseFrequency like '0.1 0.5', '1 0.01' or '0.009 1') into feDisplacementMap (scale animated), then feComposite operator='atop' back onto SourceGraphic. GSAP ScrollTrigger tweens stdDeviation and scale from high to 0. Code: https://github.com/codrops/OnScrollSVGFilterText/. Original reference site: https://editora.jp/
- **Why it works:** There's no WebGL, it's static-host friendly, and the text stays live. Plumber: the same chain with a per-stamp turbulence seed and a fast impact curve gives a rubber stamp that bleeds and then settles. Plates: a slow version reads as gravure ink soaking into bone paper.

### [Codrops: WebGPU Gommage Effect, dissolving MSDF text into dust and petals (Thibault Introvigne, Jan 2026)](https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/)

*For: plates, phosphor · verified*

- **Moment:** A crisp serif line (Cinzel) hangs in a dark scene. On trigger, a noise front eats through each glyph, and the letters shed specks of glowing dust and spinning red and white petals that drift off under selective bloom. It feels like the words are aging out of existence.
- **Built with:** three.js WebGPURenderer with TSL. MSDF atlas via msdf-bmfont-xml, rendered with three-msdf-text-utils' MSDFTextNodeMaterial. A Perlin texture is sampled with the per-letter 'glyphUv' attribute, pow-boosted, and step-thresholded by a progress uniform, then multiplied into opacityNode. Dust is an InstancedMesh and the petals are a GLB with bend and spin. Selective bloom uses MRT nodes. Demo: https://tympanus.net/Tutorials/WebGPUGommage. Code with one commit per step: https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops
- **Why it works:** Plates: when a plate scrolls away, its caption dissolves into ink dust (ink-blue particles on bone, no bloom). Phosphor: the same dissolve with green bloom reads as a burned-in CRT line decaying. Per-glyph UVs let every letter dissolve independently.

### [Codrops: How to Create Responsive and SEO-friendly WebGL Text (Eemeli Haakana, 2025)](https://tympanus.net/codrops/2025/06/05/how-to-create-responsive-and-seo-friendly-webgl-text/)

*For: all · verified*

- **Moment:** Headings look like normal responsive type, then reveal through a WebGL mask wipe and pick up scroll-driven post-processing distortion. Resize the window and the WebGL text reflows exactly like the HTML, because the HTML is the layout.
- **Built with:** HTML/CSS first. Each [data-animation='webgl-text'] element is mirrored by a troika-three-text mesh. CSS pixel sizes are converted to world units from camera fov and distance, and position, font-size, letter-spacing and color are synced. The original element is hidden visually but stays in the DOM. Custom ShaderMaterial does the mask reveal, and an EffectComposer pass is driven by scroll. Demo: https://tympanus.net/Tutorials/AccessibleWebGLText. Code: https://github.com/ehaakana/codrops-text-demo
- **Why it works:** This is the infrastructure pattern that makes every WebGL type idea safe for a personal site on GitHub Pages: crawlable, accessible, responsive, with an easy reduced-motion fallback (just do not hide the HTML).

### [Codrops: Interactive Text Destruction with Three.js, WebGPU and TSL (Lolo Armdz, 2025)](https://tympanus.net/codrops/2025/07/22/interactive-text-destruction-with-three-js-webgpu-and-tsl/)

*For: plumber · verified*

- **Moment:** A beveled, brushed-metal 3D word sits in studio lighting. Wherever the pointer passes, the letter surfaces burst outward along their normals into jagged shards, then wobble and spring back into solid letters once the pointer leaves.
- **Built with:** TextGeometry from a Facetype.js JSON font with bevel, and MeshStandardMaterial with RoomEnvironment PMREM. Vertex positions live in TSL storage buffers. A compute pass per frame measures pointer-to-vertex distance, applies step(distance, radius) influence along the normal, and integrates a spring: velocity += (target - current) * spring; velocity *= friction; current += velocity. material.positionNode = storage.toAttribute().
- **Why it works:** Plumber: a 'pressure test' hero where the extruded name, in pipe-metal, deforms under the cursor and springs back, so the metaphor shows in motion. Needs WebGPU with a static fallback.

### [Codrops: Animating Letters with Shaders (Paola Demichelis, 2025)](https://tympanus.net/codrops/2025/03/24/animating-letters-with-shaders-interactive-text-effect-with-three-js-glsl/)

*For: plates, plumber · verified*

- **Moment:** Seen from a diagonal orthographic camera, flat lettering lies on a surface. Under the cursor the letters lift off the page like a decal peeling up, while their soft shadow stays on the ground plane below. The gap between letter and shadow makes the lift read as physical.
- **Built with:** The text is a PNG texture on PlaneGeometry(15, 15, 100, 100) with a separate blurred, semi-transparent shadow texture plane. A Raycaster hits an invisible large 'hit' plane, and the hit point goes into the uDisplacement uniform. The vertex shader computes world-space distance, maps it to 0 to 1 inside a radius, applies easeInOutCubic, and adds the result to position.z. Demo: https://tympanus.net/Tutorials/AnimatedLettersShader
- **Why it works:** It's cheap: a single plane, no MSDF needed. Plates: museum placards and the name lift off the bone paper with a real shadow. Plumber: a stamped part label or decal peels from the manila sheet.

### [Osmo x Codrops: 5 Creative Demos Using Free GSAP Plugins (SplitText rewrite + Physics2D text smash), 2025](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/)

*For: all, plumber · verified*

- **Moment:** As you scroll, each big heading hits the top of the viewport like a roof: it breaks into characters that tumble, spin and fall away with real ballistic arcs while the next heading rises. A companion demo has a glowing dot-matrix background that springs and flows under the cursor (InertiaPlugin).
- **Built with:** SplitText.create(el, {type:'lines, words, chars', mask:'lines'}). mask wraps each line in an overflow-clip container, and autoSplit re-splits on resize. Then ScrollTrigger plus Physics2DPlugin tweens on chars (random velocity and angle, gravity) with random rotation. All of these plugins have been free since 2025.
- **Why it works:** It's deterministic, physics-flavored choreography without a physics engine. Use it for exits (ledger rows 'shipped' and dropping out) and keep a real engine for the one interactive pile.

### [Type Physics+ by BUROU3 for type.today (May 2026)](https://typephysics.type.today/)

*For: plumber, phosphor · verified*

- **Moment:** Typed letters become loose bodies, each wrapped in a soft blob-shaped collider pad. They fall, bounce, pile up and get swept by vortex, wind and attractor forces from a toolbar. Every collision and every move along a variable axis is sonified: the sound panel has master, reverb, delay and flanger, so the type becomes an instrument. A second mode, Variable+, animates axes precisely.
- **Built with:** A browser physics editor over any variable font (type.today library or uploaded OTF/TTF). Force fields (direction, vortex, burst, wave), damping, gravity and chaos sliders, collider padding per glyph, and audio synthesized from collision and axis events, with PNG and video export. Background: https://type.today/en/journal/type-physics
- **Why it works:** It's the best current proof that letters as physics bodies plus coupled sound can feel crafted. Plumber: drop repo names as part tags into a bin, with short metallic clicks on impact. Phosphor: relay clicks.

### [Jean Dawson site (Mouthwash Studio + Guillaume Colombel) and the Codrops recreation 'Hover Animations for Terminal-like Typography' (2024)](https://www.jeandawson.com/)

*For: phosphor · plausible*

- **Moment:** The page boots to a black screen with a VCR timecode '00:00:00' in segmented-LCD glyphs. Then full-bleed degraded VHS footage plays under an on-screen-display layer of track titles with timecodes ('DEVILISH 02:21:04', 'POWER FREAKS 00:03:15') scattered like a tape menu. Hovering a title reveals a bracketed '[PLAY]' label. The Codrops version adds character shuffling, a block cursor sweeping the line, and a background bar wipe.
- **Built with:** A DOM text layer in a VCR/OSD monospace over a video element. The hover states are character shuffle (random chars resolving left to right), a cursor block element and a background scaleX wipe. Codrops demo and code: http://tympanus.net/Development/LineTextHoverAnimations/ and https://github.com/codrops/LineTextHoverAnimations/. Article: https://tympanus.net/codrops/2024/06/19/hover-animations-for-terminal-like-typography/
- **Why it works:** Phosphor: boot the instrument panel with a timecode, and make every tape-log row an OSD line whose hover runs a scramble plus beam-cursor sweep, using the real timestamps from the ledger.

### [Workbench and Sixtyfour variable fonts (Jens Kutilek, Google Fonts): CRT Bleed and Scanlines axes](https://fontsource.org/fonts/workbench/about)

*For: phosphor · verified*

- **Moment:** The same pixel letters slide from crisp to smeared, with horizontal phosphor bleed (BLED 0 to 100), and from solid to broken into scan lines (SCAN -53 to 100). Animated, the text looks like it's being painted by an electron beam and warming up.
- **Built with:** font-variation-settings: 'BLED' n, 'SCAN' n. Per Fontsource, neither axis changes advance width, letter spacing or line breaks, so both can be animated on live tables with zero layout shift. Inspired by Norbert Landsteiner's 'Raster CRT Typography (According to DEC)'. Sixtyfour: https://fontsource.org/fonts/sixtyfour/about
- **Why it works:** Phosphor: a real CRT emulated by the font itself. The current mockup fakes it with color only. Animate BLED on boot, spike it on hover (beam dwell), and tie SCAN to scroll velocity.

### [Fraunces (Undercase Type for Google Fonts): SOFT and WONK axes](https://fontsource.org/fonts/fraunces/about)

*For: plates · verified*

- **Moment:** The serif sharpens or softens like ink. SOFT 0 to 100 rounds every terminal and corner (the designers call it 'wetness' or 'inkiness'). WONK 0 to 1 swaps in leaning h, n and m and flagged italic terminals, and opsz 9 to 144 retunes contrast for size.
- **Built with:** Axes: wght 100-900, opsz 9-144, SOFT 0-100, WONK 0-1. Animate with font-variation-settings driven by registered @property custom properties so each axis interpolates independently. Source: https://github.com/undercasetype/Fraunces
- **Why it works:** The Plates mockup already uses Fraunces but leaves SOFT and WONK static. Scroll-scrubbing SOFT from 100 to 0 as a plate enters reads as wet gravure ink drying into a crisp print, a signature moment from a font already on the page.

### [Climate Crisis variable font (Helsingin Sanomat; Daniel Coull and Eino Korkala): the YEAR axis](https://design.google/library/climate-crisis)

*For: all · verified*

- **Moment:** As the YEAR axis moves from 1979 to 2050, the letters melt away like glaciers, from heavy forms to thin remnants. Weight is bound to real NSIDC Arctic sea-ice data plus IPCC projections, so the type is the chart.
- **Built with:** A custom 'YEAR' axis with eight masters (1979, 1990, 2000, 2010, 2019, 2030, 2040, 2050). Eurobest Grand Prix 2021, now in the Cooper Hewitt collection.
- **Why it works:** It's the model for data-bound type, which fits the brand rule of leading with the fact and making no unverifiable claims. Bind an axis to Philip's real ledger (daily ship streak, commit count) and print the number next to it.

### [play.core / ASCII Playground (Andreas Gysin, ertdfgcvb)](https://play.ertdfgcvb.xyz/abc.html)

*For: phosphor · verified*

- **Moment:** The whole screen is a live grid of characters behaving like a fragment shader: Doom fire, a spinning ASCII donut, webcam portraits rendered as glyph density, fields that bend around the cursor. There is almost no UI, just the text matrix.
- **Built with:** A program exports boot() (once), pre() (per frame), main(coord, context, cursor, buffer, data) per cell, returning a char or {char, color, backgroundColor, fontWeight}, and post(). It renders as DOM text or canvas, capped at 30fps, with font metrics exposed to correct aspect ratio. Root: https://play.ertdfgcvb.xyz
- **Why it works:** Phosphor: render the 449x561 portrait as a live text-mode grid at about 90 columns, far below source resolution, so the low-res photo becomes a deliberate choice. Cursor heat swaps the density ramp for real commit hashes.

## Scroll choreography and transitions (15)

### [Igloo Inc (Awwwards Site of the Year 2024), case study](https://awwwards.com/igloo-inc-case-study.html)

*For: phosphor, plates · verified*

- **Moment:** The intro is rendered in real time, not played as a video, and it never hands off to a separate page. An outdoor scene with tech overlays flows straight into the scrolling experience. Each portfolio project is frozen inside its own ice block, and every block is grown differently. Moving between sections fires a transition that mixes chromatic aberration, tech displacement and frost. Clicking a link makes a particle cloud re-form into a different model. The particles change color with speed and glow mid-morph, and the sound is tied to their motion. UI labels glitch and scramble in as they appear.
- **Built with:** Three.js + three-mesh-bvh, Svelte, GSAP, Vite, with Houdini/Blender for assets. The ice comes from a custom algorithm that 'grows' crystals inside a base shape such as a cube or cylinder. Particle targets ship through a custom VDB-to-browser exporter. All UI is rendered in WebGL. Text scrambles work by offsetting the SDF glyph texture, which is cheaper than DOM scrambles, and glitches are shader passes. Audio is by Bureaux.
- **Why it works:** One thesis object (the ice block) is repeated per item, the intro carries straight into the content, and the text behaves like a signal instead of a label. None of the four mockups has a thesis object or a continuous intro.

### [Shader.se: 80s business-tech satire with a scroll-driven WebGPU scene chain](https://tympanus.net/codrops/2026/05/19/80s-business-tech-seamless-scene-transitions-inside-shader-ses-scroll-driven-webgpu-pipeline/)

*For: phosphor, plumber · verified*

- **Moment:** It reads as a deadpan 1980s corporate brochure. The studio staged a business photoshoot and then degraded it on purpose: watermarked, stretched horizontally and saved at rock-bottom JPEG quality. Scrolling never cuts. At the end of About, the page shreds into paper strips and the next scene is already rendering underneath them. Later the camera flies into a real beige monitor mesh, and that monitor's screen becomes the next page. Film grain, chromatic aberration and bloom cover everything, UI text included. Live at https://shader.se/
- **Built with:** Next.js, three.js, React Three Fiber and TSL, which compiles node materials to both WebGL and WebGPU, with Lenis for scroll. The page is configured as an array of sections, each with a {type, length}. Scenes render in reverse order: each one renders into its own FBO (useFBO) and receives nextSceneTexture through a useImperativeHandle render function. Transitions either sample the next scene in screen space or use a frustum-matched plane, so the camera moves to the actual monitor mesh. Scenes out of view skip their render pass entirely, and a 'render offset' pre-renders the next scene. UI is laid out inside the canvas with @pmndrs/uikit, so the post-processing hits the text too.
- **Why it works:** The satire is executed with total technical seriousness, which is the exact register 'AI Agent Plumber' needs. Each transition is a physical event (shredding, flying into a screen), never a fade.

### [Aether 1 by OFF+BRAND (fictional earbud launch site)](https://tympanus.net/codrops/?p=98287)

*For: plumber, phosphor · verified*

- **Moment:** As you scroll, the camera orbits the earbuds on baked paths. When you let go, it settles on one of seven anchors, and the scroll loops back to the start without ever reaching an end. Hovering the earbud drags a blue fluid overlay that follows the pointer and reveals the internal components through a Fresnel mask, like an x-ray. Particles drift on a flow field. The audio's frequency bands drive the wave shapes and the strength of the flow field, and hovering engages a low-pass filter on the music. Live at http://aether1.ai
- **Built with:** three.js with the GPGPU addon (Simplex 4D noise flow field across two textures), GSAP timelines, and Lenis driven manually through scrollTo/stop/start for the loop, plus syncTouch. Animations are baked into the .glb and scrubbed by scroll progress through THREE.AnimationMixer. Blender empties act as event drivers placed on the Blender timeline. The cheap tricks: faux depth of field via smoothstep on view-space depth inside the particle shader; fake selective bloom from a billboarded plane with a pre-generated bloom texture; the fluid sim runs at 7.5% of screen resolution; and invisible low-poly proxy meshes handle raycasts. It holds 60fps on an iPhone SE (2020).
- **Why it works:** Scroll scrubs authored keyframes and snaps to anchors, so every stop is a composed frame. The hover reveal of internals is the 'exploded view' done with the cursor instead of scroll.

### [Oryzo AI by Lusion (satirical product launch, Awwwards SOTM April 2026, SOTY 2026 finalist)](https://oryzo.ai/)

*For: plumber, plates, all · verified*

- **Moment:** An Apple-grade launch page for a cork coaster, played completely straight: 'Made for mugs. Built for tables.', AI-powered claims, 'So portable, it's wearable', a friction-coefficient visualization, ORYZO / Pro / Pro Max variants, a research paper and downloadable model files. The coaster sits photoreal on a lived-in studio desk, and one continuous camera journey carries you through every section.
- **Built with:** Per the BTS series (https://blog.lusion.co/oryzo-bts-part-2-7-3d-design-and-motion-graphics), the scenes are built in Houdini, rendered in Redshift, converted to Gaussian splats and split into multiple splats composited in the web view. The scroll is a linear camera spline. Lusion found that rendering only the exact camera path hurt splat quality because eased motion produced repeated frames. Design restraint (part 3): about 99% of the type is one family, with four colors (cream, near-black, muted olive, orange), so the render carries the page.
- **Why it works:** Over-engineered seriousness applied to a humble object reads as mastery. That is the 'AI Agent Plumber' joke done right. Caveat for Philip's copy rules: the humor must live in the presentation (spec-sheet rigor applied to real repos and real dates), never in invented stats.

### [Shopify Winter '25 'Boring' Edition](https://tympanus.net/codrops/?p=83842)

*For: swiss, phosphor · verified*

- **Moment:** The page lands as a plain, early-Wikipedia-style text page. Dragging the word 'boring' in the corner makes it pronounce itself out loud. A single 'Non-Boring' switch turns the whole page into a 3D retro CRT TV that flips through 150+ AI-generated channel videos. Scanning a QR code turns your phone into the TV's remote, and the background text crashes down under custom physics. Live at shopify.com/editions/winter2025
- **Built with:** React Three Fiber. The CRT shader is adapted from Martin Upitis's classic, and roughness maps add screen smudges. On-screen UI is rendered with drei RenderTexture + Text inside the shader, channel changes are animated with React Spring, and animations are made in Blender and exported as glTF. A single env map lights the scene, Firebase syncs the phone remote, R3F A11y keeps it screen-reader accessible, and subtitles come from VTT files.
- **Why it works:** Restraint is used as a setup and the payoff is a switch. A Swiss page that hides an instrument, or a phosphor page that opens as a plain spec sheet and powers on, gets the same contrast for free.

### [Vercel Ship 2024 interactive lanyard badge (Paul Henschel)](https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber)

*For: plumber, all · verified*

- **Moment:** A conference badge drops in on a lanyard, swings and settles. Grab it and fling it: the strap bends naturally, and the card spins on its clip and then rights itself. Your name is printed on an iridescent card. People screenshotted it and shared it everywhere.
- **Built with:** R3F + drei + @react-three/rapier + MeshLine. A fixed RigidBody anchor connects to three joint bodies chained with useRopeJoint([[0,0,0],[0,0,0],1]), and the card hangs from a useSphericalJoint at [0,1.45,0]. The strap is a CatmullRomCurve3 through the joint positions, resampled to 32 points per frame into MeshLine. While dragging, the pointer is unprojected through the camera and the card switches to kinematicPosition, then back to dynamic on release. An angular-velocity correction keeps the card facing front. The name is drawn with RenderTexture + Text3D onto a meshPhysicalMaterial (clearcoat 1, iridescence). About 80 lines of code.
- **Why it works:** One physical, grabbable object with real inertia does more than any amount of scroll fade-ins. For the plumber direction it becomes an inspection tag or a hanging part tag.

### [Apple product pages: AirPods-style canvas image-sequence scrub (GSAP forum breakdown)](https://gsap.com/community/forums/topic/25188-airpods-image-sequence-animation-using-scrolltrigger/)

*For: plumber, plates · verified*

- **Moment:** The section pins while the product turns, opens and explodes into its parts in perfect photoreal detail. Scrolling back reverses it frame for frame. Copy blocks fade in over the frozen frame at fixed points in the timeline, so the page reads like a film you are cranking by hand.
- **Built with:** Pre-rendered frames (typically 60 to 180) are drawn to a <canvas> on every scroll tick. ScrollTrigger pin + scrub maps progress to a frame index on a proxy object, snapped to an integer. One master timeline also drives the copy at labeled percentages. Swapping <img> src is called out as slow, and the thread reports a 21MB to 4MB cut from moving PNG to WebP. A GSAP CodePen (codepen.io/GreenSock/pen/VwgevYW) is the canonical starter.
- **Why it works:** This is the cheapest way to get film-quality exploded assemblies on a static host: render them once in Blender and scrub the frames in the browser.

### [Codrops: on-scroll folding 3D cardboard box (three.js + GSAP)](https://tympanus.net/codrops/?p=66174)

*For: plumber, plates · verified*

- **Moment:** A flat corrugated cardboard net folds itself into a box as you scroll, and unfolds when you scroll back. The flaps follow one another with overlapping timing, and the corrugation visibly presses flat along each crease.
- **Built with:** three.js BufferGeometry built from three merged planes (two covers plus a fluted middle), with the vertex positions edited directly. A crease modifier, z *= 1 - pow(c/(.5*size), foldingPow), flattens the flutes at the fold lines. A GSAP timeline with scrollTrigger scrub:true calls updatePanelsTransform in onUpdate. The segments: the sides open from 0 to 1, the width flaps start at 0.9 for 0.6, and the length flaps start at 1.1. The whole 2.7-unit timeline is mapped to the page height.
- **Why it works:** The assembly sequence is authored as overlapping timeline segments and scrubbed by scroll. The same structure works for a pipe manifold coming together (plumber) or an art-book signature folding and binding (plates).

### [Codrops: scroll-driven SVG map animations with GSAP](https://tympanus.net/codrops/2026/05/21/creating-scroll-driven-svg-map-animations-with-gsap/)

*For: plumber, swiss · verified*

- **Moment:** A map pins to the viewport. As you scroll, a route inks itself in, a marker rides its leading edge, and the 'camera' zooms from 2.5x to 4x while panning to keep the marker centered. It feels like a film camera tracking a vehicle, but it is a single SVG.
- **Built with:** DrawSVGPlugin from drawSVG:'0 0'; MotionPathPlugin moving '.dot-end' along '.path'; an outer .pov group tweened from scale 2.5 to 4; an inner group panned inversely to the marker's coordinates each frame with gsap.quickTo; and ScrollTrigger {trigger:'#s2', pin:'.map', scrub:1}.
- **Why it works:** It is cinematic camera work with zero WebGL. For Philip, the route becomes the pipeline: a flow marker travels through the shipped ledger, and each junction is a real dated release.

### [Codrops: dual-scene fluid X-ray reveal (three.js)](https://tympanus.net/codrops/2026/03/23/building-a-dual-scene-fluid-x-ray-reveal-effect-in-three-js/)

*For: plumber, phosphor, plates · verified*

- **Moment:** A grid of solid figures. Your cursor leaves a turbulent, smoky trail that burns through to glowing Fresnel skeletons underneath, and the trail decays organically. Scanlines, grain and bloom finish it. Demo at https://tympanus.net/Tutorials/SkeletonFluidReveal/
- **Built with:** The two scenes render to separate targets. A 2D canvas mouse trail feeds a ping-pong pair of FBOs (needed because the GPU can't read and write one texture in a single pass). The fluid shader samples five offsets, keeps the darkest value, and adds FBM noise displacement. The inverted mask blends the solid scene with the wire scene. Twelve instanced copies cost one draw call per scene, and the post pass adds bloom, scanlines, film grain and a color grade.
- **Why it works:** This is the missing idea for the low-res portrait. The cursor wipes away the treatment to reveal a second reading underneath: a blueprint line drawing (plumber), the raw photo under the gravure (plates), or a wireframe under the phosphor dither.

### [EXAT typography microsite by RISE2 Studio](https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/)

*For: swiss · verified*

- **Moment:** The page opens on a glyph grid where letters swell toward the cursor: weight 900 and red at the center, falling to weight 200 and blue across seven concentric rings. Scroll speed sets large numerals oscillating on a sine wave, hovering a style name morphs its weight and width live, and occasional 3D-rotated type statements punctuate the scroll. Live at https://exat.hottype.co/
- **Built with:** GSAP + ScrollTrigger + SplitText, Lenis, Splide.js marquees and variable fonts, running on WordPress/ACF. The Euclidean distance from the cursor to each glyph center is bucketed into rings, and each ring maps to font-variation-settings and a color.
- **Why it works:** In this site the type is the interface and the motion. The Swiss mockup has a giant name and an index that just sit there. Inter Tight's variable wght axis can do all of this.

### [Interlude: Codrops starter for custom page transitions in Astro](https://github.com/codrops/interlude)

*For: all · verified*

- **Moment:** It ships 22 navigation transitions in three groups. Overlays: curtain, wipe, circle, columns, typewriter. Page movement: stack, slide-over, peel, slices, frame, carousel, cube, corner, tear. WebGL: dither, dissolve, ink, spiral, velvet, particles, channel. Demo at https://interlude.crnacura.workers.dev/
- **Built with:** Astro ClientRouter + GSAP, with an optional persistent three.js layer (<Interlude /> marked transition:persist). On astro:before-preparation it covers the page while fetching the next one in parallel, so a navigation costs whichever of the two takes longer, not both. astro:before-swap cleans up, astro:after-swap sets up the incoming page, and astro:page-load awaits media before running the enter animation. MIT licensed, copy-paste rather than a package. Astro builds static output, so it works on GitHub Pages.
- **Why it works:** There is a ready-made transition vocabulary for each direction: peel or ink for plates, tear for plumber (tearing off a drafting sheet), typewriter, dither or channel for phosphor, columns for swiss.

### [Codrops: Image Trail Animation for an Intro (preloader that becomes the hero)](https://tympanus.net/codrops/?p=63293)

*For: plates, swiss, all · verified*

- **Moment:** A fake loader shows a climbing percentage on the left and a single image on the right. At 100% the image smears into a new position, trailing copies of itself. On Enter, the title and image reflow again into the final hero layout, so the loader turns out to have been the hero's first frame. Demo at http://tympanus.net/Development/IntroTrailEffect/
- **Built with:** GSAP Flip (getState, then the DOM change, then Flip.from) between three layout states. The trail is a set of duplicated image layers animated with staggered lag.
- **Why it works:** This is the cleanest pattern for 'preloader becomes hero'. The single portrait is the obvious element to carry from loader to hero.

### [Marijana Pav's digital stamp collection (shaders, loupe, postcard genie)](https://tympanus.net/codrops/2026/06/09/building-an-interactive-digital-stamp-collection-with-shaders-postcards-and-playful-inspection/)

*For: plates, plumber · verified*

- **Moment:** You browse loose stamps filed behind binder-divider tabs. Select one and a glass loupe slides over it: sharp in the center, warped at the edges with RGB fringing and a rim highlight. The metadata types itself out in mono, and handwritten annotations sit in the margins. The feedback postcard flips over, and on send a shader 'genie' sucks it out of the page. Live at https://marijanapav.com/stamps
- **Built with:** The stamp scene is recomposed into an offscreen canvas and passed to a lens shader as a texture: radial distortion stronger at the edges, per-channel UV offsets for chromatic aberration, rim shading, and paper grain. Radix Dialog provides the accessible shell. snapDOM captures the live DOM into a WebGL texture so the genie transition can distort real content.
- **Why it works:** The loupe makes a museum placard into an inspection tool, which makes the low-res portrait's dots look deliberate. snapDOM to texture is the trick for running shader transitions on ordinary HTML sections.

### [itomdev: 3D portfolio built without 3D models (paint-reveal shader)](https://tympanus.net/codrops/2026/06/11/sketching-the-impossible-a-3d-portfolio-built-without-a-single-3d-model/)

*For: plumber, plates · verified*

- **Moment:** You walk a hand-sketched corridor by scrolling, and the camera glances toward doors as you near them. Every clickable thing starts as a black-and-white pencil sketch and floods with color on hover, in a brush-stroke wipe with bleeding edges. Click a door and it swings open and you fly through. Live at https://itomdev.com/ (FWA of the Day, GSAP Site of the Day).
- **Built with:** R3F 9, three.js 0.182, GSAP 3.14, Vite 7. MeshBasicMaterial is patched with onBeforeCompile so the fragment shader shows the painted texture where (1 - uv.y) + paintNoise(uv*15)*0.15 < uProgress*1.5. GSAP tweens uProgress, or proximity drives it. There are no lights: the shadows are baked into the textures. A RoomWarmup component mounts every room offscreen and calls gl.compileAsync() so entering a room never stutters. The source is public at github.com/ITomPoland/portfolio-itom.
- **Why it works:** Pencil drawing turning into finished ink is the engineering-drawing direction's natural motion. Blind emboss turning into an inked plate is the art-book direction's version.

## Thematic references (14)

### [Bartosz Ciechanowski: Internal Combustion Engine (also Mechanical Watch, Gears, Bicycle)](https://ciechanow.ski/internal-combustion-engine/)

*For: plumber · plausible*

- **Moment:** The article opens on a 3D engine you drag to orbit. After that come roughly 15 to 20 inline figures that you work yourself: a slider turns the crankshaft and the piston follows it, cam height and span sliders redraw a valve-lift plot above the cam, and cutaways reveal the internals with diagonal hatching on the cut faces. Gases are color-coded (yellow mixture, blue air). Each figure is a small machine you operate, and the text reads like a drawing's annotations.
- **Built with:** Hand-written WebGL. Every figure is its own small canvas with flat-shaded parts and crisp outlines, and range inputs and drag handlers scrub one parameter (crank angle, cam span) that the scene redraws from deterministically. A global pause toggle stops all animation. There are no scroll effects. The interactivity comes entirely from direct manipulation.
- **Why it works:** This is the gold standard for technical illustration that moves. It is precise rather than decorative, and the reader gets a feel for the mechanism by moving it. For Plumber, each assembly (a repo, a product) can be a mechanism the visitor scrubs, with no animation running on its own.

### [Maxime Heckel: Moebius-style post-processing (Mar 2024)](https://blog.maximeheckel.com/posts/moebius-style-post-processing)

*For: plumber, plates · plausible*

- **Moment:** A live 3D scene renders as an ink comic panel: thin wobbly black outlines, crosshatched shadows that get denser with darkness, and specular highlights outlined like a pen drawing. When you orbit the camera, the drawing redraws itself from the new angle.
- **Built with:** React Three Fiber with a custom post-processing pass. Depth and normal buffers go to render targets and a Sobel 3x3 runs on both (depth gives silhouettes, normals give interior creases). sin() plus hash displacement of the sample UVs makes the hand-drawn wobble. Crosshatching is mod() stripe patterns gated by luminance thresholds, and highlights are encoded as white in the normal material so Sobel picks them up.
- **Why it works:** It turns real 3D geometry (pipes, valves, flanges) into an engineering drawing at 60fps. This is the missing piece between Plumber's manila-paper costume and a drawing that is actually live.

### [1j01/pipes: Windows 3D Pipes screensaver in three.js](https://1j01.github.io/pipes/)

*For: plumber · verified*

- **Moment:** Glossy pipes grow one segment at a time on an invisible 3D lattice. They turn 90 degrees at elbow or ball joints, branch in new colors until the volume fills, then the scene clears and starts over. Utah teapots and candy canes appear as easter eggs at the joints.
- **Built with:** three.js, MIT license. A random walk on an integer 3D grid with occupancy checks. Each step appends a cylinder and each turn adds an elbow or sphere joint. The logic is ported from the original Windows NT OpenGL screensaver source.
- **Why it works:** It's the most literal and best-loved image of 'plumbing' in computing nostalgia. Re-rendered through an ink or blueprint shader, with the grid walk replaced by routes between his real products and repos, it becomes a self-assembling P&ID instead of a joke.

### [Leon Sans (Jongmin Kim, cmiscm)](https://leon-kim.com/)

*For: plumber, swiss · verified*

- **Moment:** Letters draw themselves stroke by stroke as if a pen plotter were writing them. Font weight is a continuous dial from 1 to 900 you can animate live, and the same glyphs can wave, sprout plants, turn into metaballs or fill with patterns.
- **Built with:** A geometric sans defined as coordinate data rather than a font file, rendered to canvas 2D or WebGL. Each stroke exposes a drawing[i].value from 0 to 1, which you tween with GSAP using a per-stroke stagger. MIT license (github.com/cmiscm/leonsans). Awwwards SOTD Sep 2019, Tokyo TDC Excellent Work 2020.
- **Why it works:** Display type you can draw and re-weight is native to both a drafting table and a Swiss grid. The name can be plotted on Plumber, and on Swiss its weight can track scroll.

### [Phosphor OS-200 oscilloscope playground (hubertlim)](https://hubertlim.github.io/oscilloscope_playground/)

*For: phosphor · verified*

- **Moment:** A believable bench oscilloscope in the browser. Lissajous figures, FM and AM synthesis, live mic or audio-file input, and freehand drawing are all traced by a glowing beam that leaves decaying afterglow. Sliders for persistence, bloom, beam width, curvature and scanlines change the tube's physics while you watch.
- **Built with:** three.js, TypeScript, Vite. A 4-pass pipeline (described on the three.js forum): (1) beam point sprites with additive blending into HalfFloat targets; (2) a phosphor ping-pong buffer with exponential decay in linear HDR, clamped at 2.5; (3) a separable 13-tap Gaussian bloom at half resolution; (4) a composite with Reinhard tone mapping applied once, then barrel distortion, scanlines and vignette.
- **Why it works:** The current Phosphor mockup is green CSS text. This shows what phosphor actually does: light accumulates where the beam lingers and fades over time. Tone-mapping once at the end of an HDR buffer is what keeps the glow from looking fake.

### [woscope (m1el): WebGL XY oscilloscope emulator and 'how it works' write-up](https://m1el.github.io/woscope-how/)

*For: phosphor · verified*

- **Moment:** Oscilloscope-music audio plays while a green line draws figures that look like a real CRT trace. Fast strokes are faint, slow strokes and corners burn bright, and joints are seamless with no overdraw blobs.
- **Built with:** Each audio sample pair (L,R) is an XY point, and each segment is a quad expanded perpendicular to the line. The fragment shader integrates a Gaussian beam along the segment: I = 1/(2l) * exp(-py^2/2s^2) * [erf(px/(sqrt2 s)) - erf((px-l)/(sqrt2 s))], using an erf approximation. Additive blending gl.blendFunc(SRC_ALPHA, ONE) makes adjacent segments sum to mathematically correct intensity.
- **Why it works:** This formula is the difference between 'neon CSS text-shadow' and a beam. Intensity falls out of beam speed automatically, so the nameplate or a Lissajous gets realistic hot spots for free.

### [Cathode: CRT-phosphor trading workspace (BradyHouse, Jul 2026)](https://bradyhouse.github.io/cathode/)

*For: phosphor · verified*

- **Moment:** A Bloomberg-style terminal treated as an art object. Candlesticks with Bollinger bands and EMAs, volume bars and trade markers sit under real barrel curvature, with phosphor glow and scanlines. A curvature slider bends the whole workspace like a tube face. Themes switch between phosphor-green, amber and paper, and there's a playable fake terminal and a curved datagrid.
- **Built with:** Vue 3 component library (npm @hetalhouse/cathode, MIT). The chart is a three.js scene, and a custom shader applies barrel distortion to the full workspace rather than per widget. Glow and scanlines are toggleable.
- **Why it works:** It proves dense real data (here the shipped ledger and repo stats) can live inside the tube instead of in DOM panels styled green. Curving the whole UI as one surface is the move that sells the instrument.

### [RetroZone (TheMarco, Mar 2026): vector and CRT display engine](https://github.com/TheMarco/retrozone)

*For: phosphor · verified*

- **Moment:** Vector Mode makes plain bright lines on black read as a Vectrex or 1983 Star Wars cabinet: blue-white phosphor, multi-pass bloom, per-channel persistence trails that smear colored ghosts behind motion, chromatic aberration and grain. The demo HexaX is a Tempest-like tunnel shooter. CRT Mode adds a Trinitron aperture grille, gaussian beam scanlines, halation and interlace flicker.
- **Built with:** An engine-agnostic WebGL shader overlay (Phaser, PixiJS, three.js or Canvas2D). Each shape is drawn in three passes, a wide dim outer glow, a mid bloom and a sharp bright core, and the overlay adds persistence and scanlines. Per-channel decay rates produce the colored trails.
- **Why it works:** It gives the Tempest and Vectrex vocabulary (wireframe tunnels, vector type) a ready path. Per-channel persistence is a cheap, beautiful detail: when anything moves, a faint chromatic ghost trails behind it.

### [Jon Yablonski: animated Swiss posters in CSS (Muller-Brockmann, Neuburg, Keller)](https://webdesignerdepot.com/?p=22305)

*For: swiss · verified*

- **Moment:** Canonical International Style posters (Zurich Tonhalle 1955, Juni Festwochen 1959, Konstruktive Grafik, Berlin-Layout and others) assemble themselves. Arcs rotate into place, bars slide along the grid and type lands last. A related Muller-Brockmann 'Beethoven' SVG recreation (collected on freefrontend.com/css-posters) runs a 4-second transition of ten concentric circle layers with staggered rotations and stroke-dashoffset.
- **Built with:** Plain CSS keyframes and vanilla JS. Each poster is broken into layers, every layer is keyed separately, and timing functions are tuned by hand. The geometry is SVG or CSS shapes, with stroke-dashoffset for the drawn arcs.
- **Why it works:** It shows the Swiss direction can move without losing its discipline: the geometry animates and the type stays still and exact. The current Swiss mockup animates only text fades.

### [Studio Dumbar/DEPT: DEMO (Design in Motion) festival](https://demofestival.com/)

*For: swiss · verified*

- **Moment:** In 2019 every one of the 80 screens on every platform and hall of Amsterdam Centraal showed curated kinetic typography and motion design for 24 hours, with the program changing hourly. The festival has since gone to many cities and lists a 28 January 2027 cities edition. Featured artists include the Basel motion designer Dirk Koy.
- **Built with:** A curated motion program, not one codebase. Studio Dumbar's stance is that an identity is recognized by how it moves, sounds and interacts. Their North Sea Jazz 50th identity was a scalable kinetic-type system built from posters.
- **Why it works:** It sets the bar: Dutch and Swiss modernism moving at scale, grid intact. Use it as the quality reference for a Swiss hero that behaves like a DEMO loop (type as a moving system) instead of a static poster with a fade.

### [Tim Rodenbroker: Programming Posters and ECAL TYPEMACHINES (2020)](https://ecal.ch/en/feed/projects/5177/typemachines/)

*For: swiss · plausible*

- **Moment:** Type locked inside a strict grid comes alive. Words get sliced into rows and columns of tiles that slide on phase-shifted sine waves, so the letterform ripples, shears and re-locks into a perfectly set word. Strict systems produce infinite variation.
- **Built with:** Processing and p5.js creative coding: render the word to an offscreen buffer, then copy it to the screen tile by tile with a source offset of sin(time + x*k + y*j)*amp. He built 40+ generative poster systems for his 'Programming Posters' course (slanted.de/?p=555270). ECAL's TYPEMACHINES workshop applied this to typographic expression 'framed in a strict visual system'.
- **Why it works:** It's the cheapest route to a breathtaking Swiss hero: canvas 2D, about 100 lines. Tiles aligned to the page's exposed 12-column rules keep the motion obedient to the system.

### [Press and Foil (Moonil Jung, Framer component)](https://www.framer.com/community/marketplace/components/press-foil/)

*For: plates · verified*

- **Moment:** A logo on paper stock with hot foil, blind emboss, deboss, letterpress or spot UV, lit by a light that follows the cursor with weight and settle. The bevel catches light as you move, holographic foil shifts color from a real diffraction-grating model, and spot UV is invisible until the light grazes it.
- **Built with:** WebGL2 with no libraries. Procedural grain never tiles and differs per instance. It pauses offscreen and recovers from context loss, and exposes depth, bevel, roughness, stock and light-position parameters.
- **Why it works:** An art book is about light on paper. A cursor-lit blind-embossed name and Fraunces display set in letterpress would make Plates feel like holding the book.

### [Amanda Ghassaei: Digital Marbling (2022)](https://blog.amandaghassaei.com/2022/10/25/digital-marbling/)

*For: plates · verified*

- **Moment:** Ink drops spread on a virtual water bath and combs drag through them, producing feathered Turkish-marbling patterns with razor-crisp color boundaries. Precisely aligned or multiple simultaneous combs make patterns physical marblers can't.
- **Built with:** A hybrid of the closed-form 'Mathematical Marbling' transformations and a full incompressible fluid solver. BiMocq2 advection replaces Stable Fluids to avoid blur and keep ink edges crisp. Comb patterns are imported as vectors.
- **Why it works:** Marbled endpapers are the most art-book thing there is. A cheap closed-form version gives a live endpaper the visitor combs with the cursor, then bakes it into section dividers.

### [3D Book Slider with page fold and audio (R3F)](https://book-slider-3d.vercel.app)

*For: plates · verified*

- **Moment:** A hardcover book in 3D whose pages physically bend as they turn, arcing mid-flip and flattening as they land, with page-turn sound. You click through spreads the way you'd leaf through a monograph.
- **Built with:** React Three Fiber, three.js and Next.js (source github.com/shreejai/book-slider-3d). The usual way to build this bend is a segmented plane as a SkinnedMesh with a bone chain across the page width, each bone rotated toward a damped target.
- **Why it works:** The four research artifacts become physical plates you turn instead of rows in a table of contents. The bend plus raking light is what reads as paper.

## Generative and simulation (16)

### [Maxime Heckel: Shades of Halftone (Feb 2026)](https://blog.maximeheckel.com/posts/shades-of-halftone/)

*For: plates, swiss, plumber, all · verified*

- **Moment:** Interactive widgets turn images into halftone that reads as real print. Dots overflow their cells, merge gooily in dark areas, and stay clean at edges. CMYK screens rotate to print angles (C15, M75, Y0, K45) with no moire, and you drag sliders for grid size, radius and angle.
- **Built with:** GLSL: fract()-tiled UVs, luma-driven radius, fwidth() antialiasing, 3x3 neighbor-cell sampling so dots can exceed their cell, smoothmin for gooey merging, cell-center sampling so dots are never cut. Subtractive CMYK is White*(1-C)*(1-M)*(1-Y).
- **Why it works:** It's the exact recipe for making the 449x561 portrait look intentional. Halftone throws away resolution on purpose, and these refinements are what separate 'print' from a cheap CSS radial-gradient dot grid.

### [WebGL Fluid Simulation (Pavel Dobryakov)](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation)

*For: plumber, plates · verified*

- **Moment:** You flick the cursor and dye curls into marbled vortices that keep drifting after you stop, then fade. Fast flicks throw long ribbons and slow drags leave soft blooms. It's the standard 'the page is a liquid' moment, and it has been copied everywhere since.
- **Built with:** A single script.js (MIT, about 16.7k stars) runs stable-fluids Navier-Stokes on the GPU, following the GPU Gems approach. Each frame does velocity advection, then curl/vorticity confinement, divergence, Jacobi pressure iterations, gradient subtraction and dye advection. Pointer position and velocity inject 'splats'. Bloom and sunrays are optional post passes, and dat.gui sliders expose curl, splat radius and dissipation. Live demo: paveldogreat.github.io/WebGL-Fluid-Simulation/.
- **Why it works:** For the 'AI Agent Plumber' direction, fluid is literally the material. Rasterize the drafted pipe schematic into an obstacle/boundary texture so dye flows only through the drawn pipes and pools at valves labeled ActRun and PromptCache. For plates, run it in one ink (ink-blue) with low dissipation so it reads as an ink wash bleeding behind a plate caption and then settling. The default rainbow dye is the thing that makes it look like a demo, so restrict it to the direction's inks.

### [Physarum transport networks (Sage Jenson; browser port in Amanda Ghassaei's gpu-io)](https://cargocollective.com/sagejenson/physarum)

*For: plumber, phosphor · verified*

- **Moment:** Millions of tiny agents leave trails that thicken into a living network of veins. In the gpu-io browser version (apps.amandaghassaei.com/gpu-io/examples/physarum/) you drag to drop attractant, and within seconds the network reroutes toward your finger. It builds bright arterial paths between food sources and abandons dead ends.
- **Built with:** This is Jeff Jones' 2010 agent model. Each agent has a position, a heading and three sensors (front-left, front, front-right). It turns toward the strongest trail reading, steps forward and deposits material. Every step, the trail map gets a 3x3 mean blur and a multiplicative decay. Jenson ran 5-10M particles in openFrameworks/GLSL. gpu-io (MIT, WebGL2 with WebGL1 fallback, under 100KB, github.com/amandaghassaei/gpu-io) ships fluid, physarum, reaction-diffusion and wave examples.
- **Why it works:** It's the most honest visual metaphor for agent orchestration: simple agents produce emergent routing. Put fixed food nodes at ActRun, PromptCache and the 8 repos, and pulse attractant into a node whenever the ledger shows a commit to it. The network then visibly reorganizes around where he actually shipped. Plumber renders it as thresholded 1-bit red ink on manila. Phosphor renders it as green trails with a persistence buffer.

### [Reaction-diffusion with image mode (Jeremie Piellard)](https://github.com/piellardj/reaction-diffusion-webgl)

*For: plates, phosphor · verified*

- **Moment:** A photo gets rebuilt out of Turing patterns. Dark regions fill with dense labyrinths and light regions dissolve into sparse spots, so the face comes out of noise over a few seconds like a print developing. Clicking tears the pattern open, and it grows back toward the image.
- **Built with:** The Gray-Scott model runs on the GPU (demo: piellardj.github.io/reaction-diffusion-webgl/). Image mode interpolates feed and kill rates per pixel between a 'white' preset and a 'black' preset, using perceived brightness 0.21R + 0.72G + 0.07B. Values are packed at 16-bit precision across RGBA, diffusion uses a 3x3 kernel, and color mode runs three sims (one per channel) composited additively. Jason Webb's Reaction-Diffusion Playground (jasonwebb.github.io/reaction-diffusion-playground/) has the same idea as a 'style map' image upload, plus a bias pad for directional growth and a clickable f/k parameter map, which makes it good for tuning presets by eye.
- **Why it works:** This solves the 449x561 portrait problem. The detail comes from the pattern, not the source pixels, so the photo's softness disappears. In plates it becomes an ink-blue 'process plate' with a placard giving the f/k values like a printing colophon. In phosphor it is green on black and grows again on each visit.

### [Flow Fields essay (Tyler Hobbs)](https://tylerxhobbs.com/essays/2020/flow-fields)

*For: swiss, plates, plumber · verified*

- **Moment:** Thousands of long curves sweep across the canvas in the same current and never cross, like combed hair or river bathymetry. Density and direction alone carry the composition. This is the engine behind Fidenza.
- **Built with:** A 2D grid of angles at roughly 0.5% of image width, extended past the canvas edges so curves can come back into view. Angles come from Perlin noise, or are quantized to multiples of pi/4 or pi/10 for 'sculpted, rocky' forms. Curves are traced by stepping 0.1-0.5% of width in the local angle direction. Start points come from a grid, random placement or circle packing, and a collision check stops any curve that gets too close to an existing one.
- **Why it works:** It's pure line art, so it prints, plots and holds up in monochrome. For swiss, draw hairline streamlines that bend around the giant clipped name (glyph outlines act as flow obstacles) and draw them in once in reading order. For plates, make a frontispiece plate where streamline spacing encodes the portrait's luminance. For plumber, the same field becomes the drawing's 'flow lines'.

### [Domain warping (Inigo Quilez)](https://iquilezles.org/articles/warp)

*For: plates · verified*

- **Moment:** Marbled textures that sit still or breathe slowly: smoke, agate, oil on water. They come from noise fed back into itself and look hand-made, not computed.
- **Built with:** f(p) becomes f(p + h(p)). In practice that's fbm(p + 4*fbm(p + 4*fbm(p))), and the intermediate warp vectors are reused to color the result. It's one fragment shader with no buffers.
- **Why it works:** Art books have marbled endpapers, and this is how you make them procedurally. Quantize the output to three inks (bone, ink-blue, oxblood) and seed it from that day's ledger hash so the endpaper changes daily. Add scroll velocity into the time uniform so the marbling drags as you pass the front and back covers. Keep it to the endpapers and never put it behind text.

### [Paper Shaders (paper.design)](https://shaders.paper.design/)

*For: all · verified*

- **Moment:** Shader surfaces that look art-directed, not like demos. Effects include mesh gradient, grain gradient, voronoi, god rays, metaballs, warp, dot grid and smoke ring. Image filters include paper texture, fluted glass, water, image dithering, halftone dots, halftone CMYK and lens distortion.
- **Built with:** Zero-dependency WebGL2 fragment shaders packaged for React (@paper-design/shaders-react) and vanilla JS (@paper-design/shaders exports ShaderMount plus the raw shader strings). Setting speed to 0 gives a static, zero-cost render.
- **Why it works:** It's the fastest route to a tuned material layer without hand-rolling noise: paper-texture under plates and plumber, image-dithering on the phosphor portrait, voronoi for a swiss cell field. Use it as the base material and spend custom engineering on the one data-driven system each direction needs.

### [Codrops: Interactive WebGL Backgrounds, a quick guide to Bayer dithering (zavalit)](https://tympanus.net/codrops/?p=97026)

*For: phosphor, swiss · verified*

- **Moment:** A background of coarse 1-bit pixels that still reads as smooth gradients and shapes, and stays alive under interaction. The article's reference point is JetBrains' Junie campaign page, where the dither sets the atmosphere without competing with the copy.
- **Built with:** Ordered dithering: each pixel's brightness is compared against a threshold from a Bayer matrix (2x2 in this guide). The companion Codrops article 'Building a Real-Time Dithering Shader' (tympanus.net/codrops/?p=95318) implements a 4x4 Bayer matrix as a postprocessing Effect with pixelSize and grayscale uniforms, so any underlying field (noise, a simulation, an image) quantizes to on/off. Note: both article bodies returned 403 to fetching, so these details come from search-result summaries.
- **Why it works:** Dithering is the bridge from any simulation to the phosphor look. Render the physarum or attractor into a texture, then output only 1-bit green on a 3px pixel grid. For swiss, a 1-bit red dither field behind the index table can be the page's only image.

### [ASCII play / ertdfgcvb (Andreas Gysin)](https://play.ertdfgcvb.xyz/)

*For: phosphor, swiss · verified*

- **Moment:** Everything is rendered as monospaced characters animating in place: SDF cubes, Doom fire, plasma, cellular automata, even a webcam feed. The type is the image.
- **Built with:** Per-cell programs built from boot(), pre(), main(coord, context) (which returns a character per cell) and post(). Output renders as text or canvas. Example categories (basics, SDF, demos, camera, contributed cellular automata and particles) are all open source.
- **Why it works:** Phosphor's tape log and meters become live character fields driven by real data. Run a Doom-fire cellular automaton whose fuel row is the last 90 days of ledger commits, burning upward behind the nameplate, and let hovering a day add heat to that column. It keeps the instrument-panel concept while being genuinely generative.

### [woscope XY oscilloscope emulator (m1el)](https://m1el.github.io/woscope/)

*For: phosphor · verified*

- **Moment:** Music drawn as a glowing vector beam. Slow parts of the trace burn brighter, fast strokes are faint, and the afterglow decays like real phosphor. Unlike most emulators, the lines look like a real oscilloscope.
- **Built with:** Each line segment is drawn as a quad. The fragment shader integrates a Gaussian beam along the segment with the error function: Cumulative(p) = 1/(2l) * e^(-py^2/2s^2) * [erf(px/(sqrt2*s)) - erf((px-l)/(sqrt2*s))]. Additive blending (gl.blendFunc(SRC_ALPHA, ONE)) makes adjacent segments sum with no joint artifacts. Write-up: m1el.github.io/woscope-how/.
- **Why it works:** Right now phosphor is just a green palette; this makes the green physically correct. Draw his name, the meter needles and the count-ups as beam paths. Then feed the same x/y arrays into a stereo AudioBuffer (L=x, R=y) so an opt-in 'listen' button plays the nameplate as real oscilloscope audio. That's sound as content, not decoration.

### [antfu.me ArtPlum background (Anthony Fu)](https://github.com/antfu/antfu.me/tree/main/src/components)

*For: all · verified*

- **Moment:** On each page load, faint gray plum branches grow in from the viewport edges at a hand-drawn pace and then stop. The center, where the text lives, stays clean, and many visitors only notice it on their second page view.
- **Built with:** Canvas 2D recursion (ArtPlum.vue). Each step draws a segment of random length up to 6px and spawns two children at +/- random*pi/12 (15 degrees). Branch probability is 0.8 until 30 branches exist, then 0.5. Each pending step has a 50% chance of deferring to the next frame (about 40fps via useRafFn), which gives the growth an organic rhythm. Strokes are #88888825 (about 15% alpha), a CSS radial-gradient mask clears the middle, and growth stops off-canvas.
- **Why it works:** It proves a developer's personal site can carry a generative layer and still read as serious: low alpha, masked to the edges, finite. Reuse the grow, settle, stop pattern in every direction: plumber pipes routing in from the margins, swiss hairlines, phosphor traces, sand-spline botanicals in plates.

### [On the Origin of Species: The Preservation of Favoured Traces (Ben Fry)](https://benfry.com/traces/)

*For: plates, swiss · plausible*

- **Moment:** A whole book shown at once as columns of tiny lines. An animation replays 14 years of revisions, with each edition's additions in its own color. Hover any line to read the actual sentence.
- **Built with:** Built in Processing on data from Darwin Online. Each sentence is a short bar sized by its text and colored by the edition that introduced it, and the columns twitch and contract as text is added or removed.
- **Why it works:** It's a direct template for the shipped ledger. Show every ledger entry as a hairline in monthly columns, colored by repo or product, with a replay scrubber that animates the history and hover revealing the commit message, date and SHA. Because every mark is a checkable commit, it fits the no-unverifiable-claims rule.

### [Pretext (Cheng Lou)](https://pretextjs.dev/)

*For: swiss, plates · verified*

- **Moment:** Body text reflows around a moving umbrella every frame. In the 'Pool of Text' demo, words ripple like water. Neither shows any layout jank.
- **Built with:** prepare() measures glyphs once through Canvas. layout() then computes multiline breaks as pure arithmetic with zero DOM reads (the site claims about 2ms for 1,000 blocks). TypeScript, no dependencies, 12+ writing systems.
- **Why it works:** Swiss style is text set on a grid, so making that grid live is the real step up. The red period of the name detaches as a small flock of red squares that drift through the intro paragraph while the text reflows around them at 60fps. On scroll they dock into the index table as its row markers, so disorder resolves into the grid.

### [Strange Attractors (Shashank Tomar, Sep 2025)](https://blog.shashanktomar.com/posts/strange-attractors)

*For: phosphor, plates · verified*

- **Moment:** Thousands of particles start as a cube or a sphere shell and get pulled into a Lorenz or Thomas attractor. Nudging the damping parameter shows the butterfly effect live as the whole cloud reorganizes.
- **Built with:** three.js with GPGPU ping-pong render targets: one FBO holds current particle positions, a fragment shader integrates the attractor ODE into the other, then they swap. Points render from the position texture, and particle count, initial state, trails and colors are exposed as controls.
- **Why it works:** A shape that never repeats but always stays recognizable is a good emblem for running work. In phosphor, render it as point beams with persistence and make the integration step a dial the visitor can turn. In plates, freeze 200k points into a single stippled plate with a museum placard giving the equation and parameters.

### [Bartosz Ciechanowski interactive explainers](https://ciechanow.ski/)

*For: plumber, plates · verified*

- **Moment:** Long-form explainers (latest: Moon, Dec 2024) where every figure is a hand-built interactive diagram. You drag to rotate or scrub a slider, and the mechanism moves in exact step with the paragraph you're reading.
- **Built with:** Hand-written WebGL and canvas figures embedded inline in the prose. Each is a small simulation with one or two controls.
- **Why it works:** The four research artifacts and the ActRun story deserve interactive figures. In plumber, make an exploded-view drawing of the agent pipeline (trigger, agent, tools, review, ledger) where a scrubber moves one job through the parts and lights up the matching schedule-of-work row. It reads as an engineer explaining a machine, not as marketing.

### [spanda procedural UI sounds (with userinterface.wiki and SND as references)](https://github.com/rittikbasu/spanda)

*For: all · verified*

- **Moment:** Interface cues (tap, type, toggle on/off, open/close, send, confirm, error, complete) that sound physical and quiet. They're synthesized live, so nothing sounds like a stock notification ding.
- **Built with:** Web Audio only, about 4.2kB min+gz, MIT. Each cue is a set of 'hits' (pitch, gain, glide) built from oscillators, noise, filters and envelopes, shaped by tactile, crisp or lush profiles. userinterface.wiki (mintlify.wiki/raphaelsalaja/userinterface-wiki/technical/web-audio-api) gives durations and levels: click 4-15ms, pop 40-60ms, success 300-500ms. SND by Dentsu Lab Tokyo (npm snd-lib) is the sampled alternative, with sine, piano and industrial kits shipped as audio sprites.
- **Why it works:** Opt-in sound matched to the material is a cheap step up in perceived craft: a rubber-stamp thunk for plumber, a single sine tick for swiss, a relay click over a faint hum for phosphor, a paper turn for plates. Synthesis keeps it under 5KB, with no audio files to host on GitHub Pages.

## Anti-patterns and generic tells (16)

### [Lando Norris (Awwwards Site of the Year)](https://landonorris.com)

*For: all, plates, plumber · verified*

- **Moment:** You land on a big cut-out portrait centred on off-white, with faint topographic contour lines drifting behind it. Move the cursor across the face and a ring-shaped mask wipes through it, showing the 3D race helmet underneath in the same position. Scroll and the page turns dark olive: a neon-yellow signature draws itself stroke by stroke over a giant two-line marquee quote (serif over sans) running behind a grayscale photo.
- **Built with:** Webflow (the html carries w-mod-js), Lenis smooth scroll (html.lenis lenis-scrolling) and three.js r174 driving about 21 canvases (inspected live). The signature is a path draw (stroke-dashoffset). The cursor reveal is a mask composited between a photo layer and a 3D helmet layer.
- **Why it works:** It's a person site that solves the same problem Philip has. One portrait becomes the main interactive object, and the cursor shows a second identity under the face (driver to helmet, which maps to Philip to AI Agent Plumber). Listed as Site of the Year and Users' Choice on awwwards.com/annual-awards/winners.

### [Visual Rambling: Dithering, Part 1](https://visualrambling.space/dithering-part-1/)

*For: phosphor, plates, all · verified*

- **Moment:** A mustard-yellow page holds a tilted, isometric slab of animated black-and-white dither noise, with DITHERING set in inverse-video type across it. Clicking the right half of the screen steps forward. Each step flies the camera into the slab until single dither pixels fill the viewport, while inverse-video caption boxes explain what you're seeing. Clicking the left half rewinds.
- **Built with:** three.js r176 on a single WebGL2 canvas (window.__THREE__ = 176, inspected), plus a click-stepped state machine that tweens camera position and zoom between caption beats. The dither runs as an animated fragment shader on the plane.
- **Why it works:** It turns an explainer into a camera move. That's the right model for presenting the four long-form research artifacts (Agent Playbook, Taste Transfer) as interactive covers rather than 2x2 bordered cards.

### [GT Mechanik minisite (Grilli Type)](https://www.gt-mechanik.com)

*For: plumber, swiss · verified*

- **Moment:** Hot-pink MCNK fills the top edge, then a sheet of drafting diagrams: spheres labelled MONO/SEMI/POLY, protractor fans with tick marks, construction circles. Lower down, an 'an' specimen sits on pink graph paper. Picking from a monospaced list (THIN to BLACK, MONO/SEMI/POLY) re-sets the glyphs live. A concentric-circle dial and a readout bar with numeric values (MCNK 97.8, MONO 91.2) sit in the corners like instrument controls.
- **Built with:** Variable-font axes (weight plus a tone axis) driven through font-variation-settings, SVG construction diagrams, and a monospaced UI set in the typeface itself.
- **Why it works:** It's the same engineering-drawing vocabulary as the plumber mockup, but every diagram is either a control or an explanation of the type. Nothing is a decorative stamp. It's also the strongest 2026 proof that Swiss/technical design can be kinetic without going 3D.

### [Bartosz Ciechanowski: Mechanical Watch](https://ciechanow.ski/mechanical-watch/)

*For: plumber · verified*

- **Moment:** A clean white watch movement sits inline with the prose. Drag it to orbit in 3D. Drag the slider under it and the case pulls apart into an exploded assembly with colour-coded gear trains, mainspring and escapement, each part separating along its own axis. Dozens more small live demos follow, each isolating one mechanism.
- **Built with:** Hand-written WebGL with no library: base.js plus watch.js, 93 canvas elements on the page (inspected). Each demo has its own canvas, pointer-drag orbit, a custom slider and a pause button.
- **Why it works:** An exploded view is the honest version of an engineering drawing. Applied to ActRun (trigger, planner, tool rack, runner, output) it shows how the machinery works, which is the claim in Philip's bio.

### [Oxide Computer](https://oxide.computer)

*For: phosphor, plumber · verified*

- **Moment:** On a dark hero, a tabbed CLI | API | CONSOLE panel on the left types real commands ('oxide auth login', then 'oxide instance c...'). A thin leader line runs from it to a 3D rack on the right, captioned 'FIG. 1 OXIDE CLOUD COMPUTER', whose sled bays glow green. Further down, the rack shows up again in datacenter photography next to console screenshots.
- **Built with:** three.js r182 for the rack (inspected), Suisse Intl plus GT America Mono, a typed-command loop in the CLI panel, and an SVG leader line joining UI to object.
- **Why it works:** This is what the phosphor mockup's green-on-black is borrowing from, and Oxide earns it by showing the product's actual interface and hardware. The mockup has the 'FIG.' caption and the green, but no figure.

### [Lusion (studio site)](https://lusion.co)

*For: plumber · verified*

- **Moment:** The preloader runs rolling odometer digits in the corner next to a chunky progress bar. Then a rounded-corner window fills with a dense clump of glossy 4-way pipe-cross fittings in cobalt, white and gloss black, lit like product photography. I saw the settled frame only. I couldn't verify cursor interaction because the browser pane was hidden.
- **Built with:** three.js r158 across 3 canvases (inspected), studio-grade lighting and materials, with the fittings packed by a physics or instanced layout.
- **Why it works:** These are literal plumbing fittings rendered as luxury objects. 'AI Agent Plumber' can read as a premium identity through form alone, with no rubber stamps or manila paper.

### [Stripe Press](https://press.stripe.com)

*For: plates · verified*

- **Moment:** A dark page with a vertical stack of 3D book spines (marbled endpapers, gold cloth, cream) and a tick-mark scrubber down the left edge. Click a spine and the book turns to face you while the whole page floods with that cover's colour (mustard for Poor Charlie's Almanack). The cover carries a line-engraved portrait in blue ink. A 'Living cover' link sits beside the synopsis.
- **Built with:** three.js r151 with 2 canvases (inspected), a route change per book (/poor-charlies-almanack), and a page background tweened to each book's key colour.
- **Why it works:** The art-book direction done properly: research artifacts as objects with spines, and an engraved line-screen portrait in place of a CSS duotone. It's the clearest model for presenting Philip's four papers and his single photo.

### [Cyd Stumpel (portfolio)](https://cydstumpel.nl)

*For: swiss, all · verified*

- **Moment:** A repeating giant CYD STUMPEL marquee runs across the top and collapses into a small CYD logo as you scroll. A tiny 3D box icon tumbles with scroll position. A role line cycles through Freelance Developer, Creative Engineer, Conference Speaker and others. Navigating between pages morphs the header and page title across a real page load.
- **Built with:** No canvas. CSS scroll-driven animations with named view-timelines (--page-title, --footer), animation-range 'entry 100lvh entry 115lvh' on the header, a footer logo animating a variable-font axis on a view timeline, a box rotating on scroll(), and view-transition-name on header, main and page-title for cross-document View Transitions, all behind prefers-reduced-motion guards (stylesheet rules inspected).
- **Why it works:** It proves that kinetic, typographic, award-level motion can be pure CSS on a static host, and that a role-swap line can carry two identities (Co-founder of Kairox AI, then AI Agent Plumber).

### [Rauno Freiberg](https://rauno.me)

*For: swiss, plumber · verified*

- **Moment:** A flat grey field holds a single white card with a crosshair and a tick-ruler minimap at the top. Click and it unfolds into a horizontal strip of hairline-outlined frames: his bio in stroke-only type, cut by one large circle, then a giant outlined DD for Devouring Details. Scrolling pans sideways while the ruler tracks your position.
- **Built with:** DOM and SVG with outlined (stroke-only) type, vertical scroll mapped to horizontal travel, a crosshair cursor and a ruler minimap.
- **Why it works:** Hairline construction geometry used as navigation (the ruler) and composition (circle over type), not as background decoration. Swiss restraint with one strong interactive idea.

### [Codrops: Line Text Hover Animations (after jeandawson.com)](https://tympanus.net/Development/LineTextHoverAnimations/)

*For: phosphor, swiss · verified*

- **Moment:** A monospaced data table sits on ruled lines. Hover a row and every cell blanks to a solid block cursor, then retypes through random glyphs ('M,D▮', 'L>F▮', 'PW@▮') before resolving left to right into the original text.
- **Built with:** GSAP 3.12.5 plus SplitType for per-character splitting (scripts inspected: js/effect-1/index.js), with a cursor wipe, per-char random-glyph cycles and a staggered resolve.
- **Why it works:** It looks almost exactly like the swiss and phosphor ledger tables, but the rows feel alive and machine-driven. The fix is behavioural, not a reskin.

### [Codrops: Interactive WebGL Backgrounds, A Quick Guide to Bayer Dithering (Seva Dolgopolov, 2025-07-30)](https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/)

*For: phosphor, plumber, all · verified*

- **Moment:** A quiet field of dithered FBM noise fills the background. Each click sends a ring expanding out through the dither pattern, decaying as it travels. The article cites JetBrains' Junie campaign page as a live production use.
- **Built with:** A three.js full-screen shader with recursive Bayer macros (Bayer2 up to Bayer16, Bayer8 chosen), PIXEL_SIZE 10 in a 5x5 cell, and click uniform arrays uClickPos[] and uClickTimes[]. ring = exp(-pow((r - speed*t)/thickness, 2)) * exp(-dampT*t) * exp(-dampR*r). The author reports under 0.2 ms at 4K and about 3 KB plus three.js.
- **Why it works:** It's the cheapest fully interactive surface you can build. Click and ping feedback makes a dark instrument page feel powered on, at near-zero performance cost.

### [Codrops: One Element Scroll (GSAP Flip waypoints)](https://tympanus.net/Development/OneElementScroll/)

*For: plates, swiss, all · verified*

- **Moment:** A full-bleed portrait shrinks on scroll into a small card behind huge outlined name type, then keeps travelling until it lands as one card in a row of five. It's the same element the whole way, so the eye never loses it.
- **Built with:** GSAP Flip plus ScrollTrigger: record state, reparent into the next waypoint container, Flip.from with scrub (repo codrops/OneElementScroll, 2024-11).
- **Why it works:** With only one photo, continuity beats repetition. One portrait that travels hero, then frontispiece, then colophon reads as intent, not a lack of assets.

### [ASCII Play (ertdfgcvb / Andreas Gysin)](https://play.ertdfgcvb.xyz)

*For: phosphor · verified*

- **Moment:** The whole viewport becomes a grid of characters running live programs: plasma, Doom flame, moire explorer, 10 PRINT, a 'Slime Dish' particle sim, and camera input rendered as grayscale ASCII that follows the pointer.
- **Built with:** Each program is a per-cell main(coord, context, cursor, buffer) function, with a text renderer or a colour canvas renderer.
- **Why it works:** Glyph density is a resolution-independent portrait treatment. A 96x120-cell ASCII rendering needs far less than 449x561 of information, so the low-res source becomes a strength.

### [woscope: WebGL oscilloscope emulator (m1el)](http://m1el.github.io/woscope-how/)

*For: phosphor · verified*

- **Moment:** An audio track is drawn as a glowing vector beam on a black scope face. Lines bloom where the beam slows, overlapping traces add up brighter, and tails fade with phosphor afterglow.
- **Built with:** Each sample pair becomes a segment, rendered as a quad. The fragment shader integrates a gaussian beam analytically with erf, giving Cumulative(p) = 1/(2l) * exp(-p_y^2/2σ^2) * [erf(p_x/√2σ) - erf((p_x-l)/√2σ)]. Additive blending is gl.SRC_ALPHA, gl.ONE, and afterglow is a smoothstep on segment index (MIT, github.com/m1el/woscope).
- **Why it works:** Real phosphor isn't a green text-shadow. It's a beam with intensity and persistence. Tracing Philip's name or the commit sparkline with this technique turns the theme from costume into physics.

### [Paper Shaders (paper.design)](https://shaders.paper.design)

*For: plates, plumber · verified*

- **Moment:** A gallery of live, tweakable canvas shaders. The relevant ones are image filters you can drop on a photo: Halftone dots, Halftone CMYK, Image dithering, Paper texture, Fluted glass, Lens distortion.
- **Built with:** Zero-dependency HTML canvas shaders, vanilla '@paper-design/shaders' or '@paper-design/shaders-react', Apache-2.0, pin to 0.0.x (README via GitHub API, 3.5k stars).
- **Why it works:** It's a fast, licensed way to put a real halftone or CMYK screen and paper substrate on the portrait in place of the CSS dot-overlay fake. Use only the image filters. Its mesh and grain gradients are themselves 2025 slop staples.

### [WebGL CRT Shader ('Serenity', gingerbeardman, Jan 2026)](https://gingerbeardman.github.io/webgl-crt-shader/)

*For: phosphor · verified*

- **Moment:** A pixel-art game canvas runs through a CRT pass with a live control panel. Scanline intensity, count and adaptive mode, bloom threshold, RGB shift, vignette, curvature and flicker all retune the image in real time.
- **Built with:** A 2D canvas composites the source, then one GLSL pass handles the CRT effect. The author says to match scanline count to output resolution (256 in the demo) and that it runs back to an iPhone XS (MIT).
- **Why it works:** A tuned final pass over a real rendered layer is what makes phosphor read as hardware. The mockup's 1.2%-white repeating-linear-gradient is too faint to register as a CRT.

## Dropped in fact-check

- Linear homepage (numbered spec sections and live product illustrations) <https://linear.app/>: mismatch. The rendered illustrations are confirmed: Backlog/Todo/In Progress/Done columns, a roadmap MAR to SEP, 'Worked for 8 sec' and a HomeScreen.tsx diff. The defining claim is false, though. The live homepage has no 1.0 to 5.0 spec numbering in the server HTML, the rendered DOM after a full scroll, or CSS pseudo-content. The sections carry plain titles (Intake and integrations, Planning and monitoring, AI and automations, Build, review, and ship), and the only numbered labels are 'Fig 0.1' to 'Fig 0.3'. Drop the numbering claim or source it from an archived version.
- Oscilloscope Music (Jerobeam Fenderson and Hansi Raber) <https://oscilloscopemusic.com/>: unchecked. 
- Tearable Verlet cloth (Michal Zalobny) <https://www.cloudofoz.com/verlet-test/>: mismatch. Wrong attribution. The page's meta author is 'Claudio Z. (www.cloudofoz.com)', described as 'A 2D cloth Verlet simulation made in Rust' (macroquad/WASM). Michal Zalobny's cloth uses a custom WebGL2 engine. An 80.lv article (Aug 15 2025) about Zalobny links its 'try it here' to this cloudofoz URL, which seems to be where the mix-up came from. The cloth itself (pinned, draggable, tearable) is plausible. Re-attribute to Claudio Z. (@cloudofoz) or find Zalobny's own demo URL.