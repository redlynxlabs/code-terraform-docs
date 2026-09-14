---
tags:
  - guide
  - programming
title: "Regular Expressions"
---

Use the built-in [[re]] module when plain string methods are not enough: matching a pattern, extracting groups, replacing variable-shaped text, or splitting on several separators.

`re` is a built-in module. It works without Shared Library research, but you import it so your script clearly signals that it is using regular expressions:

```python
import re

text = "ore_42 at E13"
match = re.search("ore_(\d+)", text)
if match:
  print(match.group(1))  # 42
```

## Match helpers

- `re.search(pattern, string, flags=0)`: find the first match anywhere
- `re.match(pattern, string, flags=0)`: match only at the start
- `re.fullmatch(pattern, string, flags=0)`: match the whole string

These return a [[Match]] object, or `None` when there is no match.

```python
import re

m = re.fullmatch("([A-Z])(\d+)", "E13")
if m is not None:
  print(m.group(0))  # E13
  print(m.group(1))  # E
  print(m.group(2))  # 13
  print(m.span())    # (0, 3)
```

`Match.group(0)` is the whole match. Capturing groups start at `1`. `Match.groups()` returns all captured groups as a tuple.

## Lists and replacements

```python
import re

print(re.findall("\d+", "A12 B7"))
print(re.split("[,;]\s*", "iron, ice; quartz"))
print(re.sub("ore_(\d+)", "ore-\\1", "ore_42"))
```

`re.findall()` returns strings when the pattern has no groups, one captured value when it has one group, or tuples when it has multiple groups. `re.sub()` replacement text supports numeric backreferences such as `\\1` and `\\g<1>`.

## Flags

Flags are module constants. Combine them with `|`:

```python
import re

flags = re.IGNORECASE | re.MULTILINE
print(re.findall("^ore", "Ore\nice", flags))
```

Available flags:

- `re.IGNORECASE` / `re.I`
- `re.MULTILINE` / `re.M`
- `re.DOTALL` / `re.S`

## Syntax note

Code: Terraform exposes a Python-shaped `re` API backed by a **linear-time pattern engine**. Common patterns like `\d+`, `[A-Z]+`, `.*`, `^`, `$`, groups `(...)`, and alternation `a|b` are supported.

Backtracking-only features such as lookaround and pattern backreferences are not supported. Replacement backreferences in `re.sub()` remain supported.

Patterns are capped at 512 characters. Quantified groups such as `(a+)+` are safe to use because matching does not backtrack.

## See also

- [[re]]: the module reference
- [[Strings & F-Strings]]: plain string methods, often enough
