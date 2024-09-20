import {LitElement, html} from 'lit';
import '../modal-dialog/modal-dialog.js';
import {styles} from './styles.js';

export class StatEditor extends LitElement {
  static styles = [styles];

  static properties = {
    open: {type: Boolean},
    maxStrength: {attribute: 'max-strength', type: Number},
    strength: {type: Number},
    maxStamina: {attribute: 'max-stamina', type: Number},
    stamina: {type: Number},
    maxAgility: {attribute: 'max-agility', type: Number},
    agility: {type: Number},
    maxIntelligence: {attribute: 'max-intelligence', type: Number},
    intelligence: {type: Number},
    maxPersonality: {attribute: 'max-personality', type: Number},
    personality: {type: Number},
    maxLuck: {attribute: 'max-luck', type: Number},
    luck: {type: Number},
  };

  constructor() {
    super();
    this.open = false;
    this.maxStrength = 0;
    this.strength = 0;
    this.maxStamina = 0;
    this.stamina = 0;
    this.maxAgility = 0;
    this.agility = 0;
    this.maxIntelligence = 0;
    this.intelligence = 0;
    this.maxPersonality = 0;
    this.personality = 0;
    this.maxLuck = 0;
    this.luck = 0;
  }

  onClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  decrement(e) {
    const stat = e.target.dataset.stat;
    this[stat] = this[stat] > 0 ? this[stat] - 1 : 0;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {stat: stat, value: this[stat]},
      })
    );
  }

  increment(e) {
    const stat = e.target.dataset.stat;
    this[stat] = this[stat] + 1;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {stat: stat, value: this[stat]},
      })
    );
  }

  render() {
    return html`
      <modal-dialog .open="${this.open}" @close="${this.onClose}">
        <div>
          <h1>Adjust Stats</h1>
          <table>
            <thead>
              <th></th>
              <th>Current</th>
              <th>Maximum</th>
            </thead>
            <tbody>
              <tr>
                <td class="first">Strength</td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="strength"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.strength}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="strength"
                  >
                    +
                  </button>
                </td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="maxStrength"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.maxStrength}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="maxStrength"
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td class="first">Agility</td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="agility"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.agility}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="agility"
                  >
                    +
                  </button>
                </td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="maxAgility"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.maxAgility}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="maxAgility"
                  >
                    +
                  </button>
                </td>
              </tr>
							<tr>
                <td class="first">Stamina</td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="stamina"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.stamina}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="stamina"
                  >
                    +
                  </button>
                </td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="maxStamina"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.maxStamina}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="maxStamina"
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td class="first">Intelligence</td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="intelligence"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.intelligence}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="intelligence"
                  >
                    +
                  </button>
                </td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="maxIntelligence"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.maxIntelligence}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="maxIntelligence"
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td class="first">Personality</td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="personality"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.personality}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="personality"
                  >
                    +
                  </button>
                </td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="maxPersonality"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.maxPersonality}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="maxPersonality"
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td class="first">Luck</td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="luck"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.luck}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="luck"
                  >
                    +
                  </button>
                </td>
                <td class="controls">
                  <button
                    class="adjustment-button"
                    @click="${this.decrement}"
                    data-stat="maxLuck"
                  >
                    -
                  </button>
                  <div class="stat-display">${this.maxLuck}</div>
                  <button
                    class="adjustment-button"
                    @click="${this.increment}"
                    data-stat="maxLuck"
                  >
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </modal-dialog>
    `;
  }
}

customElements.define('stat-editor', StatEditor);
