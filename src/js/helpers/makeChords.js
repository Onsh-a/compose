const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const patterns = {
  maj: [0, 4, 7],
  m: [0, 3, 7],
  dim: [0, 3, 6]
}
const calcChord = (chord) => {
  const chordType = getChordType(chord);
  const startPoint = notes.indexOf(getNote(chord));
  const sortedArr = notes.slice(startPoint).concat(notes.slice(0, startPoint));
  return patterns[chordType].map(item => sortedArr[item]);
};

const getChordType = (chord) => {
  let chordType = chord.split('');
  chordType = chordType.filter(item => /[a-zA-Z]+/.test(item)); // trim '#'
  chordType.shift();
  return chordType.join('') || 'maj'
}

const getNote = (chord) => {
  return chord.split('').includes('#') ? `${chord[0]}#` : `${chord[0]}`;
}

export default calcChord;
