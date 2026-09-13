---
tags:
  - guide
  - programming
---
# Lists & Tuples

Lists are ordered collections. Create with brackets. Tuples are fixed ordered collections; create them with parentheses when you want a stable pair, coordinate, or small record:

```python
items = [1, 2, 3]
empty = []
mixed = ["hello", 42, True]
point = (12, 8)
single = (42,)
```

Access by index (0-based, negative from end):

```python
first = items[0]    # 1
last = items[-1]    # 3
x = point[0]        # 12
```

Slicing with step:

```python
items[1:3]     # [2, 3]
items[::2]     # [1, 3]  every other
items[::-1]    # [3, 2, 1]  reversed
point[:]       # (12, 8)
```

List comprehension builds lists concisely:

```python
squares = [x * x for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
```

Tuple unpacking and multiple assignment:

```python
a, b, c = [1, 2, 3]
first, second = ("hello", "world")

def choose_route():
    return "E14", ["E13", "E14"]

target, route = choose_route()

routes = [(0, "nav_module"), (1, "cargo_rack")]
for slot, item in routes:
    print(slot, item)
```

Ternary expression:

```python
status = "hot" if heat > 50 else "cool"
```

## List methods

| Method | Purpose |
| --- | --- |
| `.append(value)` | add to end |
| `.pop()` | remove and return last item |
| `.insert(index, value)` | insert at position |
| `.remove(value)` | remove first occurrence |
| `.index(value)` | find position of value |
| `.count(value)` | count occurrences |
| `.sort()` | sort in place |
| `.reverse()` | reverse in place |
| `.copy()` | shallow copy |
| `.extend(list_or_tuple)` | add all items from another sequence |
| `.clear()` | remove all items |
| `.length` | number of items (property) |

Tuples are immutable. They support indexing, slicing, `.index(value)`, `.count(value)`, `.length`, `len()`, and `for` loops.

## See also

- [[list]] and [[tuple]]: the complete built-in type references
