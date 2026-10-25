---
title: "Photoelastic Fringes"
blurb: "Photoelastic stress fringes: loaded discs, blocks, plates with holes and granular force chains"
category: design
version: "1.0.0"
---
The rainbow bands a squeezed piece of clear plastic shows between crossed
polarisers: stress made visible.

## What it is

Some transparent plastics turn birefringent when they are stressed: light
polarised along one principal stress travels a little slower than light
polarised along the other. Between crossed polarisers the two beams
interfere, and the part fills with coloured bands — *isochromatics* —
each one a line of equal difference between the two principal stresses.
Where the stress is low the plastic stays black; as it rises the colours
run grey, white, yellow, orange, red, a violet "tint of passage", then blue,
green, yellow and red again, one cycle per fringe order, crowding together
where stress concentrates. Five set-ups: a disc squeezed across a diameter,
a disc pressed at three or four points, a deep block pressed by rollers, a
plate with a round hole pulled from its ends, and a box of photoelastic
grains, where the load travels along bright *force chains*.

## How to use it

The colour pages are prints — a black ground makes the colours glow. The
monochrome page shows the same stress in single-colour light, as black and
white stripes. The line-art page draws the dark fringes as lines to colour
between: follow the real sequence (black, grey, white, yellow, orange, red,
violet, blue, green…) outward from the quiet regions, or pick a palette of
your own. Look for the places the lines crowd — under each load, beside the
hole — those are where the part is most highly stressed.

## Purpose

Stress analysis, the way engineers did it before computers, drawn exactly:
every band comes from the closed-form elastic solution for its set-up, and
the grains carry contact forces from a relaxed packing.

## History

David Brewster discovered stress birefringence in 1816; the method of
photoelasticity was built into an engineering tool by E. G. Coker and
L. N. G. Filon (*A Treatise on Photo-Elasticity*, 1931) and M. M. Frocht
(*Photoelasticity*, 1941–48), whose closed form for the diametrally
loaded disc is used here; G. Hondros (1959) gave the disc under general rim
loads. The point load on a half-plane is Flamant's (1892) solution of
Boussinesq's problem; the plate with a hole is G. Kirsch's (1898). The
Michel-Lévy interference-colour chart (1888) orders the colours. Granular
force chains were photographed by P. Dantu (1957) and by T. S. Majmudar and
R. P. Behringer, "Contact force measurements and stress-induced anisotropy
in granular materials", *Nature* 435 (2005).

## This implementation

- **Spec knobs:** `width`, `height` (points); `mode` (`auto`, `disc`,
  `multi`, `beam`, `plate`, `granular`); `style` (`colour`, `mono`,
  `lines`); `fringes` (fringe order at the reference point, 0.5–10);
  `grains` (12–300, granular mode); `stroke`.
- **Generation:** stress is computed in closed form — one Flamant field
  `σ = −(2/π)(F·r) r⊗r/|r|⁴` per contact plus the uniform tension
  `ΣF/(2πR)` for discs (Hondros; Frocht for the diametral pair), Flamant
  fields alone for the block, Kirsch's solution with a seeded transverse
  stress for the plate. Fringe order is `N = (σ1 − σ2)t/f`, with
  `σ1 − σ2 = √((σx − σy)² + 4τ²)`, scaled so that `N` equals `fringes` at a
  disc's centre or under the block's loads (0.6 × in a plate's far field,
  0.3 × at the median grain centre). `N` is capped near point loads, sampled
  on a grid, clamped to zero at every edge and traced as closed bands every
  ¹⁄₁₂ order (¹⁄₁₀ for mono). Colour pages fill bands from a
  Michel-Lévy-like dark-field table; past the cap the orders blend to
  white. Mono pages use light-field intensity `cos²(πN)`, dark at half
  orders. Line art draws the dark-fringe lines (every half order; whole
  orders for grains), dropping loops under 40 mm². Contact disc, three
  balanced contacts or two diametral pairs are seeded; the block takes one
  to three inclined loads. Grains: a seeded bidisperse packing relaxed
  under gravity by gradient descent on the soft-disc overlap energy; the
  final overlaps are the contact forces, drawn just inside the contacts.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; the disc's rim is traction-free
  away from its contacts for every seeded load (tested to 10⁻⁹ of the load
  scale), Frocht's centre value `8P/(πD)` and the uniform tension along the
  loaded diameter are reproduced exactly (tested), a symmetric load gives
  mirror-symmetric fringes (tested), Kirsch's hole is traction-free with a
  stress factor of 3 (tested); grain contact forces only push and their
  residual imbalance is reported as `grain_force_residual`.
  `verification: closed_form_stress_traction_free_rim`. Line art reports its
  colourability check. Clamped knobs are reported as `requested_<field>`.
