---
tags:
  - reference
  - commands
aliases:
  - Infrastructure
---
# Infrastructure Commands

Top-level functions for inspecting map infrastructure.

## get_pipe(pipe_id)

Look up an infrastructure pipe by id. Returns a live read-only [[Pipe]] handle, or `None` if no pipe by that id exists.

**Parameters:** `pipe_id` (string): pipe id (from `list_pipes()`)

**Returns:** Live read-only `Pipe` handle or `None`

```python
pipe = get_pipe("pipe_1")
if pipe != None:
    print(pipe.state())
```

## list_pipes()

List every infrastructure pipe currently laid (complete or in-progress) as live read-only [[Pipe]] handles.

**Returns:** List of live read-only `Pipe` handles

```python
for pipe in list_pipes():
    print(pipe.id, pipe.state())
```

## See also

- [[Infrastructure & Pipes]]: the pipe system guide
- [[Construction Blueprint]]: planning pipes, power lines, bridges, and structures from scripts
