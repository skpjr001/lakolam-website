---
title: "Foundation Paper Piecing"
blurb: "Foundation paper piecing — quilt block patterns cut by straight seams, every section proven sewable in its numbered order"
category: design
version: "1.0.0"
---
Quilt block patterns sewn onto printed paper: sharp points and crisp
angles, with every section proven sewable in its numbered order.

## What it is

A foundation paper piecing (FPP) pattern for one quilt block. The block is
divided into sections (A, B, C…), each made of numbered pieces (A1, A2,
A3…). You sew fabric directly onto the printed paper in number order, then
join the sections. Six families: **kaleidoscope** (eight mirrored wedges),
**sawtooth star**, **pineapple**, **log cabin**, **flying geese** and
improv **shards**. Every page has the full-size templates with a 1/4-inch
seam allowance, a coloured picture of the finished block, a fabric key with
piece counts, the joining order and a 1-inch test square.

## How to use it

Print at 100% (actual size) and measure the test square: it must be exactly
1 inch. The templates are printed **mirrored** — you sew from the back of
the paper, so the finished block comes out the right way round, as in the
picture.

1. Cut each section out on its dashed line (the 1/4-inch seam allowance).
2. Set your machine to a short stitch (about 1.5 mm) so the paper tears
   away easily.
3. Hold fabric for piece 1 to the unprinted side of the paper, right side
   out, covering piece 1 with 1/4 inch to spare all round. Hold it up to the
   light to check.
4. Fold the paper back along the line between pieces 1 and 2 and trim the
   fabric 1/4 inch beyond the fold. Lay fabric for piece 2 right sides
   together with piece 1, along that trimmed edge.
5. Turn the paper over and sew exactly on the printed line between 1 and
   2, a few stitches past each end. Open piece 2, press it flat.
6. Repeat for each piece in number order. Then trim the section on its
   dashed line.
7. Join the sections in the order listed, matching the solid outlines,
   with a 1/4-inch seam. Remove the paper last.

The pieces are tinted with their fabric colour, and each one names its
fabric, so the colours land where the picture shows them.

## Purpose

Paper piecing lets beginners sew points and angles more accurately than
any other method — the paper is a perfect guide — and lets designers use
shapes that are almost impossible to cut and piece by hand. Each pattern is
a ready-to-sew block for a quilt, a cushion or a mini wall hanging.

## History

Sewing patchwork onto foundations is old: Victorian crazy quilts and
log-cabin quilts of the 1860s were built on cloth or paper foundations,
and English paper piecing (papers tacked inside each hexagon) dates to the
1700s. Modern foundation paper piecing — sewing through printed paper in
numbered order — spread through quilting magazines and books in the 1990s,
notably Carol Doak's *Easy Machine Paper Piecing* (1994). The kaleidoscope,
star, pineapple and log-cabin blocks are traditional; the pineapple and log
cabin date from the 19th century. Recent research has turned the question
"can this design be paper-pieced?" into geometry and algorithms (Leake et
al., SIGGRAPH 2021).

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `family` (`kaleidoscope`,
  `star`, `pineapple`, `log_cabin`, `geese`, `shards`); `block_inches`
  (3–12 finished; if the templates will not fit the page, the block is
  shrunk to the largest size, in eighths of an inch, that does, and the
  page and `shrunk` say so); `palette` (`brights`, `pastels`, `ocean`,
  `autumn`, `festive`, five named fabrics each); `tint` (fabric-coloured
  template pieces); `labels` (heading, preview, key, joining order, test
  square); `line` (sewing-line weight).
- **Generation:** blocks are made only by straight cuts. The square is
  split along straight lines into sections; each section is carved from
  the outside in by straight chords, so the last chord cut is the first
  seam sewn. Kaleidoscope wedges get 2–4 seeded chords (no piece narrower
  than a fifth of the wedge or with a corner under 22°), copied by the
  square's eight symmetries so neighbouring wedges are mirror images, the
  seed sometimes swapping two fabrics on alternate wedges. The star is a
  4 × 4 sawtooth star (flying-geese points, optional square-in-a-square
  centre) in five sections. Pineapple and log cabin are single sections of
  2–3 and 3–4 rounds (log-cabin strip widths seeded). Geese come in 2–3
  columns, alternate columns flying the other way. Shards split the square
  into 2–4 sections at quilters' angles (multiples of 15°, jittered) and
  carve each with 2–4 seeded chords. Sections are lettered in reading
  order of the finished block. Templates are mirrored, given a 1/4-inch seam
  allowance (mitred, or bevelled at corners sharper than 90°), and pulled
  apart along each joining seam just far enough that allowances never
  touch.
- **Solving:** nothing to solve — a pattern to sew.
- **Guarantees:** every page passes `pieceable`, checked from the finished
  polygons alone: pieces tile the block exactly with no overlaps; in every
  section each piece after the first meets the pieces sewn before it along
  one straight seam with all of them on the far side; and the joining
  order splits the block along straight seams that run edge to edge, taking
  every section once. Tests re-derive a sewing order for every section by
  peeling off pieces that could have been sewn last, re-derive the joining
  tree from scratch, reject a deliberately wrong order, and check that the
  seam allowances are disjoint, the templates mirrored and printed at true
  size. The default 6-inch block fits Letter and A4 at true size.
