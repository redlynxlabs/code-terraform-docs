---
tags:
  - guide
  - world-infrastructure
  - wildlife
aliases:
  - Wildlife, Creature Profiles
---
# Wildlife Creature Profiles

Every creature has a feed recipe and, as it climbs, a gas (and for rarer ones, a liquid) requirement. Only one living colony of each species can exist. A colony can be housed at any outpost and later moved without losing progress when the destination [[Habitat]] has enough capacity.

## Forage, the calorie base

Every feed builds on **Forage**: physical yield collected when a ready crop is harvested and its field cell is cleared. Keeping feed supplied therefore depends on continued seed production, planting, cultivation, harvesting, and replanting. Recipes use cross-biome combinations; across the 16 creatures they use all 30 life-forms, so every biome is worth harvesting. A creature's biome tag does not affect placement or requirements.

## How to read a creature's needs

- **Feed**: complete the creature's Biolab order to unlock its feed recipe, then build it at the [[Feed Maker]], whose recipe lists the exact life-form ingredients.
- **Current gas / liquid**: `self.required_gas()` / `self.required_liquid()` name the exact exotic and `self.gas_band()` / `self.liquid_band()` give its target window.
- **Next gas / liquid**: `self.next_required_gas()` / `self.next_required_liquid()` and `self.next_gas_band()` / `self.next_liquid_band()` reveal the exact post-transition supply before the colony crosses its next threshold. Empty strings or lists mean that input will not be active.

## Rarity and requirements

How far a creature climbs is set by its rarity (read from the Biology Lab catalog):

- **Common**: mostly feed-based; one common gas; no liquid.
- **Uncommon**: one common gas; a liquid opens at Thriving.
- **Rare**: its gas escalates to a refined gas and its liquid tightens.
- **Legendary**: reaches the rarest exotics at the tightest bands.

The full stage-by-stage table lives on [[Wildlife Progression]]. The two legendaries are the hardest to keep in-band. Bring one to Abundant for the **Apex Husbandry** achievement, and revive, establish, and house all 16 for **Nocturna Reborn**.
