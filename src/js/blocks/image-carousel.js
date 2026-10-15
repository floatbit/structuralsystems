import { initImageCarousels } from '../image-carousel';

if (window.acf) {
  window.acf.addAction('render_block_preview/type=image-carousel', ($block) => {
    initImageCarousels($block[0]);
  });
}
