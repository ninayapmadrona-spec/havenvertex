import * as THREE from './vendor/three.module.min.js';

const canvas = document.getElementById('audienceGlobe3d');
if (canvas) {
  const purple = 0x8b5cf6;
  const purpleDark = 0x6d28d9;
  const arcPurple = 0xa855f7;
  const amber = 0xf59e0b;

  const CITIES = [
    { id: 'New York', lat: 40.7128, lon: -74.0060 },
    { id: 'London', lat: 51.5074, lon: -0.1278 },
    { id: 'Toronto', lat: 43.6532, lon: -79.3832 },
    { id: 'Cape Town', lat: -33.9249, lon: 18.4241 },
    { id: 'Sao Paulo', lat: -23.5505, lon: -46.6333 },
    { id: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { id: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { id: 'Singapore', lat: 1.3521, lon: 103.8198 }
  ];
  const HUB = { lat: -33.8688, lon: 151.2093 }; // Australia region — target-market hub, no office disclosed

  const COUNTRY_TO_CITY = {
    US: 'New York', GB: 'London', CA: 'Toronto', ZA: 'Cape Town',
    BR: 'Sao Paulo', IN: 'Mumbai', JP: 'Tokyo', SG: 'Singapore'
  };

  const RADIUS = 1;

  function latLonToVec3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  // Simple person-silhouette icon, drawn to a canvas and used as a sprite texture.
  function makeMarkerTexture(hex) {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = hex;
    ctx.beginPath();
    ctx.arc(32, 20, 11, 0, Math.PI * 2); // head
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(15, 58);
    ctx.quadraticCurveTo(16, 34, 32, 33);
    ctx.quadraticCurveTo(48, 34, 49, 58);
    ctx.closePath();
    ctx.fill(); // body
    return new THREE.CanvasTexture(c);
  }

  const markerTexPurple = makeMarkerTexture('#C4B5FD');
  const markerTexAmber = makeMarkerTexture('#FDE68A');

  function makeArcCurve(fromLL, toLL) {
    const from = latLonToVec3(fromLL.lat, fromLL.lon, RADIUS);
    const to = latLonToVec3(toLL.lat, toLL.lon, RADIUS);
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const liftFactor = 1 + from.distanceTo(to) * 0.45;
    mid.normalize().multiplyScalar(RADIUS * liftFactor);
    return new THREE.QuadraticBezierCurve3(from, mid, to);
  }

  // ---- Scene setup ----
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
  camera.position.set(0, 0, 2.6);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const globeGroup = new THREE.Group();
  globeGroup.rotation.x = 0.25;
  scene.add(globeGroup);

  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('assets/img/earth-night.jpg');
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS, 64, 64),
    new THREE.MeshBasicMaterial({ map: earthTexture })
  );
  globeGroup.add(sphere);

  // Faint purple lat/long grid for a "tech network" feel over the photo texture
  const grid = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS * 1.001, 24, 16),
    new THREE.MeshBasicMaterial({ color: purple, wireframe: true, transparent: true, opacity: 0.09 })
  );
  globeGroup.add(grid);

  // Bright purple rim-light glow around the sphere's silhouette (fresnel falloff)
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS * 1.12, 48, 48),
    new THREE.ShaderMaterial({
      uniforms: { glowColor: { value: new THREE.Color(purple) } },
      vertexShader: `
        varying float vIntensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 viewDir = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
          vIntensity = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vIntensity;
        uniform vec3 glowColor;
        void main() {
          gl_FragColor = vec4(glowColor, vIntensity * 0.85);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    })
  );
  scene.add(atmosphere);

  const arcObjects = {};
  const markerObjects = {};

  CITIES.forEach((c) => {
    const curve = makeArcCurve(HUB, c);
    const points = curve.getPoints(64);
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineDashedMaterial({ color: arcPurple, dashSize: 0.045, gapSize: 0.03, transparent: true, opacity: 0.9 });
    const line = new THREE.Line(geom, mat);
    line.computeLineDistances();
    globeGroup.add(line);
    arcObjects[c.id] = line;

    const marker = new THREE.Sprite(new THREE.SpriteMaterial({ map: markerTexPurple, depthTest: true, transparent: true }));
    const pos = latLonToVec3(c.lat, c.lon, RADIUS * 1.01);
    marker.position.copy(pos);
    marker.scale.set(0.11, 0.11, 1);
    globeGroup.add(marker);
    markerObjects[c.id] = marker;
  });

  const hubMarker = new THREE.Sprite(new THREE.SpriteMaterial({ map: markerTexPurple, depthTest: true, transparent: true }));
  hubMarker.position.copy(latLonToVec3(HUB.lat, HUB.lon, RADIUS * 1.01));
  hubMarker.scale.set(0.15, 0.15, 1);
  globeGroup.add(hubMarker);

  function onResize() {
    const size = canvas.clientWidth || canvas.parentElement.offsetWidth;
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);
  onResize();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) globeGroup.rotation.y = 0.6;

  let visible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { visible = entry.isIntersecting; });
  }, { threshold: 0.1 });
  observer.observe(canvas);

  function animate() {
    if (visible && !reduceMotion) globeGroup.rotation.y += 0.0032;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  function setNote(text) {
    const note = document.querySelector('.audience-globe3d-visitor-note');
    if (note) note.textContent = text;
  }

  window.__hvOnVisitorLocated((code) => {
    if (code === 'AU') {
      hubMarker.material.map = markerTexAmber;
      hubMarker.scale.set(0.18, 0.18, 1);
      setNote("You're in Australia — right in our home market.");
      return;
    }
    const city = COUNTRY_TO_CITY[code];
    if (!city) return;
    if (markerObjects[city]) {
      markerObjects[city].material.map = markerTexAmber;
      markerObjects[city].scale.set(0.15, 0.15, 1);
    }
    if (arcObjects[city]) {
      arcObjects[city].material.color.setHex(amber);
      arcObjects[city].material.opacity = 1;
    }
    setNote(`You're near ${city} — let's connect.`);
  });
}
