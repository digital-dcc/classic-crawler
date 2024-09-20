export const equipment = new Map([
  [
    '',
    {
      name: '',
      cost: 0,
    },
  ],
  ['backpack', {name: 'Backpack', cost: 2}],
  ['candle', {name: 'Candle', cost: 0.01}],
  ['chain-10ft', {name: 'Chain, 10ft.', cost: 30}],
  ['chalk-1-piece', {name: 'Chalk, 1 piece', cost: 0.01}],
  ['chest-empty', {name: 'Chest, empty', cost: 2}],
  ['crowbar', {name: 'Crowbar', cost: 2}],
  ['flask-empty', {name: 'Flask, empty', cost: 0.03}],
  ['flint-and-steel', {name: 'Flint & steel', cost: 0.15}],
  ['grappling-hook', {name: 'Grappling hook', cost: 1}],
  ['hammer-small', {name: 'Hammer, small', cost: 0.5}],
  ['holy-symbol', {name: 'Holy symbol', cost: 25}],
  ['holy-water-1-vial', {name: 'Holy water, 1 vial', cost: 25}],
  ['iron-spikes-each', {name: 'Iron spikes, each', cost: 0.1}],
  ['lantern', {name: 'Lantern', cost: 10}],
  ['mirror-hand-sized', {name: 'Mirror, hand-sized', cost: 10}],
  ['oil-1-flask', {name: 'Oil, 1 flask', cost: 0.2}],
  ['pole-10-foot', {name: 'Pole, 10-foot', cost: 0.15}],
  ['rations-per-day', {name: 'Rations, per day', cost: 0.05}],
  ['rope-50', {name: 'Rope, 50’', cost: 0.25}],
  ['sack-large', {name: 'Sack, large', cost: 0.12}],
  ['sack-small', {name: 'Sack, small', cost: 0.08}],
  ['thieves-tools', {name: 'Thieves’ tools', cost: 25}],
  ['torch-each', {name: 'Torch, each', cost: 0.01}],
  ['waterskin', {name: 'Waterskin', cost: 0.5}],
]);

const equipmentList = equipment;

export const equipmentSlug = (armor = '') =>
  armor
    .replace(/[()]/g, '')
    .replace(/[,]/g, '')
    .replace(/[’']/g, '')
    .replace(/[&]/g, 'and')
    .replace(/[.]/g, '')
    .replace(/[\s]/g, '-')
    .toLowerCase();

export const equipmentStatsFor = (equipment = '') => {
  return (
    equipmentList.get(equipmentSlug(equipment || '')) || {
      name: '',
      cost: 0,
    }
  );
};
