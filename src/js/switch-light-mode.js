const STORAGE_KEY = 'structuralsystems-light-mode';

export default class SwitchLightMode {

  constructor() {
    this.root = document.documentElement;
    this.elements = document.querySelectorAll('[data-switch-light-mode]');
    this.applyStored();
    this.updateControls();
    this.bind();
  }

  bind() {
    this.elements.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    });
  }

  toggle() {
    const on = !this.root.classList.contains('light-mode');
    this.set(on);
  }

  set(on) {
    this.root.classList.toggle('light-mode', on);
    this.updateControls();
    try {
      localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
    } catch (_) {
      // ignore private mode / quota
    }
  }

  applyStored() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === '1') {
        this.root.classList.add('light-mode');
      } else if (v === '0') {
        this.root.classList.remove('light-mode');
      }
    } catch (_) {
      // ignore
    }
  }

  updateControls() {
    const light = this.root.classList.contains('light-mode');
    this.elements.forEach(element => {
      if (element.tagName === 'BUTTON') element.setAttribute('aria-pressed', String(light));
      const label = element.querySelector('[data-mode-label]');
      if (label) label.textContent = light ? 'Dark mode' : 'Light mode';
    });
  }

}
