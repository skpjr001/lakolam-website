---
title: "Launch Windows"
blurb: "Launch windows: the porkchop plot of launch energy and arrival speed for every departure and arrival date between two planets"
category: design
version: "1.0.0"
---
The mission planner's "porkchop plot": the energy to reach another planet
for every launch date and every arrival date, as a contour map.

## What it is

To send a probe from Earth to Mars you choose a day to leave and a day to
arrive. For each such pair there is exactly one path round the Sun that
joins the two planets on those days, and it asks a certain amount of
energy of the rocket. This page works that out for thousands of pairs and
draws it as a map: launch date along the bottom, arrival date up the side.
The cheapest launches form a hollow — the best one is marked — inside rings
of rising energy. Two lobes appear, quick trips that go less than halfway
round the Sun and slow ones that go more than halfway, split by a ridge
where the trip would be exactly half a turn. The shape reminded engineers
of a pork chop, and the name stuck. Dashed lines show how fast the probe
arrives; faint diagonals mark equal flight times.

## How to use it

Read it like a weather map. Find the marked point: that is the cheapest
day to launch, and the label at the top gives its date, energy and flight
time. Follow a solid line to see which other launch and arrival dates cost
the same energy — the wider the hollow, the more forgiving the window.
Cross a dashed line to see how fast the probe would hit the target's
atmosphere. Try another year: Mars windows come round every 26 months,
Venus every 19, Jupiter every 13. The art style drops the words and keeps
the shapes, for framing.

## Purpose

A real engineering chart, computed exactly from the planets' orbits, that
shows why missions launch in short windows and why some years are better
than others. It also makes a striking print: every curve is a statement
about orbital mechanics.

## History

Lambert posed the problem of the orbit through two points in a given time
in 1761 (*Insigniores orbitae cometarum proprietates*); Gauss solved it for
the orbit of Ceres in 1801. Plots of launch energy against departure and
arrival dates were drawn at the Jet Propulsion Laboratory from the early
1960s for the Mariner missions, and NASA's *Interplanetary Mission Design
Handbook* (Sergeyevsky, Snyder and Cunniff, JPL Publication 82-43, 1983;
later volumes by George and Kos) printed them for every opportunity. The
method here follows R. R. Bate, D. D. Mueller and J. E. White,
*Fundamentals of Astrodynamics* (1971), and H. D. Curtis, *Orbital
Mechanics for Engineering Students*. Planet positions come from E. M.
Standish, "Approximate Positions of the Planets" (JPL), valid 1800–2050.

## This implementation

- **Spec knobs:** `route` (auto, earth_mars, earth_venus, earth_mercury,
  earth_jupiter, earth_saturn, mars_earth, venus_earth), `year` (the first
  window after January 1, 1800–2045), `window_days` (departure span, 0 =
  framed automatically; 20–1500), `resolution` (grid samples across, 40–240),
  `contours` (both, c3, arrival_speed), `flight_time_lines`, `style` (chart,
  art), `palette` (auto, vintage, blueprint, sunset, nebula, ink), `width`,
  `height`.
- **Generation:** the window is centred on the first date after January 1
  when the target leads the departure planet by the Hohmann phase angle. A
  coarse 48 × 48 survey over a wide box finds the region of low launch
  energy, and the plot is framed on it (a given `window_days` is centred on
  the survey's best launch). For every grid point, planet positions come
  from JPL's Keplerian elements and velocities from central differences
  over ±0.01 day; Lambert's problem is solved for one prograde revolution
  by universal variables (bisection on z). C3 = |v₁ − v_planet|² in km²/s²
  and the arrival excess speed |v₂ − v_target| in km/s are contoured at
  "nice" steps from the minimum (marching squares on a bilinear resampling,
  filled bands for C3, dashes for speed). Transfers within 1.5° of a half
  turn are not plotted: there the transfer plane is undefined and the
  energy spikes along a ridge narrower than the grid. The seed picks the
  route and palette when they are `auto`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; every plotted transfer, re-propagated
  with the universal-variable two-body propagator for its flight time,
  reaches the target within 10⁻⁸ AU (`verification:
  lambert_repropagated`); each cell's ends are the planets' true positions
  on those dates; the Earth–Mars 2026 window's minimum C3 is about
  9 km²/s², inside the published range; clamped year, window or resolution
  is reported (`requested_year`, `requested_window_days`,
  `requested_resolution`); everything stays inside the page.
