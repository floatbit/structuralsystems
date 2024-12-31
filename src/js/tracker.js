import Cookies from 'js-cookie'

export default class Tracker {

  constructor() {
    this.projects = document.querySelectorAll('g[data-content-type="project"]');
    this.initCookies();
    this.observePostIdChange();
    this.updateMap();
    this.setupFavoriteClick();
  }

  initCookies() {
    if (!Cookies.get('viewed-posts')) {
      var viewedPosts = [];
      Cookies.set('viewed-posts', JSON.stringify(viewedPosts), { expires: 365000 });
    }
    if (!Cookies.get('favorited-posts')) {
      var favoritedPosts = [];
      Cookies.set('favorited-posts', JSON.stringify(favoritedPosts), { expires: 365000 });
    }
  }

  observePostIdChange() {
    console.log('observePostIdChange');
    const targetNode = document.body;

    const config = { attributes: true, childList: false, subtree: false };

    const callback = (mutationsList) => {
      console.log('observePostIdChange callback');
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-post-id') {
          const postId = targetNode.getAttribute('data-post-id');
          // add viewed post to cookies
          if (!Cookies.get('viewed-posts').includes(postId)) {
            var viewedPosts = JSON.parse(Cookies.get('viewed-posts'));
            viewedPosts.push(postId);
            Cookies.set('viewed-posts', JSON.stringify(viewedPosts), { expires: 365000 });
            this.updateMap()
          }
          // mark favorited
          var favoritedPosts = JSON.parse(Cookies.get('favorited-posts'));
          if (favoritedPosts.includes(postId)) {
            var favorite = document.querySelector('.add-favorite');
            favorite.classList.add('is-favorited');
            console.log(favorite);
          }
          // refresh map
          this.updateMap();
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }

  setupFavoriteClick() {
    document.addEventListener('click', (event) => {
      var favoritedPosts = JSON.parse(Cookies.get('favorited-posts'));
      const favorite = event.target.closest('.add-favorite');
      const postId = document.body.getAttribute('data-post-id');
      if (favorite) {
        const favoriteStatus = favorite.classList.contains('is-favorited');
        favorite.classList.toggle('is-favorited', !favoriteStatus);
        if (favorite.classList.contains('is-favorited')) {
            if (!favoritedPosts.includes(postId)) {
                favoritedPosts.push(postId);
                Cookies.set('favorited-posts', JSON.stringify(favoritedPosts), { expires: 365000 });
                console.log('add to favorites', postId);
            }
        } else {
          if (favoritedPosts.includes(postId)) {
            favoritedPosts = favoritedPosts.filter(id => id !== postId);
            Cookies.set('favorited-posts', JSON.stringify(favoritedPosts), { expires: 365000 });
            console.log('remove from favorites', postId);
          }
        }
        this.updateMap();
      }
    });
  }

  updateMap() {
    const viewedPosts = JSON.parse(Cookies.get('viewed-posts'));
    const favoritedPosts = JSON.parse(Cookies.get('favorited-posts'));
    this.projects.forEach(project => {
      project.classList.remove('viewed', 'favorited');
      const postId = project.getAttribute('data-post-id');
      if (viewedPosts.includes(postId)) {
        project.classList.add('viewed');
      }
      if (favoritedPosts.includes(postId)) {
        project.classList.add('favorited');
      }
    });
  }
}