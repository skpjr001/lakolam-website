---
title: "Match the Shadow"
blurb: "Shadow matching — draw a line from each picture to its shadow; harder pages turn or flip the shadows and add decoys"
category: puzzle
version: "1.1.0"
---
Pictures on one side, black shadows on the other. Which shadow belongs to
which picture?

## What it is

A matching page for young children. A column of pictures (an apple, a
boat, a rabbit) faces a column of solid shadows in a different order. On
easy pages every shadow stands just like its picture. Harder pages turn
some shadows round, flip them to face the other way, or both, and add one
or two shadows that belong to no picture at all.

## How to play

Look at the first picture and its outline: the bumps, the points, the
corners. Find the shadow with exactly that outline and draw a line from the
dot beside the picture to the dot beside the shadow. Do the same for every
picture.

- If the page says some shadows **face the other way**, imagine the picture
  in a mirror.
- If it says some shadows are **turned**, tip your head or turn the page to
  check.
- If it says a shadow **has no picture**, one shadow will be left over at the
  end. Cross it out.

## Purpose

Matching a picture to its silhouette trains visual discrimination: noticing
an object by its shape alone, without colour or inner detail. Turned and
flipped shadows add mental rotation, an early spatial-reasoning skill linked
to later success in geometry and mathematics. Drawing the lines practises
pencil control. The page suits ages three to six.

## History

Shadow matching grew out of the silhouette cut-outs popular from the late
eighteenth century and became a staple of early-learning workbooks, puzzle
boards and flash cards in the twentieth. Mental rotation itself was measured
by Roger Shepard and Jacqueline Metzler in 1971, who found that the time to
match two turned shapes grows with the angle between them, which is why
turned shadows are the harder level here.

## This implementation

- **Spec knobs:** `difficulty` (Kids: upright shadows of pictures whose
  outlines have almost nothing in common, no plane shapes; Easy: upright
  shadows; Medium: some shadows flipped left to right, one decoy; Hard:
  shadows turned by quarter turns, one decoy; Expert: turned and flipped, two
  decoys, all pictures from one family such as all fruit and plants or all
  shapes), `pairs` (3-6), `decoys` (0-2, default by level), `colour`,
  `width`, `height`, `theme` (a seasonal picture pack — `halloween`,
  `christmas`, `easter`, `thanksgiving`, `birthday`, `valentines`,
  `festivals` — or `none` for the classic pictures; pictures come from the
  pack first, and on Expert pages the pack stands in for the one family;
  classic pictures top it up only when the pack runs short of clearly
  different shadows, reported as `theme_pictures`; packs are mostly
  symmetric pictures, so on levels with moves only half of a themed page's
  pictures must be ones a move visibly changes, and the rating counts the
  moves the shadows really show).
- **Generation:** pictures come from the shared `lako-icons` set. At levels
  with moves, only pictures whose shadow a move visibly changes are used (a
  turned circle is no turn). Icons are taken from a shuffled pool one at a
  time, each kept only if it is clearly different from every icon already
  taken under every allowed move. Three in four shadows get a visible move;
  the shadow column is shuffled so no shadow sits level with its picture.
- **Solving:** each picture's shadow is the only one with the same outline
  after an allowed move; decoys match nothing.
- **Guarantees:** checked for every page and re-checked in tests
  (`answers_checked: true`, `unique: true`). For every picture, every move
  the page allows, and every shadow but its own, the two silhouettes are
  clearly different: contour similarity (`lako_icons::similarity`, soft
  overlap of the blurred outline bands) at most 0.3, where the library's own
  line between "same" and "different" is 0.8. The tighter margin keeps out
  pairs a small child would muddle once turned, such as rectangle and door
  (0.41) or arrow and pencil (0.39). Near-twins are kept apart by this same
  pixel check, not by a list: the striped beach ball's shadow is a plain disc
  that scores 0.97 against the circle, so the two never share a page. Every
  allowed set of moves is a group (upright; flip; quarter turns; turns and
  flips), so "matches after some allowed move" reads the same from either
  side. The page is rated by the moves its shadows actually ask for, which
  the symmetry metadata decides (`moves_seen`; a flipped tree is not a flip),
  plus decoys, and Kids additionally needs a measured margin of 0.2
  (`rating_basis: shadow_moves_decoys_and_margin`). A Kids request that
  cannot find pictures that far apart is served as Easy, and an Expert one
  that cannot fill a single family as Hard; `requested_difficulty` records
  the request. The key draws each matching line and crosses out the decoys.
