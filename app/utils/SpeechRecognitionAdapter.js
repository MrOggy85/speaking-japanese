const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

class SpeechRecognitionAdapter {
  constructor({
    onKeyPressCallback,
    onSpeechStartCallback,
    onSpeechEndCallback,
    onResultCallback,
    onErrorCallback,
  }) {
    this.onKeyPressCallback = onKeyPressCallback;
    this.onSpeechStartCallback = onSpeechStartCallback;
    this.onSpeechEndCallback = onSpeechEndCallback;
    this.onResultCallback = onResultCallback;
    this.onErrorCallback = onErrorCallback;

    this.recognition = new SpeechRecognition();

    this.recognition.lang = 'ja_JP';
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    this.recognition.onspeechstart = this.onSpeechStart;
    this.recognition.onspeechend = this.onSpeechEnd;
    this.recognition.onresult = this.onResult;
    this.recognition.onerror = this.onError;
  }

  startRecognition = () => {
    this.recognition.start();
  }

  onSpeechStart = () => {
    console.log('speechstart');
    this.isSpeaking = true;
    if (this.onSpeechStartCallback) {
      this.onSpeechStartCallback();
    }
  }

  onSpeechEnd = () => {
    console.log('speechend');
    this.recognition.stop();
    this.isSpeaking = false;
    if (this.onSpeechEndCallback) {
      this.onSpeechEndCallback();
    }
  }

  onResult = (e) => {
    const last = e.results.length - 1;
    const text = e.results[last][0].transcript;

    const isFinal = e.results[last].isFinal;
    const confidence = e.results[0][0].confidence;
    console.log('Recognized:', text, isFinal);
    console.log('Confidence:', confidence.toFixed(3));

    if (this.onResultCallback) {
      this.onResultCallback(text.replace(/ /gi, ''), isFinal, this.isSpeaking, confidence);
    }
  }

  onError = (e) => {
    console.log('SpeechRecognition error:', e.error);

    if (this.onErrorCallback) {
      let errorMessage = e.error;
      if (e.error === 'network') {
        errorMessage = 'Network conntection problem. Please check your connection and try again.';
      }
      this.onErrorCallback(errorMessage);
    }
  }
}

export default SpeechRecognitionAdapter;
