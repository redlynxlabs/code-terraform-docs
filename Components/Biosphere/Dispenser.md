---
tags:
  - component
  - biosphere
aliases:
  - dispenser_1
---
# Dispenser

**Salts** the four orthogonally adjacent field cells (directly above, below, left, right) while powered, supplied, and enabled.

**Stats:** Type Biosphere · Power in variable (draws from grid) · Input buffer 50 units

**How to obtain:** The recipe unlocks with the **Dispenser** research (Plants 300,000). Fabricate a Dispenser Kit on a Fabricator: 1× Machine Frame, 1× Control Unit, 1× Circuit Panel. Deploy the kit on an empty field cell with a [[Harvester]]'s `deploy()`.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .set_enabled(enabled) `SELF ONLY`
Command salting on or off. **Power loss pauses the script but preserves this setpoint; stopping the machine script resets it to `False`.**

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .is_enabled()
`True` when the running script has commanded salting on.

**Returns:** Boolean

### .is_active()
`True` when commanded on with power and salt available.

**Returns:** Boolean

### .is_supplied()
`True` when the dispenser is placed, commanded on, powered, and has salt in its buffer. When `False`, covered cells lose `salted` and their plants pause.

**Returns:** Boolean

### .status()
Exact operating state: `"not_placed"`, `"disabled"`, `"no_power"`, `"no_salt"`, or `"active"`.

**Returns:** String

### .buffer()
Fraction of the onboard salt buffer filled (0-1). Drops while dosing; refills through `self.input`. 0 means empty (covered cells lose `salted`).

**Returns:** Number (0-1)

### .tier()
Always 1. The Dispenser ships at Mk I and has no upgrade pack; salt providers don't tier.

**Returns:** Number

### .position()
Grid sector occupied by this dispenser, such as `"E14"`.

**Returns:** String

### .input
[[InputSlot]] for salt: `self.input.connect("Salt Bin")` then `self.input.take("salt", 50)`. Salt is a [[Water Pump]] byproduct.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Sprinkler]] and [[Grow Lamp]]: the other two condition providers
- [[Biosphere Plants]]: which species need salted cells
