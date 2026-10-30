function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function initHomeIntro() {
  const root = document.documentElement;
  const map = document.querySelector('#map svg');
  if (!root.classList.contains('home-intro-pending') || !map) {
    root.classList.remove('home-intro-pending');
    return;
  }
  const animations = [];
  const borderTimers = [];
  let overlay;
  let outlineTimer;
  const finish = () => {
    clearTimeout(outlineTimer);
    borderTimers.forEach(clearTimeout);
    map.querySelectorAll('.intro-box-solid').forEach(box => box.classList.remove('intro-box-solid'));
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
      return animation;
    };
    // Keep the existing SVG interactive; animate its actual layers rather than a video.
    animate(map.querySelector('#Small'), [{ opacity: 0 }, { opacity: 1 }], { duration: 650, easing: 'ease-out' });
    const bigBoxes = Array.from(map.querySelectorAll('#Big > g')).filter(layer => layer.id !== 'B');
    const buttons = Array.from(map.querySelectorAll('#Buttons > g'));
    const layers = [
      ...bigBoxes.map((layer, index) => ({ layer, delay: 3900 + index * 140, duration: 400 })),
      ...buttons.map((layer, index) => ({ layer, delay: 5700 + index * 50, duration: 250 })),
      { layer: map.querySelector('#Big > #B'), delay: 6500, duration: 450 },
    ];
    layers.forEach(({ layer, delay, duration }) => {
      animate(layer, [
        { opacity: 0, offset: 0 },
        { opacity: 1, offset: 0.15 },
        { opacity: 0, offset: 0.3 },
        { opacity: 1, offset: 0.5 },
        { opacity: 0, offset: 0.65 },
        { opacity: 1, offset: 0.85 },
        { opacity: 1, offset: 1 },
      ].map(frame => ({ ...frame, easing: 'steps(1, end)' })), {
        delay,
        duration,
        easing: 'linear',
      });
    });
    overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    overlay.setAttribute('pointer-events', 'none');
    overlay.setAttribute('aria-hidden', 'true');
    const boxes = Array.from(map.querySelectorAll('#Small > g[data-content-type="project"][data-post-id] > rect'));
    // Include every linked project box, in scattered order within the same time window.
    let lastYellowReveal = 0;
    const selectedBoxes = shuffle(boxes);
    selectedBoxes.forEach((box, index) => {
      const pulse = box.cloneNode(false);
      pulse.removeAttribute('class');
      pulse.removeAttribute('id');
      pulse.setAttribute('fill', '#f5e32b');
      pulse.setAttribute('stroke', '#f5e32b');
      pulse.setAttribute('stroke-dasharray', 'none');
      pulse.style.opacity = '0';
      overlay.append(pulse);
      const delay = 700 + index / Math.max(1, selectedBoxes.length - 1) * 2655 + Math.random() * 90;
      const duration = 120 + Math.random() * 100;
      // Override the intro's dashed style from this box's first blink onward.
      borderTimers.push(window.setTimeout(() => box.classList.add('intro-box-solid'), delay));
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
