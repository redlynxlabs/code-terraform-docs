---
tags:
  - component
  - production-storage
aliases:
  - fuel_assembler_1
---
# Fuel Assembler

Presses Raw Uranium and lead plates into **Fuel Rods** or **Nuclear Batteries**, working like the [[Fabricator]]. It draws heavy recipe power while running, so it is best run in bursts when your lightning banks are full.

**Stats:** Power in variable · Output buffer 5 · Stockpile 40 (mixed) · Recipes 2 available

**How to obtain:** Requires the **Fuel Assembler** research (Temperature 10,000). Buy from the Shop for 225,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .list_recipes()
Unlocked recipes this machine can run, including each recipe's derived `.tier`. The Fuel Rod recipe arrives through Vestibule's queue; the Nuclear Battery recipe arrives through Helios's queue.

**Returns:** List of unlocked [[Recipe]] entries

### .find_recipe(recipe_id)
Find one unlocked fuel recipe by id. Returns its `Recipe` object, or `None`.

**Returns:** `Recipe` or `None`

### .set_recipe(recipe_or_id) `SELF ONLY`
Select a Fuel Rod or Nuclear Battery recipe by id or by passing a Recipe from `list_recipes()`.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"unknown_recipe"` / `"recipe_locked"` / `"offline"` (transient) / `"busy"` (transient) / `"material_mismatch"`

### .clear_recipe() `SELF ONLY`
Release the recipe once the current craft is idle and the output buffer is drained.

**Returns:** ActionResult · Outcomes: `"ok"` / `"busy"` / `"material_present"`

### .get_recipe()
The committed recipe id: `""`, `"craft_fuel_rod"`, or `"craft_nuclear_battery"`.

**Returns:** String

### .get_recipe_inputs()
Input requirements for the committed recipe as `{item_id: count_per_craft}`. Empty dict when none.

**Returns:** Dict

### .is_running()
`True` while a craft is actually advancing: power, inputs, and output space all present.

**Returns:** Boolean

### .get_progress()
Current craft progress 0-1. **Progress survives power cuts and resumes.**

**Returns:** Number (0-1)

### .get_stockpile()
Staged inputs by item id, a `{"raw_uranium": 12, "lead_plate": 4}`-shaped dict.

**Returns:** Dict

### .get_output_count()
Finished products for the selected recipe waiting in the small output buffer.

**Returns:** Number

### .input
Receives **Raw Uranium only from a [[Lead Cask]]** and lead plates from an ordinary compatible local source. The port has one source relationship at a time, so reconnect it between materials. While idle, recover ordinary items to local freight and hot cargo to a compatible Lead Cask with `eject(...)`.

**Returns:** [[InputSlot]]

### .output
Output port. **Fuel Rods are hot** and only a Lead Cask (or their exact Supply Dock order) accepts them. Nuclear Batteries are ordinary fabricated products and may go to compatible local storage or home Inventory.

**Returns:** [[OutputSlot]]

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Reactor]]: what Fuel Rods power
- [[Lead Cask]]: the required hot-cargo container
- [[Weather System]]: where Raw Uranium comes from
