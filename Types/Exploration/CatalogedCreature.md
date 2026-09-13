---
tags:
  - type
  - exploration
aliases:
  - CatalogedCreature
---
# CatalogedCreature

A fully cataloged creature entry. **Returned by:** `journal.cataloged_creatures(planet_id)`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.creature_id` | string | Stable id accepted by `habitat.set_revival_target(creature_id)`: one of the 16 species (`"salt_tortoise"`, `"magmatic_annelid"`, `"mycelial_husk"`, `"mantle_strider"`, `"glasswing_mantis"`, `"veil_mantle"`, `"vault_crab"`, `"tidal_cephalopod"`, `"bone_walker"`, `"vent_drifter"`, `"hive_sentinel"`, `"hollow_choir"`, `"ferric_sea_lily"`, `"crustal_echo"`, `"glacial_wyrm"`, `"spire_drake"`) |
| `.name` | string | Player-facing name (use `.creature_id` for automation) |
| `.rarity` | string | `"common"` / `"uncommon"` / `"rare"` / `"legendary"`: determines revival reagent quantities |
| `.fragment_ids` | list of strings | The five analyzed fragment ids that completed this entry, in biome order |
| `.feed_item_id` | string | The exact feed this creature accepts (`feed_<creature>`); stage at least `.revive_feed_required` units before revival |
| `.feed_recipe_id` | string | The Feed Maker recipe (`craft_feed_<creature>`) producing that feed; must still be unlocked via Bio Orders |
| `.revive_feed_required` | number | Minimum whole feed units staged in the [[Habitat]] before `revive()` can start |
| `.revive_reagents` | dict | Exact revival shopping list `{reagent_id: quantity}` for this rarity; stage through the Habitat's reagents input |

## See also

- [[Wildlife Creature Profiles]] · [[Habitat]] · [[Feed Maker Recipes]]
