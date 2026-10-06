---
title: "Guilloché"
blurb: "Guilloché — woven families of phase-shifted waves: banknote rosettes, bands and certificate frames"
category: design
version: "1.0.0"
---
The fine woven line-work of banknotes, share certificates and watch dials:
families of waves, each one a step ahead of the last, laced into rosettes,
bands and frames.

## What it is

Look closely at a banknote and the background is not a texture but
hundreds of fine lines. Each is a simple wave, and each runs a little ahead
of its neighbour. Together they cross and recross into a shimmering mesh
that is very hard to copy by hand or camera. The patterns sit in bands: a
ring around a rosette, a strip along a border, a frame round a certificate
with its corners cut on the diagonal like a picture frame. Each wave stays
between the two edges of its band and swings from one edge to the other:
a smooth sine, a sine with a ripple inside it, rows of rose-petal arches,
or a wave that throws a small loop each time it turns.

## How to use it

- **Certificate (the default):** a landscape page with a woven frame and a
  rosette medallion in the middle, with room to write or print a title,
  a name and a date. Print it on card for awards, gift vouchers or
  invitations.
- **Rosette:** a single round medallion of woven rings, finished art on its
  own. With the `engraving` style it is a drawing for a laser engraver or
  pen plotter.
- **Band:** woven strips stacked down the page, to cut out as borders,
  bookmarks or labels.
- **Styles:** `banknote` prints coloured inks on tinted paper; `engraving`
  is black lines only with nothing filled, for lasers, plotters and
  single-colour printing.
- **Waves:** leave `wave` on `auto` for a mix, or choose one shape for the
  whole page. A higher `symmetry` gives more petals. `stretch` makes the
  waves longer or shorter, and thicker lines automatically get fewer of
  them.

## Purpose

Wall art, certificates and stationery with the security-printing look, and
clean vector line-work for laser engraving and plotting. It also shows
quite clearly how complex patterns come from simple parts: every curve on
the page is the same wave, shifted.

## History

The word comes from the French *guillocher*. The patterns were first cut by
the **rose engine**, a lathe whose spindle is rocked by a cam
(the "rosette") while the cutter works the spinning piece. Rose engines
decorated ivory in 17th-century European courts and, from the 18th century,
the gold watch cases and enamel dials of Breguet and, later, the eggs of
Fabergé. In the 19th century, the **geometric lathe** turned the same
motions onto steel printing plates. Banknote and bond engravers such as
Cyrus Durand in the United States, and the great security printers, made
the woven rosette a standard defence against forgery, because a copyist
could not reproduce the exact phase of hundreds of lines. Computers took
over in the late 20th century, and the patterns still underlie the
backgrounds of passports and currency.

## This implementation

- **Spec knobs:** `layout` (`certificate` | `rosette` | `band`, default
  `certificate`); `style` (`banknote` | `engraving`); `palette` (`auto` |
  `jade` | `plum` | `rust` | `navy` | `slate`); `wave` (`auto` | `sine` |
  `nested` | `rhodonea` | `trochoid`); `symmetry` (3–24, 0 = seeded from 6,
  8, 9, 10, 12, 16); `tiers` (rings in a rosette or medallion, or bands on a
  band page, 1–6, 0 = seeded); `members` (most curves per family, 0 = as many
  as the density budget allows); `families` (1 or 2 per track, 0 = seeded);
  `stretch` (wave length as a multiple of the band width, 0.5–3, 0 =
  seeded); `width`, `height` (page, pt; the rosette uses the shorter side);
  `stroke` (pt, raised to the 0.5 pt floor).
- **Generation:** each band is a *track* between an inner and an outer
  envelope. A ring track runs between two scalloped circles `r(θ) = R +
  a·cos(mθ)`. A strip runs between two waved edges. A frame track has four
  sides, each running corner to corner on both the outer and inner
  rectangles, so the corners are mitred and one curve goes all the way
  round. Member `i` of a family is the inner envelope point blended toward
  the outer by `s(t) ∈ [0, 1]` at phase `kθ + φ₀ + 2π·spread·i/n`. The
  waves are: sine `½ + ½ sin`; nested sine (a sine at `q` = 2–3 times the
  frequency mixed in at 25–45% weight); rhodonea arches `|sin(arg/2)|`;
  and trochoid (a sine plus a tangential swing of 1.3–2.1 wave lengths ÷ 2π,
  which throws a loop on every wave, faded out over half a wave at strip
  ends and frame corners). A second family, when present, is mirrored
  (measured from the outer edge) and offset by a sixth of a turn, so the
  two weave into a lattice. Ring wave numbers are multiples of the
  symmetry order and scallops are too, so rosettes are exactly S-fold
  symmetric. Each curve is a chain of cubic Hermite segments, eight per
  wave (12 for a trochoid, 16–24 for a nested wave). The knots are
  aligned to the member's own phase, so the cusps of the rhodonea arches fall on knots and are drawn
  sharp. **Density budget:** a family gets as many members as keep the
  track's nominal ink coverage (total line length × stroke ÷ band area)
  under 28%, which is a mean distance between lines of at least 3.6
  stroke widths. If even three members would overflow, the partner family
  is dropped, then the waves are lengthened (wave number × 0.7, staying a
  multiple of the symmetry) until they fit.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and different seeds give
  different pages. Every ring and frame member closes exactly, including
  the seams at the frame's corners (`all_closed`). Every point of every
  non-trochoid member lies on the segment between its two envelopes. Ring
  envelopes never cross. Rosettes are exactly S-fold symmetric (each member
  maps onto itself under a turn of 2π/S, to 1e-6). Strokes are never under
  0.5 pt (`stroke_floor_ok`). Every track keeps nominal coverage at or under
  28% (`density_ok`, `max_coverage`, `min_line_spacing_pt`), and thicker
  strokes get fewer curves. The page passes the vector preflight
  (`preflight`). Engraving pages are black strokes only and pass the
  K-only preflight. Frame sides opposite each other carry the same number
  of waves. A page takes under 0.5 s in release builds.
- **Caveats:** the density budget is nominal: it counts line length and
  ignores the overlap where lines cross. That is conservative on average,
  but locally lines bunch where a family turns at an envelope (where the
  wave is near its crest), which is the guilloché look itself. These are
  not colouring pages (`colorable: false`): the lens-shaped cells between
  crossing lines are far below a crayon's reach.
