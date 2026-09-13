---
tags:
  - component
  - infrastructure-fluids
aliases:
  - outpost_home
  - outpost_1
---
# Outpost

Represents a home or player-founded outpost. Look one up by stable id with `get_component("outpost_1")` or by display name with `get_component_by_name("Mining Camp")`. Players can rename outposts from the Computer System tab, so **use the id for scripts that must survive renames**.

**Access:** `get_component("outpost")` / `get_component(id)`

## Methods

### .id
Immutable instance id (e.g. `"outpost_home"`, `"outpost_1"`).

**Returns:** String

### .name()
Display name. The home outpost starts as `"Nocturna Base"`; player-founded outposts start as `"Outpost N"`. Freely renameable, so prefer `id` for stable references.

**Returns:** String

### .coords()
World coordinates as `[x, y]`. Home sits at `[0, 0]`.

**Returns:** List `[x, y]`

### .buildings_used()
Number of buildings deployed here. Sensors, mobile units, structural hubs, and POI extraction don't count.

**Returns:** Number

### .buildings_capacity()
**Soft** building threshold. Each counted building above it reduces productive and service throughput. Nocturna Base has a few extra starter slots; founded outposts use the standard threshold.

**Returns:** Number

### .is_full()
`True` when the soft threshold is reached or exceeded. The threshold does not block ordinary deployment, it just penalizes throughput.

**Returns:** Boolean

### .is_home()
`True` when this is the home outpost.

**Returns:** Boolean

### .buildings(type_id?)
Buildings deployed here as [[BuildingRef]] snapshots; pass a `type_id` (e.g. `"storage_bin"`) to filter. Each ref has `.id`, `.name`, `.type_id`, `.outpost`, `.powered`, `.position`; use `get_component(ref.id)` for type-specific live reads. Covers machines that count toward building capacity, not sensors, mobile units, POI extraction, or fixed Harvesting-field machines.

**Returns:** List of `BuildingRef`

### .harvesting_machines(type_id?)
Fixed machines on this outpost's Harvesting field as [[HarvestingMachineRef]] snapshots: every [[Grow Lamp]], [[Sprinkler]], [[Dispenser]], and [[Crop Automator]] there, optionally filtered by `type_id`. They occupy field cells, don't use building capacity, and don't appear in `buildings()`. Excludes the mobile [[Harvester]], crops, loose items, Water Wells, and other POI extractors. **Only Nocturna Base currently has a Harvesting field**, so founded outposts return an empty list.

**Returns:** List of `HarvestingMachineRef`

## See also

- [[Outpost Network]]: index of all outposts
- [[First Outpost]]: founding and building
- [[Tier 3 Progression]]: overcrowding penalties in context
