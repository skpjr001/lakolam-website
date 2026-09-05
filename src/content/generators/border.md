---
title: "Border"
blurb: "Ornamental borders — the seven frieze groups over the motif library"
category: design
version: "1.0.0"
---
Ornamental bands and page frames built from the seven frieze groups.

## What it is

A motif cell composed from the shared motif library, unfolded along a band by
one of the seven frieze groups — hop, step, sidle, spinning hop, jump,
spinning sidle, spinning jump — and either shown as a single band or placed
on all four page edges as a frame, where the rotated side bands meet the
horizontal ones in corner blocks.

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
  and depth in points, attempt.
