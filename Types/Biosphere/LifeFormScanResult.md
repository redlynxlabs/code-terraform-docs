---
tags:
  - type
  - biosphere
aliases:
  - LifeFormScanResult
---
# LifeFormScanResult

A completed biological reading. **Returned by:** `PortableBioScanner.scan().scan` after `status == "ok"`, and journal biosite queries.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.coord` | [x, y] | Whole-number coordinate of the scanned location |
| `.life_forms` | list of [[LifeFormSample]] | 0-3 entries per tile; **empty list = "scanned, nothing here"** |
| `.is_empty` | boolean | `True` when no life forms were found |
