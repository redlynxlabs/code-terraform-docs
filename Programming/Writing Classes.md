---
tags:
  - guide
  - programming
aliases:
  - Classes
---
# Writing Classes

Classes bundle data (attributes) with behavior (methods) into one reusable shape. An instance is one filled-in copy.

```python
class Counter:
  def __init__(self, start):
    self.n = start   # an instance attribute
  def inc(self):
    self.n += 1

c = Counter(10)
c.inc()
print(c.n)       # 11
```

## self, \_\_init\_\_, and attributes

`__init__(self, ...)` runs once when you write `Counter(10)`: it sets up the new instance. Every method takes `self` (the instance) as its first parameter, and `self.x = ...` creates an instance attribute. A value assigned in the class body (`limit = 5`) is a class attribute, shared by all instances and readable as `Counter.limit` or `c.limit`.

## self inside a machine script

In a machine's own script the top-level `self` is the machine (`self.mine()`). Inside a class method, `self` is the object. They never collide, because a method's `self` is simply its first parameter.

If a method needs to drive the machine, pass it in: `Planner(self)` at the top level (where `self` is the machine), store it (`self.bot = bot`), then call `self.bot.mine()` inside the method.

## Inheritance and super()

`class Dog(Animal):` inherits `Animal`'s methods and attributes. Override any of them, and reach the base version with `super()`:

```python
class Animal:
  def __init__(self, name):
    self.name = name
  def speak(self):
    return "..."

class Dog(Animal):
  def __init__(self, name, breed):
    super().__init__(name)  # run Animal's setup first
    self.breed = breed
  def speak(self):
    return self.name + " says woof"

d = Dog("Rex", "husky")
print(d.speak())        # Rex says woof
print(isinstance(d, Animal), issubclass(Dog, Animal)) # True True
```

Multiple inheritance resolves by Python's C3 method-resolution order, so cooperative `super()` works across a diamond: every `__init__` in the chain runs once.

## Operators are dunder methods

Operators and builtins are sugar for `__dunder__` method calls. Define them to make your objects act like built-in types:

```python
class Vec:
  def __init__(self, x):
    self.x = x
  def __add__(self, o):
    return Vec(self.x + o.x)    # powers a + b
  def __eq__(self, o):
    return self.x == o.x      # powers a == b
  def __repr__(self):
    return "Vec(" + str(self.x) + ")"  # how print() shows it
```

`__lt__` powers `<`, `__len__` powers `len()` and truthiness, `__getitem__` powers `x[k]`, `__contains__` powers `in`, `__iter__` powers `for`, and `__call__` makes an instance callable.

> [!warning]
> Operator overloads must be pure: they cannot `sleep()` or change game state. Regular methods, `__init__`, and `__call__` can.

## @property and method decorators

`@property` turns a method into an attribute read without parens; add `@name.setter` to allow assignment:

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
t.level = 42      # runs the setter
print(t.level)    # runs the getter
```

`@staticmethod` defines a method with no `self`; `@classmethod` receives the class as `cls`. Any function can be a decorator (`@deco` rewrites to `name = deco(name)`). `from functools import total_ordering` fills in the rest of the comparisons from `__eq__` plus one of `__lt__` / `__le__` / `__gt__` / `__ge__`.

## Dataclasses

Use the built-in [[dataclasses]] module when a class is mainly a declaration of named fields but still needs class behavior. The decorator generates declaration-ordered construction, readable representation, value equality, and optional ordering; `__post_init__` is the place for validation after generated assignment.

```python
from dataclasses import dataclass, field

@dataclass(order=True)
class Job:
  priority: int
  label: str = ""
  tags: list[str] = field(default_factory=list, compare=False)
  def __post_init__(self):
    if self.priority < 0:
      raise ValueError("priority must be non-negative")

a = Job(2, "ice run")
b = Job(1, "ore run")
a.tags.append("cold")
print(b < a, a)
```

`default_factory` creates an independent mutable value for every instance. Mutable or otherwise unhashable direct defaults such as lists, dictionaries, and sets are rejected; use `default_factory` for them. `dataclass` supports `init`, `repr`, `eq`, `order`, and `kw_only`. `field` supports `default`, `default_factory`, `init`, `repr`, `compare`, and `kw_only`. Inherited annotated fields and explicit field overrides participate in the generated constructor.

A dataclass remains an ordinary user-class instance. It does not become a dict and cannot cross JSON-shaped game boundaries such as the Signal Bus or notebook APIs. Use `TypedDict` for mapping-shaped payloads and cached rows; use a dataclass for methods, validation, generated construction, value equality, or ordering.

The compatibility spellings `frozen=False`, `unsafe_hash=False`, `slots=False`, and `weakref_slot=False` may be passed, but their `True` behavior is not supported. `match_args`, `ClassVar`, `InitVar`, `MISSING`, `KW_ONLY`, `Field`, `FrozenInstanceError`, `is_dataclass`, `asdict`, `astuple`, `replace`, `fields`, `make_dataclass`, and public `__dataclass_fields__` introspection are not supported. Annotation types otherwise stay erased and are not enforced. Canonical `ClassVar` and `InitVar` annotations are recognized only so the decorator can reject those unsupported field forms clearly; all other fields come from executed annotated names.

## When to use a class

- **Class**: custom initialization, inheritance, or operator overloading.
- **dataclass**: named fields plus generated construction, display, equality, or ordering.
- **TypedDict**: a mapping-shaped record or JSON payload (the editor autocompletes its keys).
- **dict**: dynamic, data-driven keys.

## What's not supported

Reasonably-full Python classes, with these deliberate exclusions:

- Metaclasses, `__slots__`, `abc` / `@abstractmethod`.
- The general descriptor protocol; only `@property` is exposed.
- `__new__`, `__del__`.
- Dynamic attribute hooks: `__getattr__`, `__setattr__`, `__delattr__`.

`for` advances `__iter__` / `__next__` and generators lazily, so `break` works with an endless iterator. Operations that need the entire result, such as `list(...)`, remain bounded by the collection limit.

A class that defines `__eq__` without defining `__hash__` is unhashable, matching Python. Define an integer-returning `__hash__` to use equality-aware instances as dict/set keys. Classes that define neither use identity hashing and also work as keys.

## See also

- [[dataclasses]]: the module reference
- [[Language Reference]]: classes, inheritance, decorators, and @property in brief
