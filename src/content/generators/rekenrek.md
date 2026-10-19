---
title: "Rekenrek"
blurb: "Rekenrek — 20- and 100-bead racks: read, shade, make ten and split into tens and ones"
category: maths
version: "1.0.0"
---
Bead racks for seeing numbers in fives and tens: read the beads, colour the
beads, make ten, and split numbers into tens and ones.

## What it is

A rekenrek (Dutch for "arithmetic rack") has rows of ten beads on wires:
five red beads, then five white. Beads pushed to the left are the number
shown; the rest wait on the right. The colours let children see five and
ten at a glance, so 7 is "five and two more" and 17 is "a full row and
seven".

The 20-bead rekenrek has two rows, for numbers to 20. The 100-bead
rekenrek has ten rows, one full row for each ten.

A page mixes four kinds of question:

- **Read** the beads and write the number.
- **Colour** the beads to show a number.
- **Make ten:** 8 + 5 on two rows; move 2 beads up to fill the top row, so
  8 + 5 is 10 + 3. On the 100 rack: fill up the row to the next ten, then
  add the rest (47 + 6 = 47 + 3 + 3 = 53).
- **Split** a number into ten and ones (13 = 10 + 3) or tens and ones
  (63 is 6 tens and 3 ones).

## How to play

**Reading.** Count only the beads on the left side of each wire. Use the
colours: five red beads are 5, a whole row is 10. On the 100 rack, count
full rows by tens (10, 20, 30 ...) and then the beads on the last row.

**Colouring.** Colour beads from the left end of each wire. Fill the top
row first (ten beads), then the next, until you have shown the number.

**Make ten.** On the two-row rack the first number is on the top row and
the second on the bottom row. How many beads would fill the top row? Move
them up in your head: now you have 10 and some more. Write the steps. On
the 100 rack, fill up the unfinished row to the next ten, then add what is
left.

**Split.** Count the full rows (the tens) and the beads on the last row
(the ones).

## Purpose

The rekenrek is a favourite of early-years and primary teachers because it
builds number sense on the 5-and-10 structure that later carries place
value and mental addition. Grade notes: Kids (numbers to 10, one row) suits
preschool and kindergarten (ages 4-6); Easy (numbers to 20, make ten,
teen numbers as ten and ones) suits kindergarten to grade 1 (ages 5-7,
year 1-2); Medium (the 100 rack, reading, colouring and tens and ones)
suits grade 1-2 (ages 6-8); Hard (adding by filling to the next ten) suits
grade 2 (ages 7-8, year 3).

## History

Bead frames for counting are very old, but the rekenrek as it is used in
schools was designed in the 1990s by Adri Treffers at the Freudenthal
Institute in the Netherlands, as part of Realistic Mathematics Education.
It spread to classrooms around the world under names such as the
arithmetic rack and the number rack, usually in its 20-bead and 100-bead
forms.

## This implementation

- **Spec knobs:** `difficulty`; `rack` (`auto`, `twenty`, `hundred`);
  `task` (`mixed`, `read`, `shade`, `make_ten`, `split`); `problems` (1-12
  on the 20 rack, 1-6 on the 100 rack; 0 = 8 or 4; more are clamped,
  `requested_problems`); `width`, `height` (Pt, default US letter), `line`.
- **Generation:** Kids uses the 20 rack with numbers 1-10 on the top row
  (read and colour). Easy uses the 20 rack with numbers 6-20; read
  questions may split a number across both rows in any way (6 on top and 7
  below is 13); make-ten pairs are 6-9 plus a number that crosses ten;
  splits are teen numbers. Medium uses the 100 rack with numbers 11-100
  read and coloured row by row, and splits of 21-99 (not whole tens). Hard
  adds filling to the next ten: a number ending in 4-9 plus a one-digit
  number that crosses the ten. Mixed pages take the band's kinds in turn;
  no question repeats on a page. Expert is served as Hard; the `twenty`
  rack serves Kids or Easy and the `hundred` rack Medium or Hard; a
  make-ten or split task on Kids is served as Easy, and make-ten on Medium
  as Hard (all reported as `requested_difficulty`).
- **Solving:** the answers are worked out from each question: the total of
  the beads read, the fill to the next ten and the rest, the sum, the tens
  and the ones. The answer page shows the rack after the move (make ten)
  or with the beads slid left (colouring) and writes every blank.
- **Guarantees:** deterministic per seed. The drawing reports every bead
  it places, and the tests read each rack back by finding the gap on each
  wire and counting the beads before it: the page shows the question's
  beads, the answer page its answer, for every band, rack and task. Every
  answer is recomputed independently with exact rationals (the next
  multiple of ten by floor division, the tens and ones by division), and
  the checks hold in the model's own definition too (`answers_checked`,
  `beads_read_back`). Rating basis: the rack, the number range and the
  kind of question.
