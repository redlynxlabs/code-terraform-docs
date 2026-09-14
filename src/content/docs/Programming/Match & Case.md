---
tags:
  - guide
  - programming
aliases:
  - Match / Case
title: "Match & Case"
---

`match` lets a script branch on the shape of a value instead of writing a long chain of `if` checks.

```python
packet = ["ore", 12]
match packet:
  case ["ore", amount] if amount > 0:
    print("ore", amount)
  case ["ice", amount]:
    print("ice", amount)
  case _:
    print("unknown packet")
```

## Patterns

- Literal patterns: `case "ok":`, `case 0:`, `case True:`, `case None:`
- Wildcard: `case _:`
- Captures: `case amount:`
- Alternatives: `case "busy" | "cooling":`
- Guards: `case [kind, amount] if amount > 0:`
- List/tuple patterns: `case [x, y]:`, `case [head, *rest]:`
- Dict patterns: `case {"status": "ok", "value": value}:`

Dict-style patterns also match result objects by field name:

```python
result = self.input.take("iron_ore", 10)
match result:
  case {"status": "ok", "moved": moved}:
    print("moved", moved)
  case {"status": reason, "message": message}:
    warn(reason, message)
```

> [!warning]
> Class patterns such as `case Thing(x):` are not part of the interpreter. Use list, tuple, dict, literal, and field-name patterns instead.

## See also

- [[Command Results]]: the result objects these patterns match nicely against
