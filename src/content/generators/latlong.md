---
title: "Latitude and Longitude"
blurb: "Latitude, longitude and local time — read and plot points on a graticule, distances along a meridian, local sun time at 4 minutes per degree, every answer recomputed"
category: maths
version: "1.0.0"
---
Read and plot points on a map grid, find distances along a meridian, and work out local time at 4 minutes per degree.

## What it is

A geography worksheet of four to ten questions on the grid of parallels
and meridians. A map of lines of latitude and longitude, with the equator
and prime meridian marked where they cross it, carries six lettered
points: pupils write each point's latitude and longitude, mark new points
from their coordinates, and say which point shares a parallel or a
meridian with another. Other questions find the distance between two
places on the same meridian or on the equator, the local time at one
longitude when the time at another is known (with the day, when midnight
is crossed), and a town's longitude from how far its time is ahead of or
behind Greenwich. A box at the top states the facts the page uses. The
answer key fills in every answer and marks the plotted points.

## How to play

1. **Reading a point:** follow the lines to the edges of the map. Write
   the latitude first (degrees north or south of the equator), then the
   longitude (degrees east or west of the prime meridian): 20°N, 35°W.
   The equator is 0° latitude and the prime meridian 0° longitude.
2. **Plotting:** find the latitude on the side and the longitude along the
   bottom, and mark where they cross. A point half-way between two lines
   is 5° from each when the lines are 10° apart.
3. **Same parallel or meridian:** points on one parallel have the same
   latitude; points on one meridian have the same longitude.
4. **Distance:** along a meridian or the equator, each degree is about
   111 km. If both places are on the same side of the equator, subtract
   their latitudes; if on opposite sides, add them. Multiply by 111.
5. **Local time:** the Earth turns 360° in 24 hours, which is 15° each
   hour or 4 minutes for each degree. Find how many degrees apart the two
   places are (subtract if both are east or both west, add if one is east
   and one west), multiply by 4 minutes, then add the time if the place is
   further east, or take it away if it is further west. 30' (30 minutes of
   arc) is half a degree, worth 2 minutes of time.
6. If the time passes midnight, it is the next day (going east) or the
   previous day (going west).
7. **Longitude from time:** divide the time difference in minutes by 4 to
   get degrees; ahead of Greenwich is east, behind is west.

## Purpose

Latitude, longitude and local time are taught in India's CBSE class 6
("Globe: Latitudes and Longitudes", with the famous 4 minutes per degree)
and class 11 practical geography, in England's Key Stage 2 and 3
geography, and in US middle-school world geography. The skills — reading
a grid with two directions, adding across the equator and the prime
meridian, turning degrees into time — use number sense as well as maps,
and local time explains why the Sun rises earlier in the east. The page
keeps to sun time, so every answer is exact.

## History

Hipparchus proposed a grid of latitude and longitude in the second
century BC, and Ptolemy's *Geography* (about AD 150) listed some 8,000
places by their coordinates. Latitude can be measured from the Sun or the
Pole Star, but longitude needs the time difference from a reference
place, 4 minutes for every degree; sailors could not measure it until
John Harrison's marine chronometers of the 1760s. The International
Meridian Conference of 1884 fixed the prime meridian at Greenwich, and
standard time zones gradually replaced local sun time in the decades
around it.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `map`, `time`,
  `distance`); `count` (4-10, at most 6 for `map`, which has six lettered
  points; clamped and recorded as `requested_count`); `width`, `height`,
  `line`.
- **Generation:** Easy draws a 60° × 40° map with lines every 10° and
  points on their crossings, and asks local time from noon at Greenwich to
  whole hours east or west (multiples of 15°). Medium uses a 40° × 30° map
  with lines every 5°, plotting, any whole-degree longitude (4 minutes
  each) and distances across the equator. Hard and Expert maps straddle
  the equator and the prime meridian with points half-way between 10°
  lines; Hard asks times between two places neither of them Greenwich,
  with whether it is the same, next or previous day, and longitude from a
  time difference; Expert uses degrees and minutes of arc (multiples of
  30') and names the day of the week. Point B always shares its parallel
  with exactly one other point, and C its meridian. Kids is served at
  Easy (meta `requested_difficulty`). No question repeats on a page.
- **Time zones and summer time:** left out on purpose. Real zone
  boundaries and daylight-saving rules are political and change, so the
  page states that its times are local sun time on a 24-hour clock (meta
  `time_basis`), which makes every answer exact.
- **Solving:** the checker recomputes every answer by a second route:
  times from hours (degrees ÷ 15) and days by floor division of minutes in
  the week, where the generator adds 4 minutes per degree; coordinates by
  formatting the stored point, and "same parallel" answers by counting
  the points on that line, which must be exactly one.
- **Guarantees:** `answers_checked` and `unique`. The tests check the
  textbook case (noon at Greenwich is 17:30 at 82°30'E), recompute times,
  days, distances and longitudes a third way in floating point, read
  every point back from where it is drawn, round-trip every printed angle,
  catch a changed answer, and keep the map clear of the questions.
