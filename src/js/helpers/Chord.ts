export default class Chord {
  patterns: { [index:string]: number[] } = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    diminished: [0, 3, 6],
    augmented: [0, 4, 8],
    major_seventh: [0, 4, 7, 11],
    minor_seventh: [0, 3, 7, 10],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7],
  };
  isSharp = true;
  diatonicPatterns: { [index: string]: string[] } = {
    major: ['', 'm', 'm', '', '', 'm', 'dim'],
    natural_minor: ['m', 'dim', '', 'm', 'm', '', ''],
    harmonic_minor: ['m', 'dim', 'aug', 'm', '', '', 'dim'],
    melodic_minor: ['m', 'm', 'aug', '', '', 'dim', 'dim'],
  }
  _notes = {
    sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    flat: ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'],
  }
  getNotes():string[] {
    return this._notes[this.isSharp ? 'sharp' : 'flat'];
  }

  getPatterns():string[] {
    return Object.keys(this.patterns);
  }
  setIsSharp(isSharp: boolean):void {
    this.isSharp = isSharp;
  }

  calcChord(root:string, chordType:string) {
    const startPoint = this.getNotes().indexOf(root);
    const sortedArr = this.getNotes().slice(startPoint).concat(this.getNotes().slice(0, startPoint));
    return this.patterns[chordType].map((item) => sortedArr[item]);
  };

  calcDiatonic(scale:string, scaleName:string) {
    const diatonicPattern = this.diatonicPatterns[scaleName];
    if (diatonicPattern) {
      return diatonicPattern.map((item, index) => `${scale[index]}${item}`);
    }
    return [];
  }
}
