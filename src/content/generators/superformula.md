---
title: "Superformula"
blurb: "Gielis supershapes as layered flowers, stars and shells — every layer simple and nested, ready to colour"
category: design
version: "1.0.0"
---
Flowers, stars and shells grown from one equation — Gielis's supershapes,
layered and ready to colour.

## What it is

A page of organic shapes built from rings. Each figure is a stack of
outlines, one inside the next: a flower whose rings of rounded petals
nest like a rose or interleave like a dahlia, a starfish whose arms sharpen
toward the centre, or a shell — a teardrop with growth lines gathering and
turning toward its pointed tip. On flowers and stars each ring is divided
into one cell per petal or arm. Every outline comes from a single formula
that, with a few numbers changed, can draw a circle, a square, a star, a
petal or an egg.

## How to use it

Print the colour version as a poster or card, or colour the line-art
version. Each ring and each petal cell is its own region: colour ring by
ring from the outside in, alternate two shades around a ring, or blend from
warm at the edge to cool at the heart. One large figure makes a calm,
detailed page; a page of six mixed figures is quicker to finish.

## Purpose

Nature is full of shapes that are almost, but not quite, geometric:
petals, starfish, seed heads, shells. The superformula captures that family
with a handful of parameters, so a page can be both organic and exact —
every region a clean closed shape with a clear border, which is what a
colouring page needs.

## History

The Belgian botanist Johan Gielis published the superformula in 2003 in the
*American Journal of Botany* as a generalisation of the superellipse — the
rounded rectangle Gabriel Lamé studied in the nineteenth century and Piet
Hein popularised as a design shape in the 1960s. Gielis showed that one
polar equation, r(φ) = (|cos(mφ/4)/a|^n2 + |sin(mφ/4)/b|^n3)^(−1/n1), with
m setting the symmetry and the exponents the curvature, describes a wide
range of natural forms: flowers, leaves, starfish, diatoms and cell
cross-sections. It has since been used in computer graphics, design and
antenna engineering.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`, `form` (flower, star, shell,
  mixed), `count` (1–12 figures), `layers` (2–12, at most), `petals`
  (divide rings into one cell per lobe), `palette` (bloom, ocean, meadow,
  dusk), `line_art`, `stroke`.
- **Generation:** each figure fills 92% of its panel. Its outer layer is a
  seeded supershape: flowers take m of 5–12 with n2 = n3 between 4 and 10
  (lobes open at the diagonals) and n1 1.5–5; stars m 5–9 with n2 = n3
  0.8–1.8 and n1 0.4–0.8; shells m = 1, a single lobe with a pointed apex.
  Inner layers vary the outer's exponents by up to 25%. Each layer is
  sampled at 480 fixed absolute angles round its centre, normalised so its
  largest radius is its scale, and placed inside the layer before at 70–86%
  of its size — interleaved by half a lobe where the lobes are shallow and
  on stars, stacked where they are deep, and for shells shrunk toward a
  growth point near the apex with a small turn each time. A layer that does
  not clear the one outside it by a minimum gap (4 pt or 3.5% of the radius
  in line art) is shrunk by 8% and retried, then tried without the
  interleave; one that still fails, or whose area would fall under the
  colouring floor (line art) ends the stack. Lobe cells cut each ring of a
  flower or star along rays through the outer layer's notches, shared by
  all rings; a ring is cut only if every cell clears the colouring floor
  (line art).
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. `verification:
  layers_simple_and_nested`: every layer's parameters close the curve (odd
  m only with a = b and n2 = n3), every drawn polygon is star-shaped about
  its centre — positive finite radius, polar angle strictly increasing
  through exactly one turn — and therefore simple, every layer lies in its
  panel, and each inner layer lies strictly inside the one before (a vertex
  inside, and the least distance between the two polygons, computed
  exactly edge against edge, greater than zero). Tested: the formula gives a
  circle and a square for the textbook parameters; odd m with unequal
  exponents does not close; stars have exact m-fold symmetry; no two edges
  of any layer cross (checked directly, independently of the star-shaped
  argument); a grown or crossing layer is caught; line art, with its lobe
  cells as closed regions, passes the adult colourability check for every
  form.
