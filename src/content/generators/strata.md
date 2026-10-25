---
title: "Geological Cross-Section"
blurb: "Geological cross-sections from a seeded history of folding, faulting, intrusion and unconformity, with lithology patterns and a legend"
category: design
version: "1.0.0"
---
A slice down through invented rock: folded layers, faults, an unconformity,
a granite pluton and a dike, each rock in its standard map pattern.

## What it is

The view a geologist draws of the ground as if cut open along a line, from
A to A′. Every section here is the result of a story told in order:
layers of sand, mud and lime are laid down flat, then folded or tilted,
broken by faults, invaded by molten granite, worn down to an erosion
surface (an *unconformity*), buried under new layers, perhaps tilted or
faulted again and cut by a basalt dike, and finally eroded to today's
landscape. The section shows what that history leaves behind, with each
rock type in the pattern geological maps use — dots for sandstone, dashes
for shale, bricks for limestone, pebbles for conglomerate, crosses for
granite — and a legend of every rock that appears.

## How to use it

Read it like a detective, using the principles of relative dating: layers
were laid down with the oldest at the bottom; a fault or dike is younger
than every rock it cuts; an unconformity is younger than the tilted or
folded layers it truncates and older than the flat layers above it. Work
out the order of events, then check it against the half-arrows on each
fault, which show which side moved down. The line-art page is a colouring
sheet: colour each rock type consistently (geologists use yellows for
sandstone, greens and greys for shale, blues for limestone, pinks and reds
for granite) and the structure jumps out.

## Purpose

An introduction to structural geology and relative dating that is correct
by construction: the section is generated from the history itself, so
everything you can deduce from it really happened in that order.

## History

Nicolas Steno set out superposition, original horizontality and lateral
continuity in 1669; James Hutton read the unconformity at Siccar Point
(1788) as evidence of deep time; William Smith's 1815 map and sections of
England founded stratigraphy. The lithology patterns follow the US Federal
Geographic Data Committee's *Digital Cartographic Standard for Geologic Map
Symbolization* (FGDC-STD-013-2006, prepared by the USGS; public domain).

## This implementation

- **Spec knobs:** `width`, `height` (points); `complexity` (`auto`,
  `simple` — layers, a fold or tilt and a fault; `moderate` — adds an
  unconformity and sometimes a pluton or dike; `complex` — adds a pluton,
  a second deformation and a dike); `layers` (older sequence, 4–14);
  `style` (`colour`, `lines`); `legend`; `pattern` (pattern spacing scale,
  0.75–3); `stroke`.
- **Generation:** a seeded event list. Sequences get seeded lithologies
  (no two alike in a row; coal as thin seams) and thicknesses. Folds are
  vertical shear `z += A sin(kx + φ)`, tilts rotations about the section's
  centre, faults straight planes (55–78°, normal or reverse) whose hanging
  wall slides along them, plutons noisy ellipses, dikes steep wobbling
  bands, unconformities wavy erosion surfaces with a younger sequence laid
  on them, the land surface a gentle seeded profile. *Backward:* a present
  point is mapped to its rock by undoing events youngest first.
  *Forward:* each unit starts as a wide band (or intrusion body) and every
  later event acts on its rings — vertex maps for folds and tilts, an exact
  half-plane split and slide for faults; intrusions and the space above an
  unconformity become *covers* that hide the older rock they replaced
  (drawn as clips, so no polygon booleans are needed). Patterns are laid in
  the bedding frame (rotated by later tilts) and clipped to each unit;
  everything is clipped to the section below the land. Units that show
  nowhere are dropped, and the legend lists the lithologies of the rest.
  Section view only (no block diagram yet).
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; at every sampled point exactly
  one unit shows and it is the unit the backward mapping puts there
  (tested across all complexities); layers of one sequence never overlap
  (tested); down every column, younger rock lies above older except across
  a fault trace or against an intrusion (tested); the legend lists exactly
  the lithologies drawn, and every drawn unit shows (tested).
  `verification: forward_polygons_match_backward_mapping`; meta lists the
  events in order. Line art passes the colourability check. Clamped knobs
  are reported as `requested_<field>`.
