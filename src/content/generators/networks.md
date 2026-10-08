---
title: "Networks"
blurb: "Networks — Dijkstra's shortest route, Kruskal's and Prim's minimum spanning trees and route inspection on drawn weighted networks, every answer proved unique by Floyd–Warshall and exhaustive search"
category: maths
version: "1.0.0"
---
Dijkstra, Kruskal, Prim and route inspection on drawn networks — distinct weights, so every answer is the only one.

## What it is

A worksheet of two to six weighted networks: nodes labelled A, B, C, …
joined by arcs, each arc marked with its length. Each network comes with
a question: find the shortest route between two nodes with Dijkstra's
algorithm (and the order in which the nodes get permanent labels); find
a minimum spanning tree with Kruskal's algorithm, or with Prim's from a
stated start node — at the top level from a distance matrix instead of a
drawing; or solve the route inspection (Chinese postman) problem: which
nodes are odd, which arcs to travel twice, and the length of the
shortest route that covers every arc and returns to the start. The
answer key writes the answers in red and draws the route, the tree or
the repeated arcs in red on the network.

## How to play

- **Dijkstra's algorithm:** give the start node the permanent label 0.
  From the node just made permanent, update the working value of each
  node it joins: the permanent label plus the arc's length, if that is
  smaller than the value already there. Then make the smallest working
  value permanent, and repeat until the end node is permanent. Trace the
  route back from the end: each step goes along an arc whose length is
  the difference between the two labels.
- **Kruskal's algorithm:** list the arcs from shortest to longest. Add
  each in turn unless it would make a cycle (join two nodes already
  connected). Stop when every node is joined.
- **Prim's algorithm:** start at the given node. Each time, add the
  shortest arc that joins a node already in the tree to one that is not.
  From a distance matrix: cross out the start node's row, look down the
  columns of the nodes in the tree for the smallest number in a row not
  yet crossed out, and repeat.
- **Route inspection:** a node is odd if an odd number of arcs meet
  there. Every arc must be travelled, so pair up the odd nodes and travel
  the shortest route between each pair a second time. Try every way of
  pairing them and choose the cheapest. The shortest closed route is the
  total of all the arcs plus the repeated routes.

## Purpose

These are the network algorithms of Decision Mathematics: Edexcel and
OCR Further Mathematics (Decision 1 and Discrete), AQA's Discrete
option, and shortest paths in A-level Computer Science. Working them by
hand on small networks teaches the step-by-step thinking of an
algorithm, and why a greedy choice works for spanning trees but route
inspection needs every pairing tried.

## History

Joseph Kruskal published his spanning-tree algorithm in 1956; Robert
Prim published his in 1957 (Vojtěch Jarník had found it in 1930), and
Edsger Dijkstra his shortest-path algorithm in 1959 — he designed it in
twenty minutes at a café in Amsterdam. The route inspection problem was
posed by the Chinese mathematician Kwan Mei-Ko (Guan Meigu) in 1962 for
a postman covering every street, which is why it is called the Chinese
postman problem.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `shortest_path`,
  `spanning_tree`, `route_inspection`); `locale` (`uk` and `in` say nodes
  and arcs, `us` says vertices and edges and heads the page "Graph
  algorithms"; `in` prints the same page as `uk`); `count` (2-6);
  `width` (300-2000 Pt) and `height` (300-3000 Pt). Out-of-range values
  are clamped and reported in meta as `requested_*`.
- **Generation:** nodes sit at jittered points in a 3 × 2 or 4 × 3 grid
  of cells; arcs join neighbouring cells, a spanning tree first and then
  extra arcs, never crossing. Weights are distinct whole numbers.
  Easy: five or six nodes, Kruskal and Dijkstra's route. Medium: six or
  seven nodes, Prim from a start, Dijkstra's labelling order, route
  inspection with two odd nodes. Hard: seven or eight nodes and more
  arcs. Expert: eight or nine nodes, Prim from a distance matrix, route
  inspection with four odd nodes. A drawing is kept only if it is
  legible: no arc passes near a node it does not join, and every weight
  label clears every node, every other label and every other arc. Route
  inspection starts at Medium: a lower request is served at Medium and
  recorded as `requested_difficulty`.
- **Solving:** the generator runs Dijkstra, Kruskal and Prim directly,
  and for route inspection Dijkstra from each odd node over every
  pairing.
- **Guarantees:** each answer is proved unique by methods the generator
  does not use: Floyd–Warshall distances, with the shortest routes from
  start to end counted (exactly one) and every node at a different
  distance from the start (so the labelling order is forced); the
  minimum spanning tree found by trying every set of n – 1 arcs that
  connects the nodes (exactly one is cheapest); Kruskal's order checked
  as increasing weight and Prim's by the cut property; route inspection
  by trying every pairing of the odd nodes with Floyd–Warshall
  distances, the best beating the next by at least 1, each repeated route
  the only shortest one. Meta: `answers_checked`, `unique`,
  `difficulty`, `rating_basis` (`network_size_and_algorithm_by_level`),
  `checked_by`.
