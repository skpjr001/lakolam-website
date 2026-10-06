---
title: "Hex Signs"
blurb: "Hex signs: compass-drawn stars and rosettes in rings of scallops, rays and folk motifs"
category: design
version: "1.0.0"
---
Round painted stars and rosettes in the Pennsylvania Dutch manner, drawn
with a compass and a straightedge.

## What it is

A hex sign is a painted disc: a star or a compass rosette at the centre,
rings of scallops, rays, petals, hearts, tulips or little birds around it,
and a bold border band at the edge, all in strong flat colours — red, gold,
blue and green with black, on a cream ground. Every part of the disc repeats
the same number of times round the centre, so the whole sign turns like a
wheel. Small rosettes can sit in the corners of the page.

## How to use it

Print it in colour as a folk-art picture for a kitchen, a barn door or a
gift card, or print the line-art version and colour it yourself. Colour one
ring at a time and repeat the same choice all the way round: the sign looks
best when every star point has a light half and a dark half, and when rings
next to each other use different colours. The small black shapes are
already inked; the rest are open for colour.

## Purpose

Hex signs are geometry first: everything is laid out with a compass from one
centre and one number of divisions. That makes them a natural design page —
exact symmetry, a small set of shapes, and endless variety from how the
rings are combined — and a cheerful folk alternative to the mandala.

## History

Painted stars and rosettes appear on the barns of the Pennsylvania Dutch —
German-speaking settlers in southeastern Pennsylvania — from the
mid-nineteenth century, and painted designs of the same family decorate
their earlier fraktur documents, dower chests and pottery. The six-petal
compass rosette, the "daisy wheel", is far older and very widespread: it is
scratched into buildings across Europe and beyond. Whether barn stars were
ever meant as charms is debated; many painters and families have said they
were simply "for nice". In the twentieth century, painters such as Johnny
Ott and Jacob Zook made and sold small hex signs to visitors, and the
distelfink (a stylised goldfinch), the tulip and the heart became familiar
emblems. These pages are original designs in that spirit, not copies of any
particular family's or painter's signs.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`, `master` (6, 8, 12 or 16;
  anything else lets the seed choose), `centre` (auto, star, rosette),
  `rings` (1 to 3, 0 for the seed's choice), `folk` (allow hearts, tulips and
  distelfinks), `corners` (corner rosettes), `palette` (traditional, barn,
  pastel), `paper` (`#rrggbb`), `line_art`, `stroke`.
- **Generation:** a master order n fixes every count. The centre is a star
  polygon {p/k} with p = n or n/2 (6 to 12 points) and k = p/2 - 1, each
  point split into a light and a dark triangle, with hearts or dots between
  the points and a small rosette at the hub; or a compass rosette of p
  petals, each petal the lens between two circular arcs leaving the centre
  at 180/p degrees either side of its axis (for six petals the arcs have the
  petal's own length as radius — the hexafoil), with a shorter round of
  petals behind. Rings are scallops, sawtooth with inverted teeth, alternate
  rays, double petals, a ring of folk elements (distelfinks alternate their
  facing) or dots, with counts n/2, n or 2n; the finest count whose pieces
  clear the size floor is used (the adult colouring floor in line art). The
  border band carries 2n dots. Corner rosettes take the largest radius that
  clears the disc.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Tested: every disc is invariant,
  mark for mark (same ink, same area centroid), under rotation by 360/d
  degrees, where d — reported as `symmetry_order` — divides the master
  order; every ring count is n/2, n or 2n; the centre's order divides n;
  every disc shape lies within the disc and corner rosettes stay clear of
  it and inside the margins; the hexafoil construction is exact; only
  palette inks are used; line art is black only and passes the adult
  colourability check (shapes too small to colour are inked solid and
  counted in `solid_accents`). Under 10 ms per page.
