---
tags:
  - database
  - reference
title: "Production Tiers"
---

Every manufacturing and transformation recipe arranged by **dependency depth**:

- **Tier 0**: Smelter foundations (ore → refined stock).
- **Tier 1+**: every other recipe sits one tier above its deepest manufactured input. Recipes that consume only source materials enter at Tier 1.
- Discovered [[Seed Maker]] and [[Bio Lab]] recipes join the graph without exposing undiscovered combinations or specimens.

The [[Item Catalog]] component reports an item's `production_tier` programmatically (`None` for source items).

## Recipe pages

- [[Smelter Recipes]]: Tier 0 ore refining
- [[Fabricator Recipes]]: components, kits, drones, upgrade packs
- [[Feed Maker Recipes]]: creature feeds
- [[Refiner Recipes]]: exotic fluid purification
- [[Fuel Assembler Recipes]]: Fuel Rods and Nuclear Batteries
