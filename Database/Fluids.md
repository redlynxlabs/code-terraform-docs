---
tags:
  - database
  - items
---
# Fluids

Every substance that flows through pipes, one entry per fluid. **Gas Pipes carry gases and Liquid Pipes carry liquids.** Complete machine `connect()` relationships establish one exact substance per physical component; different exact substances on one component conflict. See [[Flow Networks & Fluids]] for the routing model.

## Industrial fluids

The three working fluids of the power and production economy.

| Fluid | Id | Type | Produced by | Main consumers |
| --- | --- | --- | --- | --- |
| Steam | `steam` | Gas | [[Thermal Cap]] | [[Steam Turbine]] (power), [[Steam Condenser]] (water), [[Fabricator]] recipes, [[Bio Caster]]; Heat Gen Mk III tier input (12 t/h) |
| Water | `water` | Liquid | [[Water Pump]], [[Steam Condenser]] | Fabricator recipes, [[Bio Caster]], [[Plant Terraformer]], [[Sprinkler]], [[Reactor]] cooling; Oxygen Mk III (8 t/h) and Pressure Mk III (5 t/h) tier inputs. Pumped groundwater leaves `salt` behind |
| Oil | `oil` | Liquid | [[Oil Pump]] | [[Oil Generator]], [[Drone Service Station]] (heli refuel), Fabricator polymer recipes (Lubricant / Plastic / Rubber / Tar) |

## Biome essences

Biological concentrates pressed from native life forms at the [[Essence Liquifier]]; all five are liquids consumed by the [[Biomass Mixer]]: `frozen_essence`, `coastal_essence`, `geothermal_essence`, `volcanic_essence`, `deep_essence`.

## Exotic gases

Tapped from cyclic vent deposits with an [[Exotic Gas Cap]]. Common gases flow straight to use; rarer ones arrive raw and need the [[Refiner]].

| Fluid | Id | Notes |
| --- | --- | --- |
| Ammonia | `ammonia` | Common; usable as-is |
| Swamp Gas | `swamp_gas` | Common; usable as-is |
| Raw Sulfur Gas → Sulfur Gas | `raw_sulfur_gas` → `sulfur_gas` | Refined with 2× Tar per 4 t |
| Raw Chlorine → Chlorine | `raw_chlorine` → `chlorine` | Rarest exotic gas; heavy Tar cost (5× per 4 t) |

## Exotic liquids

Tapped from spring deposits with an [[Exotic Spring Tap]].

| Fluid | Id | Notes |
| --- | --- | --- |
| Brine | `brine` | Common; usable as-is |
| Raw Cryofluid → Cryofluid | `raw_cryofluid` → `cryofluid` | Refined with 2× Tar per 4 t |
| Raw Quicksilver → Quicksilver | `raw_quicksilver` → `quicksilver` | Rarest exotic liquid; heavy Tar cost (5× per 4 t) |

Refined exotics feed [[Habitat]] gas and liquid bands; see [[Wildlife Husbandry]].

## See also

- [[Refiner Recipes]]: exact refining ratios
- [[Gas Tank]] / [[Liquid Tank]]: buffering
