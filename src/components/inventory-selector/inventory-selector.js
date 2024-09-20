import {LitElement, html, css} from 'lit';
import {weapons} from '../../utilities/weapons.js';
import {armor} from '../../utilities/armor.js';
import {ammunition} from '../../utilities/ammunition.js';
import {equipment} from '../../utilities/equipment.js';
import {mountsAndGear} from '../../utilities/mounts-and-gear.js';

import '../modal-dialog/modal-dialog.js';
import '../add-button/add-button.js';
import '../format-coins/format-coins.js';

export class InventorySelector extends LitElement {
  static styles = css`
    :host {
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
    h2 {
      text-align: center;
      margin: 0 0 10px 0;
      padding: 0;
      font-size: 1rem;
    }
    .wrapper {
      width: 500px;
      height: 300px;
      overflow-y: scroll; /* Enables vertical scrolling */
      overflow-x: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.8rem;
      text-align: left;
      background-color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    table thead {
      position: sticky;
      top: 0;
      z-index: 1;
    }
    table thead tr {
      background-color: #f2f2f2;
      color: black;
      text-align: left;
      font-weight: bold;
    }

    table th,
    table td {
      padding: 12px 15px;
      border-bottom: 1px solid #dddddd;
    }

    table tbody tr:hover {
      background-color: #f1f1f1;
      cursor: pointer;
    }

    table tbody tr.active-row {
      font-weight: bold;
      color: #009879;
    }
    table th:first-child,
    table td:first-child {
      width: auto;
    }
    table th:nth-child(2),
    table td:nth-child(2) {
      width: 30px;
    }
    table th:nth-child(3),
    table td:nth-child(3) {
      width: 30px;
    }

    @media (max-width: 700px) {
      .wrapper {
        width: unset;
      }
    }
  `;

  static properties = {
    type: {type: String},
    open: {type: Boolean},
  };

  constructor() {
    super();
    this.type = '';
    this.open = false;
  }

  get displayType() {
    // @ts-ignore
    return (this.type.charAt(0).toUpperCase() + this.type.slice(1)).replaceAll(
      '-',
      ' '
    );
  }

  get sortByName() {
    return (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    };
  }

  get formatObject() {
    return ({name, quantity, cost}) => ({
      name,
      displayName: quantity ? `${name} (${quantity})` : name,
      quantity,
      cost,
    });
  }

  get collection() {
    if (this.type === 'weapon')
      return Array.from(weapons.values())
        .filter((item) => item.name !== 'Unarmed')
        .map(this.formatObject)
        .sort(this.sortByName);
    if (this.type === 'armor')
      return Array.from(armor.values())
        .filter((item) => item.name && item.name !== 'Unarmored')
        .map(this.formatObject)
        .sort(this.sortByName);
    if (this.type === 'ammunition')
      return Array.from(ammunition.values())
        .filter((item) => item.name)
        .map(this.formatObject)
        .sort(this.sortByName);
    if (this.type === 'equipment')
      return Array.from(equipment.values())
        .filter((item) => item.name)
        .map(this.formatObject)
        .sort(this.sortByName);
    if (this.type === 'mount-gear')
      return Array.from(mountsAndGear.values())
        .filter((item) => item.name)
        .map(this.formatObject)
        .sort(this.sortByName);
    return [];
  }

  addItem(item) {
    return () => {
      this.dispatchEvent(
        new CustomEvent('add-item', {
          detail: {
            name: item.name,
            type: this.type,
            quantity: item.quantity,
            cost: item.cost,
          },
        })
      );
    };
  }

  onClose() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  render() {
    return html`
      <modal-dialog ?open="${this.open}" @close="${this.onClose}">
        <h2>${this.displayType}</h2>
        <div class="wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cost</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${this.collection.map(
                (item) =>
                  html`<tr>
                    <td>${item.displayName}</td>
                    <td><format-coins gp="${item.cost}"></format-coins></td>
                    <td>
                      <add-button @click="${this.addItem(item)}"></add-button>
                    </td>
                  </tr>`
              )}
            </tbody>
          </table>
        </div>
      </modal-dialog>
    `;
  }
}

customElements.define('inventory-selector', InventorySelector);
