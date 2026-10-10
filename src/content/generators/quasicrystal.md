---
title: "Quasicrystal"
blurb: "Quasicrystal wave art: n plane waves at equal angles summed and contoured into equal-area bands — ordered, n-fold symmetric, never repeating — as line art to colour or palette bands"
category: design
version: "1.0.0"
---
Waves from many directions added together: a pattern that is ordered
everywhere and never repeats, as line art to colour or bands of colour.

## What it is

Drop pebbles into a pond and the ripples cross and add up. Do the same with
straight waves, all with the same wavelength, coming from directions spaced
evenly round a circle, and the sum is a quasicrystal pattern: rosettes, stars
and rings that echo each other across the page, though no patch is ever
exactly repeated. With five, seven, eight or twelve directions the pattern
has a symmetry no wallpaper or tiled floor can have. The page draws the
contour lines of this sum, like the height lines on a map. The lines close
into rounded regions to colour, or the bands between them are filled with a
run of colours from dark to light.

## How to use it

- **Line art (the default):** a colouring page. Every line closes, so every
  region can be filled. A good start is to colour every region of the same
  ring alike, so the star or rosette at the centre shows; or shade by height,
  dark in the troughs and light on the crests.
- **Colour:** the bands are already filled from a palette: sunset, ocean,
  forest, berry, rainbow or ink blue. Print it as wall art.
- **Waves:** the number of directions. Five gives tenfold stars, seven
  fourteenfold, eight and twelve the eightfold and twelvefold patterns of
  real quasicrystals. Three, four and six repeat like a crystal or a tiled
  floor.
- **Wavelength** sets the size of the pattern; **levels** sets how many
  contour lines cut each wave.
- **Phases:** aligned puts a perfect rosette at the centre; seeded shows an
  off-centre patch with no single centre.
- **Phase:** shifts every wave together. Stepping it from 0 to 1 gives the
  frames of the famous animation, where the pattern seems to flow outwards
  for ever.
- **Frame:** a circle, or the whole page.

## Purpose

Wall art and colouring pages with real mathematics behind them: a hands-on
way to show interference of waves, rotational symmetry, and why a pattern can
be ordered without repeating. The default is a twelvefold rosette, which
makes a strong colouring page and a striking print.

## History

In April 1982 Dan Shechtman, at the US National Bureau of Standards, saw a
tenfold electron-diffraction pattern from a rapidly cooled aluminium-manganese
alloy. The crystallographic restriction says a periodic crystal can only have
2-, 3-, 4- or 6-fold rotational symmetry, so the result was doubted for
years. It was published by Shechtman, Blech, Gratias and Cahn in *Physical
Review Letters* (1984), and Levine and Steinhardt named such materials
*quasicrystals* the same year. Shechtman received the 2011 Nobel Prize in
Chemistry. A quasicrystal's diffraction pattern is a set of sharp spots with
forbidden symmetry; the simplest field with exactly such a spectrum is a sum
of plane waves whose directions are equally spaced, which is what this page
draws. The mathematics goes back to Harald Bohr's almost periodic functions
(1920s), and the same order without repetition appears in Penrose's tilings
(1974) and in N. G. de Bruijn's multigrid construction (1981) of them. As
art the wave sum became widely known in October 2011, when Keegan McAllister
posted "Quasicrystals as sums of waves in the plane", a short Haskell
program whose animations were widely shared and ported to other languages.

## This implementation

- **Spec knobs:** `style` (`line` | `colour`); `palette` (`sunset` | `ocean`
  | `forest` | `berry` | `rainbow` | `ink_blue`, colour style only); `waves`
  (directions n, 3-17; 0 = seeded from 5, 7, 8, 9, 12); `wavelength` (pt,
  12-400; 0 = seeded, 8.5-13% of the content's shorter side); `levels`
  (1-16; 0 = seeded, 3-4 for line art, 6-9 for colour); `phases`
  (`aligned` | `seeded`); `phase` (common phase in turns, 0-1); `frame`
  (`circle` | `page`); `width`, `height` (144-2000 pt, Letter by default);
  `margin` (0-144 pt); `stroke` (0.75-4 pt). Out-of-range values are clamped
  and reported as `requested_<field>`.
- **Generation:** the field is `f(x,y) = (1/n) sum_j cos(k (x cos t_j + y sin
  t_j) + p_j + 2 pi phase)` with `t_j = rotation + 2 pi j / n`,
  `k = 2 pi / wavelength`, measured from the centre of the content box. The
  rotation (within one n-th of a turn) and seeded phases come from the seed.
  It is sampled at 16 points per wavelength. Colour levels sit at the
  quantiles `i/(L+1)` of the samples inside the frame, so the `L+1` bands
  cover equal areas. Line-art levels move each quantile halfway to an even
  step between the 4% and 96% quantiles: equal-area levels crowd near zero,
  where most of the field lies, and stack a rosette's rings into slivers.
  Outside the frame (circle or content box) the field is clamped below the
  lowest level, so every level line closes along the frame, under the frame
  line. Marching squares (`lako_geom::bands`) traces closed loops, splits
  figure-eight pinches, and simplifies them to 0.2 pt. Line art drops loops
  under 320 pt² (just over the 40 mm² adult colouring floor) and strokes the
  rest in black. Colour paints loops from largest to smallest, filled with
  the palette colour of the band inside. If a line page fails the ADULT
  colourability gate, it is redrawn with one level fewer and a 15% longer
  wavelength, up to three times, and only with knobs the seed chose
  (`attempt`).
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and different seeds give
  different pages. With aligned phases the field is exactly n-fold symmetric
  about the centre for every n from 3 to 17 and every common phase. For odd
  n with phase 0 it is also even, so 2n-fold. Seeded phases break the
  symmetry. With 3, 4 or 6 directions the field has a translational period.
  With 5, 7, 8 or 12 it has none: a period would need every `e_j . T` to be
  a whole number of wavelengths, and no integer choice for the first two
  directions within 40 wavelengths comes within 0.01 for the others. The
  field also visibly differs under the best near-period. The algebraic
  reason is that `2 cos(2 pi / n)` is irrational outside n = 1, 2, 3, 4, 6.
  Traced vertices lie on their level or on the frame, and every level line
  closes (`all_closed`). Colour levels split the field into equal-area
  bands within 3%. All ink lies inside the margins. The default line page
  passes `check_colorability` with ADULT rules across seeds. The meta
  records everything that reproduces the field (`waves`, `wavelength_pt`,
  `rotation_deg`, `wave_phases_rad`, `phase_turns`, `centre`,
  `level_values`), and the field rebuilt from it matches. A page takes about
  30 ms in release builds.
- **Caveats:** for even n, opposite directions pair into standing waves, so
  only n/2 directions are distinct (`distinct_directions`). With aligned
  phases and phase 0, n = 10 draws exactly the n = 5 page (and 14 the 7, 6
  the 3); a common phase or seeded phases separate them. High n (9 and up)
  fill the centre with near-circular rings, since the sum tends to a Bessel
  function `J0(kr)` there. Line-art levels are not equal-area (see above);
  `level_basis` in the meta says which rule was used.
