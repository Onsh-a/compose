import Scale from '../src/js/helpers/Scale';

describe('Scale', () => {
  const scale = new Scale('C', 'major');
  test('Scales calculate', () => {
    expect(scale.getScale().join('')).toBe('CDEFGAB');

    scale.setRoot('G');
    expect(scale.getScale().join('')).toBe('GABCDEF#');

    scale.setScaleType('natural_minor');
    expect(scale.getScale().join('')).toBe('GAA#CDD#F');
  });
});
