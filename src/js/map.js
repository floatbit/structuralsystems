export default class Map {

  constructor() {
    this.setupBoxes();
    this.loadFromPermalink();
  }

  setupBoxes() {
    this.addClickListeners(document.querySelectorAll('[data-permalink]'));

    const mapElements = document.querySelectorAll('#map [data-box-id]');
    this.addMouseEnterListeners(mapElements);
    this.addMouseLeaveListeners(mapElements);
    this.addMouseMoveListeners(mapElements);

    const panel = document.querySelector('.panel-page');
    const closeButton = panel.querySelector('.close');
    const payload = panel.querySelector('.payload');
    const mapTooltip = document.querySelector('.map-tooltip');

    closeButton.addEventListener('click', () => {
      panel.classList.add('hidden');
      payload.innerHTML = '';
      history.pushState({}, '', '/'); // Reset URL to root
    });
  }

  addClickListeners(elements) {
    const panel = document.querySelector('.panel-page');
    const payload = panel.querySelector('.payload');

    elements.forEach(element => {
      element.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default action for <a> tags
        const permalink = element.getAttribute('data-permalink');
        console.log(permalink)
        if (permalink) {
          panel.classList.remove('hidden');
          panel.scrollTo(0, 0); // Scroll to the top of the panel
          payload.innerHTML = ''; // Empty payload content
          history.pushState({}, '', permalink); // Change the URL in the browser bar
          try {
            const response = await fetch(permalink);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainContent = doc.querySelector('.payload-content').innerHTML;
            payload.innerHTML = mainContent;
            // Add click listeners to any new [data-permalink] elements in the loaded content
            this.addClickListeners(payload.querySelectorAll('[data-permalink]'));
            // add data-post-id - for tracker.js
            const postId = doc.body.getAttribute('data-post-id');
            if (postId) {
              document.body.setAttribute('data-post-id', postId);
            }
          } catch (error) {
            console.error('Error fetching or parsing HTML:', error);
            panel.classList.add('hidden');
            history.pushState({}, '', '/'); // Reset URL to root
          }
        } else {
          console.error('No permalink found for this element');
          panel.classList.add('hidden');
        }
      });
    });
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
          tooltip.innerHTML = `<img src="${element.getAttribute('data-image-url')}" alt="${element.getAttribute('data-title')}">`;
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
    const elements = document.querySelectorAll('[data-permalink]');
    const currentUrl = window.location.pathname;

    elements.forEach(element => {
      const permalink = new URL(element.getAttribute('data-permalink'), window.location.origin).pathname;
      if (permalink === currentUrl) {
        const event = new Event('click');
        element.dispatchEvent(event);
      }
    });
  }

}