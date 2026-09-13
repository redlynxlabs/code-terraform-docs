---
tags:
  - guide
  - programming
---
# Dictionaries

Dictionaries store key-value pairs. Keys can be any hashable value: strings, numbers, booleans, `None`, or tuples made only of hashable values. String keys are the most common for game data:

```python
data = {"name": "Crystal", "value": 300}
empty = dict()
```

Access and modify:

```python
print(data["name"])       # Crystal
data["quality"] = "high"

coords = {}
coords[(0, 0)] = "base"
```

Check if a key exists:

```python
if "name" in data:
  print(data["name"])
```

Iterate:

```python
for key in data.keys():
  print(key, data[key])

for pair in data.items():
  key = pair[0]
  val = pair[1]
  print(f"{key}: {val}")
```

## Merge

Use `left | right` to make a **new** merged dictionary. Use `left |= right` to update the existing dictionary in place. When the same key appears in both, the right-hand value wins.

```python
thing = {"a": 1, "b": 2}
other = {"a": 3, "c": 4}
print(thing | other) # {"a": 3, "b": 2, "c": 4}
```

## Methods

| Method | Purpose |
| --- | --- |
| `.keys()` | list of all keys |
| `.values()` | list of all values |
| `.items()` | list of `[key, value]` pairs |
| `.get(key, default)` | get value or default if missing |
| `.has(key)` | check if key exists |
| `.pop(key, default)` | remove key and return value |
| `.popitem()` | remove and return the last inserted `[key, value]` pair |
| `.update(dict)` | merge another dict in |
| `.setdefault(key, default)` | get or set default |
| `.clear()` | remove all entries |

## See also

- [[dict]]: the complete built-in type reference
