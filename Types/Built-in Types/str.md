---
tags:
  - type
  - built-in
aliases:
  - str
---
# str

String literals, `str(value)`, and methods returning strings. All methods return copies; strings are immutable.

## Size and case

| Method | Meaning |
| --- | --- |
| `.length` | Character count, same as `len(s)`. **Property: no parens** |
| `.upper()` / `.lower()` | All upper / lower |
| `.title()` / `.capitalize()` / `.swapcase()` | Titlecase runs / first-char titlecase + rest lower / swap every character |
| `.casefold()` | Unicode case folding for caseless comparison (stronger than `lower()` beyond ASCII) |

## Trim, split, join

| Method | Meaning |
| --- | --- |
| `.strip(chars=None)` / `.lstrip` / `.rstrip` | Trim whitespace, or **a SET of characters** (not a substring): `"...hello...".strip(".")` → `"hello"` |
| `.split(sep=None, maxsplit=-1)` | `sep=None`: any whitespace separates, runs collapse; a literal non-empty separator preserves empty fields |
| `.splitlines(keepends=False)` | Split on Python line boundaries (`\n`, `\r\n`, `\r`, vertical tab, form feed, NEL, line/paragraph separators) |
| `.join(iterable)` | Concatenate strings with this string between: `",".join(["a","b"])` → `"a,b"` |
| `.partition(sep)` / `.rpartition(sep)` | `(before, sep, after)` at the first / last occurrence; not-found returns `(original, "", "")` / `("", "", original)` |

## Search and replace

| Method | Meaning |
| --- | --- |
| `.find(sub, start=0, end=None)` / `.rfind` | Lowest / highest index or -1 |
| `.index(sub, ...)` / `.rindex` | Like find but raise when absent |
| `.count(sub, start=0, end=None)` | Non-overlapping occurrences (empty sub returns length + 1) |
| `.replace(old, new, count=-1)` | Replace occurrences, optionally limited |
| `.startswith(prefix, start=0, end=None)` / `.endswith(suffix, ...)` | Accept a single string **or a tuple of strings** |
| `.removeprefix(prefix)` / `.removesuffix(suffix)` | Strip only if present |

## Pad and format

| Method | Meaning |
| --- | --- |
| `.zfill(width)` | Leading zeros; preserves a leading sign |
| `.center(width, fill=" ")` / `.ljust` / `.rjust` | Pad to width with a single fill character |
| `.format(*args, **kwargs)` | `{}` auto-numbered, `{0}` positional, `{name}` keyword. For format specs (`{x:>10}`, `{x!r}`) **prefer f-strings** |

## Predicates

`.isdigit()` · `.isalpha()` · `.isalnum()` · `.isspace()` · `.islower()` · `.isupper()` · `.istitle()`: all require a non-empty string (case predicates require at least one cased character).

## See also

- [[Regular Expressions]] and [[re]]: pattern matching
