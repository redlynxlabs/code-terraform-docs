---
tags:
  - type
  - biosphere
aliases:
  - PlantRequirement
title: "PlantRequirement"
---

One cultivation condition. **Returned by:** `SeedRecipe.requirements`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.kind` | string | `"light"`, `"shade"`, `"water"`, `"salt"`, `"spacer"` (all orthogonal neighbors empty), `"cluster"` (needs same-species neighbors), `"companion"` (needs a specific neighbor species), `"antagonist"` (forbids one) |
| `.species` | string or `None` | The related species key for `"companion"` / `"antagonist"`; `None` for all other kinds |

**Every entry in `SeedRecipe.requirements` is required**; combined species expose multiple entries.

## See also

- [[SeedRecipe]] · [[Agriculture & Feeds]]: the full seed table
