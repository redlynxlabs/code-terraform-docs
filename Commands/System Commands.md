---
tags:
  - reference
  - commands
aliases:
  - System
---
# System Commands

Top-level functions available in every script. Commands return [[ActionResult]] objects; see [[Command Results]] for the model.

## boot()

Initialize the system and run diagnostics.

**Returns:** ActionResult (`.status`, `.message`; no payload)

| Status | Kind | Meaning |
| --- | --- | --- |
| `"booting"` | success | The boot sequence has started. |
| `"already_booted"` | success | The system is already booted. |

```python
boot()
```

## activate_power()

Turn on the power grid after the station has finished booting.

**Returns:** ActionResult (`.status`, `.message`; no payload)

| Status | Kind | Meaning |
| --- | --- | --- |
| `"activating"` | success | Activation has started. |
| `"already_online"` | success | The system is already online. |
| `"boot_required"` | rejection | The station must finish booting before this operation is available. |

```python
activate_power()
```

## activate_sensors()

Bring the sensor array online. Requires power.

**Returns:** ActionResult (`.status`, `.message`; no payload)

| Status | Kind | Meaning |
| --- | --- | --- |
| `"initializing"` | success | Initialization has started. |
| `"already_online"` | success | The system is already online. |
| `"power_required"` | rejection | The operation requires an online power system. |

```python
activate_sensors()
```

## get_component(name)

Access a player-owned entity by its **immutable id** (e.g. `"solar_3"`, `"outpost_home"`). The id is auto-generated on creation and never changes: use this in scripts that need to outlive renames. To look up by display name (mutable), use `get_component_by_name(name)`. Returns `None` if no entity has the given id.

**Parameters:** `name` (string): entity id (machine or outpost)

**Returns:** Component object

```python
clock = get_component("clock")
time = clock.get_time()
print(time)
```

## get_component_by_name(name)

Look up any addressable player-owned component (machine or outpost) by its display name. Names default to the entity's id but can be freely renamed from the Computer System tab; uniqueness is enforced across the shared rename namespace. Custom Panels share that namespace but are not components, so they are not returned here. Mutable: `get_component(id)` is the stable form for long-running scripts. Returns `None` if no component has the given name.

**Parameters:** `name` (string): the entity's display name

**Returns:** Component (machine or outpost), or `None`

```python
ore_bin = get_component_by_name("Iron Stockpile")
print(ore_bin.count("iron_ore"))
```

## See also

- [[Infrastructure Commands]]: `get_pipe()` and `list_pipes()`
- [[Built-in Functions]]: the always-available function library
- [[Components Overview]]: how component access works
