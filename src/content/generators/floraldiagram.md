---
title: "Floral Diagrams"
blurb: "Floral diagrams with their floral formulas, drawn from one whorl model, plus a front view of the flower to colour"
category: design
version: "1.0.0"
---
A flower's plan in a single picture, with the formula that says the same
thing in a line of letters.

## What it is

A floral diagram is a map of a flower seen from above, as if the bud had
been sliced across. Its parts sit in rings: sepals on the outside, then
petals, then stamens, then the ovary in the middle cut open to show its
chambers and seeds-to-be (ovules). The back of the flower, toward the stem
it grows on, is at the top (the small circle); the bract it grows from is at
the bottom. Parts that are joined to each other are linked by lines.

Under the diagram is the floral formula, the same plan as text:

- `*` means the flower is the same all round; `↑` means it has a left and a
  right side but no other symmetry (like a pea flower).
- **K** sepals, **C** petals, **P** tepals (when sepals and petals look
  alike), **A** stamens, **G** carpels (the parts of the ovary).
- A number in brackets means those parts are joined; `+` separates rings or
  groups; square brackets join petals and the stamens growing on them.
- A line under the carpel number means the ovary sits above the other parts
  (superior); a line over it means it sits below them (inferior).

The page shows one flower with a front view to colour, or a plate of six
families: rose, pea, lily, cabbage, nightshade and daisy, or flowers
invented from the same rules.

## How to use it

- **Match diagram and formula.** Count each ring in the diagram and find
  the number in the formula. Which parts are joined?
- **Colour it.** Sepals green, petals in the flower's colour, stamens yellow
  - or anything you like. The outline version leaves every part open.
- **Take a real flower apart.** Cut a buttercup, pea, tulip or tomato
  flower across with a sharp knife, look at the slice with a lens, and draw
  its diagram the same way.
- **Invent a flower.** On an invented page, sketch what the front view
  might look like in real life, or give it a name.

## Purpose

Floral diagrams and formulas are how botanists compare flowers and tell
plant families apart. Drawing both from one plan teaches the vocabulary -
whorls, fusion, symmetry, ovary position - and shows that the formula is
just the diagram counted.

## History

August Wilhelm Eichler's *Blüthendiagramme* (1875-1878) made floral
diagrams a standard tool of plant comparison, building on earlier work by
botanists such as Grisebach. Floral formulas were introduced in the 19th
century too and are still taught in botany courses; their notation varies
a little between countries, and this page uses a common form. Louis
Ronse De Craene's *Floral Diagrams* (2010) revived the diagrams for
modern plant systematics.

## This implementation

- **Spec knobs:** `mode` (`single` default, `plate`), `family` (`auto`
  default, `rosaceae`, `fabaceae`, `liliaceae`, `brassicaceae`,
  `solanaceae`, `asteraceae`, `invented`), `front_view` (single mode),
  `formula`, `caption`, `style` (`colour` default with the petal colour from
  the seed, `ink`, `colouring`), `line`, `width`, `height`, `margin`.
- **Generation:** a flower is a list of whorls, each with an organ kind, a
  count, fusion (and which neighbours are joined), adnation, optional
  explicit angles, per-member sizes and sterile members. Offsets follow the
  alternation rule - each whorl turned `π/count` from the one before -
  unless the whorl is marked opposite (obdiplostemony) or carries its own
  angles. The family types: Rosaceae ✶ K5 C5 A5+5+5 G5 (free carpels),
  Fabaceae ↑ K(5) C1+2+(2) A(9)+1 G1, Liliaceae ✶ P3+3 A3+3 G(3),
  Brassicaceae ✶ K2+2 C4 A2+4 G(2) (parietal, false septum), Solanaceae
  ✶ K(5) [C(5) A5] G(2) (oblique carpels), Asteraceae disc floret ✶ K0
  [C(5) A(5)] G(2), inferior, one basal ovule. Invented flowers draw the
  merosity (3-6), fusion, one or two stamen whorls (sometimes
  obdiplostemonous), free or joined carpels, ovary position and, now and
  then, a two-lipped zygomorphic corolla whose back stamen becomes a
  staminode. Sepals are keeled crescents, petals crescents, stamens
  four-chambered anther sections, the ovary drawn by placentation (axile,
  marginal, parietal, basal, free); the zygomorphic flower's median plane is
  dashed. The formula is derived from the same whorls, its ✶ and ↑ symbols
  and the ovary line drawn as paths. The front view draws sepals, petals
  (scaled by member size), the corolla throat when joined, stamens and a
  stigma with one lobe per carpel.
- **Solving:** Nothing to solve.
- **Guarantees:** the formula's counts equal the drawn organs (fertile
  stamens; staminodes are drawn but not counted), checked by parsing the
  formula; consecutive equal whorls alternate (or are opposite when marked);
  a zygomorphic flower has exactly one mirror axis, the median line; an
  actinomorphic `n`-merous flower is `n`-fold symmetric in every whorl whose
  count is a multiple of `n`; deterministic per seed; ink inside the page.
  `verification: formula_counts_equal_drawn_organs`.
