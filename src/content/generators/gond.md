---
title: "Gond-Style Painting"
blurb: "Gond-style painting: a tree of life, birds, deer, fish, peacock and elephant in bold silhouettes, every region filled with its own dots, dashes, scales or lines"
category: design
version: "1.0.0"
---
A tree of life full of birds, with deer at its foot. Every leaf, limb and
feather is a bold shape in a bright colour, filled with dots, dashes,
scales or fine lines.

## What it is

A painting in the manner of the Gond artists of Madhya Pradesh, India.
Gond painting draws trees, birds, animals and fish as large, flat shapes
with strong outlines. Each shape is divided into parts: a band round the
edge, stripes across a body, the two halves of a leaf, the feathers of a
tail. Each part is filled with its own small pattern. There are rows of
dots, short dashes, fish-scale arcs, fine parallel lines, zigzags, little
seed shapes and rings round an eye. The patterns are what make the style
recognisable, and every artist has their own.

The main picture is a great tree. Its trunk is striped in colours and its
limbs divide again and again, ending in big two-coloured leaves. Birds sit
in the crown and animals stand at the foot of the tree. Other pages show
a group of creatures (deer, fish, birds, a peacock and an elephant) or a
single creature filling the page.

## How to use it

Look at one shape at a time and find where it changes pattern: from the
dotted band round a deer's body to the stripes inside it, or from one half
of a leaf to the other. No two neighbouring parts share a pattern. On the
line-art page every part is a space to colour. Give each part one flat,
bright colour and let the patterns show on top. Gond artists often put
warm and cool colours side by side, or bright shapes on a dark ground.

## Purpose

To enjoy a living art in which a plain outline turns rich with pattern.
The page is made for looking, colouring and copying. Pick a pattern you
like and fill a shape of your own with it. It also shows a simple idea
behind the style: cut a shape into parts, then give every part a texture
of its own.

## History

The Gond are one of the largest Adivasi (indigenous) peoples of India.
They live across central India, especially in Madhya Pradesh,
Chhattisgarh and Maharashtra. Gond women have long decorated the mud
walls and floors of their homes with painted patterns and figures for
festivals. The Pardhan Gond, a community of bards and musicians, kept the
Gond stories and songs.

The painting known today as Gond art began in the early 1980s with Jangarh
Singh Shyam (1962–2001), a young Pardhan Gond from the village of
Patangarh in Dindori district. The artist J. Swaminathan invited him to
work at Bharat Bhavan, a new arts centre in Bhopal. There Jangarh started
painting the creatures and spirits of Gond stories on paper and canvas.
He used his own style of bright colours, outlines and dense patterns, and
his work was shown in India and abroad. Relatives and neighbours from
Patangarh followed him. Among them are Bhajju Shyam, author of *The London
Jungle Book* (2004), who was awarded the Padma Shri in 2018, Durga Bai
Vyam, awarded the Padma Shri in 2022, and Venkat Raman Singh Shyam. *The
Night Life of Trees* (Tara Books, 2006), by Bhajju Shyam, Durga Bai and
Ram Singh Urveti, made Gond painting widely known as an art of the book.
Trees, birds, fish, deer and elephants are some of its best-loved
subjects. Each artist's patterns are known as their signature. This page
leaves out the spirits and deities of Gond belief. It invents its own
stylised creatures and textures, and does not copy any artist's work or
signature pattern.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 800);
  `margin` (0-200 pt, default 16). `subject` is `tree_of_life` (default),
  `menagerie` (a grid of six creatures), or one creature filling the page:
  `deer`, `fish`, `peacock`, `elephant` or `bird`. `palette` is `vivid`
  (bright colours on cream with black lines, default), `night` (bright
  colours on a dark ground with white lines), `earth` (rust, ochre and
  olive on sand) or `lines` (black line art for colouring). `density`
  (0.5-2, default 1) sets how close the texture marks are. `stroke`
  (0.3-3, default 1) is the line weight. `border` (default on) adds a
  sawtooth border of coloured triangles.
- **Generation:** each creature is a list of parts in local units, from
  front to back: head, beak, wing, body, tail and legs for a bird. A deer
  adds antlers and a neck, an elephant an ear, trunk and tusk, a fish
  fins. A peacock has a crest and a scalloped fan of a tail. Outlines are
  smooth curves through seeded control points, and limbs and stalks are
  tapered strokes. A part's piece is the part minus the parts in front of
  it (polygon booleans). The piece is then cut by shapes that tile the
  plane: parallel strips, a band along its outline round a core, or a fan
  of sectors round a point. Each resulting region gets a colour different
  from the last and a texture different from the last. Eyes and peacock
  feathers get rings round a point. The tree's limbs branch two or three
  ways, four levels deep, from a flared, striped trunk with roots, with a
  pull upward that keeps the crown round. Animals at its foot are fitted
  beside the trunk, facing it, and shrunk until they clear the wood.
  Birds are placed in the crown where they clear everything. Then leaves
  grow at the branch ends and along the outer limbs, two-coloured along
  the midrib. Each leaf is kept only if it clears the other leaves, the
  birds, the animals and every limb but its own. Textures are generated
  over each region's box. Lines, dashes, scales, zigzags and rings are
  clipped exactly to the region shrunk by half the outline width plus
  half the texture width. Dots and seeds are kept only where they fit
  whole. Bigger silhouettes (the menagerie, a single creature) get roomier
  textures.
- **Guarantees:** the regions partition each silhouette. Their areas add
  up to the area of the silhouette's outline (the union of its parts),
  and no two regions overlap. Every texture mark lies inside its own
  region and stays clear of the region's outline by the outline's half
  width plus its own. Silhouettes never overlap or touch. All of them lie
  inside the field, and all ink is on the page. This is checked for every
  subject and palette, for wide, tiny and tall pages, and at the largest
  stroke and density. `verification:
  regions_partition_textures_clipped_silhouettes_apart`. The line-art
  page reports the adult colourability check as `colorable`. Clamped
  knobs are reported as `requested_<field>`.
