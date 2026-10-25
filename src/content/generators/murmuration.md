---
title: "Flocking Trails"
blurb: "Flocking trails: Reynolds boids drawn as tapered streaks — starlings over a horizon, fish round rocks, a vortex mill"
category: design
version: "1.0.0"
---
Hundreds of birds or fish, each following three simple rules — and the
streaks they leave behind as the flock wheels, folds and mills.

## What it is

A flock simulation drawn as long-exposure trails. Every agent sees only its
near neighbours and does three things: keeps a little space, turns to match
their heading, and drifts toward their middle. No one leads, yet a flock
forms. Each agent's last moments are drawn as one tapering streak, thin at
the tail and full at the head. Three scenes: starlings wheeling over a low
horizon at dusk, a shoal of fish milling round a pool and swerving round
rocks, and a vortex mill of concentric lanes.

## How to use it

Frame it — it reads as a long-exposure photograph of birds at dusk or koi in
a pond. Try the long-trail ink version for a single sweeping gesture of a
flock. In line art, use it as a background to colour with soft washes, or
follow single streaks with a coloured pen.

## Purpose

A picture of emergence: order made by nothing but local rules. It also makes
quiet, moving art from a few lines of behaviour.

## History

Craig Reynolds described his "boids" in 1987 ("Flocks, herds and schools: a
distributed behavioral model", SIGGRAPH) — separation, alignment and
cohesion — and the model has animated film flocks ever since. Physicists
later studied the same mills and murmurations: Tamás Vicsek's self-propelled
particles (1995), and the field studies of starling flocks over Rome by
Andrea Cavagna, Irene Giardina and colleagues (from 2008). Fish mills —
schools circling an empty centre — are a classic collective state described
by Iain Couzin and colleagues (2002).

## This implementation

- **Spec knobs:** `flock` (auto, starlings, fish, vortex), `agents`
  (20–400), `steps` (50–600), `trail` (steps of history per streak, 4–300),
  `separation`, `alignment`, `cohesion` (0–3 each), `streak` (head width,
  0.3–8 pt), `palette` (natural, ink, line_art), `width`, `height`,
  `margin`.
- **Generation:** a synchronous boid step: every acceleration is computed
  from the previous state, neighbours within a vision radius found with a
  spatial grid (reported in index order), then every agent moves in index
  order. Forces: separation inside a personal radius, alignment toward the
  neighbours' mean velocity, cohesion toward their centre, a small seeded
  wander, and the scene's force — a roost point on a slow Lissajous path for
  starlings; a tangential push plus a spring toward a preferred radius for
  fish and the vortex; a push out of a buffer ring round each rock; soft
  walls. Speeds are clamped to a band, and positions to the bounds with
  reflection. Each streak is the outline of the last `trail` positions with
  half-width growing as (s / length)^0.85, a rounded head, smoothed by a
  Catmull-Rom spline. Over-range knobs are clamped and recorded as
  `requested_<field>`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  agents_stay_in_bounds`. Tested: every recorded position of every agent
  lies inside the bounds (above the land for starlings) and outside every
  rock; no step is longer than the top speed; there is exactly one trail per
  agent and every trail is drawn; alignment measurably lines up neighbours'
  headings; all ink inside the page; the default page takes well under a
  tenth of a second.
