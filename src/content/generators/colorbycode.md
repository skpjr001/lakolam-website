---
title: "Colour by Code"
blurb: "Colour by code — number, letter or maths-fact codes in the closed spaces of a mandala, stained glass, tiling or other design, with the coloured picture as the key"
category: design
version: "1.0.0"
---
A design full of numbered spaces and a colour legend. Colour each space by
its code, or by the answer to its sum, and the picture appears.

## What it is

A mandala, stained-glass window, tiling or other pattern with a code printed
in each space. The code is a colour number, a letter, or a maths fact such as
7+5 or 6×4. The legend at the bottom pairs each number, letter or answer with
one colour, by swatch and by name. Spaces too small to hold a code stay
white. The answer page shows the whole picture coloured in.

## How to use it

Find a code, look it up in the legend, and colour the whole space with that
colour. For maths codes, work out the answer first; the answer is what the
legend lists. Every code gives exactly one colour. Spaces that touch never
share a colour, so if two touching spaces seem to need the same crayon,
check your sums again. Leave spaces with no code white. Work one colour at a
time and the design fills fast.

## Purpose

Colour-by-number for adults is one of the best-selling colouring formats.
Colour by code with sums, differences, products or letters is a classroom
staple, because it practises a skill and checks itself. This generator turns
the catalogue's designs into both. Lakolam's other colour-by-number pages are
grid-based; this one colours the real closed spaces of a drawn design.

## History

Paint-by-number kits were launched in 1950 by Dan Robbins and Max Klein's
Palmer Paint Company and sold millions within a few years. Classroom "colour
by code" worksheets, where an answer chooses the colour, followed as a way to
make arithmetic practice self-checking.

## This implementation

- **Spec knobs:** `source` (auto, mandala, stained glass, voronoi,
  isohedral, tessellation, apollonian; `auto` lets the seed choose),
  `code` (number, letter, addition, subtraction, multiplication), `colours`
  (2–12; 0 = from the difficulty: Kids 4, Easy 5, Medium 6, Hard 8,
  Expert 10), `difficulty` (smallest code size 9, 8, 7, 6 and 5.5 pt, sums
  to 10, 20, 50, 100 and 200, times tables to 5, 5, 10, 12 and 12).
- **Generation:** the source design (through the catalogue registry, so it
  also works in a split web engine) is reduced to black line art. Light fills
  become paper with their edge kept as a line; dark fills stay ink. It is
  rasterised (1000 px on its long side, hairlines thickened so they cannot
  leak), and every connected patch of paper is a space. A large patch around
  the design that touches the border is background. A chamfer distance map
  finds each space's largest inscribed circle, and a space gets a code only
  if the widest code of the mode fits there at the level's smallest size.
  Coded spaces are coloured with DSatur plus backtracking so that neighbours
  (spaces meeting across a line) differ, balancing how often each colour is
  used. Each colour gets a distinct answer, and each space gets a seeded fact
  with that answer. For the key, the space map is grown over the lines,
  traced back to vector outlines (Douglas–Peucker, 0.7 px) and filled under
  the line art.
- **Verification:** `obeys()` re-reads every printed code independently
  (parsing the fact and doing the sum). It checks that the answer names
  exactly one legend entry and that it is the space's colour, that no space
  has two codes, that each code sits inside its own space on the region map,
  that every legend colour is used, that answers are distinct, and that coded
  neighbours differ. Meta records the space counts (`regions`,
  `coded_regions`, `uncoded_small_regions`) and, if the colour count had to
  change (fewer spaces than colours, or neighbours that needed one more),
  `requested_colours`. A design seed with fewer than 8 roomy spaces is
  replaced by another (with `auto`, possibly another design). Deterministic
  per seed.
- **Where it lives:** in `lako-catalog`, beside spot the difference, because
  it uses other generators' designs.
