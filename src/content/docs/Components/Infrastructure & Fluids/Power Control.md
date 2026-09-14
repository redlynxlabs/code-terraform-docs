---
tags:
  - component
  - infrastructure-fluids
aliases:
  - power_control
title: "Power Control"
---

Discover every independent power grid, inspect connected outposts, buildings, and field power structures, read generation, consumption, battery charge, and Lightning reserve, or operate machine breakers from one shared controller. **Grid objects are snapshots of the latest completed power allocation**: after changing a breaker or rewiring, re-query on the next loop iteration.

**Access:** `get_component("power_control")` · Like every component, exposes `.id` and `.name`.

```python
power = get_component("power_control")
for grid in power.grids():
    print(grid.anchor_id, grid.generated, grid.consumed, grid.net)
    for member in grid.members:
        print("  ", member.id, member.roles, member.generated, member.consumed)
```

## Methods

### .grids()
Every independent power grid on the planet as a fresh list of [[PowerGrid]] snapshots. Isolated completed outposts and field structures appear as their own grids, so scripts never guess grid ids.

**Returns:** List of `PowerGrid`

### .grid(target_id)
The grid containing `target_id` (an outpost, building, or field power-structure id; a returned grid's `.anchor_id` also works). `None` means the target is unknown, mobile, under construction, not a building or field power structure, or not part of a completed power grid.

**Returns:** `PowerGrid` or `None`

### .total()
Planet-wide [[PowerSummary]] across every independent grid. Conventional battery storage and Lightning reserve stay separate so automation can see which supply it relies on.

**Returns:** `PowerSummary`

### .is_powered(machine_id)
`True` when the named machine is currently switched on. Unknown ids return `False`, so it is safe to call before sending a breaker command.

**Returns:** Boolean

### .can_power_off(machine_id)
`True` when the machine exists and has a visible breaker toggle. Terraforming and many production machines can usually be switched; batteries, passive tanks, mobile units, and ship equipment usually cannot.

**Returns:** Boolean

### .set_powered(machine_id, on)
Send the same breaker command as clicking the machine card toggle: `power.set_powered("o2gen_1", False)`. **Switching off pauses scripts attached to that machine and preserves their setpoints; switching back on resumes only scripts that were paused by the power-off.**

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_found"` / `"not_toggleable"` / `"under_construction"` (transient) / `"not_connected"` / `"not_enough_power"`

## See also

- [[Power Networks]]: how grids form and allocate
- [[Run Control]]: the run/stop axis (a stop latches; a power toggle auto-resumes)
- [[Lightning Rod]]: the separate Lightning reserve
