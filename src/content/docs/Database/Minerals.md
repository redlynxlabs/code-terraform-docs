---
tags:
  - database
  - items
title: "Minerals"
---

Raw ore mined from surveyed mineral sites. **Hardness (H1-H4) gates which sonar detects a site and which drill can work it**; each ore smelts 1:1 into its refined form at the [[Smelter]].

| Ore | Id | Hardness | Dig time | Smelts into | Notes |
| --- | --- | --- | --- | --- | --- |
| Iron Ore | `iron_ore` | H1 | 15 min/unit | Iron Ingot | Backbone of early industry; inner mineral sites |
| Silicon | `silicon` | H1 | 15 min/unit | Glass | Abundant across the inner rings |
| Titanium | `titanium` | H2 | 20 min/unit | Titanium Ingot | Light, strong mid-ring ore |
| Cobalt | `cobalt` | H2 | 20 min/unit | Cobalt Ingot | Battery chemistry, mid rings |
| Lead Ore | `lead_ore` | H2 | 18 min/unit | Lead Ingot | Dense, soft; base of all radiation shielding |
| Rare Earth | `rare_earth` | H3 | 25 min/unit | Rare Earth Core | Scarce magnetic ore, outer rings |
| Neutronium | `neutronium` | H4 | 30 min/unit | Neutronium Bar | The hardest known ore, far from base |

## See also

- [[Smelter Recipes]]: the 1:1 conversions
- [[MiningSite]]: hardness and purity fields
- [[Sonar Module]] / [[Drill Module]]: hardness gates
