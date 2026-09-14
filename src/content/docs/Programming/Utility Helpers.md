---
tags:
  - guide
  - programming
title: "Utility Helpers"
---

Small helper functions are always available in every script. Use this page when you need quick random numbers, bounds-safe coordinates, math, collection transforms, or console output without hunting through the full [[Built-in Functions]] reference.

## Random numbers

Use the Python-shaped module form when you want code to read like normal Python:

```python
import random as rng

roll = rng.randint(1, 6)
jitter = rng.random()
print("roll", roll, "jitter", jitter)
```

`random.random()` returns a float from 0 up to but not including 1. `random.rand()` is the same helper with a shorter name. `random.randint(min, max)` returns a whole number between `min` and `max`, including both ends.

You can also call the same helpers globally:

```python
roll = randint(1, 6)
jitter = rand()
```

If you import the module as plain `import random`, the name `random` refers to the module in that script. That is fine; call `random.random()` for the float helper.

## Random valid coordinates

Planet bounds are a good partner for `randint`:

```python
planet = get_component("nocturna")
b = planet.get_bounds()
x = randint(b.min_x, b.max_x)
y = randint(b.min_y, b.max_y)
if planet.contains(x, y):
  print("valid target", x, y)
```

## Numeric helpers

Common math helpers are built in:

- `min(...)` / `max(...)`: choose the smallest or largest value
- `sum(items, start=0)` / `prod(items, start=1)`: add or multiply numeric values
- `round(n, digits?)`, `floor(n)`, `ceil(n)`, `trunc(n)`: shape numbers
- `abs(n)`, `sign(n)`, `divmod(a, b)`: distance, direction, and quotient/remainder
- `sqrt(n)`, `sin(n)`, `cos(n)`, `atan2(y, x)`: geometry and steering helpers
- `degrees(rad)` / `radians(deg)`: convert angle units

Example:

```python
distance = 42.8
whole = ceil(distance)
hours, minutes = divmod(135, 60)
print(whole, hours, minutes)
```

## Collection helpers

These help with lists, tuples, strings, dicts, and sets:

- `len(value)`: length
- `range(...)`: integer sequences for loops
- `sorted(sequence, key=fn, reverse=False)`: sorted copy
- `reversed(sequence)`: reversed copy
- `enumerate(sequence)`: `(index, value)` pairs
- `zip(a, b, ..., strict=False)`: combine sequences; `strict=True` raises if lengths differ
- `map(fn, sequence)` / `filter(fn, sequence)` / `reduce(fn, sequence, initializer?)`: transform, select, or fold values
- `pairwise(sequence)`: neighboring pairs, useful for route segments
- `batched(sequence, size)`: chunks for page-sized work or repeated commands
- `starmap(fn, sequence)`: unpack tuple/list rows into a function call
- `flatten(sequence)`: one-level flattening for nested route or cargo lists
- `count_by(sequence, key_fn?)`: counts into a dict, optionally by a computed key
- `all(sequence)` / `any(sequence)`: boolean checks

Example:

```python
items = ["iron_ore", "ice", "quartz"]
for index, item in enumerate(sorted(items)):
  print(index, item)
print(count_by(["ice", "ore", "ice"]))
```

## Console helpers

Use `print()` for normal output, `warn()` for persistent warnings, `debug()` for low-priority telemetry, and `notify(text, level?)` for on-screen alerts. Use the [[Console]] component when a script intentionally owns a noisy display.

```python
warn("storage nearly full")
debug("loop heartbeat")
notify("Rover battery low", "warn")
console = get_component("console")
console.clear("alarms")
```

For the exhaustive list and exact signatures, open [[Built-in Functions]].
