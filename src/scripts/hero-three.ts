// The hero's 3D element: a phyllotaxis disk — the golden-angle floret spiral
// the engine itself generates — as a slowly precessing particle field.
//
// This module is loaded lazily (dynamic import, on idle, never on
// reduced-motion), so three.js stays out of the critical path entirely.
// Budget-consciousness elsewhere: DPR capped at 1.75, rendering pauses when
// the hero leaves the viewport or the tab is hidden, and colours come from
// the live CSS custom properties so the scene follows the theme toggle.

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  ShaderMaterial,
  Scene,
  WebGLRenderer,
} from 'three';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const COUNT = 1800;

function cssColor(name: string): Color {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new Color(raw || '#17795a');
}

export default function init(canvas: HTMLCanvasElement): () => void {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 1.1, 3.4);
  camera.lookAt(0, 0, 0);

  // Phyllotaxis: r = c·√i at the golden angle, with a shallow dome in z and
  // a per-point phase for the shader's slow shimmer.
  const positions = new Float32Array(COUNT * 3);
  const params = new Float32Array(COUNT * 2); // [normalised radius, phase]
  for (let i = 0; i < COUNT; i++) {
    const t = i / COUNT;
    const r = 1.6 * Math.sqrt(t);
    const a = i * GOLDEN_ANGLE;
    positions[i * 3] = r * Math.cos(a);
    positions[i * 3 + 1] = 0.35 * (1 - t) * (1 - t) - 0.1;
    positions[i * 3 + 2] = r * Math.sin(a);
    params[i * 2] = t;
    params[i * 2 + 1] = (i % 89) / 89;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('aParam', new BufferAttribute(params, 2));

  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uInner: { value: cssColor('--color-accent') },
      uOuter: { value: cssColor('--color-ink-muted') },
      uDpr: { value: Math.min(devicePixelRatio, 1.75) },
    },
    vertexShader: /* glsl */ `
      attribute vec2 aParam;
      uniform float uTime;
      uniform float uDpr;
      varying float vRadius;
      varying float vTwinkle;
      void main() {
        vRadius = aParam.x;
        vTwinkle = 0.75 + 0.25 * sin(uTime * 1.4 + aParam.y * 6.28318);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = uDpr * (3.4 - 1.9 * aParam.x) * (140.0 / -mv.z) / 40.0;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uInner;
      uniform vec3 uOuter;
      varying float vRadius;
      varying float vTwinkle;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.12, d) * vTwinkle * (0.95 - 0.45 * vRadius);
        gl_FragColor = vec4(mix(uInner, uOuter, vRadius), alpha);
      }
    `,
  });

  const points = new Points(geometry, material);
  scene.add(points);

  // ── theme: recolour when the html class flips ──
  const recolor = () => {
    material.uniforms.uInner!.value = cssColor('--color-accent');
    material.uniforms.uOuter!.value = cssColor('--color-ink-muted');
  };
  const themeObserver = new MutationObserver(recolor);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  // ── sizing ──
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

  // ── pointer parallax, eased ──
  let targetTilt = 0;
  let tilt = 0;
  const onPointer = (e: PointerEvent) => {
    targetTilt = (e.clientX / innerWidth - 0.5) * 0.5;
  };
  addEventListener('pointermove', onPointer, { passive: true });

  // ── render loop: runs only while visible ──
  let frame = 0;
  let running = false;
  const start = performance.now();
  const render = () => {
    const t = (performance.now() - start) / 1000;
    material.uniforms.uTime!.value = t;
    tilt += (targetTilt - tilt) * 0.04;
    points.rotation.y = t * 0.06 + tilt;
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };
  const setRunning = (on: boolean) => {
    if (on === running) return;
    running = on;
    if (on) frame = requestAnimationFrame(render);
    else cancelAnimationFrame(frame);
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
    removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', onVisibility);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
