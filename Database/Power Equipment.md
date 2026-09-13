---
tags:
  - database
  - equipment
---
# Power Equipment

Power generation, storage, charging, and grid hardware from the Shop. Research-gated equipment is documented before it appears in the Shop.

| Item | Id | Notes | Price |
| --- | --- | --- | --- |
| Solar Generator | `solar_generator` | Up to 50 W in sunlight, 0 W at night; poor tilt reduces daytime output. See [[Solar Generator]] | 500 cr |
| Small Battery | `battery` | Base-station energy storage. See [[Battery]] | 300 cr |
| Large Battery | `battery_large` | High-capacity base-station storage | 15,000 cr |
| Oil Generator | `oil_generator` | Burns oil to generate power. See [[Oil Generator]] | 2,000 cr |
| Reactor | `reactor` | Fission plant, up to 5,000 W from Fuel Rods and cooling water; one rod lasts 72 h at heat 1.0, and fuel use follows commanded heat even before the core reaches efficient temperature. See [[Reactor]] | 750,000 cr |
| Nuclear Battery | `nuclear_battery` | Uranium-core storage cell, 30× a base battery's charge. Produced by the [[Fuel Assembler]] | Fabricated |
| Lightning Rod | `lightning_rod` | 4,000 Wh, 600 m lightning reserve; condition falls 0.05/day, reducing capture to zero unless a script repairs it with Storm Glass. See [[Lightning Rod]] | Fabricated |

## See also

- [[Power Networks]]: grids and allocation
- [[Vehicle Charging Station]]: listed under [[Mining Equipment]]
