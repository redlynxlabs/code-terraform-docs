---
tags:
  - guide
  - programming
---
# Loops & Scripts

Scripts run once by default. To keep a script running continuously, use a while loop:

```python
while True:
  # this runs every game tick
  print("running")
```

The interpreter automatically gives time back to the game while loops run. World systems and other scripts keep moving, so you do not need `sleep()` to make a loop safe.

Use `sleep()` only when you intentionally want game time to pass before the script continues:

```python
while True:
  print("every 5 seconds")
  sleep(5)
```

For loops iterate over a list:

```python
for i in range(5):
  print(i)
```

See [[Long-Running Scripts]] for designing loops that re-read machine state and remain safe when a running script starts again after a game load.

## See also

- [[Language Reference]]: `if`/`else`, `while`, `for`, and `match` syntax
- [[Code Editor]]: run, pause, and stop controls
