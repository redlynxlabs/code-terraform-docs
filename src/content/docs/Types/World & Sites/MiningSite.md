---
tags:
  - type
  - world-sites
aliases:
  - MiningSite
title: "MiningSite"
---

Extends [[Site]] (shared members and snapshot rules there). Any Site-returning API where `kind() == "mineral"`.

### .item_id
Item id this site yields when drilled: `"iron_ore"`, `"silicon"`, `"titanium"`, `"cobalt"`, `"rare_earth"`, `"neutronium"`, or `"lead_ore"`. `None` until surveyed.

**Returns:** string or `None`

### .hardness
Hardness rating (1-4): gates drill compatibility. `None` until surveyed.

**Returns:** number or `None`

### .purity
Yield multiplier tier: `"standard"` (1×) / `"rich"` (2×) / `"pure"` (3×). `None` until surveyed.

**Returns:** string or `None`

## See also

- [[Minerals]]: hardness and dig times per ore
- [[Drill Module]] / [[Mining Drill]]: extraction
