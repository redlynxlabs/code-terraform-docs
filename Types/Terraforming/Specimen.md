---
tags:
  - type
  - terraforming
aliases:
  - Specimen
---
# Specimen

One collected biology specimen. **Returned by:** `bio_collector.cargo` / `bio_lab.specimen`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.coords` | [x, y] | Where it was collected (stable across save/load) |
| `.distance` | number | Straight-line meters from the collecting outpost, set at collect time |
| `.stage` | string | `"collected"` before analysis, `"analyzed"` after `lab.analyze()` reveals the fragment and recipe |
| `.fragment_id` | string or `None` | Fragment id. **Bio Collector cargo reveals it once the fragment is cataloged; Bio Lab input reveals it only after this specimen reaches `"analyzed"`**, even if already cataloged. Full id list: [[Biology Samples]] |
| `.name` | string or `None` | Player-facing name while identity is known |
| `.rarity` | string or `None` | `"common"` / `"uncommon"` / `"rare"` / `"legendary"`; `None` until analyzed |
| `.recipe` | dict or `None` | Required reagents `{reagent_id: qty}`; `None` until analyzed |
| `.production_tier` | number or `None` | Tier of this specimen's extraction recipe |
| `.glow` | [r, g, b] or `None` | Coastal specimens only: the dim start color the [[Bio Luminizer]] tunes |
| `.genes` | list of strings | Geothermal specimens: carried genes (the DNA strand itself is internal; you work at the gene level). Empty otherwise |

## See also

- [[Bio Collector]] · [[Bio Lab]]
