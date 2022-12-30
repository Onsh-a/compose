import tunings from '../data/tunings.js';

export default class Tuner {
  getStringByFrequency(hz) {
    let currentString = null;
    let index = 0;
    const tuningKeys = Object.keys(tunings.standart);
    while (!currentString && index < 6) {
      const freq = tunings.standart[tuningKeys[index]];
      const freqBacklash = freq * 0.2;
      const stringMinValue = freq - freqBacklash;
      const stringMaxValue = freq + freqBacklash;
      if (hz >= stringMinValue && hz < stringMaxValue) {
        currentString = tuningKeys[index];
      }
      index++;
    }
    return currentString ? currentString : 'not detected';
  }

  getFrequencyByNote(note) {
    return tunings.standart[note] ? tunings.standart[note] : null;
  }
}
