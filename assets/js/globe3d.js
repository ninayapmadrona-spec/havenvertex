import createGlobe from './vendor/cobe.esm.js';

const canvas = document.getElementById('audienceGlobe3d');
if (canvas) {
  const nodeColor = [167 / 255, 139 / 255, 250 / 255]; // bright lavender — city/hub dots
  const arcColor = [56 / 255, 189 / 255, 248 / 255]; // cyan-blue glow lines, like the reference
  const amber = [245 / 255, 158 / 255, 11 / 255]; // visitor highlight — warm, reads like a lit-up city

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
  const HUB = { lat: -33.8688, lon: 151.2093 }; // Australia region — same target-market hub as the 2D map

  const COUNTRY_TO_CITY = {
    US: 'New York', GB: 'London', CA: 'Toronto', ZA: 'Cape Town',
    BR: 'Sao Paulo', IN: 'Mumbai', JP: 'Tokyo', SG: 'Singapore'
  };

  function buildState(highlightCity) {
    const markers = CITIES.map((c) => ({
      location: [c.lat, c.lon],
      size: c.id === highlightCity ? 0.09 : 0.05,
      color: c.id === highlightCity ? amber : nodeColor
    }));
    markers.push({ location: [HUB.lat, HUB.lon], size: 0.09, color: nodeColor });
    const arcs = CITIES.map((c) => ({
      from: [HUB.lat, HUB.lon],
      to: [c.lat, c.lon],
      color: c.id === highlightCity ? amber : arcColor
    }));
    return { markers, arcs };
  }

  let width = 0;
  let highlighted = null;
  const onResize = () => { width = canvas.offsetWidth; };
  window.addEventListener('resize', onResize);
  onResize();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let phi = 0.6;
  let visible = true;

  const initial = buildState(null);
  const globe = createGlobe(canvas, {
    devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    width: width * 2,
    height: width * 2,
    phi,
    theta: 0.3,
    dark: 1,
    diffuse: 1.3,
    mapSamples: 16000,
    mapBrightness: 9,
    baseColor: [0.05, 0.05, 0.1],
    markerColor: nodeColor,
    glowColor: [0.32, 0.26, 0.55],
    arcColor,
    arcWidth: 2,
    arcHeight: 0.4,
    markers: initial.markers,
    arcs: initial.arcs
  });

  function frame() {
    if (visible && !reduceMotion) {
      phi += 0.0045;
      globe.update({ phi, width: width * 2, height: width * 2 });
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { visible = entry.isIntersecting; });
  }, { threshold: 0.1 });
  observer.observe(canvas);

  function setNote(text) {
    const note = document.querySelector('.audience-globe3d-visitor-note');
    if (note) note.textContent = text;
  }

  window.__hvOnVisitorLocated((code) => {
    if (code === 'AU') {
      setNote("You're in Australia — right in our home market.");
      return;
    }
    const city = COUNTRY_TO_CITY[code];
    if (!city) return;
    highlighted = city;
    const state = buildState(highlighted);
    globe.update(state);
    setNote(`You're near ${city} — let's connect.`);
  });
}
