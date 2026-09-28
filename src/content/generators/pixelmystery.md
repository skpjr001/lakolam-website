---
title: "Pixel Mystery"
blurb: "Pixel mystery picture - colour squares by number, letter or maths fact to reveal pixel art"
category: puzzle
version: "1.0.0"
---
Colour every square by its code and a hidden pixel picture appears.

## What it is

A grid where every square carries a code: a number, a letter, or a small
maths fact such as 7 + 5 or 36 divided by 4. A key at the bottom of the page
matches each code to one colour. Colour the squares and a picture appears, square by
square: a cat, a rocket, a strawberry, a snowman. The picture stays a mystery
until enough of the grid is coloured to recognise it.

## How to play

Look at the key: each code has its own colour. Pick a square, read its code
and colour it in with the matching colour. When a square shows a sum, work
it out first; the answer is the code. Squares with the same code always get
the same colour, so it is often quickest to do one colour at a time: find
every square with that code and colour them all. Carry on until the whole
grid is coloured and see what the picture is. The white squares can be left
as they are.

## Purpose

A favourite of classrooms and activity books because it hides practice
inside a reward: children happily do a page of number bonds or times tables
to find out what the picture is. The younger bands are pure colour matching
and number recognition, good for fine motor skills and following a key; the
older bands turn every square into a maths fact, and a wrong answer shows up
as a stray colour in the picture, so children check their own work.

## History

Colouring by numbers goes back to the paint-by-number kits of the 1950s, and
teachers have long turned it into maths practice: "colour by sum" and "colour
by times table" sheets are a staple of primary classrooms. The square-grid
form, often sold as *mystery pixel art* or *mystery grid* pictures, borrows
the look of early video game sprites, where a picture is nothing but a grid
of coloured squares.

## This implementation

- **Spec knobs:** `motif` (28 hand-drawn pictures, or `auto`), `difficulty`,
  `codes` (`auto`, `numbers`, `letters`, `add_subtract`, `mixed`,
  `multiply_divide`), `mirror` (`auto` is a seeded coin flip), `size` (grid
  side 12–32; 0 picks from the difficulty), `cell` (0 fits a letter page),
  `line`.
- **Generation:** a vendored library of 28 small pixel-art sprites (animals,
  fruit, vehicles, a robot, a snowman...), each a few rows of colour letters
  over a background colour. The picture is chosen (seeded, from those whose
  colour count suits the difficulty), optionally mirrored, scaled up by the
  largest whole factor that fits the target size, and centred on background
  squares. Each colour gets a distinct seeded code; each square gets a
  seeded clue whose value is its code.
- **Difficulty:** by age, via code style, colour count and grid size.
  Kids: plain numbers, 2–4 colours, 12×12 with big squares. Easy: numbers,
  3–5 colours, 14×14. Medium: addition and subtraction within 30, 4–6
  colours, 16×16. Hard: addition, subtraction and times tables, 5–7 colours,
  24×24. Expert: times tables and division (dividends under 100), 6+
  colours, 24×24. Recorded as `rating_basis: code_style_and_colour_count`.
- **Solving:** nothing to deduce: each square's colour is read from the key.
  The answer key is the coloured picture.
- **Guarantees:** deterministic per seed. Every code names exactly one colour
  and every colour exactly one code; every maths fact evaluates exactly to
  its square's code (no remainders, no negatives); every key line is used;
  and colouring by the key reproduces the sprite placement square for square.
  Checked before a page is emitted and re-checked in the tests by
  recolouring every grid from its clues alone.
