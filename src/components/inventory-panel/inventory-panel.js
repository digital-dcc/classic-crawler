import {LitElement, html, css} from 'lit';

export class InventoryPanel extends LitElement {
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
      ul,
      li,
      h3 {
        margin: 0;
        padding: 0;
      }
      ul {
        list-style-type: none;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        border: 1px black solid;
        border-radius: 5px;
        margin: 0px;
        padding: 0 0 30px 0;
        min-height: 300px;
      }
      h2 {
        margin: 10px 0;
        padding: 0px;
        text-align: center;
        font-size: 0.8rem;
      }
      .tabs {
        display: flex;
        cursor: pointer;
      }
      .tab {
        padding: 10px 0;
        background-color: #f1f1f1;
        border: 1px solid #ccc;
        min-width: 100px;
        text-align: center;
        border-radius: 5px 5px 0 0;
      }
      .pre-tab,
      .post-tab {
        border-bottom: 1px dotted #ccc;
        display: flex;
        justify-content: right;
        align-items: center;
        padding-right: 10px;
      }
      .post-tab {
        width: 100%;
      }
      .spacer-tab {
        border-bottom: 1px dotted #ccc;
        padding: 2px;
      }
      .tab[selected] {
        background-color: #fff;
        border-bottom: 1px solid #fff;
      }
      .ac-bonus {
        font-weight: bold;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .check-penalty {
        font-weight: bold;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .speed {
        font-weight: bold;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .fumble-die {
        font-weight: bold;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .add-button {
        border: none;
        border-radius: 100%;
        width: 25px;
        height: 25px;
        background-color: #f2f2f2;
        text-align: center;
        justify-items: center;
        font-size: 0.8rem;
        line-height: 0.8rem;
        cursor: pointer;
      }
      .add-button:hover {
        background-color: #c3c3c3;
      }
      .treasure {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 20px;
      }
      .coins {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .coins h3 {
        text-align: center;
        font-size: 0.8rem;
      }
      .coins ul {
        display: flex;
        flex-direction: column;
      }
      .coins li {
        display: flex;
        gap: 5px;
        justify-content: center;
        align-items: center;
      }
      .coins span {
        width: 20px;
        padding: 10px;
      }
      .coins input {
        width: 40px;
        border: none;
        padding: 10px;
      }
      .other-treasure {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .other-treasure h3 {
        text-align: center;
        font-size: 0.8rem;
      }
      .other-treasure textarea {
        padding: 10px;
      }
      .scroll {
        overflow-y: auto;
        max-height: 300px;
      }

      .table-header {
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
        font-weight: bold;
      }

      /* Optionally, you can adjust individual columns if necessary */
      .table-cell:nth-child(1) {
        text-align: left;
        flex: 2; /* Make the first column wider */
      }

      /* Responsive styling */
      @media (max-width: 700px) {
        .tab {
          padding: 8px 10px; /* Reduce padding for smaller screens */
          font-size: 1rem; /* Reduce font size */
          border-radius: 0;
        }
        .tabs {
          flex-direction: column; /* Stack tabs vertically on small screens */
        }
        .tab {
          margin-right: 0;
          border-bottom: none;
          border-left: none;
          border-right: none;
        }
        .tab[selected] {
          border-bottom: none;
          border-left: none;
          border-right: none;
        }
        .pre-tab,
        .spacer-tab {
          display: none;
        }
        .post-tab {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .add-button {
          border-top: 1px #ccc solid;
          border-radius: 0;
          width: 100%;
          height: 35px;
          font-size: 1rem;
          line-height: 1rem;
        }
        .treasure {
          flex-direction: column;
          gap: 30px;
        }
      }
    `;
  }

  static get properties() {
    return {
      treasure: {type: String, reflect: true},
      pp: {type: Number, reflect: true},
      ep: {type: Number, reflect: true},
      gp: {type: Number, reflect: true},
      sp: {type: Number, reflect: true},
      cp: {type: Number, reflect: true},
      selected: {type: Number, state: true},
    };
  }

  constructor() {
    super();
    this.treasure = '';
    this.pp = 0;
    this.ep = 0;
    this.gp = 0;
    this.sp = 0;
    this.cp = 0;
    this.selected = 0;
    this.debounceTimeout;
  }

  selectTab(index) {
    this.selected = index;
  }

  get type() {
    switch (this.selected) {
      case 0:
        return 'weapon';
      case 1:
        return 'ammunition';
      case 2:
        return 'armor';
      case 3:
        return 'equipment';
      case 4:
        return 'mount-gear';
    }
    return 'weapon';
  }

  onAdd() {
    this.dispatchEvent(
      new CustomEvent('add-item', {
        detail: {
          type: this.type,
        },
      })
    );
  }

  onCoinChange(e) {
    this[`${e.target.name}`] = e.target.value;
    this.dispatchEvent(
      new CustomEvent('coin-change', {
        detail: {
          type: e.target.name,
          value: e.target.value,
        },
      })
    );
  }

  onTreasureChange(e) {
    this.treasure = e.target.value;
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('treasure-change', {
          detail: {
            value: this.treasure,
          },
        })
      );
    }, 300);
  }

  render() {
    return html`
      <div class="wrapper" part="wrapper">
        <h2>Inventory</h2>
        <div class="tabs">
          <div class="pre-tab"></div>
          <div
            class="tab first"
            ?selected=${this.selected === 0}
            @click=${() => this.selectTab(0)}
          >
            Weapons
          </div>
          <div class="spacer-tab"></div>
          <div
            class="tab"
            ?selected=${this.selected === 1}
            @click=${() => this.selectTab(1)}
          >
            Ammunition
          </div>
          <div class="spacer-tab"></div>
          <div
            class="tab"
            ?selected=${this.selected === 2}
            @click=${() => this.selectTab(2)}
          >
            Armor
          </div>
          <div class="spacer-tab"></div>
          <div
            class="tab"
            ?selected=${this.selected === 3}
            @click=${() => this.selectTab(3)}
          >
            Equipment
          </div>
          <div class="spacer-tab"></div>
          <div
            class="tab"
            ?selected=${this.selected === 4}
            @click=${() => this.selectTab(4)}
          >
            Mount Gear
          </div>
          <div class="spacer-tab"></div>
          <div
            class="tab last"
            ?selected=${this.selected === 5}
            @click=${() => this.selectTab(5)}
          >
            Treasure
          </div>
          <div class="post-tab">
            ${this.selected !== 5
              ? html`<button class="add-button" @click=${this.onAdd}>+</button>`
              : html``}
          </div>
        </div>
        ${this.selected === 0
          ? html` <div class="table-header">
                <div class="table-cell">Name</div>
                <div class="table-cell">Damage</div>
                <div class="table-cell">Range</div>
                <div class="table-cell">Quantity</div>
                <div class="table-cell"></div>
              </div>
              <div class="scroll">
                <slot name="weapon"></slot>
              </div>`
          : html``}
        ${this.selected === 1
          ? html` <div class="table-header">
                <div class="table-cell">Name</div>
                <div class="table-cell">Quantity</div>
                <div class="table-cell"></div>
              </div>
              <div class="scroll">
                <slot name="ammunition"></slot>
              </div>`
          : html``}
        ${this.selected === 2
          ? html` <div class="table-header">
                <div class="table-cell">Name</div>
                <div class="table-cell">Bonus</div>
                <div class="table-cell">Check</div>
                <div class="table-cell">Speed</div>
                <div class="table-cell">Fumble</div>
                <div class="table-cell">Quantity</div>
                <div class="table-cell"></div>
              </div>
              <div class="scroll"><slot name="armor"></slot></div>`
          : html``}
        ${this.selected === 3
          ? html` <div class="table-header">
                <div class="table-cell">Name</div>
                <div class="table-cell">Quantity</div>
                <div class="table-cell"></div>
              </div>
              <div class="scroll"><slot name="equipment"></slot></div>`
          : html``}
        ${this.selected === 4
          ? html` <div class="table-header">
                <div class="table-cell">Name</div>
                <div class="table-cell">Quantity</div>
                <div class="table-cell"></div>
              </div>
              <div class="scroll"><slot name="mount-gear"></slot></div>`
          : html``}
        ${this.selected === 5
          ? html` <div class="treasure">
              <div class="coins">
                <h3>Coins</h3>
                <ul>
                  <li>
                    <span>PP</span
                    ><input
                      name="pp"
                      type="number"
                      .value="${String(this.pp)}"
                      @input=${this.onCoinChange}
                    />
                  </li>
                  <li>
                    <span>EP</span
                    ><input
                      name="ep"
                      type="number"
                      .value="${String(this.ep)}"
                      @input=${this.onCoinChange}
                    />
                  </li>
                  <li>
                    <span>GP</span
                    ><input
                      name="gp"
                      type="number"
                      .value="${String(this.gp)}"
                      @input=${this.onCoinChange}
                    />
                  </li>
                  <li>
                    <span>SP</span
                    ><input
                      name="sp"
                      type="number"
                      .value="${String(this.sp)}"
                      @input=${this.onCoinChange}
                    />
                  </li>
                  <li>
                    <span>CP</span
                    ><input
                      name="cp"
                      type="number"
                      .value="${String(this.cp)}"
                      @input=${this.onCoinChange}
                    />
                  </li>
                </ul>
              </div>
              <div class="other-treasure">
                <h3>Other Treasure</h3>
                <textarea
                  .value="${this.treasure}"
                  rows="7"
                  cols="50"
                  @input=${this.onTreasureChange}
                ></textarea>
              </div>
            </div>`
          : html``}
      </div>
    `;
  }
}

customElements.define('inventory-panel', InventoryPanel);
