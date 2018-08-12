<template>
  <div
    :style="{
      display: 'flex',
      background: 'white',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '80%',
      padding: '50px',
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

    <textarea
      type="text"
      readonly
      rows="3"
      :style="{
        fontSize: '20px',
        color: isSpeaking ? 'gray' : 'black',
        borderWidth: '2px',
        padding: '10px',
      }"
      v-model='userInput'
    >
    </textarea>
    <p>
        {{ isHintShowing ? hint : '&nbsp;' }}
    </p>
    <button
      @click='showHint'
      v-if='showHintButton'
    >
      Show Hint (H)
    </button>
    <h3
      :style="{
        textAlign: 'center',
      }"
    >{{ actionText }}</h3>
    <h4
      :style="{
        textAlign: 'center',
      }"
    >
      {{ recordingText }}
    </h4>
    <h3
      :style="{
        color: feebackColor,
        textAlign: 'center',
      }"
    >
      {{ isCorrect }}
    </h3>
  </div>
</template>

<style scoped>

</style>

<script>
  export default {
    props: {
      question: {
        type:String,
        required: true
      },
      answer: {
        type:String,
        required: true
      },
      userInput: {
        type:String,
        required: true
      },
      recordingText: {
        type:String,
        required: true
      },
      actionText: {
        type:String,
        required: true
      },
      hint: {
        type:String,
        required: true
      },
      showHintButton: {
        type:Boolean,
        required: true
      },
      isSpeaking: {
        type:Boolean,
        required: true
      },
      isCorrect: {
        type:Boolean,
      }
    },
    data: function() {
      return {
        isHintShowing: false,
        // failedAttempts: 0,
      };
    },
    computed: {
      feebackColor: function() {
        return this.isCorrect
          ? '#2fc661'
          : '#c62f2f';
      },
    },
    methods: {
      onKeyPress: function(e) {
        const keys = {
          H: 104,
        };

        var key = e.which || e.keyCode;
        if (key === keys.H) {
          this.showHint();
        }
      },
      showHint: function() {
        this.isHintShowing = true;
      },
    },
    created: function() {
      document.addEventListener('keypress', this.onKeyPress);
    },
    destroyed: function() {
      document.removeEventListener('keypress', this.onKeyPress);
    },
  }
</script>

<style scoped>
  .active {
    color: cornflowerblue;
  }
</style>
