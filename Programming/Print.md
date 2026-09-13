---
tags:
  - guide
  - programming
---
# Print

Use `print()` to output normal text to the console.

```python
print("Hello")
print(42)
```

You can print multiple values separated by spaces:

```python
temp = -63
print("Temperature:", temp, "°C")
```

Use `warn()` for monitor messages you want to stand out in the persistent console without showing a toast:

```python
if self.efficiency() < 100:
  warn("oxygen generator below 100% efficiency")
```

Use `debug()` for noisy telemetry you only want while tuning a script. Debug lines are hidden from ALL unless you enable debug output from the console options menu:

```python
debug("target", target_sector, "heat", self.get_heat())
```

The console can show **THIS SCRIPT**, **ALL** output, **WARNINGS**, or **ERRORS**.

## See also

- [[Built-in Functions]]: full signatures for `print()`, `warn()`, `debug()`, and `notify()`
- [[Console]]: the component for script-owned console channels
- [[Reading Errors and Console Output]]: the console in practice
