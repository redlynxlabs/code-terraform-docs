---
tags:
  - guide
  - production-logistics
  - module
---
# Cargo Rack

A **Cargo Rack** is a module that mounts in a modular vehicle's Universal slot and hosts [[Portable Storage Bin]] items. The rack itself stores nothing; it is a frame. The contained bins hold the materials.

Every bin installed in any rack contributes to the vehicle's cargo. Each bin holds exactly **one material or item id**: the first unit loaded into it latches that id; subsequent units must match. Property-distinct variants of that id remain separate logical stacks in the bin, so transferring an item never erases its properties.

```python
print(self.cargo.count(), "/", self.cargo.capacity())

for r in self.cargo.racks():
  for bin in r.bins:
    if bin is not None:
      print(bin.id, bin.item_id, bin.count, "/", bin.capacity)
      for stack in bin.stacks:
        print(stack.id, stack.count, stack.properties)
```

A bin drains back to **unassigned** when `send()` empties it to zero, ready for any material or item on the next trip.

## Variants

| Variant | Bin slots |
| --- | --- |
| Small Cargo Rack | 1 |
| Medium Cargo Rack | 2 |
| Large Cargo Rack | 3 |

Each rack occupies **1 Universal slot** on a compatible modular vehicle. Mount/unmount at base or any outpost.

## See also

- [[Rack]] and [[Bin]]: the API types returned by `self.cargo.racks()`
- [[ItemStack]]: property-distinct stacks inside a bin
- [[Pioneer]]: mounting and installing via `mount()` and `install()`
