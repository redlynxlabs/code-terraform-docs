---
tags:
  - guide
  - editor
---
# External Editor

Your scripts are saved as `.py` files on disk. You can edit them in any text editor: VS Code, Sublime, Notepad++, or anything else.

Changes sync **live** in both directions, while the game is running:

- Edit in-game: the file updates on disk within about half a second
- Edit externally: the game picks up your save within ~250ms and the in-game editor's buffer refreshes (cursor preserved as best it can)

## Where the files live

Scripts for an active save sit in a folder named `<save_id>_scripts/` under your platform's app-data directory:

| Platform | Path |
| --- | --- |
| Windows | `%APPDATA%\io.codeterraform.game\<save_id>_scripts\` |
| macOS | `~/Library/Application Support/io.codeterraform.game/<save_id>_scripts/` |
| Linux | `$XDG_DATA_HOME/io.codeterraform.game/<save_id>_scripts/` or `~/.local/share/io.codeterraform.game/<save_id>_scripts/` |

`<save_id>` is auto-generated when you first create the save (something like `save_lk2j8x_a1b2c3`). It matches the `.json` save file beside the script folder; if you are unsure, sort the app-data folder by modified time and use the newest `save_..._scripts/` folder for the save you just opened.

Each machine or panel script uses the same filename shown in the in-game editor, such as `o2gen_1.py`, `solar_1.py`, or `rover_1.py`. Library scripts live in a `lib/` subfolder, named normally: a library called `sensors` is `lib/sensors.py`. The `.py` file contains only code; `codeterraform-scripts.json` is a small sync manifest that tracks safe filename aliases after renames. Files that used older generated names, such as `oxygen_gen_1.py`, remain tracked as safe aliases after migration; use the canonical id-named file going forward.

## Editor stubs

The scripts folder also includes generated `.pyi` stubs for the game API: component ids, signatures, return types, and docs text from the same registry that powers in-game DOCS and autocomplete. They refresh to match the current build each time the folder syncs, and are safe to delete (the game recreates them).

`user_stubs.py` is yours and is never overwritten. Use it for external-editor-only type aliases and type declarations, and import those names explicitly in player scripts. Put executable helpers in an in-game Library. `pyrightconfig.json` is the editor import config. It is created when missing; every existing copy is treated as player-owned and preserved unchanged. Add newly required settings manually if you keep an older config. Settings → Editor → External Editor has a **Freeze stubs** toggle (stop auto-updating the generated stubs so your manual edits stay) and a **Regenerate Stubs** button (force a fresh copy from the current build).

## Editor support

Autocomplete, type-checking, and `import` resolution come from **Pyright**, the type checker the generated stubs target.

- **VS Code**: install the official Python extension. It bundles Pylance (which is Pyright), so everything works automatically; nothing to set up.
- **Other editors** (Neovim, Sublime, Emacs, Helix, ...): add the `pyright` language server (`pip install pyright` or `npm i -g pyright`) and point your editor's LSP at it.
- **PyCharm**: uses its own checker and won't read `pyrightconfig.json`; right-click the `lib/` folder → Mark Directory as → Sources Root so library imports resolve.

Your scripts run in-game no matter which editor you use. Pyright adds inline help from the generated stubs. Open the `<save_id>_scripts/` folder as your workspace so the editor finds `pyrightconfig.json`; that is what lets `import sensors` resolve to `lib/sensors.py` with no `lib.` prefix.

## Console log files

Settings → Editor → External Editor can mirror visible console output into `<save_id>_scripts/logs/`. `all.log` contains the combined console stream; script-specific files such as `rover_1.log` contain only that script's output. Logs append while the game runs and rotate by size, so noisy print loops do not grow forever. Use **Clear Logs** in settings when you want a fresh external transcript.

## When edits collide

If an external edit collides with a dirty in-game buffer, the game first saves BOTH sources as distinct named recovery variants. It then asks you to choose **Use External** or **Keep In-Game** for the active source. Neither side is silently discarded: the version you do not activate remains available in the Variants tab. If both recovery variants cannot be created, the editor stays locked and no version is chosen. Free a variant slot if needed, then save the external file again to retry. A clean in-game buffer accepts an external change normally.

## Use cases

- Use an external editor with full IDE features
- Version-control your scripts with git
- Share scripts with other players
- Write longer, more complex programs comfortably
