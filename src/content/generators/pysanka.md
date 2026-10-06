---
title: "Pysanka"
blurb: "Pysanka designs: Ukrainian Easter eggs divided and filled with roses, suns, wheat and wolf's teeth"
category: design
version: "1.0.0"
---
Designs for Ukrainian Easter eggs: the egg divided by lines into fields,
the fields filled with stars, suns, wheat and wolf's teeth.

## What it is

A pysanka design, shown on the egg itself or flat as a template. The egg's
surface is first divided: into gores running from top to bottom, into a
belt round the middle with caps above and below, into four great triangles
on each half, into eight gores of six triangles each, into an eight-pointed
star round each end with lozenges between, or into a ring of lozenges.
Every field of one kind is then filled the same way — an eight-pointed
star rose or a sun, ears of wheat, wolf's teeth, ladders, dots or nested
triangles — so the design turns round the egg. The colours are those of
dyed eggs: white lines with yellow, orange and red on black, or on a red or
a yellow egg. The template shows the whole surface peeled flat, like the
skin of an orange.

## How to use it

Use the egg page as a picture to colour or frame, and the template as a
plan for decorating a real egg: the gores show the whole surface at once,
and the lines of the division are the first ones to draw. On a real
pysanka, lines are drawn in wax with a stylus and the egg is dyed from the
lightest colour to the darkest, waxing each colour you want to keep before
the next dye bath — white lines first, then yellow, orange, red and finally
black. To colour the line-art page, keep each kind of field to one colour
all round the egg; small black shapes are already inked.

## Purpose

A pysanka is geometry on a curved surface: a division with a clear
symmetry, then fields filled consistently. Building designs that way — on
a true sphere, then shown as an egg or as flat gores — gives pages that are
faithful to how the designs are made and always balanced, with endless
variety in how divisions, motifs and colours combine.

## History

Pysanky (singular pysanka, from pysaty, "to write") are eggs decorated by
the wax-resist method: designs are written in beeswax with a stylus called
a kistka, and the egg is dipped in successive dyes. The tradition is
ancient in Ukraine and was folded into Easter customs after Christianity
arrived; eggs are made in the weeks before Easter, blessed and given to
family and friends. Designs and colours vary from region to region and
village to village, and the motifs carry meanings in folk tradition —
the eight-pointed star rose, the sun, wheat for a good harvest, the wolf's
teeth, the endless line. Writers of pysanky plan a design by first
dividing the egg with lines; well-known divisions include those into
gores, belts, triangles and the many-triangle division called sorokoklyn,
"forty wedges". The designs on these pages are original arrangements in
that spirit; they are not copies of any region's or village's patterns.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`, `division` (auto, meridian,
  belt, four_sides, forty_eight, star, diamonds), `output` (egg, template),
  `palette` (classic, red_ground, light), `line_art`, `stroke`.
- **Generation:** every shape is a closed outline on the unit sphere:
  fields are polygons in longitude and latitude with their edges subdivided
  (loops round a pole are carried on through a full turn rather than back
  across it), and motifs are drawn in the tangent plane at their centre and
  projected onto the sphere, so a star stays a star near the poles. The
  seed swaps the two field colours, picks a rose or a sun as the main motif
  and sets other choices. For the egg view the sphere is turned so a mirror
  plane of the design faces the viewer, tipped toward the viewer by 16 to
  26 degrees, and each shape is clipped to the visible half, the cut closed
  along the edge of the visible disc; the disc is then drawn as an egg,
  slightly narrower at the top. For the template each shape is clipped to
  each gore by the two planes bounding it and mapped by the sinusoidal
  projection centred on the gore; a tall page takes the gores in two rows.
  Pieces under 1.5 square points are dropped as invisible slivers. The
  forty-eight division here is eight gores of six triangles, one common way
  of drawing sorokoklyn.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Tested: every design is invariant
  shape for shape under a turn of 360/d degrees about the egg's axis, where
  d is the reported `symmetry_order` (and not under half that turn), and
  under reflection in each of its mirror planes; the egg view is
  mirror-symmetric on the page and every point lies inside the egg's
  outline; clipping keeps exactly the visible part; every template shape
  lies inside its gore; only the palette's inks are used; line art passes
  the adult colourability check (pieces too small to colour are inked
  solid).
