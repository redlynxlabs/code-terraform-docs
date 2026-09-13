---
tags:
  - type
  - storage-inventory
  - result
aliases:
  - DiscardResult
---
# DiscardResult

Result of permanent cargo destruction. **Returned by:** `Cargo.discard()`, `DroneCargo.discard()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"`, `"partial"`, `"empty"`, `"busy"`, `"invalid_rack"`, `"no_op"`, `"invalid_properties"`, `"invalid_property_match"`, `"source_changed"` |
| `.message` | string | Player-readable explanation (never branch on it) |
| `.requested` | number | Units requested or observed for destruction |
| `.discarded` | number | Units permanently destroyed |

See [[Command Results]] for the shared result model.
