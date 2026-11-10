---
title: "Square Homage"
blurb: "Nested squares in the spirit of Albers's Homage to the Square: his ten-unit grid, colours chosen in Oklab"
category: design
version: "1.0.0"
---
Nested squares of flat colour in the spirit of Josef Albers's *Homage to
the Square*: his exact grid, colours chosen fresh for how they act on each
other.

## What it is

Three or four squares, one inside the other, each painted one flat colour.
They are not centred: every smaller square sits a little lower, so the
band of colour beneath it is thinner than the band above. The layout is the
ten-unit grid Josef Albers used for his long series of paintings; the
colours are new on every page and chosen by rules of perception — warm or
cool runs that step evenly lighter or darker, quiet value steps, colours of
one equal lightness that make their edges shimmer, and "middle mixtures"
where the squares between two colours look like blends of them. A page
shows one plate, a series of four, six or nine variations, or an
interaction study. It is a study made in his spirit, not a copy of any of
his works.

## How to use it

Print a plate and look at it for a while from across a room: the squares
seem to come forward and fall back, and the inner colours seem to glow or
sink, though nothing on the paper changes. In a series, compare how the
same arrangement feels in different colours. The interaction study is an
experiment to do with your eyes: in each pair the two innermost squares are
the very same colour — cover the surrounds with paper to check — yet on the
dark and light grounds, or on the two differently coloured grounds, one
colour looks like two. Use the pages as colour-theory handouts, as prompts
for painting your own versions, or simply as calm wall art.

## Purpose

To make colour interaction visible: a fixed, quiet format keeps the eye on
the colours, and perceptual colour choice makes each harmony do what its
name says.

## History

Josef Albers (1888-1976) studied and then taught at the Bauhaus from 1920 to 1933, then at
Black Mountain College in North Carolina and from 1950 at Yale, where he
chaired the department of design. In 1950 he began *Homage to the Square*,
the series he worked on until his death: well over a thousand paintings and
many prints, nearly all on Masonite, in three or four nested squares. He
laid them out on a grid of ten units with each smaller square shifted half
a unit downward; he wrote that the downward shift gives weight and
movement and avoids the static fixation of full symmetry (as described in
Eugen Gomringer, *Josef Albers*, 1968, pp. 137-139). His teaching book
*Interaction of Color* (Yale University Press, 1963) set out the classroom
exercises behind the paintings, among them making one colour look like two
by changing its surroundings. Colour here is chosen in Oklab, a perceptual
colour space published by Björn Ottosson in 2020.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `layout` (`plate`,
  `series`, `interaction`); `format` (`auto`, `four` = squares of 10, 8, 6
  and 4 units, `three_8_6`, `three_8_4`, `three_6_4`); `harmony` (`auto`,
  `warm_ramp`, `cool_ramp`, `value_steps`, `equal_value`, `mixture`);
  `variations` (4, 6 or 9 plates, series only; other values move to the
  nearest); `caption` (a small label under the plates).
- **Generation:** a plate of side `s` has unit `u = s/10`. A square of `n`
  units has `k = (10 − n)/2` steps of inset and lies `k·u` in from each
  side, `k·u/2` up from the bottom and `3k·u/2` down from the top (bottom :
  side : top = 1 : 2 : 3). The three-square formats leave one square of
  the four-square grid out. Colours are made in OkLCh: ramps step Oklab
  lightness evenly between a dark and a light end (inward lighter about two
  times in three), warm ramps turning toward yellow as they lighten, cool
  ramps drifting through greens, blues and violets; value steps use one
  nearly grey hue; equal-value sets keep lightness within ±0.008 while the
  hue steps 28-48°; mixtures interpolate in Oklab between two far-apart
  hues. Colours outside sRGB lose chroma only. The interaction study pairs
  plates whose innermost square is identical: on a dark and a light
  surround (value), and on two surrounds of about the same lightness whose
  hues lie on opposite sides of it (hue).
- **Guarantees:** deterministic per seed; every square nests exactly in the
  stated proportions (tested from the drawn rectangles); lightness
  re-measured in Oklab from the painted 8-bit colours is strictly monotone,
  with steps over 0.05, for ramps, value steps and mixtures, and within
  0.03 for equal value (tested); in the interaction study the two inner
  squares are the same colour, the value surrounds are all at least 0.15
  darker or lighter, and the hue surrounds are within 0.08 in lightness
  with hues pulling opposite ways (tested). All ink lies inside the page.
  `verification: albers_grid_exact_monotone_oklab_lightness`. Clamped knobs
  are reported as `requested_<field>`.
