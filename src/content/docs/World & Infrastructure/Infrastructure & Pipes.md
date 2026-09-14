---
tags:
  - guide
  - world-infrastructure
title: "Infrastructure & Pipes"
---

## Overview

**Infrastructure** is physical hardware built on the Planet Map. Gas pipes carry gases and consume `gas_pipe_segment` items. Liquid pipes carry liquids and consume `liquid_pipe_segment` items. Hardware establishes only the medium; complete player-authored provider-consumer connections establish exact contents.

## Building a pipe

Plan Mode and `construction_blueprint.plan_pipe(...)` create tile-based [[Construction]] jobs. A [[Pioneer]] with a Constructor executes each job:

```python
bpq = get_component("construction_blueprint")
bpq.plan_pipe("liquid", 0, 0, 80, 0)
for job in bpq.pending_constructions():
    if job.kind == "pipe":
        self.nav.set_target(job.position.x, job.position.y)
        self.nav.set_throttle(1)
        while self.nav.get_distance_to(job.position.x, job.position.y) > 2:
            pass
        self.nav.brake()
        build = self.constructor.execute(job.id)
        print(build.status, build.message)
```

Unbuilt pieces are ghosts and transport nothing.

## Physical topology

- **Touching geometry connects.** Same-medium segments connect wherever their tile-aligned paths touch. Ordinary T and cross shapes are real junctions.
- **Service-footprint contacts stay independent.** Two fluid components do not merge merely because both touch the same outpost. The outpost footprint exposes each component independently to connected local machines. This allows water, oil, and other routes to touch one outpost without becoming one physical network.
- **Connections define contents.** Provider presence alone and consumer presence alone are neutral. Each complete compatible remote `connect()` relationship selects at most one physical component reaching both locations and establishes its exact fluid there, including while idle, full, powered off, or throttled to zero.
- **Conflicts halt flow.** If exactly one component serves simultaneous water and oil relationships, both connector claims conflict and that component stops. Separately designated components produce the same conflict if their physical geometry is joined. The same applies to different gases. Same-fluid connections may share one component and its capacity.
- **Machines do not connect to pipe ids.** Scripts connect providers and consumers. Local machines transfer directly; each remote relationship retains one valid non-conflicting completed physical component reaching both locations, or selects a same-fluid component and then a neutral one. Independent components never pool capacity automatically.
- **Bridges cross without joining.** Gas, liquid, and power bridges are 3-tile overpasses. Their own axis connects; a perpendicular line beneath the middle tile remains a different network.

## Throughput

Throughput belongs to the **component**, not its segments. Individual pipe segments have no capacity stat. The common layout with one source link and one sink link starts at **2,000 t/h**, shared by every compatible relationship assigned to that component. **High-Pressure Fluid Transport** research retrofits every completed and future Gas Pipe and Liquid Pipe attachment link to **6,000 t/h**. Pipe length and extra pieces within the same route do not reduce or increase the limit. Multiple attachment links on both sides can raise aggregate capacity, while machine rates, throttle, supply, demand, and headroom may impose a lower live rate.

## Inspecting pipes

```python
for pipe in list_pipes():
    print(pipe.id, pipe.type(), pipe.contents(), pipe.state())
    print("connections", pipe.connections())
    print("conflicts", pipe.conflicting_contents())
```

These pipe ids are inspection and construction identities, not player fluid-port handles. On the Planet Map, flowing networks use the exact fluid color, stalled networks are amber, and conflicts are red.

## Materials and recovery

Pipe segment cost is based on route length, approximately **one segment per 10 meters**. If construction pauses, query `get_component("construction_blueprint").paused_constructions()` and execute the same job again within range. Splitting or removing a route recomputes physical reachability immediately while preserving player-authored machine connection intent.

## Cross-references

- [[Flow Networks & Fluids]]: transport, throughput, and backpressure behavior
- [[Power Networks]]: wire topology and power bridges
- [[Constructor Module]]: `self.constructor.execute(...)`
- [[Construction Blueprint]]: script-side planning
- [[Thermal Vents]] and [[Water & Oil Wells]]: physical producers
