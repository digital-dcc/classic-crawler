export const displayName = 'Cleric';

export const cleric = new Map([
  [
    1,
    {
      level: 1,
      Attack: +0,
      critDie: '1d8',
      critTable: 'III',
      actionDice: '1d20',
      Ref: +0,
      Fort: +1,
      Will: +1,
      spellsKnown: {
        1: 4,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    },
  ],
  [
    2,
    {
      level: 2,
      Attack: +1,
      critDie: '1d8',
      critTable: 'III',
      actionDice: '1d20',
      Ref: +0,
      Fort: +1,
      Will: +1,
      spellsKnown: {
        1: 5,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    },
  ],
  [
    3,
    {
      level: 3,
      Attack: +2,
      critDie: '1d10',
      critTable: 'III',
      actionDice: '1d20',
      Ref: +1,
      Fort: +1,
      Will: +2,
      spellsKnown: {
        1: 5,
        2: 3,
        3: 0,
        4: 0,
        5: 0,
      },
    },
  ],
  [
    4,
    {
      level: 4,
      Attack: +2,
      critDie: '1d10',
      critTable: 'III',
      actionDice: '1d20',
      Ref: +1,
      Fort: +2,
      Will: +2,
      spellsKnown: {
        1: 6,
        2: 4,
        3: 0,
        4: 0,
        5: 0,
      },
    },
  ],
  [
    5,
    {
      level: 5,
      Attack: +3,
      critDie: '1d12',
      critTable: 'III',
      actionDice: '1d20',
      Ref: +1,
      Fort: +2,
      Will: +3,
      spellsKnown: {
        1: 6,
        2: 5,
        3: 2,
        4: 0,
        5: 0,
      },
    },
  ],
  [
    6,
    {
      level: 6,
      Attack: +4,
      critDie: '1d12',
      critTable: 'III',
      actionDice: '1d20+1d14',
      Ref: +2,
      Fort: +2,
      Will: +4,
      spellsKnown: {
        1: 7,
        2: 5,
        3: 3,
        4: 0,
        5: 0,
      },
    },
  ],
  [
    7,
    {
      level: 7,
      Attack: +5,
      critDie: '1d14',
      critTable: 'III',
      actionDice: '1d20+1d16',
      Ref: +2,
      Fort: +3,
      Will: +4,
      spellsKnown: {
        1: 7,
        2: 6,
        3: 4,
        4: 1,
        5: 0,
      },
    },
  ],
  [
    8,
    {
      level: 8,
      Attack: +5,
      critDie: '1d14',
      critTable: 'III',
      actionDice: '1d20+1d20',
      Ref: +2,
      Fort: +3,
      Will: +5,
      spellsKnown: {
        1: 8,
        2: 6,
        3: 5,
        4: 2,
        5: 0,
      },
    },
  ],
  [
    9,
    {
      level: 9,
      Attack: +6,
      critDie: '1d16',
      critTable: 'III',
      actionDice: '1d20+1d20',
      Ref: +3,
      Fort: +3,
      Will: +5,
      spellsKnown: {
        1: 8,
        2: 7,
        3: 5,
        4: 3,
        5: 1,
      },
    },
  ],
  [
    10,
    {
      level: 10,
      Attack: +7,
      critDie: '1d16',
      critTable: 'III',
      actionDice: '1d20+1d20',
      Ref: +3,
      Fort: +4,
      Will: +6,
      spellsKnown: {
        1: 9,
        2: 7,
        3: 6,
        4: 4,
        5: 2,
      },
    },
  ],
]);

export const features = [
  {name: 'Hit points', description: '1d8{{stamina}} hit points at each level'},
  {
    name: 'Choosing a god',
    description: 'At 1st level, you must select a god to worship.',
  },
  {
    name: 'Weapon training',
    description: `You may use weapons as appropriate to your god (see page 32 of the DCC Core Rulebook). You may wear any armor (your spell checks are not hindered).`,
  },
  {name: 'Alignment', description: `Your alignment must match your god's`},
  {
    name: 'Caster level',
    description: `({{level}}). Your caster level is a measure of your power in channeling your god's energy and is typically equal to your level.`,
  },
  {
    name: 'Magic',
    description: `You perform idol magic in the form of spells by rolling 1d20 + personality modifier ({{personality}}) + caster level (+{{level}}).`,
  },
  {
    name: 'Turn unholy',
    description: `You may wield your holy symbol to turn away abominations by rolling 1d20 + personality modifier ({{personality}}) + caster level (+{{level}}) + luck modifier ({{luck}}).`,
  },
  {
    name: 'Lay on hands',
    description: `You may make a spell check to "lay on hands" and heal damage to any living creature by rolling 1d20 + personality modifier ({{personality}}) + caster level (+{{level}}).`,
  },
  {
    name: 'Divine aid',
    description: `You are entitled to beseech your deity for divine aid by rolling 1d20 + personality modifier ({{personality}}) + caster level (+{{level}}). When you do so, your disapproval range increases by +10.`,
  },
  {
    name: 'Luck',
    description: `Your luck modifier applies when you attempt to turn unholy creatures.`,
  },
  {
    name: 'Action dice',
    description: `{{actionDice}}. You may use your action dice for attack rolls or checks to cast spells, turn unholy creatures, lay on hands or ask your god for divine aid.`,
  },
];

// @ts-ignore
export const titles = new Map([
  [
    1,
    new Map([
      ['lawful', 'Acolyte'],
      ['neutral', 'Witness'],
      ['chaotic', 'Zeolot'],
    ]),
  ],
  [
    2,
    new Map([
      ['lawful', 'Heathen-slayer'],
      ['neutral', 'Pupil'],
      ['chaotic', 'Convert'],
    ]),
  ],
  [
    3,
    new Map([
      ['lawful', 'Brother'],
      ['neutral', 'Chronicler'],
      ['chaotic', 'Cultist'],
    ]),
  ],
  [
    4,
    new Map([
      ['lawful', 'Curate'],
      ['neutral', 'Judge'],
      ['chaotic', 'Apostle'],
    ]),
  ],
  [
    5,
    new Map([
      ['lawful', 'Father'],
      ['neutral', 'Druid'],
      ['chaotic', 'High priest'],
    ]),
  ],
]);
