import {LitElement, html, css} from 'lit';
import {formatModifier} from '../../utilities/format-modifier.js';
import {slug} from '../../utilities/slug.js';
import {modifierFor} from '../../utilities/modifier-for.js';
import {characterClasses} from '../../utilities/character-classes.js';
import * as critTables from '../../utilities/crit-tables.js';
import '../stat-display/stat-display.js';

class DiceRoll {
  name;
  description;
  roll = {
    qty: 1,
    die: 20,
    modifier: {
      breakdown: [],
      total: 0,
    },
    result() {},
  };
  luck;
  characterClass;
  level;
  birthAugur;
  critTable;
}

export class CritButton extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
      }
      stat-display::part(value) {
        font-size: 1em;
      }
    `;
  }

  static get properties() {
    return {
      characterClass: {type: String},
      level: {type: String},
      luck: {type: Number},
      birthAugur: {attribute: 'birth-augur', type: String},
      multiplierOverride: {attribute: 'multiplier-override', type: Number},
      dieOverride: {attribute: 'die-override', type: Number},
      modifierOverride: {attribute: 'modifier-override', type: Number},
      tableOverride: {attribute: 'table-override', type: String},
    };
  }

  constructor() {
    super();
    this.characterClass = null;
    this.level = 0;
    this.luck = null;
    this.birthAugur = null;
    this.multiplierOverride = null;
    this.dieOverride = null;
    this.modifierOverride = null;
    this.tableOverride = null;
  }

  render() {
    return html`
      <stat-display
        name="Crit"
        value="${this.multiplier}d${this.die}${formatModifier(
          this.modifier.total,
          true
        )} ${this.critTable}"
        value-clickable
        @value-clicked="${this.onClick}"
      ></stat-display>
    `;
  }

  get characterClassSlug() {
    return slug(this.characterClass || '');
  }

  get multiplier() {
    if (this.multiplierOverride) return Number(this.multiplierOverride);
    return this.critDieQty;
  }

  get die() {
    if (this.dieOverride) {
      if (typeof this.dieOverride === 'string') {
        return Number(this.dieOverride.replace('d', ''));
      }
      return this.dieOverride;
    }
    return this.critDie;
  }

  get modifier() {
    if (this.modifierOverride) {
      return {
        breakdown: [{name: 'Modifier Override', value: this.modifierOverride}],
        total: Number(this.modifierOverride),
      };
    }

    let total = 0;
    const breakdown = [];
    // luck modifies crits
    const luckModifier = modifierFor(this.luck);

    // the warriors arm lucky sign doubles the luck effect on crits
    // we do some processing on the input to make it as flexible as possible
    // eg. Warrior´s arm and warriors-arm work
    if (slug(this.birthAugur || '') === 'warriors-arm') {
      total += luckModifier * 2;
      breakdown.push({
        name: 'Luck Modifier (Warriors Arm)',
        value: luckModifier * 2,
      });
    } else {
      total += luckModifier;
      breakdown.push({name: 'Luck Modifier', value: luckModifier});
    }

    // the thief has a modifier at higher levels
    if (this.critModifier) {
      total += this.critModifier;
      breakdown.push({
        name: 'Class Modifier',
        value: this.critModifier,
      });
    }

    return {breakdown, total};
  }

  /**
   * Get the number of dice to roll from the characterClass data using characterClass and level
   * This is using 1 but not always. For example high level warriors
   * @returns {number}
   */
  get critDieQty() {
    const die = characterClasses
      .get(this.characterClassSlug)
      ?.get(Number(this.level || 0))?.critDie;
    if (!die) return 1;
    return Number(die?.split('d')[0] || 1);
  }

  /**
   * Get the type of die to roll from the characterClass data using characterClass and level
   * @returns {number}
   */
  get critDie() {
    const die = characterClasses
      .get(this.characterClassSlug)
      ?.get(Number(this.level || 0))?.critDie;
    if (!die) return 4;
    return Number(die.split('d')[1].split('+')[0]);
  }

  /**
   * Get the modifier from the characterClass data using characterClass and level
   * This is almost always 0 except for high level thieves
   * @returns {number}
   */
  get critModifier() {
    const die = characterClasses
      .get(this.characterClassSlug)
      ?.get(Number(this.level || 0))?.critDie;
    if (!die) return 0;
    return Number(die.split('d')[1].split('+')[1] || 0);
  }

  /**
   * Get the crit table from the characterClass data using characterClass and level
   * This is a roman numeral from I to V.
   * @returns {string}
   */
  get critTable() {
    if (this.tableOverride) return this.tableOverride;
    return (
      characterClasses
        .get(this.characterClassSlug)
        ?.get(Number(this.level || 0))?.critTable || 'I'
    );
  }

  onClick() {
    const roll = new DiceRoll();
    roll.name = 'Crit Roll';
    roll.description = `Crit roll on table ${this.critTable}`;
    roll.roll = {
      qty: this.multiplier,
      die: this.die,
      // @ts-ignore
      modifier: this.modifier,
      result: (value) => {
        console.log(this.critTable, value);
        const num = value < 0 ? 0 : value;
        return critTables[this.critTable][num].result;
      },
    };
    roll.birthAugur = this.birthAugur;
    roll.luck = this.luck;
    roll.critTable = this.critTable;
    roll.characterClass = this.characterClassSlug;
    roll.level = Number(this.level);

    this.dispatchEvent(
      new CustomEvent('crit-roll', {
        detail: roll,
      })
    );
  }
}

customElements.define('crit-button', CritButton);
