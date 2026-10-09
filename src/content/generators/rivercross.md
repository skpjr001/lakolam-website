---
title: "River Crossings"
blurb: "River crossings — the farmer's boat, hunters that must not outnumber, the night bridge; the fewest crossings or minutes proven by search"
category: puzzle
version: "1.0.0"
---
Get everyone safely to the other side - in the fewest crossings.

## What it is

The oldest family of logic puzzles in print. A farmer must row animals and
food across a river in a small boat, but some of them cannot be left
together when he is away. Hunters and the hunted must never be outnumbered.
Walkers must cross a rickety bridge at night with a single lantern. Each
page holds one or more of these, with a picture of the cast and room to
write a plan.

## How to play

**The farmer's boat.**
- Only the farmer can row. The boat holds the farmer and the number of
  passengers stated.
- Whenever the farmer is on the other side, the animals and food left
  together on a bank must be safe: the rules say who eats or chases whom.
- The boat is never left to cross by itself.

**Hunters and hunted.**
- The boat holds the number of animals stated and needs at least one
  animal in it to row.
- On either bank, if there are any of the hunted animals there, the hunters
  must not outnumber them. Animals in the boat count on the bank where it
  lands.

**The night bridge.**
- At most two may be on the bridge at once, and whoever crosses must carry
  the one lantern, so someone has to bring it back each time.
- Two walking together go at the slower one's pace. Each walker's time
  alone is given.

For every puzzle, find the fewest crossings (for the bridge: the fewest
minutes) to get everyone across, write it in the box, and write your plan
one crossing to a line: who goes over, who comes back.

Taking something back across the river is allowed - and often the trick.
On the bridge, think about sending the two slowest walkers together.

## Purpose

Planning with constraints, and learning to search systematically instead
of guessing: the puzzles are small enough to explore every possibility on
paper. A favourite of computing lessons (state spaces and search), logic
clubs and brain-teaser books.

## History

The wolf, the goat and the cabbage (here a dog, a cat and a fish, and many
other casts) appears in *Propositiones ad acuendos juvenes*, a collection
attributed to Alcuin of York around 800, which also has the jealous
husbands. The missionaries-and-cannibals form became popular in the
nineteenth century, and the bridge-and-torch puzzle with its famous
17-minute answer spread in the late twentieth century, notably as a job
interview question.

## This implementation

**Spec knobs:** `kind` (`mixed`, `farmer`, `outnumber`, `bridge`);
`difficulty`; `puzzles` (1-3); `unique_plan`; `plan_lines`; `name_line`;
page `width`, `height`, `margin`. Clamped values are reported as
`requested_<field>`.

**Generation:** each family has one fixed rule template and only the cast
and numbers vary. Farmer puzzles take 3-6 of 19 pictured animals and foods,
every "eats" pair among them from a fixed food chain, and a boat for one or
two passengers; outnumber puzzles 2-5 hunted animals, 1 to as many hunters,
and a boat for two or three; bridge puzzles 3-6 walkers with different
times (handed out fastest first to a rabbit, dog, cat, chick, hedgehog,
turtle, snail). A candidate is solved and kept when it reaches the band
(and, with `unique_plan`, has one shortest plan); a page never repeats a
puzzle.

**Solving:** Dijkstra's algorithm over every state of the game (who is on
which side, and where the boat or lantern is) gives the least crossings or
minutes exactly, and every plan achieving it is counted. Boat puzzles are
rated by their fewest crossings: Kids 3-5, Easy 6-7, Medium 8-9, Hard
10-11, Expert 12 or more. Bridge puzzles: Easy three walkers, Medium four
where the fastest escorting everyone is best, Hard four needing the two
slowest to cross together (or five without), Expert five or six needing it
(`rating_basis`). A Kids bridge is served as Easy; whenever a band is not
reached the nearest is served and the request reported as
`requested_difficulty`. With `unique_plan` on, a family with no one-plan
puzzle at the band is relaxed and `requested_unique_plan` reported (the
classic wolf, goat and cabbage, for one, has two shortest plans).

**Guarantees:** deterministic per seed; the answer is proved by exhaustive
search and rechecked by an independent Bellman-Ford relaxation and plan
count (and, in tests, by iterative deepening and the classic answers: 7
crossings for the wolf, goat and cabbage, 11 for three and three, 17
minutes for 1-2-5-10); the key's plan is replayed under the printed rules
and costs exactly the answer; the key says whether it is the only shortest
plan. Meta: `unique`, `answers_checked`, `difficulty`, `rating_basis`, and
every puzzle's rules, answer, plan count and plan.
