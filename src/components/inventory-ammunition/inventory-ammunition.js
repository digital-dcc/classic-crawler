import {LitElement, html, css} from 'lit';
import {ammunitionStatsFor} from '../../utilities/ammunition.js';

export class InventoryAmmunition extends LitElement {
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
      .remove-button,
      .quantity-adjustment-button {
        background-color: #f2f2f2;
        text-align: center;
        justify-items: center;
        font-size: 0.8rem;
        line-height: 0.8rem;
      }
      .remove-button {
        border-radius: 100%;
        width: 25px;
        height: 25px;
      }
      .quantity-adjustment-button {
        border-radius: 5px;
        width: 40px;
        height: 25px;
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
        justify-content: right;
      }
      .gap-10 {
        gap: 10px;
      }
    `;
  }

  static get properties() {
    return {
      name: {type: String},
      quantity: {type: Number, reflect: true},
    };
  }

  constructor() {
    super();
    this.name = null;
    this.quantity = 0;
  }

  onRemove() {
    this.dispatchEvent(
      new CustomEvent('remove', {
        detail: {
          type: 'ammunition',
          name: this.name,
        },
      })
    );
  }

  incrementQuantity(amount) {
    return () => {
      this.quantity += amount;
      this.dispatchEvent(
        new CustomEvent('quantity-change', {
          detail: {
            name: this.name,
            quantity: this.quantity,
          },
        })
      );
    };
  }

  decrementQuantity(amount) {
    return () => {
      this.quantity -= amount;
      if (this.quantity < 0) {
        this.quantity = 0;
      }
      this.dispatchEvent(
        new CustomEvent('quantity-change', {
          detail: {
            name: this.name,
            quantity: this.quantity,
          },
        })
      );
    };
  }

  render() {
    const stats = ammunitionStatsFor(this.name);
    return html`
      <div class="table-row wrapper" part="wrapper">
        <div class="table-cell">${stats?.name}</div>
        <div class="table-cell gap-10">
          ${stats?.quantity > 1
            ? html`<button
                class="quantity-adjustment-button decrement-by-quantity"
                @click="${this.decrementQuantity(stats?.quantity)}"
              >
                -${stats?.quantity}
              </button>`
            : html``}
          <button
            class="quantity-adjustment-button decrement-by-one"
            @click="${this.decrementQuantity(1)}"
          >
            -1
          </button>
          ${this.quantity}
          <button
            class="quantity-adjustment-button increment-by-quantity"
            @click="${this.incrementQuantity(1)}"
          >
            +1
          </button>
          ${stats?.quantity > 1
            ? html`<button
                class="quantity-adjustment-button increment-by-one"
                @click="${this.incrementQuantity(stats?.quantity)}"
              >
                +${stats?.quantity}
              </button>`
            : html``}
        </div>
        <div class="table-cell buttons">
          <button class="remove-button" @click=${this.onRemove}>x</button>
        </div>
      </div>
    `;
  }
}

customElements.define('inventory-ammunition', InventoryAmmunition);
