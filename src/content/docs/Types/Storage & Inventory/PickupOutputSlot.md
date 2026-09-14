---
tags:
  - type
  - storage-inventory
aliases:
  - PickupOutputSlot
title: "PickupOutputSlot"
---

Read-only pickup stockpile on field extractors. **Returned by:** `self.output` on field [[Water Pump]]s and [[Mining Drill]]s.

| Method | Returns | Meaning |
| --- | --- | --- |
| `.count()` | number | Item units waiting for carrier pickup |
| `.capacity()` | number | Maximum units the stockpile holds |
| `.stacks()` | list of [[ItemStack]] | Property-distinct snapshots waiting for pickup |

The machine has no routing methods of its own: **a physically present Rover or Pioneer connects its own input and pulls** (drones use `go_to_drill` + `cargo.load` at Mining Drills).
