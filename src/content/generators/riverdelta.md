---
title: "River Deltas"
blurb: "River deltas: distributary channels splitting at mouth bars and jumping course, building lobes, shoreline and sea floor"
category: design
version: "1.0.0"
---
A river building new land into the sea: a fan of channels that split and
wander, the lobes of sediment between them and the sea floor beyond.

## What it is

A map of an invented river's delta. The river arrives from the top and,
where it meets the sea, drops its sand and mud. The deposits build a bar in
front of the river's mouth; the flow splits round it into two channels,
which build bars of their own and split again, so the river fans out into a
tree of distributaries. Every so often a channel breaks through its bank
upstream and takes a new course, leaving the old one to silt up (drawn
faintly). Three kinds of delta grow: bird's-foot deltas with long fingers
of land along each channel (like the Mississippi's), lobate deltas that
spread in a rounded fan (like the Lena's or the Danube's) and cuspate
deltas, pushed into a smooth point by the waves (like the Tiber's). Coloured
bands show the land rising inland and the sea deepening offshore; the
earth colours add the cloud of muddy water off the active mouths.

## How to use it

Start at the top where the river enters and follow it down: at each fork
choose a branch and you will always reach the sea, never come back to a
channel you passed. Count how many times the river splits. Find the faint
abandoned channels and the lobes they built before the river moved away.
Compare the three kinds: long fingers mean a strong river and calm sea,
a smooth point means strong waves. The black-and-white map is a colouring
page: blue for the channels, shades of green and sand for the land, blue
again for the depth bands.

## Purpose

Deltas are where a quarter of a billion people live and some of the
richest farmland and wetlands on Earth; they grow, shift and drown on
human timescales. The map shows the two processes that shape every delta —
mouth-bar bifurcation and avulsion — and how the balance of river and
waves sets its shape, as a decorative atlas page.

## History

Grove Karl Gilbert described delta building in 1885; William Galloway's
1975 triangle classified deltas as river-, wave- or tide-dominated. The
growth rules follow the reduced-complexity models of the last decades:
mouth-bar bifurcation (Edmonds and Slingerland, *Journal of Geophysical
Research* 2007), avulsion and lobe switching (Jerolmack and Paola 2007;
Liang, Voller and Paola, "A reduced-complexity model for river delta
formation", *Earth Surface Dynamics* 2015), and wave smoothing of the
shore (Ashton and Giosan 2011). River names are invented syllables.

## This implementation

- **Spec knobs:** `kind` (auto, birds_foot, lobate, cuspate); `steps`
  (50–1500 growth steps); `abandoned` (draw old channels); `bathymetry`
  (depth contours); `cartouche` (title, counts, scale bar, north arrow);
  `palette` (map, earth, ink, or auto); `page`; `margin_mm`.
- **Generation:** a 170 × 190 grid of elevations: a strip of old coastal
  plain with a seeded wavy coast and a sea floor deepening at a seeded
  slope. The trunk channel runs from the apex (top centre) to the coast.
  Each step every active mouth deposits its share of the sediment (by
  width²) in a Gaussian fan ahead of it; when the bar ahead and to both
  sides stands above sea level the mouth advances one step, wandering
  slightly and leaning seaward, and raises levees along the new reach.
  After a run of advances proportional to its width a mouth splits into two
  arms 0.74 as wide, turning apart. With a small chance per step a channel
  breaks out 8–32 reaches upstream: everything below is abandoned and a new
  arm leaves at an angle; if every mouth is blocked the river breaks out
  from a random reach. Bird's-foot deltas have narrow fans, strong levees
  and rare splits; lobate ones frequent splits and avulsions; cuspate ones
  wide fans and along-shore wave diffusion. The map is traced with closed
  level loops: depth bands, the sediment plume (earth), land bands, the
  shoreline and contours, then the channels tapering by width.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification: tree_on_land` — the network
  is a tree rooted at the apex (one root, every parent earlier than its
  child, every node reaches the apex), no two reaches cross (a mouth only
  steps where its new reach crosses none and keeps clear of other channels),
  every node lies on land inside the map, the channel count never falls as
  the steps increase, lobate deltas avulse more than bird's-foot ones, and
  every contour closes. All ink stays inside the margins; clamped knobs are
  reported (`requested_<field>`).
