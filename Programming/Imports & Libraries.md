---
tags:
  - guide
  - programming
---
# Imports & Libraries

Imports have several precise kinds: executable built-in modules, typing-only support modules, compiler directives, the explicit shared root, and your own Library scripts. Library scripts unlock with **Shared Library** research; the built-in and support namespaces do not require that research.

## Executable built-in modules

Use `import random`, then `random.randint(1, 10)`, `from functools import reduce` for reducer-style algorithms, `import re` for regular expressions, or `from dataclasses import dataclass, field` for generated record classes. You can also call `random()`, `rand()`, `randint(min, max)`, and `reduce(fn, iterable, initializer?)` directly as global helpers. Regex helpers stay on the `re` module so pattern-matching code is explicit; `dataclass` and `field` likewise require their standard module import.

See the module references: [[random]] · [[functools]] · [[re]] · [[dataclasses]]

## Typing and editor support

`typing`, `types`, `collections.abc`, and `user_stubs` provide names for annotations and editor analysis. Their type names are erased while a script runs; they are not a place for executable helpers. `typing.TYPE_CHECKING` is always `False` in the game. `collections` is the package used to reach `collections.abc`. Put executable shared code in a Library instead of `user_stubs.py`.

`from __future__ import annotations` is a compiler directive, not a normal binding. Put future directives at the beginning of a module, after an optional module docstring and before ordinary statements. The directive itself creates no `annotations` name.

`__builtins__` is the explicit import view of the shared interpreter and game root, for example `from __builtins__ import len, get_component`. Script-owner locals such as `self` and `panel` are not part of that shared module. The generated `builtins` and `code_terraform` stubs exist only for external-editor type checking and cannot be imported by a running game script.

## Player libraries

After **Ship Computer** and **Shared Library** are researched, open Ship → Computer → Library in the left sidebar and click **+ New**. A Library script is shared code: write a helper once, then import it from any machine script.

Create a Library script called `sensors`:

```python
def temp():
  """Read the current thermometer value."""
  return get_component("thermometer").get_value()

def o2():
  """Read the current oxygen sensor value."""
  return get_component("oxygen_sensor").get_value()
```

Import specific functions:

```python
from sensors import temp

print(temp())
```

Import all public names from a library:

```python
from sensors import *

print(temp())
print(o2())
```

Names starting with `_` stay private and are not imported by `*`. Or import the whole module:

```python
import sensors

print(sensors.o2())
```

Library scripts run in their own shared scope. Built-ins and top-level game functions are available, but caller-local names are not. `self` and `panel` are not defined inside a library, so pass a component, component id, or other context into a helper when it needs to act for the importing script.

Function docstrings from imported libraries show in hover and autocomplete, so shared helpers can document their own parameters, return values, exceptions, and fixed result contracts.

## See also

- [[Docstrings]]: documenting library helpers
- [[External Editor]]: libraries live on disk in `lib/`
- [[Signal Bus Guide]]: libraries share code, the Signal Bus shares values
