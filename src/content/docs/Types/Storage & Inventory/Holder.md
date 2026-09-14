---
tags:
  - type
  - storage-inventory
aliases:
  - Holder
title: "Holder"
---

One mounted Battery Holder. **Returned by:** `self.battery.holders()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Holder module id, e.g. `"battery_holder_medium"` |
| `.size` | string | `"small"` / `"medium"` / `"large"` (1 / 2 / 3 bays) |
| `.capacity` | number | Rated Wh across every battery in this holder |
| `.wh` | number | Current Wh in this holder |
| `.batteries` | list | Indexed by internal slot: a [[PortableBattery]] or `None` per bay |

Install and remove cells with the Pioneer's `install()` / `uninstall()`.
