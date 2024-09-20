export const displayName = 'Elf';

export const elf = new Map([
  [
    1,
    {
      level: 1,
      attack: 1,
      critDie: '1d6',
      critTable: 'II',
      actionDice: '1d20',
      knownSpells: 3,
      maxSpellLevel: 1,
      ref: 1,
      fort: 1,
      will: 1,
    },
  ],
  [
    2,
    {
      level: 2,
      attack: 1,
      critDie: '1d8',
      critTable: 'II',
      actionDice: '1d20',
      knownSpells: 4,
      maxSpellLevel: 1,
      ref: 1,
      fort: 1,
      will: 1,
    },
  ],
  [
    3,
    {
      level: 3,
      attack: 2,
      critDie: '1d8',
      critTable: 'II',
      actionDice: '1d20',
      knownSpells: 5,
      maxSpellLevel: 2,
      ref: 1,
      fort: 1,
      will: 2,
    },
  ],
  [
    4,
    {
      level: 4,
      attack: 2,
      critDie: '1d10',
      critTable: 'II',
      actionDice: '1d20',
      knownSpells: 6,
      maxSpellLevel: 2,
      ref: 2,
      fort: 2,
      will: 2,
    },
  ],
  [
    5,
    {
      level: 5,
      attack: 3,
      critDie: '1d10',
      critTable: 'II',
      actionDice: '1d20+1d14',
      knownSpells: 7,
      maxSpellLevel: 3,
      ref: 2,
      fort: 2,
      will: 3,
    },
  ],
  [
    6,
    {
      level: 6,
      attack: 3,
      critDie: '1d12',
      critTable: 'II',
      actionDice: '1d20+1d16',
      knownSpells: 8,
      maxSpellLevel: 3,
      ref: 2,
      fort: 2,
      will: 4,
    },
  ],
  [
    7,
    {
      level: 7,
      attack: 4,
      critDie: '1d12',
      critTable: 'II',
      actionDice: '1d20+1d20',
      knownSpells: 9,
      maxSpellLevel: 4,
      ref: 3,
      fort: 3,
      will: 4,
    },
  ],
  [
    8,
    {
      level: 8,
      attack: 4,
      critDie: '1d14',
      critTable: 'II',
      actionDice: '1d20+1d20',
      knownSpells: 10,
      maxSpellLevel: 4,
      ref: 3,
      fort: 3,
      will: 5,
    },
  ],
  [
    9,
    {
      level: 9,
      attack: 5,
      critDie: '1d14',
      critTable: 'II',
      actionDice: '1d20+1d20',
      knownSpells: 12,
      maxSpellLevel: 5,
      ref: 3,
      fort: 3,
      will: 5,
    },
  ],
  [
    10,
    {
      level: 10,
      attack: 5,
      critDie: '1d16',
      critTable: 'II',
      actionDice: '1d20+1d20+1d14',
      knownSpells: 14,
      maxSpellLevel: 5,
      ref: 4,
      fort: 4,
      will: 6,
    },
  ],
]);

export const features = [
  {name: 'Hit points', description: '1d6{{stamina}} hit points at each level'},
  {
    name: 'Weapon training',
    description:
      'dagger, javelin, lance, longbow, longsword, shortbow, short sword, staff, spear, and two-handed sword.',
  },
  {
    name: 'Alignment',
    description: 'Usually Chaotic or Neutral. Seldom Lawful.',
  },
  {
    name: 'Magic',
    description: `You know {{knownSpells}} + your intelligence modifier ({{intelligence}}) spells. The spells you know can have a maximum level of {{maxSpellLevel}}.`,
  },
  {
    name: 'Caster level',
    description: `({{level}}). Your caster level is a reflection of your mastery of spells. This is typically the same as your level.`,
  },
  {
    name: 'Supernatural patrons',
    description: `You know the spell "Invoke Patron". You have the option of forming a bond with a powerful otherworldly being. See page 49 of the DCC core book.`,
  },
  {name: 'Infravision', description: `You can see in the dark up to 60'`},
  {
    name: 'Immunities',
    description: 'You are immune to magical sleep and paralysis.',
  },
  {
    name: 'Vulnerabilities',
    description:
      'Wearing iron armor or using iron weapons causes you pain. Doing so causes you to take 1hp damage per day.',
  },
  {
    name: 'Heightened senses',
    description: `You receive a +4 to detect secret doors. When passing withing 10' of a secret door, you are entitled to a check to detect it.`,
  },
  {
    name: 'Luck',
    description:
      'At first level, you may choose to apply your luck modifier to all spell checks for one spell you know. This modifier does not change as your luck changes.',
  },
  {
    name: 'Languages',
    description:
      'You know Common, the Elven racial language and one extra randomly determined language. You know another one additional randomly determined language per point of Intelligence modifier ({{intelligence}}).',
  },
  {
    name: 'Action Dice',
    description:
      '({{actionDice}}) You can use your action dice for attacks or spellcasting.',
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
      ['lawful', 'Seer'],
      ['neutral', 'Seer'],
      ['chaotic', 'Seer'],
    ]),
  ],
  [
    3,
    new Map([
      ['lawful', 'Quester'],
      ['neutral', 'Quester'],
      ['chaotic', 'Quester'],
    ]),
  ],
  [
    4,
    new Map([
      ['lawful', 'Savant'],
      ['neutral', 'Savant'],
      ['chaotic', 'Savant'],
    ]),
  ],
  [
    5,
    new Map([
      ['lawful', 'Elder'],
      ['neutral', 'Elder'],
      ['chaotic', 'Elder'],
    ]),
  ],
]);
