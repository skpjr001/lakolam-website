// Ambient scene for the contact band: a harmonograph — the damped-pendulum
// curve the engine's own harmonograph generator draws — tracing itself in 3D,
// then reseeding with new frequency ratios. Frequencies sit near small
// integers but slightly detuned, so the figure precesses instead of closing;
// the same trick the engine uses.
//
// Same discipline as the other scenes: lazily imported on idle, never under
// prefers-reduced-motion, paused offscreen, theme-aware, and sharing the one
// three.js chunk.

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Line,
  LineBasicMaterial,
  NormalBlending,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

const POINTS = 2600;
const SPAN = 46; // seconds of pendulum time the curve covers

/** Deterministic PRNG — the site's scenes reseed, never randomise. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One damped sine term of the pendulum sum. */
interface Pendulum {
  amp: number;
  freq: number;
  phase: number;
  damp: number;
}

function pendulum(rand: () => number, axisScale: number): Pendulum {
  return {
    amp: (0.55 + rand() * 0.45) * axisScale,
    // Near-integer frequency, nudged off ratio so the figure precesses.
    freq: (1 + Math.floor(rand() * 3)) * (1 + (rand() - 0.5) * 0.012),
    phase: rand() * Math.PI * 2,
    damp: 0.012 + rand() * 0.02,
  };
}

const term = (p: Pendulum, t: number) =>
  p.amp * Math.sin(p.freq * t + p.phase) * Math.exp(-p.damp * t);

function curvePositions(seed: number): Float32Array {
  const rand = mulberry32(seed);
  const x1 = pendulum(rand, 1.35);
  const x2 = pendulum(rand, 0.55);
  const y1 = pendulum(rand, 0.65);
  const y2 = pendulum(rand, 0.3);
  const z1 = pendulum(rand, 0.4);
  const out = new Float32Array(POINTS * 3);
  for (let i = 0; i < POINTS; i++) {
    const t = (i / POINTS) * SPAN;
    out[i * 3] = term(x1, t) + term(x2, t);
    out[i * 3 + 1] = term(y1, t) + term(y2, t);
    out[i * 3 + 2] = term(z1, t) - 0.2;
  }
  return out;
}

function cssColor(name: string): Color {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new Color(raw || '#17795a');
}

export default function init(canvas: HTMLCanvasElement): () => void {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));

  const scene = new Scene();
  const camera = new PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 0, 3.1);

  const material = new LineBasicMaterial({ transparent: true });
  const geometry = new BufferGeometry();
  const line = new Line(geometry, material);
  scene.add(line);

  // In dark the ribbon glows additively; in light it draws like ink.
  const recolor = () => {
    const dark = document.documentElement.classList.contains('dark');
    material.color = cssColor('--color-accent');
    material.opacity = dark ? 0.55 : 0.4;
    material.blending = dark ? AdditiveBlending : NormalBlending;
    material.needsUpdate = true;
  };
  recolor();
  const themeObserver = new MutationObserver(recolor);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  let seed = 0xa11ce;
  const reseed = () => {
    geometry.setAttribute('position', new BufferAttribute(curvePositions(seed), 3));
    geometry.setDrawRange(0, 0);
    seed = (seed + 1) >>> 0;
  };
  reseed();

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  // One synchronous frame at init — mid-stroke — so the canvas is never
  // blank: the fade-in has content, and environments that throttle
  // requestAnimationFrame (hidden windows, screenshots) still show the figure.
  geometry.setDrawRange(0, Math.floor(POINTS * 0.62));
  renderer.render(scene, camera);

  // ── the loop: the pen draws for ~11s, rests on the figure, starts anew ──
  const DRAW = 11;
  const HOLD = 3.5;
  let frame = 0;
  let running = false;
  let phaseStart = performance.now();
  const render = () => {
    const t = (performance.now() - phaseStart) / 1000;
    if (t < DRAW) {
      geometry.setDrawRange(0, Math.floor(POINTS * (t / DRAW)));
    } else if (t > DRAW + HOLD) {
      reseed();
      phaseStart = performance.now();
    } else {
      geometry.setDrawRange(0, POINTS);
    }
    line.rotation.y = Math.sin(t * 0.12) * 0.35;
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };
  const setRunning = (on: boolean) => {
    if (on === running) return;
    running = on;
    if (on) {
      phaseStart = performance.now();
      frame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(frame);
    }
  };

  const io = new IntersectionObserver(([entry]) =>
    setRunning((entry?.isIntersecting ?? false) && !document.hidden)
  );
  io.observe(canvas);
  const onVisibility = () => setRunning(!document.hidden);
  document.addEventListener('visibilitychange', onVisibility);

  canvas.classList.add('is-live');

  return () => {
    setRunning(false);
    io.disconnect();
    themeObserver.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
