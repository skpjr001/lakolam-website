---
title: "Streamlines"
blurb: "Equal-flux streamlines of ideal flow past cylinders, ovals and corners, sources and sinks, and a vortex street"
category: design
version: "1.0.0"
---
Water parting round a cylinder, curling into a vortex street, or welling up
from a source: the calm, banded paths of an ideal fluid.

## What it is

A picture of a steady flow, drawn as its streamlines: the paths the water
follows. Between any two neighbouring lines the same amount of water passes,
so the lines crowd together where the flow speeds up (over the top of a
cylinder, round a corner) and spread apart where it slows. The strips
between the lines are shaded alternately, which makes the speeding and
slowing easy to see. Six flows: one cylinder (sometimes spinning, which
gives it lift), several cylinders, a Rankine oval, sources and sinks, flow
into or round a corner, and a Kármán vortex street behind a cylinder.

## How to use it

The colour pages are prints: the strips read like marbled paper or a
topographic map. The line-art page is a colouring sheet: every strip is a
region to colour, and colouring alternate strips, or grading them from
light to dark across the page, recreates the effect. Look for where the
strips narrow — that is where the water runs fastest — and for the
stagnation points, where a line splits to pass either side of a body.

## Purpose

A textbook result of fluid mechanics made into art, and drawn correctly:
every line is a true streamline of the flow, the body surfaces are
streamlines themselves, and neighbouring lines carry equal flux.

## History

Potential flow theory was built by Euler, Lagrange and Laplace in the
eighteenth century; the stream function is Lagrange's (1781). William
Rankine described his ovals in 1871; Ludwig Prandtl's photographs of flow
past cylinders (1904 on) set the look of the textbook figure; Theodore von
Kármán analysed the stable vortex street, with its spacing ratio 0.281, in
1911–12. The circle theorem used for the cylinder is L. M. Milne-Thomson's
(1940; *Theoretical Hydrodynamics*, 1938 on). See also Batchelor,
*An Introduction to Fluid Dynamics* (1967), ch. 6, and Van Dyke,
*An Album of Fluid Motion* (1982).

## This implementation

- **Spec knobs:** `width`, `height` (points); `flow` (`auto`, `cylinder`,
  `cylinders`, `rankine`, `sources_sinks`, `corner`, `vortex_street`);
  `lines` (strips across the frame, 6–80); `style` (`colour`, `lines`);
  `palette` (`auto`, `sea`, `marble`, `dusk`, `mint`, `ink`); `stroke`.
- **Generation:** each flow is a stream function ψ: a uniform stream plus
  the circle theorem's doublet and a circulation for one cylinder, one
  doublet per cylinder for several, a source–sink pair for the Rankine oval
  (`θ₁ − θ₂` jumps only inside the oval), `A rⁿ sin nθ` for a corner of
  angle π/n, and two staggered rows of cored point vortices behind a
  cylinder for the street, seen from a frame drifting with them. Where ψ is
  single-valued, streamlines are marching-squares contours at `ψ₀ + (k+½)Δψ`
  (ψ₀ the body's surface value, Δψ the frame's ψ range over `lines`), cut
  where they would enter a body; strips are the same levels traced as
  closed bands with ψ clamped low along the frame and inside bodies.
  Sources and sinks have a multi-valued ψ, so their lines are traced along
  the velocity, seeded at equal steps of inflow along the frame and at
  equal angles round each source (`m/Δψ` lines).
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; ψ is constant along every
  contoured streamline to within 5 % of a strip's flux (tested; the
  remaining error is marching squares' linear interpolation);
  `verification: psi_constant_along_streamlines` (traced flows:
  `equal_flux_seeding`); the cylinder surface is exactly a streamline, and
  so are the Rankine oval and the corner walls (tested); no streamline
  enters a body (tested). Several cylinders use one doublet each, exact
  only in the limit of wide spacing, so their surfaces are close to — not
  exactly — streamlines; lines are clipped at the surface. Clamped knobs are
  reported as `requested_<field>`; the line-art style reports its
  colourability check.
