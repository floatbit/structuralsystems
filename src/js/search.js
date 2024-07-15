export default class Search {

  constructor() {
    // Setting to control whether the search panel should be closed on project open
    this.CLOSE_SEARCH_ON_PROJECT_OPEN = false;
    this.setupSearch();
  }

  setupSearch() {
    const form = document.querySelector('.panel-search form');
    const searchResults = document.querySelector('.search-results');
    const openSearchButton = document.querySelector('[data-open-search]');
    const closeSearchButton = document.querySelector('.panel-search .close');
    const searchPanel = document.querySelector('.panel-search');

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const keyword = document.querySelector('#keyword').value;
        this.performSearch(keyword, searchResults);
      });
    }

    if (openSearchButton && searchPanel) {
      openSearchButton.addEventListener('click', () => {
        searchPanel.classList.remove('hidden');
      });
    }

    if (closeSearchButton && searchPanel) {
      closeSearchButton.addEventListener('click', () => {
        searchPanel.classList.add('hidden');
      });
    }

    if (searchResults) {
      searchResults.addEventListener('click', (event) => {
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
    const ajaxUrl = '/wp-admin/admin-ajax.php';
    const data = new URLSearchParams();
    data.append('action', 'search_action'); // Replace with your actual action name
    data.append('keyword', keyword);

    fetch(ajaxUrl, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => response.text())
    .then(result => {
      searchResults.innerHTML = result;
    })
    .catch(error => {
      console.error('Error:', error);
      searchResults.innerHTML = '<p>There was an error processing your request.</p>';
    });
  }
}