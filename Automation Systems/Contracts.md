---
tags:
  - guide
  - automation
---
# Contracts

Earth posts contracts: engineering tasks they need done on the planet. You write code to solve them and transmit the answer.

Each contract has:

- A briefing explaining what Earth needs
- Input data in `self.contract`
- A reward in credits

To complete a contract:

1. Go to the Contracts page and open one with **View Contract**
2. Read the briefing in the Info tab
3. Print `self.contract` to see available input fields
4. Transmit the answer via the [[Transmitter]]:

```python
c = self.contract
print(c)

transmitter = get_component("transmitter")
transmitter.connect("earth")
transmitter.transmit(c.id, answer)
```

If your answer is correct, you get paid immediately.

[[Commander]] and [[Shop]] are also accessible:

```python
me = get_component("me")
print(me.get_credits())

shop = get_component("shop")
shop.sell("soil_sample")
shop.buy("solar_generator")
```

## The contract catalog

Every contract type has its own input API. See [[Contract]] for the shared base fields and the full list:

[[Beat the System]] · [[Buried Five]] · [[Cold Boot]] · [[Core Sample]] · [[Corrupted Archive]] · [[Crosstalk]] · [[Data Tablet]] · [[Drifting Signal]] · [[Lattice]] · [[Relay Hack]] · [[Sealed Vault]] · [[Terminal Breach]] · [[The Loom]] · [[Three Echoes]] · [[Xenogenetics]]

## See also

- [[Contracts Tutorial]]: how to approach your first one
- [[Earth Orders Guide]]: Contracts are puzzles, Orders are supply lines
