// The "zero surprises" scene: a seeded maze, drawn as 3D line work, that
// solves itself — then reseeds and does it again. Each loop is a genuinely
// different maze (recursive backtracker over a seeded PRNG, the same
// algorithm family the engine's maze crate carves with), and each one is
// solved deterministically. Infinite pages, zero surprises, literally.
//
// Loaded lazily like the hero scene: dynamic import on idle, never under
// prefers-reduced-motion, paused offscreen. Shares the three.js chunk with
// the hero, so the second scene costs only this file.

import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

const N = 15; // cells per side
const CELL = 2 / N; // world units, maze spans [-1, 1]

/** Deterministic PRNG — same seed, same maze, on brand. */
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

interface Maze {
  /** For each cell, an open-wall bitmask: 1=N, 2=E, 4=S, 8=W. */
  open: Uint8Array;
  /** Cell indices from entrance (0) to exit (N*N-1). */
  solution: number[];
}

/** Recursive backtracker with an explicit stack, then a DFS solve. */
function carve(seed: number): Maze {
  const rand = mulberry32(seed);
  const open = new Uint8Array(N * N);
  const visited = new Uint8Array(N * N);
  const stack = [0];
  visited[0] = 1;
  // direction: [dx, dy, bit, opposite-bit]
  const dirs = [
    [0, -1, 1, 4],
    [1, 0, 2, 8],
    [0, 1, 4, 1],
    [-1, 0, 8, 2],
  ] as const;
  while (stack.length > 0) {
    const at = stack[stack.length - 1]!;
    const x = at % N;
    const y = (at / N) | 0;
    const options = dirs.filter(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      return nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[ny * N + nx];
    });
    if (options.length === 0) {
      stack.pop();
      continue;
    }
    const [dx, dy, bit, opp] = options[(rand() * options.length) | 0]!;
    const next = (y + dy) * N + (x + dx);
    open[at] = open[at]! | bit;
    open[next] = open[next]! | opp;
    visited[next] = 1;
    stack.push(next);
  }

  // Solve: DFS from corner to corner (unique path in a perfect maze).
  const goal = N * N - 1;
  const path = [0];
  const seen = new Uint8Array(N * N);
  seen[0] = 1;
  while (path[path.length - 1] !== goal) {
    const at = path[path.length - 1]!;
    const x = at % N;
    const y = (at / N) | 0;
    const step = dirs.find(([dx, dy, bit]) => {
      if (!(open[at]! & bit)) return false;
      const next = (y + dy) * N + (x + dx);
      return !seen[next];
    });
    if (!step) {
      path.pop(); // dead end — back out
      continue;
    }
    const next = (y + step[1]) * N + (x + step[0]);
    seen[next] = 1;
    path.push(next);
  }
  return { open, solution: path };
}

const cellCenter = (i: number): [number, number] => [
  -1 + (i % N) * CELL + CELL / 2,
  -1 + ((i / N) | 0) * CELL + CELL / 2,
];

/** Wall line segments for a carved maze, on the y=0 plane. */
function wallPositions(maze: Maze): Float32Array {
  const s: number[] = [];
  const seg = (x1: number, z1: number, x2: number, z2: number) =>
    s.push(x1, 0, z1, x2, 0, z2);
  // Outer border, minus the entrance (NW corner, north wall) and the exit
  // (SE corner, south wall).
  seg(-1 + CELL, -1, 1, -1); // top, gap at first cell
  seg(-1, 1, 1 - CELL, 1); // bottom, gap at last cell
  seg(-1, -1, -1, 1); // left
  seg(1, -1, 1, 1); // right
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const at = y * N + x;
      const px = -1 + x * CELL;
      const pz = -1 + y * CELL;
      // Interior walls: draw each cell's east and south closed walls once.
      if (x < N - 1 && !(maze.open[at]! & 2)) seg(px + CELL, pz, px + CELL, pz + CELL);
      if (y < N - 1 && !(maze.open[at]! & 4)) seg(px, pz + CELL, px + CELL, pz + CELL);
    }
  }
  return new Float32Array(s);
}

/** The solution polyline, entrance approach + cell centres + exit run. */
function solutionPositions(maze: Maze): Float32Array {
  const pts: number[] = [];
  const [sx, sz] = cellCenter(0);
  pts.push(sx, 0, -1 - CELL * 0.6, sx, 0, sz);
  for (let i = 1; i < maze.solution.length; i++) {
    const [x, z] = cellCenter(maze.solution[i]!);
    pts.push(x, 0, z);
  }
  const [ex] = cellCenter(N * N - 1);
  pts.push(ex, 0, 1 + CELL * 0.6);
  return new Float32Array(pts);
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
  const camera = new PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 2.6, 2.3);
  camera.lookAt(0, 0, 0);

  const group = new Group();
  group.rotation.x = -0.06;
  scene.add(group);

  const wallMaterial = new LineBasicMaterial({ transparent: true, opacity: 0.55 });
  const pathMaterial = new LineBasicMaterial({ transparent: true, opacity: 0.95 });
  const recolor = () => {
    wallMaterial.color = cssColor('--color-ink-muted');
    pathMaterial.color = cssColor('--color-accent');
  };
  recolor();
  const themeObserver = new MutationObserver(recolor);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  // ── maze + solution, rebuilt each loop with the next seed ──
  const wallGeometry = new BufferGeometry();
  const pathGeometry = new BufferGeometry();
  const walls = new LineSegments(wallGeometry, wallMaterial);
  const path = new Line(pathGeometry, pathMaterial);
  group.add(walls, path);

  let seed = 0xa11ce;
  let pathPoints = 0;
  const build = () => {
    const maze = carve(seed);
    seed = (seed + 1) >>> 0;
    wallGeometry.setAttribute('position', new BufferAttribute(wallPositions(maze), 3));
    const solution = solutionPositions(maze);
    pathPoints = solution.length / 3;
    pathGeometry.setAttribute('position', new BufferAttribute(solution, 3));
    pathGeometry.setDrawRange(0, 0);
  };
  build();

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

  // One synchronous frame at init, solved — so the canvas is never blank
  // even where requestAnimationFrame is throttled; the loop then redraws
  // the solution from the entrance.
  pathGeometry.setDrawRange(0, pathPoints);
  renderer.render(scene, camera);
  pathGeometry.setDrawRange(0, 0);

  // ── the loop: solve over ~5s, hold the solved maze, then a new one ──
  const SOLVE = 5;
  const HOLD = 2.5;
  let frame = 0;
  let running = false;
  let phaseStart = performance.now();
  const render = () => {
    const t = (performance.now() - phaseStart) / 1000;
    if (t < SOLVE) {
      const eased = t / SOLVE;
      pathGeometry.setDrawRange(0, Math.floor(pathPoints * eased * eased * (3 - 2 * eased)));
    } else if (t > SOLVE + HOLD) {
      build();
      phaseStart = performance.now();
    } else {
      pathGeometry.setDrawRange(0, pathPoints);
    }
    group.rotation.y += 0.0016;
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
    wallGeometry.dispose();
    pathGeometry.dispose();
    wallMaterial.dispose();
    pathMaterial.dispose();
    renderer.dispose();
  };
}
