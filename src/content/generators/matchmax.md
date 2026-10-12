---
title: "Matchstick Numbers"
blurb: "Matchstick Numbers — move one to four matches to make the largest or smallest number"
category: maths
version: "1.0.0"
---
Move one, two, three or four matches to make the largest - or the smallest - number you can.

## What it is

A number laid out in matches, its digits in the seven-stroke shapes of a
digital clock. Move the number of matches the puzzle says, and the number
changes. Which is the largest number you can make? Or the smallest? The
best-known version starts from 508 with two matches to move: 999 is the
obvious answer, but 51181 beats it.

Every page prints its rules and a chart of the ten digit shapes, so there
is exactly one right answer: the best number the moves can make.

## How to play

- Move exactly the number of matches the puzzle says. A moved match must
  go to an empty place.
- When you have finished, every digit must be one of the ten shapes in the
  chart at the top of the page. The 6 and the 9 have their tails, and the
  7 has three matches.
- A number may not start with 0, and you may not turn the page or make any
  other symbol.
- The rules line on the page says how free you are:
  - **Every digit stays in its place**: the number keeps all its digits.
  - **You may build new digits**: matches can make a new digit at either
    end or in a gap, and a digit you take every match from simply
    disappears.
  - **Two upright matches read as 1**: as above, and two matches standing
    one above the other on either side of a place read as 1 - so a 0
    without its top and bottom reads as 11.
- Write the best number you can find on the line underneath.

More digits beat bigger digits when you want a large number, so look for
two matches that can stand up as a new 1. For a small number, look for
digits you can take apart completely.

## Purpose

Lateral thinking with a firm footing: picturing digit shapes, counting
matches, and searching carefully instead of stopping at the first good
idea. The jump from 999 to 51181 is a memorable lesson in checking every
possibility. Good for warm-ups, brain-training books and classroom
challenges.

## History

Matchstick puzzles were popular parlour amusements in the nineteenth and
early twentieth centuries, and puzzle writers such as Sam Loyd and Henry
Dudeney set many. Numbers in seven-stroke digits followed digital clocks
and calculators. The "move two matches in 508 to make the largest number"
puzzle spread widely online in the 2020s; mathematician Tanya Khovanova
wrote in 2023 about how her students beat the official answer, 51181,
using small raised digits, turned pages and other tricks. Those tricks
are why this version prints its rules and leaves them out.

## This implementation

**Spec knobs:** `moves` (`one`, `two`, `three`, `four`, or `mixed`, which
cycles them and labels each puzzle); `goal` (`largest`, `smallest`, or
`mixed`, alternating and labelled); `rules` (`strict`, `new_digits`,
`classic` - the default, the rules of the viral 508 puzzle); `difficulty`;
`count` (1-8 puzzles, one per row); page `width`/`height`; `line`.

**Generation:** a start number of the band's length is drawn at random -
Kids two digits, Easy two or three, Medium three, Hard three or four,
Expert four - with no leading 0, solved, and kept only when the moves can
beat it (a larger number for `largest`, a smaller one for `smallest`). No
page repeats a start or an answer. The band nearest the request is kept
within an attempt budget.

**Solving:** the number is a row of places - its digits, plus, under the
free rules, `moves / 2` empty places in every gap and at both ends (a new
digit needs at least two matches). Each place ends in some shape the rules
can read (a digit, empty, and for `classic` the left upright pair as 1 or
both pairs as 11); going from shape `m` to `t` lifts the matches in `m`
and not `t` and lays those in `t` and not `m`. A dynamic programme over
the places, keyed by matches lifted and laid (each at most `moves`),
collects every number exactly `moves` moves can make and the arrangements
that make it. The answer is the largest (or smallest) of them. Difficulty
is the count of different numbers the moves reach - the search a careful
solver makes: up to 4 Kids, 12 Easy, 40 Medium, 150 Hard, more Expert
(`rating_basis`: `numbers_reachable_by_the_moves`). One move rarely
reaches Hard; when a band is out of reach the nearest is printed, with
`requested_difficulty` in meta.

**Guarantees:** deterministic per seed; every answer is drawn by moving
exactly the puzzle's number of matches, reads as the answer under the
printed rules, beats the start, and is the best number the moves can make
- proven by the full search in the generator and re-proven in tests by an
independent brute force that tries every choice of matches to lift and
places to lay them (including the published answers 508 → 51181 and
38 → 781). The key draws the answer with the laid matches glowing and the
lifted ones outlined, and prints start → answer.
