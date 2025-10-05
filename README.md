# SIHDemo — Static site for Vercel

This repository is a static site (HTML + Tailwind CSS). I updated the project so Vercel can render `pages/index.html` as the site root.

Local build and deploy steps (PowerShell on Windows)

1. Install dependencies (one-time):

```powershell
npm install
```

2. Build Tailwind CSS into `css/main.css`:

```powershell
npm run build
```

3. Serve locally (optional):

```powershell
# install a small static server (if you don't have one)
npm install -g serve
# serve the current directory
serve .
```

4. Deploy to Vercel (interactive):

```powershell
# first time only
npx vercel login
# deploy (follow prompts)
npx vercel
# deploy to production
npx vercel --prod
```

Notes
- `vercel.json` rewrites requests so `/` maps to `pages/index.html` and other routes map to `pages/*.html`.
- I added `tailwindcss` as a dependency and a `build` script that runs the local `tailwindcss` CLI.
- If Vercel build fails with an executable error, make sure Node is available and that `npm install` ran successfully — the Vercel build step runs `npm install` before `npm run build`.

If you want, I can:
- Add `postcss` + `autoprefixer` and a `postcss.config.js` if you need vendor prefixes.
- Move `pages/` files to the repository root and remove `vercel.json` for simpler routing.