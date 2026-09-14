---
tags:
  - type
  - storage-inventory
  - result
aliases:
  - ItemResult
title: "ItemResult"
---

Result of a single-item operation. **Returned by:** `harvester.store()`, `inventory.drop()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"`, `"empty"`, `"inventory_full"`, or `"invalid_slot"`, narrowed further by the command that returned it |
| `.message` | string | Player-readable explanation |
| `.item_id` | string or `None` | Stable id of the item moved or destroyed; `None` when no item changed |

See [[Command Results]] for the shared result model.
