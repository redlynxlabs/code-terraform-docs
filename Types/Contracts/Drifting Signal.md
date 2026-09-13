---
tags:
  - type
  - contracts
aliases:
  - DriftingSignalContract
  - SlabDevice
---
# Drifting Signal

Contract `drifting_signal`. Extends [[Contract]] with:

### .device
The recovered slab contraption.

**Returns:** `SlabDevice`

## SlabDevice

### .slabs
Current state of the letter slabs: uppercase letters, spaces preserved.

**Returns:** string

**Approach:** the slabs hold a drifted version of the message; undo the drift per the briefing's rule and transmit the recovered text.
