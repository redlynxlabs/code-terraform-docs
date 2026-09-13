---
tags:
  - type
  - biosphere
aliases:
  - Cell
---
# Cell

One Harvesting-field sector snapshot. **Returned by:** `self.cell(sector)` / `self.cells()` on [[Harvester]] and [[Crop Automator]].

## Identity and occupancy

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Sector id, e.g. `"E13"` (row letter A-H + column 1-24). **Parse it yourself to compute the four orthogonal neighbors**; there is no `neighbors()` helper |
| `.plant` | string or `None` | Species id of the planted flora (`"sunpetal"`...), matching `SeedRecipe.species`. **Not** the `"seed_sunpetal"` item id |
| `.status` | string | `"unknown"` (unscanned natural ground), `"empty"` (bare plantable), `"item"` (uncollected surface item), `"base"` (Harvester depot), `"provider"` (field equipment), `"growing"`, `"stalled"`, `"mature"`. **Only `"empty"` accepts planting or deployment** |
| `.growth` | number | 0-1; 1.0 = ready to harvest. Advances only while every requirement is met, pauses (never regresses) otherwise |
| `.forage` | number | Whole forage banked: rises with growth (including diversity and field bonuses), **freezes at growth 1.0**. Harvester moves what Inventory can hold and leaves the remainder; a Crop Automator moves what fits in its output, discards the rest, and clears the cell |

## Conditions

| Member | Returns | Meaning |
| --- | --- | --- |
| `.lit` | boolean | Active 24-hour Harvester light treatment or a powered [[Grow Lamp]] covers it. Satisfies Light; **Shade plants need this `False`** |
| `.watered` | boolean | Active Harvester water treatment or a powered, supplied [[Sprinkler]] |
| `.salted` | boolean | Active Harvester salt treatment or a powered, supplied [[Dispenser]] |
| `.manual_light_remaining` / `.manual_water_remaining` / `.manual_salt_remaining` | number | Hours (0-24) left on the Harvester-applied treatment, excluding provider coverage; each successful treatment resets to 24 |

## Treatments

| Member | Returns | Meaning |
| --- | --- | --- |
| `.fertilized` / `.fertilizer_remaining` / `.fertilizer_tier` | boolean / number / number | Fertilizer dose active; hours left (each unit adds 8); tier 1-3 (0 when none) |
| `.accelerated` / `.accelerant_remaining` | boolean / number | Growth Accelerant active; hours left (each unit adds 8) |

## See also

- [[Biosphere Plants]]: growth and requirement model
- [[SeedRecipe]]: per-species requirements
