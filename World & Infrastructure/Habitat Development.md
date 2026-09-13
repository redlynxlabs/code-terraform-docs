---
tags:
  - guide
  - world-infrastructure
  - wildlife
---
# Habitat Development

Every established colony learns from successful generations. Positive population change adds **Insight** directly to one shared Wildlife balance; elapsed time and static population add nothing.

`self.get_insight()` reports the shared balance, this Habitat's current rate, and its lifetime contribution.

## Two permanent nodes per creature

Each creature has exactly two authored nodes. Its early **Adaptation** affects that species only and gives strong recurring relief tailored to its life support or breeding pace. Its later **Breakthrough** affects every current and future species. The complete set is deliberately bounded: it improves a well-supported late colony by a few times its untreated output, not by an order of magnitude. Bonuses include speed boosts for different parts of the growth curve, brood bonuses that guarantee extra offspring over time, a reward for one full day of uninterrupted support, feed efficiency, wider fluid bands, a larger founding population, and a higher late-stage rate limit. Rearing always takes 12 world hours. Scripts inspect `.scope` and `.source_species` through `self.get_bonus_tree()` and purchase with `self.unlock_bonus(node_id)`; there is no purchase control outside code.

## Costs and gates

The species-only **Adaptation** has exactly one requirement: 1 shared Insight. It becomes purchasable after `set_revival_target(...)`, before revival. The all-species **Breakthrough** has exactly two requirements: 4 Insight and its source creature reaching 10,000 population. It does not require the first node, research, a planet-wide Wildlife total, or purchase materials. Every check is atomic; a rejected purchase spends nothing.

## Why more Habitats matter

The cumulative Insight curve has diminishing per-individual yield. A creature has generated 3 Insight at 10,000 population, while its two nodes cost 5 total, so no creature can self-fund its entire tree at the breakthrough gate. The player must pool growth from several species. Full Mk II populations across all 16 creatures generate 112 Insight against 80 needed to own all 32 nodes, leaving 32 spare. That is a 1.4 times lifetime budget, while 15 full Mk II species still provide 105 Insight. A full or stalled colony cannot mint currency forever.

## See also

- [[HabitatBonusTree]] · [[HabitatBonusNode]] · [[HabitatInsight]]: the API types
- [[Wildlife Progression]]: Insight milestones by population
