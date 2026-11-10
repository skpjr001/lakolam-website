---
title: "Rosemaling Folk Painting"
blurb: "Rosemaling-style folk painting in the manner of Norway: C- and S-scrolls, acanthus and roses in Telemark, Rogaland and Hallingdal styles"
category: design
version: "1.0.0"
---
Folk painting in the manner of Norwegian rosemaling: C- and S-scrolls,
acanthus, roses and tulips on a plate, a box lid or a panel, in the
Telemark, Rogaland and Hallingdal manners.

## What it is

A design in the manner of *rosemaling*, "rose painting", the decorative
painting of rural Norway. It is painted with a brush on wooden bowls,
plates, ale bowls, boxes, chests, cupboards and the walls of farmhouses.
Every shape is a brush stroke. A *comma stroke* has a round head and
tapers to a point. A *C-scroll* is a long, swelling curve that winds into
a curl. An *S-scroll* turns one way and then the other. Leaves are drawn
as acanthus with curling lobes. The roses are a round bowl with petal
strokes sweeping round it. Thin *liner* strokes add curls, dots and
highlight lines. Three regional manners are drawn here. Telemark is
asymmetric and airy: two scrolls grow from one root, C against S, with
acanthus and few flowers. Rogaland is mirror-symmetric and more formal,
with every stroke outlined, usually on a dark ground. Hallingdal is
mirror-symmetric too, with bold roses, tulips and leaves in strong colour.
The piece is a round plate with a border band, an oval box lid or a
rectangular panel.

## How to use it

Follow the main scroll from its root to its curl and see how the smaller
scrolls, leaves and flowers branch off it. In the Rogaland and Hallingdal
manners, fold the picture down the middle in your mind: the two halves
match exactly. Try the grounds: red, blue-green, ochre and black are the
traditional ones. The line-art style is a colouring page. Rosemaling
painters keep to a few colours and repeat them across the design.

## Purpose

A celebration of a painted folk art made of flowing brush strokes, and of
the grammar under it: the C, the S, the comma and the curl. Made for
looking, copying and colouring.

## History

Rosemaling grew up in the farming valleys of Norway from about the 1750s
to the 1850s. Rural painters took the acanthus and C-scroll ornament of
Baroque and Rococo carving and church decoration and turned it into a
free brush art of their own. Many were travelling painters who decorated
homes and household goods for a living. Each district developed its own
manner, and Telemark, Hallingdal, Rogaland, Valdres and Gudbrandsdal are
among the best known. Thomas Luraas (1799-1886) of Telemark is one of the
most celebrated painters of the Telemark scroll style. The art faded in
the later 19th century. It was carried to North America by Norwegian
emigrants and revived there in the 20th century. Per Lysne (1880-1947),
a Norwegian-born painter in Stoughton, Wisconsin, is often credited with
the American revival. Vesterheim, the National Norwegian-American Museum in
Decorah, Iowa, has held a national exhibition of rosemaling and other
Norwegian folk art since 1967. Rosemaling is still taught and painted in
Norway and America. This page invents its compositions from the
regional grammars. It does not copy any painter's work or any heirloom
piece.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 600).
  `layout` is `plate` (default), `oval` or `panel`. `region` is
  `telemark`, `rogaland` (default) or `hallingdal`. `ground` is `auto`
  (default: blue-green for Telemark, black for Rogaland, red for
  Hallingdal), `red`, `blue_green`, `ochre` or `black`. `style` is
  `colour` (default) or `lines`. `border` (default on) is the border band of
  repeated motifs. `liners` (default on) is the fine liner work. `weight`
  (0.5-1.6, default 1) is the brush weight. `margin` (0-200 pt, default 18)
  is the space round the piece.
- **Generation:** each stroke's centre line is integrated from a
  curvature profile. A C-scroll's curvature grows with the cube of the
  distance along it, so it winds into a curl. An S-scroll's curvature
  changes sign. Acanthus leaves and petals bend at a constant or steadily
  growing rate. A taper profile gives the half-width along the line: the
  comma has a round head, the scroll a long taper, and the leaf and the
  swell are pointed at both ends. The half-width is capped at 0.85 × the
  radius of curvature, and the outline (left edge out, tip, right edge
  back, and a round head for a comma) is checked for crossings. One that
  crosses is thinned and rebuilt, up to five times. Telemark grows one
  dominant C-scroll up one side, across the top and down into a curl, and
  a counter-scroll from the same root along the bottom and up. A C curls
  inward from the rise, and acanthus springs outward from the crown and
  the counter-scroll. Roses sit in both curls. Rogaland and Hallingdal grow
  the right half and mirror it. That half has a great C-scroll rising from
  the foot, an S-scroll with a bud, acanthus at its bend and at its foot,
  a flower in its curl, a tulip on a stem and an inner C. The central rose,
  the crowning tulip and the base fan sit on the axis and are built
  symmetric. An acanthus is a broad blade whose spine winds into a
  turned-over tip. Its scalloped lobes curl forward over themselves, and
  a light turnover stroke and a vein are laid on it. A rose has rings of
  crescent petals round its bowl (two layered rings in Hallingdal), comma
  petals, a light arc and seeds. A gap filler then repeatedly takes the
  point of the field farthest from any painted outline. The field is an
  ellipse or a box with the field's aspect; for the mirrored manners, only
  the right half counts and the axis acts as a wall. It grows something
  there from the nearest scroll's centre line: in a wide gap, a secondary
  C-scroll ending in a rose (a few per page), a tulip or an acanthus; in a
  middling gap, an acanthus or a curling leaf with a liner curl; in a
  small gap, liner curls and dots. It stops when the widest gap falls
  below a threshold, and an element that would leave the field is
  dropped. The composition then gets a mild stretch towards the field's
  aspect (0.8-1.3) and one uniform scale, so its widest outline point
  lies at 0.97 of the field's edge. Border motifs (comma pairs and lenses,
  or lenses and dots for Rogaland) are spaced evenly by arc length from
  the top centre of the band's middle line. Each is symmetric about its own
  normal. Rogaland strokes are outlined.
- **Guarantees:** in the Rogaland and Hallingdal manners the whole piece,
  border included, is mirror-symmetric. The tests reflect every outline
  point across the axis and find it on a stroke of the same paint, to
  10⁻⁶ of the page size, for every layout. Every outline is closed and
  simple (no self-crossings), checked by the polygon arrangement test,
  which is independent of the check that built it. Every brush stroke
  tapers to a point at its tip, which is a vertex of its outline. Every
  composition point lies inside the field, and every border point lies in
  its band. All ink is inside the page.
  `verification: mirror_exact_strokes_closed_simple_tapered_inside_shape`.
  The line-art page reports the adult colourability check as `colorable`
  (overlapping strokes leave small regions, so it usually fails). Clamped
  knobs are reported as `requested_<field>`.
