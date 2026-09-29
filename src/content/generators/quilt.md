---
title: "Quilt"
blurb: "Quilt - patchwork quilt designs from classic blocks, with a cutting list"
category: design
version: "1.0.0"
---
A patchwork quilt designed block by block: sixteen classic blocks, the
traditional settings, sashing, borders and binding, in fabric palettes that
read by value — with a cutting list that tells you exactly what to cut.

## What it is

A quilt top is a grid of blocks, and each block is a small square pieced from
a few simple shapes: squares, strips, half-square triangles (a square cut once
on the diagonal) and quarter-square triangles (cut twice). From these come the
blocks every quilter knows — nine patch, log cabin, courthouse steps, flying
geese, Ohio star, sawtooth star, pinwheel, bear's paw, churn dash, friendship
star, broken dishes, Dutchman's puzzle, hourglass, rail fence, shoofly and
plain half-square triangles — or a sampler with a different block in every
spot.

How the blocks are turned changes the whole quilt. Log cabin and half-square
triangle blocks are light on one half and dark on the other, so turning them
makes the classic settings: **barn raising** (concentric diamonds from the
centre), **straight furrows** (diagonal stripes), **sunshine and shadow**
(diamonds in groups of four) and **streak of lightning** (zigzags). Sashing
strips with contrasting cornerstones can frame each block; plain borders and a
binding finish the edge.

## How to use it

- **As a pattern.** Choose a block, the number of rows and columns and a
  finished block size. The page shows the whole quilt, and the cutting list
  gives, for every fabric, how many patches of each shape to cut, the size to
  cut them (seam allowances included: 1/2 in on squares and strips, 7/8 in on
  half-square triangles, 1 1/4 in on quarter-square triangles), and roughly
  how much fabric to buy, plus the binding strips.
- **To audition colours.** Quilts read by *value* — light against dark — more
  than by colour. Every palette is written in value roles (two lights, two
  mediums, two darks and an accent), so swapping palettes keeps the pattern
  readable. Turn on scrappy to vary the fabrics block to block the way a scrap
  quilt does.
- **As a colouring page.** The line-art version draws every seam, so you can
  plan your own colourway with pencils before cutting a single piece.

## Purpose

Quilt planning sheets are a staple of the craft — quilters sketch layouts on
graph paper and do the cutting arithmetic by hand. This draws the quilt and
does the arithmetic from the same pieces, so the picture and the cutting list
can never disagree. It is also a satisfying colouring page and a clean,
graphic print.

## History

Patchwork is old and worldwide, but the block-based American quilt took shape
in the early nineteenth century, when cheap printed cotton made piecing from
scraps both thrifty and decorative. Many block names date from that era: log
cabin became hugely popular around the Civil War, Ohio star and churn dash
from the same period, and the 1930s "feedsack" quilts gave their name to a
whole palette of cheerful prints. The settings — barn raising, straight
furrows, sunshine and shadow — are named for the farm life around them.

## This implementation

- **Spec knobs:** `block` (one of sixteen, `auto`, or `sampler`), `rows`,
  `cols`, `setting` (`auto`, `straight`, `alternate`, `barn_raising`,
  `straight_furrows`, `sunshine_shadow`, `zigzag`, `random`), `palette`
  (`auto`, `indigo`, `civil_war`, `thirties`, `christmas`, `modern`, `autumn`,
  `line_art`), `scrappy`, `block_size_in` (0 = a size that divides the block's
  grid evenly: 12 in, 14 in for the 7-grid blocks, 6 in for single
  half-square triangles), `sashing_in`, `cornerstones`, `borders` (0-3),
  `binding`, page `width`/`height`, `caption`, `stroke` (line art).
- **Generation:** each block is a list of patches on its own unit grid (1 to
  7 units), written as squares, strips, half-square and quarter-square
  triangles in value roles; flying geese are a quarter-square "goose" between
  two half-square "sky" pieces. The setting assigns each block a quarter-turn
  (the directional blocks have their dark corner at the lower left, so a
  setting is a map from position to dark corner). Blocks are scaled to the
  block size and laid out with sashing, cornerstones and borders (sides first,
  then top and bottom, as they are sewn). Palettes map roles to fabrics; the
  cutting list is counted from the very patch list that is drawn. The seed
  picks the block (`auto`), the sampler order, the classic setting for
  directional blocks, the palette (`auto`) and the scrappy fabric choices.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. **Exact tiling**, tested: in every
  block and all four turns the patch areas sum to the block's area, every
  patch's cut shape matches its polygon, and a dense sample grid finds every
  point covered exactly once; the same holds for whole quilt tops with
  sashing, cornerstones and borders. **The cutting list matches the picture**,
  tested: for every fabric, the counts in the metadata equal the number of
  drawn patches filled with that fabric's colour, and they sum to the patch
  total. **Value contrast**, tested: every block in every setting contains
  both light and dark patches, and in every palette each light fabric has a
  contrast ratio of at least 4.5 against each dark, with lights lighter than
  mediums lighter than darks. Barn raising is tested to mirror across both
  centre lines. Cut sizes follow the standard allowances; sizes that are not a
  whole number of eighths of an inch are flagged `exact: false`. Line art is
  checked with the adult colourability rules (reported as `colorable`). Yardage
  is an estimate from cut area plus 15%, rounded up to the next eighth of a
  yard; borders longer than the width of fabric must be pieced.
