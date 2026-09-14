---
tags:
  - guide
  - programming
title: "Conversion Functions"
---

Convert between types using built-in functions.

```python
str(42)        # "42"
int("7")       # 7
float("3.14")  # 3.14
```

Character conversion is useful for building sector IDs (A1, B2, etc.):

```python
chr(65)    # "A"
chr(66)    # "B"
ord("A")   # 65
```

Example: generate sector names.

```python
row = 0
while row < 8:
    letter = chr(65 + row)
    sector = letter + str(1)
    print(sector)  # A1, B1, C1...
    row = row + 1
```

## See also

- [[Built-in Functions]]: full conversion reference (`str`, `int`, `float`, `chr`, `ord`, `hex`, `bin`, `oct`, `repr`, and constructors)
