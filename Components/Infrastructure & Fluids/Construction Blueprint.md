---
tags:
  - component
  - infrastructure-fluids
aliases:
  - construction_blueprint
---
# Construction Blueprint

Manages planned construction and removal work. **Plan Mode and scripts share the same queue.** Scripts can place structures, pipes, power lines, and bridges, or mark existing structures for removal. Planning creates the map marker immediately without a vehicle at the site; a [[Pioneer]] with a [[Constructor Module]] must still travel to each job and call `self.constructor.execute(construction.id)`.

**Access:** `get_component("construction_blueprint")` · Like every component, exposes `.id` and `.name`.

## Planning methods

All return [[BlueprintPlanResult]] (payload `.blueprint_ids`).

### .plan_structure(kind, x, y, rotation=0)
Create one point-structure ghost. Kinds: `"outpost"`, `"thermal_cap"`, `"water_pump"`, `"oil_pump"`, `"exotic_gas_cap"`, `"exotic_spring_tap"`, `"mining_drill"`, `"mining_drill_industrial"`, `"mining_drill_heavy"`. Drill kinds require their matching Earth Order kit recipe. Coordinates snap to the map grid; extraction structures snap to the exact matching surveyed feature, Outposts use the snapped footprint anchor. Rotation is 0, 90, 180, or 270 clockwise.

**Outcomes:** `"ok"` / `"locked"` / `"invalid_kind"` / `"invalid_rotation"` / `"out_of_bounds"` / `"wrong_target"` (position lacks the required map feature) / `"unsurveyed_target"` / `"too_hard"` (drill cannot cut this hardness) / `"target_claimed"` / `"occupied"` / `"clearance"` (crosses an Outpost or anomaly clearance boundary) / `"blocked"`

### .plan_pipe(medium, x1, y1, x2, y2)
Create pipe jobs. Requires Constructor Module research. `medium` is `"gas"`, `"liquid"`, or a registered fluid id such as `"steam"`, `"water"`, `"oil"`. Coordinates snap to tile-center lanes. A field structure uses its site coordinates; an **internal outpost machine uses its owning outpost as the utility anchor**, so route to a point in `building.outpost`'s footprint (`[building.outpost.x, building.outpost.y]`), not the vehicle docking point in `building.position`. Existing matching pieces are reused automatically.

**Outcomes:** `"ok"` / `"locked"` / `"invalid_medium"` / `"out_of_bounds"` / `"invalid_route"` / `"blocked"` / `"already_exists"` (success, nothing created)

### .plan_power_line(x1, y1, x2, y2)
Create power-line jobs. Requires Constructor Module research. Coordinates snap to tile-center lanes; off-axis paths choose the valid L-shaped elbow with the least new construction. Same outpost-anchor rule as pipes.

**Outcomes:** `"ok"` / `"locked"` / `"out_of_bounds"` / `"invalid_route"` / `"blocked"` / `"already_exists"` (success)

### .plan_bridge(medium, x, y, axis)
Create one utility bridge job. `medium` is `"gas"`, `"liquid"`, `"power"`, or a registered fluid id; `x`/`y` are the bridge center tile; `axis` is `"horizontal"` or `"vertical"`.

**Outcomes:** `"ok"` / `"locked"` / `"invalid_medium"` / `"invalid_axis"` / `"out_of_bounds"` / `"blocked"` / `"already_exists"` (success)

### .mark_deconstruct(x, y, layer="auto", target_id="")
Mark built infrastructure or a normal map building for deconstruction. **Base and Outposts are protected.** When independent map layers overlap, choose `"building"`, `"gas"`, `"liquid"`, or `"power"`; the default `"auto"` requires an unambiguous target. At a same-layer junction, pass the exact `target_id`.

**Outcomes:** `"ok"` / `"locked"` / `"nothing_here"` / `"already_queued"` (success) / `"ambiguous_target"` / `"out_of_bounds"` / `"invalid_layer"` / `"blocked"`

## Queue methods

### .cancel(blueprint_id)
Cancel a queued, active, or paused blueprint. Unpaid jobs cancel immediately. **A paid job keeps its material at the build site: park a Pioneer there to recover it into cargo.** A failed recovery leaves the job and material intact.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_found"` / `"worker_not_present"` / `"no_cargo_space"` / `"construction_dependency"` (another job depends on this one)

### .pending_constructions()
Blueprints awaiting a worker, as a list of [[Construction]] snapshots (`.id`, `.kind`, `.medium`, `.position`, `.progress`, `.required_item`, `.required_count`). Drawn paths and marked targets are split into independent jobs, usually in placement order. **Read `c.required_item` and `c.required_count` to load exact cargo; never infer material from `c.kind`.** Filter by `.kind` to specialize a Pioneer's role; `.medium` distinguishes `"gas"`, `"liquid"`, `"power"` utility jobs (point structures have `.medium == None`).

**Returns:** List of `Construction`

### .active_constructions()
Blueprints currently being built (a Pioneer is working). Re-query for fresh `.progress`.

**Returns:** List of `Construction`

### .paused_constructions()
Blueprints started then abandoned (worker died, ran out of fuel, or script stopped). **Any Pioneer can resume** by navigating to `c.position` and calling `self.constructor.execute(c.id)`.

**Returns:** List of `Construction`

## See also

- [[Using Plan Mode]]: the UI equivalent of these calls
- [[Constructor Module]]: executes the jobs
- [[Infrastructure & Pipes]]: what pipes, lines, and bridges do
