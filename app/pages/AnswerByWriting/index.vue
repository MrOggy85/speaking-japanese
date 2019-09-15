<template src="./index.html">
</template>

<style scoped src="./style.css">
</style>

<script>
import MainLayout from '../../layouts/Main.vue';

export default {
  name: 'HelloWorld',
  components: {
    MainLayout,
  },
  data() {
    return {
      answer: '',
      hasAnswered: false,
      result: '',
      userInput: '',
      isActive: false,
      maxNumber: 1000,

      correct: 0,
      wrong: 0,
    };
  },
  computed: {
    resultPercent() {
      const total = this.correct + this.wrong;
      if (total === 0) {
        return '- %';
      }

      const score = Math.floor(this.correct / total * 100);
      return `${score} %`;
    },
  },
  methods: {
    submit() {
      if (!this.isActive) {
        this.next();
        return;
      }
      this.isActive = false;
      this.hasAnswered = true;

      const guess = this.userInput.trim();

      if (guess === this.answer) {
        this.result = true;
        this.correct++;
      } else {
        this.result = false;
        this.wrong++;
      }

      this.userInput = '';
    },
    next() {
      this.userInput = '';
      this.isActive = true;
      this.hasAnswered = false;

      const number = Math.floor(Math.random() * this.maxNumber);
      this.answer = number.toString();

      window.responsiveVoice.speak(this.answer, 'Japanese Female');
    },
    repeat() {
      window.responsiveVoice.speak(this.answer, 'Japanese Female');
    },
  },
};
</script>
