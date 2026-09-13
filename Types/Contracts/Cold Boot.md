---
tags:
  - type
  - contracts
aliases:
  - ColdBootContract
---
# Cold Boot

Contract `cold_boot`. Extends [[Contract]] with:

### .program
The artifact's bytecode: a list of whole numbers. **Copy it before running:** `memory = list(program)`.

**Returns:** list of numbers

**Approach:** implement the artifact's virtual machine as described in the contract briefing, execute the bytecode against your copied memory, and transmit what the program produces.
