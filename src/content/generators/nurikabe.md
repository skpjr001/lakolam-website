---
title: "Nurikabe"
blurb: "Shade a connected wall around numbered islands, with no 2x2 block shaded"
category: puzzle
version: "1.3.0"
---
Shade a connected wall around numbered islands: each number is an island of
exactly that many white cells.

## What it is

A grid with some numbered cells. Cells are shaded ("wall") or left white
("islands"). Every island contains exactly one number and exactly that many
cells; islands may not touch each other orthogonally; the wall is a single
connected mass; and no 2×2 block is entirely wall.

## How to play

A "1" is a complete island — shade all four neighbours. Two numbers that are
diagonal neighbours pinch the cell between them. Grow islands only where their
number still allows; every cell that no island could reach must be wall. Use
the 2×2 rule constantly: three shaded cells in a square force the fourth
white. The wall's connectivity settles the endgame.

On bigger and harder boards, the same ideas go further:

- **Orphans.** White cells must belong to a numbered island. A cell that would
  join white cells no island has room to absorb — or would make an island
  bigger than its number — is wall.
- **Cut cells.** The wall is one piece. If a single undecided cell is the only
  link between two parts of the wall, it must be wall.
- **Finishing an island.** When an island is a few cells short, list the
  ways it can be finished: a cell every way uses is white, a cell every way
  borders is wall. On harder boards, do the same for any island, and a cell no
  island can use in any finish is wall.
- **Pool pressure.** Strike out any way of finishing an island that would leave
  a 2×2 block of wall no other island can reach to break.
- **What if.** When nothing else works, suppose a cell is white (or wall) and
  follow the consequences. If a rule breaks, the cell is the other colour. The
  hardest boards need several of these, and sometimes a supposition inside a
  supposition.

Some boards have a shape: cells cut away from the grid are not part of the
puzzle, and the wall need only be connected through the cells that remain.

## Purpose

The classic shading puzzle, and the workspace's reference for answer-first
generation with **repair**: an invalid layout is nudged legal (join split
walls, break courtyards) rather than resampled. Its island enumeration drove
the shared `lako-grid::polyomino` module.

## History

Nikoli, 1991. Named for the *nurikabe* of Japanese folklore — an invisible
wall-spirit that blocks travellers at night. The puzzle is also published as
Cell Structure and Islands in the Stream.

## This implementation

- **Spec knobs:** `rows`, `cols` (4–20; rectangles allowed), `max_island`
  (1–8, or 1–12 on the ladder path), `island_share`, `difficulty`, `ladder`
  (prove and rate by technique at any size), `mask` (`none`, `corners`,
  `diamond`, `cross`, `ring`: shaped boards with void cells).
- **Generation:** answer first — islands are grown, the rest becomes wall, a
  repair pass fixes split walls and 2×2 courtyards, one number per island is
  read off the layout, and the search proves the numbers admit exactly one
  shading. The solver enumerates each number's possible island as a polyomino
  rather than shading cell by cell.
- **Guarantees:** `count_answers(2) == 1`, with the generated layout checked
  against all four rules *before* the search runs, so a construction bug
  cannot hide behind a solver bug.
- **A lesson recorded:** the polyomino enumeration's obvious pruning bound was
  unsound and silently lost 3 of the 18 three-cell shapes; it was caught only
  because the shape counts (1, 4, 18, 76, 315) are pinned in a test. The
  boards are capped at 128 cells so shapes fit a `u128` and overlap tests are
  single instructions.
- **Knobs that find nothing (v1.1):** a `max_island` of 8 found no 8×8 board,
  and some sizes (8×11) failed for single seeds. Now, only when the
  requested cap finds nothing, a second pass from fresh seeds lowers it a
  step at a time toward 4 (a cap at or below the default is first retried as
  asked); the metadata reports `max_island_used`. Every board that generated
  before is unchanged. A cap of 8 is slow, since its first pass must fail
  before the second runs.
- **Version 1.2 — Easy is reachable:** the rating is a proxy, the number
  share (mean island size against the share of the board the islands
  cover; `rating_basis` names it), and the grower's spread of island sizes
  — one to the cap — lands most boards in Medium, so Easy requests came
  back Medium on a quarter of seeds. Now, only when the first pass finds no
  board in the band asked for, a second pass from fresh seeds grows islands
  of one or two cells (one, for Kids). The first pass is unchanged, so
  every board that matched its request before is byte-identical, as are all
  Medium, Hard and Expert requests. **Reachable bands:** Easy and Medium,
  each served as asked on almost every seed. Kids needs most of the board
  covered by lone cells, which the wall's no-2×2 rule does not allow, and
  Hard and Expert need large islands on a sparse board: aiming the second
  pass there was measured (Hard on 2 seeds in 12, Expert on 1, with one
  generation taking minutes, as big islands are slow to prove unique) and
  dropped. Those requests get the nearest band, with
  `requested_difficulty` recorded.
- **Version 1.3 — 15×15 and 20×20, and honest Hard and Expert.** Boards with
  a side of 12–20, a `mask`, or `ladder: true` take a new path; everything
  else is the classic generator above, byte-identical (a side above 11 used
  to be clamped to 11, so those requests now get the size they asked for).
  The new path is built on a **technique ladder** moved down from the app's
  hint engine and extended: `basics`, `reach` (unreachable cells), `orphan`
  (orphan land and over-full joins), `articulation` (a cut cell of the
  sea-plus-undecided must be sea), `completion` (islands at most three short),
  `shapes` (every finish of every island, capped at 800 states per island),
  `pool` (finishes that leave an unbreakable 2×2 are struck out), `what_if`
  (a supposition followed through the rungs up to `completion`) and
  `deep_what_if` (suppositions inside suppositions, bounded). Every rung is
  sound, so **uniqueness = the ladder settles every cell**, and the settled
  state is checked against the layout and all the rules. Masks are `Wide<7>`
  bitboards (448 cells), so 20×20 and 15×25-class boards fit.
  - **Generation:** answer-first as before, then **local search** instead of
    blind rejection: where the ladder (capped at the cheap rungs, to `pool`)
    stalls, an unsettled cell gets a number moved onto it, a new 1, or is
    joined to or cut from its island; a move is kept when it leaves no more
    of the board unsettled. A layout that stops improving for 150 rounds is
    dropped (six layouts per round). Hard and Expert then **harden** the
    settled board: moves are kept while the board stays settled — by the
    full ladder when the cheap rungs now stall — and ranks no lower (at most
    16 full what-if solves per board, so the cost is bounded). An island
    whose shapes overflow the cap is not listed again in that solve until it
    needs fewer cells.
  - **Rating** (`rating_basis: "hardest_rung"`): Kids = basics only; Easy =
    reach/orphan; Medium = articulation/completion; Hard = shapes/pool, or at
    most 3 what-if steps; Expert = more than 3 what-ifs, or a deep what-if.
    Meta: `hardest_rung`, `what_if_steps`, `rung_steps` (rounds per rung),
    `local_repairs`, and `mask`/`void_cells` on shaped boards. When no
    layout settles at the band's own rungs, a second round climbs one rung
    group (Kids → orphan, Easy → completion) and the nearest band is served
    with `requested_difficulty`.
  - **Reachable bands:** at 20×20 every band is served as asked on most
    seeds; Expert needs room for several what-ifs, so on 12×12–15×15 it is
    reached on some seeds, else Hard (recorded). With `ladder: true` at 8×8
    all five bands are reachable. 20×20 takes 0.1–3 s at islands of 4 (Expert
    3–7 s); Expert with islands of 8–12 takes 5–15 s.
  - **Guarantees:** `ladder settles every cell` (sound rungs), the settled
    state equals the layout, and the layout passes every rule; tests re-prove
    uniqueness with an independent island-shape count (and, at ≤ 11×11, the
    classic search).
