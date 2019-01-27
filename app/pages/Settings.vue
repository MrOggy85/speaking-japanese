<template>
  <main-layout
    title="Settings"
  >
    <ul>
      <li>
        <h4>Speech Feedback</h4>
        <p class="content">After successful guess, play sound of correct pronounciation.</p>
        <input
          type="checkbox"
          id="checkbox"
          v-model="settings.speech"
          v-on:change="speechChanged"
        >
        <label
          for="checkbox"
          class="content"
        >
          Enabled
        </label>
      </li>
    </ul>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue';
import { getSettings, saveSettings } from '../utils/utils';

export default {
  components: {
    MainLayout,
  },
  data: () => {
    return {
      settings: {
        speech: true,
      },
    };
  },
  async created() {
    const settings = getSettings();
    if (settings.speech === undefined) {
      settings.speech = true;
    }
    this.settings = settings;
  },
  methods: {
    speechChanged() {
      console.log('speech changed', this.settings);
      saveSettings(this.settings);
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
    font-size: 20px;
  }
  .description {
    white-space: pre-line;
    margin-top: 0;
    margin-bottom: 20px;
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
