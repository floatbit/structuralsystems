import $ from 'jquery'
import Map from '@/map'
import Explore from '@/explore'
import Search from '@/search'
import MobileMenu from '@/mobile-menu'
import ImageEnlarge from '@/image-enlarge'
import Tracker from '@/tracker'
import SwitchLightMode from '@/switch-light-mode'
import { initImageCarousels } from '@/image-carousel'

(function ($) {
  
  new Map()
  new Explore()
  new Search()
  new ImageEnlarge()
  new MobileMenu()
  new Tracker()
  new SwitchLightMode()
  initImageCarousels()
  
  // Add event listener for the Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const panels = Array.from(document.querySelectorAll('.panel[data-depth]:not(.hidden)'));
      const topPanel = panels.sort((a, b) => Number(b.dataset.depth) - Number(a.dataset.depth))[0];
      topPanel?.querySelector('.close')?.click();
    }
  });

})($)
