# terraform.wiki

Unofficial field documentation for **Code: Terraform**: every machine API, every object type, every recipe and research threshold, readable outside the game.

Live at **[terraform.wiki](https://terraform.wiki)**. Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) from a plain-Markdown wiki that also opens as an [Obsidian](https://obsidian.md) vault.

```
$ uplink --sync nocturna/docs
> game build ......... 441ad76
> wiki pages ............. 330
> crosslinks ........... 2250+
> broken links ............. 0
> status ........ TERRAFORMING
```

## Reading it

- **Website:** [terraform.wiki](https://terraform.wiki). Sidebar, full-text search (Ctrl+K), dark mode.
- **GitHub:** browse `src/content/docs/`; everything is plain Markdown.
- **Obsidian:** open `src/content/docs/` as a vault. All 2,250+ `[[wiki links]]` and the graph work natively.

New to the game? Start with the [Beginner Roadmap](https://terraform.wiki/start-here/beginner-roadmap/), then [Starter Scripts](https://terraform.wiki/start-here/starter-scripts/) for copy-paste scripts, and [Dashboard Cards](https://terraform.wiki/start-here/dashboard-cards/) for a ready-made Control Room suite.

## Hacking on it

```bash
npm install
npm run dev      # live dev server at localhost:4321
npm run check    # every [[link]] must resolve; no stray unicode dashes
npm run build    # static site -> dist/ (includes the search index)
npm run preview  # serve the real build, search included
```

Content lives in `src/content/docs/` and is written as an Obsidian vault: `[[wiki links]]` (resolved against filenames and frontmatter `aliases` at build time), Obsidian callouts (`> [!tip]`), and YAML frontmatter. The build machinery is four small files in `scripts/`: a shared slug resolver, two remark plugins (wikilinks, callouts), and the link checker. Page URLs come from `cleanSlug()` in `scripts/lib/wiki.mjs`; the wikilink resolver uses the same function, so links can't drift from URLs.

Contributions welcome: fix an error, cover a new game build, add a guide. Run `npm run check` before opening a PR; it must print `OK`.

## Deploying

`npm run deploy` builds and ships `dist/` to the VPS over SSH (edit the host vars at the top of `scripts/deploy.sh`). The Caddy site block and Docker volume notes live in `infra/Caddyfile.terraform.wiki`. CI builds every push with strict link checking; the deploy job in `.github/workflows/deploy.yml` is manual-trigger.

## Rebuilding for a newer game build

The wiki is regenerated from the player-documentation PDF the game exports (text extraction, page rewrite, link check). The PDF itself is deliberately not in this repo; it belongs to the game's developers. To update: extract the new export's text, rewrite what changed, bump the build number here and on `Home.md`, and keep `npm run check` green.

## Status

Unofficial player-made reference. All game content, names, numbers, and mechanics belong to the developers of Code: Terraform. This exists so the docs survive alt-tab.
