# Philip Bankier — Personal Site

Personal website for Philip Bankier. Built with React 19 + Tailwind CSS 4 + Vite. Deployable as a free static site on GitHub Pages.

## Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4 + custom design system (Quiet Luxury Futurism)
- **Fonts:** Sora (display), DM Sans (body), JetBrains Mono (metadata)
- **Build tool:** Vite
- **Package manager:** pnpm

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Pages Deployment

### Option 1: Automated (GitHub Actions — Recommended)

1. Push this repo to GitHub (e.g., `github.com/philipbankier/philipbankier.github.io` or any repo)
2. Go to **Settings → Pages** in your GitHub repo
3. Under **Source**, select **GitHub Actions**
4. Push to `main` — the site will build and deploy automatically
5. Point your custom domain (`philipbankier.com`) to GitHub Pages in **Settings → Pages → Custom domain**

### Option 2: Manual Build

```bash
pnpm run build:gh
```

This outputs to `dist/public/`. Upload that folder to any static host.

## Customization Guide

### Adding/Editing Blog Posts
Edit the `PERSONAL_POSTS` and `AUTOPILOT_POSTS` arrays in:
```
client/src/components/WritingSection.tsx
```

### Adding/Editing Good Reads
Edit the `GOOD_READS` array in:
```
client/src/components/GoodReadsSection.tsx
```

### Adding/Editing Tools
Edit the `TOOLS` array in:
```
client/src/components/ToolsSection.tsx
```
Set `affiliate: true` for affiliate links — they will be automatically labeled.

### Updating Work History
Edit the `WORK_HISTORY` array in:
```
client/src/components/AboutSection.tsx
```

## Custom Domain Setup (GitHub Pages)

1. In your DNS provider, add:
   - `A` records pointing to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or a `CNAME` record pointing to `philipbankier.github.io`
2. In GitHub repo **Settings → Pages → Custom domain**, enter `philipbankier.com`
3. Enable **Enforce HTTPS**

## License

MIT — open source and free to deploy.
