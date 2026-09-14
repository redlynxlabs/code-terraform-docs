---
tags:
  - type
  - terraforming
aliases:
  - HabitatBonusTree
title: "HabitatBonusTree"
---

A species' authored bonus tree. **Returned by:** `Habitat.get_bonus_tree()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.species` | string | Creature id whose tree is shown, or empty before a target is selected |
| `.shared_insight` | number | Exact shared Insight available for purchases, including retained fractions |
| `.purchased_count` | number | Permanent nodes purchased from this species' tree |
| `.nodes` | list of [[HabitatBonusNode]] | The species-only adaptation and all-species breakthrough in stable order, including locked and purchased |

## See also

- [[Habitat]] · [[HabitatInsight]]
