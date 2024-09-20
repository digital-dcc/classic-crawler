export const displayName = 'Warrior';

export const warrior = new Map([
  [
    1,
    {
      level: 1,
      attack: '+d3',
      critDie: '1d12',
      critTable: 'III',
      threatRange: '19-20',
      actionDice: '1d20',
      ref: 1,
      fort: 1,
      will: 0,
    },
  ],
  [
    2,
    {
      level: 2,
      attack: '+d4',
      critDie: '1d14',
      critTable: 'III',
      threatRange: '19-20',
      actionDice: '1d20',
      ref: 1,
      fort: 1,
      will: 0,
    },
  ],
  [
    3,
    {
      level: 3,
      attack: '+d5',
      critDie: '1d16',
      critTable: 'IV',
      threatRange: '19-20',
      actionDice: '1d20',
      ref: 1,
      fort: 2,
      will: 1,
    },
  ],
  [
    4,
    {
      level: 4,
      attack: '+d6',
      critDie: '1d20',
      critTable: 'IV',
      threatRange: '19-20',
      actionDice: '1d20',
      ref: 2,
      fort: 2,
      will: 1,
    },
  ],
  [
    5,
    {
      level: 5,
      attack: '+d7',
      critDie: '1d24',
      critTable: 'V',
      threatRange: '18-20',
      actionDice: '1d20+1d14',
      ref: 2,
      fort: 3,
      will: 1,
    },
  ],
  [
    6,
    {
      level: 6,
      attack: '+d8',
      critDie: '1d30',
      critTable: 'V',
      threatRange: '18-20',
      actionDice: '1d20+1d16',
      ref: 2,
      fort: 4,
      will: 2,
    },
  ],
  [
    7,
    {
      level: 7,
      attack: '+d10+1',
      critDie: '1d30',
      critTable: 'V',
      threatRange: '18-20',
      actionDice: '1d20+1d20',
      ref: 3,
      fort: 4,
      will: 2,
    },
  ],
  [
    8,
    {
      level: 8,
      attack: '+d10+2',
      critDie: '2d20',
      critTable: 'V',
      threatRange: '18-20',
      actionDice: '1d20+1d20',
      ref: 3,
      fort: 5,
      will: 2,
    },
  ],
  [
    9,
    {
      level: 9,
      attack: '+d10+3',
      critDie: '2d20',
      critTable: 'V',
      threatRange: '17-20',
      actionDice: '1d20+1d20',
      ref: 3,
      fort: 5,
      will: 3,
    },
  ],
  [
    10,
    {
      level: 10,
      attack: '+d10+4',
      critDie: '2d20',
      critTable: 'V',
      threatRange: '17-20',
      actionDice: '1d20+1d20+1d14',
      ref: 4,
      fort: 6,
      will: 3,
    },
  ],
]);

export const features = [
  {name: 'Hit points', description: '1d12{{stamina}} hit points at each level'},
  {
    name: 'Weapon training',
    description:
      'battleaxe, club, crossbow, dagger, dart, flail, handaxe, javelin, lance, longbow, longsword, mace, polearm, shortbow, short sword, sling, spear, staff, two-handed sword, and warhammer. Any armor.',
  },
  {
    name: 'Attack modifier',
    description:
      'Your attack and damage rolls are modified by your deed die ({{attack}}).',
  },
  {
    name: 'Mighty Deed of Arms',
    description:
      'You may declare mighty deeds of arms using your deed die ({{attack}}). You achieve success with a 3 or better.',
  },
  {
    name: 'Critical hits',
    description: 'You deal critical hits on attack rolls of {{threatRange}}.',
  },
  {
    name: 'Initiative',
    description: 'You add your level to initiative checks (+{{level}}).',
  },
  {
    name: 'Luck',
    description:
      'At 1st level, you may choose a lucky weapon type. Your luck modifier (at that time) applies to attacks with this type of weapon. This modifier does not change as your luck changes.',
  },
  {
    name: 'Action dice',
    description:
      '{{actionDice}}. You may only use your action dice for attacks.',
  },
];

// @ts-ignore
export const titles = new Map([
  [
    1,
    new Map([
      ['lawful', 'Squire'],
      ['neutral', 'Wildling'],
      ['chaotic', 'Bandit'],
    ]),
  ],
  [
    2,
    new Map([
      ['lawful', 'Champion'],
      ['neutral', 'Barbarian'],
      ['chaotic', 'Brigand'],
    ]),
  ],
  [
    3,
    new Map([
      ['lawful', 'Knight'],
      ['neutral', 'Berserker'],
      ['chaotic', 'Marauder'],
    ]),
  ],
  [
    4,
    new Map([
      ['lawful', 'Cavalier'],
      ['neutral', 'Headman/Headwoman'],
      ['chaotic', 'Ravager'],
    ]),
  ],
  [
    5,
    new Map([
      ['lawful', 'Paladin'],
      ['neutral', 'Chieftain'],
      ['chaotic', 'Reaver'],
    ]),
  ],
]);
