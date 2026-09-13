---
tags:
  - guide
  - editor
---
# Debug Mode

Debug mode adds breakpoints, uncaught-exception pauses, three-mode stepping, conditional breakpoints, logpoints, and a live variable watch panel to any script. It's off by default: toggle the ⊕ **Debug** button in the editor's title bar to turn it on.

## What Debug mode gives you

- A **breakpoint gutter** that lets you click any line to pause execution there
- A **Watch panel** on the right showing current values of all local variables
- **Step Over**, **Step Into**, **Step Out**, and **Continue** controls when the script is halted
- A **Call Stack** section for jumping between function frames and inspecting each frame's locals
- A persistent **breakpoint list** in the Watch panel for jumping between breakpoints and editing their conditions / log messages

## Setting breakpoints

Click a line number's left gutter. A red dot appears on that line; the same line also shows up in the **Breakpoints** section of the Watch panel. Click the gutter again to remove, or click the × next to it in the Watch panel.

Breakpoints persist when you toggle Debug off and on, and across game sessions. The Debug button shows a small dot when dormant breakpoints exist on a script that isn't in debug mode.

## Conditional breakpoints and logpoints

Click the ⋯ button next to a breakpoint in the Watch panel to edit it.

- **Condition**: a read-only Python expression. If set, the breakpoint halts **only when the condition is truthy**. Use variables, attributes, indexes, and arithmetic; function and method calls are blocked so debug expressions can never change the game. Example: `heat > 80`.
- **Log message**: a template with read-only `{expr}` placeholders. If set, the breakpoint **prints the message to the console and keeps running** instead of pausing. Like sprinkling `print()` without editing the script. `scan hit: {site.id}` prints the current site id on every hit.

You can combine them: a condition plus log message will log only when the condition matches.

Breakpoint color cues: red = plain, yellow = conditional, accent = logpoint.

## When execution halts

A breakpoint pauses **before** the marked line runs. An **uncaught exception** pauses on the line that failed and shows the error message. In both cases the line gets an orange highlight. The Watch panel shows:

- **Paused at line N** or **Paused on exception at line N** header with debugger controls
- **Local variables** for the selected call-stack frame; dicts, lists, tuples, and sets show compact previews first and expand on click
- **Call Stack** rows you can click to jump to that frame and inspect that frame's locals
- **Breakpoints** list with jump-to, edit, and remove controls

## Step Over / Into / Out

Three step modes, following the industry standard:

- **Over (↴)**: runs the next statement. If it contains a function call, the call runs atomically (doesn't descend). Most-used step.
- **Into (↡)**: descends into the next function call. Stops on the first statement inside. Use when you want to debug a helper function.
- **Out (↥)**: runs until the current function returns. Use when you stepped Into something boring and want to bail back to the caller.
- **Continue (⏵)**: resumes until the next breakpoint or completion. From an uncaught exception pause, Continue lets the script fail normally and clears it.

## The world keeps running

Breakpoints and exception pauses pause **only the debugged script**. Everything else continues:

- The clock keeps ticking
- Other scripts on other machines keep running
- Atmosphere, power, and all systems tick normally
- The machine controlled by the paused script keeps its last-commanded state while paused. If the script errors, stops, or completes, script-owned controls reset; Rover, Pioneer, and Drone movement cancels.

> [!warning]
> Time spent stepping through code advances the game world. If you're debugging a solar tracker and take two minutes to inspect variables, the sun has moved in that time. For scripts with strict timing, factor this in.

## Inspecting variables

The Watch panel updates live every tick when the script is running, or freezes at the current values when the script is halted.

- Numbers, strings, booleans show their values directly
- Dicts, lists, tuples, and sets show their size plus a shallow preview; nested values are abbreviated until expanded
- Small objects may show a short field preview; larger objects show their type first and expand on click
- The current line number is shown at the bottom of the panel

## Pinned watch values are optional

You do not need to pin anything to inspect the current frame. When the script pauses, Local variables and Call Stack update automatically. Use **+ Pin** in Watch only when you want to keep a custom value or calculation visible across steps, such as `co2 / 10`, `self.waste()`, or `atmo.get_co2()`.

The Watch panel samples variables at the script's last suspension point. For a script with `sleep(1)` at the end of each loop, that's the value at the moment `sleep()` was called. For a tight loop with no deliberate pauses, it's wherever the tick's step limit tripped.

## Isolation guarantee

Debug mode is a read-only-plus-pause tool. Enabling Debug on one script **cannot affect another script's behavior**. Breakpoints, exception pauses, step state, and watch inspection are stored per-script: turning debug on a heater script has zero impact on an oxygen generator script running in parallel.

## See also

- [[Code Editor]]: the Trace control is a lighter-weight alternative
- [[Reading Errors and Console Output]]: the console side of debugging
