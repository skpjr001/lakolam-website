---
title: "Border"
blurb: "Ornamental borders — frieze-group motif bands and Greek key frames"
category: design
version: "1.3.0"
---
Ornamental bands and page frames built from the seven frieze groups.

## What it is

A motif cell composed from the shared motif library, unfolded along a band by
one of the seven frieze groups — hop, step, sidle, spinning hop, jump,
spinning sidle, spinning jump — and either shown as a single band or placed
on all four page edges as a frame, where the rotated side bands meet the
horizontal ones in corner blocks.

A second family draws the classic line borders instead of motif cells
(`style`):

- **Meander** — the Greek key: one line that turns in a square spiral and
  back out again, every channel one unit wide, period after period.
- **Double meander** — the same line turning twice before it unwinds.
- **Running dog** — the Vitruvian scroll: a chain of wave crests, each
  curling into a spiral, the back of the next wave springing from the foot
  of the last.
- **Key with squares** — key units standing on the base line, alternating
  with squares that carry a small ornament (a saltire, a cross or a dot).
- **Greek key** — one of the four above, chosen per seed.
- **Step fret** — the border of the Andes and of Mesoamerica: a hook that
  winds in a square spiral at the top of a stepped diagonal, interlocking
  with the same figure turned upside down. One line divides the band into
  the two interlocking shapes, one rooted on each rail. (Plain geometry on
  the key's grid — not a copy of any particular textile or frieze.)

In a frame the continuous keys turn the corners with the line itself: the
edge length is solved so every edge holds a whole number of periods and
the key's outer run meets the next edge's exactly at the corner, so the
whole frame is one closed line; the square inside each turn carries a small
corner ornament. The running dog, the key with squares and the step fret
close their corners with a ring or an ornamented square.

## Why it is in the catalogue

The architecture document predicted it: *"the fundamental domain along one
edge plus a corner motif, reflected and rotated to the other edges — which
also gives you page frames and ornamental borders free."* The symmetry
service has carried the seven frieze groups (and their tests) since mandala
needed them; this crate is what they were for. A frame is also the most
reusable page furniture in the catalogue — it wraps any other generator's
work.

## History

The seven frieze groups are the complete classification of one-dimensional
repeating ornament, proved in the 19th century and named in the crystallographic
notation used here (`p1`, `p11g`, `p1m1`, `p2`, `p11m`, `p2mg`, `p2mm`).
Every border in every tradition — Greek key, Celtic knotwork band, Islamic
strapwork, the Andean and Mesoamerican step fret — is one of these seven.
The step fret (the *xicalcoliuhqui* of central Mexico) runs through
two thousand years of Andean weaving and Mesoamerican stone and pottery; its
interlocking half-turned pair makes it a `p2` frieze.

## The implementation's guarantees

- **Additive:** the key family is a new `style` whose default, `motifs`,
  is the original border. A spec without `style` produces byte-identical
  pages to version 1.0 (checked by rendering the defaults, both layouts,
  every group and restricted motif lists before and after) and consumes no
  new randomness; the key styles draw only from their own stream
  (`border/key`), for the corner ornament and the `greek_key` choice.
  The step fret (version 1.2) is additive the same way: it is not one of
  the keys `greek_key` chooses between, so every existing page — motif
  bands and all five key styles — is byte-identical to version 1.1
  (checked over seven specs × six seeds).
- **Step fret geometry:** tested — the fret line over several periods is a
  simple path on the unit grid (no point visited, no unit segment drawn
  twice), so every channel is a full unit wide; it stays a unit clear of
  both rails; its segment set maps onto itself under the half-turn about
  the staircase midpoint (frieze group `p2`, so the two interlocking
  regions are congruent) but not under a vertical mirror (it is handed, not
  `p2mm`); and each period has both hooks' turns and the staircase's steps.
  Both layouts pass the colourability check.
- **Key geometry:** tested — one key period starts and ends on the link row
  one period apart, visits no grid point twice and never reuses a unit
  segment across periods (so every channel is one unit wide); the meander
  bands have half-turn symmetry (frieze group `p2`; the running dog and
  key with squares are `p1`); a meander frame is a single closed line whose
  every step is horizontal or vertical and which maps onto itself under a
  quarter turn about the page centre, so all four corners turn alike; every
  key style in both layouts passes the colourability check.

- **Every one of the seven groups produces a page**, tested individually: a
  group that silently drew nothing would be a hole in the whole point of the
  crate.
- The escalation lever is **fewer, fatter motif rows**. The first version
  shrank the band's depth on retry *and* dropped repeats (which grows the
  cell), and that combination is exactly wrong: motifs got longer and thinner
  at once, turning into slivers, and the area floor rejected 56 regions on
  the third attempt rather than fewer. Depth is now held and the rows within
  it thin out instead.
- Each row draws a distinct motif family — picking randomly per row produced
  bands of three identical petals often enough to look like a bug.
- **Spec knobs:** `layout` (frame / band), `style` (`motifs` — the
  default — `greek_key`, `meander`, `double_meander`, `running_dog`,
  `key_squares`, `step_fret`), `group`, `motifs`, `repeats` (motif bands
  only), `depth`, `size`, `stroke`.
- **Version 1.3.0 — the page clip.** A motif band runs a cell or more past
  each end so it never stops short of the edge; before 1.3.0 that overhang
  was left in the display list as ink up to 417 pt off the page (invisible,
  but outside the page's bounds in every backend). Motif pages now leave out
  the motifs wholly off the page and wrap the rest in one group clipped to
  the page: the picture is unchanged, the
  bytes of every `motifs` page change, and the key styles are byte-identical
  to 1.2.0.
- Rating basis: none — a design. Honesty fields: group, layout, repeats, cell
  and depth in points, attempt; for the key styles, style, group, periods
  per edge, grid unit, depth and corner ornament. The key styles ignore
  `group`, `motifs` and `repeats`: `depth` sets their scale and the
  period count follows from the page.
