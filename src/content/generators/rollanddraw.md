---
title: "Roll and Draw"
blurb: "Roll and draw — roll a die or two and draw the part the table names: snowman, monster, robot, flower"
category: maths
version: "1.0.0"
---
Roll the dice, look up your number, and draw that part: a snowman, a
monster, a robot or a flower grows piece by piece.

## What it is

A drawing game for children with a key table at the top of the page and a
big empty box below. Each row of the table shows a dice roll and a part of
the picture: the head, the body, the eyes, the hat... Roll, find your roll
in the table, and draw that part in the box. When every part is drawn, the
picture is finished.

There are three ways to roll:

- **One die:** six parts, one for each face.
- **Two dice added:** roll two dice and add them up. Totals go from 2 to
  12; some parts are drawn for a run of totals, like "7, 8 or 9".
- **Two dice as a grid:** twelve parts in two columns. The first die picks
  the column (1, 2 or 3 on the left; 4, 5 or 6 on the right), the second
  die picks the row.

The answer page shows the finished picture in colour, as a model to copy
or compare.

## How to play

Play alone or take turns with friends, each with your own sheet. On your
turn, roll the dice and find the row for your roll. Draw that part in your
box and tick it off. If you have drawn that part already, your turn is
over. The first player to finish the whole picture wins, or simply keep
rolling until your picture is done.

Draw the parts any way you like: big, small, silly or neat. Each little
picture in the table shows where the part goes, with the rest of the
picture in light grey around it. Colour your picture in when it is
finished.

## Purpose

A favourite classroom and rainy-day activity that practises reading dice
and counting dots at a glance (one die), adding two small numbers (two
dice), and reading a table with rows and columns (the grid), while also
practising drawing and fine motor skills. With two dice added, children
soon notice that 7 comes up far more often than 2 or 12: a first taste of
chance. Grade notes: Kids (one die, six parts) suits ages 3-5 (preschool
and kindergarten); Easy (two dice added, eight parts) suits ages 5-6
(kindergarten and grade 1, addition within 12); Medium (two dice added,
eleven parts, every total its own part) suits ages 6-7 (grade 1); Hard (the
two-dice grid, twelve parts) suits ages 7 and up (grade 2).

## History

Roll-and-draw games are a long-standing classroom and party activity,
related to old dice drawing games such as "beetle" (also called "beetle
drive"), in which players race to draw or build an insect part by part
with each roll. Teachers adapted the idea to seasonal pictures, monsters
and robots, and printable roll-and-draw sheets have become a staple of
early-years classrooms.

## This implementation

- **Spec knobs:** `difficulty`; `picture` (`auto`, `snowman`, `monster`,
  `robot`, `flower`); `dice` (`auto`, `one`, `sum`, `pair`); `parts` (6-12;
  0 = from the difficulty; one die always has 6, two dice added 6-11, the
  grid 12; other values are served at the nearest and reported as
  `requested_parts`); `width`, `height` (Pt, default US letter), `line`.
- **Generation:** Kids: one die, six parts. Easy: two dice added, eight
  parts. Medium: two dice added, eleven parts. Hard: the grid, twelve
  parts. Expert is served as Hard. When `dice` or `parts` is set, the band
  is rated from them (one die Kids, two dice added with up to nine parts
  Easy, ten or eleven Medium, the grid Hard) and `requested_difficulty`
  reports any change. Each picture is our own vector art of twelve or
  thirteen parts in a 200 × 240 box; four core parts (for example the
  snowman's two snowballs, head and eyes) are always on the sheet and the
  rest are picked by the seed. With two dice added, the totals 2-12 are cut
  into runs at random, and the core parts take the likeliest runs (the
  base on the run holding 7) so the picture can get going; every other
  assignment is shuffled.
- **Solving:** nothing to solve; the answer page draws every part on the
  sheet, in colour, as the model picture, and colours the table icons.
- **Guarantees:** deterministic per seed. The table is complete
  (`key_complete`): every face of the dice (1-6, totals 2-12, or the twelve
  grid cells) appears in exactly one row, every row names a different part,
  and the core parts are always present. The tests check it independently
  by rolling every ordered outcome of the dice (6 or 36) and looking it up
  as a child would: each roll finds exactly one row and every row can come
  up; every part fits the picture box, and the model picture draws every
  part in the table (`answers_checked`). Rating basis: the dice and the
  number of parts. Category: maths, because the page is a dice activity in
  counting and adding (it sits with the other early-years maths pages).
