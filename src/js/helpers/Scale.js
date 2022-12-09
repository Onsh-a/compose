export default class Scale {
  constructor(root, scaleType) {
    this.root = root;
    this.scaleType = scaleType;
    this.scalePattern = this.scalePatterns[scaleType];
  }

  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  scalePatterns = {
    major: [0, 2, 4, 5, 7, 9, 11],
    natural_minor: [0, 2, 3, 5, 7, 8, 10],
    harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
    melodic_minor: [0, 2, 3, 5, 7, 9, 11],
  };

  setRoot(root) {
    this.root = root;
  }

  setScaleType(scaleType) {
    this.scaleType = scaleType;
    this.scalePattern = this.scalePatterns[scaleType];
  }

  getScale() {
    const startPoint = this.notes.indexOf(this.root);
    const sortedArr = this.notes.slice(startPoint).concat(this.notes.slice(0, startPoint));
    return this.scalePattern.map(item => sortedArr[item]);
  }
}
