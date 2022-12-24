import Chord from '../src/js/helpers/Chord';

describe('Chord class test', () => {
  const chord = new Chord();

  test('Calculating chord', () => {
    expect(chord.calcChord('C').join('')).toBe('CEG');
    expect(chord.calcChord('F#dim').join('')).toBe('F#AC');
    expect(chord.calcChord('Cm').join('')).toBe('CD#G');
    expect(chord.calcChord('D#').join('')).toBe('D#GA#');
    expect(chord.calcChord('G#aug').join('')).toBe('G#CE');
  });
});
