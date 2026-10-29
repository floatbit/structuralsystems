import { openModal, closeModal } from './modal';
export default class ImageEnlarge {

  constructor() {
    this.setupImages();
  }

  setupImages() {
    document.addEventListener('click', (event) => {
      const enlargeTarget = event.target.closest('[data-image-enlarge]');
      const closeButton = event.target.closest('.panel-image .close');
      
      if (enlargeTarget) {
        this.enlargeImage(enlargeTarget);
      }

      if (closeButton) {
        this.closeImage();
      }
    });
  }

  enlargeImage(target) {
    const panelImage = document.querySelector('.panel-image');
    if (panelImage) {
      const imgElement = target.querySelector('img');
      const captionElement = target.querySelector('.caption');

      if (imgElement) {
        const imageSrc = imgElement.src;
        const panelImageDiv = panelImage.querySelector('.image');
        
        if (panelImageDiv) {
          panelImageDiv.classList.add('image-shrunken');
          panelImageDiv.style.backgroundImage = `url(${imageSrc})`;
          setTimeout(() => {
            panelImageDiv.classList.remove('image-shrunken');
          }, 100);
        }
      }

      if (captionElement) {
        const captionHtml = captionElement.innerHTML;
        const panelCaptionDiv = panelImage.querySelector('.caption');

        if (panelCaptionDiv) {
          panelCaptionDiv.innerHTML = captionHtml;
          panelCaptionDiv.classList.remove('hidden');
        }
      } else {
        const panelCaptionDiv = panelImage.querySelector('.caption');
        if (panelCaptionDiv) {
          panelCaptionDiv.innerHTML = '';
          panelCaptionDiv.classList.add('hidden');
        }
      }

      openModal(panelImage);
    }
  }

  closeImage() {
    const panelImage = document.querySelector('.panel-image');
    if (panelImage) {
      closeModal(panelImage).then(closed => {
        if (!closed) return;
        panelImage.querySelector('.image').style.backgroundImage = '';
        const caption = panelImage.querySelector('.caption');
        caption.innerHTML = '';
        caption.classList.add('hidden');
      });
    }
  }
}