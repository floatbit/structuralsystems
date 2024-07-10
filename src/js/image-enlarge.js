export default class ImageEnlarge {

  constructor() {
    this.setupImages();
  }

  setupImages() {
    document.addEventListener('click', (event) => {
      const enlargeTarget = event.target.closest('[data-image-enlarge]');
      const closeButton = event.target.closest('.close');
      
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
          panelImageDiv.style.backgroundImage = `url(${imageSrc})`;
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

      panelImage.classList.remove('hidden');
    }
  }

  closeImage() {
    const panelImage = document.querySelector('.panel-image');
    if (panelImage) {
      const panelImageDiv = panelImage.querySelector('.image');
      const panelCaptionDiv = panelImage.querySelector('.caption');

      if (panelImageDiv) {
        panelImageDiv.style.backgroundImage = '';
      }

      if (panelCaptionDiv) {
        panelCaptionDiv.innerHTML = '';
        panelCaptionDiv.classList.add('hidden');
      }

      panelImage.classList.add('hidden');
    }
  }
}