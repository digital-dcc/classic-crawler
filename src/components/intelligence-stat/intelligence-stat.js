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
  maxIntelligence;
  intelligence;
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
export class IntelligenceStat extends LitElement {
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
      maxIntelligence: {attribute: 'max-intelligence', type: Number},
      intelligence: {type: Number},
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
    this.maxIntelligence = null;
    this.intelligence = null;
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
    const intelligenceModifier = modifierFor(
      this.intelligence || this.maxIntelligence
    );
    const adjustment = this.modifierAdjustment;
    const breakdown = [
      {name: 'Intelligence Modifier', value: intelligenceModifier},
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
      total: intelligenceModifier + adjustment + checkPenalty + luckModifier,
    };
  }

  get displayIntelligence() {
    if (
      this.maxIntelligence === this.intelligence ||
      this.intelligence === null
    ) {
      return this.maxIntelligence;
    }
    return `${this.intelligence}/${this.maxIntelligence}`;
  }

  render() {
    return html`
      <div class="wrapper">
        <stat-display
          name="Int"
          value="${formatModifier(this.modifier.total)}"
          base="${this.displayIntelligence}"
          value-clickable
          @value-clicked="${this.onModifierClicked}"
          name-clickable
          @name-clicked="${this.onNameClick}"
          base-clickable
          @base-clicked="${this.onStatValueClicked}"
        ></stat-display>
      </div>
    `;
  }

  onNameClick() {
    this.dispatchEvent(new CustomEvent('name-clicked'));
  }

  onStatValueClicked() {
    const roll = new DiceRoll();
    roll.name = 'Intelligence Check';
    roll.description = 'Roll under intelligence check roll';
    roll.roll.qty = 1;
    roll.roll.die = this.die;
    roll.luckReverse = true;

    this.dispatchEvent(
      new CustomEvent('intelligence-check', {
        detail: roll,
      })
    );
  }

  onModifierClicked() {
    const roll = new DiceRoll();
    roll.name = 'Skill Check';
    roll.description = 'Intelligence skill check roll';
    roll.roll.qty = 1;
    roll.roll.die = this.die;
    // @ts-ignore
    roll.roll.modifier = this.modifier;
    roll.maxIntelligence = this.maxIntelligence;
    roll.intelligence = this.intelligence;
    roll.luck = this.luck;

    this.dispatchEvent(
      new CustomEvent('intelligence-skill-check', {
        detail: roll,
      })
    );
  }
}

customElements.define('intelligence-stat', IntelligenceStat);
