# Handoff: philipbankier.com redesign

Written 2026-10-08 by the outgoing Claude Code session for a fresh Codex session. It holds everything that session knew. `AGENTS.md` holds the standing rules; this file holds the context and state.

## Start here

1. `git fetch origin && git checkout design/option-mockups && git pull`
2. Read `design-options/ELEVATION.md`. It's the current state of the redesign and the decision in front of the operator.
3. Read the rest of this file.
4. If the operator wants the next phase run as a Codex goal, the objective is `docs/goal-groundwork.txt` and the detailed brief is `docs/goal-groundwork-brief.md`. In the Codex CLI, paste the objective into `/goal`. In the Codex Desktop app don't paste it, because pasted text becomes an attachment the goal ignores. Ask instead: "Read docs/goal-groundwork.txt and create a goal with exactly that objective."

## People

- **The operator** is the person directing this work. They are not Philip. They hold the machine account and make design calls on Philip's behalf, but anything claimed about Philip needs his own confirmation.
- **Philip Bankier** is the subject: co-founder of Kairox AI. His site is his surface, so personal-brand decisions are his.
- **How the operator wants output:** lead with the next action, number multi-step work, restate where things stand each turn, give specific time estimates, and skip preamble, recaps and closing pleasantries. They're direct about taste and will say plainly when work is weak. Take it as signal.
- **What the operator wants from the redesign:** breathtaking, award-tier craft with real motion choreography and visual layers (shaders, simulation, material). They have rejected "standard" output twice, so see Lessons below.

## The live site

- philipbankier.com is served by GitHub Pages from `main`, via `.github/workflows/deploy.yml` (`pnpm run build:gh` to dist/public, plus a CNAME). PRs also get Vercel preview deployments, which aren't production.
- **Stack:** React 19, Vite, Tailwind 4 and wouter, in client/.
- **Design:** "Editorial Ledger", dark, with Instrument Serif and mono labels.
- **Sections:** a hero with a constellation canvas and the duotone portrait, then Ledger, Writing, Library, Open Source and Contact. Good Reads and Tools are commented out in client/src/pages/Home.tsx.
- **Known debts:**
  - The "What shipped" ledger is a hardcoded snapshot from 2026-08-22.
  - The Writing posts are hardcoded, and the newest is from March 2026.
  - All post links point at the Substack homepage, not the posts.
  - The contact form is a mailto.
  - The favicon and og-image are missing.
- **History:**
  - PR #1 (Aug 2026) stripped a Manus-generated scaffold (index.html went from 368 KB to 2 KB), fixed brand names, and added Library and Open Source.
  - PR #2 added Ledger and Constellation.
  - PR #3, by Philip, added PromptCache.
  - Tailwind 4's own `container` utility had silently overridden the site's max-width. It's fixed with `@utility container` in client/src/index.css.

## Hazards (read before touching anything)

- **The tracker cron.** An external automation ("Vic", running on another machine) commits a Yohei Nakajima "intelligence tracker" to `main` every day at about 06:00 ET. The file is client/public/pages/tracker/yohei-nakajima.html, and it commits as philipbankier@gmail.com with inconsistent commit messages.
  - Every one of its pushes redeploys the site.
  - Classify its commits by path, never by message or author.
  - It publishes a daily dossier on a named living VC. Whether that belongs on Philip's public site was never decided, and it's an open question for Philip.
- **Unlisted pages that are still live.**
  - client/public/pages/content-topic-synthesis.html is an internal ops report. It exposes unpublished plans and the address philip@mailai.live.
  - The untweeted/ and tracker/ pages are also live.
  - A redaction call is pending.
- **A committed env file.** `.env.production.staging` was committed on 2026-05-21. Its contents were never read by an agent, so never read it. The merge in Aug 2026 removed it from main's tree, but it's still in public git history. The operator was told to rotate whatever it held, and no history scrub was done.
- **Forks.** slop-engine is a fork of harry0703/MoneyPrinterTurbo. The first-round mockups wrongly listed it as Philip's work, and it has since been removed. Check `fork` before listing any repo.
- **Private contributions.** 1,257 of Philip's 1,525 contributions in the last year are private (GraphQL `contributionsCollection.restrictedContributionsCount`). Showing private counts publicly needs Philip's yes.
- **Builds kill the dev server.** Running `pnpm build` in the checkout that's serving dev has killed the server in the past. Build in a worktree.
- **Verify in a real browser.** An earlier session "verified" a hero background in a headless pane while the operator was looking at a black screen.

## Brand

- **The kit:** github.com/actrun-ai/brand, files philip/KIT.md (updated 2026-10-07) and HOUSE.md. Fetch them with `gh api` (see AGENTS.md).
- **Bio line:** "Co-founder of Kairox AI. I build the machinery that runs the work, in the open."
- **Headline:** "AI Agent Plumber" is a sanctioned headline that's still open for Philip to confirm.
- **Live site title:** "Philip Bankier · AI Founder & Tinkerer". The footer role reads "AI Founder · Builder · Analyst".
- **The only portrait** is 449x561, at client/public/assets/img/profile.webp (a copy sits in design-options/assets/). No higher-resolution original has been located. Any treatment has to make that low-res source look deliberate.
- **The newsletter** is The Living Edge (thelivingedge.substack.com). It belongs to Philip and doesn't carry Kairox branding. The Agentic Edge was removed at the operator's request.

## Where the redesign stands

On branch `design/option-mockups`, in design-options/:

| Path | What it is |
|---|---|
| `ELEVATION.md` | **The current overview. Read first.** Four research-backed concepts, cost, and the recommendation. |
| `concepts/option-2-plumber.md` and the other three | Full spec per direction: first 10 seconds, signature moment shot by shot, intro timings, every section's visual, motion and interaction, portrait recipe, ledger moment, type, palette, tech stack, performance, mobile, reduced motion, copy samples, critic verdicts. |
| `concepts/compare-and-foundation.md` | The shared motion tokens (durations, easings, springs), preloader and View Transition system, performance budget, reduced-motion and audio policy, the recommendation, and the prototype order. |
| `research/references.md` | 103 verified references (award sites, shaders, kinetic type, scroll choreography, themes, generative). |
| `research/techniques.md` | 82 build recipes. |
| `research/anti-patterns.md` | The audit of what reads as generic. **Check every design against it.** |
| `index.html` plus `option-2..5-*.html` | The first-round static mockups, which were rejected. Keep them as a baseline only and don't iterate on them. The gallery's tab 1 is the live site. |
| `BRIEF.md` | The first-round brief. Superseded. |

**The four directions, all built around one idea:** the portrait is built from Philip's real GitHub record.

| Direction | Signature moment | Build | Notes |
|---|---|---|---|
| Plumber, "PB-0001: The Works" | Turn a valve. Red ink flows, the camera pulls back 1x to 0.16x, and the hero turns out to be one detail on an engineering drawing of his operation. | 45 days (v1 26) | Strongest builder read |
| Swiss, "Set and Filed" | The portrait is a dither print with one cell per contribution. It files itself into an axonometric year. | 30 days | Blocked unless Philip allows private counts |
| Phosphor, "Long Persistence" | A beam signs his name, becomes a 96-line face, then the arm of a radar sweep lighting what he shipped. | 34 days | Needs his signature and an ActRun run log |
| Plates, "Open Edition" | Scroll cranks an etching press. The copper plate has one engraved line per day, hand-cut versus machine-ruled. | 26 days | The juror's pick. Over the perf budget as specced |

**Recommendation in force:** don't commit to a 26 to 45 day build from documents.

1. Send Philip the Day 0 questions (bottom of ELEVATION.md).
2. Spend 2 days on shared groundwork: the ledger pipeline and the portrait maps.
3. Spend 2 days on a likeness panel: render all four portraits from real data and have five people who know Philip name him at phone size.
4. Spike the leader's signature moment and record 10 seconds of it for Philip.

The previous session leaned toward Plates, with Plumber as the alternate. **Steps 2 and 3 are packaged as the next Codex goal.**

**The Day 0 questions for Philip have not been sent yet.** The groundwork goal doesn't wait on them.

## Lessons from this engagement

1. **"Bland" and "standard Claude output" were fair calls both times.**
   - The first site was a template one-pager.
   - The first mockups were static CSS with fade-ups, built from generic research checklists.
   - What fixed the research was studying specific award-tier sites and demos with verified URLs and recipes (see research/).
   - A layout with pills, cards, mono labels and fade-ups reads as AI output no matter the palette.
2. **Measure at the operator's real width.** Earlier layout bugs were missed because checks ran at 1365 wide while the operator sees 1920.
3. **Hardcoded numbers go stale.** The ledger snapshot did, and awesome-agent-skills' star count moved from 15 to 20. Generate them at build time.
4. **Give an honest cost.** Breathtaking is 26 to 45 days per direction. Say so before building, and prove the riskiest piece first.

## Accounts and access

- **GitHub:** myhome411-boop has push access to philipbankier/philipbankier.github.io and is currently the active gh account. philip-bankiers-helper is read-only.
- **Git commits** on this machine are authored as "Philip Bankiers Helper".
- **The brand repo** actrun-ai/brand is readable with the active account.

## Open items

- [ ] Send Philip the Day 0 questions (ELEVATION.md, bottom).
- [ ] Run the groundwork and likeness-panel goal (docs/goal-groundwork.txt).
- [ ] Run the human likeness panel. It needs five people who know Philip.
- [ ] Get Philip's direction choice, then spike its signature moment.
- [ ] Decide on the tracker cron and the unlisted internal pages (Philip).
- [ ] Wire build-time data into the live site (ledger, writing feed, star counts), whichever direction wins.
- [ ] Favicon and og-image (in every concept's spec).
