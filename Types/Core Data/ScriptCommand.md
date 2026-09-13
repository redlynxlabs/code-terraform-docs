---
tags:
  - type
  - core-data
aliases:
  - ScriptCommand
---
# ScriptCommand

One command from the editor's Commands tab mailbox. **Returned by:** `self.peek_command()` / `self.next_command().command` after `status == "ok"`.

### .id
Unique command id assigned when it entered this script's queue.

**Returns:** string

### .name
Command name, such as `"return_base"`. **Your script decides what each name means.**

**Returns:** string

### .args
JSON-safe argument dict sent with the command. Use `.get(key, default)` for optional arguments.

**Returns:** dict

### .source
Where the command came from: `"editor"`, `"script"`, `"signal"`, or `"system"`.

**Returns:** string

### .created_at
Bookkeeping value: a supplied real-world timestamp in milliseconds, otherwise the enqueueing simulation tick, or 0. **For gameplay timing, use `.tick`.**

**Returns:** number

### .tick
Game tick when the command was queued, or `None` if not available.

**Returns:** number or `None`

## See also

- [[Script Commands]]: the mailbox guide
