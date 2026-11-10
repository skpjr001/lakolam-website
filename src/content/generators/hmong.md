---
title: "Paj Ntaub Blocks"
blurb: "Paj ntaub-style blocks in the manner of Hmong reverse appliqué: fine D4-symmetric channels, snail spirals, ram's horns and dragon's teeth"
category: design
version: "1.0.0"
---
Square blocks of fine, bright channels cut through dark cloth — snail
spirals, ram's horns and squares within squares, ringed by dragon's teeth —
in the manner of Hmong paj ntaub.

## What it is

A design in the manner of Hmong *paj ntaub* ("flower cloth") reverse
appliqué. Each block is a square of top cloth with narrow channels cut
through it, so the colours beneath show as thin lines of even width. The
channels follow strict geometry: a centre figure — squares within squares,
a cross, an eight-pointed star or an elephant's foot — echoed outward ring
by ring; ram's horns (two curls joined by a stem) on the four axes; square
"snail" spirals, corner nests of squares or diamonds, small brackets and
dashes in between. Every block is the same when turned a quarter turn or
seen in a mirror along either axis or diagonal. Rows of triangles — the
"dragon's teeth" — run inside each block's frame and round the whole
cloth. The page is one large block (with a border strip above and below on
a tall page), a sampler of different blocks, or stacked border strips of
small repeated blocks.

## How to use it

Display it as a poster, or choose the line-art style and colour it. Hmong
needleworkers plan colour by symmetry: give a motif and all of its turned
and mirrored copies the same colour, alternate two colours from one echo
ring to the next, and alternate the colours of the teeth. Follow a snail
spiral in from its open end to its heart; trace a ram's horn from one curl
across its stem to the other.

## Purpose

A vivid, ordered page that shows how a few simple moves — turn, mirror,
echo — build a dense pattern, and a respectful introduction to a living
textile art.

## History

The Hmong are a people of the mountains of southern China, northern
Vietnam, Laos and Thailand. *Paj ntaub* is their women's needlework —
reverse appliqué, appliqué, counted cross-stitch and embroidery, and batik
— worked on clothing, baby carriers, collars and the funeral and New Year
garments that mark identity and belonging; girls learned it from their
mothers and grandmothers. Reverse appliqué in very fine, precise channels is
especially associated with White Hmong (Hmong Der) work, batik and
cross-stitch with Green or Blue Hmong (Hmong Njua) work. Named geometric
motifs include the snail, the elephant's foot, the ram's horn, the heart and
the cross or star. After the war in Laos ended in 1975, many Hmong fled to
refugee camps in Thailand such as Ban Vinai, where needlework became an
important source of income, and story cloths (*paj ntaub dab neeg*) that
picture village life and the flight from Laos developed alongside the older
geometric work; the art continues in Hmong communities in Asia, the United
States, France and Australia. This page is paj ntaub-style: a geometric
grammar in the manner of the tradition, with motifs it composes itself; it
copies no cloth and draws no story-cloth scenes. Sources: Paul and Elaine
Lewis, *Peoples of the Golden Triangle* (Thames & Hudson, 1984); John
Michael Kohler Arts Center, *Hmong Art: Tradition and Change* (Sheboygan,
1986); Anthony Chan, *Hmong Textile Designs* (Stemmer House, 1990);
Geraldine Craig, "Patterns of Change: Transitions in Hmong Textile
Language", *Hmong Studies Journal* 11 (2010).

## This implementation

- **Spec knobs:** `layout` (single — the default, with border strips above
  and below on a tall page; sampler; strip), `style` (bright_on_black,
  bright_on_white, line_art), `channels` (6–30, default 22: lattice steps
  from the large block's centre to its edge; smaller blocks keep about the
  same pitch), `columns` (2–6, default 3: blocks across in the sampler; a
  strip holds one more; the single layout ignores it), `channel_width`
  (0.3–0.6 of the pitch, default 0.45), `teeth` (dragon's-teeth borders,
  default on), `width`, `height`.
- **Generation:** each block lives on a square lattice. Frame rings go
  first, then (on blocks large enough) a band of teeth and a fence ring.
  The centre figure is a union of squares and diamonds grown and shrunk a
  lattice unit at a time, each echo a closed channel; nested squares and
  diamonds alternate for "squares within squares". Ram's horns (a square
  spiral carried to the axis and mirrored) go on the axes, nests on the
  diagonals, then spirals, horns, brackets, small squares and diamonds and
  dashes are tried at random lattice points in one eighth of the block,
  large pieces first. Every candidate is placed with all its images under
  the eight symmetries of the square, and kept only if every image stays
  inside and at least one lattice unit from every channel already placed
  and from each other. Teeth divide each side evenly between two corner
  squares, whose diagonal carries a corner tooth. Channels are strokes of
  one width, mitred, under 1/√2 of the pitch.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  blocks_d4_symmetric_channels_clear_teeth_closed`. Tested: every block's
  channels and teeth (with their colours) map onto themselves under all
  eight symmetries of the square; no two channel centre lines come within
  one lattice unit and no channel comes within a unit of itself away from
  its corners or turns by more than 90°, checked by brute force segment
  against segment — with the stroke under 1/√2 of the pitch this means
  channels never touch; each closed border of teeth chains base to base all
  the way round, corners included; all ink stays on the page; clamped
  values are reported as `requested_<field>`.
