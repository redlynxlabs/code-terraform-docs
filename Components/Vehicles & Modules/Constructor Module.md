---
tags:
  - component
  - vehicles-modules
  - module
aliases:
  - ConstructorModule
  - constructor
---
# Constructor Module

Pioneer-exclusive **module** for construction and deconstruction blueprints created in Plan Mode or by scripts: gas/liquid pipes, utility bridges, power lines, outposts, pumps, caps, and mining drills. Fits a `universal` slot. Load the required kits, segments, or bridge items into the Pioneer's cargo for build jobs, drive within interaction range of the blueprint position, then call `execute(blueprint_id)`. **Deconstruction reclaims** the dismantled kit or segment into the Pioneer's cargo. Internal outpost machines, including drone facilities, deploy directly from Inventory and are not Constructor jobs.

**Access:** `self.constructor` (on a [[Pioneer]] with the module mounted) · This page also covers the `ConstructorModule` API type.

## Methods

### .execute(blueprint_id) `SELF ONLY`
Pick up one [[Construction]] job from the shared planning queue and build or deconstruct it. Plan Mode and `get_component("construction_blueprint")` create equivalent jobs. Drive the Pioneer within interaction range of `blueprint.position` first, and use `pending_constructions()` to see what's ready. A Pioneer performs only one field action at a time. **Stop, power loss, leaving the site, rescue, or removing the Constructor Module pauses paid work without losing its progress or materials.** Resume the same id from `paused_constructions()`.

**Returns:** [[ActionResult]]

| Status | Kind | Meaning |
| --- | --- | --- |
| `"ok"` | success | Job built or deconstructed |
| `"not_mounted"` | rejection | The required module is not mounted |
| `"not_found"` | rejection | Blueprint id doesn't exist |
| `"locked"` | rejection | The blueprint kind requires research you have not unlocked |
| `"already_active"` | transient | The requested operation is already active |
| `"busy"` | transient | Another operation in flight |
| `"wrong_position"` | rejection | The worker is not at the operation's required position |
| `"insufficient_materials"` | rejection | Not enough of the required construction material in cargo |
| `"paused_no_power"` | transient | Paused because power is unavailable |
| `"cargo_present"` | rejection | Existing cargo prevents the requested change |
| `"blocked"` | rejection | Blocked by the current world state |
| `"paused"` | transient | The operation is paused |
| `"canceled"` | rejection | The operation was canceled |
| `"not_ready"` | rejection | Prerequisites are not currently satisfied |

## See also

- [[Construction Blueprint]]: the queue this executes from
- [[Using Plan Mode]] and [[First Outpost]]: tutorials
