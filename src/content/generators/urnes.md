---
title: "Urnes-Style Animal Interlace"
blurb: "Urnes-style animal interlace: a slender great beast and thin snakes in open figure-of-eight loops, woven strictly over and under"
category: design
version: "1.0.0"
---
A slender great beast and thin snakes looping through each other in open
figures of eight, in the manner of the last Viking art style.

## What it is

An animal interlace in the manner of the Urnes style. A great beast — a
long ribbon of a body that swells thick in the middle and thins to a
whip-like tail ending in a curled tendril, with a slender head, an almond
eye and a lappet streaming back from the head — is coiled in a broad,
uneven figure of eight. Thin snakes with small heads loop through it, and
the beast's legs end in curled feet with a spiral at the hip. Every strand
passes alternately over and under the strands it meets. The contrast of
thick and thin, the long smooth curves and the open, asymmetric loops are
what set the style apart from the tight, symmetric knotwork of Celtic art.
A page is a carved panel, a runestone-like stone whose border is a serpent
band carrying its head round past its own tail, or a round brooch-like
field.

## How to use it

Follow one strand with your finger: it goes over, then under, then over
again, all the way along. Find the beast's head first — the almond eye and
the lappet — then trace its body round the figure of eight to the curl of
its tail, and pick out the snakes by their small heads. The carved-wood
page is ready to print; the ink page looks like a drawing on parchment; the
line-art page is for colouring — try one colour for the beast, others for
the snakes, and darken the background so the animals stand out as if
carved.

## Purpose

A study of how a few long, smooth, weaving lines can fill a field with
movement — and an introduction to an art style from the end of the Viking
Age.

## History

The Urnes style is named after the carved wall planks, portal and door of
the stave church at Urnes in Sogn, western Norway; the carvings, made about
1070 for an earlier church, were reused when the present church was built
in the 12th century. The style flourished from about 1050 to 1150, after
the Ringerike style, and is the last of the Scandinavian animal styles.
It is found on the Uppland runestones of the later 11th century (among
them many by the rune carver Öpir), on openwork brooches across
Scandinavia and in England, and in Ireland, where an Irish form of it
decorates the Cross of Cong (about 1123). Its hallmarks are the great
beast fighting or entwined with snakes, ribbon-like bodies of strongly
varying width, almond eyes, lappets and tendrils, and open loops in
figure-of-eight and multi-loop patterns. This page is Urnes-style: its
animals and their loops are generated fresh and copy no carving, and the
stone's band is purely decorative — it carries no runes or inscription.
See David M. Wilson and Ole Klindt-Jensen, *Viking Art* (1966), and James
Graham-Campbell, *Viking Art* (Thames & Hudson, 2013).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 800);
  `composition` (`panel`, `band` — the runestone-like stone, `roundel`;
  default panel); `style` (`carved` — ochre relief with shadows and grain,
  default; `ink` — on parchment; `lines` — outlines to colour); `snakes`
  (0-4, default 2); `legs` (the beast as a quadruped, default on; off draws
  a legless serpent-beast); `stroke` (outline width, 0.2-4, default 1).
- **Generation:** each strand is a smooth centreline sampled at equal arc
  length with a width that follows a smoothstep profile through keyframes
  (snout, eye, neck, swelling body, thin tail, tendril). The beast is an
  open, unevenly lobed Gerono lemniscate with seeded harmonics whose tail
  bends away from the middle into a curl (an Euler spiral); snakes are
  smaller lemniscates or looping trochoids; legs and the lappet grow
  outward from the body and end in curls, their roots hidden in the body.
  The runestone serpent follows the stone outline, its head rising from
  inside and its tail sinking inside to cross the neck. All centreline
  crossings are found exactly (segment intersection on a uniform grid).
  Over/under must alternate along every strand with one strand over at
  each crossing: strand `s` is over at its `r`-th crossing iff `r + p_s` is
  even, and each crossing fixes `p_a ⊕ p_b`, so a parity union-find
  decides whether a layout can be woven. A free end that stops inside a
  loop breaks that parity, so a layout that cannot be woven is repaired by
  shortening a snake's or leg's tail back past one to three crossings
  (tapered to a point), or, only as a last resort, by leaving a snake or
  leg out. Sixty-four seeded layouts are scored (woven, repairs needed,
  shallow crossings, crossings crowding each other, crossings on a head,
  ribbons running too close, how much of the field is used) and the best
  is scaled to the largest size whose ribbons stay inside the field. The
  under strand is cut along the edge of the over ribbon (plus a clearance)
  on both sides of each crossing.
- **Guarantees:** deterministic per seed. Over and under alternate along
  every strand at every crossing, and exactly one strand is drawn at each
  crossing — checked from the drawing against an independent brute-force
  search for every crossing (tested). Widths are positive and change
  smoothly (bounded slope and second difference, tested); the body swells
  to many times its tail's width. Every ribbon lies inside the field and
  all ink inside the page (tested). `verification:
  alternating_weave_inside_field`; meta reports the crossings, pieces,
  layouts scored, `fill_scale`, any snake a repair had to leave out
  (`snakes_left_out`, normally 0) and strands removed by the last-ditch
  fallback (`strands_dropped_to_weave`, normally 0). The line-art page is
  stroke-only, and its `colorable` flag reports the adult colourability
  check honestly (thin tendrils and short pieces between crossings fall
  under its 40 mm² floor). Clamped knobs are reported as
  `requested_<field>`.
