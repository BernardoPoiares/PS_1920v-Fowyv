import Sound from 'react-native-sound';

export const AudioPlayer = {
  createSound: async function(audioPath, returnSound) {
    if (audioPath === null) {
      return;
    }
    setTimeout(() => {
      var sound = new Sound(audioPath, '', error => {
        if (error) {
          console.log('failed to load the sound', error);
        }

        returnSound(sound);
      });
    });
  },

  playAudio: async function(sound, func) {
    sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      func();
    });
  },

  pauseAudio: async function(audio) {
    if (audio !== null) {
      audio.pause();
    }
  },
};
