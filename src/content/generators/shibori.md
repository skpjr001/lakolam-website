---
title: "Shibori"
blurb: "Shibori and tie-dye: itajime fold-and-clamp, arashi, kumo, kanoko, nui and the tie-dye spiral, in soft-bled indigo or as outlines to colour"
category: design
version: "1.0.0"
---
Indigo cloth folded, bound, clamped and stitched before the dye - and the
patterns that open out when it is unwrapped.

## What it is

A page of resist-dyed cloth in one of six techniques:

- **itajime** (board clamping): the cloth is folded like a fan one way and
  then the other into a small stack of squares (or folded again into
  triangles), and shaped boards are clamped on it. Where a board presses, no
  dye gets in; unfolded, the shape repeats in every square, mirrored at
  every fold, so it builds stars, crosses and lattices;
- **arashi** ("storm"): the cloth is wrapped round a pole on the diagonal,
  bound with thread and pushed up into tight pleats, leaving diagonal
  stripes like driving rain;
- **kumo** ("spider"): little peaks of cloth are pleated and bound tightly,
  opening into round bursts with dark threads radiating like a web;
- **kanoko** ("fawn spots"): hundreds of tiny points are bound off, each
  leaving a small white ring with a dark eye, gathered in drifts;
- **nui** (stitching): rows of running stitch are drawn up tight, leaving
  rows of small white dashes along gently waving lines;
- the **tie-dye spiral**: the cloth is twisted into a flat disc round one
  point and dyed in wedges, so each colour winds out from the centre
  between white lines.

The edges are never ruled: dye creeps a little way into the bound cloth, so
every white shape is ringed with paler and paler blue. In colour the page
is indigo (or madder, charcoal, or several dye baths at once) on white
cloth, the creeping dye shown as bands of lighter tint. In line art it is
the edge of each white shape, drawn as a black outline to colour in.

## How to use it

Print the colour page as a poster, wrapping paper, a card or a background:
it looks like a length of hand-dyed cloth.

To colour the line page, choose one dark colour - blue is traditional - and
fill the background round the shapes, leaving the shapes white; or turn it
round and colour only the shapes. For the tie-dye look, give each band of a
spiral its own bright colour. To copy the soft edge of real dye, shade a
lighter tint just inside each outline before filling the rest.

## Purpose

Shibori shows how a flat pattern can come from a folded or bound shape:
fold a square of paper or cloth the way the page says, and the mirrored
repeats of itajime appear by themselves. The page makes an absorbing
colouring sheet and a quick, bold print, and it is a starting point for
trying the real thing with a strip of cotton, a few clothes pegs and some
blue dye.

## History

Shibori (from the Japanese verb shiboru, "to wring, squeeze, press") is the
Japanese family of shaped-resist dyeing techniques. Bound and stitched
resist cloths survive in the Shosoin repository at Nara from the eighth
century, and related traditions grew up independently across the world:
bandhani in India, plangi and tritik in Indonesia, adire among the Yoruba of
Nigeria. In Japan the craft flourished in the Edo period, above all in the
towns of Arimatsu and Narumi near Nagoya, where shibori-making began early in
the seventeenth century on the Tokaido road and grew into an industry of
dozens of named binding and stitching methods; kanoko, the finely bound fawn
spots, was so prized that sumptuary laws restricted its use.

Arashi, pole-wrapping, is credited to Suzuki Kanezo of Arimatsu in the
nineteenth century (sources give dates from about 1850 to the 1880s). Most
traditional shibori was dyed in indigo (ai, from Persicaria tinctoria), whose
dye builds up darker with every dip. Itajime clamp-resist is far older -
clamp-dyed textiles survive from Tang China and in the Shosoin - and in its
folded-and-clamped form it is now one of the most widely practised shibori
techniques.

The standard reference in English is Yoshiko Iwamoto Wada, Mary Kellogg Rice
and Jane Barton, *Shibori: The Inventive Art of Japanese Shaped Resist
Dyeing* (Kodansha, 1983). The twisted spiral tie-dye, a binding resist of the
same family, became the emblem of American counterculture in the late 1960s.

## This implementation

- **Spec knobs:** `technique` (itajime by default; auto, arashi, kumo,
  kanoko, nui, spiral), `style` (colour by default, or line), `palette`
  (indigo, madder, sumi, rainbow, sunset, ocean; colour style only; the
  several-colour palettes dip the cloth in several baths), `clamp` (auto,
  circle, square, triangle, hexagon) and `fold` (auto, square, triangle) for
  itajime only, `scale` (motif size, 0.5-2), `bleed` (how far the dye creeps,
  0-3; 0 is a crisp edge), `width`, `height` (144-4000 pt, Letter by
  default), `margin` (0-144 pt, at most 30% of the shorter side), `stroke`
  (0.75-4 pt, line style only). Out-of-range values are clamped and the
  request is recorded as `requested_<field>` in meta.
- **Generation:** each technique is geometry giving the signed distance to
  the resist. Itajime maps every point of the cloth into the folded stack
  (a triangle wave in each direction, plus a swap across the diagonal for
  the triangle fold), so the board's shape, cut where it overhangs the
  stack, unfolds as an exactly mirrored tiling; each layer of the stack
  resists a few per cent more or less (deeper layers get less dye), and a
  thin line of dye may wick along the folds. Arashi is a stripe distance
  across a direction 28-52 degrees off the horizontal, waved and broken by
  noise. Kumo bursts sit on a jittered hexagonal lattice, each a disc cut by
  dyed spokes (wider outward) and binding rings. Kanoko dots are rounded
  squares with a dyed eye on a staggered lattice, kept where a cluster noise
  is high. Nui rows are capsules along waving rows of stitches, staggered
  row to row. The spiral twists the angle by a power of the radius and puts
  white lines between the arms and broken crinkle streaks inside them.
  The dye amount is a linear ramp across the resist edge (the bleed width,
  which grows with the square root of `scale`),
  sampled on a grid of about 120,000 points after the cloth is warped by
  smooth seeded noise, with a low mottle added to the ground. The page is
  the level sets of that field, traced as closed loops by marching squares
  (`lako_geom::bands`). Colour: levels 0.16, 0.38, 0.62, 0.86 give five
  bands, painted white, 17%, 40%, 70% and 100% of the dye, each dye bath
  traced separately (spiral wedges, dip-dyed bands, or the itajime stack
  dipped by its diagonal). Line art: the one level 0.5. The seed picks the
  fold, boards, angles, lattice jitter, noise and (with `auto`) the
  technique; meta records the plan (every parameter of the technique) so a
  page can be read back.
- **Solving:** nothing to solve - a design to colour or display.
- **Guarantees:** the same spec and seed give the same page. All ink lies on
  the cloth panel inside the margin. Level loops never cross. On line pages
  every region (a loop less the loops directly inside it) is at least 330
  pt^2, just over the 40 mm^2 adult colouring floor: a too-small region gives
  up its smallest hole, or is merged into the region round it
  (`regions_merged`, `min_region_pt2` in meta); the line page is checked
  with the adult colourability rules (`colorable`). The itajime tiling is
  exactly mirrored at every fold (tested). `rating_basis` is "none: a design
  to colour or display".
