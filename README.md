# metu-siam.github.io

Website of the METU SIAM Student Chapter. Next.js (static export), deployed to GitHub Pages by `.github/workflows/pages.yml`.

## Adding a seminar

1. Copy `content/seminars/_template/` to `content/seminars/YYYY-MM-DD-short-name/`.
2. Edit `index.md`: front matter for the details, the body for the abstract (Markdown, `$math$` works).
3. Put `poster.png` (or `.jpg`) and any figures in the same folder.
4. Push to `main`. The site rebuilds itself.

A seminar counts as upcoming until its end time, checked against the reader's clock, so the home page switches from *Next* to *Latest* without a rebuild. `published: false` keeps a draft off the site.

Workshops work the same way in `content/workshops/`. People, links and chapter details are in `content/data/*.yml`.

## Local preview

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

## Design

Tokens, type and motion rules are in `design-system/metu-siam/MASTER.md` (generated with UI UX Pro Max, palette adjusted to the logo blue). Colours live in `app/globals.css`; every text pair is at least 4.5:1 in both themes. Animations respect `prefers-reduced-motion`.
