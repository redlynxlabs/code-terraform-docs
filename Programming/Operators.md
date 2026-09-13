---
tags:
  - guide
  - programming
---
# Operators

Operators combine values, compare values, and build conditions.

## Assignment vs equality

Use `=` to store a value. Use `==` to compare two values. Scripts do not use `===`.

```python
target = 10
if value == target:
  print("match")
```

`=` changes a variable. `==` asks a question and returns `True` or `False`.

## Comparisons

```python
a == b  # equal
a != b  # not equal
a < b   # less than
a <= b  # less than or equal
a > b   # greater than
a >= b  # greater than or equal
```

## Boolean logic

Use `and`, `or`, and `not` to combine conditions:

```python
if powered and battery > 100:
  print("ready")

if not blocked:
  print("clear")
```

## Math and division

```python
a + b   # add
a - b   # subtract
a * b   # multiply
a / b   # divide
a // b  # floor division
a % b   # remainder, also called modulo
a ** b  # power
```

Use `/` when you want normal division. Use `//` when you want the whole-number quotient. Use `%` when you want the remainder after division.

Modulo is useful for repeating patterns and even/odd checks:

```python
value % 2 == 0 # even
value % 2 == 1 # odd
```

## Membership and None

Use `in` to check whether a value is inside a list, tuple, set, string, or dict keys. Use `is None` for the special empty value.

```python
if target in scanned:
  print("known")

if result is None:
  print("nothing found")
```

## See also

- [[Numbers]]: how the numeric type family works
- [[Language Reference]]: bitwise and set operators
