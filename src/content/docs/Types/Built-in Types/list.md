---
tags:
  - type
  - built-in
aliases:
  - list
title: "list"
---

List literals `[1, 2, 3]`, `list(iterable)`, and methods returning lists.

| Method | Returns | Meaning |
| --- | --- | --- |
| `.length` | number | Item count, same as `len(lst)`. **Property: no parens** |
| `.append(item)` | None | Add to the end (raises past the interpreter's max-length cap) |
| `.pop(index=-1)` | any | Remove and return (default last); negative indices from the end; empty/out-of-range raises |
| `.remove(item)` | None | Remove first occurrence by value; raises if absent |
| `.insert(index, item)` | None | Insert, shifting right; **out-of-range indices clamp to the ends (no error)** |
| `.index(item, start=0, end=None)` | number | First occurrence in the slice; raises if not found |
| `.count(item)` | number | Occurrences (deep value equality for numbers, strings, booleans) |
| `.sort(key=None, reverse=False)` | None | In-place sort using `<`. **`key=` must be pure: it cannot suspend the script or mutate game state** |
| `.reverse()` | None | Reverse in place |
| `.copy()` | list | Shallow copy |
| `.extend(iterable)` | None | Append every item from a finite iterable |
| `.clear()` | None | Remove all items |

## See also

- [[Built-in Functions]]: `sorted()`, `min()`, `max()`, `sum()`
