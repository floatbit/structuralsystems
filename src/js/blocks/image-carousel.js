import { initImageCarousels } from '../image-carousel';

if (window.acf) {
  ['image-carousel', 'project-details'].forEach(type => {
    window.acf.addAction(`render_block_preview/type=${type}`, ($block) => {
      initImageCarousels($block[0]);
    });
  });
}
