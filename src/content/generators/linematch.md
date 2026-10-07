---
title: "Draw a Line"
blurb: "Draw-a-line matching — pictures to pictures, groups to numbers, letters to pictures, halves to halves"
category: puzzle
version: "1.0.0"
---
Two columns of pictures. Draw a line from each one on the left to its
partner on the right.

## What it is

The classic preschool matching page. Pictures, letters or numbers sit in
two columns, and every item on the left has exactly one partner on the
right, in a different order. There are four kinds of page:

- **Same picture** - match each picture to its twin.
- **Count and match** - count a group of pictures and match it to its
  number.
- **First letter** - match each capital letter to the picture whose name
  starts with it.
- **Halves** - match the left half of each picture to its right half.

## How to play

Look at the first thing on the left. Find its partner on the right, then
draw a line from the dot beside it to the dot beside its partner. Do the
same for every row. Each thing on the right is used exactly once, and no
partner is ever straight across - you always have to look up or down.

- On **count and match** pages, touch each picture as you count it.
- On **first letter** pages, say the picture's name out loud and listen to
  its first sound.
- On **halves** pages, imagine the two halves pushed together into one
  picture.

## Purpose

Drawing a line from one dot to another trains pencil control and the
left-to-right sweep used in reading. Matching itself trains visual
discrimination (same pictures and halves), one-to-one counting and the
link between a quantity and its numeral (count and match), and the
beginning sounds of words (first letter). Pages suit ages three to six.

## History

Matching exercises go back to the kindergarten "gifts" and occupations of
Friedrich Froebel in the nineteenth century and to the sensorial materials
of Maria Montessori, whose pairing tasks began with identical objects.
Printed "draw a line to match" pages became a staple of reading-readiness
workbooks in the mid-twentieth century and are now among the most common
preschool and kindergarten worksheets.

## This implementation

- **Spec knobs:** `mode` (same, count, initial, halves), `difficulty`
  (pairs: Kids 3, Easy 4, Medium 5, Hard 6, Expert 7; counting pages count
  up to 3, 5, 6, 8 and 10), `colour`, `width`, `height`.
- **Generation:** pictures come from the shared icon set (plain shapes are
  left out except on same-picture pages). Same-picture and halves pages
  take pictures from a shuffled pool one at a time, keeping each only if it
  is clearly different on pixels from every one kept (for halves, each half
  from every other half on the same side). Counting pages choose different
  counts that always include the level's top count. First-letter pages keep
  a picture only if its first letter is new and none of the other names a
  child might use for it (bunny for rabbit, mug for cup, padlock for lock,
  and so on) starts with a letter on the page. The right column is a random
  derangement of the left.
- **Solving:** each item has exactly one partner.
- **Guarantees:** checked for every page and in tests (`answers_checked:
  true`, `unique: true`): the matching is one to one; no item sits level
  with its partner; same pictures are pairwise distinct (raster similarity
  below the icon library's 0.8 line, re-checked in tests with the library's
  own verdict); halves are pairwise distinct on each side; counts are all
  different; each letter is the first letter of its picture's name and no
  listed other name of a picture starts with another letter on the page.
  The page is rated by its pairs and, for counting pages, its largest count
  (`rating_basis: pairs_and_largest_count`), and every level is reached as
  asked. The font has capitals only, so letter pages use capital letters.
  The key draws every line.
