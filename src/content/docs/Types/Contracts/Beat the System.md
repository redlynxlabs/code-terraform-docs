---
tags:
  - type
  - contracts
aliases:
  - BeatTheSystemContract
  - Arbiter
title: "Beat the System"
---

Contract `beat_the_system` (unlocked by **Smart Contractor** research). Extends [[Contract]] with:

### .arbiter
The alien Arbiter opponent. Its policy: **it takes an immediate win, otherwise blocks your immediate win, otherwise prefers centre, then corners, then edges; tied choices are random.**

**Returns:** `Arbiter`

## Arbiter

Tic-tac-toe device; you play a 3×3 board and must win a streak.

### .new_game() / .restart()
Start a fresh game on an empty board; you move first. `restart()` abandons any game in progress, and **abandoning mid-play counts as a non-win and resets the streak to 0**. Both pause about half a second between games.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"in_progress"` (transient, new_game only)

### .play(cell)
Place your mark in cell 0-8 (row-major); the Arbiter responds. Three in a row, column, or diagonal wins.

**Returns:** ActionResult · Outcomes: `"ongoing"` / `"win"` / `"loss"` / `"draw"` (all success) / `"occupied"` / `"no_game"` · **Raises:** `TypeError` (non-numeric cell), `ValueError` (non-finite, fractional, or out-of-range)

### .board()
The 9 cells as a list, index 0-8 row-major: `""` (empty), `"you"`, or `"arbiter"`.

**Returns:** list of strings

### .result()
`"ongoing"`, `"win"`, `"loss"`, `"draw"`, or `"no_game"`.

**Returns:** string

### .streak() / .target()
Consecutive wins in the current script run (resets on loss, draw, abandonment, or fresh run) and the streak needed to complete the contract.

**Returns:** number

### .token()
The passcode to transmit: non-empty once `streak()` reaches `target()`, else `""`.

**Returns:** string
