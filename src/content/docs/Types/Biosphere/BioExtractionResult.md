---
tags:
  - type
  - biosphere
  - result
aliases:
  - BioExtractionResult
title: "BioExtractionResult"
---

Result of a drone biological harvest. **Returned by:** `PortableBioExtractor.extract()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"`, `"not_mounted"`, `"scrambled"` (transient), `"busy"` (transient), `"not_at_location"`, `"not_scanned"`, `"cooling"` (transient: site still replenishing), `"no_cargo_space"` (every compatible container full or assigned to another type) |
| `.message` | string | Player-readable explanation |
| `.extracted` | number | Tons committed to drone cargo; 0 for every rejection |

## See also

- [[PortableBioExtractor]]
