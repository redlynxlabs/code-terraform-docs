---
tags:
  - database
  - items
---
# Agriculture & Feeds

Goods of the Plants and Wildlife chains: salt, manufactured seeds, forage, creature feeds, and field equipment kits.

## Basics

| Item | Id | Notes |
| --- | --- | --- |
| Salt | `salt` | Mineral byproduct of water pumping; feeds [[Dispenser]]s and Plant Terraformer phases |
| Plant Forage | `forage` | Physical crop yield collected on harvest. The calorie base of every creature feed and the bulk input for [[Plant Terraformer]] batches |
| Seed Maker Kit / Grow Lamp Kit / Sprinkler Kit / Dispenser Kit / Waste Processor Kit | `seed_maker_kit`, `grow_lamp_kit`, `sprinkler_kit`, `dispenser_kit`, `garbage_disposal_kit` | Deploy bundles: field kits deploy from the mobile [[Harvester]]; Seed Maker and Waste Processor deploy from Inventory to an outpost |

## Seeds

Banked seed lines from the [[Seed Maker]]. "Adjacent" always means the four orthogonal neighbors (above, below, left, right).

| Seed | Id | Conditions | Maturity | Base yield |
| --- | --- | --- | --- | --- |
| Sunpetal | `seed_sunpetal` | Light | 12 h | 10 Forage |
| Shadeleaf | `seed_shadeleaf` | Shade | 12 h | 10 |
| Dewmoss | `seed_dewmoss` | Water | 12 h | 10 |
| Lonethorn | `seed_lonethorn` | Every adjacent cell empty | 24 h | 25 |
| Packfern | `seed_packfern` | At least two adjacent Packferns | 24 h | 25 |
| Twinvine | `seed_twinvine` | An adjacent Dewmoss | 24 h | 25 |
| Spitebud | `seed_spitebud` | No adjacent Packfern | 24 h | 25 |
| Sunspur | `seed_sunspur` | Light + every adjacent cell empty | 24 h | 25 |
| Glowvine | `seed_glowvine` | Light + Water | 48 h | 60 |
| Crowncap | `seed_crowncap` | Shade + at least two adjacent Crowncaps | 48 h | 60 |
| Pondmoss | `seed_pondmoss` | Water + at least two adjacent Pondmoss | 48 h | 60 |
| Saltbloom | `seed_saltbloom` | Salt | 72 h | 120 |
| Brinethorn | `seed_brinethorn` | Salt + every adjacent cell empty | 72 h | 120 |
| Saltmate | `seed_saltmate` | Salt + an adjacent Saltbloom | 72 h | 120 |
| Grandbloom | `seed_grandbloom` | Light + Water + every adjacent cell empty | 72 h | 150 |

Maturity counts hours of **met conditions**; unmet conditions pause growth.

## Creature feeds

Each feed is pressed for one species; **a Habitat colony accepts only its own formulation**. Ids follow `feed_<creature>` (e.g. `feed_salt_tortoise`, `feed_glacial_wyrm`). Species and biomes: Salt Tortoise, Tidal Cephalopod, Ferric Sea-Lily (coastal); Magmatic Annelid, Mantle Strider, Spire Drake (volcanic); Glasswing Mantis, Vent Drifter, Hive Sentinel (geothermal); Veil Mantle, Bone Walker, Glacial Wyrm (frozen); Mycelial Husk, Vault Crab, Hollow Choir, Crustal Echo (deep). Recipes: [[Feed Maker Recipes]].

## See also

- [[Biosphere Plants]]: growing model
- [[Wildlife Supply]]: feed logistics
