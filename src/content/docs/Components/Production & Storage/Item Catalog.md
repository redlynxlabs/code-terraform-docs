---
tags:
  - component
  - production-storage
aliases:
  - item_catalog
title: "Item Catalog"
---

Looks up **static identity metadata for any known item id**. Use it when a script needs to classify an item without maintaining its own data archive.

**Access:** `get_component("item_catalog")` · Like every component, exposes `.id` and `.name`.

```python
catalog = get_component("item_catalog")
item = catalog.lookup("water_pump")
if item is not None:
    print(item.category, item.production_tier)
```

## Methods

### .lookup(item_id)
Returns an [[ItemInfo]] with `.id`, `.name`, `.category`, `.stackable`, `.biome`, `.rarity`, and `.production_tier`. Categories distinguish `"mineral"`, `"refined"`, `"crafted"`, `"agriculture"`, `"life_form"`, `"field_resource"`, `"biology_sample"`, `"reagent"`, `"equipment"`, `"module"`, `"portable"`, `"upgrade_pack"`, and `"construction_kit"`. `production_tier` is `None` for source items; `biome` and `rarity` are `None` when they don't apply. An unknown item id returns `None`.

**Returns:** `ItemInfo` or `None`

## See also

- [[Production Tiers]]: what production tier means
- [[Input & Output]]: item ids and property variants in transfers
