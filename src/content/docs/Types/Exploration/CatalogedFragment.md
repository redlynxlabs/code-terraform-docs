---
tags:
  - type
  - exploration
aliases:
  - CatalogedFragment
title: "CatalogedFragment"
---

A cataloged biology fragment. **Returned by:** `journal.cataloged_fragments(planet_id)`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.fragment_id` | string | Stable id (e.g. `"gw_cranial_plate"`), matching the keys in `BioOrder.requires`: the automation key for order fulfillment. Full id list: [[Biology Samples]] |
| `.name` | string | Player-facing name |
| `.biome` | string | Where the fragment is found (`"frozen"` ... `"deep"`); filter by biome to scope to an outpost |
| `.coords` | [x, y] | Where it can be collected; pass to `bio_collector.collect(coords)` at the matching outpost |
| `.rarity` | string | `"common"` / `"uncommon"` / `"rare"` / `"legendary"`, inherited from the parent creature |

## See also

- [[Bio Collector]] · [[Journal]] · [[BioOrder]]
