---
tags:
  - type
  - contracts
aliases:
  - LatticeContract
  - LatticeGrid
---
# Lattice

Contract `lattice` (unlocked by **Smart Contractor** research). Extends [[Contract]] with:

### .grid
The alien deep-scan lattice. **Probe only proven-clear cells** to map the volatile nodes; a trip blocks further probes until the grid is reset.

**Returns:** `LatticeGrid`

## LatticeGrid

A 32×32 minesweeper-style deduction board.

### .width() / .height()
Grid dimensions in cells (32 each).

**Returns:** number

### .start()
A guaranteed-clear foothold cell as `[x, y]`. Probe it first to begin the deduction.

**Returns:** [x, y]

### .probe(x, y)
Probe a proven clear cell; the reading is the count of neighboring volatile nodes (0-8). **Tripping a node faults the lattice until `reset()`.** Malformed coordinates raise `TypeError`/`ValueError` without tripping an intact lattice.

**Returns:** [[LatticeProbeResult]] (payload `.reading`) · Outcomes: `"ok"` / `"node_tripped"` / `"lattice_tripped"`

### .reset()
Clear a tripped fault so probing can continue in the same run. **The hidden board and starting cell do not change.**

**Returns:** [[ActionResult]] · Outcomes: `"ok"`
