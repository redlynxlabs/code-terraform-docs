---
tags:
  - reference
  - builtins
title: "Built-in Functions"
---

These functions are always available in every script. For a compact scan of the same surface, see [[Built-in Functions Overview]]; for the built-in modules, see [[random]], [[functools]], [[re]], and [[dataclasses]].

## Output

### print(*values, sep=" ", end="\n")
Output text to the console. Multiple values are joined by `sep` (default a single space). `end` is appended after the last value (default a newline). Console output is a character stream and the newlines in it are what break lines, so `end=""` leaves the line open and the next `print()` continues it: use that to build a row from several calls, then close it with a bare `print()`. Every call updates an unfinished line immediately. Within that row, `\r` returns the write position to the start and `\b` moves it back one visible character. Neither control erases text by itself; following text overwrites existing text. Neither control can enter an earlier row, and ANSI escape sequences are not interpreted. **Returns:** None

### warn(*values, sep=" ", end="\n")
Output an amber warning line to the persistent console. Same argument behavior as `print()`, but routed to the WARNINGS filter. Use it for background monitors that need attention without showing a toast. Use `notify(text, "warn")` when the player should be interrupted. **Returns:** None

### debug(*values, sep=" ", end="\n")
Output low-priority telemetry to the persistent console. Same argument behavior as `print()`, but hidden from the ALL view unless debug output is enabled in console options. Use it for noisy tuning data that should not crowd normal logs. **Returns:** None

### notify(text, /, level="info", duration_seconds?, dismissible=True)
Show a toast to the player and add it to the **Computer → Notifications** archive. Use sparingly, for events that genuinely need the operator's attention (battery critical, contract solved, drone stranded); prefer `print()` for ongoing telemetry. `level` is `"info"` (default), `"warn"`, or `"error"` and drives the toast's color plus the history badge. `duration_seconds` sets how long the toast stays before auto-dismissing: clamped to 0.5-30s; omitted uses the default (5s info/warn, 6s error). Pass **0** as the duration to make the toast **sticky**: it never auto-dismisses and stays until the player clicks it; use this for fatal errors that must be acknowledged. `dismissible` defaults to `True`; pass `False` as the fourth argument for a forced-read toast with no early close. A sticky toast is always dismissible, so it can never pin the screen. Identical consecutive notifications from the same script collapse inside a 1-second window, and a sticky already on screen is never duplicated, so a tight loop can't spam the screen. **Returns:** None

## Control

### sleep(seconds, /)
Wait before continuing. The argument is in **real seconds**, not world-clock hours. The day cycle compresses 24 world-clock hours into a shorter real-time window, so `sleep(25)` is about 1 world-clock hour at the default 10-min-per-day pacing. For planet-aware delays, query the conversion: `sleep(get_component("clock").real_seconds_per_hour() * 2)` waits exactly two world-clock hours regardless of pacing. Loops are paced automatically; `sleep()` is for deliberate delays. **Returns:** None. **Raises:** `TypeError` (requires one numeric duration), `ValueError` (requires a finite duration >= 0), `OverflowError` (duration outside the simulation tick range).

## Utility

### len(value, /)
Length of a list, tuple, string, dict, or set. **Returns:** number

### range(stop, /) / range(start, stop, /) / range(start, stop, step, /)
Materialize the bounded integer range from `start` to `stop` (exclusive), stepping by `step`. `range(5)` gives `[0,1,2,3,4]`. Endpoints and steps retain arbitrary-size exact integers, while the produced list must fit the interpreter's collection limit. All arguments must be integers; `step=0` and fractional values are rejected. Negative `step` counts down: `range(5, 0, -1)` gives `[5,4,3,2,1]`. **Returns:** list of numbers

### slice(stop, /) / slice(start, stop, step=None, /)
Build a reusable slice object for list, tuple, and string subscripts. `slice(None, None, -1)` is the reusable form of `[::-1]`; `seq[s]` follows the same bounds and step rules as `seq[start:stop:step]`. **Returns:** [[slice]]

### type(value, /)
Returns the player's value-based type category as a string: a user class instance returns its class name, `"int"` covers whole numbers (including exact huge integers), `"float"` covers fractional / non-finite numbers, and built-ins report `"str"`, `"bool"`, `"NoneType"`, `"list"`, `"tuple"`, `"dict"`, `"set"`, or `"slice"`. Game API values retain the established `"object"` category so existing scripts remain unchanged; use `object_type(value)` for a concrete registered data-object name. Numeric categories are based on the current value, not literal spelling, so `type(4.0)` returns `"int"` because the value is whole. Game APIs still document broad numeric parameters as `number` when they accept either ints or floats. **Returns:** string

### object_type(value, /)
Return a concrete registered name such as `"MiningSite"`, `"CatalogedFragment"`, or `"Position"` for a game data object without changing the established result of `type(value)`. Component references return `"Component"`; other values use the same public category as `type(value)`. **Returns:** string

### vars(object, /)
Return a detached, shallow dictionary of an object's public data fields. Structured results, positions, journal entries, and other game data values include their documented attribute fields but not methods; class instances include their own stored attributes. Changing the returned dictionary does not change the object, although nested lists and dictionaries are shared. Use `object_type(object)` separately when the concrete registered name is needed. Pass exactly one object; the no-argument local-scope form is not supported. **Returns:** dict

### object()
Construct a new identity-only base object. It takes no arguments and has no writable game-script attributes. User classes inherit from `object` implicitly. **Returns:** object

### TypedDict(name, fields, /)
Declare a fixed-key dict shape for the editor. Use the functional form (`State = TypedDict("State", {"mode": str})`) and annotate records with that name (`state: State = {...}`). Runtime treats this as an inert type marker; the editor uses it for key autocomplete, field type flow, and typo lint. **Returns:** any

### hasattr(value, name, /)
Return `True` if `value.name` is readable, otherwise `False`. The attribute name must be a string. Useful in duck-typed helpers that accept several documented object shapes, e.g. `hasattr(value, "required_recipe")`. Gameplay result objects keep their fixed fields, so branch on `.status` before reading a documented payload such as `analysis.info`. Missing mounted sub-objects such as `self.sonar` return `False` when the module is not installed. **Returns:** boolean

### getattr(value, name, default?, /)
Read an attribute by string name, exactly like `value.name`. Without `default`, a missing attribute raises `AttributeError`; with `default`, missing attributes return that fallback. Works for game object properties/methods and built-in methods such as `getattr([1], "append")`. Use with `hasattr()` for duck-typed helpers, not as a replacement for a gameplay result's documented `.status`, `.message`, and payload fields. **Returns:** any

### sorted(sequence, /, *, key=None, reverse=False)
Return a new list sorted using `<` between mutually comparable keys. With `key=None` (the default), each value is its own key. Numeric and boolean keys compare across that family, strings compare lexicographically, and user objects may define the exact rich-comparison slots needed by `<`; unsupported pairs raise. `key=` is called once per item and must be **pure**: it cannot suspend or mutate game state. `reverse` is truth-tested, and the finite input is handled eagerly within the interpreter's collection limit. **Returns:** list

### reversed(iterable, /)
Return a reversed list copy of any finite iterable. This consumes the input fully, so an infinite generator exceeds the collection limit; dictionaries (their keys), sets (deterministic insertion order), generators, and custom iterator-protocol classes are accepted. **Returns:** list

### enumerate(iterable, /, start=0)
List of (index, value) pairs. Optional integer `start=N` shifts the index: `enumerate(items, start=1)` for 1-based indexing. Arbitrarily large integer starts remain exact. `start` may be positional or keyword, but not both. **Returns:** list of tuples

### zip(*iterables, strict=False)
Combine iterables into tuples. With no args, returns empty list. With one arg, returns a list of 1-tuples. Stops at the shortest input unless `strict=True`, which raises if input lengths differ. **Returns:** list of tuples

### isinstance(value, type_or_tuple, /)
Check if a value is of the given type. Accepts a builtin type callable (`object`, `int`, `float`, `str`, `list`, `dict`, `set`, `tuple`, `slice`, `bool`), a string type name, a tuple of types, or a type union like `int | float` (matches any). `int` matches whole numbers and booleans, `float` matches fractional / non-finite numbers, and string `"number"` remains the broad numeric family for scripts that intentionally accept either. **Returns:** boolean

### callable(value, /)
`True` when a value has a call surface: user-defined `def` / `lambda`, built-in functions, classes, bound methods, and class instances whose type defines `__call__`. Like Python, this checks the type-level call slot without executing its descriptor; an actual call can still raise if that slot resolves to a non-callable value. **Returns:** boolean

### dir(value, /)
Lists the method and attribute names available on `value`, sorted: runtime introspection for discovering what you can do with something. On a component or game object (`dir(self)`, `dir(get_component("smelter_1"))`) it returns that object's callable methods and properties, straight from the console. On a built-in container it returns the type's methods: `dir([1, 2])` gives `"append"`, `"pop"`, and so on; `dir("hi")` gives `"upper"`, `"split"`, and so on. Values with no members (numbers, booleans, `None`) return an empty list. Pass exactly one value: the no-argument `dir()` that lists current-scope names is not supported. **Returns:** list

### hash(value, /)
Hash any hashable value to an integer: strings, numbers, booleans, `None`, tuples of hashable values, functions, classes, and hashable user instances. Instances are identity-hashable by default; defining `__eq__` without `__hash__` makes them unhashable, and a custom `__hash__` controls `hash(obj)`, dict keys, and set membership. **Returns:** number

### super() / super(type, object, /)
Return a proxy that searches the receiver's MRO after a chosen class. Inside a method, use `super()` for cooperative parent calls such as `super().__init__(...)`. The explicit `super(type, object)` form accepts an instance or subclass of `type`; the one-argument form is not supported. **Returns:** any

### issubclass(cls, class_or_tuple, /)
`True` if `cls` is the given class or a subclass of it (or of any class in the tuple), per the MRO. `issubclass(Dog, Animal)` is `True`; every class is a subclass of `object`. **Returns:** boolean

### property(fget=None, fset=None, fdel=None, doc=None)
Build a property descriptor. Use `@property` for the common getter form, or call `property(fget, fset, fdel, doc)` directly; every argument is optional and may also be named. Instance reads call `fget`, writes call `fset`, and deletion calls `fdel`; an already-bound hook stays bound and receives the property instance as an additional argument. `.getter(fn)`, `.setter(fn)`, and `.deleter(fn)` return cloned descriptors. An omitted/`None` `doc` follows `fget.__doc__` through normal attribute lookup; an explicit non-`None` doc is preserved by clones. **Returns:** property

### classmethod(func, /)
Wrap a function as a class method. Usually written `@classmethod`; the decorated method receives the class (conventionally `cls`) as its first argument and can be called on the class or an instance. **Returns:** any

### staticmethod(func, /)
Wrap a function as a static method. Usually written `@staticmethod`; the decorated method receives neither an instance nor the class and behaves as a plain function namespaced under the class. **Returns:** any

### NotImplemented
The immutable singleton returned by an operator method to ask Python to try reflected dispatch or the normal fallback.

### \_\_debug\_\_
Immutable boolean constant, always `True` in game scripts. It may be read but cannot be assigned or deleted directly.

## Conversion

### str(value='', /)
Convert a value to its string form. With no arguments, returns the empty string `''`. **Returns:** string

### int(value=0, /, base?)
Convert to integer. With no args returns `0`. Numbers truncate toward zero. String conversion consumes the whole trimmed value and accepts Python underscore separators and Unicode decimal digits. The optional `base` is 2-36 or `0`; `base=0` detects `0x` / `0b` / `0o` prefixes. Prefix and base forms retain arbitrary-size exact integers within the interpreter's integer budget. **Returns:** number

### float(value=0.0, /)
Convert to float. With no arguments, returns `0.0`. String conversion consumes the whole trimmed value and accepts Python decimal/exponent syntax, underscore separators, Unicode decimal digits, and case-insensitive `inf` / `nan`. Trailing garbage raises; booleans coerce to `0.0` / `1.0`. **Returns:** number

### chr(code, /)
Character from Unicode code point (e.g. `chr(65)` gives `'A'`). **Returns:** string

### ord(char, /)
Unicode code point from character (e.g. `ord('A')` gives 65). **Returns:** number

### bool(value?, /)
Convert to boolean (True/False). With no args returns False. **Returns:** boolean

### list(iterable?, /)
Convert any iterable to a list, or create an empty list with `list()`. See [[list]] for the full method reference. **Returns:** list

### dict(**kwargs) / dict(source, /, **kwargs)
Build a dictionary. Empty form `dict()`. From pairs: `dict([("a", 1), ("b", 2)])`. Shallow-copy another dict: `dict(d)`. Keyword form: `dict(name="Mars", temp=-63)`. Keys may be any hashable value, including tuples of hashables and properly hashable user instances. Operators: `a | b` returns a merged copy with right-hand values winning; `a |= b` updates `a` in place. See [[dict]]. **Returns:** dict

### set(iterable?, /)
Build a set of unique members from any iterable, or `set()` for empty. Members may be any hashable values, including tuples of hashables and properly hashable user instances. Use `{1, 2, 3}` for a literal: empty `{}` is a dict, not a set, so empty set is always `set()`. See [[set]]. **Returns:** set

### tuple(iterable?, /)
Build a tuple from any iterable, or `tuple()` for empty. Tuples are like lists but immutable (no `append` / `pop` / `sort`): useful for fixed records and as hashable keys. See [[tuple]]. **Returns:** tuple

### hex(integer, /)
Render an integer as a Python-style hex string with `0x` prefix. `hex(255)` gives `'0xff'`, `hex(-16)` gives `'-0x10'`. Floats reject. **Returns:** string

### bin(integer, /)
Render an integer as a binary string with `0b` prefix. `bin(10)` gives `'0b1010'`. Floats reject. **Returns:** string

### oct(integer, /)
Render an integer as an octal string with `0o` prefix. `oct(8)` gives `'0o10'`. Floats reject. **Returns:** string

### repr(value, /)
Developer-readable string for a value, with quotes around strings and nested-repr for containers. `repr([1, "a"])` gives `"[1, 'a']"` (note the quotes around `'a'`). Use when you want to see the value's structure, not its display form. Also reached via the f-string `!r` conversion: `f"{name!r}"`. **Returns:** string

## Functional

### total_ordering(cls, /)
Class decorator that preserves the class object and fills missing ordering methods from `__eq__` plus one of `__lt__`, `__le__`, `__gt__`, or `__ge__`. Explicit methods are never replaced. Applying it mutates the local class namespace. Also available as `from functools import total_ordering`. **Returns:** any

### wraps(wrapped, /)
Return a decorator that preserves the wrapped callable's supported name, qualified name, docstring, custom attributes, and `__wrapped__` link while keeping the wrapper's call behavior. Applying the returned decorator mutates only that local wrapper function. Also available via [[functools]]. **Returns:** any

## Math

### abs(number, /)
Absolute value. **Returns:** number

### isclose(a, b, rel_tol=0.000000001, abs_tol=0.0)
Return `True` when two numbers are close enough to treat as equal. `rel_tol` scales with the compared values; `abs_tol` sets a fixed accepted difference in the same unit, useful for values near zero and physical readings such as coordinates. Tolerances must be non-negative. This is the directly available equivalent of Python's `math.isclose()`. **Returns:** boolean

### min(a, b, ...) / min(sequence, key=fn, default=v)
Return the selected original value whose key is smallest under `<`. Accepts multiple values or one finite iterable, handled eagerly within the collection limit. With `key=None` (the default), each value is its own key; otherwise the pure `key=` callback runs once per item and cannot suspend or mutate game state. Keys must be mutually comparable: numeric and boolean keys compare across that family, strings compare lexicographically, and user objects may supply the rich-comparison slots required by `<`. In single-iterable form, `default=v` supplies the result for an empty input; without it, empty input raises. **Returns:** any

### max(a, b, ...) / max(sequence, key=fn, default=v)
Return the selected original value whose key is largest under `>`. Same rules as `min`. **Returns:** any

### round(number, ndigits=None)
Round with ties to even. Without `ndigits` (or with `None`), returns the nearest whole value and rejects NaN/infinity. Integer and boolean inputs remain exact; negative `ndigits` rounds exact integers in decimal. Both arguments accept keyword form. **Returns:** number

### pow(base, exp, mod=None)
`base` raised to `exp`. Optional `mod` performs exact modular exponentiation and accepts negative exponents when the base has a modular inverse. `base`, `exp`, and `mod` accept positional or keyword form. **Returns:** number

### random()
Random floating-point number `>= 0` and `< 1`. Each successful run begins a new automatic sequence. Also available as `random.random()` after `import random`. **Returns:** number

### rand()
Short alias for `random()`. Also available as `random.rand()`. **Returns:** number

### randint(min, max, /)
Random integer `N` where `min <= N <= max`. Bounds are inclusive and must be whole numbers. Each successful run begins a new automatic sequence. Useful with `planet.get_bounds()` for random valid coordinates. Also available as `random.randint(min, max)`. **Returns:** number

### sqrt(number, /)
Square root. Errors on negative input. **Returns:** number

### floor(number, /) / ceil(number, /) / trunc(number, /)
Round down to the nearest integer / round up to the nearest integer / drop the fractional part (round toward zero). **Returns:** number

### divmod(a, b, /)
Divides `a` by `b` and returns two values: the quotient rounded down, and the remainder left over. For example, `divmod(19, 2)` returns `(9, 1)` because 2 fits into 19 nine times with 1 left over. **Returns:** tuple of numbers

### sign(number, /)
Returns `-1`, `0`, or `1` for negative, zero, or positive input. **Returns:** number

### exp(number, /)
`e` raised to the power of the argument. **Returns:** number

### log(number, base?, /) / log2(number, /) / log10(number, /)
Natural log (or log with the given base), base-2 logarithm, base-10 logarithm. **Returns:** number

### sin(radians, /) / cos(radians, /) / tan(radians, /)
Sine, cosine, tangent of an angle in radians. **Returns:** number

### asin(number, /) / acos(number, /)
Arc sine / arc cosine. Input must be in **-1 to 1**. **Returns:** number

### atan(number, /)
Arc tangent. **Returns:** number

### atan2(y, x, /)
Arc tangent of `y/x`, correctly choosing the quadrant. **Returns:** number

### degrees(radians, /) / radians(degrees, /)
Convert radians to degrees / degrees to radians. **Returns:** number

### sum(iterable, /, start=0)
Sum of every numeric item in an iterable. Optional `start` (number or list): `sum(list_of_lists, [])` flattens. `start` may be positional or keyword, but not both. **Returns:** number | list

### prod(iterable, /, start=1)
Product of every numeric item in an iterable. Empty iterables return `start`. `start` may be positional or keyword, but not both. **Returns:** number

### inf
Positive infinity, larger than every finite number. Use `-inf` for negative infinity, including as an initial best or worst value in search and pathfinding algorithms.

### pi / tau
Mathematical constants **π ≈ 3.14159** and **τ = 2π**.

## Logic

### all(iterable, /)
True if every item in the iterable is truthy. Stops at the first falsy item, so generators are consumed only as far as needed. **Returns:** boolean

### any(iterable, /)
True if any item in the iterable is truthy. Stops at the first truthy item, so generators are consumed only as far as needed. **Returns:** boolean

## Iteration

### iter(iterable, /)
Return an iterator. Built-in iterables use a compatibility list-shaped iterator; protocol iterators and generators keep their identity, so `iter(iterator) is iterator`. `for` advances generators and custom iterators one item at a time, so it can break out of an infinite iterator. Consumers that must finish, such as `list(...)`, remain bounded. **Returns:** list | generator

### next(iterator, default?, /)
Advance an iterator by one item. Iterators returned by `iter()` and custom `__next__` iterators retain their cursor across calls. Ordinary lists keep the compatibility behavior of popping the front; other non-iterator iterables return their first materialized item. Exhaustion raises `StopIteration` unless `default` is given. **Returns:** any

### pairwise(iterable, /)
Return neighboring pairs from an iterable. `pairwise([1,2,3])` gives `[(1,2), (2,3)]`. **Returns:** list of tuples

### batched(iterable, size, /)
Split an iterable into tuple batches of `size`. The final batch may be shorter. `batched([1,2,3,4,5], 2)` gives `[(1,2), (3,4), (5,)]`. **Returns:** list of tuples

### starmap(fn, iterable, /)
Call pure `fn` with each tuple/list item unpacked as arguments. The callback cannot suspend the script or mutate game state. `starmap(pow, [(2,3), (3,2)])` gives `[8,9]`. An empty input never inspects or calls `fn`. **Returns:** list

### flatten(iterable, /)
Flatten one level of nested iterables into a list. `flatten([[1,2], (3,4)])` gives `[1,2,3,4]`. **Returns:** list

### count_by(iterable, key_fn?, /)
Count items into a dict. Without `key_fn` (or with `None`), counts each item. With a pure `key_fn`, counts the computed key; callbacks cannot suspend the script or mutate game state: `count_by(items, lambda x: x.kind)`. An empty input never inspects or calls the key function. **Returns:** dict

### chain(*iterables)
Flattens any number of iterables into one list, in order. `chain([1,2], [3,4])` gives `[1,2,3,4]`. Accepts lists, tuples, strings, sets. **Returns:** list

### accumulate(iterable, /)
Running prefix sum over any finite iterable. `accumulate([1,2,3,4])` gives `[1,3,6,10]`. Numeric items only; booleans participate as integers and arbitrarily large integers remain exact. **Returns:** list of numbers

### combinations(iterable, k, /)
All `k`-element combinations from an iterable, in input order, no repeats. Returns a list of tuples. `combinations([1,2,3], 2)` gives `[(1,2), (1,3), (2,3)]`. **Returns:** list of tuples

### permutations(iterable, k?, /)
All `k`-length ordered arrangements from an iterable. `k` defaults to the full length. `permutations([1,2,3])` gives all 6 orderings as tuples. **Returns:** list of tuples

### product(*iterables, repeat=1)
Cartesian product. `product([0,1], [0,1])` gives `[(0,0), (0,1), (1,0), (1,1)]`. Each input must be iterable; result is a list of tuples. Optional keyword `repeat=N` repeats the input pools, matching `itertools.product([0,1], repeat=2)`. **Returns:** list of tuples

### map(fn, iter1, iter2?, ..., /, strict=False)
Apply pure `fn` to corresponding items of each iterable. Callbacks cannot suspend the script or mutate game state. Single-iter form calls `fn(x)`; multi-iter form calls `fn(x, y, ...)` and stops at the shortest input unless `strict=True`, which raises if input lengths differ. If no row is produced, `fn` is never inspected or called. **Returns:** list

### filter(fn, iterable, /)
Keep items for which pure `fn(item)` is truthy; callbacks cannot suspend the script or mutate game state. `filter(None, iter)` keeps every truthy item without a callback. An empty input never inspects or calls `fn`. **Returns:** list

### reduce(fn, iterable, initializer?, /)
Combine an iterable into one value by repeatedly calling pure `fn(total, item)`; callbacks cannot suspend the script or mutate game state. With no initializer, the first item becomes the initial total; empty iterables then raise. Empty-with-initializer and singleton-without-initializer perform no callback call. Also available as `from functools import reduce`. **Returns:** any

## Exceptions

Every exception constructor takes an optional positional message. See the [[Exceptions]] guide for usage.

| Exception | Meaning |
| --- | --- |
| `BaseException(message?)` | Root of the supported exception hierarchy |
| `Exception(message?)` | Base class matched by ordinary `except Exception:` handlers |
| `ArithmeticError(message?)` | Base class for numeric calculation failures |
| `ValueError(message?)` | A value has the right type but an invalid value |
| `TypeError(message?)` | An operation received a value of an inappropriate type |
| `PermissionError(message?)` | An operation is prohibited by the caller's ownership or access contract |
| `ReferenceError(message?)` | A captured component or module handle is no longer valid |
| `LookupError(message?)` | Base class for invalid mapping keys and sequence indexes |
| `KeyError(message?)` | A dictionary key is not present |
| `IndexError(message?)` | A sequence index is out of range |
| `AttributeError(message?)` | An attribute reference failed |
| `RuntimeError(message?)` | A runtime failure that does not fit a more specific category |
| `NotImplementedError(message?)` | A required operation or override is not implemented |
| `RecursionError(message?)` | The interpreter's call-depth limit was exceeded |
| `NameError(message?)` | A local, free, or global name could not be resolved |
| `UnboundLocalError(message?)` | A statically local name was read before it was bound (`NameError` subclass) |
| `ImportError(message?)` | An import could not provide the requested binding |
| `ModuleNotFoundError(message?)` | An imported module could not be found (`ImportError` subclass) |
| `OverflowError(message?)` | A numeric conversion or bounded allocation exceeded its supported range |
| `ZeroDivisionError(message?)` | Division or modulo used a zero divisor |
| `StopIteration(message?)` | An iterator was exhausted. Its `.value` contains a generator's return value, or `None` |
| `GeneratorExit(message?)` | Raised inside a generator when `close()` asks it to stop. Derives directly from `BaseException` |
| `AssertionError(message?)` | An `assert` statement failed |
| `SyntaxError(message?)` | Source could not be compiled |
| `IndentationError(message?)` | Source indentation is inconsistent (`SyntaxError` subclass) |

## See also

- [[Language Reference]]: syntax, control flow, operators, classes
- [[System Commands]] and [[Infrastructure Commands]]: game-world top-level functions
- [[dict]] · [[list]] · [[set]] · [[str]] · [[tuple]] · [[generator]] · [[slice]]: built-in type references
