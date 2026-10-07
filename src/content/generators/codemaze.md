---
title: "Code the Robot"
blurb: "Code the Robot — write the shortest arrow program that takes the robot to the flag"
category: maze
version: "1.0.0"
---
Write the program that walks the robot to the flag — in as few steps as
possible.

## What it is

A grid with a robot, a flag, some rocks and sometimes a gem or two. Below it
is a row of empty boxes: one box for each command of the shortest program
that takes the robot to the flag, picking up every gem on the way. Exactly
one program fits the boxes.

There are two kinds of command. With **arrows**, each arrow moves the robot one
square up, down, left or right. With **turn-and-go** commands, the robot faces
one way (shown by its black pointer): FORWARD moves it one square the way it
faces, and TURN LEFT and TURN RIGHT turn it a quarter turn on the spot. In
**repeat** mode each box holds a command and how many times to repeat it, so a
straight run of steps fits in one box.

## How to play

Trace a route from the robot to the flag with your finger first. The robot
cannot go through rocks or off the grid, and if there are gems it must pass
over every one before it stops on the flag. Count the squares: your route
must use exactly as many commands as there are boxes — if it needs more, look
for a shorter way. Then write one command in each box, in order. With
turn-and-go commands every turn is a step too, so a route with fewer corners
is often shorter. Check your program by "running" it: move your pencil one
command at a time and make sure you end on the flag.

## Purpose

Unplugged coding for the classroom and kitchen table: planning a route,
writing it as a sequence of instructions, and debugging it by stepping through
— the first ideas of programming, on paper. Arrows suit beginners; the
turn-and-go commands teach that instructions are relative to the robot, not
the page; repeat blocks introduce loops. Other mazes in the collection ask
you to find a route; this one asks you to *encode* it.

## History

Floor robots that follow arrow programs date back to Seymour Papert's Logo
turtle of the late 1960s and the Bee-Bot classroom robots of the 2000s.
"Unplugged" coding worksheets — arrow mazes, robot routes and debug-the-code
cards — spread with the Hour of Code and computing in early-years curricula
in the 2010s, and are now a staple of teacher resource sites.

## This implementation

- **Spec knobs:** `difficulty` (grid Kids 5×5, Easy 6×6, Medium 7×7, Hard 8×8,
  Expert 9×9, each with a target band of program lengths), `size` (0 = the
  level's, otherwise 4–12), `commands` (`arrows` or `turtle`), `repeat`
  (boxes hold run-length blocks), `gems` (0–3), `width`, `height`, `line`.
- **Generation:** start, flag and gems are placed (the flag further away at
  higher levels) and rocks scattered at random. A breadth-first search over
  (square, heading, gems held) counts shortest programs with cap 2. While two
  exist, the generator extracts two different shortest routes and drops a rock
  on a square only the second uses, never on the robot, flag or a gem, and
  repeats; an attempt that cuts the flag off is abandoned. Attempts continue
  until the program length lands in the requested band.
- **Solving:** the page prints exactly as many boxes as the shortest program
  has commands (or, in repeat mode, as it has straight runs), so the unique
  shortest program is the one answer.
- **Guarantees:** deterministic per seed; exactly one shortest program
  (`unique: true`), re-proved independently in `obeys()` — distances to the
  finish by fixpoint relaxation (no queue), the answer replayed command by
  command, and a capped count of every program that length. Rated by program
  length (`rating_basis: program_length`): arrows Kids ≤ 6, Easy ≤ 10,
  Medium ≤ 15, Hard ≤ 21, Expert above; turn-and-go Kids ≤ 9, Easy ≤ 14,
  Medium ≤ 20, Hard ≤ 27, Expert above. A small `size` can make a band
  unreachable; the nearest band is then served and labelled honestly, with
  the request recorded. The robot may pass over the flag before it has every
  gem; the program ends when it stands on the flag holding them all.
