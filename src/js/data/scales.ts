export const scales: scaleType[] = [
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

export type scaleType = {
  value: string,
  name: string,
}
