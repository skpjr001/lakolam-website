---
title: "Fold-up Desk Calendars"
blurb: "Fold-up desk calendars — dodecahedron, tent, pyramid and perpetual date cubes, every weekday and every net checked"
category: design
version: "1.0.0"
---
A whole year to cut, fold and glue: a dodecahedron with a month on every
face, a tent, a pyramid, or a pair of perpetual date cubes.

## What it is

A paper calendar that stands on a desk. The **dodecahedron** has twelve
pentagon faces, one month on each, and can be rolled to show the month you
need. The **tent** is a long triangular prism with six months on the front
and six on the back. The **pyramid** has three months on each of its four
slopes. The **date cubes** are the classic perpetual desk calendar: two
cubes that between them show every date from 01 to 31, and three long
blocks with four month names each, so the calendar never runs out.

## How to use it

Print the page on card (160–220 g/m² works well), or on paper glued to
thin card.

1. Cut round the outside along the solid lines, keeping the grey tabs.
2. Crease every dashed line, folding away from the printed side, so the
   calendar ends up on the outside. A ruler and an empty ballpoint pen make
   crisp creases.
3. Fold the shape up and glue each grey tab under the edge it meets. Glue a
   few tabs at a time and let them grip; the last faces close like a lid.

The dodecahedron, tent and pyramid each start at the month printed in the
title and run for twelve months, so an academic-year calendar can start in
September.

**Date cubes:** set the two cubes side by side to show the date. One cube
has 0 1 2 3 4 5 and the other 0 1 2 6 7 8. There is no 9: turn the 6 upside
down. Each month block has four months; turn the block to the month you need
and stand it in front of the cubes.

## Purpose

Desk calendars are made new every year, as gifts, classroom projects and
handouts. The dodecahedron calendar is a favourite in maths classrooms: twelve
faces for twelve months makes a neat use of a Platonic solid, and building
one practises careful cutting, scoring and folding. The date cubes are a
small puzzle in themselves: two cubes have only twelve faces, but 0, 1 and 2
must be on both, so the 6 has to double as a 9.

## History

Paper polyhedra go back to Albrecht Dürer, who printed nets of solids to cut
out in 1525. The dodecahedron calendar is a much newer idea: with twelve
faces for twelve months it became a favourite printable, and maths teachers
and websites publish a fresh one every year. Two-cube date calendars have
been sold as desk ornaments for decades, and how two cubes can show every
date is a well-known recreational puzzle.

## This implementation

- **Spec knobs:** `kind` (`dodecahedron`, `tent`, `pyramid`,
  `date_cubes`); `year` (1583–9999, the Gregorian calendar; never taken
  from the clock); `first_month` (1–12; the calendar runs twelve months on
  into the next year); `week_start` (`sunday`, `monday`); `look` (`colour`,
  `outline`); `page`; `margin` (inches, 0.1–1). Date cubes are perpetual and
  ignore `year`, `first_month` and `week_start`. Out-of-range values are
  clamped and recorded as `requested_*` (a calendar starting after January
  9999 starts in January instead).
- **Generation:** the solids are built as convex hulls of their corners.
  Their nets come from a search over spanning trees of the faces —
  breadth- and depth-first from every face, "two flowers" for the
  dodecahedron, and a fixed set of random trees — keeping the net with no
  overlapping faces, a glue tab on one side of every seam that overlaps
  nothing, and the largest size on the page, squared to an edge of the
  largest face. Each face's reading direction is the way it rises when the
  solid stands on its base. Month grids are laid out with Zeller's
  congruence and fitted inside their faces at one common size. Date cubes
  and month blocks are packed onto the page at a common scale. The seed
  picks the colours and the corner ornaments on the pentagons.
- **Solving:** nothing to solve.
- **Guarantees:** `calendar_checked`. Every printed date sits under the
  weekday found by counting days from Thursday 1 January 1970, independent
  of Zeller's congruence (the tests compare both with Gauss's formula too);
  every month prints each of its dates once, the twelve months run in order
  from the first month and each is on exactly one face, and every month
  grid lies inside its face. Every net is folded back up in 3D, hinge by
  hinge, and must close into its solid — every edge met by exactly one
  other, convex, Euler characteristic 2 and the solid's own volume — with
  exactly one glue tab per seam and no tab overlapping anything. For the
  date cubes, every date 01–31 is shown by trying both cubes in both orders
  with the 6 turned to a 9, the six digits on each cube differ, and each
  month is on exactly one block face. `date_font_pt` reports the size of
  the dates: at least 6 pt on a Letter page (5.5 pt on the pyramid, whose
  triangles waste their tips); smaller pages shrink it.
