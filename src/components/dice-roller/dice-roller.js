import {LitElement, html} from 'lit';
import {diceChain} from '../../utilities/dice-chain.js';
import {formatModifier} from '../../utilities/format-modifier.js';
import {slug} from '../../utilities/slug.js';
import {characterClasses} from '../../utilities/character-classes.js';
import '../modal-dialog/modal-dialog.js';
import {styles} from './styles.js';

class DiceRollResult {
  #diceRolls = [];
  #modifier = 0;
  #multiplier = 1;
  #luckBurn = 0;
  name = '';
  description = '';

  addRoll(roll) {
    this.#diceRolls.push(roll);
  }

  set modifier(modifier) {
    this.#modifier = modifier;
  }

  get modifier() {
    return this.#modifier;
  }

  set multiplier(multiplier) {
    this.#multiplier = multiplier;
  }

  get multiplier() {
    return this.#multiplier;
  }

  get rolls() {
    return this.#diceRolls.map((roll) => roll.roll);
  }

  get diceRollTotal() {
    let total = 0;
    for (const roll of this.#diceRolls) {
      total += roll.roll;
    }
    return total;
  }

  get total() {
    return (this.diceRollTotal + this.#modifier) * this.#multiplier;
  }
}

export class DiceRoller extends LitElement {
  static styles = [styles];

  static properties = {
    diceRoll: {attribute: false, type: Object},
    currentLuck: {attribute: 'current-luck', type: String},
    characterClass: {attribute: 'character-class', type: String},
    level: {type: Number},
    open: {type: Boolean, state: true},
    qtyAdjustment: {type: Number, state: true},
    dieAdjustment: {type: Number, state: true},
    modifierAdjustment: {type: Number, state: true},
    rollResult: {type: Number, state: true},
    luckBurn: {type: Number, state: true},
    luckBurnComplete: {type: Boolean, state: true},
    luckBurnValue: {type: Number, state: true},
    rollResultText: {type: String, state: true},
  };

  constructor() {
    super();
    this.diceRoll = null;
    this.currentLuck = null;
    this.characterClass = null;
    this.level = 0;
    this.open = false;
    this.qtyAdjustment = 0;
    this.dieAdjustment = 0;
    this.modifierAdjustment = 0;
    this.rollResult = null;
    this.luckBurn = 0;
    this.luckBurnComplete = false;
    this.luckBurnValue = 0;
    this.luckBurnThiefRolls = '';
    this.rollResultText = '';
  }

  updated() {
    if (this.diceRoll) {
      this.open = true;
    }
  }

  get qty() {
    return this.diceRoll?.roll?.qty + this.qtyAdjustment;
  }

  get die() {
    const index =
      diceChain.indexOf(`d${this.diceRoll?.roll?.die}`) + this.dieAdjustment;
    return diceChain[index];
  }

  get modifier() {
    return this.diceRoll?.roll?.modifier?.total + this.modifierAdjustment;
  }

  get modifierBreakdown() {
    const breakdowns = this.diceRoll?.roll?.modifier?.breakdown
      ?.filter(({value}) => value > 0 || value < 0)
      ?.map(({name, value}) => {
        return html`<li class="modifier-breakdown-entry">
          <span>${name}</span><span>${formatModifier(value)}</span>
        </li>`;
      });

    if (this.diceRoll?.roll.multiplier && this.diceRoll?.roll.multiplier > 1) {
      breakdowns.push(html`<li class="modifier-breakdown-entry">
        <span>Damage Multiplier</span
        ><span>x${this.diceRoll?.roll.multiplier}</span>
      </li>`);
    }

    return breakdowns;
  }

  incrementQuantity() {
    this.qtyAdjustment++;
  }

  decrementQuantity() {
    if (this.qty === 1) return;
    this.qtyAdjustment--;
  }

  incrementLuckBurn() {
    // you can burn up to current luck score and no more
    if (this.luckBurn >= this.currentLuck) return;
    this.luckBurn++;
  }

  decrementLuckBurn() {
    // you cant burn negative luck
    if (this.luckBurn <= 0) return;
    this.luckBurn--;
  }

  get highestDie() {
    return diceChain[diceChain.length - 1];
  }

  get lowestDie() {
    return diceChain[0];
  }

  incrementDie() {
    if (this.die === this.highestDie) return;
    this.dieAdjustment++;
  }

  decrementDie() {
    if (this.die === this.lowestDie) return;
    this.dieAdjustment--;
  }

  incrementModifier() {
    this.modifierAdjustment++;
  }

  decrementModifier() {
    this.modifierAdjustment--;
  }

  roll() {
    const rollResult = new DiceRollResult();
    rollResult.name = this.diceRoll?.name;
    rollResult.description = this.diceRoll?.description;
    rollResult.modifier = this.modifier;
    rollResult.multiplier = this.diceRoll?.roll.multiplier || 1;

    const qty = this.qty || 1;
    const die = this.die?.split('d')[1] || 20;

    for (let i = 0; i < qty; i++) {
      const roll = Math.floor(Math.random() * Number(die)) + 1;
      rollResult.addRoll({die, roll});
    }

    this.rollResult = rollResult;
    this.rollResultText =
      this.diceRoll?.roll?.result &&
      this.diceRoll?.roll?.result(Number(rollResult.total));

    // this isnt going to work well with luck burn as it stands
    // do we need this??
    this.dispatchEvent(
      new CustomEvent('dice-roll-result', {
        detail: rollResult,
      })
    );
  }

  burnLuck() {
    if (this.luckBurn <= 0) return;
    this.luckBurnComplete = true;
    if (slug(this.characterClass) === 'halfling') {
      this.luckBurnThiefRolls = ` - x2`;
      this.luckBurnValue = this.luckBurn * 2;
    } else if (slug(this.characterClass) === 'thief') {
      // get the thief's luck die (d3, d4 etc)
      const luckDie = characterClasses.get('thief')?.get(this.level)?.luckDie;
      // drop the d in d4 etc
      const die = Number(luckDie?.split('d')[1]);
      const results = [];
      // roll as many of that die as luck points burned.
      for (let i = 0; i < this.luckBurn; i++) {
        results.push(Math.floor(Math.random() * die) + 1);
      }
      this.luckBurnThiefRolls = ` - ${this.luckBurn}${luckDie} [${results.join(
        ', '
      )}]`;
      const total = results.reduce((a, b) => a + b, 0);
      this.luckBurnValue = total;
    } else {
      this.luckBurnValue = this.luckBurn;
    }
    if (this.diceRoll.luckReverse) {
      this.luckBurnValue = this.luckBurnValue * -1;
    }
    this.rollResultText =
      this.diceRoll?.roll?.result &&
      this.diceRoll?.roll?.result(
        Number(this.rollResult?.total) + Number(this.luckBurnValue)
      );
    this.dispatchEvent(
      new CustomEvent('luck-burn', {
        detail: {luck: this.currentLuck - this.luckBurn},
      })
    );
  }

  onClose() {
    // this.open = false;
    this.rollResult = null;
    this.diceRoll = null;
    this.qtyAdjustment = 0;
    this.dieAdjustment = 0;
    this.modifierAdjustment = 0;
    this.luckBurn = 0;
    this.luckBurnValue = 0;
    this.luckBurnComplete = false;
    this.luckBurnThiefRolls = '';
    this.rollResultText = '';
    this.dispatchEvent(new CustomEvent('close'));
  }

  render() {
    return html`
      <modal-dialog .open="${this.open}" @close="${this.onClose}">
        <h1>${this.diceRoll?.name}</h1>
        <p class="roll-description">${this.diceRoll?.description}</p>
        ${this.modifierBreakdown?.length
          ? html`<ul class="modifier-breakdown">
              ${this.modifierBreakdown}
            </ul>`
          : html``}
        <div class="roll-adjustment">
          <div class="roll-adjustment-section">
            <button @click="${this.decrementQuantity}">-</button>
            <div class="value qty-value">${this.qty}</div>
            <button @click="${this.incrementQuantity}">+</button>
          </div>
          <div class="roll-adjustment-section">
            <button @click="${this.decrementDie}">-</button>
            <div class="value die-value">${this.die}</div>
            <button @click="${this.incrementDie}">+</button>
          </div>
          <div class="roll-adjustment-section">
            <button @click="${this.decrementModifier}">-</button>
            <div class="value modifier-value">
              ${formatModifier(this.modifier)}
            </div>
            <button @click="${this.incrementModifier}">+</button>
          </div>
        </div>
        <div>
          <button class="roll-button mt-10" @click="${this.roll}">Roll</button>
        </div>
        <div class="roll-result">
          ${this.rollResult
            ? html`
                <div class="die-result">
                  <p>${this.rollResult.rolls.join(', ')}</p>
                </div>
                <div class="roll-modifier">
                  <div>Modifier</div>
                  <div>${formatModifier(this.rollResult.modifier)}</div>
                </div>

                ${this.diceRoll.disableLuckBurn
                  ? html``
                  : html` <div class="luck-burn">
                      <div class="roll-adjustment">
                        Luck Burn ${this.luckBurnThiefRolls}
                        ${this.luckBurnComplete
                          ? html``
                          : html`
                              <div class="roll-adjustment-section">
                                <button @click="${this.decrementLuckBurn}">
                                  -
                                </button>
                                <div class="value">
                                  ${this.luckBurn} / ${this.currentLuck}
                                </div>
                                <button @click="${this.incrementLuckBurn}">
                                  +
                                </button>
                              </div>
                            `}
                        ${this.luckBurnComplete
                          ? html`<span
                              >${formatModifier(this.luckBurnValue)}</span
                            >`
                          : html`<button
                              class="luck-burn-button${this.luckBurn > 0
                                ? ''
                                : ' disabled'}"
                              @click="${this.burnLuck}"
                            >
                              burn
                            </button>`}
                      </div>
                    </div>`}

                <div class="final-total mt-10 pt-10">
                  <div>Total</div>
                  <div>${this.rollResult.total + this.luckBurnValue}</div>
                </div>

                ${this.rollResultText &&
                html`
                  <div class="final-total mt-10 pt-10">
                    <div>Result</div>
                    <div class="result-text">${this.rollResultText}</div>
                  </div>
                `}
              `
            : html``}
        </div>
      </modal-dialog>
    `;
  }
}

customElements.define('dice-roller', DiceRoller);
