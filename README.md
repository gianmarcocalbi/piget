# pidget

Static Astro site for showcasing AI generated music.

## Stack

- Astro static site generation
- TypeScript with strict configuration
- React 19 islands via `@astrojs/react`
- Tailwind CSS v4 via `@tailwindcss/vite`
- pnpm
- ESLint 10 with `typescript-eslint` and `eslint-plugin-unused-imports`
- Prettier 3
- `@astrojs/sitemap`
- GitHub Pages deployment via GitHub Actions

## Getting started

```bash
pnpm install
pnpm dev
```

## Checks

```bash
pnpm check
pnpm lint
pnpm format:check
```

## Build

```bash
pnpm build
pnpm preview
```

## Content workflow

- Global site and platform configuration lives in `src/data/site.yaml`.
- Songs live in `src/content/songs/*.md`.
- Each song file defines title, summary, order, hero image, streaming URLs, and lyrics in frontmatter.
- The markdown body of each song file is used for the song explanation section.

## Assets

- Homepage background: `public/images/home/ghost-album-background.svg`
- About avatar: `public/images/about/pidget-avatar.svg`
- Song artwork placeholders: `public/images/songs/`

Replace those placeholder files with your final images while keeping the same paths, or update the paths in `src/data/site.yaml` and the song content files.

## GitHub Pages

The project is currently configured as a GitHub Pages project site, using the repository path as the base URL:

- site: `https://gianmarcocalbi.github.io`
- base: `/pidget`

Before the deployment workflow can succeed, enable GitHub Pages once in the repository settings:

1. Open the repository on GitHub.
2. Go to Settings > Pages.
3. Under Build and deployment, set Source to GitHub Actions.

The workflow token can deploy to an existing Pages site, but it cannot create the Pages site automatically for this repository.

If you move to a custom domain later, update the Astro site and base settings in `astro.config.mjs` and add a `CNAME` file under `public/`.
