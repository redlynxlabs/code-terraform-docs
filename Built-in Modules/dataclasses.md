---
tags:
  - reference
  - module
---
# dataclasses

Built-in record-class helpers. Works without Shared Library research. Generates concise user-class value objects; use `TypedDict` for JSON-shaped records.

## dataclasses.dataclass(cls?, /, \*, init=True, repr=True, eq=True, order=False, kw_only=False, unsafe_hash=False, frozen=False, slots=False, weakref_slot=False)

Decorate a class to generate declaration-ordered construction, representation, value equality, and optional ordering. Supports both `@dataclass` and `@dataclass(...)`, inherited fields, `__post_init__`, and explicit-method preservation. Generated behavior is controlled by `init`, `repr`, `eq`, `order`, and `kw_only`. Compatibility flags `unsafe_hash`, `frozen`, `slots`, and `weakref_slot` may be passed only as `False`; their `True` behavior and every unlisted standard-library option are rejected rather than ignored. Dataclass instances remain ordinary user objects and cannot cross JSON-shaped game API boundaries.

| Parameter | Description |
| --- | --- |
| `cls` | Optional class for functional or bare-decorator use |
| `init` | Generate `__init__` (default True) |
| `repr` | Generate `__repr__` (default True) |
| `eq` | Generate exact-class `__eq__` (default True) |
| `order` | Generate ordering methods (default False) |
| `kw_only` | Make generated constructor fields keyword-only (default False) |
| `unsafe_hash` / `frozen` / `slots` / `weakref_slot` | Compatibility flags; only `False` is supported |

**Returns:** any

## dataclasses.field(\*, default?, default_factory?, init=True, repr=True, compare=True, kw_only?)

Configure one annotated dataclass field. Use `default` for an immutable or hashable shared value, or `default_factory` for a zero-argument factory that creates an independent value per instance; supplying both is an error. Mutable or otherwise unhashable direct defaults are rejected and must use `default_factory`. `init` controls constructor inclusion, `repr` controls generated display, `compare` controls equality and ordering, and `kw_only` controls that field's constructor position. Field metadata/introspection, `hash`, and every unlisted standard-library option are not supported.

| Parameter | Description |
| --- | --- |
| `default` | Optional immutable or hashable shared value |
| `default_factory` | Optional zero-argument factory |
| `init` | Include this field in the generated constructor (default True) |
| `repr` | Include this field in generated representation (default True) |
| `compare` | Include this field in generated equality and ordering (default True) |
| `kw_only` | Make this constructor field keyword-only |

**Returns:** any

## See also

- [[Writing Classes]]: dataclasses in context, with the full support and exclusion list
