---
tags:
  - type
  - world-sites
aliases:
  - OilWell
---
# OilWell

Extends [[Site]] (shared members and the pre-survey snapshot rule there). Any Site-returning API where `kind() == "oil"`, e.g. `oil_pump.well()`. Discovery requires a **Deep sonar** after Petroleum Survey research.

### .yield_tier()
`"standard"` (1×) / `"rich"` (2×) / `"pure"` (3×). `None` until surveyed.

**Returns:** string or `None`

### .flow_rate()
Peak tons of oil per hour: **8 / 16 / 24** for standard / rich / pure. **Oil wells pulse through active and dormant phases**: a dormant well delivers nothing at any throttle (read the pump's `well_active()`). `None` until surveyed; live afterwards.

**Returns:** number or `None`

### .has_pump() / .pump_id()
Whether an [[Oil Pump]] is deployed, and its machine id (empty string when none). Pre-survey sonar results always report `False` / empty.

**Returns:** boolean / string

## See also

- [[Water & Oil Wells]]: the system guide
