---
title: "Fractal Settlement"
blurb: "Recursive settlement plans after Ron Eglash's analysis of Ba-ila, Mokoulek and Labbenzanga architecture"
category: design
version: "1.0.0"
---
A village plan built from one rule repeated at every scale: rings of
households, each a ring of houses, each growing toward the back.

## What it is

In *African Fractals* (1999) the mathematician Ron Eglash showed that
self-similar scaling is a deliberate design principle in many African
settlements. His best-known example is his analysis of an aerial photograph
of a Ba-ila settlement in southern Zambia: a large ring of family enclosures,
open at the front gate, with the enclosures growing larger toward the back,
where the chief's family ring stands. Each family enclosure repeats the
pattern — a ring of buildings, open toward the centre, growing toward the
head's house at its back — and the chief's ring repeats the whole settlement
in miniature. Eglash also described branching compounds in Mokoulek
(Cameroon) and rectangular, nested plans in Labbenzanga (Mali).

This page draws an idealised *mathematical model* in the spirit of his
analysis, not a map or a reconstruction of any real village. You choose how
many levels the rule is repeated, how many units stand in a ring, and how
wide the gate is.

## How to use it

Follow one rule down the scales: find the largest unit at the back of the
settlement, then the largest building at the back of that unit, and so on.
On the colour page each level has its own colour; on the line-art page,
colour the levels yourself, or colour every head's house in one colour to see
the recursion. It makes a good starting point for talking about scaling,
symmetry and self-similarity — and about how a plan can express social
structure, with status shown by size and position.

## Purpose

The culture lane's mathematics page: recursion and linear scaling as a
design idea, presented with its source and without pretending to be a map.
It also carries a geometric guarantee, proved by construction and by test:
no two buildings ever overlap, however deep the recursion.

## History

Ron Eglash, *African Fractals: Modern Computing and Indigenous Design*
(Rutgers University Press, 1999), chapter 2, analyses the Ba-ila settlement
plan from an aerial photograph and describes the Mokoulek and Labbenzanga
examples. His talk "The fractals at the heart of
African designs" (TED, 2007) gives a short introduction. The plans drawn here
are simplified models in the spirit of that analysis.

## This implementation

- **Spec knobs:** `model` (auto / ba_ila / mokoulek / labbenzanga), `depth`
  (2-5 levels, counting the buildings), `units` (3-21 units in the outer ring
  or row, kept odd so one stands at the back; empty lets the seed choose),
  `gate_angle` (width of the gate, 10-120 degrees), `rotation` (direction of
  the main gate; empty lets the seed turn it a little), `style` (plan /
  line_art / colour), `caption`, `width`, `height`, `margin`.
- **Generation:** each level is a ring (or row) of an odd number of units with
  sizes growing linearly from the gate to the back, the back unit boosted (and
  boosted further at the top level for the chief's ring); inner levels use
  fewer units. Ring units each own an angular wedge and fit inside it, so
  siblings cannot touch, and each unit's own ring lies inside its disc.
  Labbenzanga squares stand along the side walls and the back wall in one
  common scale. Mokoulek courts are laid against their parent and shrunk
  until they clear everything already placed, never larger than the branch
  inside them. The page is capped at 4,000 buildings by trimming the deepest
  levels first (reported as `requested_units_trimmed`). The seed picks the
  unit count, the growth rate, the head's boost and a small turn of the gate.
- **Solving:** Nothing to solve.
- **Guarantees:** no two buildings overlap, and at every level the largest
  unit stands exactly opposite the gate with sizes never shrinking toward the
  back (`verification: no_overlap_and_back_largest`); for rings and squares
  the building count is the product of the unit counts. The caption and the
  metadata name the source and state that the plan is a model, not a map.
  Out-of-range knobs are clamped and reported as `requested_<field>`.
