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

    const clearFiltersButton = document.querySelector('.panel-explore .clear-filters');
    if (clearFiltersButton) {
      clearFiltersButton.addEventListener('click', (event) => {
        event.preventDefault();
        const checkboxes = document.querySelectorAll('.panel-explore input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        this.filterProjects();
      });
    }
  }

  filterProjects() {
    const selectedCategories = Array.from(document.querySelectorAll('.panel-explore input[name^="category"]:checked')).map(cb => cb.value);
    const selectedYears = Array.from(document.querySelectorAll('.panel-explore input[name^="year"]:checked')).map(cb => cb.value);
    const selectedMaterials = Array.from(document.querySelectorAll('.panel-explore input[name^="material"]:checked')).map(cb => cb.value);
    const selectedConstructions = Array.from(document.querySelectorAll('.panel-explore input[name^="construction"]:checked')).map(cb => cb.value);

    const mapProjects = document.querySelectorAll('.map [data-content-type="project"]:not(.big-box)');
    const mobileProjects = document.querySelectorAll('.mobile-projects [data-content-type="project"]');
    const totalProjectsElement = document.querySelector('.total-projects');
    const totalProjectsCounter = document.querySelector('.total-projects-counter');

    let matchCount = 0;

    if (selectedCategories.length === 0 && selectedYears.length === 0 && selectedMaterials.length === 0 && selectedConstructions.length === 0) {
      mapProjects.forEach(project => {
        project.classList.remove('explore-match');
      });
      mobileProjects.forEach(project => {
        project.classList.remove('hidden');
      });
      totalProjectsElement.classList.add('hidden');
      totalProjectsCounter.textContent = matchCount;
      return;
    }

    // toggle mobile projects
    mobileProjects.forEach(project => {
      const projectCategories = project.getAttribute('data-project-categories').split(',');
      const projectYears = project.getAttribute('data-project-years').split(',');
      const projectMaterials = project.getAttribute('data-project-materials').split(',');
      const projectConstructions = project.getAttribute('data-project-constructions').split(',');

      const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat => projectCategories.includes(cat));
      const yearMatch = selectedYears.length === 0 || selectedYears.some(year => projectYears.includes(year));
      const materialMatch = selectedMaterials.length === 0 || selectedMaterials.some(material => projectMaterials.includes(material));
      const constructionMatch = selectedConstructions.length === 0 || selectedConstructions.some(construction => projectConstructions.includes(construction));

      project.classList.add('hidden');

      if (categoryMatch && yearMatch && materialMatch && constructionMatch) {
        project.classList.remove('hidden');
      }
    });

    // toggle map projects
    mapProjects.forEach(project => {
      const projectCategories = project.getAttribute('data-project-categories').split(',');
      const projectYears = project.getAttribute('data-project-years').split(',');
      const projectMaterials = project.getAttribute('data-project-materials').split(',');
      const projectConstructions = project.getAttribute('data-project-constructions').split(',');
      
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat => projectCategories.includes(cat));
      const yearMatch = selectedYears.length === 0 || selectedYears.some(year => projectYears.includes(year));
      const materialMatch = selectedMaterials.length === 0 || selectedMaterials.some(material => projectMaterials.includes(material));
      const constructionMatch = selectedConstructions.length === 0 || selectedConstructions.some(construction => projectConstructions.includes(construction));

      if (categoryMatch && yearMatch && materialMatch && constructionMatch) {
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