---
title: "Bookbinding guides"
blurb: "Bookbinding guides — Japanese stab-binding hole templates with a sewing route proven to make every stitch and end at the tie, pamphlet-stitch and coptic punching guides, case-binding cover layouts"
category: design
version: "1.0.0"
---
Hole templates and sewing routes for Japanese stab binding, pamphlet
stitch guides, coptic punching guides and case-binding cover layouts.

## What it is

A printed guide for binding a book by hand. For **stab binding** — the
Japanese style sewn through the whole book near the spine, the thread
showing as a pattern on the cover — it gives a full-size hole template, a
picture of the finished stitching and the sewing route step by step. Four
patterns are offered: yotsume (four-eyed, one row of holes), kōki (noble:
yotsume with the corners reinforced), a two-row zigzag and a diamond
lattice, each with any number of holes from three to nine. **Pamphlet**
stitch sews a single folded booklet through its fold. **Coptic** gives the
punching guides for the signatures and the covers. **Case** lays out the
boards, spine strip and cover cloth of a hardback case.

## How to use it

1. Print at 100 % and check the 1 cm box.
2. Stab binding: square up the pages and covers and clamp them. Lay the
   template on the front cover with its thick edge along the spine and
   the top at the head, then punch or drill straight through at every
   hole. Thread a needle with about five times the book's height of
   thread and follow the route: start between the leaves so the tail is
   hidden, sew every step in order, and tie off on the back with the tail
   at the starting hole, pushing the knot into the hole.
3. Pamphlet: fold the booklet, lay the guide in the fold and pierce each
   hole from inside. Start inside at the middle hole, leaving a tail,
   follow the route and tie off with the tail.
4. Coptic: fold every signature, lay the signature guide in each fold and
   pierce the stations. Punch both covers along the spine edge with the
   cover guide. The first and last stations take the kettle stitch.
5. Case: cut the boards, spine strip and cloth to the sizes listed, glue
   the boards and strip to the cloth with the joints between them, cut the
   corners, turn in the edges, then glue the text block in by its
   endpapers.

## Purpose

Binding guides are fiddly to draw by hand, and a route that misses a
stitch or ends at the wrong hole leaves a binding that cannot be tied
off. Every route here is followed thread-step by thread-step before it is
printed: it makes every stitch in the picture exactly once and ends where
it began.

## History

Stab binding (fukuro-toji) was the usual Japanese, Chinese and Korean way
of binding books for centuries, and its named patterns — yotsume, kōki,
kikkō, asa-no-ha — are still taught. Coptic binding, with its exposed chain
stitches, goes back to the early Christian books of Egypt; the pamphlet
stitch is the simplest of all single-signature sewings; case binding has
been the standard hardback since the 19th century.

## This implementation

- **Spec knobs:** `kind` (`stab`, `pamphlet`, `coptic`, `case`);
  `pattern` (stab only: `yotsume`, `koki`, `zigzag`, `diamond`); `holes`
  (stab 3–9 by the spine; pamphlet odd 3–9; coptic 2–8 sewing stations
  between the kettle stations; ignored for a case); `book_height_cm`
  (8–25); `book_width_cm` (5–30); `thickness_mm` (2–60); `look`; `page`;
  `margin` (inches).
- **Generation:** stab holes sit 8 mm + a quarter of the thickness from
  the spine (at most 18 mm), spread evenly between margins of a tenth of
  the height; a second row, where the pattern has one, is twice as far
  out. The front stitches are mirrored on the back, so every hole has as
  many stitch ends on each side and an alternating circuit exists. The
  route pairs, at every hole and side, each stitch end with a pass
  through the hole (a seeded pairing), then splices the closed loops this
  makes into one by swapping two pairings at a shared hole (Kotzig's
  argument for alternating Euler circuits). The route is cut open at a
  pass through the middle hole, giving a start and a tie at the same
  place. Holes are numbered from head to tail. More holes than the height
  allows at 10 mm apart are reduced and recorded as `requested_holes`;
  an even pamphlet count is raised by one. A template taller than the page
  shortens the book, recorded as `requested_book_height_cm`. Coptic
  kettle stations sit 6 % of the height (8–15 mm) from head and tail; the
  covers are punched 5–10 mm from the spine edge. Case boards stand 3 mm
  proud at head, tail and fore-edge, start 4 mm from the spine, joints are
  two board thicknesses plus 2 mm, turn-ins 15 mm. The seed picks the
  thread and cover colours and the route.
- **Solving:** nothing to solve.
- **Guarantees:** `binding_checked`. Stab and pamphlet: the thread is
  simulated from its start; every step begins where the thread is, runs
  stay on their side, wraps and passes change side, stitches and passes
  alternate, every drawn stitch is made exactly once, and the thread ends
  at the tail; holes keep clear of the edges and each other. Coptic:
  kettle stations 8–15 mm from head and tail, stations at least 10 mm
  apart and symmetric. Case: the cloth equals turn-ins + boards + joints
  + spine exactly, boards overhang by the square, the spine strip spans
  the block and both boards. The tests replay every route independently
  for every pattern and hole count.
