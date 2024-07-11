export default class Explore {

  constructor() {
    this.setupExplore();
  }

  setupExplore() {
    const checkboxes = document.querySelectorAll('.panel-explore input[type="checkbox"]');
    const panelExplore = document.querySelector('.panel-explore');
    const closeButton = panelExplore.querySelector('button.close');
    const submitButton = panelExplore.querySelector('input[type="submit"]');
    const openExploreElements = document.querySelectorAll('[data-open-explore]');

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.filterProjects();
      });
    });

    closeButton.addEventListener('click', () => {
      panelExplore.classList.add('hidden');
    });

    submitButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default form submission
      panelExplore.classList.add('hidden');
      this.filterProjects();
    });

    openExploreElements.forEach(element => {
      element.addEventListener('click', () => {
        panelExplore.classList.remove('hidden');
      });
    });

    // Initial filter on page load
    this.filterProjects();
  }

  filterProjects() {
    const selectedCategories = Array.from(document.querySelectorAll('.panel-explore input[name^="category"]:checked')).map(cb => cb.value);
    const selectedYears = Array.from(document.querySelectorAll('.panel-explore input[name^="year"]:checked')).map(cb => cb.value);

    const projects = document.querySelectorAll('[data-content-type="project"]');
    const totalProjectsElement = document.querySelector('.total-projects');
    const totalProjectsCounter = document.querySelector('.total-projects-counter');

    let matchCount = 0;

    if (selectedCategories.length === 0 && selectedYears.length === 0) {
      projects.forEach(project => {
        project.classList.remove('explore-match');
      });
      totalProjectsElement.classList.add('hidden');
      totalProjectsCounter.textContent = matchCount;
      return;
    }

    projects.forEach(project => {
      const projectCategories = project.getAttribute('data-project-categories').split(',');
      const projectYears = project.getAttribute('data-project-years').split(',');

      const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat => projectCategories.includes(cat));
      const yearMatch = selectedYears.length === 0 || selectedYears.some(year => projectYears.includes(year));

      if (categoryMatch && yearMatch) {
        project.classList.add('explore-match');
        matchCount++;
      } else {
        project.classList.remove('explore-match');
      }
    });

    totalProjectsCounter.textContent = matchCount;

    if (matchCount > 0) {
      totalProjectsElement.classList.remove('hidden');
    } else {
      totalProjectsElement.classList.add('hidden');
    }
  }
}
