---
tags:
  - guide
  - editor
title: "Code Editor"
---

Each machine with a script slot has a code editor window. Open it by clicking **MANAGE** on the machine card.

## Tabs

- **Info**: task description, what this script should do
- **Code**: write your code here
- **Variants**: named versions you can reuse on matching machines (see below)
- **Notes**: free-text scratchpad for your own notes

## Title bar controls

- ▶ **Run** (`Shift+Enter`): execute the active variant
- ⏸ **Pause** (`F6`): pause or resume a running script
- ■ **Stop** (`Shift+F5`): stop the script completely and reset script-owned controls. Rover, Pioneer, and Drone movement cancels immediately.
- ∹ **Trace**: highlight where the script is parked each tick. A green bar marks the "resting" line, where execution was when the most recent tick ended. Honest about suspension points (for scripts with `sleep()` or `scan()`) and where the step limit tripped (for tight loops).
- ⊕ **Debug**: enable breakpoints, stepping, and the variable watch panel. See [[Debug Mode]] for the full flow. Off by default.
- 🔍 **Find**: search and replace within the script (`Ctrl+F`).

## Bottom bar

- **Duplicate Variant**: save the current code as a new named variant
- 🔊 **Mute**: mute this script's console output. Text gets a strikethrough when muted. Muted scripts don't print to the console; errors still show. Useful for silencing background scripts you're not actively working on.
- ⊞ **Dock**: switch to an IDE-style layout. The editor pins to the left, the console docks to the bottom-right, and the dashboard fills the remaining space. The sidebar hides automatically to maximize content area. Drag the dividers between panels to resize. Your dock layout is remembered between sessions. Click **Undock** to return to floating windows.
- ⤓ **Auto-min**: when enabled (green), the editor minimizes automatically when you run the script. Useful for watching the dashboard while your code executes.

## Navigating from code to DOCS

The editor can jump straight to matching DOCS entries while you write:

- **Hover over any method or function name**: a tooltip shows the signature, a one-line description, and the return type. Works on `self.X`, `self.X.Y`, top-level API calls (`get_component`, `sleep`, `print`), builtins (`len`, `range`, etc.), component methods accessed via `get_component(id).method`, and user-defined functions with docstrings.
- **`Cmd+click` (macOS) / `Ctrl+click` (Windows/Linux) on any method, function, component id, or variable**: opens DOCS and jumps directly to that entry, with the specific method highlighted for a second or two so you can see exactly where you landed. Works like "Go to Definition" in a professional IDE, but the target is the DOCS page since the game APIs don't have a source file.
- **Autocomplete as you type** (`Ctrl+Space` to force it): suggestions are type-aware. After `self.` you'll see only the methods and sub-objects available on your machine. After `self.battery.` you'll see only the Battery sub-object's API. String arguments offer known-valid values (component ids, bin names, mineral ids) where available.
- **Parameter hints inside `(...)`**: as you type `self.drill.mine(`, a hint shows each parameter's name, type, and description.
- **`F2` to rename** a symbol (variable, user function, parameter). Renames every whole-word occurrence in the current script, skipping strings and comments. Reserved names (keywords, `self`, builtins) can't be renamed.

Hover for signatures. Cmd/Ctrl+click opens the matching DOCS entry without leaving the editor.

## Commands tab

While a script runs, its Commands tab lets you send named commands with JSON arguments into the script's command mailbox: your script reads them with `self.next_command()` and decides how to react. Frequent commands can be saved as presets. See [[Script Commands]] for the full pattern.

## Variants

Named variants use layered catalogs. Exact-type variants belong to one precise machine type; compatible-family variants are shared only across tiers with the same scripting contract. Main is this machine's own fallback code and is never shared. Editing in the Code tab saves changes to the active variant. Changes to Main stay with this script; changes to a named variant update its shared catalog entry. Other scripts keep their loaded copies until you explicitly update them. Use **Duplicate Variant** to publish the current code as a new named variant and choose its scope when a compatible family exists. Click **Use** to load a catalog variant onto this machine. **Apply to all** copies the selected catalog version to either the exact type or every compatible family tier, according to the section that owns the variant, and always requires the same script slot. Main cannot be deleted.

> [!tip]
> Add a top-of-file `"""docstring"""` or first-line `#` comment and it will show as the variant's description. Open [[Docstrings]] for function hover docs and supported formatting.

See [[Script Variants]] for the full variant model.

## Saving

Your scripts auto-save every **30 seconds**. Press `Ctrl+S` to save and flush the current source immediately. All editor shortcuts, including undo, redo, comments, search, and run, can be changed in Settings → Keybinds.

Scripts run continuously if they contain a `while True:` loop. Otherwise they run once and complete.

## Reload behavior

A script saved as running starts again from the top when you load the game. Its local variables and current line are not restored. A paused script stays paused but also starts from the top when you resume it after loading; a stopped script stays stopped. Persistent world state and machine work remain where they were, so check current cargo, storage, and machine state before repeating actions. Use the [[Data Archive Guide|Data Archive]] for script progress that must survive reloads. See [[Long-Running Scripts]].

The console window shows output from all unmuted scripts. Use **CLEAR** to empty it and **AUTO-SCROLL** to follow new output.

## See also

- [[Vim Mode]] · [[Keyboard Shortcuts]] · [[External Editor]] · [[Control Room]]
