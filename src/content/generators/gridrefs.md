---
title: "Map Skills"
blurb: "Map skills — 4- and 6-figure grid references, symbols, compass directions and distances on a generated coastal map, every answer checked"
category: maths
version: "1.0.0"
---
Grid references, compass directions and distances on a freshly drawn coastal map.

## What it is

A map worksheet. The top of the page is a coloured map of a stretch of
coast — sea, a river running down to it, roads with a bridge, woods, and
symbols such as a church, a school, a windmill, a castle and a car park —
covered by a numbered grid, with a key, a north arrow and a scale bar
beside it. Below are four to ten questions: give the grid reference of a
symbol, say which symbol is in a given square, say which compass
direction one place is from another, and measure how far apart two places
are. The answer key fills in every answer line.

## How to play

Each grid square is 1 km across, and north is at the top of the map.

- **Four-figure grid references** name a square. Find the number of the
  line on the square's left (the easting, read along the bottom), then
  the number of the line along its bottom (the northing, read up the
  side). Write them together: easting 35 and northing 42 make 3542.
  "Along the corridor, then up the stairs."
- **Six-figure grid references** pin a point inside a square. Split the
  square into tenths each way in your head; count the tenths across from
  the left-hand line and add that digit after the easting, then the
  tenths up from the bottom line after the northing: 354 427. A teacher
  will usually accept one tenth either way.
- **Letter and number squares** (on maps with letters along the bottom):
  give the column letter, then the row number, such as C4.
- **Directions:** north is up, south down, east right and west left.
  Between them are north-east, south-east, south-west and north-west.
  Imagine standing at the second place in the question and looking
  towards the first.
- **Distances:** measure the straight line between the two symbols with a
  ruler and compare it with the scale bar, or count squares — each square
  is 1 km across. Diagonal distances can be measured, or worked out with
  Pythagoras' theorem from the distance across and the distance up.

## Purpose

Reading grid references, using the eight points of the compass and using
a scale to find distances are the core map skills of England's geography
curriculum: four-figure references and eight compass points at Key Stage
2, six-figure references and scale at Key Stage 3, and Ordnance Survey
map work at GCSE. US and Indian social studies teach the same ideas with
letter-number grids and the cardinal and intermediate directions. A map
that changes every time gives fresh practice that cannot be copied from
last year's sheet.

## History

The British national grid was devised by the Ordnance Survey in 1936,
during the retriangulation of Great Britain, so that any place could be
named by numbers measured east and north from a false origin south-west
of the Isles of Scilly; its 1 km squares are printed on every OS
Explorer and Landranger map. Lettered and numbered squares are older
still — town plans and road atlases used them in the nineteenth century —
and the eight-point compass rose goes back to medieval sea charts, where
it was drawn with the eight principal winds.

## This implementation

- **Spec knobs:** `difficulty`; `style` (`numbers` — numbered grid lines,
  four- and six-figure references; `letters` — lettered columns and
  numbered rows, squares such as C4, no six-figure work); `count` (4-10);
  `squares` across and up the map (6-12); `width`, `height`, `line`.
  `count` and `squares` outside their ranges are clamped and recorded as
  `requested_count` and `requested_squares`.
- **Generation:** the sea lies along one edge behind a coastline made of
  two sine waves; a river meanders from near the far edge down to the
  sea; one road crosses the land (and the river, at a bridge) and another
  runs down towards the coast away from the river. Up to twelve named
  symbols, each a different kind, and two or three woods are placed one
  per square, on land and clear of the river and roads, with each centre
  on an exact tenth of its square between three and seven tenths in, so
  no symbol touches a grid line. Some symbols are placed a measurable
  distance from another (whole kilometres, or a Pythagorean pair such as
  0.6 and 0.8 km across and up for 1 km). Kids pages ask for references,
  what is in a square and directions due north, south, east or west;
  Easy uses all eight compass points; Medium adds straight-line distances
  in whole kilometres; Hard adds six-figure references and distances to
  a tenth of a kilometre; Expert adds which symbol is at a six-figure
  reference. On letter-style pages, six-figure questions become square
  questions. No square is the subject of two reference questions, so no
  question gives another away.
- **Solving:** answers are read off the map model: a symbol's square or
  its exact tenths, the one symbol in a square, the compass point nearest
  the true bearing, and the length of the straight line in tenths of a
  kilometre.
- **Guarantees:** `answers_checked` — named symbols appear once each, one
  symbol per square, every symbol at least a tenth of a square clear of
  the grid lines and on land; a square asked about holds exactly one
  symbol (bridges included); a direction is asked only when the bearing
  is at least 10° from the boundary between two compass points; a
  distance is asked only when it is a whole number of tenths of a
  kilometre (whole kilometres at Medium). The tests re-read every answer
  from the printed labels — parsing each reference back to a square or a
  point and finding which drawn symbols reach into it — recompute
  directions by a different method (the nearest of the eight compass
  unit vectors), check distances by integer squares, and check that the
  key writes exactly the answers in red and that everything lies on the
  page at every size.
