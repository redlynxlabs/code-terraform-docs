---
tags:
  - guide
  - programming
title: "Docstrings"
---

Docstrings are string literals placed at the top of a function body. They do not change how the function runs; they document what the function is for.

When you hover a user-defined function or see it in autocomplete, the editor shows its signature, its docstring, and its return annotation if it has one. Imported library functions show their docstrings too. Add a return annotation such as `-> str | None` when you want the tooltip's separate return line.

```python
def next_needed(order) -> str | None:
  """Pick the next missing item for an order.
  [[helper]]
  ## Returns
  - a fragment id when one is still required
  - `None` when the order already has everything it needs
  """
  for item in order.requires.keys():
    if order.delivered.get(item, 0) < order.requires[item]:
      return item
  return None
```

## Formatting

Docstrings use the same markdown-lite formatting as DOCS descriptions:

- Inline code: `` `status` ``, `` `"ok"` ``, `` `self.deliver()` ``
- Bold text: `**important**`
- Badges: `HELPER` or `SELF ONLY`
- Headings: `## Returns`
- Callouts: lines starting with `>`
- Bullets: `- item` or `• item`
- Numbered lists: `1. item`
- Tables with `|` separators
- Fenced code blocks with triple backticks

Use blank lines between sections when you want the hover to render them as separate blocks.

## Variants

A triple-quoted string at the very top of a script is a **script description**, not a function docstring. The Variants tab uses the first non-empty line of that top-of-file docstring as the variant description. If there is no top-of-file docstring, the first `#` comment is used instead.

```python
"""Night route: charge first, then collect ice."""
while True:
  print("working")
```

For function-level help, put the docstring immediately under `def`. For variant summaries, put it at the top of the file before any code.

## See also

- [[Script Variants]]: where variant descriptions show up
- [[Imports & Libraries]]: library docstrings appear in hover too
