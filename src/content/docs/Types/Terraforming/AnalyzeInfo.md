---
tags:
  - type
  - terraforming
aliases:
  - AnalyzeInfo
title: "AnalyzeInfo"
---

A completed fragment analysis. **Returned by:** `bio_lab.analyze().info` after `status == "ok"`.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.fragment_id` | string | Discovered fragment id (e.g. `"gw_cranial_plate"`): the inventory key for the resulting sample, and what Bio Orders request. Full id list: [[Biology Samples]] |
| `.name` | string | Display name |
| `.rarity` | string | `"common"` / `"uncommon"` / `"rare"` / `"legendary"` |
| `.required_recipe` | dict | Reagents to extract a sample: `{reagent_id: qty}`. Iterate `.items()` and `lab.load(rid, qty)` each, then `lab.extract()` |
| `.coords` | [x, y] | Where the specimen was collected |
| `.distance` | number | Straight-line meters from this outpost (set at collect time) |

## See also

- [[Bio Lab]] · [[Lab Reagents]]
