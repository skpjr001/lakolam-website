---
title: "Suprematist Composition"
blurb: "Suprematist composition: bars, rectangles, a circle and thin lines floating on diagonal axes"
category: design
version: "1.0.0"
---
Flat bars, rectangles, one circle and a few thin lines floating along a diagonal, in the manner of Malevich.

## What it is

Suprematism, launched by Kazimir Malevich in 1915, painted nothing but pure geometric
forms in a few flat colours on a white ground — "the supremacy of pure feeling" over
the depiction of objects. Its compositions share a strict grammar: almost every form is
lined up with one or two dominant diagonal axes, as if moving through space; one long
dark bar dominates; the other elements cluster along the axis and thin out away from
it, a few large and many small; a single circle and a few hairline lines set the scale;
forms overlap boldly, so it is always clear which lies in front.

This page composes a new picture from that grammar every time. It never copies a
painting.

## How to use it

Frame it as a poster, or choose the line-art palette and colour it in. For a
Suprematist feel, stay with black, red, a deep blue, ochre yellow and a little green
and grey, flat and without shading; leave the ground white. Colour the shapes at the
front last, over the ones behind.

## Purpose

Modern wall art with a pedigree, and a lesson in composition: how a picture can feel
dynamic and balanced with no symmetry and no subject at all.

## History

Malevich showed the first Suprematist works — including the *Black Square* — at the
"0,10" exhibition in Petrograd in 1915, and explained them in *From Cubism and
Futurism to Suprematism*. The movement drew in Olga Rozanova, Lyubov Popova, Ivan
Kliun, Nina Genke and, through the UNOVIS group at Vitebsk, El Lissitzky and Ilya
Chashnik; it fed directly into Constructivism, typography and architecture. The
"constructivist" palette here (red, black and grey on cream) follows that later turn.
The page applies the movement's compositional rules; it does not reproduce any
painting.

Sources: Kazimir Malevich, *The Non-Objective World* (1927; English 1959); John
Milner, *Kazimir Malevich and the Art of Geometry* (1996); Tate, *Malevich*
exhibition catalogue (2014); Museum of Modern Art, collection notes on
*Suprematist Composition* works.

## This implementation

**Spec knobs:** `elements` (bars and rectangles besides the dominant bar, 6–30;
0 = 10–22 by the seed); `axes` (1 or 2; 0 = by the seed); `jitter` (degrees an
element may turn from its axis, 0–15); `circle`; `lines` (0–6); `palette` (auto,
malevich, constructivist, line_art); `stroke` (line art); page `width`, `height`,
`margin`.

**Generation:** a main axis at 25–62° (either way) through a point near the middle,
and optionally a second roughly perpendicular axis crossing it elsewhere. The dominant
bar (about half the page's diagonal long) goes along the main axis near a third of
its length. The other elements are placed by rejection sampling: a position along
the axis from a bell curve, a sideways offset whose spread grows away from the
centre (so they cluster on the axis), a power-law size falling steeply from the
largest, bar or rectangle proportions, an angle equal to the axis's (or square to
it) within the jitter. A candidate is kept only if it stays in the frame, either
keeps a visible gap from every other element or overlaps it decisively (at least 15%
of the smaller, never swallowing it), and has no edge running almost along another
element's edge. Then one circle off the axis and the thin lines. Larger elements are
drawn behind smaller ones.

**Solving:** Nothing to solve.

**Guarantees:** every bar, rectangle and line is within the jitter of an axis's
direction (or its perpendicular); no two elements have near-coincident edges; overlaps
are never slivers; exactly one dominant bar, the longest element; all ink is on the
page.
