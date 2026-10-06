---
title: "Art Deco"
blurb: "Art deco panels: stepped sunbursts, fan scales, arches and chevrons in mirror symmetry"
category: design
version: "1.0.0"
---
Mirror-symmetric panels in the style of the 1920s and 30s: stepped
sunbursts, fan scales, nested arches, chevrons and speed lines inside a
stepped frame.

## What it is

A framed decorative panel, the same on its left and right like the front of
a building of the jazz age. A gold border band steps in at every corner.
Inside, a central feature sits between two side bands and above a stepped
base: a sun rising from a plinth with its rays cut back in steps; a set of
nested arches with a round sunburst in the crown; or a wall of fan-shaped
scales with a round medallion in the middle. Side bands carry stacked
chevrons or tall speed lines topped with discs.

## How to use it

Print the gold-on-black version as wall art, a party invitation backdrop or
a book cover; the jade and cream palettes suit softer rooms. For colouring,
print the line-art version and work symmetrically: whatever you do on the
left, repeat on the right. Metallic gold pens on black paper give the
period look; alternating two colours in the rays and chevrons gives the
movement.

## Purpose

Art deco is ornament made from rulers and compasses — rays, arcs, steps
and repeats, always balanced about a centre line. A small grammar of zones
(frame, focus, flanking bands, base) and a vocabulary of a few motifs give
pages that read immediately as the style while staying exact and varied.

## History

Art deco takes its name from the 1925 Exposition Internationale des Arts
Décoratifs et Industriels Modernes in Paris, though the term itself became
common only in the 1960s. Drawing on Cubism, the geometry of the machine
age, and ancient sources newly in the news — the stepped pyramids of
Mesoamerica and the treasures from Tutankhamun's tomb, found in 1922 — it
spread through architecture, furniture, posters, jewellery and cinema
interiors. The Chrysler Building's sunburst crown, the stepped skyscraper
silhouettes of New York, the fan motifs of Miami Beach and Napier, and the
chevrons and speed lines of streamlined design are among its signatures.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`, `template` (auto, sunrise,
  arches, fans), `palette` (gold_on_black, jade, cream), `line_art`,
  `stroke`.
- **Generation:** the frame is a band whose opening has three ziggurat
  steps at each corner, with a thin rule inside it. The content zone is
  split into flanking bands, a focus and a base. A sunburst has an odd
  number of rays (one stands on the axis) alternately inked, its ray ends
  cut back in three to five steps toward the sides, over a half sun with a
  ring. Fan fields put a whole number of fans in each row, offset rows by
  half a fan and finish them with quarter fans, so a field fits its zone
  exactly; each fan is three nested half discs with radiating lines. In
  colour later rows paint over earlier ones; in line art each fan is drawn
  as only its visible part (below its own arc, above the arcs of the next
  row), and fans that would pass under the sunburst, arches or medallion
  are left out, since an outline cannot hide what lies under it. Arches
  are nested round-topped shapes sharing a base line; chevrons are stacked
  and centred in their band; the plinth steps widen downward.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Tested: every composition is
  mirror-symmetric about the page's centre line, mark for mark (same ink,
  same area centroid) — and a shifted axis is not; every mark of the
  composition lies inside the content zone and the frame inside its outer
  rectangle; flanks, focus and base nest without overlap; the stepped frame
  has exactly the band area its construction implies; fan fields fill
  their zone edge to edge; only palette inks are used; line art passes the
  adult colourability check (pieces too small to colour are inked solid).
