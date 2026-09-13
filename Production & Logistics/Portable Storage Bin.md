---
tags:
  - guide
  - production-logistics
  - module
---
# Portable Storage Bin

A **Portable Storage Bin** is a single-material container that installs into a [[Cargo Rack]]'s internal slot. On its own, a portable bin stores nothing. Installed, it adds its rated capacity to the vehicle's cargo and accepts one material or item id at a time.

Use item id `"portable_bin"` for the standard bin and `"heavy_portable_bin"` for the heavy bin when calling `self.install(...)`.

The first unit loaded into the bin latches that id; subsequent units must match. When `send()` empties the bin to zero, it unassigns and is ready for any material or item on the next trip.

## Variants

| Variant | Capacity |
| --- | --- |
| Portable Storage Bin | 25 units |
| Heavy Portable Storage Bin | 50 units |

Install/uninstall at base or any outpost.

## See also

- [[Bin]]: the API type for an installed bin
- [[Storage Bin]]: the base-side stationary container (a different thing)
