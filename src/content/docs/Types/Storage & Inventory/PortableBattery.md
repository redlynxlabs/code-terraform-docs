---
tags:
  - type
  - storage-inventory
aliases:
  - PortableBattery
title: "PortableBattery"
---

One installed portable cell. **Returned by:** `self.battery.holders()[...].batteries[...]`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | `"portable_battery"` (50 Wh) or `"heavy_portable_battery"` (100 Wh) |
| `.level()` | number | Charge as a 0-1 fraction |
| `.wh()` | number | Current charge in Wh |
| `.capacity()` | number | Rated capacity in Wh |
