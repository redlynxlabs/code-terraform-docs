---
tags:
  - type
  - contracts
aliases:
  - ContractScript
title: "ContractScript"
---

The `self` object inside contract scripts.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.name` | string | Script name |
| `.contract` | [[Contract]] | The contract object with id, name, reward, and its contract-specific API |

Transmit answers with the [[Transmitter]] using `self.contract.id`.
