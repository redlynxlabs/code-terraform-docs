---
tags:
  - component
  - production-storage
aliases:
  - smelter_1
---
# Smelter

Refines raw ore into metal stock, one unit at a time, following a recipe you choose. A script sets the recipe, feeds ore in from a bin, and drains the finished metal out to another.

**Stats:** Power in variable · Input buffer 50 · Output buffer 50 · Recipes 7 available

**How to obtain:** Requires the **Ore Refinement** research (Oxygen 5). Buy from the Shop for 650 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .list_recipes()
Every recipe this smelter has been given a blueprint for. Returns [[Recipe]] objects with `.tier`, `.id`, `.name`, `.inputs`, `.output_item`, `.output_count`, `.duration_game_hours`, and `.power_draw`. Locked recipes do not appear. Day-1 starts with `"smelt_iron_ingot"` only; more arrive as blueprints unlock.

**Returns:** List of unlocked Recipe objects

### .find_recipe(recipe_id)
Find one unlocked recipe by id. Returns its `Recipe` object, or `None`.

**Returns:** `Recipe` or `None`

### .set_recipe(recipe_or_id) `SELF ONLY`
Select which recipe the smelter should run. Call `self.set_recipe("smelt_iron_ingot")` or pass a Recipe from `list_recipes()`.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"unknown_recipe"` / `"offline"` (transient) / `"recipe_locked"` / `"busy"` (transient) / `"material_mismatch"`

### .clear_recipe() `SELF ONLY`
Unset the current recipe and leave the smelter idle. Empty latched buffers clear back to no material.

**Returns:** ActionResult · Outcomes: `"ok"` / `"busy"` / `"material_present"`

### .get_recipe()
Current recipe id, or the empty string if none set. The seven recipes: `"smelt_iron_ingot"`, `"smelt_glass"`, `"smelt_titanium_ingot"`, `"smelt_cobalt_ingot"`, `"smelt_rare_earth_core"`, `"smelt_neutronium_bar"`, `"smelt_lead_ingot"`.

**Returns:** String

### .get_recipe_inputs()
Input requirements for the current recipe as a dict `{item_id: count_per_craft}`. Empty dict if no recipe is set.

**Returns:** Dict

### .is_running()
`True` while the smelter is actively processing a unit. Use before `set_recipe()` to avoid the `"busy"` rejection.

**Returns:** Boolean

### .get_progress()
Progress toward the next completed unit (0-1). Resets to 0 when a unit completes and a new one starts.

**Returns:** Number (0-1)

### .get_input_count() / .get_output_count()
Units currently in the input buffer waiting to be smelted / in the output buffer waiting to be drained.

**Returns:** Number

### .input
Loads ore into the Smelter. At home it can use Inventory; remote Smelters must connect a local Storage Bin or Warehouse. Pull material with `self.input.take(item_id, count)`. Failed transfers leave the source cargo unchanged. Requires **Auto Feeders** research. See [[InputSlot]].

### .output
Sends refined material out of the Smelter. At home it can use Inventory; remote Smelters must connect a local Storage Bin or Warehouse. Send material with `self.output.send(item_id, count)`. Failed transfers leave the output unchanged. See [[OutputSlot]].

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Refinement & Storage]]: the full pipeline guide
- [[Smelter Recipes]]: the full recipe table in the Database
