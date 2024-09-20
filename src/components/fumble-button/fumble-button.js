import {LitElement, html, css} from 'lit';
import {formatModifier} from '../../utilities/format-modifier.js';
import {modifierFor} from '../../utilities/modifier-for.js';
import {slug} from '../../utilities/slug.js';
import {fumbleTable} from '../../utilities/fumble-table.js';
import '../stat-display/stat-display.js';

class DiceRoll {
  name;
  description;
  roll = {
    qty: 1,
    die: 4,
    modifier: {
      breakdown: [],
      total: 0,
    },
    result() {},
  };
  luck;
  birthAugur;
  armor;
  shield;
}

const fumbleDie = new Map([
  ['unarmored', 4],
  ['padded', 8],
  ['leather', 8],
  ['studded-leather', 8],
  ['hide', 12],
  ['scale-mail', 12],
  ['chainmail', 12],
  ['banded-mail', 16],
  ['half-plate', 16],
  ['full-plate', 16],
  ['shield', 8],
]);

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class FumbleButton extends LitElement {
  static get styles() {
    return css`
      .wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
      }
      stat-display::part(value) {
        font-size: 1em;
      }
    `;
  }

  static get properties() {
    return {
      armor: {type: String},
      luck: {type: Number},
      birthAugur: {attribute: 'birth-augur', type: String},
      shield: {type: Boolean},
      multiplierOverride: {attribute: 'multiplier-override', type: Number},
      dieOverride: {attribute: 'die-override', type: Number},
      modifierOverride: {attribute: 'modifier-override', type: Number},
    };
  }

  constructor() {
    super();
    this.armor = 'Unarmored';
    this.luck = null;
    this.birthAugur = null;
    this.shield = false;
    this.multiplierOverride = null;
    this.dieOverride = null;
    this.modifierOverride = null;
  }

  render() {
    return html`
      <div class="wrapper">
        <stat-display
          name="Fumble"
          value="${this.multiplier}d${this.fumbleDie}${formatModifier(
            this.modifier.total,
            true
          )}"
          value-clickable
          @value-clicked="${this.onClick}"
        ></stat-display>
      </div>
    `;
  }

  get multiplier() {
    if (this.multiplierOverride) return Number(this.multiplierOverride);
    return 1;
  }

  get fumbleDie() {
    if (this.dieOverride) return Number(this.dieOverride.replace('d', ''));
    const armorDie = fumbleDie.get(slug(this.armor || '')) || 4;
    const shieldDie = fumbleDie.get('shield') || 8;
    if (this.shield && armorDie < shieldDie) {
      return shieldDie;
    }
    return armorDie;
  }

  get modifier() {
    if (this.modifierOverride) {
      return {
        breakdown: [{name: 'Modifier Override', value: this.modifierOverride}],
        total: Number(this.modifierOverride),
      };
    }

    // inverse luck affects fumbles
    let mod;
    const breakdown = [];

    // The broken star lucky sign, doubles the luck modifier effect on fumbles
    if (slug(this.birthAugur || '') === 'the-broken-star') {
      mod = modifierFor(this.luck) * 2 * -1;
      breakdown.push({name: 'Luck Modifier (The Broken Star)', value: mod});
    } else {
      mod = modifierFor(this.luck) * -1;
      breakdown.push({name: 'Luck Modifier', value: mod});
    }

    return {breakdown, total: mod};
  }

  onClick() {
    const roll = new DiceRoll();
    roll.name = 'Fumble Roll';
    roll.description = `Fumble roll based on armor worn`;
    roll.roll = {
      qty: this.multiplier,
      die: fumbleDie.get(slug(this.armor || '')) || 4,
      // @ts-ignore
      modifier: this.modifier,
      result(value) {
        return fumbleTable[value].result;
      },
    };
    roll.birthAugur = slug(this.birthAugur || '');
    roll.luck = this.luck;
    roll.armor = slug(this.armor || '');
    roll.shield = !!this.shield;

    this.dispatchEvent(
      new CustomEvent('fumble-roll', {
        detail: roll,
      })
    );
  }
}

customElements.define('fumble-button', FumbleButton);
