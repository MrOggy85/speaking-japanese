const synth = window.speechSynthesis || window.webkitSpeechSynthesis;

class SpeechSynthesisAdapter {
    speak(text) {
        const voices = synth.getVoices();
        const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');

        const utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = japaneseVoice;
        synth.speak(utterThis);
    }
}

export default SpeechSynthesisAdapter;
