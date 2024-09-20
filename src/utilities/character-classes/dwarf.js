export const displayName = 'Dwarf';

export const dwarf = new Map([
  [
    1,
    {
      level: 1,
      attack: 'd3',
      critDie: '1d10',
      critTable: 'III',
      actionDice: '1d20',
      ref: 1,
      fort: 1,
      will: 1,
    },
  ],
  [
    2,
    {
      level: 2,
      attack: 'd4',
      critDie: '1d12',
      critTable: 'III',
      actionDice: '1d20',
      ref: 1,
      fort: 1,
      will: 1,
    },
  ],
  [
    3,
    {
      level: 3,
      attack: 'd5',
      critDie: '1d14',
      critTable: 'III',
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
      attack: 'd6',
      critDie: '1d16',
      critTable: 'IV',
      actionDice: '1d20',
      ref: 2,
      fort: 2,
      will: 2,
    },
  ],
  [
    5,
    {
      level: 5,
      attack: 'd7',
      critDie: '1d20',
      critTable: 'IV',
      actionDice: '1d20+1d14',
      ref: 2,
      fort: 3,
      will: 2,
    },
  ],
  [
    6,
    {
      level: 6,
      attack: 'd8',
      critDie: '1d24',
      critTable: 'V',
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
      attack: 'd10+1',
      critDie: '1d30',
      critTable: 'V',
      actionDice: '1d20+1d20',
      ref: 3,
      fort: 4,
      will: 3,
    },
  ],
  [
    8,
    {
      level: 8,
      attack: 'd10+2',
      critDie: '1d30',
      critTable: 'V',
      actionDice: '1d20+1d20',
      ref: 3,
      fort: 5,
      will: 3,
    },
  ],
  [
    9,
    {
      level: 9,
      attack: 'd10+3',
      critDie: '2d20',
      critTable: 'V',
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
      attack: 'd10+4',
      critDie: '2d20',
      critTable: 'V',
      actionDice: '1d20+1d20+1d14',
      ref: 4,
      fort: 6,
      will: 4,
    },
  ],
]);

export const features = [
  {name: 'Hit points', description: '1d10{{stamina}} hit points at each level'},
  {
    name: 'Weapon training',
    description:
      'battleaxe, club, dagger, handaxe, longsword, mace, short sword, spear, two-handed sword, warhammer, crossbow, javelin, shortbow and sling. You prefer to battle with a weapon and a shield and can wear any armor.',
  },
  {
    name: 'Alignment',
    description: 'Usually lawful. You must have a good reason to be otherwise.',
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
    name: 'Sword and board',
    description:
      'You can perform 1 shield bash each round in combat using a d14 to attack and doing 1d3 damage. Your deed die applies. This is addition to your other attacks.',
  },
  {name: 'Infravision', description: `You can see in the dark up to 60'`},
  {name: 'Slow', description: `You have a base movement speed of 20'`},
  {
    name: 'Underground Skills',
    description: `When underground, you receive a bonus to detect traps, slanting passages, shifting walls, and other new construction equal to your class level (+{{level}}). You can tell the direction of strong concentration of gold or gems within 100'. Weaker concentrations (down to a single coin) can be detected with concentration within 40'.`,
  },
  {
    name: 'Luck',
    description:
      'At 1st level, you may choose a lucky weapon type. Your luck modifier (at that time) applies to attacks with this type of weapon. This modifier does not change as your luck changes.',
  },
  {
    name: 'Languages',
    description:
      'You know Common, the Dwarven racial language and one extra randomly determined language. You know another one additional randomly determined language per point of Intelligence modifier ({{intelligence}}).',
  },
  {
    name: 'Action Dice',
    description:
      '{{actionDice}}. You may only use your action dice for attacks.',
  },
];

// @ts-ignore
export const titles = new Map([
  [
    1,
    new Map([
      ['lawful', 'Agent'],
      ['neutral', 'Apprentice'],
      ['chaotic', 'Rebel'],
    ]),
  ],
  [
    2,
    new Map([
      ['lawful', 'Broker'],
      ['neutral', 'Novice'],
      ['chaotic', 'Dissident'],
    ]),
  ],
  [
    3,
    new Map([
      ['lawful', 'Delegate'],
      ['neutral', 'Journeyer'],
      ['chaotic', 'Exile'],
    ]),
  ],
  [
    4,
    new Map([
      ['lawful', 'Envoy'],
      ['neutral', 'Crafter'],
      ['chaotic', 'Iconoclast'],
    ]),
  ],
  [
    5,
    new Map([
      ['lawful', 'Syndic'],
      ['neutral', 'Thegn'],
      ['chaotic', 'Renegade'],
    ]),
  ],
]);
