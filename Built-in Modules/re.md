---
tags:
  - reference
  - module
---
# re

Built-in regular-expression helpers. Works without Shared Library research. Patterns use a **linear-time safe regular expression subset**: common patterns like `\d+`, `[A-Z]+`, `.*`, `^`, `$`, groups `(...)`, and alternation `a|b` are supported; backtracking-only features such as lookaround and pattern backreferences are not. Patterns are capped at 512 characters.

## Flags

| Constant | Alias | Effect |
| --- | --- | --- |
| `re.IGNORECASE` | `re.I` | Case-insensitive matching |
| `re.MULTILINE` | `re.M` | `^` and `$` also match line boundaries |
| `re.DOTALL` | `re.S` | `.` also matches newline characters |

Combine flags with `|`.

## re.search(pattern, string, flags=0)
Search anywhere in `string` for `pattern`. Returns a [[Match]] object, or `None` if there is no match.

**Returns:** `Match` or `None`

## re.match(pattern, string, flags=0)
Match `pattern` at the **start** of `string`. Returns a Match object, or `None` if the start does not match.

**Returns:** `Match` or `None`

## re.fullmatch(pattern, string, flags=0)
Match the **whole** `string` against `pattern`. Returns a Match object, or `None` if any part is left unmatched.

**Returns:** `Match` or `None`

## re.findall(pattern, string, flags=0)
Return all non-overlapping matches. With no capture groups, the result is a list of matched strings. With one capture group, the result is that group. With multiple capture groups, the result is tuples.

**Returns:** list

## re.sub(pattern, repl, string, count=0, flags=0)
Replace matches of `pattern` in `string` with `repl`. `count=0` replaces all matches; a positive count limits replacements. Replacement text supports numeric backreferences like `\1` and `\g<1>`.

**Returns:** string

## re.split(pattern, string, maxsplit=0, flags=0)
Split `string` wherever `pattern` matches. `maxsplit=0` means no limit. Capturing groups are included in the output, matching Python's `re.split` behavior.

**Returns:** list

## See also

- [[Regular Expressions]]: the guide with worked examples
- [[Match]]: the match object type
- [[Language Reference]]: raw strings (`r"..."`) for patterns
