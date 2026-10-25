---
title: "Atomic Orbitals"
blurb: "Atomic orbitals: hydrogen wavefunctions, hybrids and molecular orbitals as signed density bands"
category: design
version: "1.0.0"
---
The shapes of the electron in a hydrogen atom — petals, rings and dumbbells —
drawn exactly from the wavefunctions.

## What it is

An electron in an atom has no orbit, only a cloud of places it might be found,
and the shape of that cloud is its *orbital*. Each orbital has a name: a shell
number (1, 2, 3, 4…), a letter for its shape (s round, p two lobes, d four,
f six or eight) and a subscript saying which way it points. Each page slices
one orbital, or a chart of a whole family, through the nucleus and shades the
slice by how likely the electron is to be there. The wavefunction has a sign,
and the two signs are coloured differently: where they meet, the electron is
never found, and that boundary — a *node* — is drawn as a bold line. Hybrids
(sp, sp², sp³) mix an s and a p orbital into one lopsided lobe, the shape that
makes carbon's bonds; the sigma and pi pages show the bonding and antibonding
orbitals of a two-atom molecule.

## How to use it

As a print, or as a chemistry poster. Count the bold lines and rings: a
circle round the centre is a radial node (3s has two, 3p one, 3d none —
one fewer each time the letter steps along), and lines through
the centre are angular nodes (p has one, d two, f three). Neighbouring lobes
always have opposite colours. On the line-art page each band between two
lines is a region to colour, darker towards the centre of each lobe and
alternating between two colour families across every bold line.

## Purpose

Real quantum mechanics as wall art: the shapes are not drawn by hand or
copied from a textbook figure but computed from the hydrogen wavefunctions
themselves, so every lobe, ring and node is where physics puts it.

## History

Erwin Schrödinger solved the hydrogen atom in 1926 ("Quantisierung als
Eigenwertproblem", *Annalen der Physik* 79). Robert Mulliken coined the word
*orbital* in 1932; Linus Pauling introduced hybrid orbitals in 1931 to explain
carbon's tetrahedral bonds ("The Nature of the Chemical Bond", *JACS* 53), and
the linear combination of atomic orbitals (LCAO) for molecules is due to
John Lennard-Jones (1929). The shaded-lobe pictures familiar from textbooks
date from the 1960s; density-contour plots like these are the older,
more quantitative form.

## This implementation

- **Spec knobs:** `layout` (single, chart), `orbital` (a name such as
  `3d_xy`, `4f_z3`, `2p_x`, `5s`, `sp3`, `sigma_star`, `pi`; empty = seed),
  `family` for charts (auto, shells, p, d, f, hybrids, molecular), `style`
  (colour, lines, cloud), `plane` (auto, xy, xz, yz), `palette` (auto,
  classic, night, jade, plum, ink), `levels` per sign (2–10), `decades`
  (1–6), `labels`, `width`, `height`.
- **Generation:** real hydrogen orbitals `R_nl(r)·Y_lm`: the radial part from
  the associated Laguerre recurrence with exact normalisation, the angular
  part from the Legendre recurrence, with `sinᵐθ·e^{imφ}` taken as
  `(x + iy)ᵐ/rᵐ` so no angle is computed; real combinations (p_x, d_xy,
  f_xyz…) without the Condon–Shortley phase. Hybrids are `(s + √k p)/√(k+1)`
  on one centre; molecular orbitals are sums and differences of 1s (sigma) or
  2p_z (pi) on two centres. The slicing plane is the coordinate plane holding
  most of `|ψ|²` (or the one asked for), turned up to 20° and tilted up to
  about 11° by the seed. A coarse pass finds where the density exceeds
  `10^−decades` of its peak and frames it; the fine pass contours the signed
  density `ψ|ψ|` at log-spaced levels of each sign (the grid border is zero,
  so every loop closes; the grid is offset by an irrational fraction of a
  cell so no sample lies exactly on a nodal plane). Nodal lines are the
  `ψ = 0` level set, clipped to the hull of the outermost contours. Cloud
  pages keep random points with probability `(ρ/ρ_max)^0.55`. A slice lying
  in a nodal plane (2p_z cut by xy) is drawn as an empty circle marked
  "nodal plane" rather than contouring rounding noise. Line art keeps at
  most five levels per sign, drops regions under 40 mm² and is checked for
  colourability.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every contour loop closes; all ink
  on the page. Tests prove each radial function normalised (∫R²r²dr = 1 to
  1e-6 for n ≤ 5) with `n − l − 1` radial nodes, each real spherical
  harmonic normalised, the full ψ normalised by a 3D sum (1s, 2p_x, 3d_xy),
  `l` angular nodes (2l sign changes round a circle for m = 0; `l − |m|`
  Legendre zeros plus `|m|` nodal planes in general), the best plane for
  2p_z, 3d_xy and 3d_yz, and ψ ≈ 0 along every drawn nodal line. Meta
  carries `"verification": "exact_hydrogen_wavefunctions"`.
