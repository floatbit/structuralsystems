import Swiper from 'swiper';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/a11y';

export function initImageCarousels(root = document) {
  root.querySelectorAll('.block-image-carousel').forEach(block => {
    // The hidden page payload is a source template, copied into the visible panel.
    if (block.closest('.payload-content')) return;
    const track = block.querySelector('.image-carousel-track');
    if (!track || track.swiper) return;

    new Swiper(track, {
      modules: [Navigation, A11y],
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      spaceBetween: 16,
      watchOverflow: true,
      navigation: {
        prevEl: block.querySelector('.image-carousel-prev'),
        nextEl: block.querySelector('.image-carousel-next'),
      },
      a11y: {
        prevSlideMessage: 'Previous image',
        nextSlideMessage: 'Next image',
      },
    });
  });
}

export function destroyImageCarousels(root) {
  root.querySelectorAll('.image-carousel-track').forEach(track => {
    if (track.swiper) track.swiper.destroy(true, true);
  });
}
