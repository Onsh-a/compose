const scales: scale[] = [
  {
    value: 'major',
    name: 'Major',
  },
  {
    value: 'natural_minor',
    name: 'Natural Minor',
  },
  {
    value: 'harmonic_minor',
    name: 'Harmonic minor',
  },
  {
    value: 'melodic_minor',
    name: 'Melodic minor',
  },
  {
    value: 'pentatonic_major',
    name: 'Pentatonic Major',
  },
  {
    value: 'pentatonic_minor',
    name: 'Pentatonic Minor',
  },
];

type scale = {
  value: string,
  name: string,
}
export default scales;
