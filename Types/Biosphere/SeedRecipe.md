---
tags:
  - type
  - biosphere
aliases:
  - SeedRecipe
---
# SeedRecipe

One discovered seed blend. **Returned by:** `seed_maker.recipes()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.tier` | number | Production tier (seed recipes are Tier 1: harvested source inputs) |
| `.species` | string | Bare flora species id (`"sunpetal"`...), matching `Cell.plant` |
| `.seed_id` | string | Physical seed item id (`"seed_sunpetal"`...); pass to the Harvester's `load_seed()` / `plant()` or a Crop Automator's `plant()` |
| `.blend` | list of strings | The exact 3 life-form ids that yield this seed; order doesn't matter. **Re-combine to reproduce the seed** |
| `.requirements` | list of [[PlantRequirement]] | Every cultivation condition (`.kind` + optional `.species` for companion/antagonist identity) |
| `.requirement` | string | Compact summary (`"light"`, `"light+water"`, `"salt+companion"`...) that intentionally omits companion/antagonist species; use `.requirements` for layout decisions |
| `.growth_time` | number | Hours of met-requirement time to maturity |
| `.base_yield` | number | Whole forage before diversity, treatment, and field bonuses |

## See also

- [[Seed Maker]]: discovery and re-runs
- [[Agriculture & Feeds]]: the full seed table with conditions
