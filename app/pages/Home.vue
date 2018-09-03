<template>
  <main-layout>
    <h1>Japanese Speaking Practice</h1>

    <ul>
      <li v-for="challenge in challenges">
        <v-link
          href="/play"
          :query="'game=' + challenge.name"
        >
          Play
        </v-link>
      </li>
    </ul>
  </main-layout>
</template>

<script>
  import VLink from '../components/VLink.vue'
  import MainLayout from '../layouts/Main.vue'
  export default {
    components: {
      MainLayout,
      VLink,
    }
  }
</script>
