import {LitElement, html} from 'lit';
import {modifierFor} from '../../utilities/modifier-for.js';
import {formatModifier} from '../../utilities/format-modifier.js';
import {occupations} from '../../utilities/occupations.js';
import {armorStatsFor} from '../../utilities/armor.js';
import {slug} from '../../utilities/slug.js';
import '../modal-dialog/modal-dialog.js';
import {styles} from './styles.js';

export class SpeedEditor extends LitElement {
  static styles = [styles];

  static properties = {
    open: {type: Boolean},
    occupation: {type: String},
    birthAugur: {attribute: 'birth-augur', type: String},
    armor: {type: String},
    startingLuck: {attribute: 'starting-luck', type: Number},
    speedAdjustment: {attribute: 'speed-adjustment', type: Number},
  };

  constructor() {
    super();
    this.open = false;
    this.occupation = null;
    this.birthAugur = null;
    this.armor = '';
    this.startingLuck = null;
    this.speedAdjustment = 0;
  }

  onClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  decrement() {
    if (this.speed.total > 0) this.speedAdjustment -= 5;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {speedAdjustment: this.speedAdjustment},
      })
    );
  }

  increment() {
    this.speedAdjustment = this.speedAdjustment + 5;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {speedAdjustment: this.speedAdjustment},
      })
    );
  }

  get speed() {
    const occupation = occupations.get(slug(this.occupation || ''));
    const armor = armorStatsFor(this.armor);
    let baseSpeed = 30;
    if (['dwarf', 'halfling'].includes(occupation?.race || '')) baseSpeed = 20;

    let luckAdjustment = 0;
    if (slug(this.birthAugur || '') === 'wild-child') {
      luckAdjustment = modifierFor(this.startingLuck) * 5;
    }

    return {
      armor: armor.speedModifier,
      birthAugur: luckAdjustment,
      base: baseSpeed,
      total:
        baseSpeed + luckAdjustment + this.speedAdjustment + armor.speedModifier,
    };
  }

  render() {
    const speed = this.speed;

    return html`
      <modal-dialog .open="${this.open}" @close="${this.onClose}">
        <div>
          <h1>Speed</h1>
          <table>
            <tbody>
              <tr>
                <td class="first">Base</td>
                <td class="">${speed.base}</td>
              </tr>
              <tr>
                <td class="first">Armor</td>
                <td class="">${formatModifier(speed.armor)}</td>
              </tr>
              ${this.speed.birthAugur
                ? html`
                    <tr>
                      <td class="first">Birth Augur</td>
                      <td class="">${formatModifier(speed.birthAugur)}</td>
                    </tr>
                  `
                : html``}
              <tr>
                <td class="first">Adjustment</td>
                <td class="controls">
                  <button class="adjustment-button" @click="${this.decrement}">
                    -
                  </button>
                  <div class="stat-display">
                    ${formatModifier(this.speedAdjustment)}
                  </div>
                  <button class="adjustment-button" @click="${this.increment}">
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td class="first">Total</td>
                <td class="">${speed.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </modal-dialog>
    `;
  }
}

customElements.define('speed-editor', SpeedEditor);
