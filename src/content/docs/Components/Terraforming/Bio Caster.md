---
tags:
  - component
  - terraforming
  - biology
aliases:
  - bio_caster_1
title: "Bio Caster"
---

Forges a **volcanic fragment** by holding the crucible in a target temperature band while the recipe's materials are loaded, then casting. Steam and water use separate 20 t internal process buffers. Connect each input port to a compatible source; local sources transfer directly, while remote sources also need a completed conflict-free pipe route between both locations. A script drives the heat and cooling; **casting out of band or with the wrong materials burns the whole charge**.

**Stats:** Power in -15 W · Steam buffer 20 t · Water buffer 20 t · Output buffer 30 · Stockpile 30 (mixed)

**How to obtain:** Requires the **Volcanic Forge-Casting** research (Oxygen 350). Buy from the Shop for 150,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Recipe queries

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### self.list_recipes()
List all 16 forge recipes without changing the selected recipe. Each [[BioCasterRecipe]] includes its fragment id, tier, exact material shopping list, and target temperature range. The read works through `get_component(...)`, so another machine can plan supplies without possessing every fragment.

**Returns:** List of all 16 `BioCasterRecipe` objects

### self.find_recipe(fragment_id)
Look up one forge recipe by volcanic fragment id without selecting it. Returns `None` for an unknown id.

**Returns:** `BioCasterRecipe` or `None`

### self.catalog()
The 16 forgeable volcanic fragment ids. Pass one to `set_recipe(...)`, or use `list_recipes()` when you also need every recipe's material and temperature requirements. Fixed hardware; read it once.

**Returns:** List of the 16 fragment ids

### self.recipe_tier(fragment_id)
Derived production tier for one recipe from `catalog()`. Returns `None` for an unknown fragment id.

**Returns:** Tier, or `None`

## Recipe selection and state

### self.set_recipe(fragment_id) `SELF ONLY`
Select which volcanic fragment to forge, e.g. `self.set_recipe("sd_tail_barb")`. After this, `required_range()` and `required_materials()` describe that recipe. The selection persists like a Smelter recipe.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"invalid_recipe"` / `"busy"` (transient)

### self.recipe()
The selected recipe: the volcanic fragment id you're set to forge (also the raw fragment to `load`), or `None` if none is set.

**Returns:** Fragment id or `None`

### self.required_range()
The selected recipe's target band `[low, high]` in °C. `cast()` must fire with `temperature()` inside it (inclusive). `None` if no recipe is set.

**Returns:** `[low, high]` or `None`

### self.required_materials()
The fabricated materials required by the selected recipe as `{item_id: count}`. Load **exactly** those amounts (no more, no less) before casting. Iterate with `.items()`. Returns an empty dict when no recipe is selected.

**Returns:** Dict

### self.required_fragment()
The raw fragment id the recipe consumes (identical to `recipe()`). `None` if no recipe is set.

**Returns:** Fragment id or `None`

## Crucible state

### self.temperature()
Current crucible temperature in °C, ranging 100 (cold baseline) to 1000 (max). Drive it into `required_range()` with the knobs before casting.

**Returns:** Number (°C, 100-1,000)

### self.temp_rate()
Net temperature change in °C/h right now. Positive = heating, negative = cooling. Full heat is +2400 °C/h and full cool is -2400 °C/h; with both knobs at 0, an unlocked crucible above baseline cools naturally at -20 °C/h. Returns 0 at the 100 °C baseline or while a cast is in progress.

**Returns:** Number (°C/h, signed)

### self.heat()
Current heat-knob setting 0-100%. At 100% temperature rises +2400 °C/h (burning steam); use a lower setting near the target band.

**Returns:** Number (0-100)

### self.cool()
Current cool-knob setting 0-100%. At 100% temperature falls -2400 °C/h (burning water); use a lower setting near the target band.

**Returns:** Number (0-100)

### self.fragment()
The raw fragment id loaded in the chamber, or `None` if the chamber is empty.

**Returns:** Fragment id or `None`

### self.materials()
The materials currently loaded in the crucible as `{item_id: count}`. Compare against `required_materials()` before `cast()`.

**Returns:** Dict

## Controls

### self.set_heat(pct) `SELF ONLY`
Set the heat knob (steam to temperature up): `self.set_heat(100)` for +2400 °C/h, then use a lower percentage for the final approach. Range 0-100, clamped. **Open-loop**: it keeps heating and burning steam until you set it back. With both knobs at 0, the crucible cools naturally at 20 °C/h, so cast after entering the band. Re-idles to 0 when the chamber empties or the script stops.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"` / `"busy"` (transient)

### self.set_cool(pct) `SELF ONLY`
Set the cool knob (water to temperature down): `self.set_cool(100)` for -2400 °C/h. Range 0-100, clamped. Open-loop: keeps cooling and burning water until you set it back. Both knobs may run at once, but that burns both fluids for little movement; net rate = heat − cool. Re-idles to 0 when the chamber empties or the script stops.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"` / `"busy"` (transient)

### self.load(fragment_id, properties=None, property_match=None) `SELF ONLY`
Pull a raw volcanic sample of `fragment_id` from `self.input` into the chamber, usually `self.load(self.recipe())`. Optional `properties` and `property_match` select a specific identity using the standard any, subset, or exact convention (see [[Input & Output]]).

**Returns:** ActionResult · Outcomes: `"ok"` / `"chamber_occupied"` / `"not_in_input"` / `"invalid_fragment"` / `"invalid_properties"` / `"invalid_property_match"` / `"busy"` (transient)

### self.eject() `SELF ONLY`
Stage the chamber sample and all loaded materials in `self.output` without changing their properties. A single-material output may require a send/eject cycle for each item type.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"` / `"busy"` / `"output_full"`

### self.cast() `SELF ONLY`
Forge the loaded fragment.

**Returns:** ActionResult

| Status | Kind | Meaning |
| --- | --- | --- |
| `"ok"` | success | Forged; the Forged sample lands in `self.output` |
| `"out_of_range"` | rejection | Temperature was outside the required range: **the loaded fragment and materials were destroyed** |
| `"wrong_materials"` | rejection | Staged materials do not match the requirements |
| `"wrong_fragment"` | rejection | Loaded fragment does not match the requested fragment |
| `"empty"` | rejection | The relevant source or queue is empty |
| `"no_recipe"` | rejection | No recipe is currently selected |
| `"busy"` | transient | Another operation in flight |
| `"output_full"` | rejection | The output has no capacity |

## Ports

### self.input
The multi-material [[InputSlot]] for both the raw volcanic sample and fabricated materials. Connect Inventory only at Nocturna Base; at another outpost connect a same-outpost Storage Bin/Warehouse. Call `take(...)` for every required item. Before `cast()`, recover a mistaken sample or material with `eject(...)`.

### self.output
The [[OutputSlot]] for Forged samples and non-destructively ejected items. Exact item properties are preserved.

### self.steam_in
Supplies the Caster's heat control through a 20 t steam buffer. Connect a [[Thermal Cap]] or steam [[Gas Tank]]. See [[FluidPort]].

### self.water_in
Supplies the Caster's cooling control through a 20 t water buffer. Connect a [[Water Pump]], [[Steam Condenser]], water [[Liquid Tank]], or [[Large Liquid Tank]]. See [[FluidPort]].

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Wildlife Supply]] and [[Biosphere Biomass Tier]]: where volcanic fragments fit
