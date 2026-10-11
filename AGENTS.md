# philipbankier.com: agent instructions

Personal site of Philip Bankier, co-founder of Kairox AI. Static site on GitHub Pages.
Read `docs/HANDOFF.md` before any work. It replaces the previous session's memory.

## Commands
- Install: `pnpm install` (Node 22, pnpm 10)
- Dev server: `pnpm dev` (http://localhost:3000)
- Typecheck: `pnpm check`
- Production build: `pnpm run build:gh` (outputs dist/public). Build inside a git worktree, never in a checkout with a running dev server.
- Design gallery: `cd design-options && python3 -m http.server 4173`
- Run ALL of `pnpm check` and a worktree `pnpm run build:gh` before finishing any change under client/.

## Git and deploy
- Every push to `main` deploys to production (.github/workflows/deploy.yml). Never commit to main. Branch, then `gh pr create`.
- An external cron commits to main daily (client/public/pages/tracker/**) under Philip's own identity. Run `git pull --rebase` before pushing, and exclude those commits from any data by path.
- The gh account with push access is myhome411-boop (`gh auth switch -u myhome411-boop`). philip-bankiers-helper is read-only.
- Active redesign branch: `design/option-mockups`.

## Brand rules (all site copy)
- Source of truth: `gh api repos/actrun-ai/brand/contents/philip/KIT.md --jq .content | base64 -d` (plus HOUSE.md at the repo root).
- No em dashes. No three-item parallel triplets. No "not X, it is Y". No emoji, no exclamation marks. Contractions are fine. Lead with the fact.
- No claim about Philip (bio, years, acquisitions, titles) without his confirmation. Nothing unverifiable.
- Banned: MailAI, mailai.live, autopilotai.live, Actron, AutopilotHQ, "Agent Partner", "Sugar", any fundraising talk, hype words (AI employee, fully autonomous, 24/7, seamless, leverage, revolutionary, effortless).
- Company Kairox AI (kairoxai.live). Products: ActRun (actrun.ai, "AI that runs your work") and PromptCache (promptcache.live). Autopilot is an object inside ActRun, never a product name.
- Never present a fork as his work. Check with `gh api repos/philipbankier/<repo> --jq .fork`. slop-engine is a fork.
- Every number shown on the site comes from build-time data, never hardcoded.

## Verification
- Check visuals in a real browser at 1920 wide (the operator's display is 1920x1080 logical, DPR 2) and at 375 wide. Resizing the Chrome window does not change the viewport on this machine, so load the page in a fixed-width iframe instead.
- Any motion or canvas work needs a prefers-reduced-motion path and a no-WebGL fallback, and both must be checked.

## Goal Mode boundaries
- Write only inside the goal's declared scope. Never touch client/public/pages/tracker/**, never commit to main, and don't edit .github/workflows/** unless the goal says so.
- Never commit secrets, tokens, private-repo names or private contribution data. Get GITHUB_TOKEN from `gh auth token` at runtime only.
- Done means every checklist item has evidence (a command and an output excerpt, or a file path) or is marked [blocked] with the real error. Never stub, silence, or retry a failure into a pass. An honest no-go is a valid result.
- Stop and ask on auth or rate-limit errors, missing credentials, an ambiguous spec, or any premise in the brief that proves false.
