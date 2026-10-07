---
title: "Cut and Paste"
blurb: "Cut and paste — cut out the pieces at the bottom and glue each into its one box: sort, count, order by size or rebuild a picture"
category: puzzle
version: "1.1.0"
---
Cut out the squares at the bottom of the page and glue each one into its
place.

## What it is

A scissor-skills activity page. A strip of squares, each inside a dashed
cutting line, sits at the bottom of the page; the boxes above take them.
There are four kinds of page:

- **Cut and sort** - glue each picture into its group: animals, things,
  nature or shapes.
- **Cut and count** - count the pictures in each box and glue in the
  matching number.
- **Small to big** - glue one picture's sizes in order, smallest first.
- **Build the picture** - a picture cut into squares; glue them back
  together.

Every square has exactly one right place.

## How to play

1. Cut along the dashed lines around each square at the bottom of the page.
   Take your time and turn the paper, not the scissors.
2. Look at each square and decide where it belongs:
   - on **sort** pages, which group the picture is in;
   - on **count** pages, which box has that many pictures;
   - on **size** pages, how big it is next to the others;
   - on **picture** pages, which part of the picture it shows. Easy pages
     have a faint picture to follow; harder ones only a small copy to look
     at, or none at all.
3. Lay all the squares in place first, then glue them down.

## Purpose

Cutting along a line builds the hand strength and two-handed coordination
that writing needs later. The paste half of the page turns that practice
into thinking: classifying, one-to-one counting, ordering by size
(seriation) or spatial reasoning with a picture puzzle. Pages suit ages
three to six.

## History

Cutting and pasting were among Friedrich Froebel's kindergarten
"occupations" in the nineteenth century, alongside paper folding and
weaving. Montessori classrooms added sorting and seriation materials, and
by the mid-twentieth century cut-and-paste worksheets were a fixture of
kindergarten workbooks. They remain one of the most popular activity books
for preschoolers.

## This implementation

- **Spec knobs:** `mode` (sort, count, size, picture), `difficulty` (sort:
  2 groups of 2, 2 of 3, 3 of 2, 3 of 3, 4 of 2; count: counts up to 3, 5,
  6, 8 and 10 in 3 to 6 boxes; size: 3 to 7 sizes; picture: 2 x 2 with a
  faint guide, 2 x 2, 3 x 3 with a guide, 3 x 3, and 3 x 3 with no copy to
  follow), `colour`, `width`, `height`, `theme` (a seasonal picture pack —
  `halloween`, `christmas`, `easter`, `thanksgiving`, `birthday`,
  `valentines`, `festivals` — or `none` for the classic pictures; pictures
  come from the pack first, sort pages choose the groups the pack can fill,
  and classic pictures top up a group the pack cannot, reported as
  `theme_pictures`).
- **Generation:** pictures come from the shared icon set. Sort pages take
  pictures from the icon set's own families, leaving out the ones a child
  could reasonably put in two groups (moon, star, drop, heart, sun, beach
  ball, gem). Count pages choose different counts that always include the
  level's top count. Size pages scale one picture in geometric steps from
  30 % to 95 % of the square. Picture pages draw a picture slightly larger
  than the board so its corners carry picture too, and take the first
  picture (in seeded order) whose squares are all inked and all clearly
  different. Pieces and slots are always the same size, and the strip is
  shuffled.
- **Solving:** each piece has exactly one box it fits.
- **Guarantees:** checked for every page and in tests (`answers_checked:
  true`, `unique: true`): every piece fits exactly one box, and each box
  takes exactly as many pieces as fit it, so the assignment is forced;
  counts are all different; consecutive sizes differ by at least a fifth;
  picture squares each carry at least 4 % ink and are pairwise distinct on
  pixels (similarity below the icon library's 0.8 line), so no two squares
  can swap. Every level is reached as asked; the page is rated by its mode's
  structure (`rating_basis: mode_structure`). The key shows every piece
  glued in place.
