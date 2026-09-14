---
tags:
  - component
  - biosphere
aliases:
  - sprinkler_1
title: "Sprinkler"
---

**Waters** the four orthogonally adjacent field cells (directly above, below, left, right) while powered, supplied, and enabled.

**Stats:** Type Biosphere · Power in variable (draws from grid) · Consumes Water, buffer 10 t · Tiers: Mk II, Mk III, Mk IV

**How to obtain:** The recipe unlocks with the **Sprinkler** research (Plants 100,000). Fabricate a Sprinkler Kit on a Fabricator: 1× Machine Frame, 2× Liquid Pipe Segment, 1× Pressure Valve, 2 t Water. Deploy the kit on an empty field cell with a [[Harvester]]'s `deploy()`.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .set_enabled(enabled) `SELF ONLY`
Command watering on or off. **Power loss pauses the script but preserves this setpoint; stopping the machine script resets it to `False`.**

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .is_enabled() / .is_active() / .is_supplied()
Enabled: script has commanded on. Active: commanded on with power and water. Supplied: placed, commanded on, powered, with water in the buffer; when `False`, covered cells lose `watered` and their plants pause.

**Returns:** Boolean

### .status()
Exact operating state: `"not_placed"`, `"disabled"`, `"no_power"`, `"no_water"`, or `"active"`.

**Returns:** String

### .buffer()
Fraction of the onboard water buffer filled (0-1). Drops while watering; refills from the connected `water_in` source. 0 means dry.

**Returns:** Number (0-1)

### .tier()
Deployed tier (1-4). Mk I/II/III/IV provide **1×/2×/4×/8× supported plant output**, draw **5/25/100/500 W**, and consume **2/10/200/1,000 t/h Water** while active. Tier up with a Sprinkler upgrade pack.

**Returns:** Number

### .position()
Grid sector occupied by this sprinkler, such as `"E14"`.

**Returns:** String

### .water_in
[[FluidPort]] water buffer. `connect(...)` with the provider's stable machine id or display name; completed liquid-pipe networks carry water between outposts. **Sharing an outpost with a pipe or tank does not connect it automatically.**

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Grow Lamp]] and [[Dispenser]]: the other condition providers
- [[Water Pump]] / [[Steam Condenser]]: water supply chains
