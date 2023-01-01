"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tunings_1 = __importDefault(require("../data/tunings"));
class Tuner {
    constructor(tuning = 'standart') {
        this.activeTuning = tuning;
    }
    getStringByFrequency(hz) {
        let currentString = null;
        let index = 0;
        const currentTuning = tunings_1.default[this.activeTuning];
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
    setActiveTuning(tuning) {
        this.activeTuning = tuning;
    }
    getTunerArrowAngle(target, frequency) {
        if (!target && !frequency) {
            return 0;
        }
        let position;
        if (frequency <= target) {
            position = ((target - frequency) / frequency) * 100 * -4;
            return position <= -90 ? -90 : position;
        }
        position = ((frequency - target) / frequency) * 100 * 4;
        return position >= 90 ? 90 : position;
    }
    getFrequencyByNote(note) {
        const currentTuning = tunings_1.default[this.activeTuning];
        return currentTuning[note] ? currentTuning[note] : null;
    }
}
exports.default = Tuner;
