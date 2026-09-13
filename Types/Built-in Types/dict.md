---
tags:
  - type
  - built-in
aliases:
  - dict
---
# dict

Dict literals `{k: v}`, `dict()`, and methods returning dicts. Insertion order is preserved.

| Method | Returns | Meaning |
| --- | --- | --- |
| `.length` | number | Number of pairs, same as `len(d)`. **Property: no parens** (game-specific convenience) |
| `.keys()` / `.values()` / `.items()` | list | Keys / values / `(key, value)` tuples in insertion order (`for k, v in d.items():`) |
| `.has(key)` | boolean | Membership test, equivalent to `key in d` (game-specific convenience) |
| `.get(key, default=None)` | any | Value or default; never raises for a missing hashable key (unhashable still raises `TypeError`) |
| `.pop(key, default?)` | any | Remove and return; raises if missing unless a default is given |
| `.popitem()` | tuple | Remove and return the **last inserted** pair; raises when empty |
| `.setdefault(key, default=None)` | any | Return `d[key]` if present, else set and return `default`; useful for grouped collections |
| `.update(other?, **kwargs)` | None | Merge entries (dict, iterable of pairs, kwargs, or both), overwriting matching keys |
| `.copy()` | dict | Shallow copy (nested mutables shared) |
| `.clear()` | None | Remove all entries |

## See also

- [[Dictionaries]]: the language guide
