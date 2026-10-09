---
title: "Steno Pad Paper"
blurb: "Steno pad paper — Gregg or Pitman ruling split by a centre rule, with a date strip and green tint, or a narrow reporter's column"
category: paper
version: "1.0.0"
---
Shorthand paper as the steno pad prints it — Gregg or Pitman ruling split by
a centre rule, a date strip at the head and a pale green page — or one
narrow reporter's column.

## What it is

The stenographer's notebook page. Horizontal rules run across the sheet at
one of the shorthand rulings, and a vertical centre rule splits it into two
narrow columns:

- **Gregg rule** — 11/32 in (8.73 mm), the standard US steno pad, for Gregg
  shorthand.
- **Pitman rule** — ½ in (12.7 mm), the wider spacing sold for Pitman
  shorthand, whose outlines are written above, on or through the line.
- **College** (9/32 in) and **narrow** (¼ in) rule for denser notes.

A blank head strip at the top carries a "DATE" line, and the page can be
tinted the pale green ("eye-ease") of the classic pad, pale grey, canary or
left white. The **reporter** style is a single narrow column — 4 in wide by
default, the width of a reporter's notebook — edged by two rules and centred
on the sheet.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page") so the
rule spacing matches a bought pad. Write the date on the line at the top.
On a steno page, write down the left column first, then the right one: the
short lines keep your hand moving fast and your eye on the speaker. When the
page is full, turn it and carry on; strike through each page as you
transcribe it. Shorthand writers should choose the ruling of their system:
Gregg rule for Gregg shorthand, Pitman rule for Pitman. The reporter column
can be cut out along its edges and stacked into a pocket notebook for
interviews, lectures and meetings.

## Purpose

Taking shorthand dictation and practising Gregg or Pitman outlines; fast
notes in meetings, lectures, interviews and phone calls; to-do lists in two
columns; a narrow notebook for journalists. In a book, steno pages make a
shorthand practice workbook or a meeting-notes journal.

## History

Isaac Pitman published his phonetic shorthand, Stenographic Sound-Hand, in
England in 1837; John Robert Gregg's system, first published in 1888 as
Light-Line Phonography, became the dominant shorthand in the United States.
Both were taught to secretaries, court reporters and journalists through
much of the 20th century, and stationers sold pads ruled to suit each: the
narrower Gregg rule and the wider Pitman rule, both with the single centre
line that splits the page into two quick-to-scan columns. The 6 × 9 in pad
is bound at the top so the writer can flip pages over with one hand, and
its paper is often tinted pale green to soften glare. The reporter's
notebook — narrower, around 4 × 8 in, also bound at the top — fits a jacket
pocket and can be written in while standing.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `style` (steno, reporter);
  `ruling` (gregg, pitman, college, narrow); `ink` (the horizontal rules,
  default green) and `weight` in points (0.1–2); `rule_ink` (the centre rule
  or the reporter's edge rules, drawn 1.5 × the weight, default engineering
  green); `paper` (white, green_tint, gray, canary); `header_mm` (the head
  strip, 0–60, default 15); `date_label` (the DATE line, needs a strip of
  7 mm or more); `reporter_width_mm` (50–150, default 101.6 = 4 in; reporter
  style only, held to the content width).
- **Generation:** the first rule sits under the head strip and the rest
  follow at `top + k × ruling` down to the bottom margin — whole spaces only,
  never stretched. The steno centre rule sits exactly halfway across the
  ruled width and runs from the first rule to the last; the reporter column
  is centred on the sheet. The tint fills the content box (the reporter
  column only, in that style), never the margins. The DATE label is laid
  out in the stroke font over the right-hand column, with a writing line to
  the right edge; if the strip is too shallow it is dropped and the meta
  says so.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the ruling is exact (every gap equals the chosen spacing,
  checked to 1e-9 pt on every page size, orientation, style and ruling), the
  centre rule halves the page, and all ink — the tint, stroke widths and the
  date label included — stays inside the margins. A knob outside its range
  is clamped and the request recorded as `requested_<field>` in the meta.
