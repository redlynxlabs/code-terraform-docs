---
tags:
  - type
  - terraforming
aliases:
  - FragmentLocation
title: "FragmentLocation"
---

One fragment dot from a collector scan. **Returned by:** `bio_collector.scan()` (sorted ascending by distance: `result[0]` is nearest)

| Member | Returns | Meaning |
| --- | --- | --- |
| `.coords` | [x, y] | World coordinates; pass to `bio_collector.collect(coords)` |
| `.distance` | number | Straight-line meters from this outpost |
| `.cataloged` | boolean | `True` when already analyzed and in the Journal; **gates the three optional fields below** |
| `.fragment_id` | string or `None` | Known fragment id once cataloged (matches `BioOrder.requires` keys) |
| `.name` | string or `None` | Player-facing name once cataloged |
| `.rarity` | string or `None` | Rarity once cataloged. **Scan results never expose recipe or creature identity** |

## See also

- [[Bio Collector]] · [[CatalogedFragment]]
