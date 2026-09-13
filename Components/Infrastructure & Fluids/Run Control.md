---
tags:
  - component
  - infrastructure-fluids
aliases:
  - run_control
---
# Run Control

Shared start/stop controller for machine scripts: the remote equivalent of a machine card's **Run / Stop** buttons. Build a supervisor with it: one script that watches the base and shuts down another machine on a fault, without parking that machine in a permanent `sleep` loop.

This is the **run/stop axis**, separate from [[Power Control]] (the breaker): `stop` ends a script and **latches it off**, while a power toggle only pauses and auto-resumes.

**Access:** `get_component("run_control")` · Like every component, exposes `.id` and `.name`.

```python
run = get_component("run_control")
if run.is_running("o2gen_1"):
    run.stop("o2gen_1")    # latched off, won't auto-resume on power
else:
    run.start("o2gen_1")   # re-run the machine's script from the top
```

## Methods

### .is_running(machine_id)
`True` when the named machine has a script actively scheduled, including mid-`sleep` or mid-action. A paused, stopped, completed, or errored script reads `False`, as does an unknown id. Call before start/stop to avoid redundant commands.

**Returns:** Boolean

### .stop(machine_id)
Stop the machine's script the way the card's Stop button does: ends the script, **resets its setpoints to idle, and zeroes its live readouts**. Structural state (recipes, in-flight progress, loaded materials) is preserved. The stop is latched; the script does not auto-resume. Restart with `start`.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_found"` / `"no_script"`

### .start(machine_id)
Run the machine's script **from the top**, like the card's Run button. It does not resume mid-script. The machine must be powered and fully built.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_found"` / `"no_script"` / `"already_running"` (transient) / `"not_powered"` / `"under_construction"` (transient)

## See also

- [[Long-Running Scripts]]: what stop/start does to setpoints
- [[Power Control]]: the breaker axis
- [[Script Variants]]: choosing which script a machine runs
