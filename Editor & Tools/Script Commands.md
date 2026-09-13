---
tags:
  - guide
  - editor
---
# Script Commands

## Overview

Every machine script has a **command mailbox**: a small queue of named commands you send by hand while the script runs. Commands let you steer a running script without editing it: the script keeps its own logic and decides how to handle each request.

This is the player-to-script channel. For script-to-script coordination, use the [[Signal Bus Guide|Signal Bus]] instead.

## Saving reusable commands

Open a script's **Commands** tab. Add a command with a **Name** (the button label), a **Command id** (what your code checks for), and any arguments as simple key/value fields, no JSON.

Choose the command's **Availability**:

- **All machines of this type** makes the definition available on current and future machines of the same exact type.
- **All compatible family machines** appears when the machine registry declares a compatible family. It shares the definition across that family.
- **Only this machine** keeps instance-specific coordinates, target ids, or other one-off data local.

Then **Send** it once, or **Save** it as a reusable one-click command. Existing local commands have a **Share** action that moves them into an exact-type or compatible-family collection. Shared edits and deletion affect every matching machine.

A saved definition is reusable, but execution is always local: Send queues a fresh message only on the machine whose Commands tab is open. Pending queues and recent history are never copied or broadcast. They remain per machine.

Commands are defined in the tab, not in your script, and they do not belong to a script variant. Switching or copying a variant does not duplicate command definitions. Each machine's mailbox holds up to **40** pending commands; further sends are rejected until the script consumes or clears some.

## Reading commands in your script

Four methods are available on `self` in every machine script:

- `self.next_command()` consumes the oldest command and returns a [[CommandResult]]. `.status` is `"ok"` with the command in `.command`, or `"empty"` with `.command is None`.
- `self.peek_command()` reads the next [[ScriptCommand]] without consuming it, or `None` when the mailbox is empty.
- `self.command_count()` reports how many commands are waiting.
- `self.clear_commands()` drops everything and returns a [[CountResult]]; `.count` is exactly how many commands were removed.

A consumed command is a [[ScriptCommand]] in `CommandResult.command`, with `.name` (a string; your script decides what each name means) and `.args` (a dict; use `.args.get(key, default)` for optional arguments).

```python
while True:
  next_result = self.next_command()
  if next_result.status == "ok":
    cmd = next_result.command
    if cmd.name == "goto":
      self.nav.set_target(cmd.args["x"], cmd.args["y"])
      self.nav.set_throttle(0.6)
    elif cmd.name == "stop":
      self.nav.brake()
```

Commands are requests, not remote control. A script that never calls `next_command()` ignores its mailbox. Handling commands is part of the script's design, and unknown names should be ignored or reported with `print()`.

## Commands vs Signal Bus

- **Command mailbox**: you (the player) to one machine script, from the editor. Best for manual steering, testing a mode, or one-off orders.
- **Signal Bus** (`get_component("comms")`): script to script, on named channels. Best for automation that coordinates machines while you are away from the keyboard.
