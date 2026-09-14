---
tags:
  - type
  - contracts
aliases:
  - SealedVaultContract
  - Vault
  - VaultPosition
title: "Sealed Vault"
---

Contract `sealed_vault`. Extends [[Contract]] with:

### .vault
The sealed vault passage system. **Position resets to (0, 0) at the start of each contract script run; the maze layout stays fixed.**

**Returns:** `Vault`

## Vault

### .move(direction)
Step one cell: `"north"`, `"south"`, `"east"`, or `"west"`.

**Returns:** [[ActionResult]] · Outcomes: `"path"` (entered an ordinary cell) / `"wall"` (blocked, position unchanged) / `"exit"` (entered the exit cell) · **Raises:** `TypeError` / `ValueError`

### .position
Current cell as a `VaultPosition` (`.row`, `.col`, iterable for unpacking). Read again after `move()` for the new cell.

**Returns:** `VaultPosition`

### .escape()
Open the vault **from its exit cell**.

**Returns:** [[VaultEscapeResult]] (payload `.key`) · Outcomes: `"ok"` / `"not_at_exit"`

### .size
Side length of the square maze: start `(0, 0)`, exit `(size - 1, size - 1)`.

**Returns:** number

**Approach:** a wall-following or backtracking search reaches the exit; transmit the key from `escape()`.
