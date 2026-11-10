---
title: "Cayley Diagrams"
blurb: "Cayley diagrams: small groups as coloured arrow graphs — cyclic, dihedral, torus products, the quaternions, and A4, S4, A5 as truncated solids"
category: design
version: "1.0.0"
---
Small groups drawn as maps of coloured arrows: a circle for turning, two
rings for flipping, a torus, two nested squares for the quaternions, and
the football for the sixty rotations of an icosahedron.

## What it is

A group is a set of moves that can be combined — the turns of a wheel, the
ways to pick up a triangle and put it back in its outline, the rotations of
a cube. A Cayley diagram draws one dot for every move in the group and picks
a few basic moves, the generators, each with its own colour. From every dot
an arrow of each colour points to the dot you reach by doing that
generator next. When a generator undoes itself (a flip done twice is no
move at all) its arrows go both ways, so they are drawn as plain lines.

Every dot looks the same from where it stands: the same colours leave it and
arrive at it in the same pattern. That is why the drawings are so
symmetric. Turning a hexagon gives a circle of six arrows. Its twelve
symmetries give two rings turning opposite ways, joined by the flips. Two
independent clocks make a grid wrapped round a doughnut. The eight
quaternions make two squares with arrows that cross between them. The
twelve rotations of a tetrahedron, the twenty-four of a cube and the sixty
of an icosahedron make the truncated tetrahedron, the truncated octahedron
and the truncated icosahedron, the pattern on a football.

## How to use it

Follow the arrows. Pick a dot and a word made of generator letters, such as
a²b, and walk it: two steps along the first colour, one along the second.
Walk the same word from a different dot and you get the same shape of path;
that is what makes it a group. Find the loops: going round a whole
pentagon of one colour is doing the five-step turn five times, which brings
you home. Check whether two generators commute by walking ab and ba from
the same dot and seeing if you land in the same place. The dot with a ring
round it is the identity, "do nothing"; on the labelled pages each dot is
named by the shortest word that reaches it from there. The poster style
gives the group a title and a legend of its generators, ready to frame.

## Purpose

A picture of an abstract structure that is exactly right: every arrow is a
real product in the group, so the symmetry on the page is the group's own.
It is the way group theory is now taught visually, and a striking poster.

## History

Arthur Cayley introduced the graphs, coloured by generator, in "The theory
of groups: graphical representation" (*American Journal of Mathematics* 1,
1878), the year after he had defined abstract groups by multiplication
tables (1854). Walther von Dyck studied groups given by generators and
relations in 1882, including the triangle groups ⟨a, b | aⁿ = b² = (ab)³ = e⟩,
which for n = 3, 4, 5 are the rotation groups of the tetrahedron, cube and
icosahedron: A₄, S₄ and A₅. Max Dehn used Cayley graphs ("Gruppenbilder") to
attack the word problem around 1910, and the idea grew into geometric group
theory. The quaternions are William Rowan Hamilton's, carved into Brougham
Bridge in Dublin on 16 October 1843. The truncated solids are among the
thirteen described by Archimedes and rediscovered by Johannes Kepler in
*Harmonices Mundi* (1619). The visual style follows Nathan Carter's *Visual
Group Theory* (2009) and the Group Explorer software.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200–3000); `group` (`cyclic`,
  `dihedral`, `product`, `quaternion`, `a4`, `s4`, `a5` (default)); `n`
  (2–16, default 6; dihedral needs 3 or more) for Z_n, D_n and Z_n × Z_m;
  `m` (2–8, default 3) for Z_n × Z_m; `labels` (`auto` — names for groups
  of order 24 or less — `words`, `none`); `style` (`poster` (default),
  `colour`, `ink`); `palette` (`auto`, `primary`, `jewel`, `sunset`,
  `ocean`; auto picks per seed); `stroke` (0.2–4, default 1).
- **Generation:** every group is a permutation group built by
  breadth-first closure from its generators, which gives each element a
  shortest word. Z_n is an n-cycle; D_n a rotation and a reflection of the
  n-gon; Z_n × Z_m two disjoint cycles; Q₈ left multiplication on the eight
  units ±1, ±i, ±j, ±k; A₄, S₄, A₅ the first von Dyck pair — an n-cycle `a`
  (n = 3, 4, 5) and the first involution `b` with `ab` of order 3 that
  generates the whole group. Layouts: Z_n a circle of arcs; D_n two rings
  (rotations outside, reflections inside, turning the other way) with
  reflection spokes; Z_n × Z_2 two rings; Z_2 × Z_2 a square; other
  Z_n × Z_m a torus seen at a seeded tilt of 50–64°; Q₈ ±1, ±i on the outer
  ring and ±j, ±k on the inner, with the inner-to-outer j-arrows bowed. For
  A₄, S₄, A₅, `a` maps to a rotation by 2π/n about a face axis and `b` to a
  half turn about an adjacent edge axis (the sense of `a` chosen so
  (ab)³ = e), the map M is extended along the breadth-first tree, and
  element g sits at M(g)·p, where p is the Wythoff point on the arc between
  the two axes at which both edge kinds are equally long (bisection), so the
  drawing is the exact truncated tetrahedron, octahedron or icosahedron. It
  is seen 10–24° off the face axis (seeded tilt, direction and spin), back
  edges and dots faded and thinner, painted back to front. Arrowheads sit
  mid-edge; involution generators are plain edges, drawn once per pair; the
  ink style dashes the second generator. The seed sets the view (rotation,
  tilt, spin) and the auto palette.
- **Solving:** Nothing to solve.
- **Guarantees:** the multiplication table is checked for closure,
  identity, inverses and associativity over every triple, and the group has
  the expected order (meta `axioms`); the drawn edges are exactly
  {g → g·s} for every element and generator (involutions as one undirected
  edge per pair), recomputed independently in tests from the permutations;
  for the solids, M(g)·M(s) = M(g·s) holds on every arrow to 1e-9, all
  edges are equally long and all vertices lie on one sphere and are
  distinct, so M is an isomorphism onto the Archimedean solid's vertices
  (`isomorphism_checked`); no two dots coincide on the page
  (`min_separation_pt`, a steeper tilt is used if a view would stack two);
  every label is drawable in the stroke font; all ink stays inside the page.
  `verification: cayley_arrows_axioms_layout`. Clamped knobs are reported as
  `requested_<field>`.
