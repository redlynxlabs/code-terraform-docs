---
tags:
  - type
  - contracts
aliases:
  - RelayHackContract
  - RelayLock
---
# Relay Hack

Contract `relay_hack`. Extends [[Contract]] with:

### .lock
The relay lock to crack.

**Returns:** `RelayLock`

## RelayLock

### .intercept(code)
Test a list of **exactly 6** whole-number values (0-99) and get one `True`/`False` per tumbler.

**Returns:** list of booleans · **Raises:** `TypeError` / `ValueError` for malformed input

### .tumblers / .range
Number of tumblers (6) and range per tumbler (100 = 0-99).

**Returns:** number

**Approach:** each tumbler's boolean is independent, so solve tumbler-by-tumbler (or sweep values) rather than brute-forcing the full 100^6 space, then transmit the code.
