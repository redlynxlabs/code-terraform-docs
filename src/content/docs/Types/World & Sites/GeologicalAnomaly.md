---
tags:
  - type
  - world-sites
aliases:
  - GeologicalAnomaly
title: "GeologicalAnomaly"
---

Extends [[Site]]. Any Site-returning API where `kind() == "inert"`: sonar resolved a physical formation with **no extractable signal**. It adds no members beyond the shared Site base; scanning alone resolves it (`survey()` is free and unneeded), and its footprint matters only as a construction obstacle (`"occupied"` / `"clearance"` rejections).

## See also

- [[Construction Blueprint]]: anomaly clearance rules
