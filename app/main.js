import Vue from 'vue';
import routes from './routes';

import PageNotFound from './pages/404.vue';

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname.replace(window.location.search, ''),
  },
  computed: {
    ViewComponent() {
      console.log('this.currentRoute', this.currentRoute)
      const page = routes[this.currentRoute];
      return page || PageNotFound;
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname;
});
