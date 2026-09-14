---
tags:
  - component
  - production-storage
aliases:
  - mining_drill_1
title: "Mining Drill"
---

Mk I static drill for **hardness-1** deposits: **25 t/h** at standard purity and 10 W while extracting.

**Stats:** Built on Mineral sites · Power in -10 W · Stockpile 2,000 (mixed)

**How to obtain:** The recipe unlocks when you complete Helios, Cargo Pod Run. Requires the **Basic Drone Operations** research (Terraform Index 180,000). Fabricate a Mining Drill Kit on a Fabricator: 3× Machine Frame, 1× Control Unit, 1× Circuit Panel, 2 t Water. Build it on a mineral site with a Pioneer's Constructor.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .drill_rate()
Mineral extraction rate in t/h right now: the full rate while drilling, and 0 whenever the drill is powered off, has no deposit under it, cannot cut the deposit's hardness, or its stockpile is full. Adjusted for site purity and drill tier.

**Returns:** Number (t/h)

### .output
[[PickupOutputSlot]] exposing the Drill's stockpile through `count()`, `capacity()`, and `stacks()`. A physically present Rover or Pioneer pulls through its own input; a drone flies with `go_to_drill()` and loads with `cargo.load()`. The Drill has no direct item-routing methods.

**Returns:** `PickupOutputSlot`

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Drill Module]]: the vehicle-mounted mobile alternative
- [[MiningSite]]: the site type this deploys onto
- [[Mining Equipment]]: higher drill tiers in the Database
