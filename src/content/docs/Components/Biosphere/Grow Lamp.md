---
tags:
  - component
  - biosphere
aliases:
  - grow_lamp_1
title: "Grow Lamp"
---

**Lights** the four orthogonally adjacent field cells (directly above, below, left, right) while powered and enabled.

**Stats:** Type Biosphere · Power in variable (draws from grid) · Tiers: Mk II, Mk III, Mk IV

**How to obtain:** The recipe unlocks with the **Grow Lamp** research (Plants 500,000). Fabricate a Grow Lamp Kit on a Fabricator: 1× Machine Frame, 2× Circuit Panel, 2× Glass. Deploy the kit on an empty field cell with a [[Harvester]]'s `deploy()`.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .set_enabled(enabled) `SELF ONLY`
Command the lamp on or off. **Power loss pauses the script but preserves this setpoint; stopping the machine script resets it to `False`.**

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .is_enabled() / .is_active() / .is_supplied()
Enabled: script has commanded on. Active: commanded on with power. Supplied: commanded on, powered, and actively lighting; when `False`, covered cells lose `lit` and their plants pause.

**Returns:** Boolean

### .status()
Exact operating state: `"not_placed"`, `"disabled"`, `"no_power"`, or `"active"`.

**Returns:** String

### .tier()
Deployed tier (1-4). Mk I/II/III/IV provide **1×/2×/4×/8× supported plant output** and draw **5/25/100/500 W** while active. Tier up by fabricating and applying a Grow Lamp upgrade pack.

**Returns:** Number

### .position()
Grid sector occupied by this lamp, such as `"E14"`.

**Returns:** String

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Sprinkler]] and [[Dispenser]]: the other condition providers
- [[Biosphere Plants]]: which species need lit cells
