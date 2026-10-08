---
title: "Geodesic Domes"
blurb: "Geodesic domes 1V-6V: builder's strut cut lists and assembly plans, paper-model nets and wireframes, chord factors checked against the published tables"
category: design
version: "1.0.0"
---
Build Buckminster Fuller's dome: a strut cut list and assembly plan for any
size, a paper model to fold, or a wireframe to frame.

## What it is

A geodesic dome is a sphere (or part of one) made of triangles. Start with an
icosahedron — twenty equilateral triangles — cut each edge into equal parts,
divide every face into small triangles and push their corners out onto the
sphere. The number of parts is the dome's *frequency*: a 2V dome has two
sizes of strut, a 3V dome three, a 4V dome six. The higher the frequency,
the rounder the dome.

There are three sheets:

- **Plan** — the builder's sheet. A view from above shows every strut,
  coloured and lettered by type; beneath it is the cut list (each type's
  chord factor, its length for your radius and how many to cut) and the
  hubs you need.
- **Model** — a paper model of the dome as one or more flat pieces with
  numbered glue tabs.
- **Wireframe** — a line drawing of the dome from a seeded angle.

## How to use it

**Building from the plan.** Choose the radius you want, and cut each strut
to the length in the list: lengths run from the centre of one hub to the
centre of the next, so allow for your joint. Mark each strut with its
letter or colour. Lay out the bottom ring first, then work upwards ring by
ring, matching the colours to the plan. The hub counts tell you how many
joints of each kind to make — a 5-way hub joins five struts, a 6-way six,
and the 4-way hubs sit on the ground ring.

**Making the paper model.** Print on card. Cut along the solid lines,
round the outside and the tabs. Score and fold the dashed lines, all the
same way so the printed side stays outside. Each grey tab glues under the
edge with the same number. Where an edge has a number but no tab, join it
with a strip of tape. Work from the top down, and the dome will curve into
shape as the tabs close.

**The wireframe** is ready for a pen plotter or to colour and frame.

## Purpose

Geodesic domes enclose the most space with the least material, and a
frequency's handful of strut lengths makes them easy to build — from a
garden greenhouse or a festival shelter to a classroom model. The
paper model shows how a flat sheet of triangles turns into a curved
surface, and the plan is a real working drawing.

## History

Walther Bauersfeld built the first geodesic dome for the Zeiss planetarium
in Jena in 1926. R. Buckminster Fuller developed and named the idea in the
late 1940s with students at Black Mountain College, patented it in 1954,
and made it famous with the US Pavilion at Expo 67 in Montreal. Hobby
builders rely on chord-factor tables such as those in David Kruschke's
*Dome Cookbook of Geodesic Geometry* (1972) and on Domerama's online
calculators; the tables here are the same Class I (method 1) domes.

## This implementation

- **Spec knobs:** `frequency` (1–6); `portion` (`sphere`, `five_eighths`,
  `half`, `three_eighths`); `sheet` (`plan`, `model`, `wireframe`);
  `radius` and `units` (`metric`: metres and millimetres; `imperial`:
  feet and inches to the nearest sixteenth) for the cut list; `colour`
  (struts and faces coloured by type, or black on white); `width`,
  `height`; `line`.
- **Generation:** the icosahedron stands on a vertex at the zenith; each
  face is divided into `V²` triangles on its flat face and every point is
  normalised onto the unit sphere (Class I, method 1). A dome keeps the hubs
  on or above one ring of hubs: rings closer than 0.03 of the radius in
  height form one zigzag ring and the cut takes its lowest hubs, and the
  ring whose height fraction is nearest the requested portion is used (the
  meta reports `height_fraction`; odd frequencies have no exact
  hemisphere). Struts are grouped by length, shortest first, as A, B, C…
  The plan uses an azimuthal equidistant view from the zenith (a sphere
  gets a top and a bottom view). The model is unfolded by growing pieces
  from a seeded triangle, hinging neighbours on nearest first and skipping
  any that would overlap or touch an unhinged edge; the attempt with the
  fewest pieces wins. Each cut edge gets one tab on whichever side has
  room (lowered if needed), else a numbered tape joint. Pieces are turned
  and shelf-packed at the largest scale that fits. The seed turns the plan
  and the wireframe view and shifts the colours.
- **Solving:** nothing to solve — a design to build.
- **Guarantees:** `chord_table_checked` — chord factors recomputed from the
  vertices equal the published Class I tables for 1V–4V to five decimals
  (1V 1.05146; 2V 0.54653, 0.61803; 3V 0.34862, 0.40355, 0.41241; 4V
  0.25318, 0.29453, 0.29524, 0.29859, 0.31287, 0.32492), and the dome
  counts match them (2V hemisphere 30 + 35, 3V 3/8 30 + 40 + 50, 3V 5/8
  30 + 55 + 80, 4V hemisphere 250); strut and hub counts sum to the edges
  and vertices, and Euler's formula holds (2 for a sphere, 1 for a dome).
  5V and 6V use the same construction; their factors are computed, not
  table-checked (`chord_table: computed`). The paper model is re-checked
  as a true net (`net_verified`): every triangle once, congruent and
  unreflected; hinged triangles meet; each cut edge has one tab or one tape
  joint with a unique number; no two polygons of a piece overlap.
