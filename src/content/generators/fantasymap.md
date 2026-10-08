---
title: "Fantasy Map"
blurb: "Fantasy maps — islands, archipelagos and continents with rivers that drain downhill to the sea, road-linked towns, invented names and a hexcrawl mode, with a key"
category: design
version: "1.0.0"
---
An invented island, archipelago or continent for your story or campaign —
coasts, rivers, peaks, forests, towns and roads, every place with a name of
its own.

## What it is

A printed map of a land that does not exist: one large island, a chain of
islands, or a broad continent. Rivers run from the hills to the sea, lakes
sit in the hollows, mountains rise in ranges, forests spread across the
lowlands, and towns are joined by winding roads. Every town, river, sea,
range and wood has an invented name. A second page is the key: a legend, a
gazetteer that says where each place is, and the rivers and seas by name.

It comes in four looks: **parchment** (colour), **ink** (black and white,
for a handout), **colouring** (every region a closed space to colour in)
and **hexcrawl** (a numbered hex grid over the map, one terrain symbol per
hex, for exploration games).

## How to use it

**For a story or game.** Pin the map up where everyone can see it, and keep
the key for yourself. The letters and numbers round the frame (or the hex
numbers) let you say where things are: "the ruined tower is in C4", "the
dragon sleeps in hex 0712".

**For a hexcrawl.** Each hex has a four-figure number: the first two
figures are the column, counted from the left, and the last two the row,
counted from the top. The key lists how many hexes of each terrain there
are, the hex of every town, and a ruled table: write in each hex's secret
— a ruin, a monster's lair, a hermit — as you plan the adventure, and look
it up when the players arrive.

**For colouring.** Every coast, lake, forest, hill country and mountain
range is a closed shape. Colour the sea blue, the forests green and the
peaks brown — or invent a palette for the land.

**Reading the map.** Rivers are the wavy lines that widen towards the
sea; roads are dashed. A ringed dot is the capital, a small circle a town.
The scale bar is in leagues.

## Purpose

Game masters need maps for worlds that exist only in their notes, and
writers need to know which way the river runs before the heroes cross it.
A map that obeys the rules of real land — water always flowing downhill,
roads finding the easy way round mountains — feels right even to readers
who could not say why. The colouring version is a calm, open-ended
colouring page, and drawing a land of your own is a classroom favourite for
learning map symbols, keys and grid references.

## History

Imaginary maps are as old as fiction about journeys: the island of Thomas
More's *Utopia* (1516) was printed with a woodcut map, and Robert Louis
Stevenson drew the map of *Treasure Island* (1883) before he wrote the
book. The fantasy map as a genre — a land with mountains drawn in profile,
forests as clusters of little trees and names in a made-up language —
grew from J. R. R. Tolkien's maps of Middle-earth and became a fixture of
tabletop role-playing games from the 1970s, where the numbered hex grid of
war games was borrowed for "hexcrawl" exploration.

## This implementation

- **Spec knobs:** `style` (`parchment`, `ink`, `colouring`, `hexcrawl`);
  `shape` (`island`, `archipelago`, `continent`); `land` (share of the map
  that is land, 0.15–0.75); `detail` (terrain grid columns, 60–220);
  `towns` (0–20, the first the capital); `rivers` (river systems, 0–16);
  `title` (empty for an invented realm name; up to 40 characters, letters
  the lettering cannot draw are dropped and listed); `labels`; `grid_mm`
  (10–60 mm: hex width in a hexcrawl, grid square side otherwise); `page`
  (Letter, A4, A5, Tabloid, A3) and `landscape`. Out-of-range numbers are
  clamped and reported as `requested_<field>`; fewer towns or rivers than
  asked (when the land has no room) are reported the same way.
- **Generation:** a domain-warped fractal heightfield on a grid of nodes,
  shaped by an island, archipelago (separated island centres with enough
  area for the land share) or continent base form and faded to sea at the
  frame; the sea level is the quantile that gives the requested land share.
  Specks of land are dropped and sea cut off from the open ocean is raised
  into land. A priority flood (Barnes, Lehman and Mulla 2014, with an
  epsilon) fills every hollow so each land node is strictly higher than the
  node it was reached from; hollows deeper than a threshold, clear of the
  coast, become lakes. Each land node drains to its steepest strictly lower
  neighbour (diagonal steps never slip between two sea corners), and flow
  accumulation picks the river systems with the largest catchments and
  their main tributaries. Coasts, lake shores and the hill, mountain and
  forest regions are oriented marching-squares loops (so regions with holes
  fill correctly), smoothed once by corner cutting when that keeps them
  simple. Towns go on dry ground, favouring rivers and coasts, spread
  greedily; roads grow on each landmass as a tree of cheapest paths
  (multi-source Dijkstra from the network so far, over a cost of distance,
  slope, mountains, forest and river crossings). Labels try eight positions
  at two distances and three sizes; sea names go on open water a little off
  the coast, range and wood names near the middle of the largest range and
  wood. Terrain symbols fill jittered lattices wherever their whole box lies
  in their own terrain, clear of every line and label; a hexcrawl draws one
  symbol per numbered hex by its majority terrain. Names are drawn from
  curated syllables.
- **Checking:** `drainage_checked` — following the downstream links from
  every land node descends strictly on the filled surface and reaches the
  sea, and every river follows those links to the coast (its mouth snapped
  onto the drawn coastline) or to the river it feeds; `coast_closed` —
  coasts and shores are closed loops with no two edges crossing;
  `roads_checked` — a union-find over the road edges joins every town to
  every other on its landmass; `labels_checked` — no label box touches
  another label or any coast, shore, river or road segment, and all lie
  inside the frame; `names_checked` — no name is an English word (the large
  dictionary), no family-filter word or stem appears anywhere in it, and no
  two are the same; `hex_numbering_checked` — hex numbers are distinct and
  read back to their hex. The tests re-check drainage without the stored
  links (settling nodes in height order), labels by brute force against
  every segment, road reach by breadth-first search, and coast simplicity by
  comparing every pair of edges.
- **Guarantees:** no river runs uphill or ends inland; every coast closes;
  towns on one landmass are all road-connected; labels never overlap each
  other or a coast, river or road (a town whose name finds no clear spot is
  left unlabelled, counted in `unlabelled_towns`, and still listed in the
  key); names are invented and family-friendly. The ink and colouring
  pages use black and greys only.
