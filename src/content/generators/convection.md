---
title: "Convection Cells"
blurb: "Rayleigh–Bénard convection from above: hexagonal cells, rolls, target rings and spiral chaos as a shadowgraph"
category: design
version: "1.0.0"
---
The patterns of a fluid heated from below — hexagonal Bénard cells, rolls,
target rings and spirals — as a shadowgraph seen from above.

## What it is

Heat a thin layer of oil from underneath and, once the heating is strong
enough, the warm fluid at the bottom starts to rise and the cool fluid at
the top to sink. They cannot both do it everywhere, so the layer organises
itself into cells: neat hexagons with fluid welling up in the middle of each
when the top surface is open to the air, or long parallel rolls turning over
side by side when it is closed in. In a round dish heated at its rim the
rolls curl into a bullseye; heated harder, the rolls break up into slowly
turning spirals. The page shows the layer from above as a shadowgraph, the
way experimenters photograph it: light shone through the fluid is focused
by the cool, dense sheets of sinking fluid into bright lines, and the hot
rising plumes look dark. A colour map of temperature and arrows showing the
flow are options.

## How to use it

Hang it as an abstract print, or use it to talk about weather, cooking and
the Sun: the same cells appear in a pan of hot soup, in cloud streets, and
as granulation on the Sun's surface. Turn the arrows on to see the flow at
the top surface spreading out of each rising centre (marked with a ringed
dot, the fluid coming toward you) and sinking at the cell edges. The
amber and silver shadowgraphs follow the classic photographs; the thermal
colouring runs from cold blue to hot red.

## Purpose

A clear picture of self-organisation: a uniform layer, uniformly heated,
choosing a cell size of about twice its depth and a hexagonal or striped
arrangement on its own — and of how walls, heating and symmetry decide
which.

## History

Henri Bénard photographed hexagonal cells in thin layers of spermaceti
heated from below in 1900. Lord Rayleigh's 1916 theory explained the onset
of convection by buoyancy, with the critical Rayleigh number that now bears
his name; J. R. A. Pearson showed in 1958 that Bénard's open-surface
hexagons were driven mostly by surface tension (Bénard–Marangoni
convection). F. H. Busse (1967) explained why non-Boussinesq effects favour
hexagons near onset and rolls further above it. E. L. Koschmieder's
photographs of hexagons and of concentric rolls in circular containers
(*Bénard Cells and Taylor Vortices*, 1993) are the standard images. Spiral
defect chaos was discovered by Stephen Morris, Eberhard Bodenschatz,
David Cannell and Guenter Ahlers in 1993. Jack Swift and Pierre Hohenberg
introduced their model equation in 1977.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `mode` (`hexagons`,
  `rolls`, `target`, `spirals`); `container` (`rectangle` filling the page
  inside its margin, or a centred `circle`; the page's proportions set the
  rectangle's aspect); `style` (`amber`, `silver` shadowgraphs, `thermal`
  temperature map); `cells` (wavelengths across the container, 6-40; very
  long pages use fewer, reported as `requested_cells`); `epsilon` (reduced
  Rayleigh number ε = (Ra − Ra_c)/Ra_c, 0.02-1); `steps` (relaxation
  steps, 50-1500); `arrows` (surface-flow arrows and up-flow marks).
- **Generation:** the Swift–Hohenberg equation `∂u/∂t = εu − (1+∇²)²u +
  g·u² − u³ + f` is stepped semi-implicitly in Fourier space for exactly
  `steps` steps of 0.5 on a 64-256 grid. Hexagons use `g = 1` (the up–down
  asymmetry of surface-tension-driven convection) from seeded noise; rolls
  use `g = 0` from a seeded, gently bent roll phase plus noise; target adds
  a ring of heating `f` just inside the wall and starts from rings about a
  slightly off-centre point; spirals seed a phase field of one-, two- and
  three-armed spirals (one per ~6 wavelengths square) and pin each core with
  a weak local forcing in its own phase — a stand-in for the mean flow that
  sustains spirals in real convection, which this model lacks. The field is
  multiplied by a mask that is zero at and beyond the wall after every step.
  The result is upsampled spectrally with its Laplacian; the shadowgraph
  traces `0.6∇²u − 0.4u` (bright where fluid sinks), the thermal map `u`,
  each normalised and cut into ten bands by marching squares, clamped so
  every band closes inside the wall.
- **Guarantees:** a fixed step count and seeded start, so the same spec and
  seed give the same page; the wall condition holds exactly (meta
  `wall_max_abs` is 0, checked in tests against the container geometry);
  symmetry statistics in meta — hexagonal ψ₆ of the up-flow centres with
  neighbour count, local and global roll-orientation order and roll angle,
  alignment with the nearest wall, RMS wavenumber. Tests prove hexagons
  reach ψ₆ ≥ 0.6 for ε up to 0.3 (an independent six-nearest-neighbour
  check agrees), rolls a local orientation order ≥ 0.6, and round target
  patterns a wall alignment ≥ 0.7. Above ε ≈ 0.4 rolls invade the hexagons,
  as Busse's theory and experiments find; the meta reports it rather than
  hiding it. Every band is closed (`open_lines: 0`) and lies inside the
  container; all ink lies inside the page.
