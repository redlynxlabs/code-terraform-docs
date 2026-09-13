---
tags:
  - component
  - sensors
aliases:
  - plants_sensor
---
# Plants Sensor

Reports permanent vegetated km² produced by the [[Plant Terraformer]] fleet. Available after the Biosphere research lands. Field growth alone does not change this value.

**Access:** `get_component("plants_sensor")` · Like every component, exposes `.id` and `.name`.

## Methods

### .get_value()
Returns permanent Plants km² as a number. Plant Terraformers are the only writers; repeated crop cycles, diversity, providers, Fertilizer, and Yield Amplifier increase the physical Forage supply they process.

**Returns:** Number (km² planted)

## Example

```python
component = get_component("plants_sensor")
value = component.get_value()
print(value)
```

## See also

- [[Biosphere Plants]]: the crop chain feeding this number
