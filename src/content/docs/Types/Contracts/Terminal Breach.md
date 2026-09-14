---
tags:
  - type
  - contracts
aliases:
  - TerminalBreachContract
  - AlienTerminal
  - GuessResult
title: "Terminal Breach"
---

Contract `terminal_breach`. Extends [[Contract]] with:

### .terminal
The alien security terminal.

**Returns:** `AlienTerminal`

## AlienTerminal

### .guess(digits)
Test a list of **exactly 15** whole-number digits (1-5) and get a `GuessResult`. Exact-position matches are removed first; `.misplaced` then counts shared remaining occurrences **without over-counting duplicates** (Mastermind scoring).

**Returns:** `GuessResult` · **Raises:** `TypeError` / `ValueError`

### .length
Whole-number code length (15).

**Returns:** number

## GuessResult

| Member | Returns | Meaning |
| --- | --- | --- |
| `.correct` | number | Digits in the correct position |
| `.misplaced` | number | Correct digits in wrong positions |

**Approach:** deduce digit counts first (constant guesses of all-1s through all-5s), then resolve positions; transmit the code.
