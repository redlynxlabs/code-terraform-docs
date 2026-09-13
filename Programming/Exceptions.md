---
tags:
  - guide
  - programming
---
# Exceptions

Exceptions let a helper function stop with a named error when the caller gives it impossible input or an assumption has broken. Use them for bugs and malformed calls. Expected gameplay outcomes such as cargo full, nothing scanned, or queue empty belong in command result objects: branch on `.status` and read `.message`. These objects are normal return values, not exceptions. See [[Command Results]].

## Raise an error

Call an exception constructor with zero or one clear message, then `raise` it:

```python
def normalize_sector(sector):
  if not isinstance(sector, str):
    raise TypeError(f"normalize_sector: expected str, got {type(sector)}")
  if len(sector) < 2:
    raise ValueError("normalize_sector: expected a sector like A1")
  return sector
```

`type("A1")` returns `str`, not `string`. Prefer `isinstance(value, str)` when you want a true/false type check.

## API boundary

Gameplay APIs follow the same distinction. Wrong argument kinds raise `TypeError`; correctly typed but invalid values raise `ValueError` or another documented exception. Ordinary world states do not raise: a command returns its result object so your script can handle `"busy"`, `"no_cargo_space"`, `"not_found"`, and similar outcomes without guessing.

## Catch and keep running

Use `try` / `except` when a script can recover and continue. The variable after `as` is the exception object: printing it shows its message, while `type(error)`, `isinstance(error, ValueError)`, identity checks, and `raise error` retain its exception class and identity.

```python
target = None
try:
  target = normalize_sector(command.args["sector"])
except KeyError as error:
  warn("command missing sector", error)
except (TypeError, ValueError) as error:
  warn(error)
if target is not None:
  print("target", target)
```

Catch the narrowest error that makes sense. `except Exception as error:` catches ordinary game-script exceptions derived from `Exception`, which is useful at a boundary but can hide mistakes if used everywhere. It does not catch control-flow exceptions derived directly from `BaseException`, such as `GeneratorExit`. A handler can name one supported exception, a dotted alias such as `errors.ValueError`, or a tuple such as `except (KeyError, TypeError):`. Computed handler expressions are not part of the game-script surface. Handler names resolve when an error is caught, so aliases and shadowing behave normally. An `as error` target exists only inside that handler and is cleared on every exit; copy any detail you need later into another variable.

## Cleanup and re-raising

A `try` block may have `else`, which runs only when the `try` body finishes without an exception, and `finally`, which always runs before control leaves through success, error, `return`, `break`, or `continue`. A new error or control-flow exit from `finally` replaces the pending one, so keep cleanup small and predictable. Bare `raise` inside an active handler or its `finally` block re-raises the same exception identity.

`raise RuntimeError("message") from cause` evaluates and validates the cause, but the game console intentionally shows only the raised exception. Chained traceback metadata is not part of the displayed runtime surface.

## Built-in names

Common choices are `ValueError` for a value with the right type but wrong contents, `TypeError` for the wrong kind of value, `KeyError` for a missing dictionary key, `IndexError` for a bad list index, `AttributeError` for a missing field or method, and `RuntimeError` for a failed assumption while running.

Other supported names include `NameError`, `UnboundLocalError`, `ImportError`, `ModuleNotFoundError`, `ZeroDivisionError`, `StopIteration`, `GeneratorExit`, `AssertionError`, `NotImplementedError`, `RecursionError`, `IndentationError`, `OverflowError`, and `SyntaxError`. A completed generator raises `StopIteration`; its `.value` is the generator's `return` value. `GeneratorExit` is used by `generator.close()` and normally belongs inside generator cleanup.

You cannot define new exception classes in scripts. Pick the closest built-in name and make the message specific enough that the console tells you where the problem came from.

## See also

- [[Built-in Functions]]: the full exception name list with descriptions
- [[Reading Errors and Console Output]]: how errors surface in the console
