---
title: "Floor-Plan Mystery"
blurb: "Floor-Plan Mystery — place every suspect on the house plan from room and furniture clues, then name who took the treat"
category: puzzle
version: "1.0.0"
---
Someone took the treat! Place every suspect on the house plan, then name
the one who was alone in the room with it.

## What it is

A family-friendly detective puzzle on a square house plan. Five to seven
suspects were standing around the house when the birthday cake (or the
cherry pie, or the cookie jar) went missing. The plan is divided into
rooms and dotted with furniture. A short list of true clues — who was on
a sofa, who stood next to a plant, who was north of whom, who shared a
room — lets you work out exactly where everyone stood. The person who
was the only one in the room with the treat took it.

## How to play

- Every suspect stood on a different square. No two suspects were in the
  same row, and no two were in the same column — so each row and each
  column has exactly one suspect.
- Nobody stood on a table, a plant, a bookshelf or a TV. Chairs, sofas,
  beds and rugs are fine, and so is bare floor.
- The thick lines are walls between rooms. The shaded room is where the
  treat was. Exactly one suspect was in that room — the one who took it.
- "North" means towards the top of the plan, "west" towards the left;
  "somewhere north of" means in any higher row. "Right next to" means on
  a square sharing a side with it, in the same room. "Corner to corner,
  touching" means diagonally next to each other. An outside wall is the
  edge of the house.
- Write each suspect's initial on their square. Start with clues about
  one person, and cross out rows and columns as they fill.
- Harder cases need clues that link two people, and remembering that only
  one person was in the shaded room.
- The hardest cases need a what-if: put someone on a square in your head;
  if that leaves a row, a column or a clue with nobody who fits, they
  stood somewhere else.

## Purpose

A whodunit that is really a logic puzzle: the one-per-row-and-column
rule of the rook placements meets map reading and spatial clues. Short
enough for a coffee break, gentle enough for children solving with a
grown-up, and nobody gets hurt — the crime is a missing cake.

## History

Mysteries solved by placing suspects on a floor plan grew out of logic
grids and murder-mystery puzzle books, and became a popular online
format in the 2020s. This is an original, family-friendly version with
invented names, rooms and furniture.

## This implementation

- **Spec knobs:** `difficulty` (number of suspects and the hardest step
  needed), `treat` (auto, cake, pie, cookies), `width`, `height`,
  `margin`.
- **Generation:** the n×n plan is cut into n−1 or n rectangular rooms
  (guillotine cuts, every room at least three squares), named from twelve
  room kinds. Suspects (distinct initials) get a random row and column
  each; the scene is a room holding exactly one of them, and the treat sits
  on a table on a free square there. Furniture follows each room's kind;
  suspects' squares get only furniture that can be stood on. Every true
  fact — room, not-in-room, on furniture, on bare floor, next to
  furniture, corner, outside wall, row or column (rare), north of, west
  of, same room, different rooms, corner to corner — goes into a pool
  drawn in weighted seeded order. Facts are added until the ladder,
  capped at the band's rung, places everyone; then each is removed again
  if the ladder still places everyone without it.
- **Solving:** a sound ladder over each suspect's candidate squares.
  *Basic*: clues about one suspect; a suspect confined to one row or
  column owns it; a row or column only one suspect can use is theirs.
  *Relation*: clues relating two suspects (a square stays only while some
  square of the other fits), and exactly one suspect in the scene room.
  *What-if*: place a suspect on a square, follow the lower rungs, reach an
  empty row, column or candidate list.
- **Guarantees:** deterministic per seed; every clue is true; the culprit
  is the only suspect in the scene room; the ladder places every suspect,
  and an exhaustive search over the candidate squares (cap 2) finds
  exactly one placement. Tests re-count by enumerating every assignment of
  rows and columns (n!², 25 million for seven suspects) and check that no
  clue is spare. Rated by the hardest rung and the number of suspects
  (`rating_basis: hardest_rung_and_size`): Kids 5 suspects with basic
  steps; Easy 5 with relations; Medium 6 with relations; Hard 6 with a
  what-if; Expert 7 with a what-if. Each band was served as asked on 8 of
  8 seeds; a case builds in under 0.6 s. A band not reached is reported
  as `requested_difficulty`. The app gets the board, a check and a hint
  that names the next suspect to place, the rung and the clues read.
