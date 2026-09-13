---
tags:
  - type
  - infrastructure-fluids
aliases:
  - Pipe
---
# Pipe

One physical pipe piece. **Returned by:** `list_pipes()` / `get_pipe(pipe_id)`

| Method | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Unique pipe identifier |
| `.start()` / `.end()` | [[Position]] or `None` | Geometric endpoints of this piece (construction geometry, **not flow direction**) |
| `.type()` | string | Hardware medium: `"gas"` or `"liquid"` |
| `.contents()` | string or `None` | The one exact fluid established by complete player connections reaching this component; `None` when no complete connection exists or multiple substances conflict. Activity, power, throttle, flow, and headroom do not change this identity |
| `.conflicting_contents()` | list of strings | Sorted exact substances when more than one complete connection uses this component; **non-empty means flow is halted** |
| `.connections()` | list of dicts | Diagnostic machine-port claims: `machine_id`, `port`, `direction`, `fluid`, and a representative `pipe_id` (players never connect to pipe ids directly) |
| `.incompatible_sinks()` | list of strings | Directly connected consumers that cannot accept `contents()`; they receive nothing while compatible branches keep flowing |
| `.is_complete()` | boolean | `True` once the Constructor finished laying it and flow can run |
| `.length()` | number | Total meters across every H/V segment |
| `.laying_head()` | [x, y] or `None` | Current laying-head coordinates while incomplete |
| `.flow_rate()` | number | t/h currently moving; 0 while incomplete, stalled, source-empty, or conflicted |
| `.state()` | string | `"flowing"` / `"stalled"` / `"incomplete"` / `"no_source"` / `"conflict"` |

## See also

- [[Infrastructure & Pipes]] and [[Flow Networks & Fluids]]
