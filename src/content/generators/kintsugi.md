---
title: "Kintsugi Bowl"
blurb: "A broken bowl, cup or plate mended with gold: a grown fracture network, gold seams and a gold-filled lost shard"
category: design
version: "1.0.0"
---
A broken bowl, cup or plate, mended with gold: every crack becomes a
shining seam, and a lost shard is filled with gold.

## What it is

An invented picture after kintsugi, the Japanese art of repairing broken
ceramics with lacquer dusted with gold. A vessel — a bowl or plate seen from
above, a bowl or tea bowl seen from the side — has been broken by one or
more blows. Cracks run out from each point of impact, wander and fork, and
ring cracks join them round the impact, until every crack reaches the rim or
meets another one. The cracks are drawn as gold seams of varying width, and
one piece on the rim that was lost has been filled entirely with gold. The
glaze can be grey-green celadon with a fine crackle, black raku, or white
porcelain with blue bands.

## How to use it

Follow a seam from the point of impact to the rim; count the pieces the
vessel broke into; find the lost shard. To colour it, choose the line-art
palette, colour the glaze first and the seams last, in gold or yellow, a
little wider in some places than others, as a lacquer brush leaves them.

## Purpose

A quiet page about mending: the repair is not hidden but made beautiful, so
the history of the object becomes part of it.

## History

Kintsugi (金継ぎ, "golden joinery") is a Japanese repair technique in which
broken ceramics are rejoined with urushi lacquer and the seams dusted or
painted with powdered gold, in the manner of maki-e lacquerwork; missing
pieces are rebuilt in lacquer and gilded. It is associated with the
tea ceremony from the 15th–16th centuries — a story, told rather than
documented, credits the shogun Ashikaga Yoshimasa — and with an appreciation
of imperfection and age. Lacquer repairers practise it in Japan today. This
page is an invented picture after the repair art, not a record of any
vessel. Sources: Christy Bartlett, *Flickwerk: The Aesthetics of Mended
Japanese Ceramics* (Herbert F. Johnson Museum of Art, 2008); Freer Gallery
of Art and Arthur M. Sackler Gallery, *Golden Seams: The Japanese Art of
Mending Ceramics* (2009).

## This implementation

- **Spec knobs:** `vessel` (auto, bowl_above, bowl_side, cup_side,
  plate_above), `palette` (auto, celadon, raku, porcelain, line_art),
  `impacts` (1–4, 0 = by seed), `branching` (how readily cracks fork and
  ring), `seam` (average seam width in points), `missing_shard`, `width`,
  `height`, `margin`.
- **Generation:** the vessel outline is a closed polygon (a circle from
  above; a rim ellipse over a superellipse body or a flared tea-bowl wall,
  with a foot ring, from the side). From each impact point (kept well inside
  and apart) four to seven radial cracks are traced in short steps with a
  persistent, slowly wandering heading, forking now and then from one of
  their own vertices. Every step is tested against every segment already
  drawn — rim and cracks — and the first hit ends the crack there, a hair
  past so the crossing is proper; a crack out of steps runs straight on to
  the first thing in its way. Ring cracks start on a radial crack and steer
  round the impact until they meet the next. The fragments are the bounded
  faces of the planar arrangement of rim and cracks. The lost shard is a rim
  fragment of 1.5–9 % of the vessel, filled with gold, fine hatching and
  gold dust. Seams are ribbons whose width wanders with smooth noise, with a
  bright centre line; the glaze is shaded in bands with a crackle mesh.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  fragments_tile_the_vessel_and_every_crack_ends_on_the_rim_or_a_crack`.
  Tested for every vessel over several seeds: the fragments' areas sum to
  the vessel's area and no two overlap; every crack ends within 0.002 pt of
  the rim or another crack and starts at an impact or on another crack; the
  lost shard touches the rim; all ink stays on the page.
