---
tags:
  - type
  - orders-comms
aliases:
  - DockSlot
---
# DockSlot

One Supply Dock physical slot. **Returned by:** `supply_dock.slots()` (always 5 entries, indexes 0-4)

| Member | Returns | Meaning |
| --- | --- | --- |
| `.index` | number | Zero-based slot index (0-4), stable across calls |
| `.item_id` | string or `None` | Item id occupying this slot; `None` when the current Order hasn't opened it |
| `.count` | number | Units currently stored |

## See also

- [[Supply Dock]]: the component
