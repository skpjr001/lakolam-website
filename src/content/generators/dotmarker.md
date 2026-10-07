---
title: "Dot Markers"
blurb: "Dot-marker pages — big non-touching dots to stamp along giant letters and numbers, inside pictures, or on every copy of one picture"
category: puzzle
version: "1.1.0"
---
Big round dots to stamp with a dot marker: along giant letters and numbers,
inside pictures, or on every apple on the page.

## What it is

A dot-marker (dauber) page for toddlers and preschoolers. Large circles,
about the size of a bingo dauber's tip, sit on a giant capital letter or
digit, inside a big outline picture, or on a page of small pictures where
only one kind is to be dotted. The dots never touch each other, so each one
is a clean target for a small hand.

## How to use it

Give the child a dot marker (or a crayon, a sticker or a finger dipped in
paint) and stamp one dot in each circle.

- **Letter and number pages:** follow the letter's shape from the top, dot
  by dot, and say its name. Some pages number the dots in writing order.
- **Picture pages:** fill every circle inside the picture, then colour the
  rest of it in.
- **Dot every one:** find every copy of the picture named at the top and
  dot it. Leave the others alone.

When the page is done, count the dots (or the pictures) together and write
the number on the line at the bottom.

## Purpose

Stamping a dot on a target trains hand-eye coordination and the whole-hand
grip that comes before holding a pencil, without asking a two-year-old to
draw a line. Letter and number pages introduce the shapes of capitals and
digits, and the counting line at the bottom turns each page into a small
counting exercise. "Dot every one" pages add visual discrimination. The
pages suit ages two to five.

## History

Bingo daubers, felt-tipped bottles of ink for marking bingo cards, became
common in bingo halls in the 1970s and 1980s. Preschool teachers adopted
them as a mess-free form of painting, and dot-marker sets for children
followed, with "Do-A-Dot" art sets appearing in the 1990s. Printable
dot-marker worksheets for letters, numbers and pictures are now among the
most common preschool activity pages.

## This implementation

- **Spec knobs:** `mode` (letter, number, picture, count), `character` (the
  letter A-Z or digit 0-9; anything else is chosen by the seed), `picture`
  (a picture by name for picture and count pages; unknown or empty is chosen
  by the seed), `dot_mm` (dot diameter at print size, 12-30 mm), `gap_mm`
  (clear space between dots, 1-10 mm), `numbered` (number the dots in
  order), `targets` (pictures to dot on a count page, 2-10), `colour`,
  `width`, `height`, `theme` (a seasonal picture pack — `halloween`,
  `christmas`, `easter`, `thanksgiving`, `birthday`, `valentines`,
  `festivals` — or `none` for the classic pictures; picture, count and
  companion pictures come from the pack first, classic ones only if no pack
  picture fits). `picture` also names any seasonal picture ("pumpkin").
- **Generation:** letter and number pages scale the built-in single-stroke
  capital or digit to fill the page, draw its strokes as a pale road a
  little wider than a dot, and space dots evenly along each stroke at no
  less than one diameter plus the gap; a dot that would crowd one already
  placed where strokes meet is dropped. Letter pages add a small picture
  whose name starts with the letter, where the picture set has one. Picture
  pages pack dots on a hexagonal lattice inside the picture's regions,
  keeping only dots clear of every line of the drawing, and try sixteen
  lattice offsets to keep the one holding the most dots; seeded pictures
  must hold at least eight. Count pages fill a grid of up to 5 x 6 cells
  with the target picture and two other pictures, each clearly different
  from the target and each other by the shared raster check, in shuffled
  places with a little jitter.
- **Solving:** nothing to solve; the key shows every dot filled in colour
  (or every target ringed) with the count.
- **Guarantees:** checked for every page and in tests (`answers_checked:
  true`): dot centres are at least one diameter plus the gap apart, every
  dot is at least `dot_mm` across at print size and lies wholly on the
  page; letter dots lie on the glyph's centre-line; picture dots lie inside
  the picture and clear of all its lines by the dot radius plus half the
  line (also re-checked on pixels for every picture in the set); count pages
  hold exactly the target number of target pictures, and the key's number
  is the number drawn. A picture asked for by name that is too thin for the
  requested dots (a lightning bolt, a banana) gets smaller dots, down to 12
  mm, until at least three fit; `requested_dot_mm` keeps the request. The
  font has capitals only, so there are no lowercase pages. The page has no
  difficulty levels; meta reports `kids` (`rating_basis:
  toddler_activity`).
