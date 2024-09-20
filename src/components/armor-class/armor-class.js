import {LitElement, html, css} from 'lit';
import {armor, armorSlug} from '../../utilities/armor.js';
import {modifierFor} from '../../utilities/modifier-for.js';
import '../stat-display/stat-display.js';

// @ts-ignore
export class ArmorClass extends LitElement {
  static get styles() {
    return css`
      .wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
      }
      .shield {
        padding: 5px;
        height: 100%;
        width: 100%;
        border: 1px solid black;
        border-radius: 50% 50% 50% 50% / 12% 12% 88% 88%;
        box-sizing: border-box;
      }
      h2,
      div {
        margin: 0;
        padding: 0;
      }
      .title {
        font-size: 0.8rem;
        text-align: center;
      }
      .armor-class-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .armor-class {
        margin-top: 15px;
        font-size: 2.5rem;
        display: absolute;
        top: 50%;
        left: 50%;
      }
      button {
        margin: 0 auto;
        display: block;
        border: 0;
        background-color: unset;
      }
      .clickable:hover {
        background-color: rgba(211, 211, 211, 0.5);
      }
      .clickable {
        cursor: pointer;
      }
      .clickable:active {
        transform: translateY(1px);
      }
    `;
  }

  static get properties() {
    return {
      armor: {type: String},
      agility: {type: Number},
      adjustment: {type: Number},
      shield: {type: Boolean},
      override: {type: Number},
    };
  }

  constructor() {
    super();
    this.armor = '(Unarmored)';
    this.agility = null;
    this.adjustment = 0;
    this.shield = false;
    this.override = null;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="shield">
          <h2 class="title" part="title">
            <button
              @click=${() =>
                this.dispatchEvent(new CustomEvent('name-clicked'))}
              class="clickable"
            >
              Armor Class
            </button>
          </h2>
          <div class="armor-class-wrapper">
            <div class="armor-class">${this.armorClass}</div>
          </div>
        </div>
      </div>
    `;
  }

  get armorClass() {
    const armorBonus = armor.get(armorSlug(this.armor) || '')?.bonus || 0;
    const baseAC = 10;
    const agilityModifier = modifierFor(this.agility);
    const shieldValue = this.shield ? 1 : 0;
    return this.override
      ? this.override
      : baseAC + this.adjustment + agilityModifier + armorBonus + shieldValue;
  }
}

customElements.define('armor-class', ArmorClass);
