// @flow

type SpeechRecognitionAlternative = {
  transcript: string;
  confidence: number
}
type SpeechRecognitionResult = SpeechRecognitionAlternative[] & {
  isFinal: boolean;
}

type SpeechRecognitionEvent = {
  results: Array<SpeechRecognitionResult>;
}

export const ErrorCode = Object.freeze({
  NETWORK: 'network',
  CANCELED: 'canceled',
  INTERRUPTED: 'interrupted',
  AUDIO_BUSY: 'audio-busy',
  AUDIO_HARDWARE: 'audio-hardware',
  SYNTHESIS_UNAVAILABLE: 'synthesis-unavailable',
  NO_SPEECH: 'no-speech',
});

type SpeechSynthesisErrorEvent = {
  error: $Values<typeof ErrorCode>;
}

declare class SpeechRecognitionClass {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;

  onspeechstart: () => void;
  onspeechend: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechSynthesisErrorEvent) => void;

  start: () => void;
  stop: () => void;
}

declare class Window {
  SpeechRecognition: () => SpeechRecognitionClass;
  webkitSpeechRecognition: () => SpeechRecognitionClass;
}

declare var window: Window;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

class SpeechRecognitionAdapter {
  recognition: SpeechRecognitionClass;
  isSpeaking: boolean;

  onKeyPressCallback: ?() => void;
  onSpeechStartCallback: ?() => void;
  onSpeechEndCallback: ?() => void;
  onResultCallback: (transcriptedText: string, isFinal: boolean, isSpeaking: boolean, confidence: number) => void;
  onErrorCallback: (errorMessage: string, errorCode: $Values<typeof ErrorCode>) => void;

  constructor() {
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
    this.isSpeaking = true;
    if (this.onSpeechStartCallback) {
      this.onSpeechStartCallback();
    }
  }

  onSpeechEnd = () => {
    this.recognition.stop();
    this.isSpeaking = false;
    if (this.onSpeechEndCallback) {
      this.onSpeechEndCallback();
    }
  }

  onResult = (e: SpeechRecognitionEvent) => {
    const last = e.results.length - 1;
    const text = e.results[last][0].transcript;

    const isFinal = e.results[last].isFinal;
    const confidence = e.results[0][0].confidence;

    if (this.onResultCallback) {
      this.onResultCallback(text.replace(/ /gi, ''), isFinal, this.isSpeaking, confidence);
    }
  }

  onError = (e: SpeechSynthesisErrorEvent) => {
    if (!this.onErrorCallback) {
      return;
    }
    let errorMessage = '';

    switch (e.error) {
      case ErrorCode.CANCELED:
        errorMessage = 'Network conntection problem. Please check your connection and try again.';
        break;
      default:
        errorMessage = `Unknown Error: ${e.error}`;
    }

    this.onErrorCallback(errorMessage, e.error);
  }
}

export default SpeechRecognitionAdapter;
