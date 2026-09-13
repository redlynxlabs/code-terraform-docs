---
tags:
  - type
  - contracts
aliases:
  - CoreSampleContract
  - CoreDevice
---
# Core Sample

Contract `core_sample` (unlocked by **Smart Contractor** research). Extends [[Contract]] with:

| Member | Returns | Meaning |
| --- | --- | --- |
| `.cores` | list | The 10 damaged cores as byte lists; **a byte destroyed in transit reads `None`**: recover it from the construction rules |
| `.device` | `CoreDevice` | Submit rebuilt cores here |

## CoreDevice

### .submit(index, bytes)
Submit a rebuilt core for slot 0-9 as a list of whole-number bytes (0-255). A rejected submission does not lock the slot.

**Returns:** [[ActionResult]] · Outcomes: `"locked"` (success: satisfies every construction rule and preserves all surviving bytes) / `"rejected"` (well formed but violates a rule) · **Raises:** `TypeError` / `ValueError` for malformed input

### .recovered() / .target()
Cores locked in the current script run (fresh runs start at 0) and the completion target (10).

**Returns:** number

### .token()
The passcode to transmit: non-empty once `recovered()` reaches `target()`, else `""`.

**Returns:** string
