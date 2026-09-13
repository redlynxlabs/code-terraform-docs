---
tags:
  - type
  - fleet-vehicles
aliases:
  - DroneBattery
---
# DroneBattery

Power view on **electric** drones. **Returned by:** `self.battery` on drones.

| Method | Returns | Meaning |
| --- | --- | --- |
| `.level()` | number | Current charge in **Wh** across mounted Battery Packs |
| `.capacity()` | number | Total capacity in Wh |
| `.percent()` | number | Charge fraction 0-1 (`level / capacity`) |

**Every call raises `ReferenceError`** when the drone does not have an electric powertrain and mounted Battery Pack. In mixed fleets, check `DroneRef.engine` from `fleet.drones()` first.

## See also

- [[DroneOilTank]]: the heli equivalent
