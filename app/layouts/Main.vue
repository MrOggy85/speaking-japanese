<template>
  <div class="main-layout-container">
    <div class="nav-bar">
      <div class="nav-bar-item">
        <v-link href="/">Home</v-link>
      </div>
      <div class="nav-bar-item">
        <v-link href="/about">About</v-link>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'
  export default {
    components: {
      VLink
    }
  }
</script>

<style scoped>
  .main-layout-container {
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
  }

  .nav-bar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }
</style>
