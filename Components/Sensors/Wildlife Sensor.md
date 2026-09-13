---
tags:
  - component
  - sensors
aliases:
  - wildlife_sensor
---
# Wildlife Sensor

Reports total individual fauna across all established [[Habitat]] colonies. Available after Biosphere research lands; reads `0` until the first Wildlife colony establishes.

**Access:** `get_component("wildlife_sensor")` · Like every component, exposes `.id` and `.name`.

## Methods

### .get_value()
Returns the current Wildlife population count as a number, summed from established Habitat colonies.

**Returns:** Number (individuals)

## Example

```python
component = get_component("wildlife_sensor")
value = component.get_value()
print(value)
```

## See also

- [[Wildlife Overview]]: what counts toward this total
