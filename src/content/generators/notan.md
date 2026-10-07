---
title: "Notan"
blurb: "Notan, the expanded square — shapes cut from a dark square's edges and flipped out as exact mirrors, dark area conserved, as a two-tone design, cut template or colouring page"
category: design
version: "1.0.0"
---
The expanded square: shapes cut from the edges of a dark square and flipped
outward, so the square grows into a balanced pattern of dark and light.

## What it is

Notan is the Japanese idea of the balance between light and dark. In the
classic "expanded square" exercise, a square of dark paper sits on a light
sheet. A shape is cut from one of its edges, then flipped out across that
edge like a page turning, and glued down outside the square. The hole it
leaves and the shape beside it are perfect mirror images: one light, one
dark. Repeat on one, two or all four edges and a plain square becomes a
bold, symmetrical design with as much dark as it started with.

## How to use it

Print the colour design as a finished two-tone picture, or make your own.
For the paper version, print the cut template, cut the square out of dark
paper (or trace it onto dark paper), and cut along the dashed line of each
numbered piece. Leave the piece touching the square's edge until you are
ready, then lift it away, flip it over the edge as the arrow shows, and
glue it down exactly where the dotted outline is, its straight side lined
up with the edge it came from. Glue the square itself in the middle of a
light sheet first so the flipped pieces have somewhere to sit. The
colouring version is the same design as outlines: colour each hole and its
flipped twin in opposite colours to keep the mirror effect.

## Purpose

The expanded square teaches positive and negative space in the most direct
way possible: every dark shape outside the square is paid for by a light
shape inside it, so the picture always balances. It is a staple first
lesson in design and art classes, quick to make, and the result looks
striking with only two colours.

## History

Notan (濃淡, "dark-light") is a principle of Japanese painting and design:
the arrangement of light and dark shapes as a composition in its own right.
Arthur Wesley Dow brought the idea into American art teaching in his book
*Composition* (1899), and through his students it became part of school art
programmes. The expanded-square cut-paper exercise grew out of that
teaching and is still one of the most common introductions to positive and
negative space in classrooms today.

## This implementation

- **Spec knobs:** `sides` (auto, one, two_adjacent, two_opposite, four),
  `symmetry` (auto, none, mirror, rotational), `pieces` (most pieces per
  side, 1–4), `shapes` (mixed, straight, curved), `output` (design,
  template, colouring), `palette` (auto, classic black and white, indigo,
  vermilion, forest, plum, kraft), `width`, `height`, `margin`, `stroke`.
- **Generation:** each piece is a profile in side-local coordinates that
  starts and ends on the edge and stays inside the square between, drawn
  from a vocabulary of half-circles, triangles, rectangles, steps, zigzags,
  arches, onion domes, keyholes, waves, sails, quarter-circles and stairs.
  A side's edge is split into equal slots, one piece per slot, and each
  piece is shrunk until it lies inside the side's diagonal triangle with a
  small clearance. Mirror symmetry builds each side from a centred
  symmetric piece plus mirrored pairs and gives opposite sides the same
  cuts; rotational symmetry puts the same cuts on every side. The same
  piece list is mapped onto each edge, and its flip is the same profile
  reflected across the edge line.
- **Solving:** nothing to solve — a design.
- **Guarantees:** checked on every page (`verification: "expanded_square"`):
  each flipped piece is the exact reflection of its hole across the edge;
  the dark area — the cut square plus the flipped pieces, by the shoelace
  formula on the drawn polygons — equals the original square's; pieces on a
  side occupy disjoint stretches of the edge and stay in that side's
  diagonal triangle, so no two holes or flips overlap; every piece meets its
  edge along a segment, so it comes away in one cut. Tests re-check the
  reflection with an independent line-reflection formula, the area from the
  piece polygons alone, disjointness by sampling a grid with point-in-polygon
  tests, and the mirror and quarter-turn symmetries.
