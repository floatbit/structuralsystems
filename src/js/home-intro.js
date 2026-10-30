function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function scatteredBoxes(boxes, viewBox, count = 100) {
  const [left, top, width, height] = viewBox;
  const regions = new Map();
  boxes.forEach(box => {
    const x = Number(box.getAttribute('x')) + Number(box.getAttribute('width')) / 2;
    const y = Number(box.getAttribute('y')) + Number(box.getAttribute('height')) / 2;
    const column = Math.max(0, Math.min(7, Math.floor((x - left) / width * 8)));
    const row = Math.max(0, Math.min(4, Math.floor((y - top) / height * 5)));
    const key = `${column}:${row}`;
    if (!regions.has(key)) regions.set(key, []);
    regions.get(key).push(box);
  });
  const buckets = shuffle(Array.from(regions.values(), shuffle));
  const selected = [];
  while (selected.length < Math.min(count, boxes.length)) {
    buckets.forEach(bucket => {
      if (bucket.length && selected.length < count) selected.push(bucket.pop());
    });
  }
  return shuffle(selected);
}

export default function initHomeIntro() {
  const root = document.documentElement;
  const map = document.querySelector('#map svg');
  if (!root.classList.contains('home-intro-pending') || !map) {
    root.classList.remove('home-intro-pending');
    return;
  }
  const animations = [];
  let overlay;
  let outlineTimer;
  const finish = () => {
    clearTimeout(outlineTimer);
    animations.forEach(animation => animation.cancel());
    overlay?.remove();
    root.classList.remove('home-intro-active');
    root.classList.remove('home-intro-pending');
  };
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return finish();
    root.classList.add('home-intro-active');
    const animate = (element, frames, options) => {
      if (!element) return;
      const animation = element.animate(frames, { fill: 'backwards', ...options });
      animations.push(animation);
    };
    // Keep the existing SVG interactive; animate its actual layers rather than a video.
    animate(map.querySelector('#Small'), [{ opacity: 0 }, { opacity: 1 }], { duration: 650, easing: 'ease-out' });
    const layers = Array.from(map.querySelectorAll('#Big > g, #Buttons > g'));
    layers.forEach((layer, index) => {
      const isLogo = layer.id === 'B';
      animate(layer, [{ opacity: 0 }, { opacity: 1 }], {
        delay: isLogo ? 5700 : 3900 + (index % 6) * 240,
        duration: isLogo ? 1200 : 1000,
        easing: 'ease-out',
      });
    });
    overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    overlay.setAttribute('pointer-events', 'none');
    overlay.setAttribute('aria-hidden', 'true');
    const boxes = Array.from(map.querySelectorAll('#Small > g > rect'));
    // Sample across map regions, then scramble their timing to avoid spatial clusters.
    const viewBox = map.getAttribute('viewBox').trim().split(/[\s,]+/).map(Number);
    let lastYellowReveal = 0;
    const selectedBoxes = scatteredBoxes(boxes, viewBox);
    selectedBoxes.forEach((box, index) => {
      const pulse = box.cloneNode(false);
      pulse.removeAttribute('class');
      pulse.removeAttribute('id');
      pulse.setAttribute('fill', '#f5e32b');
      pulse.setAttribute('stroke', '#f5e32b');
      pulse.style.opacity = '0';
      overlay.append(pulse);
      const delay = 700 + index / Math.max(1, selectedBoxes.length - 1) * 2655 + Math.random() * 90;
      const duration = 120 + Math.random() * 100;
      lastYellowReveal = Math.max(lastYellowReveal, delay + duration * 0.08);
      animate(pulse, [
        { opacity: 0, offset: 0 },
        { opacity: 1, offset: 0.08 },
        { opacity: 1, offset: 0.5 },
        { opacity: 0, offset: 1 },
      ], { delay, duration });
    });
    outlineTimer = window.setTimeout(() => {
      root.classList.remove('home-intro-active');
    }, lastYellowReveal);
    map.append(overlay);
    root.classList.remove('home-intro-pending');
    // Interaction can skip the entrance immediately.
    const skip = () => finish();
    document.addEventListener('pointerdown', skip, { once: true });
    document.addEventListener('keydown', skip, { once: true });
    Promise.all(animations.map(animation => animation.finished.catch(() => {}))).then(() => {
      document.removeEventListener('pointerdown', skip);
      document.removeEventListener('keydown', skip);
      finish();
    });
  } catch (error) {
    finish();
  }
}
