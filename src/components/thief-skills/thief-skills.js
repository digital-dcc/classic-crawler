import {LitElement, html, css} from 'lit';
import {modifierFor} from '../../utilities/modifier-for.js';
import {formatModifier} from '../../utilities/format-modifier.js';
import {slug} from '../../utilities/slug.js';
import {armor, armorSlug} from '../../utilities/armor.js';
import {skills} from '../../utilities/character-classes/thief.js';
import '../check-penalty/check-penalty.js';

class DiceRoll {
  name = '';
  description = '';
  roll = {
    qty: 1,
    die: 20,
    modifier: {
      breakdown: [],
      total: 0,
    },
  };
  birthAugur = null;
  agility = null;
  intelligence = null;
  personality = null;
  startingLuck = null;
  level = 0;
  alignment = null;
  armor = null;
  shield = false;
}

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class ThiefSkills extends LitElement {
  static get styles() {
    return css`
      .outer-wrapper {
        border-radius: 5px;
        border: 1px black solid;
        padding: 5px;
      }
      .inner-wrapper {
        font-family: var(
          --primary-font,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Helvetica,
          Arial,
          sans-serif,
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol'
        );
        font-size: 1rem;
        display: flex;
        flex-flow: column wrap;
        height: 400px;
      }
      h2 {
        font-size: 0.8rem;
        text-align: center;
      }
      .skill {
        display: flex;
        justify-content: space-between;
        min-height: 25px;
        align-items: center;
        padding: 0px 10px;
      }
      button {
        display: block;
        border: 0;
        background-color: unset;
        border-radius: 5px;
        font-size: 1em;
        padding: 5px 10px;
        margin: 0;
      }
      button:hover {
        background-color: rgba(211, 211, 211, 0.5);
      }
      button {
        cursor: pointer;
      }
      button:active {
        transform: translateY(1px);
      }
      .skill-value {
        padding: 5px 10px;
      }
      @media (min-width: 500px) {
        .inner-wrapper {
          height: 200px;
        }
      }
      @media (min-width: 800px) {
        .inner-wrapper {
          height: 150px;
        }
      }
      @media (min-width: 1000px) {
        .inner-wrapper {
          height: 150px;
        }
      }
    `;
  }

  static get properties() {
    return {
      agility: {type: Number},
      personality: {type: Number},
      intelligence: {type: Number},
      level: {type: Number},
      alignment: {type: String},
      birthAugur: {attribute: 'birth-augur', type: String},
      startingLuck: {attribute: 'starting-luck', type: Number},
      // dieAdjustment: {attribute: 'die-adjustment', type: Number},
      // modifierAdjustment: {attribute: 'modifier-adjustment', type: Number},
      // dieOverride: {attribute: 'die-override', type: Number},
      // modifierOverride: {attribute: 'modifier-override', type: Number},
      armor: {type: String},
      shield: {type: Boolean},
      applyCheckPenalty: {attribute: 'apply-check-penalty', type: Boolean},
      applyLuckModifier: {attribute: 'apply-luck-modifier', type: Boolean},
    };
  }

  constructor() {
    super();
    this.agility = null;
    this.personality = null;
    this.intelligence = null;
    this.level = 0;
    this.alignment = null;
    this.birthAugur = null;
    this.startingLuck = null;
    // this.dieAdjustment = 0;
    // this.dieOverride = null;
    // this.modifierAdjustment = 0;
    // this.modifierOverride = null;
    this.armor = null;
    this.shield = false;
    // this.applyCheckPenalty = false;
    // this.applyLuckModifier = false;
  }

  agilityCheckModifierFor(skill, checkPenalty = true) {
    const penalty = checkPenalty ? this.checkPenalty : 0;
    const agility = modifierFor(this.agility);
    const luck = this.luckModifierFor(skill);
    const thief = this.thiefModifier(skill);
    const total = agility + luck + thief + penalty;
    return {
      breakdown: [
        {name: 'Agility Modifier', value: agility},
        {name: 'Birth Augur Modifier', value: luck},
        {name: 'Thief Skill Bonus', value: thief},
        {name: 'Armor Check Penalty', value: penalty},
      ],
      total,
    };
  }

  personalityCheckModifierFor(skill, checkPenalty = false) {
    const penalty = checkPenalty ? this.checkPenalty : 0;
    const personality = modifierFor(this.personality);
    const luck = this.luckModifierFor(skill);
    const thief = this.thiefModifier(skill);
    const total = personality + luck + thief + penalty;
    return {
      breakdown: [
        {name: 'Personality', value: personality},
        {name: 'Birth Augur', value: luck},
        {name: 'Thief Skill Bonus', value: thief},
      ],
      total,
    };
  }

  intelligenceCheckModifierFor(skill, checkPenalty = false) {
    const penalty = checkPenalty ? this.checkPenalty : 0;
    const intelligence = modifierFor(this.intelligence);
    const luck = this.luckModifierFor(skill);
    const thief = this.thiefModifier(skill);
    const total = intelligence + luck + thief + penalty;
    return {
      breakdown: [
        {name: 'Intelligence', value: intelligence},
        {name: 'Birth Augur', value: luck},
        {name: 'Thief Skill Bonus', value: thief},
      ],
      total,
    };
  }

  luckModifierFor(skill) {
    let luckModifier = 0;
    if (slug(this.birthAugur || '') === 'born-under-the-loom') {
      luckModifier = modifierFor(this.startingLuck) || 0;
    }
    if (
      (skill === 'findTrap' || skill === 'disableTrap') &&
      slug(this.birthAugur || '') === 'foxs-cunning'
    ) {
      luckModifier = modifierFor(this.startingLuck) || 0;
    }
    return luckModifier;
  }

  thiefModifier(skill) {
    return (
      skills
        .get(skill)
        ?.get(this.alignment)
        ?.get(this.level || 0)?.bonus || 0
    );
  }

  thiefModifierFor(skill) {
    const thief = this.thiefModifier(skill);
    const luck = this.luckModifierFor(skill);
    const total = luck + thief;
    return {
      breakdown: [
        {name: 'Thief Skill Bonus', value: thief},
        {name: 'Birth Augur', value: luck},
      ],
      total,
    };
  }

  get checkPenalty() {
    let penalty = armor.get(armorSlug(this.armor || ''))?.checkPenalty || 0;
    if (this.shield) penalty = penalty - 1;
    return penalty;
  }

  get castSpellFromScroll() {
    const bonus = this.thiefModifier('castSpellFromScroll');

    const qty = 1;
    // @ts-ignore
    const die = Number(bonus.split('d')[1]);

    // Calculate modifier
    const luckModifier = this.luckModifierFor('castSpellFromScroll');
    const intelligenceModifier = modifierFor(this.intelligence);
    const checkPenalty = this.checkPenalty;
    const modifier = luckModifier + intelligenceModifier + checkPenalty;

    return {
      qty,
      die,
      modifier: {
        breakdown: [
          {name: 'Intelligence', value: intelligenceModifier},
          {name: 'Birth Augur', value: luckModifier},
          {name: 'Armor Check Penalty', value: checkPenalty},
        ],
        total: modifier,
      },
    };
  }

  formatCastFromScrollModifier({qty, die, modifier}) {
    return `${qty}d${die}${formatModifier(modifier.total)}`;
  }

  render() {
    const backStab =
      this.thiefModifier('backstab') + this.luckModifierFor('backstab');
    const sneakSilently = this.agilityCheckModifierFor('sneakSilently');
    const hideInShadows = this.agilityCheckModifierFor('hideInShadows');
    const pickPocket = this.agilityCheckModifierFor('pickPocket');
    const climbSheerSurfaces =
      this.agilityCheckModifierFor('climbSheerSurfaces');
    const pickLock = this.agilityCheckModifierFor('pickLock');
    const findTrap = this.intelligenceCheckModifierFor('findTrap');
    const disableTrap = this.agilityCheckModifierFor('disableTrap');
    const forgeDocument = this.agilityCheckModifierFor('forgeDocument');
    const disguiseSelf = this.personalityCheckModifierFor('disguiseSelf');
    const readLanguages = this.intelligenceCheckModifierFor('readLanguages');
    const handlePoison = this.thiefModifierFor('handlePoison');
    const castSpellFromScroll = this.castSpellFromScroll;

    return html`
      <div class="outer-wrapper">
        <h2>Thief Skills</h2>
        <div class="inner-wrapper">
          <div class="skill backstab" part="backstab">
            <span>Backstab</span>
            <span class="skill-value">${formatModifier(backStab)}</span>
          </div>
          <div class="skill sneak-silently" part="sneak-silently">
            <span>Sneak Silently</span>
            <button
              @click="${() => this.onClick('Sneak Silently', sneakSilently)}"
            >
              ${formatModifier(sneakSilently.total)}
            </button>
          </div>
          <div class="skill hide-in-shadows" part="hide-in-shadows">
            <span>Hide In Shadows</span>
            <button
              @click="${() => this.onClick('Hide In Shadows', hideInShadows)}"
            >
              ${formatModifier(hideInShadows.total)}
            </button>
          </div>
          <div class="skill pick-pocket" part="pick-pocket">
            <span>Pick Pocket</span>
            <button @click="${() => this.onClick('Pick Pocket', pickPocket)}">
              ${formatModifier(pickPocket.total)}
            </button>
          </div>
          <div class="skill climb-sheer-surfaces" part="climb-sheer-surfaces">
            <span>Climb Sheer Surfaces</span>
            <button
              @click="${() =>
                this.onClick('Climb Sheer Surfaces', climbSheerSurfaces)}"
            >
              ${formatModifier(climbSheerSurfaces.total)}
            </button>
          </div>
          <div class="skill pick-lock" part="pick-lock">
            <span>Pick Lock</span>
            <button @click="${() => this.onClick('Pick Lock', pickLock)}">
              ${formatModifier(pickLock.total)}
            </button>
          </div>
          <div class="skill find-trap" part="find-trap">
            <span>Find Trap</span>
            <button @click="${() => this.onClick('Find Trap', findTrap)}">
              ${formatModifier(findTrap.total)}
            </button>
          </div>
          <div class="skill disable-trap" part="disable-trap">
            <span>Disable Trap</span>
            <button @click="${() => this.onClick('Disable Trap', disableTrap)}">
              ${formatModifier(disableTrap.total)}
            </button>
          </div>
          <div class="skill forge-document" part="forge-document">
            <span>Forge Documents</span>
            <button
              @click="${() => this.onClick('Forge Document', forgeDocument)}"
            >
              ${formatModifier(forgeDocument.total)}
            </button>
          </div>
          <div class="skill disguise-self" part="disguise-self">
            <span>Disguise Self</span>
            <button
              @click="${() => this.onClick('Disguise Self', disguiseSelf)}"
            >
              ${formatModifier(disguiseSelf.total)}
            </button>
          </div>
          <div class="skill read-languages" part="read-languages">
            <span>Read Languages</span>
            <button
              @click="${() => this.onClick('Read Languages', readLanguages)}"
            >
              ${formatModifier(readLanguages.total)}
            </button>
          </div>
          <div class="skill handle-poison" part="handle-poison">
            <span>Handle Poison</span>
            <button
              @click="${() => this.onClick('Handle Poison', handlePoison)}"
            >
              ${formatModifier(handlePoison.total)}
            </button>
          </div>
          <div
            class="skill cast-spell-from-scroll"
            part="cast-spell-from-scroll"
          >
            <span>Cast Spell From Scroll</span>
            <button
              @click="${() =>
                this.onClick(
                  'Cast Spell From Scroll',
                  castSpellFromScroll.modifier,
                  castSpellFromScroll.qty,
                  castSpellFromScroll.die
                )}"
            >
              ${this.formatCastFromScrollModifier(castSpellFromScroll)}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  onClick(skill, modifier, qty, die) {
    const roll = new DiceRoll();
    roll.name = `Thief Skill Check`;
    roll.description = `Thief ${skill.toLowerCase()} roll`;
    roll.roll.qty = qty || 1;
    roll.roll.die = die || 20;
    roll.roll.modifier = modifier;
    roll.birthAugur = this.birthAugur;
    roll.agility = this.agility;
    roll.intelligence = this.intelligence;
    roll.personality = this.personality;
    roll.startingLuck = this.startingLuck;
    roll.level = this.level;
    roll.alignment = this.alignment;
    roll.armor = this.armor;
    roll.shield = !!this.shield;
    // roll.dieAdjustment = this.dieAdjustment;
    // roll.modifierAdjustment = this.modifierAdjustment;

    this.dispatchEvent(
      new CustomEvent('thief-skill-check', {
        detail: roll,
      })
    );
  }
}

customElements.define('thief-skills', ThiefSkills);
