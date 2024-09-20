export const displayName = 'Wizard';

export const wizard = new Map([
  [
    1,
    {
      level: 1,
      attack: 0,
      critDie: '1d6',
      critTable: 'I',
      actionDice: '1d20',
      knownSpells: 4,
      maxSpellLevel: 1,
      ref: 1,
      fort: 0,
      will: 1,
    },
  ],
  [
    2,
    {
      level: 2,
      attack: 1,
      critDie: '1d6',
      critTable: 'I',
      actionDice: '1d20',
      knownSpells: 5,
      maxSpellLevel: 1,
      ref: 1,
      fort: 0,
      will: 1,
    },
  ],
  [
    3,
    {
      level: 3,
      attack: 1,
      critDie: '1d8',
      critTable: 'I',
      actionDice: '1d20',
      knownSpells: 6,
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
      attack: 1,
      critDie: '1d8',
      critTable: 'I',
      actionDice: '1d20',
      knownSpells: 7,
      maxSpellLevel: 2,
      ref: 2,
      fort: 1,
      will: 2,
    },
  ],
  [
    5,
    {
      level: 5,
      attack: 2,
      critDie: '1d10',
      critTable: 'I',
      actionDice: '1d20+1d14',
      knownSpells: 8,
      maxSpellLevel: 3,
      ref: 2,
      fort: 1,
      will: 3,
    },
  ],
  [
    6,
    {
      level: 6,
      attack: 2,
      critDie: '1d10',
      critTable: 'I',
      actionDice: '1d20+1d16',
      knownSpells: 9,
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
      attack: 3,
      critDie: '1d12',
      critTable: 'I',
      actionDice: '1d20+1d20',
      knownSpells: 10,
      maxSpellLevel: 4,
      ref: 3,
      fort: 2,
      will: 4,
    },
  ],
  [
    8,
    {
      level: 8,
      attack: 3,
      critDie: '1d12',
      critTable: 'I',
      actionDice: '1d20+1d20',
      knownSpells: 12,
      maxSpellLevel: 4,
      ref: 3,
      fort: 2,
      will: 5,
    },
  ],
  [
    9,
    {
      level: 9,
      attack: 4,
      critDie: '1d14',
      critTable: 'I',
      actionDice: '1d20+1d20',
      knownSpells: 14,
      maxSpellLevel: 5,
      ref: 4,
      fort: 3,
      will: 5,
    },
  ],
  [
    10,
    {
      level: 10,
      attack: 4,
      critDie: '1d14',
      critTable: 'I',
      actionDice: '1d20+1d20+1d14',
      knownSpells: 16,
      maxSpellLevel: 5,
      ref: 4,
      fort: 3,
      will: 6,
    },
  ],
]);

export const features = [
  {name: 'Hit points', description: '1d4{{stamina}} hit points at each level.'},
  {
    name: 'Weapon training',
    description: `dagger, longbow, longsword, shortbow, short sword, and staff. You prefer not to wear armor since it's armor check penalty negatively affects your spellcasting ability.`,
  },
  {name: 'Alignment', description: `Any.`},
  {
    name: 'Caster level',
    description: `({{level}}). Your caster level is a reflection of your mastery of spells. This is typically the same as your level.`,
  },
  {
    name: 'Magic',
    description: `You know {{knownSpells}} + your intelligence modifier ({{intelligence}}) spells. The spells you know can have a maximum level of {{maxSpellLevel}}.`,
  },
  {
    name: 'Supernatural patrons',
    description: `Once you have learned the spell "Invoke Patron" you have the option of forming a bond with a powerful otherworldly being. See page 49 of the DCC core book.`,
  },
  {
    name: 'Familiars',
    description: `Once you have learned the spell "Find Familiar" you may use it to form a bond with a familiar. See page 50 of the DCC core book.`,
  },
  {
    name: 'Luck',
    description: `Your luck modifier applies to corruption and mecurial magic rolls.`,
  },
  {
    name: 'Languages',
    description: `You know 2 additional languages for each point of intelligence modifier ({{intelligence}})`,
  },
  {
    name: 'Action Dice',
    description: `Your first action die can be used for attacks or spell casting. Any additional action dice may only be used for spellcasting. ({{actionDice}})`,
  },
];

// @ts-ignore
export const titles = new Map([
  [
    1,
    new Map([
      ['lawful', 'Evoker'],
      ['neutral', 'Astrologist'],
      ['chaotic', 'Cultist'],
    ]),
  ],
  [
    2,
    new Map([
      ['lawful', 'Controller'],
      ['neutral', 'Enchanter'],
      ['chaotic', 'Shaman'],
    ]),
  ],
  [
    3,
    new Map([
      ['lawful', 'Conjurer'],
      ['neutral', 'Magician'],
      ['chaotic', 'Diabolist'],
    ]),
  ],
  [
    4,
    new Map([
      ['lawful', 'Summoner'],
      ['neutral', 'Thaumaturgist'],
      ['chaotic', 'Warlock / Witch'],
    ]),
  ],
  [
    5,
    new Map([
      ['lawful', 'Elementalist'],
      ['neutral', 'Sorcerer'],
      ['chaotic', 'Necromancer'],
    ]),
  ],
]);
