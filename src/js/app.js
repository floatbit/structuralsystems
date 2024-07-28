import $ from 'jquery'
import Map from '@/map'
import Explore from '@/Explore'
import Search from '@/Search'
import ImageEnlarge from '@/image-enlarge'

(function ($) {
  
  new Map()
  new Explore()
  new Search()
  new ImageEnlarge()

  // Add event listener for the Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const panelsDepth2 = document.querySelectorAll('.panel[data-depth="2"]:not(.hidden)');
      const panelsDepth1 = document.querySelectorAll('.panel[data-depth="1"]:not(.hidden)');

      if (panelsDepth2.length > 0) {
        panelsDepth2.forEach(panel => panel.classList.add('hidden'));
      } else if (panelsDepth1.length > 0) {
        panelsDepth1.forEach(panel => panel.classList.add('hidden'));
      }
    }
  });

})($)