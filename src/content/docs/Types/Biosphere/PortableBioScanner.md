---
tags:
  - type
  - biosphere
aliases:
  - PortableBioScanner
title: "PortableBioScanner"
---

Drone bio-scanner module. **Returned by:** `self.bio_scanner` on drones.

### .scan()
**Yielding** scan at the hovering drone's current whole-number coordinate. A valid non-site coordinate completes with an empty biological scan. Repeat scans are free.

**Returns:** [[BioScanResult]] (payload `.scan`) · Outcomes: `"ok"` / `"not_mounted"` / `"scrambled"` (transient) / `"busy"` (transient) / `"not_at_location"` (finish the route and hover at a whole-number coordinate first)

## See also

- [[Biosphere Biomass Tier]]: scan-and-extract routes
- [[PortableBioExtractor]]: the harvest half
