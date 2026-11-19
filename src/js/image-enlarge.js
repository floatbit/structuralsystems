import { openModal, closeModal } from './modal';
export default class ImageEnlarge {

  constructor() {
    this.setupImages();
  }

  setupImages() {
    document.addEventListener('click', (event) => {
      const enlargeTarget = event.target.closest('[data-image-enlarge]');
      const closeButton = event.target.closest('.panel-image .close');
      if (event.target.closest('[data-image-next]')) this.navigate(1);
      if (event.target.closest('[data-image-previous]')) this.navigate(-1);
      if (event.target.matches('.panel-image .image')) {
        const image = event.target;
        const bounds = image.getBoundingClientRect();
        const width = Number(image.dataset.imageWidth);
        const height = Number(image.dataset.imageHeight);
        if (width && height) {
          const scale = Math.min(bounds.width / width, bounds.height / height);
          const marginX = (bounds.width - width * scale) / 2;
          const marginY = (bounds.height - height * scale) / 2;
          if (event.clientX < bounds.left + marginX || event.clientX > bounds.right - marginX || event.clientY < bounds.top + marginY || event.clientY > bounds.bottom - marginY) this.closeImage();
        }
      }
      
      if (enlargeTarget) {
        this.enlargeImage(enlargeTarget);
      }

      if (closeButton) {
        this.closeImage();
      }
    });
    document.addEventListener('keydown', event => {
      if (document.querySelector('.panel-image').classList.contains('hidden') || event.target.closest('input, textarea, select, [contenteditable="true"], dialog')) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        this.navigate(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
  }

  navigate(direction) {
    if (!this.gallery?.length) return;
    this.imageIndex = (this.imageIndex + direction + this.gallery.length) % this.gallery.length;
    this.enlargeImage(this.gallery[this.imageIndex], true);
  }

  enlargeImage(target, navigating = false) {
    const panelImage = document.querySelector('.panel-image');
    if (panelImage) {
      if (!navigating) {
        const project = target.closest('.panel-project .payload');
        const scope = project?.querySelector('.project-details-carousel') || target.closest('.payload') || target.parentElement;
        const seen = new Set();
        const targets = [target, ...scope.querySelectorAll('[data-image-enlarge]')];
        this.gallery = targets.filter(item => {
          const src = item.querySelector('img')?.src;
          if (!src || seen.has(src)) return false;
          seen.add(src);
          return true;
        });
        // Preserve carousel order even when opening an image in the middle.
        const ordered = Array.from(scope.querySelectorAll('[data-image-enlarge]'));
        this.gallery.sort((a, b) => ordered.indexOf(a) - ordered.indexOf(b));
        this.imageIndex = this.gallery.indexOf(target);
      }
      panelImage.querySelector('.image-navigation').hidden = this.gallery.length < 2;
      const imgElement = target.querySelector('img');
      const captionElement = target.querySelector('.caption');

      if (imgElement) {
        const imageSrc = imgElement.src;
        const panelImageDiv = panelImage.querySelector('.image');
        
        if (panelImageDiv) {
          panelImageDiv.classList.add('image-shrunken');
          panelImageDiv.style.backgroundImage = `url(${imageSrc})`;
          panelImageDiv.dataset.imageWidth = imgElement.naturalWidth || imgElement.width;
          panelImageDiv.dataset.imageHeight = imgElement.naturalHeight || imgElement.height;
          setTimeout(() => {
            panelImageDiv.classList.remove('image-shrunken');
          }, 100);
        }
      }

      if (captionElement) {
        const captionHtml = captionElement.innerHTML;
        const panelCaptionDiv = panelImage.querySelector('.caption');

        if (panelCaptionDiv) {
          if (captionElement.dataset.captionImageId) {
            panelCaptionDiv.dataset.captionImageId = captionElement.dataset.captionImageId;
          } else {
            delete panelCaptionDiv.dataset.captionImageId;
          }
          panelCaptionDiv.innerHTML = captionHtml;
          panelCaptionDiv.classList.remove('hidden');
        }
      } else {
        const panelCaptionDiv = panelImage.querySelector('.caption');
        if (panelCaptionDiv) {
          delete panelCaptionDiv.dataset.captionImageId;
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
        this.gallery = [];
        panelImage.querySelector('.image').style.backgroundImage = '';
        const caption = panelImage.querySelector('.caption');
        caption.innerHTML = '';
        caption.classList.add('hidden');
      });
    }
  }
}
