---
title: "Racetrack"
blurb: "Racetrack — the graph-paper vector race as a solo puzzle: reach the finish in the par, proven by search over position and velocity"
category: puzzle
version: "1.0.0"
---
Steer a car round a graph-paper circuit where speed carries over — and beat
the par.

## What it is

A racetrack drawn on squared paper: a grey band of squares with a start dot
and a chequered finish line, either a closed circuit (one lap in the
direction of the arrow) or a winding road from a start line to a finish
line. The car moves from grid point to grid point, keeping its speed from
one move to the next. The page gives the par — the fewest moves anyone can
reach the finish in — or asks for it, and the answer key draws one line
that does it.

## How to play

- The car starts on the dot, standing still.
- Each move, the car first repeats its last move — the same number of
  squares across and the same number up or down — and then may change that
  by one square in either direction, across, up or down, or both. So the car
  lands on the point the repeated move reaches or on one of the eight points
  around it. On the first move that means one of the eight points next to
  the start (or staying put).
- Draw a straight line for each move. The whole line must stay on the grey
  track; running along or touching the edge is allowed, cutting a corner
  across the white is not.
- The race ends with the move whose line reaches the chequered finish line;
  only the part of that move up to the line has to be on the track. On a
  circuit, go once round in the direction of the arrow — you may not cross
  the line backwards.
- Plan ahead: a fast car cannot stop quickly, so slow down before bends.
  Try to finish in the par.
- With two players, take turns on the same track, each with a pencil of
  their own colour; the first to the finish wins.

## Purpose

Racetrack turns velocity and acceleration into something you can see: each
move is a vector, and the change from one move to the next is an
acceleration of at most one square in each direction. It is a classic way
to teach vectors and planning, and as a solo puzzle "beat the par" becomes
a search for the best line, with a known target.

## History

Racetrack (also Vector Rally or Graph Racers) is a pencil-and-paper game
popular in schools since at least the 1960s; Martin Gardner described it in
his *Scientific American* column in January 1973, crediting it to French
origins. It has been used in physics teaching ever since, and computer
versions and "optimal line" puzzles followed.

## This implementation

- **Spec knobs:** `difficulty`; `shape` (`loop`, `sprint`); `show_par`
  (print the par as the target, or ask for the fewest moves); page `width`,
  `height` and `line` (clamped, reported as `requested_*` in meta).
- **Generation:** the track is every square whose centre lies within half a
  track width of a smooth centre line — a wobbly loop for a circuit, a
  spline through random points for a sprint (cut square at both ends) —
  rejected if the centre line comes back near itself. The grid and width
  grow with the level (22 × 15 squares and width 4 for Kids, up to 40 × 30
  and width 3 for Expert). The start/finish line of a loop crosses the
  bottom of the loop on a grid line where the track is straight.
- **Solving:** a breadth-first search over every reachable state —
  position and velocity — from the start at rest. A move is tested exactly:
  its line is cut wherever it crosses a grid line, and the middle of every
  piece must lie in a track square (squares are closed, so the edge counts as
  track). The first state to reach the finish gives the par, and its line
  becomes the key.
- **Guarantees:** `par_proven` — the par is the exact minimum (breadth-first
  search visits every shorter possibility first); the key's line is replayed
  under the rules (start at rest, at most one square of change per move,
  every move on track, the last reaching the finish). Many lines may reach
  the par; any is correct, and `unique` refers to the par itself. Tests
  re-prove the par with a second search using an independent on-track test
  (exact rational points along every move, integer arithmetic only), and
  check the track is connected and the key replays. Rated by the par
  (`rating_basis: par_moves`), per kind of track: a lap of a loop is Kids
  up to 15 moves, Easy 16-18, Medium 19-22, Hard 23-26, Expert 27 or more;
  a sprint is Kids up to 5, Easy 6-7, Medium 8-10, Hard 11-13, Expert 14 or
  more. The generator tries tracks at the requested
  level and then its neighbours; if no track lands in the band, the nearest
  band is served and `requested_difficulty` is recorded.
