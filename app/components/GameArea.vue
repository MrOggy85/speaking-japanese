<template>
  <div
    :style="{
      display: 'flex',
      background: 'white',
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
      :style="{
        opacity: showHintButton ? 1 : 0,
        marginBottom: '10px',
      }"
    >
      Show Hint (H)
    </button>
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
      },
      onActionButtonClick: {
        type:Function,
        required: true
      },
    },
    data: function() {
      return {
        isHintShowing: false,
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
</style>
