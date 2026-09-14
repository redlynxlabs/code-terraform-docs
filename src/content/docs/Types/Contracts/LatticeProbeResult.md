---
tags:
  - type
  - contracts
  - result
aliases:
  - LatticeProbeResult
title: "LatticeProbeResult"
---

Result of a lattice probe. **Returned by:** `LatticeGrid.probe()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"` / `"node_tripped"` (probed cell held a volatile node; lattice faulted) / `"lattice_tripped"` (an earlier trip still faults the lattice) |
| `.message` | string | Player-readable explanation |
| `.reading` | number or `None` | Neighboring-node count 0-8 when `"ok"`; otherwise `None` |

See [[Lattice]] for the puzzle.
