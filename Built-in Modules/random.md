---
tags:
  - reference
  - module
---
# random

Built-in random-number helpers. Each successful run gets a new automatic sequence; use `random.seed(value)` when you want a reproducible sequence. Works without Shared Library research.

## random.random()
Random floating-point number `>= 0` and `< 1`. Each successful run begins a new automatic sequence. Also callable globally as `random()`.

**Returns:** number

## random.rand()
Short alias for `random()`. Also callable globally as `rand()`.

**Returns:** number

## random.randint(min, max, /)
Random integer `N` where `min <= N <= max`. Bounds are inclusive and must be whole numbers. Each successful run begins a new automatic sequence. Useful with `planet.get_bounds()` for random valid coordinates. Also callable globally as `randint(min, max)`.

**Returns:** number

## random.seed(a=None)
Initialize random-number generation. Omit `a` or pass `None` to select another automatic sequence. Pass a number, boolean, or string to make later draws reproducible; the same value produces the same sequence.

**Returns:** None

## See also

- [[Utility Helpers]]: random numbers in practice
