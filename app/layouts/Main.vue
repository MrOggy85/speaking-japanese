<template>
  <div class="main-layout-container">
    <div class="nav-bar">
      <div class="nav-bar-item desktop">
        <v-link href="/">MENU</v-link>
        <h3>Challenges</h3>
        <img class="logo" width="60" v-bind:src="logoUrl" />
      </div>
      <div class="nav-bar-item mobile">
        <v-link href="/">
          <img class="logo" width="60" v-bind:src="logoUrl" />
        </v-link>
        <h3>Challenges</h3>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import VLink from '../components/VLink.vue';

import { getBaseUrl } from '../utils/utils';
const BASE_URL = getBaseUrl();

export default {
  components: {
    VLink,
  },
  computed: {
    logoUrl() {
      return `${BASE_URL}/logo.png`;
    },
  },
};
</script>

<style scoped>
  .main-layout-container {
    height: 100%;
    margin: 0 auto;
    padding: 0;
    background: #f9f7f5;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 50px;
    margin-top: 15px;
  }

  .nav-bar-item {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .logo {
    opacity: 0.7;
  }
  h3 {
    color: #5B5B5B;
  }

  .nav-bar-item.desktop {
    display: none;
  }

  .nav-bar-item.mobile {
    justify-content: center;
  }
  .nav-bar-item.mobile h3 {
    max-width: 60%;
  }
  .nav-bar-item.mobile a {
    position: absolute;
    left: 20px;
  }

  @media (min-width: 420px) {
    .nav-bar-item.mobile {
      display: none;
    }
    .nav-bar-item.desktop {
      display: inherit;
    }
  }

</style>
