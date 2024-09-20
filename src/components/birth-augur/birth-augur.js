import {LitElement, html, css} from 'lit';
import {birthAugurs} from '../../utilities/birth-augur.js';
import {modifierFor} from '../../utilities/modifier-for.js';
import {slug} from '../../utilities/slug.js';

export class BirthAugur extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
				margin: 0px;
				width: 100%;
				height: 100%; /* Ensure the custom element fills the height */
      	box-sizing: border-box;
      }
      .wrapper {
				box-sizing: border-box;
        border-radius: 5px;
        border: 1px black solid;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
				height: 100%;
				width: 100%;
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
        font-size: 1rem;
        align-items: center;
        padding: 10px;
      }
      h2,
      h3,
      h4,
      p {
        margin: 0;
        margin-bottom: 5px;
        padding: 0;
      }
      h2 {
        font-size: 0.8rem;
      }
			h3, h4 {
				font-size: 1rem;
			}
			h4 {
				font-weight: normal;
			}
    `;
  }

  static get properties() {
    return {
      characterClass: {attribute: 'character-class', type: String},
      birthAugur: {attribute: 'birth-augur', type: String},
      startingLuck: {attribute: 'starting-luck', type: String},
    };
  }

  constructor() {
    super();
    this.characterClass = null;
    this.birthAugur = null;
    this.startingLuck = null;
  }

  extra(augur) {
    if (!augur.extra) return html``;
    if (augur.extra[this.characterClass]) return html`${augur.extra[this.characterClass]}`;
    return html`${augur.extra.all}`;
  }

  render() {
    const augur = birthAugurs.get(slug(this.birthAugur)) || {
      birthAugur: '',
      luckyRoll: '',
      extra: '',
    }; // pointless TS appeasement
    return html`
      <div part="wrapper" class="wrapper">
        <h2>Birth Augur and Lucky Roll</h2>
        <h3>${augur.birthAugur}</h3>
        <h4>${augur.luckyRoll} ${this.luckModifier(augur)}</h4>
        <p>${this.extra(augur)}</p>
      </div>
    `;
  }

  luckModifier(augur) {
    let modifier = modifierFor(this.startingLuck);
    if (modifier === 0) return html`(no effect)`;

    // doubles luck effect on crits
    if (augur.birthAugur === 'Warrior’s arm') {
      modifier = modifier * 2;
    }

    // doubles luck effect on fumbles (lower is better)
    if (augur.birthAugur === 'The Broken Star') {
      modifier = modifier * -2;
    }

    // adjusts character movement rate
    if (augur.birthAugur === 'Wild child') {
      modifier = modifier * 5;
      return html`(${modifier > 0 ? `+${modifier} ft` : `${modifier} ft`})`;
    }

    return html`(${modifier > 0 ? `+${modifier}` : modifier})`;
  }
}

customElements.define('birth-augur', BirthAugur);
