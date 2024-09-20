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
  maxLuck;
  luck;
  disableLuckBurn = true;
}

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class LuckStat extends LitElement {
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
      maxLuck: {attribute: 'max-luck', type: Number},
      luck: {type: Number},
      dieAdjustment: {attribute: 'die-adjustment', type: Number},
      modifierAdjustment: {attribute: 'modifier-adjustment', type: Number},
      dieOverride: {attribute: 'die-override', type: Number},
      modifierOverride: {attribute: 'modifier-override', type: Number},
      armor: {type: String},
      shield: {type: Boolean},
      applyCheckPenalty: {attribute: 'apply-check-penalty', type: Boolean},
    };
  }

  constructor() {
    super();
    this.maxLuck = null;
    this.luck = null;
    this.dieAdjustment = 0;
    this.dieOverride = null;
    this.modifierAdjustment = 0;
    this.modifierOverride = null;
    this.armor = null;
    this.shield = null;
    this.applyCheckPenalty = false;
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
    const luckModifier = modifierFor(this.luck || this.maxLuck);
    const adjustment = this.modifierAdjustment;
    const breakdown = [
      {name: 'Luck Modifier', value: luckModifier},
      {name: 'Modifier Adjustment', value: adjustment},
    ];
    let checkPenalty = 0;
    if (this.applyCheckPenalty) {
      checkPenalty = checkPenaltyFor(this.armor, this.shield);
      breakdown.push({name: 'Check Penalty', value: checkPenalty});
    }
    return {
      breakdown,
      total: luckModifier + adjustment + checkPenalty,
    };
  }

  get displayLuck() {
    if (this.maxLuck === this.luck || this.luck === null) {
      return this.maxLuck;
    }
    return `${this.luck}/${this.maxLuck}`;
  }

  render() {
    return html`
      <div class="wrapper">
        <stat-display
          name="Luck"
          value="${this.displayLuck}"
          base="${formatModifier(this.modifier.total)}"
          value-clickable
          base-clickable
          @base-clicked="${this.onLuckModifierClick}"
          @value-clicked="${this.onLuckScoreClick}"
          name-clickable
          @name-clicked="${this.onNameClick}"
        ></stat-display>
      </div>
    `;
  }

  onNameClick() {
    this.dispatchEvent(new CustomEvent('name-clicked'));
  }

  onLuckModifierClick() {
    const roll = new DiceRoll();
    roll.name = 'Skill Check';
    roll.description = 'Luck skill check roll';
    roll.roll.qty = 1;
    roll.roll.die = this.die;
    // @ts-ignore
    roll.roll.modifier = this.modifier;
    roll.maxLuck = this.maxLuck;
    roll.luck = this.luck;

    this.dispatchEvent(
      new CustomEvent('luck-skill-check', {
        detail: roll,
      })
    );
  }

  onLuckScoreClick() {
    const roll = new DiceRoll();
    roll.name = 'Luck Check';
    roll.description = 'Roll under luck check roll';
    roll.roll.qty = 1;
    roll.roll.die = 20;
    roll.maxLuck = this.maxLuck;
    roll.luck = this.luck;

    this.dispatchEvent(
      new CustomEvent('luck-check', {
        detail: roll,
      })
    );
  }
}

customElements.define('luck-stat', LuckStat);
