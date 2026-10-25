---
title: "Tree Architecture"
blurb: "Tree architecture: the 23 Hallé–Oldeman growth models, grown meristem by meristem"
category: design
version: "1.0.0"
---
Twenty-three ways to grow a tree: the botanists' architectural models,
grown bud by bud and drawn as a picture, a diagram or a chart.

## What it is

Every tree, at least while young, follows a growth plan. Botanists Francis
Hallé and Roelof Oldeman found that a few simple questions sort those plans
into about two dozen *architectural models*: does the stem branch at all;
are trunk and branches alike or different; do shoots grow upright or spread
flat; does each shoot grow on for ever or stop after a while and hand over
to a new bud; does branching come in tiers or continuously; and do flowers
end a shoot or sit along it. A coconut palm (one stem, flowers along it) is
Corner's model; a pine (a trunk with tiers of upright branches) is Rauh's; a
cacao tree (a trunk that stops in a fan of flat branches and is carried on
by a new shoot from below) is Nozeran's. This page grows a young tree by one
of the 23 models and draws it as a botanical picture with leaves, flowers
and fruit, as a stick diagram, or as a chart of all the models side by side.

## How to use it

Display it, colour it, or use it to learn to read trees. In the picture,
the trunk is as thick as the crown it carries. In the stick diagrams, a
filled dot marks flowers that end a shoot and an open ring flowers along a
shoot. Take the chart outside and try to match the trees on your street:
look first at whether the branches stand up or lie flat, then at whether
they come in tiers, then at where the flowers are.

## Purpose

A beautiful page that is also true botany: each tree really is grown by its
model's rules, so the differences between the pictures are the differences
the models describe.

## History

Hallé and Oldeman set out the models in *Essai sur l'architecture et la
dynamique de croissance des arbres tropicaux* (Masson, 1970), and with P. B.
Tomlinson in *Tropical Trees and Forests: An Architectural Analysis*
(Springer, 1978); each model is named after a botanist (Holttum, Corner,
Tomlinson, Schoute, Chamberlain, Leeuwenberg, McClure, Koriba, Prévost,
Fagerlind, Petit, Nozeran, Aubréville, Massart, Roux, Cook, Scarrone, Stone,
Rauh, Attims, Mangenot, Champagnat, Troll). The characters and example
species used here follow the illustrated key in Alexey Shipunov's *Key to
the Diversity and History of Life*, after Hallé, Oldeman and Tomlinson; see
also D. Barthélémy and Y. Caraglio, "Plant architecture: a dynamic,
multilevel and comprehensive approach to plant form, structure and
ontogeny", *Annals of Botany* 99 (2007). Branch widths follow the pipe model
of K. Shinozaki, K. Yoda, K. Hozumi and T. Kira (1964).

## This implementation

- **Spec knobs:** `mode` (silhouette, stick, chart), `model` (auto or any
  of the 23), `age` (steps of growth, 1–40; 0 = the model's own),
  `irregularity` (0–1: how much headings and internode lengths wander),
  `foliage`, `flowers`, `palette` (auto, botanical, dusk, ink, line_art),
  `caption`, `stroke`, `width`, `height`, `margin`.
- **Generation:** each model is a rule table of axis types: orientation
  (upright, spreading, mixed, arching, or spreading with a later-erected
  base), module length (0 = growing on), what ends a module (a terminal
  inflorescence, an abortion or fork, or the whole branch being shed) and
  the relays that carry growth on (a leader, from how far below the tip and
  how late, and equal relays), laterals (one by one in a golden-angle
  spiral, in tiers, on a bend, or from the base), and lateral flowering.
  The simulation advances every live apex one internode per step and applies
  its table; apices made in a step start in the next. The tree grows in 3D
  (each axis has an azimuth) and is drawn in side view with foreshortening,
  back branches paler. Widths follow the pipe model (da Vinci's rule, the
  square of a width is the sum of its children's); palms, bananas and bamboo
  are drawn as columns. Leaves live a few steps; palms carry frond crowns,
  bananas paddles, rosette models tufts at their tips.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  model_rules_obeyed` (chart: `every_model_labelled_once`). The branching
  topology depends only on the model and the age, never on the seed (the
  seed bends headings, varies lengths and turns the spiral) — tested for
  every model. Tested: Corner and Holttum never branch, and Holttum ends in
  one terminal inflorescence; Leeuwenberg is purely sympodial — no axis
  branches anywhere but at its tip, every branching module ended in a flower,
  and every branching node carries exactly three relays; Rauh's tiers are
  evenly spaced along the trunk (equal node gaps and equal tier sizes, equal
  heights without irregularity); monopodial trunks never end and sympodial
  ones do; Tomlinson branches only from the base; Cook sheds its branches;
  the chart labels every model exactly once. Numbers such as module lengths,
  tier periods and angles are ours — the models fix the kind of growth, not
  its counts. Growth stops at 12,000 nodes. All ink stays inside the page.
