---
tags:
  - reference
  - language
---
# Language Reference

The compact syntax reference for the game's Python-like language, collecting every Language section entry in one place. The Programming guides cover most of these with more depth; links below point to them.

## Basics

### Variables

Store values for later use. No type declarations needed.

```python
x = 10
name = "oxygen"
active = True
```

Full guide: [[Variables]].

### Print

Output text to the console.

```python
print("Hello")
print(42)
print("Temp:", temp, "°C")
```

Full guide: [[Print]].

### Type Annotations

Optional type hints on assignments and function signatures, in the standard Python (PEP 526) form. `thermometer: Thermometer = get_component("thermometer")` documents the variable's type inline; the editor uses the annotation for hover, autocomplete, and Cmd+click navigation. Function params accept the same form (`def f(x: int):`) along with a return annotation (`-> Site:`). Generic shapes work: `xs: list[Site] = []`, `m: dict[str, int] = {}`, `b: Optional[Battery] = None`. Annotations help the editor understand your code. Annotation types are not evaluated and do not check or convert values at runtime. The structural exception is `@dataclass`: annotated class-attribute names become fields used to generate its constructor and other methods.

```python
thermometer: Thermometer = get_component("thermometer")
xs: list[int] = []

def pick(sites: list[Site]) -> Site:
    return sites[0]
```

### Regular Expressions

Import the built-in [[re]] module for pattern matching, captures, replacements, and regex-based splitting. It works without Shared Library research and returns [[Match]] objects from `search`, `match`, and `fullmatch`. Pair it with raw strings (`r"..."`) so you don't have to double every backslash in a pattern.

```python
import re

m = re.search(r"ore_(\d+)", "ore_42")
if m:
    print(m.group(1))
```

Full guide: [[Regular Expressions]].

### Raw Strings

Prefix a string with `r` to keep backslashes literal instead of treating them as escapes, handy for `re` patterns so you don't have to double every backslash. `r"\d+"` is the three characters backslash, `d`, `+`. Combine with `f` for raw f-strings (`rf"..."`), where `{...}` interpolation still works but backslashes stay literal. A backslash still escapes the closing quote, so a raw string can't end in an odd number of backslashes.

```python
import re

# r"..." keeps backslashes literal: no need to double them
m = re.search(r"ore_(\d+)", "ore_42")
print(m.group(1))

label = "iron"
print(rf"\d items of {label}")
```

### Bitwise & Set Operators

The `|`, `&`, `^` operators are polymorphic. On two sets: union, intersection, symmetric difference (`{1,2} | {2,3}` gives `{1,2,3}`). On two numbers: bitwise OR / AND / XOR (`0xF0 & 0x33` gives `0x30`). Mixed-type operands raise. Shifts `<<` / `>>` and unary `~` are integer-only. Bitwise math uses Python-style arbitrary-size integers with a safety cap for runaway values: `1 << 61` prints `2305843009213693952`, not a rounded JavaScript number. Augmented forms (`x |= 1`, `x <<= 8`) work on both shapes.

```python
flags = (1 << 8) | 0xFF
masked = flags & 0xF0
toggled = flags ^ 0b1010

a = {1, 2, 3}
b = {2, 3, 4}
print(a | b)  # {1, 2, 3, 4}
print(a & b)  # {2, 3}
```

## Control Flow

### If / Else

Make decisions based on conditions. Use `x if condition else y` when you need to choose one value inline.

```python
if temp > 0:
    print("Above freezing")
else:
    print("Below freezing")

status = "warm" if temp > 0 else "cold"
```

### While Loop

Repeat code while a condition is true. Supports `break`, `continue`, and an optional `else:` block that runs when the loop ends without `break`. Loop control belongs to the current function/class-free loop body; a nested helper or class cannot break or continue its caller's loop.

```python
i = 0
while i < 5:
    print(i)
    i = i + 1
```

### For Loop

Iterate over a list, tuple, or range. Supports `break`, `continue`, tuple-unpack targets (`for k, v in d.items():`), and an optional `else:` block that runs when the loop ends without `break`. Loop control belongs to the current function/class-free loop body; a nested helper or class cannot break or continue its caller's loop.

```python
for i in range(5):
    print(i)
```

Full guide: [[Loops & Scripts]].

### Match / Case

Branch on the shape of a value. Supports literal cases, `_` wildcard, variable captures, `|` alternatives, `if` guards, list/tuple patterns with `*rest`, and dict-style patterns. An unguarded capture or `_` always matches and must be the final reachable case; a guard may still fall through. Mapping-pattern keys must be unique (`True` and `1` count as the same key). Dict-style patterns also work with fixed result objects.

```python
result = self.input.take("iron_ore", 10)
match result:
    case {"status": "ok", "moved": moved}:
        print("moved", moved)
    case {"status": status, "message": message}:
        print(status, message)
```

Full guide: [[Match & Case]].

## Data Structures

### Lists & Tuples

Ordered collections and fixed pairs of values.

```python
readings = [10, 20, 30]
point = (12, 8)
print(point[0])
readings.append(40)
```

Full guide: [[Lists & Tuples]].

### Dictionaries

Key-value pairs for named data.

```python
planet = {"name": "Mars", "temp": -63}
print(planet["name"])
```

Full guide: [[Dictionaries]].

### TypedDict (record shapes)

Use `TypedDict("Name", {...})` for small record-shaped structures: controller state, route records, cached scan rows, or the simple data objects you might otherwise reach for a class/decorator to model. Annotate a variable with it (`state: Name`) and the editor autocompletes keys, flows each field's type through both `state["key"]` and `state.key`, and flags a typo'd key before you run. At runtime, `state.mode` and `state["mode"]` are equivalent for a dict containing the ordinary string key `"mode"`; built-in dict method names still resolve as methods. `TypedDict` adds a stable declared shape so the editor can autocomplete and type-check those fields even when the value flows through other code.

```python
State = TypedDict("State", {
    "mode": str,
    "scans": int,
})

s: State = {"mode": "sonar", "scans": 0}
s.mode           # or s["mode"]: autocompletes; typos flagged
s["scans"] += 1
```

## Functions

### Functions

Define reusable blocks of code. Parameters can have default values (`def f(x, n=10): ...`), and callers can use either positional args (`f(5, 20)`) or keyword args (`f(5, n=20)`), same as Python. All positional args must come before any keyword args at the call site. Optional type annotations document intent: `def scan(site: MiningSite) -> Site:`. They help the editor with hover and autocomplete, but they do not change how the script runs.

```python
def double(x):
    return x * 2

print(double(5))
```

### Generators (yield)

A `def` that contains `yield` is a generator: calling it returns a lazy iterator that produces one value each time it is asked, instead of building the whole list up front. Loop over it with `for x in gen():`, pull one value with `next(it)` (raises `StopIteration` when spent, or returns a default with `next(it, fallback)`), or materialize it with `list(gen())`. `yield from other()` re-emits every value from another iterable/generator and evaluates to that generator's `return` value. Advanced control: `gen.send(v)` resumes the paused `yield` with `v`, `gen.throw(error)` raises an exception at that yield, and `gen.close()` stops it (running any `finally`). A generator is one-shot: once exhausted it stays empty. Note: a bare generator expression `(x for x in xs)` is lazy too, so wrap it in `list(...)` if you need a reusable list. Generators live only in the running script and cannot be sent over the Signal Bus or stored in the Data Archive: `list(...)` them first.

```python
def route(points):
    for point in points:
        yield point[0], point[1]

# Values are produced one at a time, on demand:
waypoints = [(10, 4), (14, 9), (20, 12)]
for x, y in route(waypoints):
    print("next", x, y)

# yield from re-emits another iterable's values:
def full_route(near, far):
    yield from route(near)
    yield from route(far)
```

See also [[generator]] for the object's own methods.

## Classes

### Classes

Bundle data and behavior together. `__init__(self, ...)` sets up each instance (`self.count = 0`), and methods take `self` first. In a machine script the top-level `self` is the machine; inside a method `self` is the object: pass the machine in if a method needs to drive it. The editor autocompletes `instance.` members and flows method return types through chains.

```python
class Counter:
    def __init__(self, start):
        self.n = start
    def inc(self):
        self.n += 1

c = Counter(10)
c.inc()
print(c.n)
```

Full guide: [[Writing Classes]].

### @dataclass

Import `dataclass` and `field` from [[dataclasses]] to turn annotated class attributes into declaration-ordered constructor fields. `dataclass` supports `init`, `repr`, `eq`, `order`, and `kw_only`; `field` supports `default`, `default_factory`, `init`, `repr`, `compare`, and `kw_only`. Mutable or otherwise unhashable direct defaults are rejected; use `default_factory` to create a separate value for each instance. Generated behavior includes inherited fields, `__init__`, `__repr__`, exact-class equality, optional ordering, and `__post_init__`. The compatibility spellings `frozen=False`, `unsafe_hash=False`, `slots=False`, and `weakref_slot=False` are accepted, but their `True` behavior is not supported. `match_args` and `ClassVar` / `InitVar` field semantics are unsupported; canonical uses receive a clear error. `MISSING`, `KW_ONLY`, `Field`, `FrozenInstanceError`, `is_dataclass`, `asdict`, `astuple`, `replace`, `fields`, `make_dataclass`, and public `__dataclass_fields__` introspection are unavailable; annotation types stay erased. A dataclass is still an ordinary user-class instance: use it when a record needs methods, validation, value equality, or ordering. Use `TypedDict` when the value is fundamentally a mapping or must cross a JSON-shaped boundary such as the Signal Bus or notebook APIs.

```python
from dataclasses import dataclass, field

@dataclass(order=True)
class Job:
    priority: int
    label: str = ""
    tags: list[str] = field(default_factory=list, compare=False)

job = Job(2, "ice run")
print(job)
```

### Inheritance & super()

`class Dog(Animal):` inherits `Animal`'s methods and attributes. Override any of them, and call the base version with `super().method(...)`. Multiple inheritance resolves by Python's C3 MRO, so cooperative `super()` works across a diamond. `isinstance(x, Animal)` and `issubclass(Dog, Animal)` walk the chain.

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "woof"

print(Dog("Rex").speak())
```

### Operators & dunder methods

Define what operators and builtins do on your objects. `__eq__` / `__lt__` power `==` and `<`; `__add__` (and reflected `__radd__`) power `+`; `__len__`, `__bool__`, `__getitem__`, `__contains__`, `__iter__`, `__call__`, and `__str__` / `__repr__` dispatch from `len()`, truthiness, `x[k]`, `in`, `for`, calling, and `print`. Operator overloads must be pure: they cannot `sleep()` or change game state.

```python
class Vec:
    def __init__(self, x):
        self.x = x
    def __add__(self, o):
        return Vec(self.x + o.x)
    def __eq__(self, o):
        return self.x == o.x
    def __repr__(self):
        return "Vec(" + str(self.x) + ")"

print(Vec(1) + Vec(2))
print(Vec(3) == Vec(3))
```

### Decorators

`@deco` above a `def` or `class` wraps it: `name = deco(name)`. Stack them, and pass arguments (`@deco(arg)`). Built-in method decorators: `@staticmethod` (no `self`), `@classmethod` (receives the class as `cls`), and `@property`. The standard `dataclasses` module provides `@dataclass` for generated record-class behavior.

```python
def trace(fn):
    def wrapper(*args):
        print("calling", fn)
        return fn(*args)
    return wrapper

@trace
def step(n):
    return n * 2

print(step(5))
```

### @property

`@property` turns a method into a computed attribute read without parens (`tank.level`, not `tank.level()`). Add `@name.setter` so `tank.level = 42` runs validation. Use it to expose derived or guarded state while keeping plain attribute syntax.

```python
class Tank:
    def __init__(self):
        self._level = 0
    @property
    def level(self):
        return self._level
    @level.setter
    def level(self, v):
        self._level = max(0, v)

t = Tank()
t.level = 42
print(t.level)
```

## See also

- [[Built-in Functions]]: the always-available function library
- [[random]] · [[functools]] · [[re]] · [[dataclasses]]: built-in modules
- [[dict]] · [[list]] · [[set]] · [[str]] · [[tuple]] · [[generator]] · [[slice]]: built-in type references
