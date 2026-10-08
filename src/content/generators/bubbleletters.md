---
title: "Bubble letters"
blurb: "Bubble letters — quote colouring pages, radial name designs, bulletin-board letters and name plates in hollow rounded lettering"
category: design
version: "1.0.0"
---
Big, round, hollow letters to colour: word-art quotes, radial name designs,
giant display letters and desk name plates.

## What it is

Words drawn in fat, rounded outline letters, the kind people doodle in the
margins of notebooks. There are four kinds of page:

- **Quote.** A short, cheerful saying ("BE KIND", "DREAM BIG", or your own
  words) in bubble letters filling a framed page. Each letter is cut into
  bands or scattered with little circles, stars, hearts or diamonds to
  colour, and outlines ripple round the words like rings in water.
- **Radial name design.** A name written along a fold line, mirrored, then
  turned four times, so it becomes a symmetrical pattern inside a circle.
  It is the classic first-day art-class project.
- **Display letter.** One giant letter on each page, to colour, cut out and
  pin to a classroom board. Print one page per letter of the word.
- **Name plates.** Up to four desk or cubby name plates on a page.

Pages come as black outlines to colour, or with the letters already filled in
soft colours.

## How to use it

1. Print at 100 % on plain paper or card.
2. Colour the letters, the bands or little shapes inside them, and the
   rings around the words. Neighbouring areas look best in different
   colours.
3. For a radial name design, colour matching areas the same so the
   pattern's symmetry shows, or use a different colour on each ring.
4. For display letters, print one page for each letter of your word, colour
   them, cut round each letter's thick outline and pin them up in order.
5. For name plates, colour, cut along the outer line, and fold or tape the
   plate to a desk. Card lasts longest.

## Purpose

Lettering is one of the most popular things to colour: quote colouring books
regularly top the bestseller lists, and teachers use radial name designs,
display letters and name plates every school year. The hard part is
geometry. The outline of a fat letter is not the letter's lines moved
outward, because strokes overlap, cross and leave small gaps. Here each
outline is traced from the distance to the letter's strokes, so strokes
merge cleanly, and every space left to colour is checked to be big enough
for a pencil.

## History

Rounded "bubble" letters grew out of New York graffiti in the early 1970s,
where writers such as Phase 2 developed the soft, puffy "softies" style. The
style spread through album covers, cartoons and school notebooks. Radial
symmetry designs are a staple of school art lessons, building on mandalas and
kaleidoscope patterns. Classroom display lettering has been cut from card for
as long as there have been notice boards.

## This implementation

- **Spec knobs:** `mode` (`quote`, `radial`, `bulletin`, `nameplate`);
  `text` (empty picks a friendly saying, word or names from the seed;
  commas separate name plates); `fill` (`patterns`, `plain`); `echoes`
  (0–6, quote and radial); `puff` (letter fatness, 0.6–1.6); `look`
  (`outline`, `colour`); `index` (which letter a display page shows);
  `page`, `landscape`; `margin` (inches).
- **Generation:** each letter's centrelines come from the stroke font. The
  distance to the nearest centreline segment is sampled on a fine grid (a
  ninth of the bubble radius). The letter's outline is the marching-squares
  level line at the bubble radius, and the echoes are further level lines of
  the same field, so outlines and echoes never cross. Loops too small to
  colour (under 1.6 × the minimum area) are dropped, so a tiny counter
  becomes part of its letter. Quotes are broken into balanced lines at the
  largest size that fits. Patterns are either bands cut across straight
  stretches of stroke, away from joins, or a hex lattice of little shapes
  placed only where the shape and a 1.6 mm clearance lie inside the letter
  (the distance field gives that disc directly). For a radial design, the
  name is stretched along a wedge of about 39° with its baseline on the fold line,
  and the field is sampled through the fold (x, y) → (|x|, |y|), then swapped
  so y ≤ x. That fold is exact in floating point, so the design has exact
  four-fold mirror symmetry. Names are cut to 8 letters there and other text
  to 48 characters; dropped characters are listed in the meta.
- **Solving:** nothing to solve.
- **Guarantees:** `regions_checked`. The finished page is reduced to its ink
  (strokes black, colour fills dropped), rasterised at 0.2 mm a pixel, and
  every enclosed white region is found by flood fill and measured. Each is
  at least 40 mm² at 100 % print. To get there, bands, shapes and echo
  levels that pinch off a smaller region are removed one at a time (nearest
  first). Any sliver still left between two outlines, usually where letters
  nearly touch in a radial design, is inked solid, as colouring books do.
  The number inked is reported as `slivers_inked`. Radial designs also carry
  `symmetry_checked`: every traced outline point, turned a quarter turn or
  mirrored, lands on another to within 0.001 pt.
