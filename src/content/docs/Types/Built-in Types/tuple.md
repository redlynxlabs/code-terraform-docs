---
tags:
  - type
  - built-in
aliases:
  - tuple
title: "tuple"
---

Tuple literals `(1, 2)`, `enumerate()`, and methods returning tuples. Immutable.

| Method | Returns | Meaning |
| --- | --- | --- |
| `.length` | number | Item count, same as `len(t)`. **Property: no parens** |
| `.index(item, start=0, end=None)` | number | First occurrence in the slice; raises if not found |
| `.count(item)` | number | Occurrences |
