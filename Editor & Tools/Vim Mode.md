---
tags:
  - guide
  - editor
---
# Vim Mode

## Overview

Vim mode gives the in-game code editor vim keybindings. Turn it on in **Settings → Editor → Keybindings → Vim**. It is opt-in and affects ONLY the code editor; game menus, the map, and dashboard controls keep their normal keys.

## What works

The editor uses a vim-flavored keymap, so the everyday toolkit is there: normal / insert / visual modes, motions (`h` `j` `k` `l`, `w`, `b`, `e`, `gg`, `G`, `f`, `%`), operators (`d`, `c`, `y`, `p`) with counts and text objects, search (`/`, `?`, `n`, `N`), registers, marks, and undo / redo (`u`, `Ctrl-r`). It is vim-flavored, not a 100% feature-complete vim: most muscle memory carries over, but a few exotic commands and plugins will not.

## Save and quit

These ex-commands are wired to the game's real save and window controls:

- `:w`: save now. Flushes your script to disk immediately (it is auto-saved anyway, so this just makes the reflex real).
- `:wq` / `:x`: save, then close the editor window.
- `:q`: close the editor window. Your work is already saved.

## Bring your own vim

Prefer your actual vim setup? See [[External Editor]]: your scripts live as real files on disk that you can edit in any editor, full vim included, and the game picks up changes live.
