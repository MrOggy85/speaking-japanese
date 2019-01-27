<template>
  <div class="main-layout-container">
    <div class="nav-bar">
      <div class="nav-bar-item desktop">
        <div class="menu-choices">
          <v-link href="/">HOME</v-link>
          <v-link href="/settings">SETTINGS</v-link>
        </div>
        
        <h3>{{ getTitle }}</h3>
        <img class="logo" width="60" v-bind:src="logoUrl" />
      </div>
      <div class="nav-bar-item mobile">
        <v-link href="/" class="home">
          <img class="logo" width="60" v-bind:src="logoUrl" />
        </v-link>
        <v-link href="/settings" class="settings">
          <p>&#9881;</p>
        </v-link>
        <h3>{{ getTitle }}</h3>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import VLink from '../components/VLink.vue';

import { getBaseUrl, capitalize } from '../utils/utils';
const BASE_URL = getBaseUrl();

export default {
  components: {
    VLink,
  },
  props: {
    title: {
      type: String,
    },
  },
  computed: {
    logoUrl() {
      return `${BASE_URL}/logo.png`;
    },
    getTitle() {
      return this.title ? capitalize(this.title) : 'Challenges';
    },
    hasTitle() {
      return this.title;
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

  .menu-choices {
    display: flex;
    flex-direction: column;
  }
  .menu-choices a {
    margin-bottom: 5px;
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
  .nav-bar-item.mobile .home {
    position: absolute;
    left: 20px;
  }
  .nav-bar-item.mobile .settings {
    position: absolute;
    right: 0;
    width: 70px;
    height: 80px;
    font-size: 37px;
    text-align: center;
    line-height: 0;
  }

  @media (min-width: 420px) {
    .nav-bar-item.mobile {
      display: none;
    }
    .nav-bar-item.desktop {
      display: inherit;
    }
    .nav-bar-item.desktop h3 {
      width: 100%;
      text-align: right;
      padding-right: 1%;
    }
  }
</style>
