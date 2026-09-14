---
tags:
  - type
  - storage-inventory
aliases:
  - Battery (Vehicle)
title: "Battery (Vehicle)"
---

Aggregated vehicle battery view. **Returned by:** `self.battery` on [[Rover]] and [[Pioneer]]. (The base-station [[Battery]] building is a different component.)

| Method | Returns | Meaning |
| --- | --- | --- |
| `.level()` | number | Charge as a 0-1 fraction |
| `.wh()` | number | Current charge in Wh across all batteries |
| `.capacity()` | number | Maximum capacity in Wh |
| `.holders()` | list of [[Holder]] | Every mounted Battery Holder; **empty on the Rover** (sealed battery) |

## See also

- [[PortableBattery]]: the cells inside holders
