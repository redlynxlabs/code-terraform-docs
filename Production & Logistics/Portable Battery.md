---
tags:
  - guide
  - production-logistics
  - module
---
# Portable Battery

A **Portable Battery** is a rechargeable cell that installs into a [[Battery Holder]]'s internal slot. Shop-purchased cells arrive at 100% charge. Installed, the cell transfers its stored Wh into the vehicle's shared battery pool.

All installed batteries discharge together as one pool. An individual battery's `.wh()` tracks the pool's fill percentage scaled by the battery's rated capacity, not an independent charge. Uninstalling a cell transfers its proportional share of the pool back onto that battery item, so reinstalling never creates free energy.

## Variants

| Variant | Rated capacity |
| --- | --- |
| Portable Battery | 50 Wh |
| Heavy Portable Battery | 100 Wh |

Install or uninstall at base or any outpost.

## See also

- [[Battery (Vehicle)]]: the vehicle battery pool API
- [[PortableBattery]]: the item's own API type
