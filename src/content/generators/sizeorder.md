---
title: "Big and Small, Long and Short"
blurb: "Size order and measuring — number pictures from smallest to biggest, circle the longest, measure with cubes or paperclips"
category: maths
version: "1.0.0"
---
Put pictures in order of size, find the longest, and measure with cubes or
paperclips.

## What it is

An early measurement page with three kinds of row. In an **order** row, the
same picture appears at three to six sizes in a jumbled line, with a box
under each. In a **compare** row, a few pencils, crayons, worms and ribbons
lie on the page; which is the longest (or the shortest)? In a **measure**
row, an object lies on a line of cubes or paperclips, starting at the first
one: how many long is it? Harder pages bring the sizes closer together,
stop lining the objects up at the left, print a longer line of cubes than
the object needs, and ask how many cubes longer one thing is than another.

## How to play

- **Number them:** find the smallest picture and write 1 under it, then 2
  under the next smallest, and so on to the biggest. (Some rows ask for
  biggest first; read the instruction.)
- **Circle the longest (or shortest):** look at both ends of every object.
  On harder pages they do not start in the same place, so check where each
  one begins as well as where it ends.
- **Measure:** the object starts at the left edge of the first cube (or
  paperclip). Count the cubes from there to the end of the object and write
  the number in the box. Only whole cubes count, and the object always ends
  exactly at the edge of a cube.
- **How many longer:** measure both objects, write each length, then take
  the shorter from the longer.

## Purpose

Ordering by size (seriation) and measuring with everyday units are among
the first measurement ideas in school maths: comparing directly, then
counting equal units laid end to end with no gaps or overlaps. The page
matches kindergarten and first-grade goals such as ordering objects by
length and expressing a length as a whole number of units (Common Core
K.MD.2, 1.MD.1 and 1.MD.2; UK Year 1 measurement). Ordering also trains
careful comparison; "how many longer" connects measuring to subtraction.
The page suits ages four to seven.

## History

Seriation — arranging things in order of size — was studied by Jean Piaget,
who saw it as a landmark of children's reasoning about the age of six or
seven, and Maria Montessori built it into her pink tower and long rods.
Measuring with non-standard units (hand spans, paperclips, linking cubes)
before rulers became a standard step in primary maths teaching during the
twentieth century, because it shows why units must be equal and laid end to
end.

## This implementation

- **Spec knobs:** `difficulty` (Kids: three sizes at least 35 % apart,
  three objects lined up, measuring 2-5 units; Easy: four sizes 28 % apart,
  measuring up to 8; Medium: five sizes 22 % apart, either direction, four
  objects not lined up, a longer measuring strip, up to 10; Hard: six sizes
  18 % apart, "how many longer?" rows, up to 12; Expert: sizes 15 % apart,
  five objects, up to 15), `task` (mixed, order, compare, measure), `unit`
  (cubes, paperclips), `rows` (3-8), `colour`, `width`, `height`.
- **Generation:** an order row picks one picture and draws its sizes as a
  chain of steps, each at least the level's margin bigger than the last,
  then shuffles them (never leaving them already in order). A compare row
  puts the answer at one extreme and draws the others at least the margin
  away from it. A measure row draws a whole number of units — the first
  measure row on a page always from the level's top band, so the page asks
  what its level promises — and draws the object exactly that many units
  long from the left edge of the first unit.
- **Solving:** sort by size; compare ends; count units.
- **Guarantees:** `answers_checked: true`. Neighbouring sizes in an order
  row differ by at least the level's margin (15 % at the least); the
  longest or shortest object beats every other by that margin; every
  measured object's drawing spans exactly its whole number of units from
  the first unit's left edge (tests measure the drawn geometry of every
  object at every length). The page is rated by its hardest row: the
  number of pictures, the size margin, the direction, whether objects are
  lined up, the longest length measured, a strip longer than the object,
  and "how many longer" rows
  (`rating_basis: items_size_margin_alignment_and_measured_length`).
