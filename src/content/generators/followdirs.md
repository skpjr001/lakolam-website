---
title: "Follow the Directions"
blurb: "Following directions — colour the 3rd balloon red, circle the last fish, draw an X on the cat above the sun; every instruction proven to pick exactly one picture"
category: puzzle
version: "1.0.0"
---
Colour the 3rd balloon red. Circle the last fish. Draw an X on the cat above
the sun.

## What it is

A listening-and-doing page for young children. Rows of pictures and a grid
of pictures each come with short numbered instructions. Every instruction
points at exactly one picture and says what to do to it: colour it in a
named colour, circle it, draw an X on it, draw a line under it or draw a box
around it. The instructions use counting words (first, last, 3rd, 2nd from
the right) and position words (just after, just before, between, above,
below, next to, in the top row).

## How to play

Read each instruction out loud, or listen while a grown-up reads it. Find
the one picture it means, then do what it says.

- In the rows, count from the left, the way you read, unless the
  instruction says "from the right". The arrow at the start of each row
  shows where to begin.
- "The 3rd fish" means count only the fish. "Just after the cat" means
  the picture right after a cat, to its right.
- In the grid, rows are counted from the top. "Above" and "below" mean in
  the same column, straight up or down. "Next to" means beside it in the
  same row.
- The little dot or mark before each instruction shows the colour or the
  pencil mark to use.

Every instruction means just one picture, and no picture is used twice.

## Purpose

Following spoken directions with two or three parts is an early-years
listening goal (speaking and listening standards such as SL.K.2), and the
same pages teach ordinal numbers (first, second, third), position words,
left-to-right tracking, and colour words. Speech and occupational
therapists use them for auditory memory and sequencing. Pages suit ages
three to seven.

## History

"Listen and do" exercises are as old as the kindergarten: Froebel's
occupations and Montessori's command cards asked children to carry out
short instructions. Printed ordinal-colouring and following-directions
sheets ("colour the third apple red") became a staple of
reading-readiness and early maths workbooks in the twentieth century and
are still among the most used kindergarten worksheets.

## This implementation

- **Spec knobs:** `task` (`mixed` - rows then a grid - or `rows`, `grid`),
  `difficulty`, `marks` (`mixed` colours and pencil marks, `colour` only,
  or `pencil` only for black-and-white printing), `instructions` (2-10; 0
  uses the level's own 4, 6, 6, 7, 8; clamps and counts the layout could
  not fit are reported as `requested_instructions`), `hints` (a colour dot
  or tiny pencil mark before each instruction, for children who cannot read
  yet), `theme` (a seasonal picture pack or `none`), `width`, `height`
  (clamped, reported as `requested_width`/`requested_height`).
- **Generation:** each row or grid is filled at random from pictures that
  are clearly different drawings (raster comparison) and whose names never
  overlap (no "bird" beside an owl, no "star" beside a sun or snowflake).
  Every possible instruction for the layout is listed and evaluated; the
  ones that pick exactly one picture under every reading are kept, and the
  page takes the hardest at its band first, then varied others with
  different targets. Layouts are re-rolled until the band and the count
  are met.
- **Solving:** an instruction is evaluated under every reasonable reading:
  "the 3rd fish" also as "the 3rd picture, a fish"; "just after the cat"
  also as "any fish after a cat"; "between the cat and the dog" also as
  "anywhere between them"; "above the sun" also as "anywhere above it in
  the column"; "next to" also with diagonal neighbours; "the 2nd row" also
  counted from the bottom; "the 2nd fish after the cat" also as "the 2nd
  picture after it". It is used only if every reading finds the same one
  picture.
- **Difficulty:** the hardest instruction on the page (`rating_basis:
  hardest_instruction_kind`). Kids - counting along a row of one picture
  (rows of 5), the top or bottom row of a 2-row grid. Easy - counting one
  kind in a mixed row, the middle or 2nd row. Medium - just after, just
  before, above, below. Hard - counting from the right, between, next to.
  Expert - "the 2nd fish after the cat", "the 2nd cat in the top row".
  Every band is reached by every task.
- **Guarantees** (`answers_checked: true`, `unique: true`, re-checked in
  tests by an independent evaluator that collects every picture any reading
  could mean): each instruction means exactly one picture; no two
  instructions mark the same picture; pictures sharing a row or grid are
  pairwise distinct on pixels and in name. The answer key shows every
  picture coloured or marked.
