---
tags:
  - type
  - storage-inventory
aliases:
  - Rack
title: "Rack"
---

One mounted Cargo Rack. **Returned by:** `self.cargo.racks()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Rack module id, e.g. `"cargo_rack_medium"` |
| `.size` | string | `"small"` / `"medium"` / `"large"` (1 / 2 / 3 bins) |
| `.bins` | list | Indexed by internal slot: a [[Bin]] or `None` per bay |
