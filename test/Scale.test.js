import Scale from '../src/js/helpers/Scale';

describe('Scale', () => {
  test('Scales calculate', () => {
    expect(new Scale('C', 'major').getScale().join('')).toBe('CDEFGAB');
    expect(new Scale('C', 'natural_minor').getScale().join('')).toBe('CDD#FGG#A#');
    expect(new Scale('E♭', 'natural_minor', false).getScale().join('')).toBe('E♭FG♭A♭B♭BD♭');
    expect(new Scale('C#', 'pentatonic_major').getScale().join('')).toBe('C#D#FG#A#');
    expect(new Scale('F', 'pentatonic_major').getScale().join('')).toBe('FGACD');
    expect(new Scale('B', 'pentatonic_minor').getScale().join('')).toBe('BDEF#A');
    expect(new Scale('E', 'pentatonic_minor').getScale().join('')).toBe('EGABD');
    expect(new Scale('E♭', 'pentatonic_minor', false).getScale().join('')).toBe('E♭G♭A♭B♭D♭');
  });
});
