---
tags:
  - type
  - infrastructure-fluids
aliases:
  - FluidPort
title: "FluidPort"
---

Any `<fluid>_in` / `<fluid>_out` property on a flow-network machine.

## Connection

### .connect(target)
Record or replace **this port's one declared target**, by stable machine id or display name. The target must expose a compatible opposite-direction port. **Either the provider or consumer may declare the relationship; one declaration is enough.** Local machines transfer directly; remote intent waits for any completed conflict-free same-medium pipe component reaching both anchors.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_found"` / `"incompatible"`

### .disconnect()
Clear only this port's declared target. Buffered fluid remains; a peer's independent reverse declaration stays active.

**Returns:** ActionResult · Outcomes: `"ok"`

### .connected_to() / .connected_id()
Display name / stable id of the target **this port** declared (empty when none). Does not list reverse declarations owned by peers; for every effective peer use `connections()`.

**Returns:** string

### .connections()
Read-only snapshots of every effective peer relationship on this port, including declarations authored by peer ports, as [[FluidConnection]] values. Pipe ids are deliberately not exposed or selected.

**Returns:** list of `FluidConnection`

## Reads

### .level() / .capacity()
Current tons buffered at this port and the buffer maximum. Pass-through source ports (Pump outputs) store nothing and read 0.

**Returns:** number

### .flow_rate()
Current total live flow in t/h. **0 may mean idle, starved, full, unreachable, conflicted, or waiting across a simulation timing boundary; it does not erase the connection.**

**Returns:** number

## See also

- [[Flow Networks & Fluids]]: the full routing model
