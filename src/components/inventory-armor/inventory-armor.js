import {LitElement, html, css} from 'lit';
import {armorStatsFor} from '../../utilities/armor.js';

export class InventoryArmor extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
        margin: 0px;
        font-family: var(
          --primary-font,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Helvetica,
          Arial,
          sans-serif,
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol'
        );
      }
      button {
        border: none;
        margin: 0px;
        padding: 0px;
        background: none;
        cursor: pointer;
      }
      .equip-button {
        padding: 5px;
        border-radius: 5px;
      }
      .equip-button:hover {
        background-color: #f2f2f2;
      }
      .remove-button {
        border-radius: 100%;
        width: 25px;
        height: 25px;
        background-color: #f2f2f2;
        text-align: center;
        justify-items: center;
        font-size: 0.8rem;
        line-height: 0.8rem;
      }
      .remove-button:hover {
        background-color: #c3c3c3;
      }
      .table-row {
        display: flex;
        justify-content: space-between; /* Optional: Helps with spacing */
        width: 100%;
        border-bottom: 1px black dotted; /* Just for visual separation */
      }
      .table-cell {
        flex: 1; /* Equal width for each column */
        padding: 10px;
        box-sizing: border-box;
        text-align: center; /* Center the text */
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .table-cell:nth-child(1) {
        justify-content: left;
        flex: 2; /* Make the first column wider */
      }
      .buttons {
        display: flex;
        justify-content: right;
        align-items: center;
        gap: 10px;
      }
    `;
  }

  static get properties() {
    return {
      name: {type: String},
      equipped: {type: Boolean, reflect: true},
      quantity: {type: Number, reflect: true},
    };
  }

  constructor() {
    super();
    this.name = null;
    this.equipped = false;
    this.quantity = 1;
  }

  onTogglEquip() {
    this.equipped = !this.equipped;
    this.dispatchEvent(
      new CustomEvent(this.equipped ? 'equip' : 'unequip', {
        detail: {
          name: this.name,
        },
      })
    );
    this.dispatchEvent(
      new CustomEvent('toggle-equip', {
        detail: {
          name: this.name,
          equipped: this.equipped,
        },
      })
    );
  }

  onRemove() {
    this.dispatchEvent(
      new CustomEvent('remove', {
        detail: {
          type: 'armor',
          name: this.name,
        },
      })
    );
  }

  render() {
    const stats = armorStatsFor(this.name);
    return html`
      <div class="table-row wrapper" part="wrapper">
        <div class="table-cell">${this.name}</div>
        <div class="table-cell">${stats?.bonus}</div>
        <div class="table-cell">${stats?.checkPenalty}</div>
        <div class="table-cell">${stats?.speedModifier}</div>
        <div class="table-cell">${stats?.fumbleDie}</div>
        <div class="table-cell">${this.quantity}</div>
        <div class="table-cell buttons">
          <button class="equip-button" @click=${this.onTogglEquip}>
            ${this.equipped ? 'unequip' : 'equip'}
          </button>
          <button class="remove-button" @click=${this.onRemove}>x</button>
        </div>
      </div>
    `;
  }
}

customElements.define('inventory-armor', InventoryArmor);
