---
tags:
  - type
  - contracts
aliases:
  - CorruptedArchiveContract
  - Archive
title: "Corrupted Archive"
---

Contract `corrupted_archive`. Extends [[Contract]] with:

### .archive
The scrambled data archive.

**Returns:** `Archive`

## Archive

### .flip(row, col)
Reveal and return the word at a grid cell.

**Returns:** string · **Raises:** `TypeError` (non-numeric coordinates), `ValueError` (fractional, non-finite, or out-of-bounds)

### .rows / .cols
Grid dimensions.

**Returns:** number

**Approach:** flip cells to reveal words, then reconstruct the original record per the briefing's ordering rule and transmit it.
