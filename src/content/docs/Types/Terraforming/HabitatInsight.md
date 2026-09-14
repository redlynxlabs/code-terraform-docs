---
tags:
  - type
  - terraforming
aliases:
  - HabitatInsight
title: "HabitatInsight"
---

Insight economy snapshot. **Returned by:** `Habitat.get_insight()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.shared` | number | Exact shared Insight spendable **by any Habitat**, including retained fractions |
| `.shared_exact` | number | Alias of `.shared`, retained for older scripts |
| `.rate_per_hour` | number | This colony's projected Insight production per hour at current growth and supply |
| `.lifetime_produced` | number | Insight this colony has produced over its lifetime, including fractions |
| `.producing` | boolean | Whether this colony is producing positive Insight at its current growth rate |

## See also

- [[Habitat]] and [[Wildlife Progression]]: what Insight buys
