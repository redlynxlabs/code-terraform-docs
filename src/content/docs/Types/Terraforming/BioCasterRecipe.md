---
tags:
  - type
  - terraforming
aliases:
  - BioCasterRecipe
title: "BioCasterRecipe"
---

One volcanic forge recipe. **Returned by:** `bio_caster.list_recipes()` / `bio_caster.find_recipe(fragment_id)`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.fragment_id` | string | The volcanic fragment this recipe forges (the 16 volcanic-biome fragments: `"gw_jaw_fang"`, `"vc_walking_leg"`, `"oc_ink_sac"`, `"bw_hindlimb"`, `"vd_photophore"`, `"mh_chitin_node"`, `"hs_abdomen_segment"`, `"ms_abdomen_sclerite"`, `"hc_beak"`, `"ma_chitinous_seta"`, `"gm_abdominal_sheath"`, `"fs_oral_tegmen"`, `"sd_tail_barb"`, `"ce_great_appendage"`, `"st_beak"`, `"vm_tail_barb"`). Pass to `self.set_recipe(recipe.fragment_id)` in the Caster's own script |
| `.tier` | number | Derived production tier |
| `.materials` | dict | Exact fabricated-material list `{item_id: count}`; a supply script can iterate without selecting the recipe |
| `.temperature_range` | [low, high] | Inclusive target temperature range in °C |

## See also

- [[Bio Caster]]: the machine
