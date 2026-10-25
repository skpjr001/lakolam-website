---
title: "Symmetric Wave Wallpapers"
blurb: "Symmetric wave wallpapers after Frank Farris: rosettes, friezes, the 17 wallpaper groups and colour-reversing counterchange patterns"
category: design
version: "1.0.0"
---
Smooth, flowing patterns with exact symmetry: rosettes, border friezes, all
seventeen wallpaper groups and two-colour counterchange designs, each drawn
from a single sum of waves.

## What it is

Every page is the contour map of one smooth function that has been made
symmetric on purpose. A few simple waves are added together and then
averaged over every motion of a chosen symmetry group — the turns, mirrors
and glides — so the result repeats exactly as the group says and in no
other way. The bands of the map are filled in a graded palette.

There are four kinds of page. A **rosette** is a round medallion with
p-fold turning symmetry, with or without mirrors. A **frieze** page stacks
several border strips, each repeating along its length in one of the seven
ways a border can. A **wallpaper** fills the page with one of the seventeen
plane symmetry groups. A **colour-reversing** wallpaper uses two colours,
and some of its motions swap them: turn or reflect the pattern and dark
lands exactly on light — the counterchange effect of tiles, textiles and
Escher's prints.

## How to use it

Frame the colour pages as prints, or use them as wrapping paper,
endpapers and backgrounds. Look for the symmetry: find a point the pattern
turns about (two, three, four or six times), a mirror line, or a glide —
a reflection followed by a slide. On a counterchange page, find the motions
that keep the colours and the ones that swap them.

The line-art page is a colouring sheet. Colour the bands in a gradient from
light to dark, or alternate two colours; colouring every motion-matched
band alike keeps the symmetry, and colouring alternate bands of a
counterchange page in two colours rebuilds it.

## Purpose

Symmetry groups are usually taught with stamps and tiles. These pages show
the same groups as smooth, organic patterns, the way Frank Farris made
them: the symmetry is not drawn in afterwards but built into the function,
so the page is a correct example of its group. Every group name is printed
in the page's record, which makes a set of pages a practical classification
exercise.

## History

The seventeen wallpaper groups were classified by Evgraf Fedorov (1891) and
George Pólya (1924); the seven frieze groups and the rosette groups (cyclic
and dihedral) complete the plane's discrete symmetries. Two-colour
(counterchange) groups were studied by Heinrich Heesch and by A. V.
Shubnikov (*Symmetry and Antisymmetry of Finite Figures*, 1951); M. C.
Escher's notebooks of the 1930s–40s explore them by hand. The method here
— building a symmetric function by summing symmetrised waves, written
`zⁿ z̄ᵐ` for rosettes and plane waves `E_nm` in lattice coordinates for
wallpapers — is Frank A. Farris's, from *Creating Symmetry: The Artful
Mathematics of Wallpaper Patterns* (Princeton, 2015). Group notation is the
International (IUC) notation of Conway, Burgiel and Goodman-Strauss, *The
Symmetries of Things* (2008).

## This implementation

- **Spec knobs:** `width`, `height` (points); `kind` (`auto`, `rosette`,
  `frieze`, `wallpaper`, `colour_reversing`); `group` (`auto`; rosettes
  `cyclic`, `dihedral`; friezes `p111`, `p1m1`, `p11m`, `p11g`, `p112`,
  `p2mm`, `p2mg`; wallpapers `p1`, `p2`, `pm`, `pg`, `cm`, `pmm`, `pmg`,
  `pgg`, `cmm`, `p4`, `p4m`, `p4g`, `p3`, `p3m1`, `p31m`, `p6`, `p6m` — on a
  colour-reversing page this names the full group, and the seed picks one
  of its colour-swapping forms); `fold` (rosette order 2–16, 0 = seed's
  choice 3–9); `terms` (waves before symmetrising, 1–8); `bands` (2–40);
  `sectors` (0–6); `palette` (`auto`, `ocean`, `ember`, `garden`,
  `twilight`, `delft`, `ink`); `style` (`colour`, `lines`); `stroke`.
  A `group` from another family than an explicit `kind` (or `p3` on a
  colour-reversing page — it has no subgroup of index two) is refused.
- **Generation:** the function is `f(z) = (1/K) Σ_g χ(g) f₀(g·z)` over
  coset representatives `Rᵏ∘Sᵉ` (rotation `R` of the group's order about
  the origin, `S` a mirror or glide), with `f₀` a sum of seeded waves:
  `e^{2πi(nX+mY)}` in lattice coordinates for wallpapers (the lattice shape
  — oblique, rectangular, rhombic, square, hexagonal — follows the group,
  with seeded proportions), `e^{2πinx}·e^{2πmy}` for friezes. Rosettes are
  sums of `zⁿ z̄ᵐ` with `n − m ≡ 0 (mod p)`, grouped into modes with a
  radial profile `r^{s₀}Π(r² − a)` so petals form rings; `a_nm = a_mn` gives
  the mirrors. Colour-reversing pages set `χ = −1` on the cosets outside an
  index-2 subgroup (odd rotations, mirrors, both, or a half-lattice
  translation) — `pmm/p2`, `p4m/cmm`, `p6m/p31m`, `p4/p4` and so on. The
  page contours `g = |f|·cos(s·arg f − φ)` (`s` = `sectors`): bands at
  quantiles of `g`, traced as closed loops with the field clamped outside
  the drawing region, filled largest first. Colour-reversing pages force
  `s` odd and use an odd number of levels symmetric about zero in two
  alternating colours.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `f(g·z) = χ(g)·f(z)` for every
  representative, checked numerically on every page (meta
  `symmetry_error`, tested below 1e-9 for every group); the representatives
  with the lattice are closed under composition and `χ` is a homomorphism
  (tested for all 17 groups, every colour-reversing form and all 7
  friezes); on counterchange pages every reversing motion maps each band to
  a band of the other colour (tested). Clamped knobs are reported as
  `requested_<field>`; the line-art style reports its colourability check.
