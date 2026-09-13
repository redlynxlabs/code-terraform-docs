---
tags:
  - type
  - core-data
aliases:
  - Position
---
# Position

A coordinate snapshot. **Returned by:** `self.nav.get_position()`, `site.position()`, drone `.position()`, and many refs.

### .x / .y
Coordinates in meters from base for this snapshot.

**Returns:** number

### .\_\_iter\_\_()
Iterates over `x`, then `y`, so a position can be unpacked (`x, y = pos`) or passed to `list()`.

**Returns:** iterator of numbers
