export const armor = new Map([
  [
    '',
    {
      name: '',
      checkPenalty: 0,
      bonus: 0,
      speedModifier: 0,
      fumbleDie: 'd4',
      cost: 0,
      shield: false,
    },
  ],
  [
    'unarmored',
    {
      name: 'Unarmored',
      checkPenalty: 0,
      bonus: 0,
      speedModifier: 0,
      fumbleDie: 'd4',
      cost: 0,
      shield: false,
    },
  ],
  [
    'padded',
    {
      name: 'Padded',
      checkPenalty: 0,
      bonus: +1,
      speedModifier: 0,
      fumbleDie: 'd8',
      cost: 5,
      shield: false,
    },
  ],
  [
    'leather',
    {
      name: 'Leather',
      checkPenalty: -1,
      bonus: +2,
      speedModifier: 0,
      fumbleDie: 'd8',
      cost: 20,
      shield: false,
    },
  ],
  [
    'studded-leather',
    {
      name: 'Studded Leather',
      checkPenalty: -2,
      bonus: +3,
      speedModifier: 0,
      fumbleDie: 'd8',
      cost: 45,
      shield: false,
    },
  ],
  [
    'hide',
    {
      name: 'Hide',
      checkPenalty: -3,
      bonus: +3,
      speedModifier: 0,
      fumbleDie: 'd12',
      cost: 30,
      shield: false,
    },
  ],
  [
    'scale-mail',
    {
      name: 'Scale-mail',
      checkPenalty: -4,
      bonus: +4,
      speedModifier: -5,
      fumbleDie: 'd12',
      cost: 80,
      shield: false,
    },
  ],
  [
    'chainmail',
    {
      name: 'Chainmail',
      checkPenalty: -5,
      bonus: +5,
      speedModifier: -5,
      fumbleDie: 'd12',
      cost: 150,
      shield: false,
    },
  ],
  [
    'banded-mail',
    {
      name: 'Banded-mail',
      checkPenalty: -6,
      bonus: +6,
      speedModifier: -5,
      fumbleDie: 'd16',
      cost: 250,
      shield: false,
    },
  ],
  [
    'half-plate',
    {
      name: 'Half-plate',
      checkPenalty: -7,
      bonus: +7,
      speedModifier: -10,
      fumbleDie: 'd16',
      cost: 550,
      shield: false,
    },
  ],
  [
    'full-plate',
    {
      name: 'Full-plate',
      checkPenalty: -8,
      bonus: +8,
      speedModifier: -10,
      fumbleDie: 'd16',
      cost: 1200,
      shield: false,
    },
  ],
  [
    'shield',
    {
      name: 'Shield',
      checkPenalty: -1,
      bonus: +1,
      speedModifier: 0,
      fumbleDie: 'd8',
      cost: 10,
      shield: true,
    },
  ],
]);

const armorList = armor;

export const armorSlug = (armor = '') =>
  armor.replace(/[()]/g, '').replace(/[\s]/g, '-').toLowerCase();

export const checkPenaltyFor = (armor = 'unarmored', shield = false) => {
  let penalty = armorList.get(armorSlug(armor || ''))?.checkPenalty || 0;
  if (shield) penalty = penalty - 1;
  return penalty;
};

export const armorStatsFor = (armor = 'unarmored') => {
  return (
    armorList.get(armorSlug(armor || '')) || {
      checkPenalty: 0,
      bonus: 0,
      speedModifier: 0,
      fumbleDie: 'd4',
      cost: 0,
      shield: false,
    }
  );
};
