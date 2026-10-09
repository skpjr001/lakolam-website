---
title: "Picture Sudoku"
blurb: "Picture sudoku for young children — 4×4 or 6×6 with pictures and cut-and-paste tiles"
category: puzzle
version: "1.0.0"
---
A little sudoku with pictures instead of numbers — cut out the missing
pictures and glue them in.

## What it is

A 4×4 grid (or 6×6 for older children) split into boxes. Every row, every
column and every box must hold each picture exactly once. Some squares
already have their picture; the rest are empty. Under the grid is a strip of
picture tiles to cut out — exactly the pictures that are missing, no more and
no fewer.

## How to play

Look at an empty square. Which pictures are already in its row? In its
column? In its box? The picture that is in none of them is the one that
belongs there. Find it among the tiles, cut it out and glue it in — or draw
it. Keep going until every square is full. Each row, column and box will
then have every picture once.

## Purpose

Picture sudoku is a first logic puzzle for children who cannot yet read
numbers fluently: it teaches looking along a line, ruling things out and
checking work, and the cutting and gluing practise scissor skills. A 4×4 grid
with a few blanks suits preschool; a 6×6 grid suits first grade.

## History

Sudoku became a worldwide craze in 2005, and printable picture sudoku for
young children followed soon after, often in seasonal sets for classroom
centres and holiday activity packs.

## This implementation

- **Spec knobs:** `size` (`four` or `six`), `difficulty`, `theme` (the
  classic picture set without its plane shapes, or a seasonal pack),
  `style` (`colour` or `outline` pictures to colour in), `tiles` (the
  cut-and-paste strip; off prints the pictures once each instead),
  `symmetric`, `cell`, `line`.
- **Generation:** a classic sudoku of the chosen size is built by the
  `sudoku` generator — the answer filled, clues dug while its technique
  ladder still finishes the board. Picture sudoku then gives answer squares
  back at random until the blank count fits the band (adding a given never
  breaks uniqueness and never makes a solve harder), re-rates the printed
  board, and draws one picture per digit from the pack.
- **Solving:** the sudoku technique ladder; for boards this small, naked and
  hidden singles finish every page.
- **Guarantees:** uniqueness is proved by the sudoku engine on the printed
  board and re-proved by an independent plain backtracking count. The
  pictures are pairwise clearly distinct (the icon set's raster check), and
  the tiles hold exactly one picture per blank, so many of each picture as
  its blanks need. The key shades the squares that were blank.
- **Rating:** the harder of two measures (`rating_basis:
  blanks_and_hardest_technique`): the blank count (4×4: up to 4 blanks Kids,
  6 Easy, 8 Medium, more Hard; 6×6: 8, 12, 18, more) and the hardest
  technique the ladder needed. Expert is not reachable on boards this small
  and is served as Hard with `requested_difficulty`; clamped `cell` and
  `line` are reported as `requested_cell` and `requested_line`.
