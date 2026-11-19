import initHomeIntro from './home-intro'
import CaptionEditor from './caption-editor'
import $ from 'jquery'
import Map from '@/map'
import Explore from '@/explore'
import Search from '@/search'
import MobileProjects from '@/mobile-projects'
import MobileMenu from '@/mobile-menu'
import ImageEnlarge from '@/image-enlarge'
import Tracker from '@/tracker'
import SwitchLightMode from '@/switch-light-mode'
import { initImageCarousels } from '@/image-carousel'

(function ($) {
  
  initHomeIntro()
  new Map()
  new Explore()
  new Search()
  new MobileProjects()
  new ImageEnlarge()
  new CaptionEditor()
  new MobileMenu()
  new Tracker()
  new SwitchLightMode()
  initImageCarousels()
  // Click the exposed black margin to return to the content underneath.
  document.querySelectorAll('.panel').forEach(panel => {
    panel.addEventListener('click', event => {
      let isMargin = event.target === panel;
      if (event.target.parentElement === panel && event.target.classList.contains('container')) {
        const bounds = event.target.getBoundingClientRect();
        const styles = getComputedStyle(event.target);
        isMargin = event.clientX < bounds.left + parseFloat(styles.paddingLeft) || event.clientX > bounds.right - parseFloat(styles.paddingRight);
      }
      if (isMargin) panel.querySelector(':scope > .close')?.click();
    });
  });
  
  // Add event listener for the Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const panels = Array.from(document.querySelectorAll('.panel[data-depth]:not(.hidden)'));
      const topPanel = panels.sort((a, b) => Number(b.dataset.depth) - Number(a.dataset.depth))[0];
      topPanel?.querySelector('.close')?.click();
    }
  });

})($)
