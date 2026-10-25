---
title: "Sangaku"
blurb: "Temple-geometry tablets: exact problems of touching circles painted on a wooden board, in the manner of Japanese sangaku"
category: design
version: "1.0.0"
---
A wooden temple tablet painted with problems of touching circles, every one of them drawn exactly.

## What it is

A tablet in the manner of the *sangaku* of Edo-period Japan: a board under a
small gabled beam, divided into one to four panels, each painted with a
geometry problem and its statement written beneath. The problems are the
classics of the genre: three circles touching each other and a line;
the circles that touch three touching circles (Descartes' rule); an
Apollonian packing grown from two circles on a diameter; Malfatti's three
circles in a triangle; Pappus' chain and Archimedes' twin circles in the
shoemaker's knife; a Steiner ring between two circles; two quarter circles
in a square; a chain of circles down a folding fan; chains of circles into
the corners of a polygon; a regular polygon in a circle with the largest
circle in every segment; and the circles beside a chord. The sizes are
whole numbers or simple fractions wherever the geometry allows, as they
were on the tablets.

## How to use it

Hang it, frame it, or solve it. Each panel states its problem in capitals;
the answer can be printed after it, or left off for a reader to work out.
The colour tablets are painted like the originals, in vermilion, indigo,
malachite green and ochre on cedar, cypress, weathered wood or black
lacquer. The line-art tablet is a colouring page: every circle, segment and
gap is a region to colour. Look for the circles that come in families —
each new circle in a gap obeys the same rule as the one before it, which is
why the chains shrink so evenly into their corners.

## Purpose

To print the beauty of a tradition of recreational geometry, and to make it
true: the circles on the page really do touch what the caption says they
touch. A good problem for a class or a puzzle evening, and a handsome print.

## History

From the late seventeenth century until the Meiji era, people of every
class in Japan — samurai, farmers, merchants, women and children — hung
painted wooden tablets of geometry problems in Shinto shrines and Buddhist
temples, as offerings and as public challenges. They grew out of *wasan*,
the native Japanese mathematics of the Edo period, when the country was
largely closed to Western books. About nine hundred tablets survive.
Fukagawa Hidetoshi and Dan Pedoe gathered them in *Japanese Temple Geometry
Problems* (1989), and Fukagawa and Tony Rothman told their story in *Sacred
Mathematics: Japanese Temple Geometry* (2008); see also Rothman's article
"Japanese Temple Geometry", *Scientific American* (May 1998). Several of the
problems here are older than the tablets: Pappus' chain (4th century),
Archimedes' twins (the *Book of Lemmas*), Descartes' circle theorem (1643;
the complex form is Lagarias, Mallows and Wilks, 2002), Malfatti's problem
(1803) and Steiner's porism (1820s). The tablets on this page are new
compositions in the manner of the tradition, written in English capitals;
no particular tablet is reproduced.

## This implementation

- **Spec knobs:** `width`, `height` (points); `panels` (1–4); `problem`
  (`auto` or the first panel's problem: `on_a_line`, `soddy`, `gasket`,
  `malfatti`, `arbelos`, `steiner`, `square_arcs`, `fan`, `corner_chains`,
  `polygon_in_circle`, `chord`); `detail` (1–5: how far the chains and gap
  fillings run); `style` (`colour`, `lines`); `palette` (`auto`, `cedar`,
  `hinoki`, `weathered`, `lacquer`); `captions`; `answers`; `stroke`.
- **Generation:** the seed picks the problems (all different) and each
  panel's free parameters — integer radii, integer triangle sides, a split
  of the arbelos base, a rational fan angle, a chord distance, an inversion
  centre — from sets chosen so the answers come out whole or simple.
  Circles are placed constructively: circles on a line by
  `1/√r₃ = 1/√r₁ + 1/√r₂`; Descartes quadruples by the complex Descartes
  theorem, and every later gap by its Vieta reflection
  `k' = 2(k₁+k₂+k₃) − k₄`, `k'z' = 2Σkᵢzᵢ − k₄z₄` (integer curvatures stay
  integers); corner chains by the ratio `(1 − sin α/2)/(1 + sin α/2)`;
  Pappus' chain and Archimedes' twins by their closed forms; the Steiner
  ring concentric first and then inverted in a circle that maps the outer
  circle to itself; Malfatti's circles and the chains beside chords, arcs
  and fan edges by Newton's method on three tangency equations, converged
  to machine precision. Each panel's figure is scaled to fit above its
  caption.
- **Solving:** Nothing to solve on the page itself; the captions pose the
  problems, and `answers` prints their answers.
- **Guarantees:** deterministic per seed. Every tangency a figure claims
  holds to 1e-9 of the figure's size (tested for every problem, every
  detail level and many seeds; the meta reports `max_tangency_error`,
  typically ~1e-16, with `verification: every_tangency_within_1e-9`); no
  two circles overlap and every circle stays inside its container (tested);
  every circle touches something it is claimed to touch; the classical
  answers are checked (36/25, Pappus' n diameters, 1/16 · 1/6 · 3/8 of the
  square, whole curvatures throughout the integer packings). All text is
  in the stroke font's capitals. Clamped knobs are reported as
  `requested_<field>`; the line-art style reports its colourability check;
  meta names the `tradition`.
