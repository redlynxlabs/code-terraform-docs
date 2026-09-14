---
tags:
  - type
  - built-in
aliases:
  - Match
title: "Match"
---

A regex match object. **Returned by:** `re.search()`, `re.match()`, `re.fullmatch()`

| Method | Returns | Meaning |
| --- | --- | --- |
| `.pattern` | string | The pattern that produced this match |
| `.string` | string | The string that was searched |
| `.group(index=0)` | string or `None` | Matched text for a group (0 = whole match); unmatched optional groups return `None`, out-of-range raises |
| `.groups(default=None)` | tuple | All captured groups excluding 0; unmatched use `default` |
| `.start(index=0)` / `.end(index=0)` | number | Character indexes (unmatched optional groups return -1) |
| `.span(index=0)` | tuple | `(start, end)`; unmatched returns `(-1, -1)` |

## See also

- [[re]]: the module functions
- [[Regular Expressions]]: pattern syntax guide
