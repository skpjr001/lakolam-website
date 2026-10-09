---
title: "Locating an Earthquake"
blurb: "Locate an earthquake — read S-P lags off drawn seismograms, turn them into distances with a stated constant-speed model, and draw three compass circles on a km map that meet at exactly one grid point; plus lag, distance and origin-time drills"
category: maths
version: "1.0.0"
---
Read the seismograms, turn each S-P lag into a distance, and swing three compass circles to find where the ground shook.

## What it is

An earth-science worksheet. Locate pages show three seismograms and a map with three seismograph stations on a kilometre grid. You find the gap between the P wave and the S wave at each station, turn it into a distance, and draw a circle round each station. The three circles meet at one point: the epicentre. Readings pages are shorter drills on the same skills: lag to distance, distance to lag, and the time the earthquake happened.

## How to play

1. Every page prints a simple model in a box: P waves travel at 6 km/s and S waves at 3.75 km/s, so every second of lag between them means 10 km of distance.
2. On each seismogram, find where the trace first starts to shake (the P wave) and where the big shaking starts (the S wave). Count the seconds between them on the time scale. That is the S-P lag.
3. Multiply the lag by 10 to get the distance from the station to the epicentre in km.
4. On the map, set your compasses to that distance using the map scale (for example 50 km is 5 squares when 1 square is 10 km) and draw a circle round the station.
5. Do this for all three stations. The point where all three circles cross is the epicentre. Read its position in km east and km north.
6. To find when the earthquake happened, work out how long the P wave took to travel (distance ÷ 6) and take that away from the time it arrived.

## Purpose

Locating an epicentre by triangulation is a standard earth-science lab in middle and high school (and a geography skill in the UK). It joins reading a graph, a rate calculation, scale drawing with compasses and the idea that three distances fix one point. The drills practise each step on its own before the full locate page.

## History

Seismographs that record a quake's arrival times date from the 1880s. Seismologists noticed early that P (primary) waves always outrun S (secondary) waves and that the gap between them grows with distance. Andrija Mohorovičić used such travel times in 1909 to discover the boundary between the crust and the mantle. Locating an epicentre from three stations by circles on a map became the classic classroom version of this, and real observatories still use the same idea with many stations and computed travel-time tables.

## This implementation

The page states its model honestly: constant P and S speeds on a flat map. Real travel times curve with depth and distance and are read from travel-time charts; the page does not copy any published chart.

**Spec knobs**

- `difficulty`: Easy uses 1 s ticks, 10 km map squares and circle radii of 3–10 squares. Medium uses radii of 4–13 squares and longer lags. Hard uses 20 km squares (lags up to 28 s). Expert uses 5 km squares and lags in half seconds on 0.5 s ticks, and leaves the P and S onsets unlabelled. Kids is served as Easy (meta `requested_difficulty`).
- `mode`: `locate` (seismograms and a map) or `readings` (separate lag, distance and origin-time questions).
- `count`: 4–8 questions; values outside are clamped and recorded as `requested_count`. On a locate page the questions are, in order: stations A, B and C, the epicentre, the nearest station, the origin time, the P travel time to B and the S travel time to C.
- `width`, `height`, `line`: page size and base line width in Pt.

**Generation**

The epicentre is placed on a grid point of a 16 × 12 square map. Each station is a whole-number offset from it with a whole-number length (a Pythagorean offset such as 6, 8 → 10 squares), so every circle has an exact radius and every lag lands on a tick. The three offsets must have different lengths, be at least 3 squares apart, point in directions at least 30° apart (and not nearly opposite, which would make circles graze), and each pair of circles' second crossing must be well away from the third circle, so the common point stands out. Seismograms are drawn quiet, then small P shaking, then large S shaking, with each onset on a tick.

**Solving**

Distances are lag × 10 km. Origin and travel times are exact fractions of a second rounded to 0.1 s; with these speeds a time is always a multiple of 1/6 s, so a printed value never sits on a rounding boundary.

**Guarantees**

- Every answer is re-derived by a second route in floating point: each trace's lag through the speeds must equal the station's distance measured on the map; a brute-force search of every kilometre point on the map finds exactly one point on all three circles, and it is the printed epicentre; the stations are never in a line, so the circles cannot meet anywhere else.
- No printed time is within 10⁻⁹ of a rounding boundary.
- Meta: `answers_checked`, `difficulty`, `rating_basis` (map scale, lag resolution and labels by level), the model's speeds, the epicentre and the stations.
