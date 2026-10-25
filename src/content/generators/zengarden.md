---
title: "Raked Sand Garden"
blurb: "Raked sand garden from above: rocks on moss islands, gravel raked in rings and lines"
category: design
version: "1.0.0"
---
A dry Japanese garden seen from above: stones on islands of moss, and gravel
raked into rings round them and calm lines everywhere else.

## What it is

A design of the karesansui, the Zen rock garden. Groups of one to three
stones sit in a rectangular bed, usually on a low island of moss. Round each
island the gravel is raked in evenly spaced rings; across the open bed it is
raked in straight or wavy parallel lines that stop where they meet the
outermost ring. Where two ring systems meet they join in a seam, as a real
rake leaves them. A border of pebbles can frame the bed.

## How to use it

Look at it slowly, or colour it: the stones, the moss and the pebbles are
closed shapes to fill, and the rings make good bands for soft shading. With
a finger or a pencil, follow one rake line all the way across and round an
island — or follow the rings out from a stone, one at a time.

## Purpose

A calm page with a strong sense of order, and a faithful picture of how such
gardens are raked: rings that follow the shape of each island at an even
distance, and straight lines that give way to them.

## History

Dry landscape gardens developed in Japanese Zen temples from the Muromachi
period (14th–16th centuries); the garden of Ryōan-ji in Kyoto, with fifteen
stones in raked white gravel, is the best known. Raking patterns — straight
lines for still water, rings round stones, waves — are renewed by the monks
as a daily practice. See Günter Nitschke, *Japanese Gardens* (Taschen, 1993)
and Marc Treib & Ron Herman, *A Guide to the Gardens of Kyoto* (1980).

## This implementation

- **Spec knobs:** `rake` (straight, wave, rings_only), `double_tine` (every
  line a close pair), `spacing` (4–40 pt), `rings` (1–12 per island),
  `groups` (1–7; 0 = three to five by seed), `moss`, `border`, `palette`
  (auto, sand, white_gravel, dusk, line_art), `stroke`, `width`, `height`,
  `margin`.
- **Generation:** rock groups are placed by dart throwing with a minimum
  distance, relaxed as attempts run out; each stone is a smooth noisy blob
  (gradient noise sampled on a circle, so it closes), each moss island
  follows the stones' support function widened by noise. The rings are level
  lines (marching squares) of the exact signed distance to the islands,
  sampled at a fifth of the spacing (at most 500 samples a side), at levels
  (j + ½) · spacing; the minimum over islands makes the seams. Straight and
  wave lines are cut where the same exact field reaches the outermost ring,
  with the ends found by bisection. Each groove is drawn with a lit lip for
  depth in colour palettes.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  rake_clear_of_rocks`. Tested: no rake line comes nearer an island than
  half the spacing (a third for a double tine) or enters any stone; every
  straight line ends on the outermost ring or the bed's edge; stones sit
  inside their moss; the rings round a lone stone are evenly spaced (each
  ring within 8% of the spacing from the one inside it). All ink stays
  inside the page.
