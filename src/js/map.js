import { initImageCarousels, destroyImageCarousels } from './image-carousel';

export default class Map {

  constructor() {
    this.setupBoxes();
    this.loadFromPermalink();
  }

  setupBoxes() {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (link && !link.hasAttribute('download')) {
        try {
          const linkUrl = new URL(link.getAttribute('href'), window.location.href);
          if (['http:', 'https:'].includes(linkUrl.protocol) && linkUrl.origin !== window.location.origin) {
            link.setAttribute('target', '_blank');
            link.relList.add('noopener', 'noreferrer');
            return;
          }
        } catch (_) {
          // Leave invalid URLs to the browser.
        }
      }
      if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const element = event.target.closest('[data-permalink]');
      if (!element || element.closest('.payload-content')) return;
      // A nested link owns its navigation rather than the surrounding clickable card.
      if (link && link !== element) return;
      if (element.hasAttribute('download')) return;
      const target = element.getAttribute('target');
      if (target && target.toLowerCase() !== '_self') return;
      const permalink = link ? link.getAttribute('href') : element.getAttribute('data-permalink');
      if (!permalink) return;
      let url;
      try {
        url = new URL(permalink, window.location.href);
      } catch (_) {
        return;
      }
      if (!['http:', 'https:'].includes(url.protocol) || url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return;
      event.preventDefault();
      this.openContent(url.href, element.getAttribute('data-content-type'));
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
