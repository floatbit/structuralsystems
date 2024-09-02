export default class MobileMenu {

  constructor() {
    this.setupMobileMenu();
  }

  setupMobileMenu() {
    const panelMobileMenu = document.querySelector('.panel-mobile-menu');
    const closeButton = panelMobileMenu.querySelector('button.close');
    const openMobileMenuElements = document.querySelectorAll('[data-open-mobile-menu]');
    const menuLinks = panelMobileMenu.querySelectorAll('.links div');

    closeButton.addEventListener('click', () => {
      panelMobileMenu.classList.add('hidden');
    });

    openMobileMenuElements.forEach(element => {
      element.addEventListener('click', () => {
        panelMobileMenu.classList.remove('hidden');
      });
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        panelMobileMenu.classList.add('hidden');
      });
    });
  }
}