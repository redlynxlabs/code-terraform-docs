---
tags:
  - guide
  - programming
---
# Numbers

## Overview

Numbers are one family: there is no separate stored `int` and `float` type. `int`, `float`, and `number` are three views of the same value, decided by the value itself.

## int, float, number

- `int`: a whole numeric value (no decimal part)
- `float`: a value with a decimal part
- `number`: either of the above

The label follows the current value, not how you wrote it:

```python
type(5)     # int
type(0.6)   # float
type(4.0)   # int  (whole value)
type(10 / 2) # int  (10 / 2 is 5.0)
type(10 / 3) # float
```

> [!info] Not Python's model
> In Python `type(4.0)` is `float` because the literal was written as a float. Here it is `int` because the value is whole. The number itself is identical, only the label differs.

## Checking a number

```python
isinstance(x, int)          # True if x is whole
isinstance(x, float)        # True if x has a decimal part
isinstance(x, int | float)  # True for either numeric category
isinstance(x, "number")     # True for any number
x % 1 == 0                  # True if x is whole
```

Use `isinstance(x, "number")` when you only care that a value is numeric at all, and `int(x)` to chop a value to a whole number (`int(3.7)` is `3`).

## Precision

Decimal numbers use standard floating-point arithmetic, so tiny rounding can show up:

```python
0.1 + 0.2  # 0.30000000000000004, not exactly 0.3
```

This is normal for calculated decimal values. Use `isclose()` when you mean close enough rather than bit-for-bit equality:

```python
if isclose(0.1 + 0.2, 0.3):
  print("equal for this calculation")
```

The default `rel_tol` handles ordinary rounding relative to the size of the values. Use `abs_tol` when your accepted difference has a real gameplay meaning. For example, this treats a Rover within half a meter on both axes as being at the target:

```python
target_x = 100
target_y = 40
pos = self.nav.get_position()
if isclose(pos.x, target_x, abs_tol=0.5) and isclose(pos.y, target_y, abs_tol=0.5):
  print("at target")
```

Choose the tolerance from what the value represents, such as meters, Wh, or a 0-1 level. Knowing only that a value is floating-point does not determine the right gameplay tolerance.

## See also

- [[Operators]]: division, floor division, and modulo
- [[Built-in Functions]]: `isclose`, `round`, `floor`, `ceil`, and friends
