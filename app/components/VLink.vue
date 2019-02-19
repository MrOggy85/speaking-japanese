<template>
  <a
    :href="fullHref"
    @click="go"
  >
    <slot />
  </a>
</template>

<script>
import routes from '../routes';

import { getBaseUrl } from '../utils/utils';
const BASE_URL = getBaseUrl();

export default {
  props: {
    href: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    fullHref() {
      return `${BASE_URL}${this.href}${this.fullQuery}`;
    },
    fullQuery() {
      return this.query ? `?${this.query}` : '';
    },
  },
  methods: {
    go(event) {
      event.preventDefault();
      this.$root.currentRoute = `${BASE_URL}${this.href}`;
      window.history.pushState(
        null,
        routes[`${BASE_URL}${this.href}`],
        `${BASE_URL}${this.href}${this.fullQuery}`,
      );
    },
  },
};
</script>

<style scoped>
  a {
    color: #5B5B5B;
    text-decoration: none;
    outline: none;
  }
  a:hover {
    text-decoration: underline;
  }
  a:active {
    color: #7F7F7F;
  }
</style>
