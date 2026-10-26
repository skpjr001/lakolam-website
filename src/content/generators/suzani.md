---
title: "Suzani Hanging"
blurb: "Suzani-style embroidered hangings: great roundels, crescents and flowering vines in a mirror-symmetric field with a border of small flowers"
category: design
version: "1.0.0"
---
An embroidered hanging of great flower roundels, crescents and flowering
vines, mirrored about its centre inside a border of small flowers.

## What it is

A design in the manner of a suzani, the large embroidered cloth of Central
Asia. Big roundels — rosettes of concentric rings of petals, rays and dots —
are laid out in rows and columns or round a great central medallion; smaller
rosettes and crescents fill the spaces between them, and sprays of vine with
leaves and buds fill the smaller gaps. The whole field is mirrored left to
right (and, usually, top to bottom), and a border band carries a wavy vine
with small flowers and leaves. Every shape is drawn as embroidery: a filled
shape with a fine outline and rows of stitching that follow its edge.

## How to use it

Display it, or colour it with the line-art palette. Suzani makers plan
colour by symmetry: give a roundel and all its mirror images the same
colours, alternate two colours round a ring of petals, and use the green of
the vines to tie the field together. Work from the centre outward.

## Purpose

A rich, warm page that shows how a whole cloth is planned: a few large
motifs first, then smaller ones in the spaces they leave, all mirrored so
the composition balances.

## History

Suzani (from the Persian *sūzan*, needle) were made in Uzbekistan and
Tajikistan — Bukhara, Nurata, Samarkand, Shakhrisabz, Tashkent — mainly in
the 18th and 19th centuries, as dowry cloths sewn by a bride's family, often
in strips worked by several women and then joined. The roundels are read as
suns and moons (*oy*, moon, names the moon-like rosettes of Tashkent work),
the vines and flowers as gardens. Embroiderers in Uzbekistan continue and
revive the craft today. This page is a geometric grammar in the manner of
the tradition, not a copy of any cloth. Sources: Susan Meller, *Silk and
Cotton: Textiles from the Central Asia That Was* (Abrams, 2013); Jonathan
Kalter and Margaret Pavaloi, *Uzbekistan: Heirs to the Silk Road* (Thames &
Hudson, 1997); Christine Brockman, *Suzani* (Arnoldsche, 2019).

## This implementation

- **Spec knobs:** `layout` (auto, grid, medallion), `symmetry` (both,
  left_right), `palette` (auto, bukhara, nurata, tashkent, line_art),
  `columns` (roundel columns in a grid; 0 = by seed), `stitching` (density
  of the stitched rows; 0 = flat fill), `border`, `width`, `height`,
  `margin`.
- **Generation:** primary roundels are placed by the layout (a grid; or a
  central medallion with a ring of eight roundels sized so neighbours just
  clear each other). The rest of the field is filled by a largest-empty-
  circle search over a lattice of candidate points in the fundamental region
  of the symmetry (a quarter or a half of the field, axes included): each
  pick is the point farthest from every motif, the field edge and its own
  mirror images; large clearances become roundels, middling ones rosettes or
  crescents (opening toward the nearest roundel, or along the axis), small
  ones sprays (a curved stem with folk leaves and a bud). Every pick is
  placed with its mirror images and shares their style and colours. Border
  stations are spaced evenly along each side with an odd number of half-wave
  vine spans, so each side mirrors onto itself. Roundels are concentric:
  rays, a band with dots, alternating petals in two colours, a small star.
  Each shape is filled and outlined, with inset echoes of its outline drawn
  as rows of stitching.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  motifs_never_overlap_and_layout_is_mirror_symmetric`. Tested for both
  layouts, both symmetries and several column counts: every pair of motifs
  (roundels, rosettes, crescents, sprays) is at least the gap apart and all
  lie inside the field; every motif has its mirror image (same size, style,
  colours, mirrored orientation) under each declared mirror, and the border
  under both; left–right layouts really are not top–bottom symmetric; all
  ink stays on the page.
