---
title: "Famous Graphs"
blurb: "Famous graphs in their classic symmetric drawings, with edge colourings, matchings and Hamiltonian cycles"
category: design
version: "1.0.0"
---
The celebrities of graph theory — Petersen, Heawood, Coxeter, the Tutte
8-cage and friends — in the symmetric drawings that made them famous.

## What it is

A graph is a set of dots joined by lines. A few small graphs are so
symmetric, and so often the answer to "is there a graph that…?", that they
have names and portraits. The Petersen graph, ten dots and fifteen lines,
is the classic counterexample: it cannot have its lines coloured with three
colours so that no two lines of the same colour meet, and there is no round
trip through it that visits every dot exactly once. The Heawood graph, drawn on a
doughnut, cuts it into seven regions that all touch one another; the Tutte 8-cage is the smallest graph with
three lines at every dot and no loop shorter than eight.

Each graph is drawn the way mathematicians draw it — an outer ring and an
inner star, or every dot on one circle with chords across it, or a shape that
settles itself so that close dots in the graph are close on the page — with
one structure picked out in colour: a colouring of its lines, a set of lines
that pairs every dot with exactly one partner, or a round trip through every
dot.

## How to use it

Frame a single portrait, or study the gallery of nine. On the line-art page,
try the classic puzzles by hand: colour the lines with three colours so that
no two lines of one colour share a dot (the caption tells you how many
colours the graph really needs); trace a round trip that visits every dot
once; or pick lines that pair up all the dots. Count the shortest loop and
check it against the girth printed underneath.

## Purpose

The mathematics lane's portrait gallery, and a lesson in honest claims: every
highlight on the page is checked, and every "no" — no Hamiltonian cycle, no
three-colouring — is proved by an exhaustive search that finished, never
assumed.

## History

Petersen published his graph in 1898 as a counterexample in the theory of
factorisations; Kempe had drawn it in 1886. Heawood's graph (1890) comes from
his work on map colouring on the torus. Coxeter described his graph in "My
graph" (Proc. London Math. Soc., 1983); Tutte found the 8-cage in 1947. The
generalised Petersen graphs are Watkins' (1969), and the LCF notation is due
to Lederberg, extended by Coxeter and Frucht (1960s-1970s). Most of the
drawings follow the conventions of Holton and Sheehan, *The Petersen Graph*
(1993), and of Pegg and Exoo, "Crossing number graphs" (Mathematica Journal,
2009). Stress majorisation is Gansner, Koren and North, "Graph drawing by
stress majorization" (2004).

## This implementation

- **Spec knobs:** `page` (gallery / plate), `graph` (auto, nine named
  graphs, three Cayley graphs, `generalised_petersen` with `gp_n`/`gp_k`,
  `hypercube` with `cube_dim`, `lcf` with an LCF code in `lcf`), `layout`
  (auto / circle / rings / organic), `edges` (lines / arcs), `highlight`
  (auto / none / edge_colouring / matching / hamiltonian), `palette`, `style`
  (colour / line_art), `labels`, `width`, `height`, `margin`.
- **Generation:** generalised Petersen graphs GP(n, k) as an n-gon and an
  {n/k} star; Heawood, Pappus and the Tutte 8-cage from their LCF codes, on
  their Hamiltonian circle; the Coxeter graph from three heptagram rings;
  hypercubes as zonogon projections; the truncated tetrahedron, octahedron and
  icosahedron as Cayley graphs of A4, S4 and A5 (a cycle generator and the
  first involution whose product has order 3), laid out by stress
  majorisation (fixed 260 iterations from a seeded jittered circle). Edge
  colourings by backtracking over edges in breadth-first order, Δ colours
  first, then Δ + 1; perfect matchings by backtracking on the lowest
  unmatched vertex; Hamiltonian cycles by depth-first search with a two-exit
  check. The gallery picks nine named graphs with the seed and a highlight for
  each.
- **Solving:** Nothing to solve.
- **Guarantees:** each highlight is re-checked against its definition and
  recorded as `highlight_checked` (`verification: highlights_checked`); a
  "needs four colours" or "no Hamiltonian cycle" caption appears only when the
  search finished within its budget. Tests pin the vertex, edge and girth
  counts of every named graph (and the cage diameters), prove the Petersen
  graph is class 2 and not Hamiltonian, the Coxeter graph and GP(11, 2) not
  Hamiltonian, and check every colouring, matching and cycle. Malformed or
  non-cubic LCF codes are refused with a clear message; out-of-range numbers
  are clamped and reported as `requested_<field>`.
