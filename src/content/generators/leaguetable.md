---
title: "League Table"
blurb: "League Table — deduce every match score from the final table and a few results"
category: puzzle
version: "1.0.0"
---
The final table is printed; the scores are not. Work them out.

## What it is

A small league of three to five teams has finished: every team played every
other team once. The final table shows, for each team, games played (P),
won (W), drawn (D), lost (L), goals for (GF), goals against (GA) and points
(PTS: 3 for a win, 1 for a draw). A few match results are given. Deduce the
score of every other match — there is exactly one way it can have gone.

## How to play

Fill in both boxes of every match. The scores must reproduce the whole
table: each team's wins, draws and losses, the goals it scored and the goals
it let in.

- A team with no losses and no wins drew every game; a team with 0 goals
  against kept a clean sheet in every match.
- Goals for and against tie matches together: a team that scored 1 goal in
  total scored it in exactly one of its games.
- Use the given results first: subtract them from the teams' totals and see
  what is left for the other games.
- The goals scored by all teams add up to the goals let in by all teams —
  a good check at the end.

## Purpose

Arithmetic reasoning in a familiar setting: totals, differences and case
analysis, with a satisfying click when the last score falls into place.
Three-team leagues suit children; five-team leagues with few results given
take real care.

## History

Reconstructing match results from a league table is a classic recreational
mathematics problem, set in puzzle books and magazines for decades. The
teams here are invented.

## This implementation

- **Spec knobs:** `teams` (3–5; null picks by band: Kids 3, Easy and Medium
  4, Hard and Expert 5), `difficulty`, `row` (row height; text scales with
  it), `line`.
- **Generation:** each match's goals are drawn (0–4, mostly 0–2) and the
  table computed. While a second score sheet fits the table and the shown
  results, a match on which the two sheets differ is revealed; the revealed
  set is then trimmed to an irreducible one. A board harder than asked is
  eased by revealing more results.
- **Solving / uniqueness:** an exhaustive count (cap 2) fills the matches in
  fixture order with every score bounded by what the two teams still have to
  score and concede — so no score cap is assumed — checking each team's
  wins, draws, losses and goals exactly when its last match is filled.
- **Rating** (`rating_basis: "teams_and_open_matches"`): Kids = 3 teams;
  Easy = 4 teams with at most 3 open matches; Medium = 4 teams with 4+;
  Hard = 5 teams with at most 7 open; Expert = 5 teams with 8+. With `teams`
  set, other bands are served as the nearest and reported as
  `requested_difficulty`. Meta: `teams`, `matches`, `open_matches`,
  `given_results`, `names`, `scores`.
- **Guarantees:** deterministic per seed; the answer reproduces the table;
  exactly one score sheet fits. Tests re-count small and hard leagues with
  an independent search (last match first, every score up to the largest
  goal total, the table recomputed at the end) and check that every shown
  result at Expert is needed.
- **App:** printable only.
