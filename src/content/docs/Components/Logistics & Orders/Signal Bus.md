---
tags:
  - component
  - logistics-orders
aliases:
  - comms
title: "Signal Bus"
---

Coordinates scripts through shared JSON-safe values. Use `send()` and `receive()`/`wait()` for **work that should be handled once** (queues); use `broadcast()` and `latest()` for **the newest shared value** (telemetry). Full patterns and worked examples: [[Signal Bus Guide]].

**Limits:** channel ids are 1-64 characters using letters, numbers, `_`, `.`, `:`, or `-` (not a reserved object-field name). Values are JSON-safe, up to 8 nested levels, 1,024 total values, 4,096 characters per string.

**Access:** `get_component("comms")` after its research unlocks · Like every component, exposes `.id` and `.name`.

## Queue methods

### .send(channel, value)
Add a value to a named channel queue. Keep the receipt to identify or cancel that exact request later, even among identical values.

**Returns:** [[SendResult]] (payload `.message_id`) · Outcomes: `"ok"` / `"invalid_channel"` / `"channel_limit"` / `"queue_full"` / `"id_exhausted"` / `"invalid_value"` (all rejections queue nothing)

### .receive(channel, message_id=None)
Take one queued message. Omit `message_id` for the oldest, or pass an id to take exactly that job. **Selection and removal happen together**, so only one competing receiver can take it. Broadcasts are preserved. Use `pending()` to choose work by priority, location, or capability first.

**Returns:** [[ReceiveResult]] (payload `.packet`) · Outcomes: `"ok"` / `"empty"` (success, nothing consumed) / `"not_found"` / `"invalid_channel"` · **Raises:** `TypeError` / `ValueError` / `OverflowError` for a bad `message_id`

### .wait(channel)
Wait for and take the oldest queued message. If the queue is empty, **only this script pauses**; the game and other scripts keep running. Already-queued messages are taken immediately. Broadcasts do not satisfy the wait. Pausing preserves the wait; stopping the script abandons it without consuming a message.

**Returns:** ReceiveResult (payload `.packet`) · Outcomes: `"ok"` / `"invalid_channel"`

### .wait_any(channels)
Wait for and take one queued message from any listed channel. **Channels listed first have priority** whenever work is selected; each channel keeps oldest-first order. The list is copied when called; repeated names count once at their first position.

**Returns:** [[WaitAnyResult]] (payload `.channel`, `.packet`) · Outcomes: `"ok"` / `"invalid_channel"` · **Raises:** `TypeError` (non-string entries), `ValueError` (must be 1-128 entries)

### .wait_broadcast(channel)
Wait for the **next** broadcast on a channel. Every script already waiting captures that publication, including a repeated value or `None`. **Existing broadcasts do not satisfy a new wait.** The first publication is retained even if another broadcast follows or the channel is cleared; pausing retains the signal for resume.

**Returns:** [[WaitBroadcastResult]] (payload `.broadcast`) · Outcomes: `"ok"` / `"invalid_channel"`

### .pending(channel)
Inspect all waiting messages in receive order **without consuming them**. Everything is copied; editing the returned list does not change the bus. Broadcasts and already-received messages are excluded.

**Returns:** List of [[CommsMessage]] copies, oldest first · **Raises:** `ValueError` for a bad channel id

### .cancel(channel, message_id)
Remove one waiting message using its send receipt's `.message_id` or its `.id` from `pending()`. Other messages keep their ids, values, and order; the latest broadcast is preserved. Cancellation cannot stop a worker that already received the message.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_found"` / `"invalid_channel"` · **Raises:** `TypeError` / `ValueError` / `OverflowError`

### .update(channel, message_id, value)
Replace the **complete** value of one waiting message (dictionary fields are replaced, not merged). Id, queue position, original sender, and send time stay unchanged. Works even when the queue is full. Already-received messages cannot be edited.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_found"` / `"invalid_channel"` / `"invalid_value"` · **Raises:** `TypeError` / `ValueError` / `OverflowError`

### .queue_size(channel)
Number of queued messages waiting on the channel.

**Returns:** Number · **Raises:** `ValueError`

## Broadcast methods

### .broadcast(channel, value)
Store a channel's latest value without consuming queue slots. For shared telemetry: fleet mode, target sector, current priority.

**Returns:** ActionResult · Outcomes: `"ok"` / `"invalid_channel"` / `"channel_limit"` / `"invalid_value"`

### .latest(channel)
Most recent broadcast value, or `None` if nothing has been broadcast. Reading does not consume it.

**Returns:** Value or `None` · **Raises:** `ValueError`

### .latest_info(channel)
The latest broadcast plus who published it and how long ago: a [[BroadcastInfo]] snapshot with `value`, `sender`, `age_seconds`, or `None` when the channel has no broadcast. Use to detect outdated worker reports or show freshness on a [[Control Room]] card.

**Returns:** `BroadcastInfo` or `None` · **Raises:** `ValueError`

## Housekeeping

### .channels()
All channel ids that currently have queued messages or a latest broadcast value.

**Returns:** List of strings

### .clear(channel)
Remove a channel's queued messages and latest broadcast.

**Returns:** [[CountResult]] (payload `.count`) · Outcomes: `"ok"` / `"no_op"` / `"invalid_channel"`

## See also

- [[Signal Bus Guide]]: dispatcher/worker patterns, priority lanes, telemetry dashboards
- [[Data Archive]]: durable storage instead of live state
