---
tags:
  - guide
  - world-infrastructure
  - wildlife
aliases:
  - Wildlife, Progression
title: "Wildlife Progression"
---

Wildlife has three linked progress scales: each colony's life stage, shared Insight, and planet-wide established population.

## Colony stages

| Current stage | Shared population range | Habitat access |
| --- | ---: | --- |
| Founded | 4-249 | Mk I and Mk II |
| First Breeding | 250-2,499 | Mk I and Mk II |
| Self-Sustaining | 2,500-24,999 | Mk I and Mk II |
| Thriving | 25,000-175,000 | Mk I and Mk II |
| Abundant | 175,001-350,000 | Mk II only |

Both Habitat tiers display this same five-stage ladder. Mk I reaches its 175,000 capacity at the end of Thriving. Mk II unlocks at 600,000 Wildlife after Deep Exotics and raises capacity to 350,000, allowing the colony to cross into Abundant. The upgrade changes capacity only. Mature draw is 40-64 W at Mk I and 144-168 W at Mk II.

## Breeding

Each creature completes breeding cycles. Population supplies natural momentum: a Common colony produces about 28 individuals/h naturally at 5,000 population, then the population contribution smoothly flattens toward 150 individuals/h. Life-support efficiency and rarity change that natural rate: Common 1.0x, Uncommon 0.75x, Rare 0.50x, Legendary 0.30x. Purchased bonuses improve selected parts of this curve while hard caps keep even a complete tree to a few times untreated output. Some brood bonuses save fractional progress across cycles and eventually guarantee an extra individual. Full-support momentum takes 24 world hours to reach maximum and loses progress twice as quickly while support is imperfect. Capacity never slows breeding; it only stops growth when the Habitat is full. `breeding_efficiency()` is only the life-support multiplier, not the population rate. Read `breeding_rate()` for expected individuals per hour.

## Adaptations and Insight

Every species has two independent permanent nodes. Its 1 Insight **Adaptation** affects that species only. Its 4 Insight **Breakthrough** affects every species and also requires its source colony to reach 10,000 population. Neither node requires research, Compound, planet-wide Wildlife, or the other node. Insight accrues from population delta along diminishing milestones: 1.00 by 10, 1.50 by 100, 2.25 by 1,000, 3.00 by 10,000, 4.00 by 50,000, 5.50 by 175,000, and 7.00 by 350,000.

Only established colonies count toward the planet-wide phases. Failed rearing never touches the sensor, and established population never decreases.

## See also

- [[Habitat Development]]: spending the Insight
- [[Wildlife Creature Profiles]]: rarity and requirement escalation
