---
title: "Biomorphs"
blurb: "Dawkins's Biomorphs: nine-gene recursive creatures on a breeding sheet, a line of descent or a zoo"
category: design
version: "1.0.0"
---
Nine numbers grow a creature. Change one by one step and see what evolution
can do with it.

## What it is

Biomorphs are branching, insect-like and tree-like creatures that grow from
nine "genes". Eight of the genes set the length and direction of eight kinds
of twig; the ninth sets how many times the twigs branch. Every creature is
left-right symmetrical, like most animals, because the genes for the left
side are always the mirror of the genes for the right.

Three kinds of page:

- **Breeding sheet.** A parent in the middle, and around it eight (or
  fourteen) of its children. Each child differs from the parent in exactly
  one gene, by exactly one step, and the label under it says which gene
  changed.
- **Line of descent.** Twelve to twenty generations of one family, read left
  to right and top to bottom. Each generation is a child of the one before,
  chosen because it came one step closer to a creature the breeder had in
  mind. A stick becomes a beast.
- **Zoo.** A collection of unrelated creatures, numbered, with their genes.

## How to use it

- **Play the breeder.** On a breeding sheet, choose the child you like best.
  Its genes are printed under it: copy them, then work out its own children
  by changing one gene at a time by one step, and sketch the one you would
  pick next. A few rounds show how small changes, kept or thrown away, add
  up to big ones.
- **Spot the change.** Cover the labels and ask which gene each child
  changed. The last number is the branching depth: one more and the creature
  doubles its twigs.
- **Follow a lineage.** On a line of descent, find the generation where the
  creature first looks like something - an insect, a lamp, a fern, a face.
- **Colour or frame them.** Zoo pages make a gallery: each creature sits on
  its own card, ready to colour or cut out.

## Purpose

Biomorphs were invented to show, on a screen, how cumulative selection works:
random single-step changes and a selector who keeps the best of each brood
can reach shapes that random chance alone never would. The pages put that
experiment on paper for classrooms and curious readers, and the creatures
themselves are strange and handsome drawings.

## History

Richard Dawkins wrote the original Biomorphs program for *The Blind
Watchmaker* (1986), in which the reader is the selector: the screen shows a
parent and its mutant offspring, and whichever offspring the user clicks
becomes the next parent. The nine-gene genome, the eight direction vectors
and the recursive drawing procedure here follow the book's appendix and
Dawkins's essay "The Evolution of Evolvability" (1989), which also describes
the later genes for segmentation and gradients used by the optional
extensions.

## This implementation

- **Spec knobs:** `mode` (`breed` default, `lineage`, `zoo`, `auto` picked
  by the seed), `offspring` (8 or 14, others round to the nearer),
  `generations` (12-20, lineage only), `forms` (4-36, zoo only),
  `max_depth` (2-10, the deepest branching gene), `segmentation` and
  `gradient` (Dawkins's extensions; the gradient acts only with
  segmentation), `captions`, `palette` (`garden` default, `coral`, `ocean`,
  `ink`), `line`, `width`, `height`, `margin`.
- **Generation:** genes 1-8 build the direction vectors
  `dx = [-g2, -g1, 0, g1, g2, g3, 0, -g3]`, `dy = [g6, g5, g4, g5, g6, g7,
  g8, g7]`; gene 9 is the depth `d`. Drawing starts in direction 2 and each
  call draws a segment `d·(dx, dy)` then recurses into directions `dir ± 1`
  with depth `d - 1`, all in integer coordinates. Segmentation repeats the
  body `segs` times down the axis, `gap` trunk-lengths apart, and the
  gradient adds `k·grad` to the sideways genes of segment `k` (never through
  zero). Parents and zoo creatures are drawn from the seed and kept only if
  their outline is not a sliver and they are not mostly folded back on
  themselves; a breeding sheet's parent is the bushiest, squarest of eight
  such candidates. Children are distinct single mutations (one gene, plus or
  minus one, within range) chosen by the seed. A lineage starts from a small
  depth-3 creature and a hidden target at least `generations + 2` steps
  away; each generation picks at random among the children that come
  closer, the depth gene four times as likely. Each creature is scaled to
  fit its card on its own (a creature narrower than six gene units is not
  enlarged past a six-unit one) and shaded from trunk to twig tips.
- **Solving:** Nothing to solve.
- **Guarantees:** every creature is exactly mirror-symmetric (tested as
  integer segment sets); a depth-`d` creature has `2^d - 1` segments
  (times the number of segments with segmentation); every child on a
  breeding sheet differs from its parent in exactly one gene by exactly one,
  and no two children are the same; every lineage step changes one gene by
  one and comes strictly closer to the target; deterministic per seed; ink
  stays on the page. Meta records the genomes, the mutations and
  `verification: single_gene_mutations`; clamped `offspring`,
  `generations`, `forms` and `max_depth` are reported as `requested_*`.
