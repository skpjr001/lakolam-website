---
title: "Tide Curves"
blurb: "Tides: an invented harbour's year of water levels from harmonic constituents, as month strips, a tide-clock spiral or a woven tide-table ribbon"
category: design
version: "1.0.0"
---
A year of tides at an invented harbour, predicted from the real tidal
constituents and drawn as month strips, a tide-clock spiral or a woven
tide-table ribbon.

## What it is

The sea rises and falls because the Moon and the Sun pull on it. Their
pull can be split into a set of steady rhythms called tidal constituents:
M2, the main lunar tide, every 12 hours 25 minutes; S2, the solar tide,
every 12 hours; N2 for the Moon's changing distance; K1 and O1, the
once-a-day tides from the tilt of the Moon's and Sun's paths; and
shallow-water overtides such as M4. Each harbour answers every rhythm with
its own height and its own delay, and the tide is the sum of them all.
When the lunar and solar tides line up — a day or two after new and full
moon — the range is largest (spring tides); a week later they work against
each other (neap tides).

This generator invents a harbour of one of three kinds — semidiurnal (two
nearly equal tides a day, like much of the Atlantic), mixed (two unequal
tides, like much of the Pacific) or diurnal (one tide a day, like parts of
the Gulf of Mexico and South-East Asia) — and predicts its whole year.
**The harbours are invented. These pages are art and teaching material,
not tide tables: never use them for navigation.**

## How to use it

In the month strips, each row is a month, one day per column; watch the
waves swell into spring tides just after the full and new moons marked
above the strip, and shrink at the quarter moons. In a mixed or diurnal
harbour the pattern follows the Moon's swing north and south instead, with
the biggest tides about every two weeks whatever the phase. The tide
clock turns once per lunar month with new moon at the top: spring tides
gather at the same angles round the spiral, just past the new and full
moon lines. The ribbon plots every high water (warm) and low water (cool)
by time of day across and day of the year down; each strand drifts about
fifty minutes later every day, and thick stretches are big tides. Use
them to talk about why tides come later each day, why springs follow the
full moon, or simply as a print of a year by the sea.

## Purpose

To show what a tide prediction really is — a sum of a few dozen steady
waves, set going by the Moon and the Sun — and make its beats visible as a
pattern, without pretending to be data for any real place.

## History

Isaac Newton explained the tides by gravity in the *Principia* (1687).
Pierre-Simon Laplace's dynamic theory (1775–76) showed that the response
of the oceans keeps the frequencies of the forcing, which is what makes
harmonic prediction possible. William Thomson (Lord Kelvin) introduced
harmonic analysis of tide records in 1867 and built the first
tide-predicting machine, which summed constituents with pulleys, in
1872–73; George Darwin refined the method in the 1880s. Arthur Doodson
expanded the tide-generating potential into hundreds of terms (1921),
each named by its "Doodson number", and Paul Schureman's *Manual of
Harmonic Analysis and Prediction of Tides* (US Coast and Geodetic Survey,
1940) gave the node factors still used today. The ratio
F = (K1 + O1)/(M2 + S2) that sorts harbours into semidiurnal, mixed and
diurnal is usually credited to A. Courtier (1938). The delay of spring
tides after the new and full moon, the "age of the tide", was noted by
Pliny the Elder.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000); `harbour`
  (`auto` picks per seed, `semidiurnal`, `mixed`, `diurnal`); `year`
  (1900–2100); `view` (`months`, `spiral`, `ribbon`); `palette` (`sea`,
  `dusk`, `ink`); `moon` (phase markers); `stroke`.
- **Generation:** fifteen constituents — M2, S2, N2, K2, NU2, 2N2, L2,
  K1, O1, P1, Q1, M4, MS4, MN4, M6 — at NOAA's published speeds. The tide
  is `h(t) = Σ fᵢHᵢ cos(ωᵢt + V₀ᵢ + uᵢ − gᵢ)` with `t` in hours from
  1 January 00:00 UT. `V₀` is the Doodson combination of the mean solar
  hour angle and the mean longitudes of the Moon, Sun and lunar perigee
  at the start of the year (Meeus's polynomials); `f` and `u` are
  Schureman's node factors at mid-year (L2 takes M2's, a simplification;
  overtides take powers of M2's). The harbour's amplitudes and lags are
  invented from realistic ranges for its type: S2/M2 0.28–0.42, N2/M2
  0.17–0.23, K1/O1 1.0–1.6, the form factor in its class, and the S2 lag
  set from an age of the tide of 24–60 hours (with similar parallax and
  diurnal ages for N2 and the diurnal family). Moon phases come from
  Meeus's phase algorithm (`lako-astro`). Highs and lows are the sign
  changes of the exact derivative on a six-minute scan, refined by 40
  bisections. Mean spring and neap ranges are the largest and smallest
  daily ranges around each syzygy and quarter.
- **Guarantees:** deterministic per seed. Every constituent's speed equals
  NOAA's published value and the Doodson sum of the astronomical speeds
  (tested to 2·10⁻⁷ °/h). Every high and low water is a true extreme
  (derivative under 10⁻⁷ m/h, higher or lower than its neighbours), highs
  and lows alternate, and none is missed (an independent one-minute scan
  finds the same count) — tested for all three kinds. Each kind has its
  form factor (semidiurnal under 0.25, mixed 0.25–1.5, diurnal over 3).
  For semidiurnal harbours the greatest range follows each new and full
  moon by the designed age of the tide (mean lag 0.5–3.5 days and within a
  day of the design, every lag −1 to 5 days; checked over six seeds and
  the years 1950, 2026 and 2090 against Meeus's phases, which are computed
  independently of the tidal arguments). All ink lies inside the page at
  every size, view and stroke (tested without the page clip). The caption
  and meta say the harbour is invented and not for navigation
  (`invented: true`, `navigation: false`). `verification:
  published_speeds_exact_extremes_springs_follow_syzygy`. Clamped knobs
  are reported as `requested_<field>`.
