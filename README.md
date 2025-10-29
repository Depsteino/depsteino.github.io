# GitHub Pages React Starter

A ready-to-deploy Vite + React project that renders a hero banner atop a modern, animated space backdrop with shimmering stars. The build output is static and works seamlessly with GitHub Pages.

## Getting Started

> **Node.js 18+ required** — Vite 5 needs Node 18 or newer. Check your version with `node -v` and upgrade (e.g., `nvm install 20 && nvm use 20`) if needed.

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:5173](http://localhost:5173). Edit files under `src/` and Vite will hot-reload your changes.

## Deploying to GitHub Pages

1. Build the site:
   ```bash
   GITHUB_PAGES_BASE=/your-repo-name/ npm run build
   ```
   - When deploying to `your-username.github.io`, set `GITHUB_PAGES_BASE=/`.
   - For project pages (`your-username.github.io/your-repo-name`), make sure the value matches `/your-repo-name/`.
   - Windows (PowerShell): ```powershell
     $env:GITHUB_PAGES_BASE = "/your-repo-name/"
     npm run build
     ```
   - Alternatively, hardcode the `base` option in `vite.config.ts`.
2. Push the `dist` folder to the `gh-pages` branch:
   ```bash
   GITHUB_PAGES_BASE=/your-repo-name/ npm run deploy
   ```
   The `deploy` script rebuilds the site and publishes `dist` with the [`gh-pages`](https://github.com/tschaub/gh-pages) CLI.

If you need an automated workflow, add a GitHub Actions workflow that runs `npm ci`, `npm run build`, and `npm run deploy`.

## Project Structure

- `index.html` – Vite entry point loading the React application.
- `src/App.tsx` – Hero component with a layered starfield backdrop.
- `src/App.css` – Styles and animations for the hero section.
- `src/index.css` – Global styles and font imports.
- `vite.config.ts` – Vite configuration with GitHub Pages `base` support.
- `public/.nojekyll` – Disables Jekyll processing on GitHub Pages so modern build output serves untouched.

## Customizing

- Update the hero copy in `src/App.tsx`.
- Replace or tweak the CSS in `src/App.css` to adjust the animation colors and timings.
- Replace `/public/profilepic.jpeg` with your own headshot to update both the hero avatar and the experience portrait.
- Fine-tune the starfield shimmer or parallax effect inside the `.space` rules in `src/App.css`.
- Update the `timeline` data array in `src/App.tsx` to reflect your real roles, dates, and accomplishments.
- Point each timeline item to its own image (and accent color) to change the portrait automatically on hover.
- Toggle the `OPEN_FOR_WORK` constant in `src/App.tsx` if you want to disable the animated “Open for Work” badge around the avatar.
- Use the Tech Stack toggle on the card to flip between resume details and the stack; adjust the `techStack` array in `src/App.tsx` to change the tools shown.
- Adjust the `translations` map in `src/App.tsx` to localize copy and add more language options for the selector.
- Add more React components under `src/` as your project grows.
