<template>
  <main-layout>
    <div class="wrapper">
      <img src="404.png" width="643" height="314" alt="404" />
      <div class="overview">
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue';
export default {
  components: {
    MainLayout,
  },
};
</script>

<style scoped>
  .wrapper {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    height: 75%;
  }
  .overview {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .giphy-embed {
    flex: 1;
  }
</style>
