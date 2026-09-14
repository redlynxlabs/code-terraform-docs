---
tags:
  - guide
  - programming
title: "Built-in Functions Overview"
---

These functions are always available. This is the compact overview; the full reference with exact signatures is [[Built-in Functions]].

## Output

- `print(values...)`: print normal text to console
- `warn(values...)`: print an amber warning line to the console's WARNINGS view
- `debug(values...)`: print low-priority telemetry, hidden from ALL unless debug output is enabled
- `notify(text, level?, duration?)`: show a toast and archive it in Notifications

## Types

- `type(value)`: returns value-based categories such as `int` for whole numbers, `float` for fractional numbers, `str`, and `bool`. Numeric categories use the current value, so `type(4.0)` is `int`.
- `isinstance(value, type)`: check type/category: `isinstance(name, str)`, `isinstance(n, int)`, `isinstance(n, int | float)`, `isinstance(x, (int, str))`, or broad `isinstance(n, "number")`
- `callable(value)`: `True` if value is a function, method, class, or object with a callable `__call__`
- `len(value)`: length of string, list, tuple, dict, or set
- `bool(value)`: convert to `True` / `False`

## Conversion

- `str(value)`, `int(value, base?)`, `float(value)`
- `list(value)`, `tuple(value)`, `set(value)`, `dict(...)`: type constructors
- `chr(code)`, `ord(char)`
- `hex(n)`, `bin(n)`, `oct(n)`: integer to base-prefixed string
- `repr(value)`: debug-friendly string representation

## Math

- `abs(n)`, `round(n, digits?)`, `pow(base, exp)`
- `isclose(a, b, rel_tol=0.000000001, abs_tol=0.0)`: compare floating-point results with an accepted difference
- `min(values...)` / `max(values...)`: args, a list, or a tuple
- `sum(sequence, start=0)` / `prod(sequence, start=1)`: add or multiply numeric items
- `random()` / `rand()`: random float from 0 up to but not including 1
- `randint(min, max)`: random integer with inclusive bounds
- `import random`: module form with `random.random()`, `random.rand()`, and `random.randint(min, max)`
- `floor(n)`, `ceil(n)`, `trunc(n)`, `sign(n)`, `divmod(a, b)`
- `sqrt(n)`, `exp(n)`, `log(n)`, `log2(n)`, `log10(n)`
- `sin(n)`, `cos(n)`, `tan(n)`, `asin`, `acos`, `atan`, `atan2(y, x)`
- `degrees(rad)`, `radians(deg)`
- `inf`: positive infinity; use `-inf` for negative infinity
- `pi`, `tau`: constants

## Sequences

- `range(stop)` / `range(start, stop, step)`
- `sorted(sequence, key=fn, reverse=False)`: new sorted list. Pass `key=lambda x: x.value` to sort by a computed field; `reverse=True` for descending.
- `reversed(sequence)`: new reversed list
- `enumerate(sequence, start=0)`: list of `(index, value)` pairs
- `zip(sequence1, sequence2, ..., strict=False)`: combine sequences into pairs; `strict=True` raises if lengths differ
- `map(fn, sequence)` / `filter(fn, sequence)` / `reduce(fn, sequence, initializer?)`: transform, select, or fold items
- `pairwise(sequence)`: neighboring `(a, b)` pairs
- `batched(sequence, size)`: fixed-size tuple batches
- `starmap(fn, sequence)`: call `fn` with tuple/list items unpacked as arguments
- `flatten(sequence)`: flatten one nested level
- `count_by(sequence, key_fn?)`: count values or computed keys into a dict
- `iter(sequence)` / `next(iterator)`: manual iteration
- `chain(seq1, seq2, ...)`: concatenate sequences
- `accumulate(sequence)`: running totals
- `combinations(sequence, r)` / `permutations(sequence, r)`: combinatorics
- `product(seq1, seq2, ...)`: cartesian product

## Logic

- `all(sequence)`: `True` if every item is truthy
- `any(sequence)`: `True` if any item is truthy

## Modules

- `import random`: random-number helpers ([[random]])
- `from functools import reduce`: reducer helper as a module import ([[functools]])
- `import re`: regular expressions: `search`, `match`, `fullmatch`, `findall`, `sub`, and `split` ([[re]])
- `from dataclasses import dataclass, field`: generated record-class construction and field configuration ([[dataclasses]])

## Timing

- `sleep(seconds)`: intentionally wait before continuing. Loops are paced automatically; use this only when you want game time to pass.

## Other

- `hash(value)`: hash a string, number, bool, `None`, tuple-of-hashables, or class instance (identity by default, `__hash__` when defined)
