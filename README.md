# HealthAura, an AI-Solution Designed for the Pharma Industry

## Run locally

- Install: `npm.cmd install`
- Dev server: `npm.cmd run dev`
- Production preview: `npm.cmd run build` then `npm.cmd run preview`

## Deploy (fixes missing assets / MIME errors)

This app is built with Vite and uses ES modules. If the deployed site shows:

- `Failed to load module script... MIME type "application/octet-stream"`
- `/healthora-favicon.png` returning `404`

it usually means the site was deployed under a sub-path (like GitHub Pages) but the build was produced for `/`.

### Custom domain at root (e.g. https://healthauras.com)

- Build: `npm.cmd run build`
- Upload: **copy the contents of `dist/`** to your hosting root.

### GitHub Pages (repo sub-path)

If your URL looks like `https://<user>.github.io/nova-health-ai/`:

- Build: `npm.cmd run build:ghpages`
- Upload/deploy the contents of `dist/`.
