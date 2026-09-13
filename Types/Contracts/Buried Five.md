---
tags:
  - type
  - contracts
aliases:
  - BuriedFiveContract
  - Analyzer
---
# Buried Five

Contract `buried_five`. Extends [[Contract]] with:

| Member | Returns | Meaning |
| --- | --- | --- |
| `.transmission` | list of strings | The scrambled transmission: single-character tokens |
| `.analyzer` | `Analyzer` | The recovered device that collapses expanded groups |
| `.layers` | number | Whole-number count of five-fold wrapping layers applied |

## Analyzer

### .read(group)
Read a list of **exactly five** string tokens and return the single token they were expanded from.

**Returns:** string · **Raises:** `TypeError` (non-list or non-string elements), `ValueError` (wrong length or unrecognized group)

**Approach:** the transmission was expanded `layers` times, each token becoming five. Collapse groups of five with `analyzer.read(...)` repeatedly, layer by layer, until one token per position remains, then transmit the recovered message.
