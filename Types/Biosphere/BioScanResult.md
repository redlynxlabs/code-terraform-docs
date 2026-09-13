---
tags:
  - type
  - biosphere
  - result
aliases:
  - BioScanResult
---
# BioScanResult

Result of a drone biological scan. **Returned by:** `PortableBioScanner.scan()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"`, `"not_mounted"`, `"scrambled"` (transient), `"busy"` (transient), `"not_at_location"` |
| `.message` | string | Player-readable explanation |
| `.scan` | [[LifeFormScanResult]] or `None` | The completed reading when `"ok"` |

## See also

- [[PortableBioScanner]]
