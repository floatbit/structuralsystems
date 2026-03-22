const STORAGE_KEY = 'structuralsystems-light-mode';

export default class SwitchLightMode {

  constructor() {
    this.root = document.documentElement;
    this.elements = document.querySelectorAll('[data-switch-light-mode]');
    this.applyStored();
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

}
