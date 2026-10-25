---
title: "Mudcloth"
blurb: "Mudcloth in the manner of bogolanfini: strip-woven panels, each tiled with one hand-painted mark"
category: design
version: "1.0.0"
---
A mudcloth in the manner of Malian bògòlanfini: sewn woven strips, panels of hand-painted marks, the ground painted around them.

## What it is

Bògòlanfini — "mud cloth" in Bamanankan — is cotton woven on narrow looms into long
strips, sewn edge to edge into a cloth, dyed in a leaf bath and then painted with
fermented river mud. The painter outlines each mark and fills the ground *around* it,
so the marks stay the colour of the cloth while the ground turns dark. The cloth is
laid out as a grid of panels between narrow border columns, each panel filled with one
small mark repeated: dots, crosses, nested squares, chevrons, stacked U's, hourglasses,
ladders, zigzags, triangles, diamonds…

This page lays out such a cloth from a vocabulary of twenty marks, every line drawn
with a hand's slight wobble, the seams of the strips stitched down its length and a
fringe at its foot. Palettes: cream on near-black, on rust, on deep brown, and black on
white to colour.

## How to use it

Display it, or colour the black-on-white version: fill the ground of each panel with
a dark earth colour (black, brown, rust) and leave the marks white — or colour the
marks and leave the ground. Keep each panel to one colour scheme so the grid reads.

## Purpose

A bold, graphic wall print with a hand-made feel, and a calm colouring page of small
repeated marks.

## History

Bògòlanfini is made by Bamana (Bambara) women and men in Mali — historically women did
the painting, men the weaving — and was worn at rites of passage and by hunters; its
marks carry names and meanings in their communities. From the 1970s artists such as
the Groupe Bogolan Kasobané revived and transformed it, and since the 1980s it has
become a symbol of Malian identity and a worldwide fashion, often imitated by printed
"mudcloth" fabric. This page is a geometric grammar in the manner of the tradition: its
marks are simple shared shapes and it does not reproduce any particular cloth or claim
the meanings of real ones.

Sources: Victoria L. Rovine, *Bogolan: Shaping Culture through Cloth in
Contemporary Mali* (Smithsonian, 2001); Pascal James Imperato and Marli Shamir,
"Bokolanfini: Mud Cloth of the Bamana of Mali", *African Arts* 3:4 (1970); Tavy D.
Aherne, *Nakunte Diarra: Bògòlanfini Artist of the Beledougou* (1992).

## This implementation

**Spec knobs:** `columns` (field columns, 1–8; 0 = 3–4 by the seed); `rows` (1–12;
0 = 4–6); `strips` (woven strips, 2–16; 0 = 6–9); `wobble` (hand wobble of the lines,
points, 0–3); `palette` (auto, black, rust, brown, line_art); `stroke`; page `width`,
`height`, `margin`.

**Generation:** the panel grid — field panels between a border column on each side,
separated by gutters of undyed cloth — tiles the cloth exactly. Three to five marks
are chosen from the twenty and laid over the panels in a diagonal or banded scheme,
then any two neighbours that match are changed, so no two adjacent panels share a mark;
the border columns share one mark from those that run well down a narrow column. Each
mark is tiled over its panel in cells of one size. Every stroke is densified and
displaced along its normal by smooth noise of the wobble's amplitude (a hand, not
jitter). The ground fills each panel and the marks are drawn on it in the cloth's
colour; the strip seams are stitched over everything.

**Solving:** Nothing to solve.

**Guarantees:** every panel (field and border) holds exactly one mark, tiled and kept
inside it; neighbouring field panels have different marks; every drawn point lies
within the wobble amplitude of its ideal line; every one of the twenty marks tiles a
panel; all ink is on the page.
