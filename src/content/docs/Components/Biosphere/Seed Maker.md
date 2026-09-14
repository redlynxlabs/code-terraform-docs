---
tags:
  - component
  - biosphere
aliases:
  - seed_maker_1
title: "Seed Maker"
---

Combines **three life-form samples into a viable seed**. Most blends fail; the working recipes are unique to this planet and found by trial, and a discovered one can be re-run for more.

**Stats:** Type Biosphere · Power in variable (draws from grid) · Output buffer 1 unit · Stockpile 3 units (mixed)

**How to obtain:** The recipe unlocks with the **Seed Maker** research (Biomass 500). Fabricate a Seed Maker Kit on a Fabricator: 2× Machine Frame, 1× Control Unit, 2× Circuit Panel, 3 t Water. Deploy from Inventory.

**Access:** `self` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .combine(blend) `SELF ONLY`
Run the exact three **different** life-form ids loaded in the reaction chamber, e.g. `["ice_algae", "sea_algae", "vent_algae"]` (order doesn't matter). Every accepted trial consumes the chamber's 1 t of each. The one-seed result bay must be empty first.

**Returns:** `SeedResult` (payload `.seed_id`, `.species`)

| Status | Kind | Meaning |
| --- | --- | --- |
| `"seed_found"` | success | Discovered `.species`, deposited `.seed_id` into the output |
| `"sludge"` | success | The accepted blend produced no seed |
| `"locked"` | rejection | Seed Maker research not unlocked |
| `"busy"` | transient | A trial is already in progress |
| `"missing_life_forms"` | rejection | Chamber lacks exactly the requested three 1 t samples |
| `"output_full"` | rejection | The result bay still holds its one seed |

**Raises:** `ValueError` unless the blend has exactly three distinct, known life-form ids

### .life_forms()
The 30 accepted life-form item ids. Sweep pattern: for each `blend` from `combinations(self.life_forms(), 3)`, load its three items with `self.input.take(item_id, 1)`, call `self.combine(blend)`, and send any resulting seed from `self.output` before continuing. Enumeration does not move materials.

**Returns:** List of strings

### .is_running() / .get_progress()
Whether a combine trial is in flight, and its 0-1 progress (0 when idle).

**Returns:** Boolean / Number

### .get_output_count()
Physical seeds waiting in the single-result bay: 0 or 1.

**Returns:** Number

### .recipes()
Every discovered [[SeedRecipe]]: the same discover-once-kept-forever journal as the Flora / Seed Recipes tab. Each carries `.tier`, `.seed_id`, `.species`, `.blend`, `.requirements`, `.requirement` (compact string), `.growth_time`. `.requirements` is the programmable form: every `PlantRequirement` has `.kind` and optional `.species`, so companion and antagonist entries identify the exact related plant. Re-run a known `.blend` with `combine(...)` to reproduce that seed.

**Returns:** List of `SeedRecipe`

### .input
[[InputSlot]] for the 3 t reaction chamber: exactly 1 t each of three distinct life forms, no stockpiling, duplicates and a fourth sample rejected. Natural source: a local Drone Depot where biological drones unload; a Warehouse, Storage Bin, or home Inventory also works. `combine()` reserves the trio while running; when idle, `eject(...)` recovers a mistaken load, `flush()` destroys it.

### .output
[[OutputSlot]] holding the one physical seed from a successful trial. Send it to home Inventory then the [[Harvester]]'s `load_seed()`, or route it to a [[Crop Automator]]. **No further trial can start until `send(...)` empties the bay.** Sludge produces no item.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[First Biology Loop]]: the discovery workflow
- [[Biosphere Plants]]: what seeds grow into
