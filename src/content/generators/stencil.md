---
title: "Stencils"
blurb: "Stencils — allover wall stencils (Moroccan trellis, ogee, quatrefoil, honeycomb) with registration holes, and bridged lettering; the sheet is proven to stay one piece"
category: design
version: "1.0.0"
---
Wall stencils that step seamlessly across a room, and lettering stencils
whose letters keep their middles. Every sheet is checked to stay in one piece.

## What it is

A cutting template for a single-layer stencil. There are two kinds:

- **Allover patterns** cover a wall: a Moroccan lantern trellis, an ogee
  of crossing waves, kissing quatrefoils, or a bowed honeycomb.
  Registration holes along the top and left show where to move the stencil
  next.
- **Lettering** is your own words in a stencil alphabet. Small bridges of
  sheet hold the middles of A, B, D, O, P, Q, R and the rest in place.

Every opening is a line of even width with rounded ends, or a round hole.
Where two lines would meet or cross, one stops just short of the other. That
leaves a bridge of sheet, so no piece of the stencil can fall out. The page
shows the sheet at full size when it fits. It comes in two looks: a filled
preview in a paint colour, or plain outlines for tracing and cutting.

## How to use it

1. Print the page at 100% (no "fit to page"). If the sizes line says
   "enlarge to cut", scale the drawing up by that much on a copier or in
   your cutting machine's software.
2. Cut every opening out of stencil film, freezer paper or thin card. Use a
   craft knife or a cutting machine, and leave the round registration holes
   for last. Do not cut through the bridges.
3. Tape the stencil to the wall at a top corner. Dab or roll the paint on
   lightly with an almost dry brush or sponge, working from the edges of
   each opening inwards.
4. Before you lift it, pencil a small mark through each round hole.
5. To carry on sideways, move the stencil along until its left-hand round
   hole on the top edge sits over the right-hand mark you just made. To go
   down, line up the upper hole on the left edge with the lower mark. Each
   new pass fits the last one exactly.
6. For lettering, you can paint the small gaps in by hand afterwards. Or
   leave them, for the classic stencil look.

## Purpose

Stencilling makes a wallpaper look, a painted floor or a sign at the price of
a sheet of film. But a stencil only works if the sheet holds together. If
two openings meet, the piece between them drops out. If a hole goes all the
way round a shape, the middle falls away. And a repeat that is a millimetre
out shows as a seam all along the wall. These templates are built so that
none of that can happen, and checked again before they are drawn.

## History

Stencilling is among the oldest ways of making pictures. People blew pigment
round their hands on cave walls more than 40,000 years ago. Japanese
*katagami* paper stencils, held together by fine silk threads in place of
bridges, printed kimono cloth for centuries. In eighteenth- and
nineteenth-century America, itinerant painters such as Moses Eaton
stencilled walls and floors in houses that could not afford wallpaper.
Stencil lettering, with its tell-tale broken O, marked crates, ships and
military kit. Allover "trellis" and "damask" wall stencils came back into
fashion in the 2000s. The Moroccan lantern and the ogee are patterns from
Islamic and Gothic ornament.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `pattern` (`moroccan`,
  `ogee`, `quatrefoil`, `honeycomb`, `lettering`); `repeat_mm` (repeat
  width) and `repeats_x`/`repeats_y` (whole repeats on the sheet, allover
  only); `band_mm` (opening width), `bridge_mm` (narrowest bridge),
  `cutter_mm` (the cutter's smallest clean feature); `text` and
  `letter_height_mm` (lettering only); `look` (`filled`, `outline`);
  `labels`; `line`.
- **Generation:** each design is drawn as centrelines, and each opening is
  the tube of the opening width round one. Allover patterns are drawn on one
  repeat tile, treated as a torus, so distances wrap across the tile's
  edges. The bridging pass samples every centreline finely. Wherever two
  different openings come closer than opening plus bridge, the lower-priority
  one is cut back: a stroke yields near its own end, so stems stop short of
  the bars they meet. The ogee's waves take turns, so they look woven, and
  the lantern courses run through every junction. Where a single opening comes
  back near itself after more than four opening-plus-bridge widths along it,
  both parts are cut back. If a glyph loops back on itself tightly (the
  top of an &), the scan finds the trapped piece and the stroke round it is
  bridged at a much shorter reach. Every closed loop is cut open at a chosen point
  (the dome tips, or the top and bottom of an O). Crumbs shorter than their
  own width are dropped. The stencil carries every opening centred inside
  a block of whole repeats, plus four registration holes exactly one step apart.
  The seed picks the proportions (lantern height and dome depth, wave height,
  lobe shape, the bow of the hexagon edges), the optional dots, where loops are
  cut, and the preview colour. Too small a repeat or letter height for the
  opening and bridge is raised; an opening or bridge under the cutter limit is
  widened; out-of-range knobs are clamped. All of these are reported as
  `requested_*` in the meta. Unprintable characters are dropped and listed.
- **Solving:** nothing to solve — a template to cut and paint.
- **Guarantees:** every page passes `one_piece_checked`, re-proved from the
  finished openings alone:
  - every two openings, and every opening and the sheet's edge, are at least
    `bridge_mm` apart, measured exactly between centreline segments;
  - no opening pinches the sheet against itself;
  - every opening and every bridge is at least `cutter_mm` wide;
  - a row-by-row scan of the sheet, finer than the narrowest bridge, finds
    exactly one connected piece.

  Allover pages also pass `repeat_checked`. Stepping the stencil by its
  registration holes, three passes by three, paints every opening of the
  endless pattern exactly once, with nothing painted twice or left out.
  Tests show the checks catch a closed ring, a too-narrow bridge and a
  misplaced mark. Pointed inside corners (the inside of a V) are allowed.
  They are tongues of sheet, not bridges.
