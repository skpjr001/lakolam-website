---
title: "Number Lines"
blurb: "Number lines — missing numbers, skip counting and jumps"
category: puzzle
version: "1.0.0"
---
Rows of number lines: fill in the missing numbers, count in steps, and
follow the jumps to see where they land.

## What it is

A worksheet of number lines, each with eleven evenly spaced ticks. Some rows
show a few numbers and leave boxes for the rest; some count in steps of 2, 5
or 10 (or tenths, halves and quarters); and some draw jumps as arcs from a
starting dot, with a question such as "4 + 3 - 2 = ?" and a box where the
last jump lands. Higher levels run the lines through zero into the negative
numbers.

## How to play

- **Fill in the missing numbers.** Find two numbers next to each other to see
  how much each step adds. Then count along from any number you know, adding
  one step for every tick to the right and taking one away for every tick to
  the left.
- **Count by 5 (or 2, 10, 1/4...).** The same, but every step adds the
  amount in the question.
- **Jumps.** Start at the dot. Follow each arc: a + jump moves right, a - jump
  moves left, by the amount written on it. Write the number where the last
  arrow lands in the box. Some ticks have no number: count the ticks from the
  nearest number you know.
- Numbers to the left of zero are negative: they get smaller as you move left,
  so -5 is less than -2.

## Purpose

The number line is the picture behind counting, addition and subtraction,
negative numbers and decimals. Jumps make "adding means moving right" visible,
and filling gaps builds the skip-counting fluency that times tables grow from.
One layout carries a child from counting to twenty up to adding and taking
away tenths and quarters across zero.

## History

The number line as a teaching picture goes back at least to John Wallis in
the seventeenth century, who used it to explain negative numbers; "empty"
number lines with jumps became a fixture of primary arithmetic teaching from
the 1990s, notably through the Dutch realistic mathematics tradition.

## This implementation

- **Spec knobs:** `difficulty`; `tasks` (`auto`, or only `missing`, `skip` or
  `jumps`); `rows` (3-8); page `width` and `height`; `line`.
- **Generation:** Kids counts by ones between 0 and 20 with single forward
  jumps. Easy adds counting by 2s and jumps back. Medium counts by 1s, 2s, 5s
  and 10s up to 200 with two jumps, numbering only the round ticks on jump
  rows. Hard starts every line below zero and makes jumps cross it. Expert
  counts in tenths, fifths, halves and quarters with two or three jumps, on
  lines that may be negative. Missing-number rows hide 35 to 60 percent of
  the ticks but always keep two neighbours visible, so the step can be read.
  No line repeats on a page. Rows are taller when they carry arcs; if the
  arcs of the requested rows cannot all fit, the page keeps fewer rows (never
  fewer than three) and reports the count in its metadata.
- **Solving:** every value is an exact whole count of the line's unit (one,
  a half, a quarter or a tenth), so answers never pass through floating
  point; decimals and fractions are formatted from those counts. The key
  writes every missing number and landing point in red.
- **Guarantees:** deterministic per seed. The tests read every printed number
  back as an exact fraction and check that the ticks step evenly and that the
  start plus each printed jump equals the printed answer. Label placement is
  computed as boxes shared by the renderer and the tests, which check that no
  two labels, answer boxes, jump labels or prompts overlap, that no arc runs
  through another jump's label, and that neighbouring tick labels keep a
  clear gap. Difficulty is set by the number range and step
  (`rating_basis: number_range_and_step`).
