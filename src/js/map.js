export default class Map {

  constructor() {
    this.setupBoxes();
  }

  setupBoxes() {
    const elements = document.querySelectorAll('g[data-post]');
    const panel = document.querySelector('.panel-project');
    const closeButton = panel.querySelector('.close');
    const projectPayload = panel.querySelector('.project-payload');

    elements.forEach(element => {
      element.addEventListener('click', async () => {
        const permalink = element.getAttribute('data-permalink');
        if (permalink) {
          panel.classList.remove('hidden');
          try {
            const response = await fetch(permalink);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainContent = doc.querySelector('main').innerHTML;
            projectPayload.innerHTML = mainContent;
          } catch (error) {
            console.error('Error fetching or parsing HTML:', error);
            panel.classList.add('hidden');
          }
        } else {
          console.error('No permalink found for this element');
          panel.classList.add('hidden');
        }
      });
    });

    closeButton.addEventListener('click', () => {
      panel.classList.add('hidden');
      projectPayload.innerHTML = '';
    });
  }

}