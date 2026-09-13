---
tags:
  - component
  - logistics-orders
aliases:
  - notebook
---
# Data Archive

Stores JSON-safe data that **survives script restarts and save/load**. Use Libraries to share code and the [[Signal Bus]] to share temporary live state; the archive is for durable records.

**Limits:** up to **512 entries**; each value supports 8 nested levels, 16,384 total nodes counting values and containers, and 4,096 characters per string or dictionary key. Keys are 1-96 characters using letters, numbers, `_`, `.`, `:`, or `-` (and cannot be a reserved object-field name).

**Access:** `get_component("notebook")` after its research unlocks · Like every component, exposes `.id` and `.name`.

## Methods

### .set(key, value)
Store a JSON-safe value under a named key.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"invalid_key"` / `"entry_limit"` / `"invalid_value"`

### .transaction(key, default, updater)
**Atomically** transform one stored value within the same limits. The updater may be any pure callable; it receives the latest value (or the supplied default when the key is missing) and cannot sleep, yield, or mutate the world.

**Returns:** ActionResult · Outcomes: `"ok"` / `"invalid_key"` / `"entry_limit"` / `"invalid_value"` / `"busy"` (transient)

### .get(key, default=None)
Read a stored value by key. Missing key returns the optional default, else `None`. Reading does not consume or modify the entry.

**Returns:** Stored value, the default, or `None` · **Raises:** `ValueError` for an invalid key

### .has(key)
`True` when the archive contains the key.

**Returns:** Boolean · **Raises:** `ValueError` for an invalid key

### .delete(key)
Remove one key.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_found"` / `"invalid_key"`

### .keys(prefix="")
Archive keys as a sorted list. Pass a prefix such as `"rover."` to list only matching keys.

**Returns:** Sorted list of strings · **Raises:** `ValueError` for an invalid prefix

### .clear(prefix="")
Remove archived entries: no prefix clears the whole archive, a prefix clears matching keys.

**Returns:** [[CountResult]] (payload `.count`) · Outcomes: `"ok"` (affected `.count` entries) / `"no_op"` (nothing matched) / `"invalid_key"`

## See also

- [[Data Archive Guide]]: patterns (checkpoints, counters, key namespacing)
- [[Signal Bus Guide]]: live cross-script state instead of durable storage
