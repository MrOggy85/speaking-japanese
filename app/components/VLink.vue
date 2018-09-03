<template>
  <a
    v-bind:href="fullHref"
    v-bind:class="{ active: isActive }"
    v-on:click="go"
  >
    <slot></slot>
  </a>
</template>

<script>
  import { baseUrl } from '../../vue.config';
  import routes from '../routes'
  export default {
    props: {
      href: {
        type:String,
        required: true,
      },
      query: {
        type:String,
        required: false,
      },
    },
    computed: {
      isActive () {
        return this.href === this.$root.currentRoute
      },
      fullHref() {
        return `${baseUrl}${this.href}${this.fullQuery}`;
      },
      fullQuery() {
        return this.query ? '?' + this.query : '';
      }
    },
    methods: {
      go (event) {
        event.preventDefault()
        this.$root.currentRoute = `${baseUrl}${this.href}`;
        window.history.pushState(
          null,
          routes[`${baseUrl}${this.href}`],
          `${baseUrl}${this.href}${this.fullQuery}`,
        );
      },
    },
  }
</script>

<style scoped>
  .active {
    color: cornflowerblue;
  }
</style>
