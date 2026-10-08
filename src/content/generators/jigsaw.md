---
title: "Jigsaw puzzle templates"
blurb: "Jigsaw puzzle templates: colour or blank cut sheets, big kids' pieces, heart, circle, star and hexagon puzzles, numbered assembly keys"
category: design
version: "1.0.0"
---
Cut lines for a jigsaw puzzle of your own: a colour sheet, a blank to draw on, big pieces for small hands, or a heart, circle, star or hexagon.

## What it is

A printable sheet of jigsaw cut lines. Every place where two pieces meet carries one classic knob, a narrow neck and a round head, so the pieces lock together. Choices:

- **Shape:** a rectangle filling the page, or a heart, circle, five-pointed star or hexagon. In the shapes the pieces sit in rings around a centre piece, and the rings follow the outline.
- **Look:** every piece tinted with neighbours in different colours, or blank black lines to draw or colour your own picture on.
- **Kids:** at most 24 big pieces, bigger knobs, more room between knobs and thick, easy-to-follow cut lines.
- **Name puzzle:** a word or name drawn large across the puzzle in outline letters, to colour before cutting.
- **Numbered:** every piece carries a number, and a second page, the assembly key, shows where each number goes.

## How to use it

1. Print the page. For a sturdy puzzle, glue the print to thin card (a cereal box is fine) and let it dry under a book.
2. If the page is blank or has a name on it, draw and colour your picture first. Coloured pencils and felt pens both work.
3. Cut along the lines with scissors or a craft knife. Cut along each wavy line between pieces first, then around the knobs; go slowly round the necks.
4. Mix up the pieces and put the puzzle back together. Start with the edge (or, on a heart or circle, the centre piece) and work outwards.
5. On a numbered puzzle, the assembly key shows where every numbered piece goes; print it on its own sheet for a helper or a younger child.

## Purpose

Make-your-own jigsaws are a classroom, party and wedding-guestbook favourite: children draw on a blank puzzle and get to take it apart again, and a puzzle with a name on it makes a cheap, personal gift. Printed templates are often just a grid of identical pieces with knobs that crowd each other at the corners, or squeezed into a heart with slivers along the edge. Here every piece is a clean closed shape and every knob has room.

## History

The first jigsaw puzzles were dissected maps, cut from wood by the London engraver John Spilsbury in the 1760s to teach geography. They were cut with a fret saw, later a jigsaw, which gave the toy its name. Interlocking knobs came with die-cut card puzzles in the early twentieth century, and the jigsaw craze of the 1930s Depression made them a household staple. Blank puzzles for children to decorate became a classroom favourite later in the century, and shaped puzzles — hearts, circles, stars — are a familiar gift and party format.

## This implementation

- **Spec knobs:** `shape` (`rectangle`, `circle`, `heart`, `star`, `hexagon`); `pieces` (4–300, 4–24 for kids); `kids`; `look` (`colour`, `blank`); `numbered`; `text` (up to 12 characters); `knob_size` (0.6–1.4); `jitter` (0–1); `line` (cut-line weight, doubled for kids); `page`, `landscape`, `margin`.
- **Generation:** a rectangle is a grid of rows × columns chosen for the exact piece count with near-square pieces (or the nearest count, recorded as `requested_pieces`), its inner corners jittered and its lines gently waved. A shape is a polar mesh: rings whose boundaries are the outline drawn smaller (blended towards a circle in the middle), each ring split into sectors whose count gives equal-sized pieces and exactly the requested count. Each ring's cuts are slid, within a third of a sector, away from the cuts of the ring inside and away from the outline's notches; a cut that cannot clear an inner one is put exactly on it, so four pieces meet there. Knobs go on the shortest edges first: a seeded side, position and size, flipped, moved along the edge (to its straightest stretch) or shrunk until the knob keeps the clearance from every other line, corner and knob and leaves both pieces simple; an edge left without room lifts the knobs around it, takes its place, and they are placed again. A layout that still fails is laid out again from the next seed stream (then with the next ring plan, then with 0.6 × the clearance — `layout_attempts` in the meta). The clearance is 1.5 mm (3 mm for kids), or a tenth of the typical piece width when pieces are smaller than that; the meta gives it as `clearance_mm`. Touching pieces are coloured differently by a most-constrained-first colouring with six colours.
- **Solving:** nothing to solve; the assembly key (numbered mode) shows where each piece goes.
- **Guarantees:** `pieces_checked`, re-checked from the finished cut lines before the page is drawn: every piece is a simple closed curve; the pieces' areas add up to the outline's area, so they tile it with no gap or overlap (the tests also sample points and find each in exactly one piece); every edge is walked once each way by the two pieces it separates; every interior edge carries exactly one knob, cut by the line both pieces share, and no outline edge has one; every knob keeps the clearance from every other edge, knob and corner; every piece has at least two neighbours. Heart, circle, star and hexagon pieces vary more in size than rectangle pieces (`area_ratio` in the meta), most in big star and heart puzzles.
