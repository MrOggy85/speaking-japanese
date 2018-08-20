
<template>
  <main-layout>
    <h2>You are playing: {{ gameType }}</h2>
    <game-area
      :question="question"
      :answer='answers[0]'
      :hint='hint'

      :userInput='userInput'
      :actionText='actionText'
      :recordingText='recordingText'

      :isSpeaking='isSpeaking'
      :isCorrect='isCorrect'
      :showHintButton='showHintButton'
      :onActionButtonClick='onActionButtonClick'
    />
  </main-layout>
</template>

<style scoped>

</style>

<script>
  import MainLayout from '../layouts/Main.vue';
  import GameArea from '../components/GameArea.vue';

  import GameEngine from '../utils/gameEngine';
  import SpeechRecognitionAdapter from '../utils/SpeechRecognitionAdapter';

  const feeback = {
    CORRECT: 'すごい！',
    INCORRECT: '間違えていました',
  }

  function performAction() {
    if (this.isCorrect !== true &&
        this.question) {
      this.userInput = '';
      this.actionText = '';
      this.isCorrect = null;
      this.recordingText = 'listening...';
      this.speechRecognition.startRecognition();
    } else {
      this.nextQuestion();
    }
  }

  const app = {
    components: {
      MainLayout,
      GameArea,
    },
    props: {
      gameType: {
        type:String,
        // required: true,
        default: 'ADJECTIVES',
      },
      fastMode: {
        type:Boolean,
        // required: true,
        default: false,
      },
    },
    data: function() {
      return {
        // Challenge
        gameEngine: null,
        question: '',
        answers: [''],
        hint: '',
        showHintButton: false,
        isCorrect: null,

        actionText: 'Start',
        failedAttempts: 0,

        // SpeechInput
        speechRecognition: null,
        userInput: '',
        feedbackText: '',
        recordingText: '',
        isSpeaking: false,
      };
    },
    computed: {
      feebackColor: function() {
        return this.feedback === feeback.CORRECT
          ? '#2fc661'
          : '#c62f2f';
      },
    },
    methods: {
      nextQuestion: function() {
        console.log('nextQuestion');
        // Setup Challenge object
        const challenge = this.gameEngine.getNextQuestion(this.gameType);

        this.question = challenge.question;
        this.answers = challenge.answers;
        this.hint = challenge.hint;

        // Reset values
        this.isCorrect = null;
        this.showHintButton = false;
        this.failedAttempts = 0;
        this.userInput = '';
        this.actionText = 'SPEAK';
      },

      checkAnswer: function() {
        console.log('checkAnswer...');

        this.isCorrect = this.answers.includes(this.userInput);

        if (this.isCorrect) {
          if (this.fastMode) {
            let timeLeft = 3;
            const self = this;
            const intervalId = setInterval(function() {
              timeLeft -= 0.1;
              self.actionText = `Next Question in ${timeLeft.toFixed(2)} seconds`;
            }, 100)
            setTimeout(function() {
              clearInterval(intervalId);
              self.nextQuestion();
            }, 3000)
          } else {
            this.actionText = 'NEXT QUESTION';
          }
        } else {
          this.actionText = 'TRY AGAIN';
          this.failedAttempts++;
          if (this.failedAttempts > 1) {
            this.showHintButton = true;
          }
        }
      },

      onActionButtonClick: function() {
        performAction.call(this);
      },

      onKeyPress: function(e) {
        const keys = {
          ENTER: 13,
        };

        var key = e.which || e.keyCode;
        if (key === keys.ENTER) {
          performAction.call(this);
        }
      },
    },
    created: function() {
      document.addEventListener('keypress', this.onKeyPress);

      this.gameEngine = GameEngine;

      this.speechRecognition = new SpeechRecognitionAdapter({
        onSpeechStartCallback: () => {
          this.recordingText = 'detecting...';
          this.isSpeaking = true;
        },
        onSpeechEndCallback: () => {
          this.isSpeaking = false;
          if (!this.userInput) {
            this.actionText = 'SPEAK';
            this.recordingText = 'You didn\'t say anything!';
          } else {
            this.recordingText = '';
          }
        },
        onResultCallback: (text, isFinal, isSpeaking) => {
          this.userInput = text;
          if (isFinal) {
            this.checkAnswer();
          } else if(!isSpeaking) {
            this.checkAnswer();
          }

        },
        onErrorCallback: (errorText) => {
          if (errorText === 'no-speech') {
            this.actionText = 'SPEAK';
            this.recordingText = 'No speech input detected';
          } else {
            this.recordingText = errorText;
          }
        },
      });
    },
    destroyed: function() {
      document.removeEventListener('keypress', this.onKeyPress);
    },
  }

  export default app;
</script>
