"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Scale {
    constructor(root, scaleType, isSharp = true) {
        this._notes = {
            sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
            flat: ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']
        };
        this._scalePatterns = {
            major: [0, 2, 4, 5, 7, 9, 11],
            natural_minor: [0, 2, 3, 5, 7, 8, 10],
            harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
            melodic_minor: [0, 2, 3, 5, 7, 9, 11],
            pentatonic_major: [0, 2, 4, 7, 9],
            pentatonic_minor: [0, 3, 5, 7, 10],
        };
        this.root = root;
        this.scaleType = scaleType;
        this.isSharp = isSharp;
        this._scalePattern = this._scalePatterns[scaleType];
    }
    setRoot(root) {
        this.root = root;
    }
    setScaleType(scaleType) {
        this.scaleType = scaleType;
        this._scalePattern = this._scalePatterns[scaleType];
    }
    setIsSharp(isSharp) {
        if (this.root.length > 1) {
            const index = this.getNotes().findIndex(note => this.root === note);
            this.isSharp = isSharp;
            this.setRoot(this.getNotes()[index]);
            return;
        }
        this.isSharp = isSharp;
    }
    getNotes() {
        return this.isSharp ? this._notes.sharp : this._notes.flat;
    }
    getScale() {
        const notes = this.getNotes();
        const startPoint = notes.indexOf(this.root);
        const sortedArr = notes.slice(startPoint).concat(notes.slice(0, startPoint));
        return this._scalePattern.map(item => sortedArr[item]);
    }
}
exports.default = Scale;
