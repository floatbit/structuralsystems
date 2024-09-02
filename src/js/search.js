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

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const keyword = document.querySelector('#keyword').value;
        this.performSearch(keyword, searchResults);
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
    data.append('action', 'search_action');
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
      const parser = new DOMParser();
      const doc = parser.parseFromString(result, 'text/html');
      const liCount = doc.querySelectorAll('li').length;
      //searchResults.innerHTML = `<p>Total projects found: ${liCount}</p>${result}`;
      searchResults.innerHTML = `<p>Total projects found: ${liCount}</p>`;

      // Remove 'explore-match' class from all projects
      const allProjects = document.querySelectorAll('[data-content-type="project"]');
      allProjects.forEach(project => project.classList.remove('explore-match'));

      // Add 'explore-match' class to searched projects
      const searchedPostIds = Array.from(doc.querySelectorAll('li[data-post-id]')).map(li => li.getAttribute('data-post-id'));

      searchedPostIds.forEach(postId => {
        const matchedProject = document.querySelector(`[data-content-type="project"][data-post-id="${postId}"]`);
        if (matchedProject) {
          matchedProject.classList.add('explore-match');
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
      searchResults.innerHTML = '<p>There was an error processing your request.</p>';
    });
  }
}