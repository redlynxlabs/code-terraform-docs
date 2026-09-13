---
tags:
  - type
  - storage-inventory
  - result
aliases:
  - TransferResult
---
# TransferResult

The shared result of every item transfer. **Returned by:** `InputSlot.take()` / `.eject()` / `.flush()`, `VehicleInputSlot.take()`, `OutputSlot.send()`, `Cargo.compact()`, `DroneCargo.load()` / `.unload()`, Storage Bin transfer methods, `warehouse.compact()`.

## Fields

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | Stable outcome code (below) |
| `.message` | string | Player-readable, contextual explanation; suitable for logs, never for branching |
| `.requested` | number | Units requested by the call (for parameterless `flush()` / `compact()`: the buffered or repositioned amount observed) |
| `.moved` | number | Units actually transferred, repositioned, or destroyed. **Always 0 for rejected outcomes** |

## Outcome codes

**Success:** `"ok"` (moved all requested) · `"partial"` (moved `.moved` of `.requested`; availability or capacity limited it) · `"no_op"` (nothing requested) · `"already_compact"`

**Transient (retry later):** `"busy"` · `"source_changed"` · `"target_changed"` · `"source_under_construction"` · `"target_under_construction"` · `"source_moving"` · `"target_moving"`

**Setup rejections:** `"research_required"` (Auto Feeders) · `"no_connection"` · `"inventory_not_local"` · `"same_endpoint"` · `"same_storage"` · `"same_vehicle"` · `"invalid_properties"` · `"invalid_property_match"`

**Source rejections:** `"source_missing"` · `"source_is_vehicle"` · `"source_not_local"` · `"not_at_source"` · `"unsupported_source"` · `"source_wrong_material"` · `"source_empty"` · `"source_reserved"`

**Target rejections:** `"target_missing"` · `"target_is_vehicle"` · `"target_not_local"` · `"not_at_target"` · `"unsupported_target"` · `"target_wrong_material"` · `"target_unconfigured"` · `"target_full"` · `"buffer_full"` · `"slots_full"` (capacity exists but no slot for this material identity) · `"mixed_materials"` (one transfer = one item id) · `"wrong_biome"` · `"out_of_range"`

**Hot cargo:** `"hot_cargo_requires_cask"` · `"cask_accepts_hot_only"` · `"needs_plating"` · `"cask_missing"`

**Supply Dock order gating:** `"order_item_not_required"` · `"order_slots_full"` · `"order_fulfilled"`

## See also

- [[Command Results]]: the general result model
- [[Input & Output]]: transfer mechanics and property matching
