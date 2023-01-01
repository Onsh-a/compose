import tunings from '../data/tunings';

export default class Tuner {
  constructor(tuning = 'standart') {
    this.activeTuning = tuning;
  }
  private activeTuning: string;
  getStringByFrequency(hz: number) {
    let currentString = null;
    let index = 0;
    const currentTuning = tunings[this.activeTuning];
    const tuningKeys = Object.keys(currentTuning);

    console.log(currentTuning);
    while (!currentString && index < 6) {
      const freq = currentTuning[tuningKeys[index]];
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

  setActiveTuning(tuning:string):void {
    this.activeTuning = tuning;
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
    const currentTuning = tunings[this.activeTuning];
    return currentTuning[note] ? currentTuning[note] : null;
  }
}
