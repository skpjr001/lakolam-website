---
title: "Rhythm Grid"
blurb: "Rhythm grid paper — drum-machine step grids with instrument rows and heavier beat and bar lines"
category: paper
version: "1.0.0"
---
Drum-machine step grids — a row for each drum, a column for each step,
heavier lines on every beat and bar — for writing beats on paper.

## What it is

A rhythm grid writes a drum pattern the way a drum machine shows it. Time
runs left to right in equal steps; most often a bar of 4/4 is sixteen
steps, four to each beat, so each step is a sixteenth note. Each
instrument has its own row, high sounds at the top (cymbals and hi-hats)
and the kick drum at the bottom. A filled square means "play this sound on
this step".

Each page holds several grids. A heavier line marks every beat and a
heavier one again every bar, and alternate beats are lightly shaded so the
counting is easy to follow. Above each grid you can have the counting
syllables ("1 e + a 2 e + a …"), or plain step numbers. Rows can be named
from a drum kit (KICK, SNARE, CLOSED HAT …), with the two-letter codes
printed on drum machines (BD, SD, CH, OH …), numbered, or left blank.

## How to use it

Count the pattern out loud — "one e and a, two e and a" — and fill in a
square wherever a drum plays. A basic rock beat: kick on 1 and 3, snare on
2 and 4, and closed hi-hat on every "+" (eighth notes). Fill squares fully
for loud hits and draw a smaller dot for soft "ghost" notes.

For shuffles and swing, set three steps to the beat and count "1 + a".
For longer phrases use 32 steps (two bars) or put the same grid on two
lines. Copy your patterns into a drum machine or music software step by
step, or play them on a real kit.

## Purpose

For drummers, beat makers, music producers and music classes: planning
drum-machine and sampler patterns, transcribing grooves from records, and
teaching rhythm with something to see and count. The grid also suits any
other step sequence — bass lines, percussion ensembles, body percussion
and classroom rhythm games. In a book, these pages make a beat notebook.

## History

Programming rhythm in steps came with the drum machine. Early machines
played only preset rhythms; programmable step sequencing reached wide use
with Roland's CR-78 (1978) and TR-808 (1980), whose row of sixteen step
buttons, lit in four colour groups of four, made the sixteen-step bar a
standard. The TR-808 and its successor the TR-909 shaped hip-hop, electro
and house music, and printed books of drum-machine patterns used just this
grid. The syllables "1 e + a" are the counting long taught to drummers for
sixteenth notes.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `steps` across (4–64,
  default 16); `steps_per_beat` (1–8, default 4); `beats_per_bar` (1–12,
  default 4); `rows` (2–16, default 8); `labels` (none, kit, codes,
  numbers); `header` (none, steps, counts); `grids` per page (1–12,
  default 4); `shade` alternate beats; `ink` (default gray) and `weight`
  (0.1–2 pt, default 0.4; beat lines twice and bar lines and frames three
  times that).
- **Generation:** a name column as wide as the longest name sits at the
  left; the rest of the width is split into equal steps. Rows are as tall
  as the page allows with every grid on it, but never taller than a step is
  wide; if a grid's rows would fall below 4 mm, grids are dropped and
  `requested_grids` recorded. Grids are spread evenly down the page. A
  grid of n kit rows uses the n most common drums (kick, snare, closed
  hat, open hat, clap, toms, rim shot, crash, ride, cowbell, claves,
  maracas, tambourine, conga in that order), listed high sounds first.
  Count syllables: "e + a" for four steps a beat, "+" for two, "+ a" for
  three; other subdivisions show only the beat number.
- **Solving:** nothing to solve — a page to fill in. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** all steps in a grid are exactly equal (to 1e-9) and span
  it exactly; beat lines fall on every `steps_per_beat`-th line and bar
  lines on every `steps_per_beat × beats_per_bar`-th; rows are equal;
  grids never touch; and all ink — lines, shading, names and header —
  stays inside the margins, checked on every page size, orientation, label
  and header style. A knob outside its range is clamped and recorded as
  `requested_<field>`.
