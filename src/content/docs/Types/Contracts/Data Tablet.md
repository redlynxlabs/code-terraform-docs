---
tags:
  - type
  - contracts
aliases:
  - DataTabletContract
  - DataTablet
  - ProbeResult
title: "Data Tablet"
---

Contract `data_tablet`. Extends [[Contract]] with:

### .tablet
The data tablet scanner.

**Returns:** `DataTablet`

## DataTablet

### .probe(row, col)
Probe a cell and return a `ProbeResult`.

**Returns:** `ProbeResult` · **Raises:** `TypeError` / `ValueError` for malformed coordinates

### .rows / .cols
Grid dimensions.

**Returns:** number

## ProbeResult

| Member | Returns | Meaning |
| --- | --- | --- |
| `.char` | string | Character at this cell |
| `.distance` | number | **Manhattan distance** (steps) to the nearest message cell; 0 means this cell IS a message cell |

**Approach:** use the distance gradient to home in on message cells instead of scanning the whole grid, collect their characters, and transmit the message.
