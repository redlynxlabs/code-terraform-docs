---
tags:
  - type
  - storage-inventory
aliases:
  - Recipe
title: "Recipe"
---

One manufacturing blueprint. **Returned by:** `list_recipes()` / `find_recipe()` on [[Smelter]], [[Fabricator]], [[Feed Maker]], [[Refiner]], and [[Fuel Assembler]].

| Member | Returns | Meaning |
| --- | --- | --- |
| `.tier` | number | Derived production tier (Smelter foundations are 0; every other recipe is one above its deepest manufactured input) |
| `.id` | string | Recipe id (e.g. `"smelt_iron_ingot"`); stable across saves, pass to `set_recipe(...)` |
| `.name` | string | Pre-translated display name |
| `.inputs` | dict | `{item_id: count}` consumed per run |
| `.output_item` | string | Product id per run (item id, or fluid id for fluid-output recipes) |
| `.output_count` | number | Amount produced per run (units, or tons for a fluid) |
| `.duration_game_hours` | number | Base cycle at full efficiency; overcrowding and blocked output extend it |
| `.power_draw` | number | Watts while running |
| `.fluid_inputs` | dict | `{port_name: tons_per_run}` (e.g. `"water_in"`); empty when none |
| `.input_fluid` | string or `None` | Concrete fluid id required by a **generic** input port (Refiner raw feedstocks); `None` when the port already identifies the fluid |
| `.fluid_outputs` | dict | `{port_name: tons_per_run}` deposited per run; Refiner recipes identify `gas_out` / `liquid_out` here |
| `.output_fluid` | string or `None` | Concrete fluid id through a generic output port; `None` for item recipes |
| `.byproduct_item` / `.byproduct_count` | string or `None` / number | Byproduct id and units per run (`None` / 0 when none) |

## See also

- [[Smelter Recipes]] · [[Fabricator Recipes]] · [[Feed Maker Recipes]] · [[Refiner Recipes]] · [[Fuel Assembler Recipes]]
