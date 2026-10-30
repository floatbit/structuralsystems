const states = new WeakMap();
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function begin(panel) {
  const previous = states.get(panel);
  previous?.animations.forEach(animation => animation.cancel());
  const state = { animations: [], closing: false };
  states.set(panel, state);
  return state;
}

function animate(state, element, frames, options) {
  const animation = element.animate(frames, options);
  state.animations.push(animation);
  return animation.finished.catch(() => {});
}

export async function openModal(panel) {
  if (!panel.classList.contains('hidden') && !states.get(panel)?.closing) return;
  const state = begin(panel);
  panel.classList.remove('hidden');
  if (reducedMotion()) return;
  const background = getComputedStyle(panel).backgroundColor;
  await Promise.all([
    animate(state, panel, [{ backgroundColor: 'rgba(0,0,0,0)' }, { backgroundColor: background }], { duration: 220, easing: 'ease-out' }),
    ...Array.from(panel.children, child => animate(state, child, [{ opacity: 0 }, { opacity: 1 }], { delay: 220, duration: 180, fill: 'backwards', easing: 'ease-out' })),
  ]);
}

export async function closeModal(panel) {
  if (panel.classList.contains('hidden') || states.get(panel)?.closing) return false;
  const state = begin(panel);
  state.closing = true;
  if (!reducedMotion()) {
    await Promise.all([
      ...Array.from(panel.children, child => animate(state, child, [{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards', easing: 'ease-in' })),
      animate(state, panel, [{ backgroundColor: getComputedStyle(panel).backgroundColor }, { backgroundColor: 'rgba(0,0,0,0)' }], { delay: 180, duration: 220, fill: 'forwards', easing: 'ease-in' }),
    ]);
  }
  if (states.get(panel) !== state) return false;
  panel.classList.add('hidden');
  state.animations.forEach(animation => animation.cancel());
  states.delete(panel);
  return true;
}

export function contentLoader() {
  const image = document.querySelector('.search-loading-template')?.content.querySelector('.loading-dark')?.cloneNode(true);
  if (image) {
    image.className = 'modal-loading-image';
    image.alt = '';
  }
  return `<div class="content-loader" role="status" aria-label="Loading">${image?.outerHTML || ''}</div>`;
}
