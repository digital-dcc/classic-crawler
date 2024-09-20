import {LitElement, html, css} from 'lit';
import {modifierFor} from '../../utilities/modifier-for.js';
import {slug} from '../../utilities/slug.js';
import {characterClasses} from '../../utilities/character-classes.js';
import {formatModifier} from '../../utilities/format-modifier.js';
import '../stat-display/stat-display.js';

export class DiceRoll {
  type = 'saving-throw';
  name = 'Saving Throw';
  description = 'Agility saving throw';

  // roll details
  roll = {
    // number of dice to roll
    qty: 1,
    // number of die sides
    die: 20,
    // any modifier to the die roll
    modifier: {
      breakdown: [],
      total: +0,
    },
  };

  agility;
  birthAugur;
  startingLuck;
  characterClass;
  level = 0;
  adjustment = 0;
  override = false;
}

// @ts-ignore
export class ReflexSave extends LitElement {
  static get styles() {
    return css`
      .wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
      }
    `;
  }

  static get properties() {
    return {
      agility: {type: Number},
      birthAugur: {attribute: 'birth-augur', type: String},
      startingLuck: {attribute: 'starting-luck', type: Number},
      characterClass: {attribute: 'character-class', type: String},
      level: {type: Number},
      adjustment: {type: Number},
      override: {type: Number},
    };
  }

  constructor() {
    super();
    this.agility = null;
    this.birthAugur = null;
    this.startingLuck = null;
    this.characterClass = null;
    this.level = 0;
    this.adjustment = 0;
    this.override = null;
  }

  render() {
    return html`
      <div class="wrapper">
        <stat-display
          text-position="bottom"
          name="Ref"
          value="${formatModifier(this.modifier.total)}"
          value-clickable
          @value-clicked="${this.valueClicked}"
        ></stat-display>
      </div>
    `;
  }

  valueClicked() {
    const roll = new DiceRoll();
    // @ts-ignore
    roll.roll.modifier = this.modifier;
    roll.agility = this.agility;
    roll.birthAugur = slug(this.birthAugur || '');
    roll.startingLuck = this.startingLuck;
    roll.characterClass = slug(this.characterClass || '');
    roll.level = this.level || 0;
    roll.adjustment = this.adjustment || 0;
    roll.override = !!this.override;
    this.dispatchEvent(new CustomEvent('reflex-saving-throw', {detail: roll}));
  }

  get modifier() {
    if (this.override) {
      return {
        breakdown: [{name: 'Modifier Override', value: this.override}],
        total: this.override,
      };
    }
    const breakdown = [];
    const agilityBonus = modifierFor(this.agility) || 0;
    breakdown.push({name: 'Agility Modifier', value: agilityBonus});
    let characterClassBonus = 0;
    if (
      this.characterClass &&
      characterClasses.get(slug(this.characterClass))
    ) {
      characterClassBonus =
        characterClasses.get(slug(this.characterClass))?.get(Number(this.level))
          ?.ref || 0;
      breakdown.push({
        name: 'Character Class Bonus',
        value: characterClassBonus,
      });
    }
    let luckAdjustment = 0;
    // we also need a way to account for the birth augur 'guardian-angel' that affects saving throws but on when escaping traps
    // we could add some sort of checkbox for this or we could just use the adjustment
    if (
      ['lucky-sign', 'struck-by-lightning'].includes(
        slug(this.birthAugur || '')
      )
    ) {
      luckAdjustment = modifierFor(this.startingLuck) || 0;
      breakdown.push({name: 'Birth Augur Modifier', value: luckAdjustment});
    }
    if (this.adjustment !== 0) {
      breakdown.push({name: 'Custom Adjustment', value: this.adjustment});
    }
    return {
      breakdown,
      total:
        agilityBonus + characterClassBonus + luckAdjustment + this.adjustment,
    };
  }
}

customElements.define('reflex-save', ReflexSave);
