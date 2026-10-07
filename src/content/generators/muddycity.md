---
title: "Muddy City"
blurb: "Muddy City — pave the fewest stones so every house is connected (a minimum spanning tree, proven unique)"
category: puzzle
version: "1.0.0"
---
Pave the fewest stones so every house is connected — a minimum spanning tree with exactly one answer.

## What it is

A map of a little town whose streets are all mud. Each street needs a
number of paving stones — drawn as stones along the street on the easy
levels, written in a circle on the harder ones. The mayor wants to pave
just enough streets that anyone can walk from any house to any other
without getting muddy, using as few stones as possible. Colour the streets
to pave and write the number of stones used. The answer key marks the paved
streets and gives the total, and there is only one cheapest way.

## How to play

Pave streets so that every house can reach every other house along paved
streets, and use as few paving stones as you can.

A good method: start with the cheapest street and pave it. Then keep paving
the cheapest street left — but skip any street whose two houses can already
reach each other on paved streets, because it would only make a loop. Stop
when every house is joined. Add up the stones on the streets you paved.

## Purpose

The Muddy City is the CS Unplugged activity for minimum spanning trees:
the problem of joining places by the cheapest network of roads, pipes,
cables or wires. It teaches a greedy algorithm that is provably right, the
difference between a loop and a tree, and that a town of n houses needs
exactly n - 1 paved streets.

## History

Otakar Borůvka posed and solved the problem in 1926 to plan the electricity
network of Moravia. Vojtěch Jarník gave another method in 1930, rediscovered
by Robert Prim in 1957 and Edsger Dijkstra in 1959; Joseph Kruskal's 1956
method — cheapest street first, skipping loops — is the one in How to play.
Tim Bell, Ian Witten and Mike Fellows turned it into the Muddy City in
Computer Science Unplugged.

## This implementation

- **Spec knobs:** `difficulty` (Kids: 6 houses, 9 streets, 1-5 stones drawn
  as stones; Easy: 8 houses, 13 streets, 1-6 stones; Medium: 10 houses, 17
  streets, costs 1-20 written as numbers; Hard: 13 houses, 22 streets, costs
  to 30; Expert: 16 houses, 28 streets, costs to 40); page `width`,
  `height` and `line`.
- **Generation:** houses are spread out with a minimum spacing; short
  streets are added greedily if they cross no street, pass no other house
  and leave each house at a clear angle; streets are then removed at random,
  keeping the town connected, down to the level's count. Costs are random
  (all different from Medium up).
- **Solving:** Kruskal's algorithm.
- **Guarantees:** the cheapest paving is unique — kept only if every
  unpaved street costs strictly more than every paved street on the path it
  would short-cut (the strict cycle property, which holds exactly when the
  minimum spanning tree is the only one; with all costs different it always
  holds). Tests re-derive the tree with Prim's algorithm and, on Kids and
  Easy, count cheapest trees over every set of streets. Meta: `unique`,
  `rating_basis: houses_and_streets`. Streets never cross.
