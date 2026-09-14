---
tags:
  - type
  - fleet-vehicles
aliases:
  - DroneOilTank
title: "DroneOilTank"
---

Fuel view on **heli** drones. **Returned by:** `self.oil_tank` on drones.

| Method | Returns | Meaning |
| --- | --- | --- |
| `.level()` | number | Current oil in **tons** across mounted Oil Tanks |
| `.capacity()` | number | Total oil capacity in tons |
| `.percent()` | number | Oil fraction 0-1 |

**Every call raises `ReferenceError`** when the drone does not have a heli powertrain. Check `DroneRef.engine` first in mixed fleets.

## See also

- [[DroneBattery]]: the electric equivalent
