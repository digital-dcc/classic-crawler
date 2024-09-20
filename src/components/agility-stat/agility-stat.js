import {LitElement, html, css} from 'lit';
import {modifierFor} from '../../utilities/modifier-for.js';
import {diceChain} from '../../utilities/dice-chain.js';
import {checkPenaltyFor} from '../../utilities/armor.js';
import {formatModifier} from '../../utilities/format-modifier.js';
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
  };
  maxAgility;
  agility;
  luck;
  luckReverse = false;
}

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class AgilityStat extends LitElement {
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
      maxAgility: {attribute: 'max-agility', type: Number},
      agility: {type: Number},
      luck: {type: Number},
      dieAdjustment: {attribute: 'die-adjustment', type: Number},
      modifierAdjustment: {attribute: 'modifier-adjustment', type: Number},
      dieOverride: {attribute: 'die-override', type: Number},
      modifierOverride: {attribute: 'modifier-override', type: Number},
      armor: {type: String},
      shield: {type: Boolean},
      applyCheckPenalty: {attribute: 'apply-check-penalty', type: Boolean},
      applyLuckModifier: {attribute: 'apply-luck-modifier', type: Boolean},
    };
  }

  constructor() {
    super();
    this.maxAgility = null;
    this.agility = null;
    this.luck = null;
    this.dieAdjustment = 0;
    this.dieOverride = null;
    this.modifierAdjustment = 0;
    this.modifierOverride = null;
    this.armor = null;
    this.shield = null;
    this.applyCheckPenalty = false;
    this.applyLuckModifier = false;
  }

  get die() {
    if (this.dieOverride) return this.dieOverride;
    // adjust the die up or down the dice chain
    const die = diceChain[diceChain.indexOf('d20') + this.dieAdjustment];
    // ensure adjustment doesnt take the index out of bounds
    if (!die) return 20;
    return Number(die.split('d')[1]);
  }

  get modifier() {
    if (this.modifierOverride) {
      return {
        breakdown: [{name: 'Modifier Override', value: this.modifierOverride}],
        total: this.modifierOverride,
      };
    }
    const agilityModifier = modifierFor(this.agility || this.maxAgility);
    const adjustment = this.modifierAdjustment;
    const breakdown = [
      {name: 'Agility Modifier', value: agilityModifier},
      {name: 'Modifier Adjustment', value: adjustment},
    ];
    let checkPenalty = 0;
    if (this.applyCheckPenalty) {
      checkPenalty = checkPenaltyFor(this.armor, this.shield);
      breakdown.push({name: 'Check Penalty', value: checkPenalty});
    }
    let luckModifier = 0;
    if (this.applyLuckModifier) {
      luckModifier = modifierFor(this.luck);
      breakdown.push({name: 'Luck Modifier', value: luckModifier});
    }
    return {
      breakdown,
      total: agilityModifier + adjustment + checkPenalty + luckModifier,
    };
  }

  get displayAgility() {
    if (this.maxAgility === this.agility || this.agility === null) {
      return this.maxAgility;
    }
    return `${this.agility}/${this.maxAgility}`;
  }

  render() {
    return html`
      <div class="wrapper">
        <stat-display
          name="Agl"
          value="${formatModifier(this.modifier.total)}"
          base="${this.displayAgility}"
          value-clickable
          base-clickable
          @value-clicked="${this.onModifierClicked}"
          @base-clicked="${this.onStatValueClicked}"
          name-clickable
          @name-clicked="${this.onNameClick}"
        ></stat-display>
      </div>
    `;
  }

  onStatValueClicked() {
    const roll = new DiceRoll();
    roll.name = 'Agility Check';
    roll.description = 'Roll under agility check roll';
    roll.roll.qty = 1;
    roll.roll.die = this.die;
    roll.luckReverse = true;

    this.dispatchEvent(
      new CustomEvent('agility-check', {
        detail: roll,
      })
    );
  }

  onNameClick() {
    this.dispatchEvent(new CustomEvent('name-clicked'));
  }

  onModifierClicked() {
    const roll = new DiceRoll();
    roll.name = 'Skill Check';
    roll.description = 'Agility skill check roll';
    roll.roll.qty = 1;
    roll.roll.die = this.die;
    // @ts-ignore
    roll.roll.modifier = this.modifier;
    roll.maxAgility = this.maxAgility;
    roll.agility = this.agility;
    roll.luck = this.luck;

    this.dispatchEvent(
      new CustomEvent('agility-skill-check', {
        detail: roll,
      })
    );
  }
}

customElements.define('agility-stat', AgilityStat);
