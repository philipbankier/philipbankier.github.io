# Design brief: philipbankier.com, from OK to masterclass
2026-10-07 · research synthesis + four directions · gallery at http://localhost:4173

## What the research says (three parallel sweeps, distilled)

**The strategic finding (field scan of 16 founder + design-engineer sites).**
AI founders all run the same site: reverse-chron essay list, default-white austerity,
credibility outsourced to external artifacts. Design engineers do the opposite: the site
itself is proof-of-work (motion demos, custom type systems, one aesthetic thesis), but
thin on substance. Nobody pairs founder-grade substance with design-engineer-grade craft.
That intersection is the position. Named whitespace that fits Philip: the changelog as
identity (one typed timeline of everything shipped), live instrumentation done seriously,
warm print-lab aesthetics ("technical paper meets terminal"), and typographic
infrastructure applied to research artifacts.

**The craft bar (award-tier analysis).**
One signature moment per site, everything else restrained. Typography IS the content in
2025-26 winners (oversized clipped headlines replaced hero images). Line-mask reveals
with 40-80ms stagger, a single animation clock, grain at 3-6%, footer as a destination
(oversized wordmark, local time), view-source delight. Anti-patterns to never touch:
purple-gradient glassmorphism bento, typewriter "Hi, I'm X" heroes, everything-animates.

**The 2026 toolkit (capability map, verified against browser support).**
Bets, ranked: cross-document View Transitions (MPA feels like a SPA, pure CSS);
scroll-driven animations behind @supports; variable-font kinetic type (Fraunces opsz/WONK,
Recursive CASL); @property-animated gradients and counters; hand-rolled 2D canvas (skip
three.js); pure-CSS duotone/halftone image treatments. All fail soft in Firefox, all
gated on prefers-reduced-motion.

## Shared spine (all options)

Every option keeps the one structural idea the current site got right, which the field
scan independently flagged as unclaimed: the ledger. One typed, dated record of what
actually shipped, rebuilt daily from sources in the real build. Copy follows the brand
kit: the bio line is the hero, voice rules apply (no em dashes, no triplets,
contractions, lead with the fact), nothing unverifiable. Every option ships favicon,
og-image, per-option 404, and reduced-motion paths.

## The five options

### 1 · Current (baseline)
Dark slate Editorial Ledger, Instrument Serif + mono labels, constellation hero,
portrait duotone. Live at philipbankier.com. Competent, coherent, quiet. Its known debts:
stale hardcoded ledger, template-adjacent one-pager bones.

### 2 · The Plumber (recommended)
Engineering drawing as identity: manila drafting paper, drawn grid, brick-red stamps,
halftone ink portrait, title blocks, schedule-of-work table, components with part
numbers. The sanctioned "AI Agent Plumber" line becomes the concept. Signature moment:
the stamped hero with the halftone plate. Full build adds: stamp-thunk scroll reveals,
dashed "pipe" lines that draw between sections, Recursive CASL morph on headings,
cross-doc view transitions styled as sheet turns. Risk: wit must stay at drafting-table
restraint or it reads costume. Why it wins: ownable, warm-print-lab (unclaimed), true to
the kit, impossible to confuse with anyone in the scan.

### 3 · Swiss Index
International-style index: warm white, exposed column rules, Inter Tight at clipped
viewport scale, signal red, the changelog as a full-width index table with inverting
rows, giant clipped INDEX footer. Signature: the masthead-to-index rhythm. Full build
adds: line-mask load choreography, scroll-scrubbed headline weight, view transitions as
hard cuts. Risk: nearest to the generic founder-austerity cluster; the discipline is the
differentiator, which demands flawless execution. The professional-timeless pick.

### 4 · Phosphor
Instrument panel, matte Rams discipline, not hacker-terminal: near-black, phosphor green
+ amber, nameplate hero, operator card, four real-number meters (79 repos, 3 products,
4 papers, 69 issues), tape log, channel cards. Signature: the counting meter cluster.
Full build adds: live build-time data in every meter, @property counters, subtle needle
sweeps, llms.txt/MCP endpoint done seriously (field-scan whitespace #2). Risk: keeps him
in dark-tech like every craft site; green must stay matte to dodge cliché.

### 5 · Plates
Art book: bone paper, Fraunces at 144pt optical with WONK, Newsreader body, ink-blue
gravure portrait, works as museum placards, the record as a dotted-leader table of
contents, colophon footer. Signature: the cover with axis-shifting Fraunces. Full build
adds: hover axis play, page-turn view transitions, print-grade og-images. Risk: reads
literary over operator; most beautiful, least "ships daily."

## Recommendation

Option 2, with option 3 as runner-up if the wit feels wrong for partnerships. Hybrids
are cheap at this stage: Plumber paper + Swiss index table is one obvious crossbreed.
Decision wanted: pick a direction (or a hybrid), then the full build plan follows
(estimate: 2-3 sessions for a complete rebuild with the live ledger wired).
