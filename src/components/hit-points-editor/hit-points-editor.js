import {LitElement, html} from 'lit';
import '../modal-dialog/modal-dialog.js';
import {styles} from './styles.js';

export class HitPointsEditor extends LitElement {
  static styles = [styles];

  static properties = {
    open: {type: Boolean},
    maxHP: {attribute: 'max-hp', type: Number},
    hp: {type: Number, reflect: true},
    healHitPoints: {state: true},
    damageHitPoints: {state: true},
    addMaxHitPoints: {state: true},
    setMaxHitPoints: {state: true},
  };

  constructor() {
    super();
    this.open = false;
    this.maxHP = 0;
    this.hp = 0;
    this.healHitPoints = '';
    this.damageHitPoints = '';
    this.addMaxHitPoints = '';
    this.setMaxHitPoints = '';
  }

  onClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  get healMessage() {
    if (this.hp === this.maxHP) {
      return html`<p>You are at full hit points.</p>`;
    } else if (this.hp > this.maxHP) {
      return html`<p>
        You are currently ${this.hp - this.maxHP} hit points above maximum
      </p>`;
    }
    return html`<p>
      You are currently ${this.maxHP - this.hp} hit points below maximum
    </p>`;
  }

  onHealHitPointsChange(e) {
    this.healHitPoints = e.target.value;
  }

  onHealHitPoints(e) {
    e.preventDefault();
    const newValue = Math.floor(Number(this.healHitPoints));
    if (newValue < 0) {
			this.healHitPoints = '';
      return;
    }
    this.hp += newValue;
    if (this.hp > this.maxHP) {
      this.hp = this.maxHP;
    }
    this.healHitPoints = '';
    this.dispatchChangeEvent();
  }

  onDamageHitPointsChange(e) {
    this.damageHitPoints = e.target.value;
  }

  onDamageHitPoints(e) {
    e.preventDefault();
    const newValue = Math.floor(Number(this.damageHitPoints));
    if (newValue < 0) {
			this.damageHitPoints = '';
      return;
    }
    this.hp -= newValue;
    if (this.hp < 0) {
      this.hp = 0;
    }
    this.damageHitPoints = '';
    this.dispatchChangeEvent();
  }

  onAddMaxHitPointsChange(e) {
    this.addMaxHitPoints = e.target.value;
  }

  onAddMaxHitPoints(e) {
    e.preventDefault();
		const newValue = Math.floor(Number(this.addMaxHitPoints));
		if (newValue < 0) {
			this.addMaxHitPoints = '';
			return;
		}
    this.maxHP += newValue;
    this.addMaxHitPoints = '';
    this.dispatchChangeEvent();
  }

  onSetMaxHitPointsChange(e) {
    this.setMaxHitPoints = e.target.value;
  }

  onSetMaxHitPoints(e) {
    e.preventDefault();
    // validate input value
    if (!this.setMaxHitPoints) {
      return;
    }
    const newValue = Math.floor(Number(this.setMaxHitPoints));
    if (newValue < 0) {
			this.setMaxHitPoints = '';
      return;
    }
    this.maxHP = newValue;
    if (this.hp > this.maxHP) {
      this.hp = this.maxHP;
    }
    this.setMaxHitPoints = '';
    this.dispatchChangeEvent();
  }

  dispatchChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('change', {detail: {hp: this.hp, maxHP: this.maxHP}})
    );
  }

  render() {
    return html`
      <modal-dialog .open="${this.open}" @close="${this.onClose}">
        <div>
          <h2>Hit Points (${this.hp}/${this.maxHP})</h2>
          <div>
            <form>
              <label for="heal-hit-points">Heal hit points</label>
              <div>
                <input
                  name="heal-hit-points"
                  type="number"
                  min="0"
                  @change="${this.onHealHitPointsChange}"
                  .value="${String(this.healHitPoints)}"
                />
                <button @click="${this.onHealHitPoints}">Heal</button>
              </div>
            </form>
            ${this.healMessage}
            <hr />
            <form>
              <label for="damage-hit-points">Take damage</label>
              <div>
                <input
                  name="damage-hit-points"
                  type="number"
                  min="0"
                  @change="${this.onDamageHitPointsChange}"
                  .value="${String(this.damageHitPoints)}"
                />
                <button @click="${this.onDamageHitPoints}">Damage</button>
              </div>
            </form>
            <p>Take damage to your hit points (${this.hp})</p>
            <hr />
            <form>
              <label for="add-hit-points">Gain hit points</label>
              <div>
                <input
                  name="add-hit-points"
                  type="number"
                  min="0"
                  .value="${this.addMaxHitPoints}"
                  @change="${this.onAddMaxHitPointsChange}"
                />
                <button @click="${this.onAddMaxHitPoints}">Add</button>
              </div>
            </form>
            <p>Increase your maximum hit points</p>
            <hr />
            <form>
              <label for="set-hit-points">Set hit points</label>
              <div>
                <input
                  name="set-hit-points"
                  type="number"
                  min="0"
                  .value="${String(this.maxHP)}"
                  @change="${this.onSetMaxHitPointsChange}"
                />
                <button @click="${this.onSetMaxHitPoints}">Set</button>
              </div>
            </form>
            <p>Set your maximum hit points</p>
          </div>
        </div>
      </modal-dialog>
    `;
  }
}

customElements.define('hit-points-editor', HitPointsEditor);
