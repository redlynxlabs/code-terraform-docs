---
tags:
  - guide
  - production-logistics
  - module
---
# Battery Holder

A **Battery Holder** is a module that mounts in a modular vehicle's Universal slot and hosts [[Portable Battery]] items. The holder itself stores no energy; it is a rack. The contained batteries hold the charge.

Every battery installed in any holder contributes to the vehicle's single shared battery pool. Uninstalling a battery shrinks the pool immediately and transfers that cell's proportional share of stored charge back onto the battery item. Reinstalling restores only that retained charge, so moving cells never creates free energy.

Scripts query the pool through `self.battery`:

```python
level = self.battery.level()    # 0-1
wh = self.battery.wh()          # current Wh
cap = self.battery.capacity()   # max Wh = sum of every battery's rated Wh
```

For per-holder detail:

```python
for h in self.battery.holders():
  print(h.size, h.wh, "/", h.capacity)
  for b in h.batteries:
    if b is not None:
      print(" ", b.id, b.wh(), "/", b.capacity())
```

## Variants

| Variant | Bays |
| --- | --- |
| Small Battery Holder | 1 |
| Medium Battery Holder | 2 |
| Large Battery Holder | 3 |

Each holder occupies **1 Universal slot** on a compatible modular vehicle. Mount/unmount at base or any outpost.

## See also

- [[Holder]]: the API type returned by `self.battery.holders()`
- [[Pioneer]]: mounting and installing via `mount()` and `install()`
