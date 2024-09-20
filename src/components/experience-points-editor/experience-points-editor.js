import {LitElement, html} from 'lit';
import {levelForXp, xpForNextLevel} from '../../utilities/levels.js';
import '../modal-dialog/modal-dialog.js';
import {styles} from './styles.js';

export class ExperiencePointsEditor extends LitElement {
  static styles = [styles];

  static properties = {
    open: {type: Boolean},
    level: {type: Number},
    experiencePoints: {type: Number, attribute: 'experience-points'},
    experiencePointsToAdd: {state: true},
  };

  constructor() {
    super();
    this.open = false;
    this.level = 0;
    this.experiencePoints = 0;
    this.experiencePointsToAdd = '';
  }

  onClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  onLevelChange(event) {
    this.level = event.target.value;
  }

  onSetLevel(e) {
    this.dispatchEvent(
      new CustomEvent('level-change', {
        detail: {level: this.level},
      })
    );
    e.preventDefault();
  }

  onExperiencePointsChange(event) {
    this.experiencePoints = event.target.value;
  }

  onSetExperiencePoints(e) {
    this.dispatchEvent(
      new CustomEvent('experience-points-change', {
        detail: {experiencePoints: this.experiencePoints},
      })
    );
    e.preventDefault();
  }

  onExperiencePointsToAddChange(event) {
    this.experiencePointsToAdd = event.target.value;
  }

  onAddExperiencePoints(e) {
    this.dispatchEvent(
      new CustomEvent('experience-points-change', {
        detail: {
          experiencePoints:
            Number(this.experiencePoints) + Number(this.experiencePointsToAdd),
        },
      })
    );
    this.experiencePointsToAdd = '';
    e.preventDefault();
  }

  get experiencePointsNeededMessage() {
    if (levelForXp(this.experiencePoints) === 10)
      return html`You have reached maximum level`;
    return html`You need
    ${(xpForNextLevel(levelForXp(this.experiencePoints) || 0) || 0) -
    this.experiencePoints}
    experience points to reach level
    ${(levelForXp(this.experiencePoints) || 0) + 1}`;
  }

  render() {
    return html`
      <modal-dialog .open="${this.open}" @close="${this.onClose}">
        <div>
          <h2>Experience Points</h2>
          <div>
            <form>
              <label for="set-level">Level </label>
              <div>
                <select name="set-level" @change="${this.onLevelChange}">
                  <option value="1" ?selected="${this.level === 1}">1</option>
                  <option value="2" ?selected="${this.level === 2}">2</option>
                  <option value="3" ?selected="${this.level === 3}">3</option>
                  <option value="4" ?selected="${this.level === 4}">4</option>
                  <option value="5" ?selected="${this.level === 5}">5</option>
                  <option value="6" ?selected="${this.level === 6}">6</option>
                  <option value="7" ?selected="${this.level === 7}">7</option>
                  <option value="8" ?selected="${this.level === 8}">8</option>
                  <option value="9" ?selected="${this.level === 9}">9</option>
                  <option value="10" ?selected="${this.level === 10}">
                    10
                  </option>
                </select>
                <button @click="${this.onSetLevel}">Set</button>
              </div>
            </form>
            <p>
              You have enough experience points for level
              ${levelForXp(this.experiencePoints)}
            </p>
            <hr />
            <form>
              <label for="add-experience-points">Add experience Points </label>
              <div>
                <input
                  name="add-experience-points"
                  type="number"
                  min="0"
                  @change="${this.onExperiencePointsToAddChange}"
                  .value="${String(this.experiencePointsToAdd)}"
                />
                <button @click="${this.onAddExperiencePoints}">Add</button>
              </div>
            </form>
            <hr />
            <form>
              <label for="set-experience-points">Set Experience Points </label>
              <div>
                <input
                  name="set-experience-points"
                  type="number"
                  min="0"
                  value="${this.experiencePoints}"
                  @change="${this.onExperiencePointsChange}"
                />
                <button @click="${this.onSetExperiencePoints}">Set</button>
              </div>
            </form>
            <p>${this.experiencePointsNeededMessage}</p>
          </div>
        </div>
      </modal-dialog>
    `;
  }
}

customElements.define(
  'experience-points-editor',
  ExperiencePointsEditor
);
