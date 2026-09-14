---
tags:
  - reference
  - module
title: "functools"
---

Built-in functional helpers. Works without Shared Library research.

## functools.reduce(fn, iterable, initializer?, /)
Combine an iterable into one value by repeatedly calling pure `fn(total, item)`; callbacks cannot suspend the script or mutate game state. With no initializer, the first item becomes the initial total; empty iterables then raise. Empty-with-initializer and singleton-without-initializer perform no callback call. Also available as the global `reduce()`.

**Returns:** any

## functools.total_ordering(cls, /)
Class decorator that preserves the class object and fills missing ordering methods from `__eq__` plus one of `__lt__`, `__le__`, `__gt__`, or `__ge__`. Explicit methods are never replaced. Applying it mutates the local class namespace.

**Returns:** any

## functools.wraps(wrapped, /)
Return a decorator that preserves the wrapped callable's supported name, qualified name, docstring, custom attributes, and `__wrapped__` link while keeping the wrapper's call behavior. Applying the returned decorator mutates only that local wrapper function.

**Returns:** any

## See also

- [[Writing Classes]]: `total_ordering` in context
