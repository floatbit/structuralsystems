export default class Map {

  constructor() {
    this.setupBoxes();
    this.loadFromPermalink();
  }

  setupBoxes() {
    this.addClickListeners(document.querySelectorAll('[data-permalink]'));

    const panel = document.querySelector('.panel');
    const closeButton = panel.querySelector('.close');
    const payload = panel.querySelector('.payload');

    closeButton.addEventListener('click', () => {
      panel.classList.add('hidden');
      payload.innerHTML = '';
      history.pushState({}, '', '/'); // Reset URL to root
    });
  }

  addClickListeners(elements) {
    const panel = document.querySelector('.panel');
    const payload = panel.querySelector('.payload');

    elements.forEach(element => {
      element.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default action for <a> tags
        const permalink = element.getAttribute('data-permalink');
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