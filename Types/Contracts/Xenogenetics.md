---
tags:
  - type
  - contracts
aliases:
  - XenogeneticsContract
---
# Xenogenetics

Contract `xenogenetics`. Extends [[Contract]] with:

| Member | Returns | Meaning |
| --- | --- | --- |
| `.earth_ref` | list of strings | 50 known Earth gene sequences |
| `.samples` | list of strings | 1,000 collected DNA samples |

**Approach:** compare each sample against the Earth reference set per the briefing's matching rule and transmit the requested answer (count or identification).
