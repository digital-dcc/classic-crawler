import {LitElement, html, css} from 'lit';
import {modifierFor} from '../../utilities/modifier-for.js';
import {occupations} from '../../utilities/occupations.js';
import {armorStatsFor} from '../../utilities/armor.js';
import {slug} from '../../utilities/slug.js';
import '../stat-display/stat-display.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class SpeedDisplay extends LitElement {
  static get styles() {
    return css`
      .wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
      }
      ::part(value) {
        font-size: 1.2rem;
      }
      ::part(name) {
        font-size: 0.8rem;
      }
    `;
  }

  static get properties() {
    return {
      occupation: {type: String},
      birthAugur: {attribute: 'birth-augur', type: String},
      armor: {type: String},
      startingLuck: {attribute: 'starting-luck', type: Number},
      speedAdjustment: {attribute: 'speed-adjustment', type: Number},
      speedOverride: {attribute: 'speed-override', type: Number},
    };
  }

  constructor() {
    super();
    this.occupation = null;
    this.birthAugur = null;
    this.armor = '';
    this.startingLuck = null;
    this.speedAdjustment = 0;
    this.speedOverride = null;
  }

  get speed() {
    if (this.speedOverride) return this.speedOverride;
    const occupation = occupations.get(slug(this.occupation || ''));
    const armor = armorStatsFor(this.armor);
    let baseSpeed = 30;
    if (['dwarf', 'halfling'].includes(occupation?.race || '')) baseSpeed = 20;

    // The wild child birth augur conveys 5' more/less movement per point of starting luck modifier
    let luckAdjustment = 0;
    if (slug(this.birthAugur || '') === 'wild-child') {
      luckAdjustment = modifierFor(this.startingLuck) * 5;
    }

    return (
      baseSpeed + luckAdjustment + this.speedAdjustment + armor.speedModifier
    );
  }

	onNameClick() {
    this.dispatchEvent(new CustomEvent('name-clicked'));
  }

  render() {
    return html`
      <div class="wrapper">
        <stat-display name="Speed" name-clickable @name-clicked=${this.onNameClick} value="${String(this.speed)}"></stat-display>
      </div>
    `;
  }
}

customElements.define('speed-display', SpeedDisplay);
