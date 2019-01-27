class SpeechSynthesisAdapter {
  constructor() {
    this.synth = window.speechSynthesis || window.webkitSpeechSynthesis;
  }

  speak(text) {
    const voices = this.synth.getVoices();
    const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');

    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = japaneseVoice;
    this.synth.speak(utterThis);
  }
}

export default SpeechSynthesisAdapter;
