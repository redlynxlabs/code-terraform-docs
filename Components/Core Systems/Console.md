---
tags:
  - component
  - core-systems
aliases:
  - console
---
# Console

Writes structured script output to the same Console used by `print()`. Access it with `get_component("console")`; no research is required. Messages can have a severity, named channel, color, and timestamp.

**Access:** `get_component("console")` · Like every component, exposes `.id` and `.name`.

## Methods

### .print(message, level="info", channel="", color="", timestamp=False)
Print a line with full control. `level` is `info` / `warn` / `error` / `debug` (which feed the WARNINGS / ERRORS filters), or any other non-empty string for a **custom level** shown as a colored badge. An empty level behaves like `info`. `channel` routes the line to a named tab (empty = the main stream). `color` is a theme token (`"warning"`, `"success"`, `"accent"`), which recolors with the theme, or any CSS color: hex (`"#aabbcc"`), `"rgb(255,100,0)"`, `"hsl(30,100%,50%)"`, or a name like `"orange"`. A true `timestamp` value prepends the game time-of-day.

```python
get_component("console").print("Overheat", "alert", "alarms", "warning", True)
```

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .info(message, channel="", color="", timestamp=False)
Print an info line (the default level). Its optional channel, color, and timestamp parameters behave like those on `print`. Equivalent to `print(message)`.

**Returns:** ActionResult · Outcomes: `"ok"`

### .warn(message, channel="", color="", timestamp=False)
Print a warning line; appears in the console's WARNINGS filter. For an interruptive popup instead, use the global `notify(text, "warn")`.

**Returns:** ActionResult · Outcomes: `"ok"`

### .error(message, channel="", color="", timestamp=False)
Print an error line; appears in the console's ERRORS filter. This is your own message at error severity, not an uncaught exception.

**Returns:** ActionResult · Outcomes: `"ok"`

### .debug(message, channel="", color="", timestamp=False)
Print a low-priority debug line, hidden from the ALL view unless the player enables debug output.

**Returns:** ActionResult · Outcomes: `"ok"`

### .now()
Return the current game time-of-day as a `"HH:MM:SS"` string, for building your own line prefixes when you want full control over formatting.

**Returns:** String

### .clear(channel="")
Clear output produced by **this script**. With a `channel` argument, clears only this script's lines in that channel; with no argument, clears all output from this script. Other scripts and system messages are preserved.

**Returns:** ActionResult · Outcomes: `"ok"`

## See also

- [[Print]]: the plain global output functions
- [[Utility Helpers]]: console helpers in context
