---
title: "Secret-Message Maze"
blurb: "Secret-message maze — the one true path passes letters that spell a riddle's answer or a cheer"
category: maze
version: "1.0.0"
---
A walled maze with letters along the way: the one true path spells the
answer to the riddle — the dead ends only spell nonsense.

## What it is

A classic walled maze with a reward hidden inside it. Some squares hold a
letter. The letters on the one path from START to FINISH, read in order,
spell a message: the answer to a riddle printed above the maze ("What has
hands but cannot clap?"), or a cheer such as WELL DONE. Letters also sit in
the dead ends, so wandering the wrong way picks up decoys that make no
sense. A row of blanks at the foot of the page shows how many letters each
word has.

## How to play

1. Read the riddle (if there is one) at the top of the page.
2. Find the way through the maze from START to FINISH, drawing a line as you
   go. You cannot cross a wall.
3. Write down each letter your path passes through, in order, in the blanks
   at the bottom of the page. They spell the answer.

If the letters make no sense, you have taken a wrong turn into a dead end:
go back and try another way. There is exactly one path from START to
FINISH.

## Purpose

The maze trains planning, visual tracking and patience; the letters turn
it into a reading and spelling task with a built-in check — if the message
reads, the path was right. Teachers use these pages for spelling words,
holiday messages and end-of-lesson rewards.

## History

Mazes with letters or pictures to collect along the solution are a staple
of children's activity books and classroom worksheets, often under names
such as "secret message maze" or "riddle maze". They pair the very old
puzzle of the labyrinth with the riddle and the hidden-word reward familiar
from puzzle magazines.

## This implementation

- **Spec knobs:** `difficulty` (maze size: Kids 8×8, Easy 11×11, Medium
  14×14, Hard 18×18, Expert 22×22), `kind` (`riddle` — the default — or
  `cheer`), `message` (your own message: letters A–Z and spaces, anything
  else dropped, up to 40 letters; empty = a curated riddle or cheer),
  `size` (0 = the level decides; otherwise 6–30), `carver` (`winding`, a
  depth-first backtracker with long corridors, or `branchy`, Prim's
  algorithm with many short dead ends; unset = winding for Kids and Easy,
  branchy above), `width`, `height`, `line`.
- **Generation:** the maze is carved as a spanning tree of the grid. START
  is a square on the top row or left column, and FINISH the square on the
  bottom row or right column farthest from it along the passages. The
  message letters are spread evenly along the path between them; if the
  path is shorter than twice the message, the maze is carved again and then
  grown two squares a side at a time (to 30) until it is long enough — a
  message that still cannot fit one letter per square is shortened and the
  message asked for is recorded. Decoy letters (half to one and a half
  times as many as the message has, by level) go into dead ends first, then
  other squares off the path; most are letters of the message itself.
- **Solving:** a perfect maze has exactly one path between any two squares.
  The path is read off a breadth-first search from START.
- **Guarantees:** exactly one path from START to FINISH, and the letters on
  it, in order, are the message (`unique: true`); re-proved in tests by a
  depth-first count of simple paths through the open passages (capped at
  2), by walking the maze downhill from FINISH's distances and reading the
  letters back, and by checking every decoy lies off the path. Curated
  messages are family-friendly riddles and cheers written for Lakolam. Rated
  by maze size (`rating_basis: maze_size`): up to 9 squares a side Kids, 12
  Easy, 15 Medium, 19 Hard, larger Expert; the carver does not change the
  rating.
