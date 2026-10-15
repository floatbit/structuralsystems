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
          searchPanel.classList.remove('hidden');
        });
      });
    }

    if (closeSearchButton && searchPanel) {
      closeSearchButton.addEventListener('click', () => {
        searchPanel.classList.add('hidden');
      });
    }

    if (searchResults) {
      searchResults.addEventListener('click', (event) => {
        if (event.target.closest('[data-view-on-map]')) {
          event.preventDefault();
          searchPanel.classList.add('hidden');
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
              searchPanel.classList.add('hidden');
            }
          }
        }
      });
    }
  }

  performSearch(keyword, searchResults) {
    if (this.searchController) this.searchController.abort();
    const controller = new AbortController();
    this.searchController = controller;
    const loadingTemplate = document.querySelector('.search-loading-template');
    searchResults.innerHTML = loadingTemplate ? loadingTemplate.innerHTML : '<p role="status">Searching…</p>';
    const ajaxUrl = '/wp-admin/admin-ajax.php';
    const data = new URLSearchParams();
    data.append('action', 'search_action');
    data.append('keyword', keyword);

    fetch(ajaxUrl, {
      method: 'POST',
      signal: controller.signal,
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => {
      if (!response.ok) throw new Error('Search request failed');
      return response.text();
    })
    .then(result => {
      if (controller.signal.aborted) return;
      const parser = new DOMParser();
      const doc = parser.parseFromString(result, 'text/html');
      const liCount = doc.querySelectorAll('li').length;
      searchResults.innerHTML = `<p class="search-summary">Total projects found: ${liCount} <a href="#map" data-view-on-map>View on Map</a></p>${result}`;

      // Remove 'explore-match' class from all projects
      const allProjects = document.querySelectorAll('[data-content-type="project"]');
      allProjects.forEach(project => project.classList.remove('explore-match'));

      // Add 'explore-match' class to searched projects
      const searchedPostIds = Array.from(doc.querySelectorAll('li[data-post-id]')).map(li => li.getAttribute('data-post-id'));

      searchedPostIds.forEach(postId => {
        document.querySelectorAll(`[data-content-type="project"][data-post-id="${postId}"]`).forEach(project => {
          project.classList.add('explore-match');
        });
      });

    })
    .catch(error => {
      if (controller.signal.aborted) return;
      console.error('Error:', error);
      searchResults.innerHTML = '<p>There was an error processing your request.</p>';
    });
  }
}
