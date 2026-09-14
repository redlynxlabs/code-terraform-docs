---
tags:
  - type
  - storage-inventory
aliases:
  - ItemInfo
title: "ItemInfo"
---

Static identity metadata for one item id. **Returned by:** `item_catalog.lookup(item_id)`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable item id |
| `.name` | string | Localized display name |
| `.category` | string | `"mineral"`, `"refined"`, `"crafted"`, `"agriculture"`, `"life_form"`, `"field_resource"`, `"biology_sample"`, `"reagent"`, `"equipment"`, `"module"`, `"portable"`, `"upgrade_pack"`, `"construction_kit"` |
| `.stackable` | boolean | `True` when units share one inventory stack; `False` when each takes its own slot |
| `.biome` | string or `None` | Native biome for a life form or biology sample (`"frozen"` ... `"deep"`); `None` when not applicable |
| `.rarity` | string or `None` | `"common"` / `"uncommon"` / `"rare"` / `"legendary"`; `None` when not applicable |
| `.production_tier` | number or `None` | Lowest tier that creates this item (Smelter products are 0); `None` for source items |

## See also

- [[Item Catalog]]: the component
- [[Production Tiers]]
