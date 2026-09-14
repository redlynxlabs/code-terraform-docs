---
tags:
  - guide
  - programming
title: "Strings & F-Strings"
---

F-strings let you embed expressions directly in strings:

```python
heat = 45
print(f"Heat: {heat}/100")

name = "Crystal Shard"
print(f"Found {name} worth {300} credits")
```

Slicing extracts part of a string or list:

```python
pos = "E13"
letter = pos[0]       # "E"
column = pos[1:]      # "13"
first3 = pos[:3]      # "E13"
```

Use `in` to check membership:

```python
if "A1" in scanned_list:
    print("already scanned")

if sector not in visited:
    print("new sector")
```

`in` works with lists, dicts (checks keys), and strings (checks substring).

## String methods

| Method | Purpose |
| --- | --- |
| `.upper()` / `.lower()` | case conversion |
| `.strip()` / `.lstrip()` / `.rstrip()` | remove whitespace |
| `.split(sep)` | split into list |
| `.join(list)` | join list into string: `", ".join(["a", "b"])` gives `"a, b"` |
| `.find(sub)` | index of substring, -1 if not found |
| `.index(sub)` | like find but raises error if not found |
| `.replace(old, new)` | replace all occurrences |
| `.startswith(s)` / `.endswith(s)` | check prefix/suffix |
| `.count(sub)` | count occurrences |
| `.title()` / `.capitalize()` | title case / capitalize first |
| `.isdigit()` / `.isalpha()` / `.isalnum()` / `.isspace()` | character checks |
| `.zfill(width)` | pad with zeros |
| `.center(w)` / `.ljust(w)` / `.rjust(w)` | alignment |
| `.format(args)` | `"Hello {}".format("world")` |

## See also

- [[str]]: the complete string method reference with full semantics
