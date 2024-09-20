export const displayName = 'Halfling';

export const halfling = new Map([
  [
    1,
    {
      level: 1,
      attack: 1,
      critDie: '1d8',
      critTable: 'III',
      actionDice: '1d20',
      ref: 1,
      fort: 1,
      will: 1,
      sneakAndHide: 3,
    },
  ],
  [
    2,
    {
      level: 2,
      attack: 2,
      critDie: '1d8',
      critTable: 'III',
      actionDice: '1d20',
      ref: 1,
      fort: 1,
      will: 1,
      sneakAndHide: 5,
    },
  ],
  [
    3,
    {
      level: 3,
      attack: 2,
      critDie: '1d10',
      critTable: 'III',
      actionDice: '1d20',
      ref: 2,
      fort: 1,
      will: 2,
      sneakAndHide: 7,
    },
  ],
  [
    4,
    {
      level: 4,
      attack: 3,
      critDie: '1d10',
      critTable: 'III',
      actionDice: '1d20',
      ref: 2,
      fort: 2,
      will: 2,
      sneakAndHide: 8,
    },
  ],
  [
    5,
    {
      level: 5,
      attack: 4,
      critDie: '1d12',
      critTable: 'III',
      actionDice: '1d20',
      ref: 3,
      fort: 2,
      will: 3,
      sneakAndHide: 9,
    },
  ],
  [
    6,
    {
      level: 6,
      attack: 5,
      critDie: '1d12',
      critTable: 'III',
      actionDice: '1d20+1d14',
      ref: 4,
      fort: 2,
      will: 4,
      sneakAndHide: 11,
    },
  ],
  [
    7,
    {
      level: 7,
      attack: 5,
      critDie: '1d14',
      critTable: 'III',
      actionDice: '1d20+1d16',
      ref: 4,
      fort: 3,
      will: 4,
      sneakAndHide: 12,
    },
  ],
  [
    8,
    {
      level: 8,
      attack: 6,
      critDie: '1d14',
      critTable: 'III',
      actionDice: '1d20+1d20',
      ref: 5,
      fort: 3,
      will: 5,
      sneakAndHide: 13,
    },
  ],
  [
    9,
    {
      level: 9,
      attack: 7,
      critDie: '1d16',
      critTable: 'III',
      actionDice: '1d20+1d20',
      ref: 5,
      fort: 3,
      will: 5,
      sneakAndHide: 14,
    },
  ],
  [
    10,
    {
      level: 10,
      attack: 8,
      critDie: '1d16',
      critTable: 'III',
      actionDice: '1d20+1d20',
      ref: 6,
      fort: 4,
      will: 6,
      sneakAndHide: 15,
    },
  ],
]);

export const features = [
  {name: 'Hit points', description: '1d6{{stamina}} hit points at each level'},
  {
    name: 'Weapon training',
    description:
      'club, crossbow, dagger, handaxe, javelin, shortbow, short sword, sling, and staff. You prefer to wear armor.',
  },
  {name: 'Alignment', description: 'Lawful or neutral, almost never chaotic.'},
  {
    name: 'Two-weapon fighting',
    description:
      'You are an expert at two weapon fighting. You are considered as having a minimum of 16 agility with regards to the two weapon fighting rules. You can fight two handed with two equal sized weapons. You score a crit and automatically hit with a roll of 16. You only fumble if both dice come up 1s.',
  },
  {name: 'Infravision', description: `You can see in the dark up to 30'`},
  {
    name: 'Small size',
    description: `You can crawl into narrow spaces and tiny holes.`,
  },
  {name: 'Slow', description: `Your base movement speed is 20'`},
  {
    name: 'Stealth',
    description:
      'You recieve a bonus of {{sneakAndHide}} to sneaking silently and hiding in shadows.',
  },
  {
    name: 'Good luck charm',
    description:
      'When you burn luck, the bonus is 2 for every point of luck burned. You may act out of initiative order and burn your luck to aid others nearby that you can see. You recover your spent luck at {{level}} points per night. You may not recover more than your maximum luck.',
  },
  {
    name: 'Languages',
    description:
      'You know Common, the halfling racial language, as well as one additional randomly determined language. You also know one additional language for every point of Intelligence modifier ({{intelligence}})',
  },
  {
    name: 'Action dice',
    description:
      '({{actionDice}}). You can use your action dice for attacks or skill checks.',
  },
];

// @ts-ignore
export const titles = new Map([
  [
    1,
    new Map([
      ['lawful', 'Wanderer'],
      ['neutral', 'Wanderer'],
      ['chaotic', 'Wanderer'],
    ]),
  ],
  [
    2,
    new Map([
      ['lawful', 'Explorer'],
      ['neutral', 'Explorer'],
      ['chaotic', 'Explorer'],
    ]),
  ],
  [
    3,
    new Map([
      ['lawful', 'Collector'],
      ['neutral', 'Collector'],
      ['chaotic', 'Collector'],
    ]),
  ],
  [
    4,
    new Map([
      ['lawful', 'Accumulator'],
      ['neutral', 'Accumulator'],
      ['chaotic', 'Accumulator'],
    ]),
  ],
  [
    5,
    new Map([
      ['lawful', 'Wise one'],
      ['neutral', 'Wise one'],
      ['chaotic', 'Wise one'],
    ]),
  ],
]);
