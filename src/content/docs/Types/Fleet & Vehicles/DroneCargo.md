---
tags:
  - type
  - fleet-vehicles
aliases:
  - DroneCargo
title: "DroneCargo"
---

Drone cargo across mounted Cargo Pods plus the Bio Extractor chamber. **Returned by:** `self.cargo` on drones.

## Reads

### .count() / .capacity()
Total units across every Cargo Pod plus the Bio Extractor chamber; total physical capacity (Pods: Small 100 / Medium 250 / Large 500, extractor chamber 25 t). **Shield Plating halves each pod's capacity.**

**Returns:** number

### .contents()
Dict mapping `item_id` → unit count for every material in cargo.

**Returns:** dict

### .space_for(item_id)
Free room for this **specific** material. Each Cargo Pod holds one material, so a pod counts only if empty or already holding `item_id`; the Bio Extractor chamber counts only for life forms. Returns 0 for a material with no empty or matching pod, even while other pods have room.

**Returns:** number

### .full()
`True` when `count() >= capacity()`. A drone may still be unable to load a new item type when every pod is committed even if `full()` is `False`; use `space_for(item_id)`.

**Returns:** boolean

## Transfers

Standard property selection (`"any"` / `"subset"` / `"exact"`); exact properties preserved.

### .load(item_id, count, properties=None, property_match=None)
Load from the docked [[Drone Depot]] stockpile or a field [[Mining Drill]] after the route completes. **Hot cargo loads from a local Lead Cask and requires Shield Plating.**

**Returns:** [[TransferResult]] · Key outcomes: `"ok"` / `"partial"` / `"no_op"` / `"research_required"` / `"target_moving"` / `"not_at_source"` / `"source_empty"` / `"target_full"` / `"needs_plating"` / `"cask_missing"` / `"source_changed"` / `"target_changed"`

### .unload(item_id, count, properties=None, property_match=None)
Unload into the docked Drone Depot; hot cargo unloads into a compatible Lead Cask.

**Returns:** TransferResult · Key outcomes: `"ok"` / `"partial"` / `"no_op"` / `"not_at_target"` / `"source_empty"` / `"slots_full"` / `"target_full"` / `"cask_missing"` / `"source_changed"` / `"target_changed"`

### .discard(item_id, count, properties=None, property_match=None)
**Permanently destroy** up to `count` units. Needs no station; a drained pod unlatches for a new material.

**Returns:** [[DiscardResult]] (payload `.requested`, `.discarded`) · Outcomes: `"ok"` / `"partial"` / `"empty"` / `"no_op"` / `"invalid_properties"` / `"invalid_property_match"` / `"source_changed"`

## See also

- [[Drone]] and [[Drones]]: routes, docking, hot cargo
