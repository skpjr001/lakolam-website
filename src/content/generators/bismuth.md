---
title: "Bismuth Crystals"
blurb: "Bismuth crystals: stepped hopper crystals in iridescent oxide colours"
category: design
version: "1.0.0"
---
Stepped hopper crystals of bismuth, terraces winding down into every face,
in the gold, magenta, blue and green of their oxide skin.

## What it is

A cluster of bismuth crystals, the kind grown from molten bismuth and lifted
out as it cools. Bismuth crystals grow faster along their edges than across
the middle of their faces, so each face is left behind as a hollow of square
terraces stepping inward, one inside the next — a *hopper* crystal, like a
square spiral staircase cut into a cube. As the hot metal meets the air it
grows a film of oxide only a few hundred atoms thick. Light reflected from
the top of the film and from the metal underneath interferes, and the colour
depends on the thickness: gold where it is thinnest, then magenta, blue and
green as it thickens. The page shows a cluster of intergrown crystals in
isometric view — tops and two sides, hollows and all — or a bed of crystals
seen from above, some of them turned, looking down into their terraces.

## How to use it

The iridescent page is a print in its own right: thicker oxide shifts the
whole cluster towards blues and greens, thinner towards golds, and a wider
spread mixes them. The metallic page shows the bare, pinkish-silver metal.
The line page is a colouring sheet of nested frames: colour each terrace in
turn with the oxide sequence — gold, pink, purple, blue, teal, green — and
shade the sides facing away from the light a little darker to make the
crystals stand up off the page. More terraces give deeper, more intricate
hollows; fewer crystals give one bold specimen.

## Purpose

To show two pieces of physics in one picture: hopper growth, where a crystal
outruns its own faces, and thin-film interference, where a film thinner than
a wavelength of light paints a grey metal in saturated colours.

## History

Bismuth was known to medieval miners and was described as a metal of its own
by Georgius Agricola (*De Natura Fossilium*, 1546); Claude François Geoffroy
showed in 1753 that it is distinct from lead and tin. Hopper crystals —
familiar in salt and bismuth — arise because a growing crystal's corners and
edges reach fresher supply than its face centres, the effect W. F. Berg
measured in 1938. The colours of thin films were studied by Robert Hooke
(*Micrographia*, 1665) and Isaac Newton (*Opticks*, 1704, "Newton's rings"),
and explained as interference by Thomas Young in 1802; the same colours tint
tempered steel. Growing bismuth crystals from a melt became a popular
laboratory and hobby craft in the late twentieth century. The colours here
use the CIE 1931 standard observer, through the analytic fit of C. Wyman,
P.-P. Sloan and P. Shirley (*Journal of Computer Graphics Techniques*, 2013).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000); `view`
  (`isometric`, `top`); `style` (`iridescent`, `metallic`, `lines`);
  `crystals` (1–9); `terraces` stepping into each face of the largest crystal
  (2–10; smaller crystals have fewer); `oxide_nm`, the mean oxide thickness
  (0–300 nm); `oxide_spread`, how far it wanders either way (0–150 nm).
- **Generation:** isometric: each crystal is a box of voxels; every face
  carries strictly nested rectangles (rim 2–3 voxels, each frame at least 2
  wide, one side wider in turn so the frames wind like a square spiral), each
  sunk 1–2 voxels below the last, and the hollows are capped at a quarter of
  the crystal so opposite ones never meet. A voxel is solid when, from every
  face, it lies at least as deep as the steps above it. Smaller crystals are
  intergrown with a parent: behind it, perched on its top or, rarely, in
  front, on the floor or partway up. In isometric projection unit-cube faces
  land exactly on a triangular lattice, two triangles per face; painting the
  three visible faces of every voxel in order of x + y + z (far to near)
  leaves each triangle owned by the nearest face, an exact z-buffer because
  the candidates for one triangle never share a depth. Triangles are merged
  into one polygon (with holes) per connected terrace face. Top view: square
  crystals (half of them turned 10–40°) placed without overlapping, each
  with nested squares seen slightly obliquely, every deeper terrace and its
  far walls clipped to the opening above it. Colour: the oxide thickness of
  each terrace face is the mean plus the spread times smooth noise across the
  cluster, a per-crystal offset and a rise with depth into the hollow. Its
  reflectance at normal incidence,
  `R(λ) = |(r₀₁ + r₁₂e^{2iβ})/(1 + r₀₁r₁₂e^{2iβ})|²`, `β = 2π·n₁d/λ`, with
  Bi₂O₃ n₁ = 2.45 on bismuth n = 1.8 + 3.2i (representative visible-range
  values; real films are slightly dispersive), is integrated from 380 to 780
  nm against the CIE 1931 functions under equal-energy light, white-balanced
  to D65 so a perfect mirror is white, converted to sRGB (out-of-gamut
  colours pulled toward their own grey) and multiplied by a fixed exposure
  and a light factor for the face's direction and depth. The metallic style
  is the same optics with no oxide.
- **Guarantees:** deterministic per seed. Terraces are strictly nested
  (every rectangle at least one voxel inside the last on all four sides;
  every top-view square inside its outer square) and opposite hollows never
  meet (tested). Hidden surfaces are exact: the tests cast about 12 000 view rays
  against the crystals' own solid test (not the voxel grid the picture was
  painted from) and check that each lands in exactly one drawn region, the
  one naming the face the ray hits first; region areas equal their triangle
  counts, so regions never overlap. Top-view crystals never overlap and
  every visible piece lies inside its crystal. The colour model is tested
  against the bare-metal Fresnel reflectance, the half-wave periodicity of
  the film, and the gold → magenta → blue → green order. Meta records the
  oxide thickness range and the optical constants;
  `verification: terraces_nested_hidden_surfaces_exact_thin_film_colours`.
  The line style reports the colourability check. Clamped knobs are reported
  as `requested_<field>`.
