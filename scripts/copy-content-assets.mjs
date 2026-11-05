// Copies the images that sit next to each talk's index.md (posters, figures)
// into public/, so content/seminars/<slug>/poster.png is served at
// /seminars/<slug>/poster.png. Runs before `dev` and `build`.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

for (const kind of ["seminars", "workshops"]) {
  const src = join("content", kind);
  const dest = join("public", kind);
  rmSync(dest, { recursive: true, force: true });
  if (!existsSync(src)) continue;
  for (const slug of readdirSync(src)) {
    const dir = join(src, slug);
    if (slug.startsWith("_") || !statSync(dir).isDirectory()) continue;
    for (const file of readdirSync(dir)) {
      if (file.endsWith(".md")) continue;
      mkdirSync(join(dest, slug), { recursive: true });
      cpSync(join(dir, file), join(dest, slug, file));
    }
  }
}
