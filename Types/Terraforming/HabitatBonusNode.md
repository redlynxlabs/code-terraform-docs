---
tags:
  - type
  - terraforming
aliases:
  - HabitatBonusNode
---
# HabitatBonusNode

One node in a species' bonus tree. **Returned by:** `Habitat.get_bonus_tree().nodes` and `Habitat.get_active_bonuses()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable id accepted by `unlock_bonus(...)` |
| `.source_species` | string | Creature id whose tree owns this node (global breakthroughs are still earned from one source species) |
| `.slot` | string | `"adaptation"` or `"breakthrough"` |
| `.scope` | string | `"species"` (affects only `source_species`) or `"global"` (every current and future colony) |
| `.depth` | number | Tree depth 1-2 |
| `.name` / `.description` | string | Authored name and exact effect summary |
| `.state` | string | `"purchased"` / `"available"` / `"unaffordable"` / `"population_locked"` |
| `.purchased` | boolean | Permanently purchased |
| `.active` | boolean | A purchased node with at least one effect currently applying to the Habitat that returned it (unpurchased always `False`) |
| `.insight_cost` | number | Whole shared Insight cost |
| `.local_population` | number | Minimum local colony population: 0 for the adaptation, 10,000 for the breakthrough |
| `.unmet` | list of strings | Currently unmet requirements: at most `"population"` and `"insight"` |

## See also

- [[Habitat]] and [[Habitat Development]]
