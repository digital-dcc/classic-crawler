import {LitElement, html, css} from 'lit';
import {modifierFor} from '../../utilities/modifier-for.js';
import {formatModifier} from '../../utilities/format-modifier.js';
import {slug} from '../../utilities/slug.js';
import '../stat-display/stat-display.js';

class DiceRoll {
  name = 'Initiative Roll';
  description = 'Initiative order roll';
  roll = {
    qty: 1,
    die: 20,
    modifier: {
      breakdown: [],
      total: 0,
    },
  };
  startingLuck;
  characterClass;
  characterLevel;
  birthAugur;
  agility;
}

export class InitDisplay extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
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
      characterClass: {attribute: 'character-class', type: String},
      characterLevel: {attribute: 'character-level', type: Number},
      agility: {type: Number},
      birthAugur: {attribute: 'birth-augur', type: String},
      startingLuck: {attribute: 'starting-luck', type: Number},
      initAdjustment: {attribute: 'init-adjustment', type: Number},
      initOverride: {attribute: 'init-override', type: Number},
    };
  }

  constructor() {
    super();
    this.characterClass = null;
    this.characterLevel = 0;
    this.agility = null;
    this.birthAugur = null;
    this.startingLuck = null;
    this.initAdjustment = 0;
    this.initOverride = null;
  }

  get init() {
    if (this.initOverride) {
      return {
        breakdown: [{name: 'Modifier Override', value: this.initOverride}],
        total: Number(this.initOverride),
      };
    }

    let total = 0;
    const breakdown = [];

    // Some character classes get to add their level to their init
    if (slug(this.characterClass || '') === 'warrior') {
      total += this.characterLevel;
      breakdown.push({name: 'Character Level', value: this.characterLevel});
    }

    // Agility modifier always modifies init
    if (this.agility) {
      total += modifierFor(this.agility);
      breakdown.push({
        name: 'Agility Modifier',
        value: modifierFor(this.agility),
      });
    }

    // The speed-of-the-cobra birth augur increases or reduces init per point of starting luck modifier
    if (slug(this.birthAugur || '') === 'speed-of-the-cobra') {
      total += modifierFor(this.startingLuck);
      breakdown.push({
        name: 'Birth Augur',
        value: modifierFor(this.startingLuck),
      });
    }

    return {
      breakdown,
      total,
    };
  }

  onInitRoll() {
    const roll = new DiceRoll();
    roll.characterClass = slug(this.characterClass || '');
    roll.characterLevel = this.characterLevel || 0;
    roll.birthAugur = slug(this.birthAugur || '');
    roll.agility = this.agility;
    roll.startingLuck = this.startingLuck;
    roll.roll.die = 20;
    roll.roll.qty = 1;
    // @ts-ignore
    roll.roll.modifier = this.init;
    this.dispatchEvent(new CustomEvent('init-roll', {detail: roll}));
  }

  render() {
    return html`
      <stat-display
        name="Init"
        value-clickable
        value="${formatModifier(this.init.total)}"
        @value-clicked="${this.onInitRoll}"
      ></stat-display>
    `;
  }
}

customElements.define('init-display', InitDisplay);
