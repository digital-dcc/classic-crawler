import {armor} from './armor.js';

export const mountsAndGear = new Map([
  [
    '',
    {
      name: '',
      cost: 0,
    },
  ],
  ['bridle-and-bit', {name: 'Bridle and bit', cost: 2}],
  ['donkey', {name: 'Donkey', cost: 8}],
  ['mule', {name: 'Mule', cost: 8}],
  ['feed-per-day', {name: 'Feed (per day)', cost: 0.05}],
  ['horse-regular', {name: 'Horse, regular', cost: 75}],
  ['horse-warhorse', {name: 'Horse, warhorse', cost: 200}],
  ['pony', {name: 'Pony', cost: 30}],
  ['saddle-pack', {name: 'Saddle, pack', cost: 15}],
  ['saddle-riding', {name: 'Saddle, riding', cost: 30}],
  ['saddlebags', {name: 'Saddlebags', cost: 2}],
  ['stabling-per-day', {name: 'Stabling (per day)', cost: 0.5}],
]);

const bardings = Array.from(armor.entries())
  .filter(([key]) => {
    return key !== '' && key !== 'shield' && key !== 'unarmored';
  })
  .map(([key = '', value]) => [
    `barding-${key}`,
    {
      name: `Barding, ${value?.name || ''}`,
      cost: (value?.cost || 0) * 4,
    },
  ]);

for (const [key, value] of bardings) {
  // @ts-ignore TS is totally on crack here
  mountsAndGear.set(key, value);
}

const mountsAndGearList = mountsAndGear;

export const mountsAndGearSlug = (armor = '') =>
  armor
    .replace(/[()]/g, '')
    .replace(/[,]/g, '')
    .replace(/[’']/g, '')
    .replace(/[&]/g, 'and')
    .replace(/[\s]/g, '-')
    .toLowerCase();

export const mountsAndGearStatsFor = (mountsAndGear = '') => {
  return (
    mountsAndGearList.get(mountsAndGearSlug(mountsAndGear || '')) || {
      name: '',
      cost: 0,
    }
  );
};
