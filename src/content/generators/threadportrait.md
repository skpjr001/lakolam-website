---
title: "Thread Portrait"
blurb: "Thread portrait: a picture drawn by thousands of straight threads between pins on a circle or square, with a numbered pin template and the threading sequence"
category: design
version: "1.0.0"
---
A picture drawn by one long thread wound two thousand times across a ring of
pins — with the pin template and the exact winding order to make it yourself.

## What it is

A thread portrait (string-art portrait) is made from nothing but straight
lines. Pins stand round the edge of a round or square board, and a single
dark thread is wound from pin to pin, across and across, thousands of times.
Where many threads cross, the board goes dark; where few cross, it stays
pale — and from a step back a picture appears. This page works out the
whole winding for a picture of your choice (or a built-in one), draws the
finished piece, and adds a numbered pin template and the threading sequence.

## How to use it

To admire it, frame the first page as it is. To make it:

1. Print the pin template at full size and tape it to a board (plywood,
   MDF or thick foam board). Tap a small nail or pin in at every tick, then
   tear the paper away. The pins are numbered clockwise from the top.
2. Tie the thread to the pin named on the template ("start at pin …").
3. Follow the threading sequence: each number is the next pin. Take the
   thread straight across the board to that pin, round it once, and on to
   the next. Tick off each row as you finish it — a pencil line through the
   row number helps you keep your place.
4. Keep the thread taut but not tight. When the sequence ends, tie off.

A fine black sewing or embroidery thread works on a pale board; on the
black board, use white. The finished piece needs roughly as much thread as
the page says (in board widths): buy a little more.

## Purpose

A long, calm making project with a striking result, and a lesson in how
lines add up to tone — the same idea as hatching in drawing, done with
thread. It also shows a "greedy" algorithm at work: each thread simply takes
the darkest line still left.

## History

Curve stitching and string art on pins go back to Mary Everest Boole's
"curve stitching" for teaching geometry (late 19th century) and the string
art craze of the 1960s–70s. The picture-from-straight-threads method was
introduced by the Greek artist Petros Vrellis in 2016 ("A new way to knit"),
who wound portraits on a circular loom of 200 pins with a computer-chosen
sequence; makers have since published many variants of the greedy chord
search used here.

## This implementation

- **Spec knobs:** `image` (an uploaded PNG or JPEG; empty uses a built-in
  picture chosen by the seed), `frame` (circle, square), `pins` (150–300),
  `threads` (1500–4000), `skip` (pins this close are never joined, 1–60),
  `thread_width` (0.05–1 pt), `board` (birch, white, black, red), `width`,
  `height`, `margin`.
- **Generation:** the picture is cover-fitted into the frame and sampled on
  a 200 × 200 grid as darkness (inverted on the black board, where the light
  is wound). The residual starts at `d − (1 − d)`:
  pale cells owe negative darkness, so threads gather on the picture rather
  than veiling it. The winding starts at the darkest chord on the board,
  then from the current pin takes the unused chord, at least `skip` pins
  away, with the highest *mean* residual along its cells, subtracts the
  thread's coverage (`thread_width` over the cell size) from every cell it
  crosses, and moves on. Chord cell lists are computed once and cached.
  Ties go to the lowest pin number. Over-range knobs are clamped and
  recorded as `requested_<field>`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification:
  sequence_is_a_walk_between_pins`. Tested: the sequence is a walk — each
  thread starts where the last ended, every pin number is a real pin, no
  two consecutive pins are closer than `skip`, and no chord is used twice;
  the pins lie exactly on the frame; the total residual strictly falls with
  every thread and a longer winding extends a shorter one; every pin number
  of the sequence is printed on the sequence pages; a blank or unreadable
  picture is refused cleanly; an upload's page does not depend on the seed;
  all ink stays inside every page. Meta reports the threads wound, the share
  of the picture's darkness drawn and the thread length (in points and in
  frame widths).
