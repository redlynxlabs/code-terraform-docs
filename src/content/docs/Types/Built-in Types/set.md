---
tags:
  - type
  - built-in
aliases:
  - set
title: "set"
---

Set literals `{1, 2}`, `set(iterable)`, and set algebra operators. Members must be hashable (tuples of hashables and properly hashable user-class instances included).

| Method | Returns | Meaning |
| --- | --- | --- |
| `.length` | number | Unique members, same as `len(s)`. **Property: no parens** |
| `.add(item)` / `.remove(item)` / `.discard(item)` | None | Add; remove (raises if absent); remove safely |
| `.pop()` | any | Remove and return an arbitrary element (deterministic insertion order, but don't rely on it); raises when empty |
| `.has(item)` | boolean | Membership, equivalent to `item in s` |
| `.clear()` / `.copy()` | None / set | Empty the set; shallow copy |
| `.union(*others)` / `.intersection(*others)` / `.difference(*others)` | set | New set from set algebra over finite iterables (no arguments = copy) |
| `.symmetric_difference(other)` | set | Members in exactly one side, same as `a ^ b` |
| `.update(*others)` / `.intersection_update(*others)` / `.difference_update(*others)` / `.symmetric_difference_update(other)` | None | In-place versions |
| `.issubset(other)` / `.issuperset(other)` / `.isdisjoint(other)` | boolean | `a <= b` / `a >= b` / no shared members |
