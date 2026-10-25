---
title: "Asemic Writing"
blurb: "Asemic writing: an invented script, written as a letter, a manuscript, a scroll or vertical columns"
category: design
version: "1.0.0"
---
Pages of handwriting in a script invented for each page — it looks like writing and means nothing.

## What it is

Asemic writing is writing without words: marks with the rhythm, spacing and flow of a
real script that cannot be read because there is nothing to read. Every page here
invents its own alphabet of twenty to forty letters and writes with it — some letters
common, some rare, words of a few letters joined in a cursive hand, lines that drift
and breathe as a hand's do. Four layouts: a letter with paragraphs and a flourished
signature; a manuscript page with a large red initial and notes in the margin; a
scroll; and vertical columns read right to left. Inks: brown on parchment with red
rubrics, black on white, or chalk on slate.

## How to use it

Frame it as an abstract, use it as a backdrop for collage, journals and scrapbooks,
or as a prop letter from an imaginary land. Calligraphers can copy the invented
letters as a warm-up: the shapes are all made of short, smooth pen strokes.

## Purpose

The beauty of writing without the meaning: texture, rhythm and the look of a hand.

## History

Asemic writing — the word was proposed by the poets Tim Gaze and Jim Leftwich in the
1990s — has older roots: Henri Michaux's *Alphabets* and *Mouvements*, Cy Twombly's
blackboard paintings, Xu Bing's *Book from the Sky* (1987–91) with its four thousand
invented characters, Luigi Serafini's *Codex Seraphinianus* (1981), and Mirtha
Dermisache's "illegible" letters and texts.

Sources: Peter Schwenger, *Asemic: The Art of Writing* (University of Minnesota
Press, 2019); Tim Gaze, *Asemic Movement* (2008–); Michael Jacobson, interviews and
essays on asemic writing.

## This implementation

**Spec knobs:** `layout` (auto, letter, manuscript, scroll, columns); `glyphs`
(alphabet size, 20–40; 0 = by the seed); `x_height` (points); `slant` (degrees);
`wobble` (how much each baseline wanders); `ruled`; `palette` (auto, parchment,
paper, slate); page `width`, `height`, `margin`.

**Generation:** a glyph is one to three strokes, each a random walk of a few moves on
a 3-column node grid spanning the x-height box (sometimes reaching up to an ascender
or down to a descender), rounded by corner cutting. Candidates are kept only if they
have enough ink and spread; if they are not within a chamfer distance of 0.075 (unit
box) of any capital, small letter or digit of the built-in stroke font; if they are
not a cross, saltire or hooked cross (four-fold rotational symmetry, or two straight
crossing strokes); and if they differ from every glyph already chosen. Text uses
Zipf's law for glyph frequency and for word lengths (ranked 4, 3, 5, 2, 6 …); within
a word a curved connector joins each glyph's exit to the next one's entry. Every
line has its own small drift, the baseline wanders by smooth noise, the hand slants,
and a second offset pass of each stroke imitates a broad nib.

**Solving:** Nothing to solve.

**Guarantees:** the alphabet has the requested size and its glyphs are pairwise
distinct; no glyph lies within tolerance of any stroke-font letter or digit; no glyph
is cross-like or has four-fold rotational symmetry; the page is deterministic; all
ink is on the page.
