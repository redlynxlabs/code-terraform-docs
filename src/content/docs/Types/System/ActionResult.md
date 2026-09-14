---
tags:
  - type
  - system
  - result
aliases:
  - ActionResult
title: "ActionResult"
---

The universal result of gameplay commands **with no extra payload fields**. Richer commands return specialized results ([[TransferResult]], [[CountResult]], [[SonarScanResult]], and the rest), which share the same two base fields.

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | Stable result code for scripts to branch on |
| `.message` | string | Player-readable, contextual explanation: suitable for logs and diagnostics, **never for branching** |

## The status vocabulary

`.status` values are drawn from one shared pool; each command documents its own subset (see that command's Outcomes list on its component page). The pool spans:

- **Success and progress:** `"ok"`, `"partial"`, `"no_op"`, `"complete"`, `"completed"`, `"started"`, `"charging"`, `"queued"`, `"refueling"`, `"accepted"`, `"correct"`
- **Transient (retry later):** `"busy"`, `"in_progress"`, `"already_active"`, `"paused"`, `"paused_no_power"`, `"under_construction"`, `"station_offline"`, `"moving"`, `"scrambled"`, `"cooling"`, `"holding"`, `"overheated"`, `"source_busy"`, `"output_busy"`
- **Mounting and slots:** `"not_mounted"`, `"unknown_module"`, `"slot_not_compatible"`, `"slot_occupied"`, `"invalid_slot"`, `"capability_already_mounted"`, `"slot_empty"`, `"holder_not_empty"`, `"invalid_internal_slot"`, `"not_container"`, `"item_not_accepted"`, `"internal_slot_occupied"`, `"internal_slot_empty"`, `"container_not_empty"`, `"module_not_mounted"`, `"wrong_engine_for_module"`, `"cargo_capacity_exceeded"`
- **Position and world:** `"not_at_site"`, `"not_surveyed"`, `"too_hard"`, `"out_of_bounds"`, `"out_of_range"`, `"wrong_position"`, `"not_at_service_point"`, `"not_at_station"`, `"not_docked"`, `"too_far"`, `"already_here"`, `"invalid_target"`, `"station_not_found"`, `"drill_not_found"`, `"invalid_coords"`
- **Power and resources:** `"no_power"`, `"not_enough_power"`, `"not_powered"`, `"no_cargo_space"`, `"inventory_full"`, `"insufficient_credits"`, `"insufficient_materials"`, `"no_oil"`, `"no_salt"`, `"insufficient_water"`, `"tank_empty"`, `"no_source"`
- **Gating:** `"locked"`, `"recipe_locked"`, `"research_required"` (in transfer results), `"not_found"`, `"invalid"`, `"duplicate"`, `"invalid_type"`, `"not_ready"`, `"blocked"`, `"canceled"`, `"rejected"`, `"boot_required"`, `"power_required"`
- **Crops:** `"invalid_seed"`, `"no_seed"`, `"not_empty"`, `"base_sector"`, `"no_kit"`, `"invalid_kit"`, `"not_plantable"`, `"already_full"`, `"invalid_input"`, `"no_plant"`, `"already_mature"`, `"tier_conflict"`, `"no_dose"`, `"not_mature"`, `"no_forage"`, `"no_material"`, `"nothing"`, `"empty"`, `"dropped"`
- **Contracts:** `"path"`, `"wall"`, `"exit"`, `"ongoing"`, `"win"`, `"loss"`, `"draw"`, `"occupied"`, `"no_game"`, `"incorrect"`, `"already_completed_correct"`, `"already_completed_incorrect"`, `"wrong_planet"`, `"wrong_contract"`, `"unknown_contract"`, `"key_is_planet"`, `"unknown_key"`
- **Machines and recipes:** `"unknown_recipe"`, `"offline"`, `"material_mismatch"`, `"material_present"`, `"recipe_mismatch"`, `"insufficient_input"`, `"input_empty"`, `"no_input"`, `"output_full"`, `"script_present"`, `"no_script"`, `"already_running"`, `"not_toggleable"`, `"not_connected"`, `"booting"`, `"already_booted"`, `"activating"`, `"already_online"`, `"initializing"`, `"already_repaired"`, `"already_testing"`
- **Comms, archive, markers:** `"invalid_channel"`, `"invalid_value"`, `"channel_limit"`, `"invalid_key"`, `"entry_limit"`, `"invalid_icon"`, `"invalid_color"`, `"invalid_text"`, `"limit_reached"`
- **Orders and stations:** `"unknown_order"`, `"target_reached"`, `"already_dispatched"`, `"not_stranded"`, `"no_rescue"`, `"worker_not_present"`, `"construction_dependency"`, `"cargo_present"`, `"hot_cargo_requires_plating"`
- **Biology and wildlife:** `"no_active"`, `"cargo_occupied"`, `"no_fragment"`, `"input_occupied"`, `"source_empty"`, `"wrong_outpost"`, `"invalid_source"`, `"invalid_reagent"`, `"invalid_qty"`, `"invalid_properties"`, `"invalid_property_match"`, `"not_analyzed"`, `"invalid_specimen"`, `"chamber_occupied"`, `"not_in_input"`, `"invalid_fragment"`, `"destroyed"`, `"unknown_gene"`, `"invalid_recipe"`, `"wrong_materials"`, `"wrong_fragment"`, `"no_recipe"`, `"conditioned"`, `"burned"`, `"no_run"`, `"species_exists"`, `"unknown_creature"`, `"not_cataloged"`, `"no_target"`, `"wrong_feed"`, `"insufficient_feed"`, `"insufficient_reagents"`, `"no_colony"`, `"not_established"`, `"insufficient_capacity"`, `"unknown_node"`, `"already_purchased"`, `"population_locked"`, `"insufficient_insight"`

## See also

- [[Command Results]]: the model, kinds (success / partial / transient / rejection), and how to branch
