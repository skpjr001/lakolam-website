---
title: "Physarum"
blurb: "Slime-mould transport networks: agents sense, turn and lay trail on a diffusing map — drawn as contour line art to colour, traced strands or colour bands, free or drawn to food points or a picture"
category: design
version: "1.0.0"
---
A slime mould's transport network, grown by thousands of tiny agents and
drawn as a page of tubes and cells to colour.

## What it is

A design grown, not drawn. Thousands of simple agents wander the page. Each
one smells the trail ahead of it with three feelers, turns towards the
strongest scent, takes a step and leaves a little trail of its own; the
trail spreads and fades. Out of that loop a network condenses: branching
tubes that meet at junctions, with rounded gaps between them, just like the
yellow slime mould *Physarum polycephalum* spreading across a forest log.

The finished trail is drawn three ways:

- **Line** — outlines of the tubes (with a second, finer line inside the
  thickest parts), so every tube and every gap is a closed shape to colour;
- **Colour** — the trail's thickness in bands of colour, from pale edges to
  deep cores;
- **Strands** — the paths a few hundred agents actually walked, a tangle of
  fine lines that bundles into the network.

Presets give different growth: a classic **network**, wormy **coral**, wide
winding **labyrinth** corridors, a foam of small **cells**, a lean network
that links scattered **food** points, or a network that gathers on the dark
parts of a **picture** (a built-in silhouette or your own upload).

## How to use it

Print the line page and colour it like stained glass: the gaps between the
tubes are the panes, the tubes the lead. Use one colour for all the tubes and
a different shade in each gap, or colour the thick inner cores darker than
the tube walls so the network looks lit from within. On a food page, start
at the round food points and follow the tubes that join them. On a picture
page, the shape of the picture shows where the network grows thickest; fill
it in a bold colour and keep the paper around it pale.

Every page is different: try another one for a new network.

## Purpose

To show how order grows from simple rules. No agent knows the shape of the
network; each follows the same three-step rule, and the network appears
from the crowd. The same idea explains ant trails, the slime mould's
efficient feeding networks and many patterns in nature. The pages are also
calm, organic colouring designs with hundreds of shapes, each one a little
different, and the colour and strands styles make prints for display.

## History

*Physarum polycephalum* is a single-celled slime mould whose body is a
network of tubes; it reshapes the network to link food sources with short,
robust routes. Toshiyuki Nakagaki, Hiroyasu Yamada and Ágota Tóth showed in
"Maze-solving by an amoeboid organism" (*Nature*, 2000) that it finds the
shortest path through a maze, and Atsushi Tero and colleagues, in "Rules for
biologically inspired adaptive network design" (*Science*, 2010), grew it
over oat flakes placed like the cities around Tokyo: its network rivalled
the real rail system.

Jeff Jones modelled the mould with a population of particles in
"Characteristics of pattern formation and evolution in approximations of
Physarum transport networks" (*Artificial Life* 16(2), 2010). Each particle
has a forward sensor and two side sensors a sensor offset ahead (9 cells,
22.5 degrees apart, in his reference settings), turns by a rotation angle
(45 degrees) towards the strongest trail, moves one cell if the cell is
free, and deposits trail (5 units); the trail map is diffused by a 3 by 3
mean filter and decays. Jones charted how the patterns change across the
sensor angle, rotation angle and sensor offset: dynamic reticulate networks,
stable minimal networks, labyrinths and spots.

The artist Sage Jenson's GPU renderings of the model (from 2019, at
sagejenson.com/physarum) made it one of the best-known generative art
techniques. The tube outlines are contour lines of the trail, traced with
marching squares, the two-dimensional form of the marching cubes algorithm
of William Lorensen and Harvey Cline (1987).

## This implementation

- **Spec knobs:** `preset` (network, coral, labyrinth, cells, food,
  picture), `style` (line, strands, colour), `palette` (slime, sunset,
  ocean, forest, berry, rainbow, ink_blue; colour style only), `image` (a
  PNG or JPEG as a data URL or base64; any preset uses it when given),
  `width`, `height`, `margin`, `grid` (120-600 trail-map cells across the
  drawing), `agents` (1000-100000; empty = 4000 for food, 20000 otherwise),
  `steps` (20-1500), `sensor_angle` (1-90 degrees), `turn_angle` (1-90
  degrees), `sensor_distance` (1-40 cells), `decay` (0.01-0.5) — each empty
  to use the preset's — `food` (0-40 points; empty = 9 for food, none
  otherwise), `levels` (1-4 contour levels in line style; colour style fills
  `levels + 3` bands) and `stroke` (0.75-4 pt). Out-of-range numbers are
  clamped and reported as `requested_<field>`.
- **Generation:** Jones's model. The map is `grid` cells across the space
  inside the margins (square cells, centred). Agents start at uniformly
  random cells (at most one per cell, and on at most half the cells — a
  coarse grid holds fewer agents than asked, reported as
  `requested_agents`), facing random directions. Every step, each agent in
  index order (sequential: no parallel nondeterminism) reads the trail plus
  any fixed scent at its forward, left and right sensors (off the map reads
  as -1); keeps its heading if forward is strongest, turns randomly left or
  right if forward is weakest, else turns towards the stronger side; moves
  one cell if the target is on the map and free, depositing 5, or else takes
  a random new heading. The map is then blurred by a 3 by 3 mean and
  multiplied by `1 - decay`. Presets (sensor angle, turn angle, sensor
  distance, decay): network, food and picture 22.5, 45, 9, 0.1 (Jones's
  reference reticulate network); coral 90, 90, 3, 0.1; labyrinth 90, 45,
  9, 0.1; cells 60, 60, 4, 0.2 — the last three are points in Jones's
  parameter space picked for their look, not settings quoted from the
  paper. Food points (seeded, 10-90 % across the map, spread apart) are
  Gaussian scent bumps (peak 40, radius 8 cells) that the sensors read but
  that never enter the trail. A picture is fitted inside the map; its scent
  is 8 times (darkness - 0.6 (1 - darkness)), so dark parts attract and
  paper repels, and 6 times its darkness is added to the drawn density so
  the subject shows through. With no upload, the picture preset uses a
  built-in silhouette chosen by the seed. For drawing, the final trail
  (plus the picture shade) is blurred twice more and faded to zero over
  the outer 8 cells. *Line:* contour levels at evenly spaced quantiles
  (60 % to 86 %) of the density, traced as closed loops by marching
  squares, simplified to 0.25 pt; loops under 44 mm² are dropped; the
  outermost level is drawn at 1.5 times `stroke`. *Colour:* `levels + 3`
  levels at quantiles 45 % to 95 %, each loop filled with its inside band's
  palette colour, largest first. *Strands:* up to 700 evenly spaced agents'
  positions over the last 30 % of the steps, drawn at 0.75 times `stroke`.
  Food points are drawn as discs of radius 12 pt (at most 8 % of the
  drawing's shorter side).
- **Solving:** nothing to solve — a design to colour or display.
- **Guarantees:** deterministic per spec, picture and seed; meta records the
  model, the exact parameters (angles, sensor distance, step, deposit,
  decay), the grid, agent count, steps, food positions (in cells), the
  picture source (`upload` with pixel size and FNV-1a hash, or the
  silhouette id), the contour levels and loop counts. Tested: the sensor
  rule turns an agent towards trail; one step conserves trail apart from
  decay; the trail gathers on food points and on an uploaded picture's dark
  area; one agent per cell; every contour closes and lies inside the
  margins; the default line page passes the adult colourability check.
  **Strands pages are not colouring pages:** they are open lines, and meta
  says `colorable: false` with a note. A picture that is not a PNG or JPEG,
  or is too large, is refused with a clear message.
