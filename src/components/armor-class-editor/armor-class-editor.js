import {LitElement, html} from 'lit';
import {armor, armorSlug} from '../../utilities/armor.js';
import {formatModifier} from '../../utilities/format-modifier.js';
import {modifierFor} from '../../utilities/modifier-for.js';
import '../modal-dialog/modal-dialog.js';
import {styles} from './styles.js';

export class ArmorClassEditor extends LitElement {
  static styles = [styles];

  static properties = {
    open: {type: Boolean},
    armor: {type: String},
    agility: {type: Number},
    adjustment: {type: Number},
    shield: {type: Boolean},
  };

  constructor() {
    super();
    this.open = false;
    this.armor = '(Unarmored)';
    this.agility = null;
    this.adjustment = 0;
    this.shield = false;
  }

  onClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  get armorClass() {
    const armorBonus = armor.get(armorSlug(this.armor) || '')?.bonus || 0;
    const baseAC = 10;
    const agilityModifier = modifierFor(this.agility);
    const shieldValue = this.shield ? 1 : 0;
    return {
      base: baseAC,
      agility: formatModifier(agilityModifier),
      armor: formatModifier(armorBonus),
      shield: formatModifier(shieldValue),
      adjustment: formatModifier(this.adjustment),
      total:
        baseAC + this.adjustment + agilityModifier + armorBonus + shieldValue,
    };
  }

  decrement() {
    if (this.armorClass.total > 0) this.adjustment--;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {adjustment: this.adjustment},
      })
    );
  }

  increment() {
    this.adjustment++;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {adjustment: this.adjustment},
      })
    );
  }

  render() {
    const ac = this.armorClass;
    return html`
      <modal-dialog .open="${this.open}" @close="${this.onClose}">
        <div>
          <h1>Armor Class</h1>
          <table>
            <tbody>
              <tr>
                <td class="first">Base</td>
                <td class="">${ac.base}</td>
              </tr>
              <tr>
                <td class="first">Agility</td>
                <td class="">${ac.agility}</td>
              </tr>
              ${Number(ac.armor) !== 0
                ? html`<tr>
                    <td class="first">Armor (${this.armor})</td>
                    <td class="">${ac.armor}</td>
                  </tr>`
                : html``}
              ${Number(ac.shield) !== 0
                ? html`<tr>
                    <td class="first">Shield</td>
                    <td class="">${ac.shield}</td>
                  </tr>`
                : html``}

              <tr>
                <td class="first">Adjustment</td>
                <td class="controls">
                  <button class="adjustment-button" @click="${this.decrement}">
                    -
                  </button>
                  <div class="stat-display">${ac.adjustment}</div>
                  <button class="adjustment-button" @click="${this.increment}">
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td class="first">Total</td>
                <td class="">${ac.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </modal-dialog>
    `;
  }
}

customElements.define('armor-class-editor', ArmorClassEditor);
