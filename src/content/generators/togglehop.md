---
title: "Toggle Hop"
blurb: "Toggle Hop — hop across lowered bridges, flipping the bridges where you land, to collect every carrot"
category: puzzle
version: "1.0.0"
---
Hop the rabbit from island to island to eat every carrot — but every landing
raises and lowers the bridges around you.

## What it is

A grid of square islands in a lake, lettered across and numbered down.
Neighbouring islands may be joined by a bridge, and each bridge is either
lowered — a flat plank you can cross — or raised: two upturned halves with
water between them. The rabbit starts on one island; carrots wait on
others, and a burrow marks home. The page says how many hops you may use.
Every board can be solved, and the answer key shows a shortest hop order.

## How to play

A hop takes the rabbit across one lowered bridge to the next island. It can
never cross a raised bridge, jump over water, or move diagonally.

Each time the rabbit lands, every bridge touching the island it landed on
flips: lowered bridges rise and raised bridges come down. That includes the
bridge it has just crossed, so the way back is always raised behind it.
Bridges elsewhere stay as they are.

Landing on a carrot eats it. Eat every carrot, then finish on the burrow,
within the number of hops the page allows. Mark each hop on the board as
you go — keeping track of which bridges are up is the whole puzzle. The
answer key numbers the landings in order and lists them by island name
(B3 = column B, row 3).

## Purpose

A planning puzzle with a twist of state: the board changes under your feet,
so a route that looks open may be closed by the time you reach it. It
trains working memory and thinking several moves ahead, and the carrots and
rabbit make it friendly for younger solvers on the small boards.

## History

Puzzles in which each step toggles nearby switches go back to the
"lights out" family of the 1990s and to older lever-and-door mazes. Games
where a hopping animal raises and lowers bridges as it lands became popular
on children's learning-game sites in the 2010s. This version is our own
take on the idea, with printed hop limits and proven shortest answers.

## This implementation

- **Spec knobs:** `difficulty`; `rows`, `cols` 2–6 (null = by band: Kids 3×3,
  Easy 3×4, Medium 4×4, Hard 4×5, Expert 5×5); `bridges` 40–100, the percent
  of neighbouring islands joined by a bridge (null = by band, 90 down to 75);
  `carrots` 1–8 (null = Kids 2, Easy 3, Medium 3, Hard 4, Expert 5; fewer only
  when the seeding walk visits fewer islands, reported as `requested_carrots`); `burrow` (finish at home,
  default on); `slack` 0–9, extra hops allowed beyond the fewest (null =
  Kids 3, Easy 2, Medium 1, Hard and Expert 0); `style` `colour` or `ink`;
  `island`, `line`.
- **Generation:** a random bridge layout (redrawn until every island is
  connected), then a random walk from a random start. A bridge's state at
  any moment is its starting state flipped once per landing on either of its
  ends, so each bridge the walk crosses is given the starting state that
  makes it lowered at that moment; a walk step that would need a bridge both
  ways is not taken. Bridges the walk never crosses start at random. The
  burrow is where the walk ends and the carrots lie on islands it visited,
  so every board is solvable. (Fully random boards almost never are: in a
  probe, 118 of 120 random 4×5 boards had no solution at all.) Walk lengths
  by band: Kids 3–6, Easy 6–9, Medium 9–13, Hard 12–17, Expert 16–26. Up to
  120 boards are tried for the requested band; otherwise the nearest band
  reached is served with `requested_difficulty`.
- **Solving:** breadth-first search (`lako_statesearch::shortest`) over
  (island, lowered bridges as a bitmask, carrots eaten); `count_shortest`
  (cap 2) decides whether the shortest hop list is unique. Hard and Expert
  boards are kept only when it is. A board the 1.5-million-node budget
  cannot settle is discarded, never guessed; boards at the default sizes
  settle in well under 5 ms.
- **Guarantees:** deterministic per seed; `solvable: true`; `optimal_moves`
  is the proven fewest hops (`rating_basis: "optimal_moves"`: Kids ≤ 4,
  Easy 5–7, Medium 8–10, Hard 11–13, Expert 14+); `hop_limit` is the printed
  limit (optimum + slack); `unique_optimal: true` when the shortest hop list
  was proved unique (always on Hard and Expert); `solution` lists the
  landings by island name. The answer is replayed by the rules written out
  afresh before the page is returned, and tests re-prove the optimum and the
  uniqueness with an independent breadth-first search.
