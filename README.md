# code-terraform-docs

Offline field documentation for **Code: Terraform**, rebuilt from the in-game player docs as a heavily crosslinked [Obsidian](https://obsidian.md) vault.

```
$ uplink --sync nocturna/docs
> game build ......... 441ad76
> wiki pages ............. 330
> crosslinks ........... 2250+
> broken links ............. 0
> status ........ TERRAFORMING
```

The game drops you on the frozen planet Nocturna with a terminal and a Python dialect; every machine runs on scripts you write. This vault is the API reference, the tutorials, and the cheat sheets for that job, readable outside the game and searchable at alt-tab speed.

## Quick start

1. Clone.
2. Obsidian: **Open folder as vault**.
3. Start at [Home](Home.md).

Everything is plain Markdown, so browsing on GitHub works too. Obsidian just makes the `[[wiki links]]` clickable and draws the graph.

## Map

| Path | Contents |
| --- | --- |
| `Start Here/` | orientation: the roadmap, starter scripts, dashboard suite, the result model |
| `Tutorials/` | hands-on walkthroughs, first credits through expanding production |
| `Programming/` | the game's Python dialect, topic by topic |
| `Language/` | condensed language reference |
| `Built-in Modules/` | `random`, `re`, `functools`, `dataclasses` |
| `Editor & Tools/` | editor, debug mode, vim mode, script variants, Control Room |
| `Automation Systems/` | contracts, Earth orders, Signal Bus, drones, map markers |
| `Production & Logistics/` | item ports, storage, batteries and charging |
| `World & Infrastructure/` | fluids, pipes, power grids, weather, biosphere, wildlife |
| `Components/` | every machine API, one page each, grouped like the in-game docs |
| `Types/` | every API object type, including all 15 contract puzzles |
| `Database/` | recipe tables, equipment catalogs, items, fluids, research thresholds |
| `Commands/`, `Reference/` | top-level functions, built-ins, the component model |

## New to the game?

Three pages carry you from wake-up to endgame:

- [Beginner Roadmap](Start%20Here/Beginner%20Roadmap.md): the whole game in seven phases
- [Starter Scripts](Start%20Here/Starter%20Scripts.md): copy-paste scripts for every early machine, commented line by line for non-programmers
- [Dashboard Cards](Start%20Here/Dashboard%20Cards.md): a ready-made Control Room monitoring suite

And the one doctrine that explains every API in the game: **branch on `result.status`, never on `result.message`**. See [Command Results](Start%20Here/Command%20Results.md).

## House rules

Conventions the whole vault follows, useful if you extend it:

- One page per machine and per type. Frontmatter `aliases` carry component ids (`o2gen_1`) and API type names (`NavModule`), so links resolve the same way scripts read.
- `SELF ONLY` methods are flagged in their headings: they only run on that machine's own script slot.
- Outcome tables enumerate every documented `.status` code. Messages are never load-bearing.
- Tables over prose for anything enumerable. No em dashes, anywhere.
- A commit should leave the checker at zero: every `[[link]]` resolves against filenames plus aliases.

## Rebuilding for a newer game build

The vault is regenerated from the player-documentation PDF the game exports (text extraction, page rewrite, link check). The PDF itself is deliberately not in this repo; it belongs to the game's developers. To update: drop the new export next to the vault, rewrite what changed, bump the build number here and on `Home.md`, and keep broken links at zero.

## Status

Unofficial player-made reference. All game content, names, numbers, and mechanics belong to the developers of Code: Terraform. This exists so the docs survive alt-tab.
