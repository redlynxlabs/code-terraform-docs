---
tags:
  - type
  - biosphere
  - result
aliases:
  - AnalyzeResult
title: "AnalyzeResult"
---

Result of a specimen analysis. **Returned by:** `bio_lab.analyze()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"`, `"busy"` (transient), `"input_empty"`, `"invalid_specimen"` |
| `.message` | string | Player-readable explanation |
| `.info` | [[AnalyzeInfo]] or `None` | The completed analysis when `"ok"` |

## See also

- [[Bio Lab]]: the machine
