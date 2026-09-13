---
tags:
  - type
  - built-in
aliases:
  - generator
---
# generator

Created by calling a function containing `yield`, or by generator expressions. **One-shot iterators.**

| Method | Returns | Meaning |
| --- | --- | --- |
| `.send(value)` | any | Resume and make `value` the result of the paused `yield`; returns the next yielded value. Non-`None` before the first yield raises `TypeError`; completion raises `StopIteration` |
| `.throw(exception)` | any | Raise at the paused `yield`; returns the next value if the generator catches and yields again, else the exception propagates |
| `.close()` | None | Raise `GeneratorExit` at the paused yield; `finally` cleanup runs first. Yielding while closing raises `RuntimeError` |
| `.__iter__()` / `.__next__()` | generator / any | Standard iteration; `__next__` resumes with `None` |
| `.__name__` / `.__qualname__` | string | Name of the creating generator function |

## See also

- [[Loops & Scripts]] and [[Built-in Functions]]: `next()`, `iter()`
