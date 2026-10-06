---
title: "Chladni Figures"
blurb: "Chladni figures — the nodal lines of a vibrating plate, as a two-colour pattern or sand"
category: design
version: "1.0.0"
---
The patterns sand draws on a singing metal plate: nodal lines of vibration,
as a two-colour pattern, as sand, or as a colouring page.

## What it is

Sprinkle sand on a thin metal plate and draw a violin bow down its edge. The
plate rings, and the sand jumps away from the parts that move and settles on
the lines that stay still. Those still lines are the plate's **nodal lines**,
and each note the plate can sing has its own pattern: crosses and diagonals
on a square plate, rings and spokes on a round one, honeycombs on a
hexagon. The regions between the lines take turns: while one rises, its
neighbours fall. So the pattern can always be coloured with just two
colours, and no two neighbouring regions will ever match.

## How to use it

- **Two-colour pattern (the default):** a finished print. One colour shows
  every region that moves up while the other colour moves down.
- **Sand:** the scientist's view. Light grains gather on the still lines of
  a dark plate, the way Chladni saw them.
- **Colouring page (lines):** colour it with two colours, alternating across
  every line, and the vibration appears. Or treat each region on its own
  and use as many colours as you like.
- **Plates:** square, rectangular, circular or hexagonal. Higher mode
  numbers give finer, busier figures. Two or three modes ringing together
  give the intricate figures, because real plates rarely sing a pure note.

## Purpose

Wall art and colouring pages that are also real physics, and a hands-on way
to show sound made visible. In a classroom it pairs well with the real
experiment: a speaker, a plate and a pinch of salt.

## History

Ernst Chladni, a German physicist and musician, published his sand figures
in *Discoveries in the Theory of Sound* (1787) and toured Europe bowing
plates for audiences. Napoleon was among them and funded a prize for the
mathematics behind them. Sophie Germain won it in 1816 with the first theory
of elastic plates, and Kirchhoff completed it in 1850. Mary Desiree Waller's
*Chladni Figures* (1961) catalogued hundreds of them, and Hans Jenny's
*Cymatics* (1967) took the idea to liquids and pastes. Today the patterns
are used to tune violin backs and guitar tops, where the luthier listens and
looks at the same time.

## This implementation

- **Spec knobs:** `plate` (`auto` | `square` | `rectangle` (3:4) | `circle`
  | `hexagon`); `n`, `m` (square and rectangle: half-waves across and down;
  circle: nodal diameters and the radial index; hexagon: wave numbers; 0 =
  seeded); `modes` (1–3 modes ringing together, 0 = seeded); `mix` (strength
  of the extra modes 0–1, negative = seeded); `style` (`lines` |
  `two_colour` | `sand`, default `two_colour`); `palette` (`auto` |
  `indigo` | `terracotta` | `teal` | `ink` | `brass`); `size` (page side,
  pt); `stroke` (pt).
- **Generation:** each mode is in closed form. On square and rectangular
  plates it is `cos(nπx)cos(mπy) ± cos(mπx)cos(nπy)` (Chladni's own
  approximation, after Ritz). `n = m` with the minus sign is identically
  zero and is never chosen. On circular plates it is
  `J_n(k r)·cos(n(θ − φ))`, where `k` is the s-th zero of `J_n'`: a free
  edge, which is an antinode. Bessel functions come from the trapezoid rule
  on Bessel's integral (96 nodes, machine precision) into a 2,048-entry
  radial table, and the zeros come from a scan plus bisection. Hexagonal
  plates use three standing waves at 120°. Extra modes are partners of
  nearly equal frequency (closest `n² + m²`, or closest Bessel zero), as on
  a real plate. Square partners keep the sign and the parity of `n + m`, so
  the figure keeps both diagonal mirrors. The field is sampled on a
  420-column grid, shifted by an irrational fraction of a cell so that
  symmetry points where nodal lines cross do not fall on samples. It is then
  clamped with the plate's signed distance as `min(f, s·d)`, so the plate
  edge joins the zero set and every positive region is a closed loop.
  Marching squares (`lako_geom::isoline`) traces level 0, figure-eight
  chains are split at their pinch points, loops are simplified (0.2 pt),
  and the sign inside each loop is probed from enclosed samples. The same
  is done for `−f`, to measure the negative regions. The two-colour style
  paints loops from largest to smallest. The sand style throws grains on the
  plate and keeps each one with probability `exp(−(dist/w)²)`, where `dist =
  |f|/|∇f|` estimates the distance to the nearest nodal line, plus a 3%
  scatter. Each grain is a vector dot.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and different seeds give
  different pages. The Bessel values and zeros match published tables to
  1e-6. Traced vertices lie on `f = 0` or on the plate edge. Every nodal
  line closes, with the plate edge (`all_closed`). The colour inside each
  loop is the sign of `f` there, so the two-colouring is proper by
  construction (`two_colourable: true`). The positive and negative region
  areas add up to the plate's area within 2%. The smallest region of either
  sign is reported (`smallest_region_mm2`, `regions_above_floor`). If it is
  under the 40 mm² floor, or the line-art page fails the ADULT gate, the
  page is re-drawn with fresh modes up to three times (`attempt`). Line-art
  pages on all four plates pass the gate across seeds. Sand gathers on the
  nodal lines: most grains sit where |f| is under a fifth of its maximum.
  A page takes under 0.2 s in release builds.
- **Caveats:** the square and rectangular formulas are the classical
  approximation, not exact free-plate eigenmodes (those have no closed
  form). They reproduce Chladni's drawings closely, but not a measured plate
  line for line. The rectangle uses the same family stretched to 3:4.
