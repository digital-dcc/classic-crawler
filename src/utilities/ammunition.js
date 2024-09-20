export const ammunition = new Map([
  [
    '',
    {
      name: '',
      quantity: 0,
      cost: 0,
    },
  ],
  [
    'arrows',
    {
      name: 'Arrows',
      quantity: 20,
      cost: 5,
    },
  ],
  [
    'arrow-silver-tipped',
    {
      name: 'Arrow, silver-tipped',
      quantity: 1,
      cost: 5,
    },
  ],
  [
    'quarrels',
    {
      name: 'Quarrels',
      quantity: 30,
      cost: 10,
    },
  ],
  [
    'sling-stones',
    {
      name: 'Sling stones',
      quantity: 30,
      cost: 1,
    },
  ],
]);

const ammunitionList = ammunition;

export const ammunitionSlug = (armor = '') =>
  armor.replace(/[()]/g, '').replace(/[\s]/g, '-').replace(/[,]/g, '').toLowerCase();

export const ammunitionStatsFor = (ammunition = '') => {
  return (
    ammunitionList.get(ammunitionSlug(ammunition || '')) || {
      name: '',
			quantity: 0,
      cost: 0,
    }
  );
};
