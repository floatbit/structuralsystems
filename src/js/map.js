import { initImageCarousels, destroyImageCarousels } from './image-carousel';

export default class Map {

  constructor() {
    this.setupBoxes();
    this.loadFromPermalink();
  }

  setupBoxes() {
    document.addEventListener('click', event => {
      const element = event.target.closest('[data-permalink]');
      if (!element || element.closest('.payload-content')) return;
      event.preventDefault();
      const permalink = element.getAttribute('data-permalink');
      if (permalink) this.openContent(permalink, element.getAttribute('data-content-type'));
    });

    const mapElements = document.querySelectorAll('#map [data-box-id]');
    this.addMouseEnterListeners(mapElements);
    this.addMouseLeaveListeners(mapElements);
    this.addMouseMoveListeners(mapElements);

    document.querySelectorAll('.panel-page, .panel-project').forEach(panel => {
      panel.querySelector('.close').addEventListener('click', () => this.closePanel(panel));
    });
  }

  restoreLocation() {
    const panel = document.querySelector('.panel-project:not(.hidden)') || document.querySelector('.panel-page:not(.hidden)');
    const permalink = panel?.dataset.permalink || document.body.dataset.homeUrl || '/';
    history.pushState({}, '', permalink);
    if (panel?.dataset.postId) document.body.setAttribute('data-post-id', panel.dataset.postId);
  }

  closePanel(panel, restore = true) {
    panel.contentController?.abort();
    panel.classList.add('hidden');
    const payload = panel.querySelector('.payload');
    destroyImageCarousels(payload);
    payload.innerHTML = '';
    delete panel.dataset.permalink;
    delete panel.dataset.postId;
    if (restore) this.restoreLocation();
  }

  showContent(panel, html, permalink, postId) {
    const payload = panel.querySelector('.payload');
    destroyImageCarousels(payload);
    payload.innerHTML = html;
    panel.dataset.permalink = permalink;
    panel.dataset.postId = postId;
    panel.classList.remove('hidden');
    panel.scrollTo(0, 0);
    initImageCarousels(payload);
    if (postId) document.body.setAttribute('data-post-id', postId);
    const coverImage = payload.querySelector('.project-cover-image');
    if (coverImage) {
      setTimeout(() => coverImage.classList.add('project-cover-image-fade-out'), 2000);
    }
  }

  async openContent(permalink, contentType) {
    let panel = document.querySelector(contentType === 'project' ? '.panel-project' : '.panel-page');
    panel.contentController?.abort();
    const controller = new AbortController();
    panel.contentController = controller;
    try {
      const response = await fetch(permalink, { signal: controller.signal });
      if (!response.ok) throw new Error('Network response was not ok');
      const html = await response.text();
      if (controller.signal.aborted) return;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const source = doc.querySelector('.payload-content');
      if (!source) throw new Error('Page content was not found');
      // Use the returned content type for links that do not specify one.
      const isProject = source.dataset.contentType === 'project';
      panel = document.querySelector(isProject ? '.panel-project' : '.panel-page');
      if (!isProject) this.closePanel(document.querySelector('.panel-project'), false);
      this.showContent(panel, source.innerHTML, permalink, doc.body.getAttribute('data-post-id'));
      history.pushState({}, '', permalink);
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error('Error fetching or parsing HTML:', error);
    }
  }

  addMouseEnterListeners(elements) {
    elements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        const boxId = element.getAttribute('data-box-id');
        // debug mode
        if (document.body.classList.contains('debug')) {
          window.location.hash = boxId;
        }
        // tooltip
        const tooltip = document.querySelector('.map-tooltip');
        if (element.getAttribute('data-content-type') === 'project') {
          tooltip.classList.remove('hidden');
          if (element.getAttribute('data-hover-image-url')) {
            tooltip.innerHTML = `<img src="${element.getAttribute('data-hover-image-url')}" alt="${element.getAttribute('data-title')}">`;
          } else {
            tooltip.innerHTML = `<span>${element.getAttribute('data-title')}</span>`;
          }
        }
      });
    });
  }

  addMouseLeaveListeners(elements) {
    elements.forEach(element => {
      element.addEventListener('mouseleave', (e) => {
        const tooltip = document.querySelector('.map-tooltip');
        tooltip.classList.add('hidden');
      });
    });
  }

  addMouseMoveListeners(elements) {
    const projectElements = Array.from(elements).filter(element => 
      element.getAttribute('data-content-type') === 'project'
    );

    projectElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const tooltip = document.querySelector('.map-tooltip');
        const tooltipWidth = 200; // Set tooltip width
        const tooltipHeight = tooltip.offsetHeight; // Get tooltip height
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        const map = document.querySelector('#map');
        const mapRect = map.getBoundingClientRect();
        const mapWidth = mapRect.width;
        const mapHeight = mapRect.height;

        // Determine the position of the tooltip based on mouse position
        let left, top;

        if (mouseX < mapWidth / 2) { // Left half of the map
          if (mouseY < mapHeight / 2) { // Top half
            left = mouseX + 10; // Tooltip to the right
            top = mouseY + 10; // Tooltip below
          } else { // Bottom half
            left = mouseX + 10; // Tooltip to the right
            top = mouseY - tooltipHeight - 10; // Tooltip above
          }
        } else { // Right half of the map
          if (mouseY < mapHeight / 2) { // Top half
            left = mouseX - tooltipWidth - 10; // Tooltip to the left
            top = mouseY + 10; // Tooltip below
          } else { // Bottom half
            left = mouseX - tooltipWidth - 10; // Tooltip to the left
            top = mouseY - tooltipHeight - 10; // Tooltip above
          }
        }

        // Set the tooltip position
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
      });
    });
  }

  loadFromPermalink() {
    const source = document.querySelector('.payload-content');
    if (!source || !source.dataset.contentType) return;
    const panel = document.querySelector(source.dataset.contentType === 'project' ? '.panel-project' : '.panel-page');
    this.showContent(panel, source.innerHTML, window.location.href, document.body.getAttribute('data-post-id'));
  }

}
