"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Chord {
    constructor() {
        this.patterns = {
            major: [0, 4, 7],
            minor: [0, 3, 7],
            diminished: [0, 3, 6],
            augmented: [0, 4, 8],
            major_seventh: [0, 4, 7, 11],
            minor_seventh: [0, 3, 7, 10],
            sus2: [0, 2, 7],
            sus4: [0, 5, 7],
        };
        this.isSharp = true;
        this.diatonicPatterns = {
            major: ['', 'm', 'm', '', '', 'm', 'dim'],
            natural_minor: ['m', 'dim', '', 'm', 'm', '', ''],
            harmonic_minor: ['m', 'dim', 'aug', 'm', '', '', 'dim'],
            melodic_minor: ['m', 'm', 'aug', '', '', 'dim', 'dim'],
        };
        this._notes = {
            sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
            flat: ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'],
        };
    }
    getNotes() {
        return this._notes[this.isSharp ? 'sharp' : 'flat'];
    }
    getPatterns() {
        return Object.keys(this.patterns);
    }
    setIsSharp(isSharp) {
        this.isSharp = isSharp;
    }
    calcChord(root, chordType) {
        const startPoint = this.getNotes().indexOf(root);
        const sortedArr = this.getNotes().slice(startPoint).concat(this.getNotes().slice(0, startPoint));
        return this.patterns[chordType].map((item) => sortedArr[item]);
    }
    ;
    calcDiatonic(scale, scaleName) {
        const diatonicPattern = this.diatonicPatterns[scaleName];
        if (diatonicPattern) {
            return diatonicPattern.map((item, index) => `${scale[index]}${item}`);
        }
        return [];
    }
}
exports.default = Chord;
