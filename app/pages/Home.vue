<template>
  <main-layout>
    <ul>
      <li
        v-for="challenge in challenges"
        v-bind:key="challenge.id"
      >
        <v-link
          href="/play"
          :query="'game=' + challenge.name"
        >
          {{capitalized(challenge.name)}}
        </v-link>
      </li>
    </ul>
  </main-layout>
</template>

<script>
import VLink from '../components/VLink.vue';
import MainLayout from '../layouts/Main.vue';
import request from '../utils/request';
import { capitalize } from '../utils/utils';

export default {
  components: {
    MainLayout,
    VLink,
  },
  data: () => {
    return {
      challenges: [],
    };
  },
  async created() {
    console.log('created');
    const result = await request.get({ endpoint: 'http://localhost:5000/api/challenges' });
    console.log('result', result);
    this.challenges = result;
  },
  methods: {
    capitalized(text) {
      return capitalize(text);
    },
  },
};
</script>

<style scoped>
  ul {
    margin-top: 60px;
    list-style: none;
    padding: 0;
    font-size: 40px;
  }
</style>
