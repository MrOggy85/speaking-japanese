
<template>
  <main-layout
    :title="gameType"
  >
    <game-area
      :question="question"
      :answer="answers[0]"
      :hint="hint"
      :is-hint-visible="isHintVisible"
      :is-hint-button-visible="isHintButtonVisible"
      :user-input="userInput"
      :action-text="actionText"
      :recording-text="recordingText"
      :is-speaking="isSpeaking"
      :is-correct="isCorrect"
      :on-action-button-click="onActionButtonClick"
      :on-hint-button-click="toggleHint"
    />
  </main-layout>
</template>

<style scoped>

</style>

<script>
// @flow

import MainLayout from '../layouts/Main.vue';
import GameArea from '../components/GameArea.vue';

import GameEngine from '../utils/gameEngine';
import SpeechRecognitionAdapter, { ErrorCode } from '../utils/SpeechRecognitionAdapter';
import SpeechSynthesisAdapter from '../utils/SpeechSynthesisAdapter';

import { getSettings } from '../utils/utils';

const feeback = {
  CORRECT: 'すごい！',
  INCORRECT: '間違えていました',
};

function performAction() {
  if (this.isCorrect !== true
      && this.question)
  {
    this.userInput = '';
    this.actionText = '';
    this.isCorrect = null;
    this.recordingText = 'listening...';
    this.speechRecognition.startRecognition();
  } else {
    this.nextQuestion();
  }
}

type App = {
  speechRecognition: SpeechRecognitionAdapter | null;
}

const app: App = {
  speechRecognition: null,

  components: {
    MainLayout,
    GameArea,
  },
  props: {
    fastMode: {
      type: Boolean,
      // required: true,
      default: false,
    },
  },
  data() {
    return {
      // Challenge
      gameType: null,
      gameEngine: null,
      question: '',
      answers: [''],
      hint: '',
      isHintButtonVisible: false,
      isHintVisible: false,
      isCorrect: null,

      actionText: 'Start',
      failedAttempts: 0,

      // SpeechInput
      speechRecognition: null,
      speechSynthesis: null,
      userInput: '',
      feedbackText: '',
      recordingText: '',
      isSpeaking: false,
    };
  },
  computed: {
    feebackColor() {
      return this.feedback === feeback.CORRECT
        ? '#2fc661'
        : '#c62f2f';
    },
  },
  methods: {
    async nextQuestion() {
      // Setup Challenge object
      const challenge = await this.gameEngine.getNextQuestion(this.gameType);

      this.question = challenge.question;
      this.answers = challenge.answers;
      this.hint = challenge.hint;

      // Reset values
      this.isCorrect = null;
      this.isHintButtonVisible = false;
      this.isHintVisible = false;
      this.failedAttempts = 0;
      this.userInput = '';
      this.actionText = 'SPEAK';
    },

    checkAnswer() {
      this.isCorrect = this.answers.includes(this.userInput);

      if (this.isCorrect) {
        if (this.fastMode) {
          let timeLeft = 3;
          const self = this;
          const intervalId = setInterval(() => {
            timeLeft -= 0.1;
            self.actionText = `Next Question in ${timeLeft.toFixed(2)} seconds`;
          }, 100);
          setTimeout(() => {
            clearInterval(intervalId);
            self.nextQuestion();
          }, 3000);
        } else {
          if (getSettings().speech !== false) {
            this.speechSynthesis.speak(this.userInput);
          }

          this.actionText = 'NEXT QUESTION';
        }
      } else {
        this.actionText = 'TRY AGAIN';
        this.failedAttempts += 1;
        if (this.failedAttempts > 1) {
          this.isHintButtonVisible = true;
        }
      }
    },

    onActionButtonClick() {
      performAction.call(this);
    },

    toggleHint() {
      this.isHintVisible = !this.isHintVisible;
    },

    onKeyPress(e: KeyboardEvent) {
      const keys = {
        ENTER: 13,
        H: 104,
      };

      const key = e.which || e.keyCode;
      if (key === keys.ENTER) {
        performAction.call(this);
      } else if (key === keys.H) {
        this.toggleHint();
      }
    },
  },
  created() {
    const game = new URLSearchParams(window.location.search).get('game');
    this.gameType = game;

    document.addEventListener('keypress', this.onKeyPress);

    this.gameEngine = GameEngine;

    this.speechRecognition = new SpeechRecognitionAdapter();
    this.speechRecognition.onSpeechStartCallback = () => {
      this.recordingText = 'detecting...';
      this.isSpeaking = true;
    };
    this.speechRecognition.onSpeechEndCallback = () => {
      this.isSpeaking = false;
      if (!this.userInput) {
        this.actionText = 'SPEAK';
        this.recordingText = 'You didn\'t say anything!';
      } else {
        this.recordingText = '';
      }
    };
    this.speechRecognition.onResultCallback = (text, isFinal, isSpeaking) => {
      this.userInput = text;
      if (isFinal) {
        this.checkAnswer();
      } else if (!isSpeaking) {
        this.checkAnswer();
      }
    };

    this.speechRecognition.onErrorCallback = (errorText, errorCode) => {
      if (errorCode === ErrorCode.NO_SPEECH) {
        this.actionText = 'SPEAK';
        this.recordingText = 'No speech input detected';
      } else {
        this.recordingText = errorText;
      }
    };

    this.speechSynthesis = new SpeechSynthesisAdapter();
  },
  destroyed() {
    document.removeEventListener('keypress', this.onKeyPress);
  },
};

export default app;
</script>
