import { openModal, closeModal } from './modal';
import { fetchProjectSearch, publishProjectSearch } from './project-search';

export default class Search {

  constructor() {
    // Setting to control whether the search panel should be closed on project open
    this.CLOSE_SEARCH_ON_PROJECT_OPEN = false;
    this.setupSearch();
  }

  setupSearch() {
    const form = document.querySelector('.panel-search form');
    const searchResults = document.querySelector('.search-results');
    const openSearchButtons = document.querySelectorAll('[data-open-search]');
    const closeSearchButton = document.querySelector('.panel-search .close');
    const searchPanel = document.querySelector('.panel-search');
    const keywordInput = document.querySelector('#keyword');
    let searchTimer;

    if (keywordInput && searchResults) {
      keywordInput.addEventListener('input', () => {
        clearTimeout(searchTimer);
        if (this.searchController) this.searchController.abort();
        if (!keywordInput.value.trim()) {
          this.performSearch('', searchResults);
          return;
        }
        searchTimer = setTimeout(() => {
          this.performSearch(keywordInput.value, searchResults);
        }, 1000);
      });
    }

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearTimeout(searchTimer);
        this.performSearch(keywordInput.value, searchResults);
      });
    }

    if (openSearchButtons.length > 0 && searchPanel) {
      openSearchButtons.forEach(button => {
        button.addEventListener('click', () => {
          openModal(searchPanel);
        });
      });
    }

    if (closeSearchButton && searchPanel) {
      closeSearchButton.addEventListener('click', () => {
        closeModal(searchPanel);
      });
    }

    if (searchResults) {
      searchResults.addEventListener('click', (event) => {
        if (event.target.closest('[data-view-on-map]')) {
          event.preventDefault();
          closeModal(searchPanel);
          return;
        }
        const linkElement = event.target.closest('a[data-post-id]');
        if (linkElement) {
          event.preventDefault();
          const postId = linkElement.getAttribute('data-post-id');
          const mapElement = document.querySelector(`#map [data-post-id="${postId}"]`);
          if (mapElement) {
            const clickEvent = new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window
            });
            mapElement.dispatchEvent(clickEvent);
            if (this.CLOSE_SEARCH_ON_PROJECT_OPEN) {
              closeModal(searchPanel);
            }
          }
        }
      });
    }
  }

  performSearch(keyword, searchResults) {
    if (this.searchController) this.searchController.abort();
    keyword = keyword.trim();
    if (!keyword) {
      searchResults.innerHTML = '';
      publishProjectSearch('', null);
      return;
    }
    const controller = new AbortController();
    this.searchController = controller;
    const loadingTemplate = document.querySelector('.search-loading-template');
    searchResults.innerHTML = loadingTemplate ? loadingTemplate.innerHTML : '<p role="status">Searching…</p>';
    fetchProjectSearch(keyword, controller.signal)
    .then(({ html: result, postIds }) => {
      if (controller.signal.aborted) return;
      const parser = new DOMParser();
      const doc = parser.parseFromString(result, 'text/html');
      const liCount = doc.querySelectorAll('li').length;
      const viewOnMap = liCount > 0 ? ' <a href="#map" data-view-on-map>View on Map</a>' : '';
      searchResults.innerHTML = `<p class="search-summary"><span><span class="search-result-count">${liCount}</span> projects found</span>${viewOnMap}</p>${result}`;

      publishProjectSearch(keyword, postIds);

    })
    .catch(error => {
      if (controller.signal.aborted) return;
      console.error('Error:', error);
      searchResults.innerHTML = '<p>There was an error processing your request.</p>';
    });
  }
}
