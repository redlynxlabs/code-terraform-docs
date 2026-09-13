---
tags:
  - type
  - storage-inventory
aliases:
  - Bin
---
# Bin

One installed Portable Storage Bin. **Returned by:** `Rack.bins`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | `"portable_bin"` (25 units) or `"heavy_portable_bin"` (50 units) |
| `.capacity` | number | Rated units: 25 basic, 50 heavy |
| `.count` | number | Current units stored |
| `.item_id` | string or `None` | Assigned item id, or `None` when empty/unassigned |
| `.stacks` | list of [[ItemStack]] | Property-distinct snapshots; equal ids with different properties stay separate |
