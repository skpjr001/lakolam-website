---
title: "Slab-built boxes"
blurb: "Slab-built boxes — gingerbread houses, species-sized nest boxes and planters with thickness-compensated pieces, proven in 3-D to close at every joint and cut from the stated board or baking sheets"
category: design
version: "1.0.0"
---
A gingerbread house, a nest box sized for a bird species, or a planter,
with every piece sized for the thickness it is cut from so the joints
close.

## What it is

Templates and cut lists for boxes built from flat slabs: gingerbread dough
for a house, wooden boards for a nest box or a planter. A slab has
thickness, so a box cannot simply be cut as a net of its outside faces:
the front and back walls run the full width, the side walls fit between
them, a floor fits inside all four walls, and the two panels of a 45°
roof lap at the ridge, the longer one over the shorter. Every size on the
page has the thickness already allowed for. The first page shows the
finished box and the cut list; the next pages give full-size templates for
gingerbread, or a cutting diagram on the board for wood.

## How to use it

1. Gingerbread: roll the dough to the thickness on the page, lay the
   templates on it and cut round them, bake, and trim the edges straight
   while still warm. Stand the front and back on a cake board with the
   sides between them, glued with royal icing; when firm, add the short
   roof panel, then the long one lapping it at the ridge.
2. Wood: choose the board in the plan (or set its size), mark the pieces
   end to end as in the cutting diagram, allowing the saw's kerf, and cut.
   Glue and screw the sides between the front and back, set the floor
   inside the walls, and fit the roof. A nest box needs drain holes in the
   floor and no perch; hinge or screw one side so it can be cleaned out.
3. Cut every piece exactly to the sizes listed: the joints are designed to
   close at the stated thickness.

## Purpose

Gingerbread house templates are a seasonal favourite, and nest boxes and
planters are classic first woodworking projects. Templates often ignore the
thickness of the material, leaving gaps at the corners or walls that do
not meet the roof. Here the box is assembled in 3-D before it is printed:
no piece runs into another, every joint closes, and the inside is sealed.

## History

German Lebkuchenhäusel were baked from the 19th century, popularised by
the tale of Hansel and Gretel. Nest boxes for wild birds spread in the
19th and 20th centuries; bluebird trails of boxes built to published
sizes helped the eastern bluebird recover in North America, and projects
such as Cornell's NestWatch publish the sizes for each species.

## This implementation

- **Spec knobs:** `kind` (`gingerbread`, `birdhouse`, `planter`);
  `species` (birdhouse only: `eastern_bluebird`, `house_wren`,
  `black_capped_chickadee`, `tree_swallow`, `tufted_titmouse`,
  `carolina_wren`); `width_cm`, `depth_cm` (6–80) and `height_cm` (5–60),
  null for the kind's usual size and ignored for a birdhouse;
  `thickness_mm` (3–40, null for 5 mm dough or 19 mm wood);
  `stock_width_mm` (50–600) and `stock_length_mm` (300–3000), the board or
  baking sheet, null for a 140 × 1829 mm board or a 330 × 460 mm sheet;
  `look`; `index`; `page`; `margin` (inches).
- **Generation:** each piece is a convex outline extruded along one axis.
  A nest box's inside floor and entrance follow its species (entrance
  diameter, floor side and entrance height above the floor, from common
  nest-box guidance), its walls reaching 40 mm above the entrance. A slab
  thicker than a sixth of the smallest side, or thinner than a sixtieth of
  the largest, is clamped and recorded as `requested_thickness_mm`. A
  planter's walls are one board wide (taller walls are lowered and
  recorded); its floor is cut in strips when wider than the board. A piece
  wider or longer than the stock widens or lengthens the stock (recorded).
  Wood is packed end to end on boards with a 3 mm kerf (first fit by
  decreasing length); gingerbread pieces are packed in rows on baking
  sheets and as full-size templates on pages, the house shrunk (recorded)
  if a piece would not fit a page. The seed shades the colours.
- **Solving:** nothing to solve.
- **Guarantees:** `joints_checked`. No two pieces overlap (separating-axis
  test on the convex slabs). Every joint face — side walls against front
  and back, floor against all four walls, gable edges against the roof
  undersides, the short roof panel's ridge end against the long panel —
  lies wholly on the face it butts against, so each joint closes at the
  slab thickness. On a grid of one 2.5th of the thickness, no point inside
  the box has a neighbour outside it except where the box is open by
  design (the cake board under a house, the top of a planter). Every cut
  lies on the stock and no two cuts (kerf included) overlap. The tests
  measure the species sizes on the pieces and compare the pieces' volume
  with a grid count.
