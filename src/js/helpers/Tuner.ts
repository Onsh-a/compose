import tunings from '../data/tunings';

export default class Tuner {
  getStringByFrequency(hz: number) {
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

  getTunerArrowAngle(target: number, frequency: number) {
    if (!target && !frequency) {
      return 0;
    }
    let position;
    if (frequency <= target) {
      position = ((target - frequency) / frequency) * 100 * -4;
      return position <= -90 ? -90: position;
    }
    position = ((frequency - target) / frequency) * 100 * 4;
    return position >= 90 ? 90: position;
  }

  getFrequencyByNote(note: string) {
    return tunings.standart[note] ? tunings.standart[note] : null;
  }
}
