---
tags:
  - component
  - production-storage
aliases:
  - fabricator_1
---
# Fabricator

Assembles finished parts from several refined materials at once. A script picks a recipe, gathers each ingredient into its shared stockpile, and drains the finished items out.

**Stats:** Power in variable · Steam/Water/Oil buffers 10 t each · Output buffer 20 · Byproduct buffer 20 · Stockpile 200 (mixed) · Recipes 69 available

**How to obtain:** Requires the **Fabrication** research (Terraform Index 130,000). Buy from the Shop for 1,400 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .list_recipes()
Every recipe this fabricator has been given a blueprint for. Returns [[Recipe]] objects with `.tier`, `.id`, `.name`, `.inputs`, `.output_item`, `.output_count`, `.duration_game_hours`, `.power_draw`, `.fluid_inputs` (tons consumed per run), and optional byproduct fields. Locked recipes (no blueprint yet) do not appear: the list reflects what the player can actually craft today. `sorted(self.list_recipes(), key=lambda recipe: recipe.tier)` orders the available queue from foundations upward.

**Returns:** List of unlocked Recipe objects

### .find_recipe(recipe_id)
Find one unlocked recipe by id without looping through `list_recipes()`. Returns its `Recipe` object, or `None` when the id is unknown, locked, or belongs to another machine.

**Returns:** `Recipe` or `None`

### .set_recipe(recipe_or_id) `SELF ONLY`
Select which recipe to assemble: `self.set_recipe("craft_gas_pipe_segment")`, or pass a Recipe from `list_recipes()`. Setting a recipe doesn't clear the stockpile, so leftovers from a previous recipe stay until consumed or `self.input.flush()` discards them.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"unknown_recipe"` / `"offline"` (transient) / `"recipe_locked"` / `"busy"` (transient) / `"material_mismatch"`

### .clear_recipe() `SELF ONLY`
Unset the selected recipe and leave the Fabricator idle. The input stockpile is preserved because it is general staged material, not the selected recipe.

**Returns:** ActionResult · Outcomes: `"ok"` / `"busy"` / `"material_present"`

### .get_recipe()
Current recipe id as a string, or the empty string if no recipe is set. The 69 recipe ids span pipes and bridges (`craft_gas_pipe_segment`, `craft_liquid_pipe_segment`, `craft_power_line_segment`, the three bridge kits), core components (`craft_machine_frame`, `craft_circuit_panel`, `craft_control_unit`, `craft_battery_cell`, `craft_pressure_valve`, `craft_turbine_rotor`, `craft_tank_lining`), kits (`craft_thermal_cap_kit`, `craft_water_pump`, `craft_oil_pump`, drone station kits, mining drill kits, `craft_seed_maker_kit`, `craft_plant_terraformer_kit`, `craft_grow_lamp_kit`, `craft_sprinkler_kit`, `craft_dispenser_kit`, `craft_garbage_disposal_kit`, `craft_exotic_gas_cap_kit`, `craft_exotic_spring_tap_kit`, `craft_lead_cask`, `craft_lightning_rod_kit`), oil products (`craft_lubricant`, `craft_plastic`, `craft_rubber`, `craft_tar`), drone hardware (chassis sizes, thrusters, cargo pods, battery pack, oil tanks), advanced materials (`craft_reinforced_biopolymer`, `craft_enrichment_compound`, `craft_coolant_loop`, `craft_neutron_capacitor`, `craft_lead_plate`, `craft_shield_plating`), field treatments (fertilizers Mk I-III, `craft_growth_accelerant`, `craft_yield_amplifier`), and upgrade packs (Plant Terraformer Mk II, Grow Lamp and Sprinkler Mk II/III, `craft_habitat_pack_mk2`, the Mk IV atmosphere packs). See [[Fabricator Recipes]] for the full table.

**Returns:** String (recipe id, or empty string)

### .get_recipe_inputs()
Input requirements for the current recipe as a dict `{item_id: count_per_craft}`. Empty dict if no recipe is set.

**Returns:** Dict

### .get_stockpile()
Current stockpile contents as a dict `{item_id: count_currently_stored}`.

**Returns:** Dict

### .get_stockpile_used() / .get_stockpile_capacity()
Total units across every material in the stockpile, and the combined cap. When full, further input is blocked until the running craft consumes some material.

**Returns:** Number

### .is_running()
`True` while a craft is in progress. Use before `set_recipe()` to avoid `"busy"`, or to show status.

**Returns:** Boolean

### .get_progress()
Progress toward the current craft's completion (0-1). Resets to 0 when a craft finishes.

**Returns:** Number (0-1)

### .get_output_count()
Completed units waiting in the output buffer. Drain them via `self.output.send(...)` before the buffer fills: processing stalls when the output is full.

**Returns:** Number

### .input
Input I/O port feeding the multi-material stockpile. **Inventory works at home only**; remote Fabricators connect local stores and may switch between them for each ingredient. Transfers require **Auto Feeders** research. See [[InputSlot]].

### .output
Output I/O port for finished items. Inventory works at home only; remote Fabricators connect a local Storage Bin or Warehouse. See [[OutputSlot]].

### .byproduct
Secondary output port for byproducts. Most recipes only emit through `self.output`; oil-refining recipes (lubricant, plastic, rubber) emit `tar` here on every craft. Same API as `self.output`.

> [!warning]
> The byproduct bin must have space for the next craft, otherwise the recipe stalls. Keep this drained, not just `self.output`.

### .steam_in / .water_in / .oil_in
Internal process buffers (10 t each) for recipes that declare the matching `fluid_inputs`. Call `connect(...)` with a compatible provider's stable machine id or display name. A local source transfers directly; a remote source also needs a completed conflict-free pipe route between both locations. Read `level()` / `flow_rate()` to detect starvation. Recipes consume from the buffer on craft completion. See [[FluidPort]].

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Refinement & Storage]]: the pipeline guide
- [[Fabricator Recipes]]: every recipe with inputs and durations
