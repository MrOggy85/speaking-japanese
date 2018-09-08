import Vue from 'vue';
import routes from './routes';

import PageNotFound from './pages/404.vue';
import { getBaseUrl } from './utils/utils';

console.log('process.env', process.env)
console.log('getBaseUrl', getBaseUrl())

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname.replace(window.location.search, ''),
  },
  computed: {
    ViewComponent() {
      console.log('this.currentRoute', this.currentRoute);
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
