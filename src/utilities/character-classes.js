import {
  wizard,
  features as wizardFeatures,
  titles as wizardTitles,
  displayName as wizardDisplayName,
} from './character-classes/wizard.js';
import {
  warrior,
  features as warriorFeatures,
  titles as warriorTitles,
  displayName as warriorDisplayName,
} from './character-classes/warrior.js';
import {
  thief,
  features as thiefFeatures,
  titles as thiefTitles,
  displayName as thiefDisplayName,
} from './character-classes/thief.js';
import {
  dwarf,
  features as dwarfFeatures,
  titles as dwarfTitles,
  displayName as dwarfDisplayName,
} from './character-classes/dwarf.js';
import {
  elf,
  features as elfFeatures,
  titles as elfTitles,
  displayName as elfDisplayName,
} from './character-classes/elf.js';
import {
  halfling,
  features as halflingFeatures,
  titles as halflingTitles,
  displayName as halflingDisplayName,
} from './character-classes/halfling.js';
import {
  cleric,
  features as clericFeatures,
  titles as clericTitles,
  displayName as clericDisplayName,
} from './character-classes/cleric.js';

export const characterClassDisplayNames = new Map();
characterClassDisplayNames.set('', {
  level: 0,
  Attack: +0,
  critDie: '1d4',
  critTable: 'I',
  actionDice: '1d20',
  Ref: +0,
  Fort: +0,
  Will: +0,
});
characterClassDisplayNames.set('thief', thiefDisplayName);
characterClassDisplayNames.set('warrior', warriorDisplayName);
characterClassDisplayNames.set('wizard', wizardDisplayName);
characterClassDisplayNames.set('cleric', clericDisplayName);
characterClassDisplayNames.set('dwarf', dwarfDisplayName);
characterClassDisplayNames.set('elf', elfDisplayName);
characterClassDisplayNames.set('halfling', halflingDisplayName);

/**
 * @type {Map<string, Map<number, object>>}
 */
export const characterClasses = new Map();
characterClasses.set('thief', thief);
characterClasses.set('warrior', warrior);
characterClasses.set('wizard', wizard);
characterClasses.set('cleric', cleric);
characterClasses.set('dwarf', dwarf);
characterClasses.set('elf', elf);
characterClasses.set('halfling', halfling);

export const characterClassFeatures = new Map();
characterClassFeatures.set('thief', thiefFeatures);
characterClassFeatures.set('warrior', warriorFeatures);
characterClassFeatures.set('wizard', wizardFeatures);
characterClassFeatures.set('cleric', clericFeatures);
characterClassFeatures.set('dwarf', dwarfFeatures);
characterClassFeatures.set('elf', elfFeatures);
characterClassFeatures.set('halfling', halflingFeatures);

export const characterClassTitles = new Map();
characterClassTitles.set('thief', thiefTitles);
characterClassTitles.set('warrior', warriorTitles);
characterClassTitles.set('wizard', wizardTitles);
characterClassTitles.set('cleric', clericTitles);
characterClassTitles.set('dwarf', dwarfTitles);
characterClassTitles.set('elf', elfTitles);
characterClassTitles.set('halfling', halflingTitles);
