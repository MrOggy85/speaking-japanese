<template>
  <main-layout>
    <div class="wrapper">
      <iframe src="https://giphy.com/embed/VwoJkTfZAUBSU" width="332" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
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
    flex-direction: column;
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
