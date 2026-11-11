---
title: "Calabi–Yau Cross-Sections"
blurb: "Calabi-Yau cross-sections: the Fermat quintic's 2D slice in Andrew Hanson's famous rendering"
category: design
version: "1.0.0"
---
The picture of string theory's hidden dimensions: a slice of the Fermat
quintic, drawn in Andrew Hanson's famous way.

## What it is

A glowing, folded, many-petalled surface on a dark ground. It is a real
two-dimensional slice of a Calabi–Yau space — the complex curve
z₁ⁿ + z₂ⁿ = 1, which lives in four real dimensions — shown as a shadow in
three. The surface is built from n × n patches that meet edge to edge; each
patch has its own colour, so you can see how the pieces fit round the
centre. With n = 5 it is the slice of the quintic that physicists use as a
model of the curled-up dimensions of string theory. It can also be drawn
as a see-through wireframe, or as a black hidden-line drawing on white.

## How to use it

Print the colour pages as posters or cards; the dark ground is meant to be
printed. Change the degree to see three to eight petals around each centre,
turn the view to see the sheets from another side, and change the
projection angle to tilt the shadow through the fourth dimension — the
surface itself never changes, only the way it is cast into three
dimensions. The line drawing can be coloured in patch by patch: follow the
heavier lines, which are the patch edges and the folds.

## Purpose

A mathematically exact rendering of one of the best-known images in
popular science, with the construction laid bare: every point drawn really
does satisfy the equation, and the patches are exactly the ones Hanson
described.

## History

Eugenio Calabi conjectured in 1954–57 that certain complex manifolds carry
a Ricci-flat metric; Shing-Tung Yau proved it in 1977–78, and the spaces
were named Calabi–Yau manifolds. In 1985 Philip Candelas, Gary Horowitz,
Andrew Strominger and Edward Witten proposed that the six extra dimensions
of superstring theory are curled up into a Calabi–Yau space, the quintic
threefold being the first example studied. Andrew J. Hanson of Indiana
University published "A construction for computer visualization of certain
complex curves" in the *Notices of the American Mathematical Society* in
1994, splitting the Fermat curve into patches parametrised by cosh and sinh
and projecting them into 3D; his images became the standard picture of a
Calabi–Yau space, reproduced in Brian Greene's *The Elegant Universe*
(1999) and countless books since.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000); `n` (the degree,
  3–8; 5 by default); `alpha` (projection angle in degrees, 0–180);
  `azimuth` (0–360) and `elevation` (−80–80) of the camera in degrees, each
  null to let the seed choose — these are the camera's turn and tilt;
  `distance` (1-10 times the usual eye distance, default 1) dollies the
  camera out, shrinking the surface and flattening its perspective; `mesh` (quads along a patch side, 4–40, default 18; the
  surface is held to 60 000 quads); `reach` (the ξ half-range, 0.5–2.5);
  `style` (`shaded`, `wireframe`, `lines`); `palette` (`auto`, `spectrum`,
  `ember`, `glacier`, `aurora`); `caption`; `stroke` (0.2–4).
- **Generation:** for u = ξ + iη with ξ ∈ [−reach, reach] and
  η ∈ [0, π/2], patch (k₁, k₂) is z₁ = e^{2πik₁/n} cosh(u)^{2/n},
  z₂ = e^{2πik₂/n} (−i sinh u)^{2/n} with principal powers (both bases have
  non-negative real part there, so no branch cut is crossed), for
  k₁, k₂ = 0 … n−1. Each point maps to 3D as (Re z₁, Re z₂,
  cos α Im z₁ + sin α Im z₂). The patches are meshed together and seen by a
  perspective orbit camera fitted to the page. Shaded: the painter's
  algorithm over all quads, two-sided diffuse light, a specular highlight
  and depth fog, coloured by patch. Wireframe: the patch grid lines sorted
  far to near and dimmed with depth. Lines: the same camera and framing;
  every mesh line thin, patch edges and the rims a little heavier, and fold
  contours (where the surface turns away, found on the mesh with patch
  seams welded, chains of four edges or more) heaviest, all cut into
  visible runs by a z-buffer; visible runs under 2 pt are dropped.
- **Guarantees:** every mesh point satisfies z₁ⁿ + z₂ⁿ = 1 to 1e-9 relative
  (tested with powers taken by repeated multiplication, not the logarithms
  the generator uses); there are exactly n² patches, one per phase pair
  (tested), and along η = 0 and η = π/2 each patch's ξ < 0 half-edge is
  the ξ > 0 half-edge of the neighbour with k₂ + 1, respectively k₁ − 1, so
  they close up into one surface (tested); the 3D points are exactly the stated projection
  (tested). Hidden lines: sample points along the drawn lines are judged by
  exact ray casting against every mesh triangle, and the z-buffer's verdict
  agrees on more than 98.5% of the clear cases (tested; near ties are not
  judged). `verification` in the meta names these. The line-art page
  reports its colourability. Clamped knobs are reported as
  `requested_<field>`.
