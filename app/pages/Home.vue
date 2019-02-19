<template>
  <main-layout>
    <ul>
      <li
        v-for="challenge in challenges"
        :key="challenge._id"
      >
        <a
          href="# "
          :class="{
            active: isActive(challenge._id),
            header: true,
          }"
          @click="toggleItem(challenge._id)"
        >
          {{ capitalized(challenge.name) }}
        </a>
        <div
          v-if="activeItem === challenge._id"
          class="content"
        >
          <p class="description">
            {{ challenge.description }}
          </p>
          <div class="buttons">
            <v-link
              href="/study"
              :query="'game=' + challenge.name"
            >
              STUDY
            </v-link>
            <v-link
              href="/play"
              :query="'game=' + challenge.name"
            >
              PLAY
            </v-link>
          </div>
        </div>
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
      activeItem: '',
    };
  },
  async created() {
    const {
      VUE_APP_API_ENDPOINT,
    } = process.env;
    const result = await request.get({ endpoint: `${VUE_APP_API_ENDPOINT}/challenges` });

    this.challenges = result;
  },
  methods: {
    capitalized(text) {
      return capitalize(text);
    },
    toggleItem(id) {
      if (this.activeItem === id) {
        this.activeItem = '';
        return;
      }
      this.activeItem = id;
    },
    isActive(id) {
      return this.activeItem === id;
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
    text-align: center;
    width: 85%;
  }
  li {
    margin-bottom: 10px;
  }

  .header {
    color: #3B3B3B;
    cursor: pointer;
    text-decoration: none;
  }
  .header:hover {
    text-decoration: underline;
  }
  .header.active {
    font-weight: bold;
  }

  .content {
    font-size: 21px;
  }
  .description {
    white-space: pre-line;
    margin-top: 0;
    margin-bottom: 21px;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 35px;
  }

  @media (min-width: 420px) {
    ul {
      width: 40%;
    }
  }
</style>
