export default class Map {

  constructor() {
    this.setupBoxes();
  }

  setupBoxes() {
    const elements = document.querySelectorAll('g[data-post]');
    elements.forEach(element => {
      element.addEventListener('click', async () => {
        const permalink = element.getAttribute('data-permalink');
        if (permalink) {
          try {
            const response = await fetch(permalink);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainContent = doc.querySelector('main').innerHTML;
            document.querySelector('.project-payload').innerHTML = mainContent;
          } catch (error) {
            console.error('Error fetching or parsing HTML:', error);
          }
        } else {
          console.error('No permalink found for this element');
        }
      });
    });
  }
}