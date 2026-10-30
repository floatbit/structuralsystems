import { fetchProjectSearch, publishProjectSearch } from './project-search';

export default class MobileProjects {
  constructor() {
    this.root = document.querySelector('.mobile-projects');
    if (!this.root) return;
    this.form = this.root.querySelector('.mobile-project-search');
    this.input = this.form.querySelector('input');
    this.cards = Array.from(this.root.querySelectorAll('.mobile-project-card'));
    this.status = this.root.querySelector('.mobile-project-status');
    this.loading = this.root.querySelector('.mobile-project-loading');
    this.searchToggle = this.form.querySelector('.mobile-search-toggle');
    const revealSearch = () => {
      this.input.hidden = false;
      this.searchToggle.setAttribute('aria-expanded', 'true');
    };
    this.form.addEventListener('focusin', revealSearch);
    this.form.addEventListener('click', () => {
      revealSearch();
      this.input.focus();
    });
    this.form.addEventListener('focusout', event => {
      if (!this.form.contains(event.relatedTarget) && !this.input.value.trim()) {
        this.input.hidden = true;
        this.searchToggle.setAttribute('aria-expanded', 'false');
      }
    });

    this.root.querySelectorAll('[data-project-view]').forEach(button => {
      button.addEventListener('click', () => {
        this.root.dataset.view = button.dataset.projectView;
        this.root.querySelectorAll('[data-project-view]').forEach(control => {
          control.setAttribute('aria-pressed', String(control === button));
        });
      });
    });

    this.input.addEventListener('input', () => {
      clearTimeout(this.timer);
      this.controller?.abort();
      if (!this.input.value.trim()) {
        this.setLoading(false);
        publishProjectSearch('', null);
        return;
      }
      this.timer = setTimeout(() => this.search(), 1000);
    });
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      clearTimeout(this.timer);
      this.search();
    });

    document.addEventListener('project-search-results', event => {
      const { keyword, postIds } = event.detail;
      this.input.value = keyword;
      if (keyword) revealSearch();
      const matches = postIds === null ? null : new Set(postIds);
      this.cards.forEach(card => {
        card.classList.toggle('mobile-search-hidden', matches !== null && !matches.has(card.dataset.postId));
      });
      this.updateCount();
    });

    // Explore's filters also hide cards; keep the visible count in sync with both filters.
    this.observer = new MutationObserver(() => this.updateCount());
    this.cards.forEach(card => this.observer.observe(card, { attributes: true, attributeFilter: ['class'] }));
  }

  setLoading(loading) {
    this.root.classList.toggle('is-searching', loading);
    this.root.setAttribute('aria-busy', String(loading));
    this.loading.hidden = !loading;
    if (loading) this.status.textContent = '';
  }

  updateCount() {
    if (this.root.classList.contains('is-searching')) return;
    const count = this.cards.filter(card => !card.classList.contains('hidden') && !card.classList.contains('mobile-search-hidden')).length;
    this.status.textContent = count === 0 ? 'No projects found.' : (this.input.value.trim() ? `Total projects found: ${count}` : '');
  }

  async search() {
    this.controller?.abort();
    const keyword = this.input.value.trim();
    if (!keyword) {
      this.setLoading(false);
      publishProjectSearch('', null);
      return;
    }
    const controller = new AbortController();
    this.controller = controller;
    this.setLoading(true);
    try {
      const { postIds } = await fetchProjectSearch(keyword, controller.signal);
      if (controller.signal.aborted) return;
      this.setLoading(false);
      publishProjectSearch(keyword, postIds);
    } catch (error) {
      if (controller.signal.aborted) return;
      this.setLoading(false);
      this.status.textContent = 'Search failed. Please try again.';
    }
  }
}
