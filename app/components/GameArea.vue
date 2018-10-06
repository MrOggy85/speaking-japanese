<template>
  <div
    :style="{
      display: 'flex',
      /* background: 'white', */
      flexDirection: 'column',
      justifyContent: 'center',
      width: '80%',
      padding: '0 50px',
    }"
  >
    <div
      :style="{
        display: 'flex',
        minHeight: '150px',
        marginBottom: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }"
    >
      <div
        :style="{
          fontSize: '38px',
        }"
      >
        {{ question }}
      </div>
    </div>

    <div
      :style="{
        display: 'flex',
        minHeight: '150px',
        marginBottom: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }"
    >
      <div
        :style="{
          color: isSpeaking ? 'gray' : 'black',
        }"
        :class='{
          userInput: true,
          speaking: isSpeaking,
          correct: isCorrect,
          wrong: isCorrect === false,
        }'
      >
        {{ userInput }}
      </div>
    </div>

    <div
      :style="{
        display: 'flex',
        marginBottom: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
      }"
    >
      <speakingSvg
        :style="{
            width: '80px',
        }"
      />
      <p>
          {{ isHintVisible ? hint : '&nbsp;' }}
      </p>
      <button
        @click='onHintButtonClick'
        :class='{
          hintButton: true,
          visible: isHintButtonVisible,

        }'

      >
        ?
      </button>
    </div>

    <button
      @click='onActionButtonClick'
      class="action-button"
      :style="{
        opacity: actionText ? 1 : 0,
      }"
    >
      {{ actionText }}
    </button>
    <h4
      :style="{
        textAlign: 'center',
      }"
    >
      {{ recordingText ? recordingText : '&nbsp;' }}
    </h4>

    <!-- <h3
      :style="{
        color: feebackColor,
        textAlign: 'center',
      }"
    >
      {{ isCorrect }}
    </h3> -->
  </div>
</template>

<style scoped>

</style>

<script>
import speakingSvg from '../../public/speaking.svg';

export default {
  name: 'GameArea',
  components: {
    speakingSvg,
  },
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    userInput: {
      type: String,
      required: true,
    },
    recordingText: {
      type: String,
      required: true,
    },
    actionText: {
      type: String,
      required: true,
    },
    hint: {
      type: String,
      required: true,
    },
    isHintButtonVisible: {
      type: Boolean,
      required: true,
    },
    isHintVisible: {
      type: Boolean,
      required: true,
    },
    isSpeaking: {
      type: Boolean,
      required: true,
    },
    isCorrect: {
      type: Boolean,
    },
    onActionButtonClick: {
      type: Function,
      required: true,
    },
    onHintButtonClick: {
      type: Function,
      required: true,
    },
  },

  computed: {
    feebackColor: function() {
      return this.isCorrect
        ? '#2fc661'
        : '#c62f2f';
    },
  },

  data() {
    return {
      speakingAnimation: null,
    };
  },

  created() {
    document.addEventListener('keypress', this.onKeyPress);

    window.spirit.loadAnimation({
      loop: true,
      yoyo: true,
      delay: 0,
      autoPlay: false,
      path: 'speaking.json',
    }).then(timeline => {
      this.speakingAnimation = timeline;
    });

    this.$watch('isSpeaking', (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }
      if (newValue) {
        this.speakingAnimation.play();
      } else {
        this.speakingAnimation.stop();
        this.speakingAnimation.progress(0);
      }
    });
  },
  destroyed() {
    document.removeEventListener('keypress', this.onKeyPress);
  },
};
</script>

<style scoped>
  .active {
    color: cornflowerblue;
  }

  .action-button {
    color: white;
    border: transparent;
    background-color: rgb(0, 120, 231);
    text-decoration: none;
    border-radius: 2px;

    text-align: center;
    height: 50px;
    font-size: 17px;
    cursor: pointer;
  }
  .action-button:hover {
    background-color: rgba(0, 120, 231, 0.9);
  }
  .action-button:active {
    box-shadow: 0 0 0 1px rgba(0,0,0,.15) inset, 0 0 6px rgba(0,0,0,.2) inset;
  }
  .action-button:focus {
    outline: 0;
  }

  .hintButton {
    background: none;

    padding: 10px 20px;

    border-width: 4px;
    border-style: solid;
    border-radius: 8px;
    border-color: rgba(0,0,0,.15);
    color: rgba(0,0,0,.15);

    font-size: 28px;
    font-weight: bold;
  }
  .hintButton.visible {
    border-color: black;
    color: black;
  }
  .hintButton:active {
    background-color: gray;
  }
  .hintButton:focus {
    outline: none;
  }

  .userInput {
    position: relative;
    font-size: 38px;
  }
  .userInput.correct {
    animation: bounce 0.4s ease-out;
  }
  .userInput.wrong {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }
  .userInput.correct::after {
    content: "\2713";
    top: 110%;
    left: 50%;
    position: absolute;
    margin-left: -15px;
    color: rgb(47, 198, 97);
  }
  .userInput.wrong::after {
    content: "\2717";
    top: 110%;
    left: 50%;
    position: absolute;
    margin-left: -15px;
    color: #c62f2f;
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    90% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes shake {
  10%, 90% {
    transform: translate3d(-2px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(4px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-8px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(8px, 0, 0);
  }
}

</style>
