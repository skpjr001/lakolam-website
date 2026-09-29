---
title: "Border"
blurb: "Ornamental borders — frieze-group motif bands and Greek key frames"
category: design
version: "1.1.0"
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

In a frame the continuous keys turn the corners with the line itself: the
edge length is solved so every edge holds a whole number of periods and
the key's outer run meets the next edge's exactly at the corner, so the
whole frame is one closed line; the square inside each turn carries a small
corner ornament. The running dog and the key with squares close their
corners with a ring or an ornamented square.

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
strapwork — is one of these seven.

## The implementation's guarantees

- **Additive:** the key family is a new `style` whose default, `motifs`,
  is the original border. A spec without `style` produces byte-identical
  pages to version 1.0 (checked by rendering the defaults, both layouts,
  every group and restricted motif lists before and after) and consumes no
  new randomness; the key styles draw only from their own stream
  (`border/key`), for the corner ornament and the `greek_key` choice.
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
- Rating basis: none — a design. Honesty fields: group, layout, repeats, cell
  and depth in points, attempt; for the key styles, style, group, periods
  per edge, grid unit, depth and corner ornament. The key styles ignore
  `group`, `motifs` and `repeats`: `depth` sets their scale and the
  period count follows from the page.
