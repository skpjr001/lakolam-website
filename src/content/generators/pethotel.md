---
title: "Pet Hotel"
blurb: "Pet Hotel — give every pet its own room so each picture clue holds"
category: puzzle
version: "1.0.0"
---
Every pet gets its own room. Read the picture clues and find out who
sleeps where.

## What it is

A picture logic puzzle for younger solvers. A small hotel — two or three
floors of rooms — is waiting for its guests: a cat, a dog, a rabbit, a
fish, a bird, a turtle, a hamster, a frog and a snail. Each clue is a
little picture: a pet beside a tiny hotel with some rooms shaded, or two
pets with a sign between them. Put every pet in a room so that all the
clues are true. There is exactly one way to do it.

## How to play

- Each pet goes in a room of its own. On some pages there are more rooms
  than pets, and those rooms stay empty.
- **A pet next to a little hotel:** the pet is in one of the dark rooms.
- **Two pets with a two-way arrow ("next door"):** their rooms share a
  wall — side by side, or one right on top of the other.
- **The same with a cross ("not next door"):** their rooms do not share a
  wall.
- **Two pets in boxes side by side ("like this"):** the first pet's room
  is just to the left of the second pet's.
- **Two pets in boxes one on top of the other ("like this"):** the top
  pet's room is just above the other's.
- **Two pets on one line ("same floor"):** they are on the same floor.
- **Two pets on stairs ("higher floor"):** the pet on the top step is on
  a higher floor than the other, in any column.
- Start with the pictures of one pet and a little hotel. When a pet has
  only one room left, draw it in, and that room is taken for everyone
  else.
- Bigger hotels need the clues about two pets: think about where one pet
  can be, and where that leaves the other.
- The hardest hotels need a what-if: try a pet in a room in your head. If
  that makes a clue impossible, the pet goes somewhere else.

## Purpose

An early logic puzzle that needs no reading — only looking, comparing and
ruling things out. It practises position words (above, next to, same
floor, corner) and patient step-by-step reasoning, and the larger hotels
give grown-ups a proper puzzle too.

## History

Placing animals or people in a building from picture clues is a classic
of children's activity books, and it became a popular early-years web
game. This is an original version with pets and pictograms of our own.

## This implementation

- **Spec knobs:** `difficulty` (hotel size, number of pets and the
  hardest step needed), `names` (write each pet's name under its picture
  in the guest list), `width`, `height`, `margin`.
- **Generation:** the band's pets go into random rooms. Every true clue
  goes into a pool — a region (corner or not, a floor or not, a column or
  not, outside or middle, one exact room, rarely) for each pet, and next
  door, not next door, just above, just left of, same floor and higher
  floor for each pair — drawn in weighted seeded order. Clues are added
  until the ladder, capped at the band's rung, places every pet; then
  each is removed again if the ladder still places every pet without it.
  Clues about one pet are printed first.
- **Solving:** a sound ladder over each pet's possible rooms. *Basic*:
  clues about one pet; a pet with one room left takes it; when every room
  is full, a room only one pet can use is theirs. *Relation*: two-pet
  clues (a room stays only while some room of the other pet fits).
  *What-if*: put a pet in a room, follow the lower rungs, reach a pet with
  no room.
- **Guarantees:** deterministic per seed; every clue is true; the ladder
  places every pet, and an exhaustive search over the rooms (cap 2) finds
  exactly one placement. Tests re-count every placement with a plain
  odometer and a clue judge written afresh, and check that no clue is
  spare. Rated by the hardest rung and the hotel
  (`rating_basis: hardest_rung_and_size`): Kids 4 pets in a 2×3 hotel with
  basic steps; Easy 6 pets in 2×3 with two-pet clues; Medium 7 pets in
  3×3 with two-pet clues; Hard 8 pets in 3×3 with a what-if; Expert 9 pets
  in 3×4 with a what-if. A band not reached is reported as
  `requested_difficulty`. Pictures are black ink and light greys, safe to
  print in black and white. The app gets the board, a check and a hint
  that names the next pet to place, the rung and the clues read.
