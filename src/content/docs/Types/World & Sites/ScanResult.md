---
tags:
  - type
  - world-sites
aliases:
  - ScanResult
title: "ScanResult"
---

Result of a base-scanner sweep or Harvester pickup. **Returned by:** `scanner.scan()`, `harvester.collect()`

### .status
Stable outcome code. Scanner results use `"ok"` / `"empty"`; Harvester results can also report `"holding"`, `"overheated"`, `"moving"` (in transit), `"busy"` (occupied by another action), or `"collecting"`.

**Returns:** string

### .message
Player-readable explanation. Never branch on it; branch on `.status` ([[Command Results]]).

**Returns:** string

### .id / .name / .value
Item id at the scanned sector (empty string if nothing), its display name, and its credit value.

**Returns:** string / string / number

## See also

- [[Scanner]] and [[Harvester]]: the producers
