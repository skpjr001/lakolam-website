---
title: "Ghost Leg"
blurb: "Ghost leg (amidakuji) ladder — draw the one missing rung that sends every animal to its own food, or follow the ladder down"
category: maze
version: "1.0.0"
---
A ladder of lines and rungs that sends everyone somewhere new — draw the one
rung that sends every animal to its own food.

## What it is

A row of vertical lines joined here and there by short horizontal rungs. Go
down any line and, whenever a rung meets it, cross over to the next line and
carry on down. Because of the way rungs work, every start always reaches a
different end.

On the main page one rung is missing: draw it in, in the one place that
sends every animal to its food. A "follow" page shows the whole ladder and
asks where each letter lands.

## How to play

- Start at the top of a line and go straight down.
- Whenever a rung touches your line, go along it to the next line, then
  keep going down. Never go up.
- **One rung missing:** draw one more rung between two neighbouring lines
  so that every animal ends at its own food (or every letter at the same
  letter). The new rung must not touch the end of another rung. There is
  only one place it can go — you may draw it a little higher or lower, as
  long as it does not pass the end of another rung.
- **Follow:** trace each letter down and write it in the box where it lands.

## Purpose

Following a rule step by step and thinking backwards. Tracing a line is
careful, patient work for young children; finding the missing rung means
working out where a path goes wrong and what single change fixes it, which
is real reasoning about cause and effect. It is also a gentle way into
permutations and swaps for older pupils.

## History

The ghost leg is the Japanese *amidakuji*, the Chinese *guijiaotu* and the
Korean *sadari tagi*: a ladder lottery for sharing out prizes or jobs fairly.
In Japan it goes back at least to the Muromachi period, when the lines were
drawn radiating like the halo of the Amida Buddha — hence the name. Its
property that every start reaches a different end, whatever rungs are added,
makes it a favourite in classrooms as a picture of a permutation built from
swaps of neighbours.

## This implementation

- **Spec knobs:** `difficulty` (Kids 4 lines and 3 rungs — 3 and 4 for a
  follow page; Easy 5 and 6; Medium 6 and 9; Hard 7 and 12; Expert 8 and
  16), `mode` (`one_rung`, `follow`), `theme` (`animals` — eight animal and
  food pairs — or `letters`), `lines` (0 = the level's; otherwise 3–8, at
  least 4 for one-rung), `rungs` (0 = the level's; otherwise 1–24),
  `colour`, `width`, `height`, `line`. Clamped requests are reported as
  `requested_<field>`; when no one-rung puzzle with the requested rung count
  is found, the nearest count that works is used and `requested_rungs` is
  reported.
- **Generation:** rungs sit on rows, no two sharing an end. A ladder is
  printed only if no two rungs in one gap cancel out (nothing touches their
  lines between them) and, with enough rungs, every gap has one. One-rung:
  a random ladder with one extra rung is made and that rung is hidden; a
  hill climb then moves the printed rungs about, keeping each move while the
  number of working places does not grow, until exactly one place works.
- **Solving:** a rung can slide up and down until it passes another rung's
  end on one of its two lines, so a *place* is a gap plus the stretch of
  height between such ends. Every place in every gap is tried, and the
  ladder is accepted only when exactly one sends every start to its target.
  Three lines are refused for one-rung puzzles: with three lines every
  rung touches the middle line and an added rung always has a twin place
  with the same effect.
- **Guarantees:** one-rung pages: exactly one place works (`unique: true`),
  re-proved in tests half-row by half-row with a second simulation (who
  stands where, swapped at each rung, rather than walking each line), and
  the printed ladder alone never works. Follow pages: every landing is
  checked by both simulations (`answers_checked: true`). Rated by lines and
  rungs, the average of the two bands (`rating_basis: lines_and_rungs`);
  every band is reached at its level. The key draws every trail in its own
  colour, with the missing rung in red.
