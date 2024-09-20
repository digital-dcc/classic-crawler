import {LitElement, html, css} from 'lit';
import {armor, armorSlug} from '../../utilities/armor.js';
import {formatModifier} from '../../utilities/format-modifier.js';

export class CheckPenalty extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
      }
      .wrapper {
        min-height: 25px;
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
        padding: 0px 10px;
      }
      .border {
        border-radius: 5px;
        border: 1px black solid;
      }
    `;
  }

  static get properties() {
    return {
      armor: {type: String, reflect: true},
      shield: {type: Boolean, reflect: true},
      checked: {type: Boolean, reflect: true},
      displayModifier: {
        attribute: 'display-modifier',
        type: Boolean,
        reflect: true,
      },
      displayBorder: {
        attribute: 'display-border',
        type: Boolean,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.armor = null;
    this.shield = false;
    this.checked = false;
    this.displayModifier = false;
    this.displayBorder = false;
  }

  onChange() {
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {checked: this.checked, penalty: this.checkPenalty},
      })
    );
  }

  get checkPenalty() {
    let penalty = armor.get(armorSlug(this.armor || ''))?.checkPenalty || 0;
    if (this.shield) penalty = penalty - 1;
    return penalty;
  }

  render() {
    return html`
      <div part="wrapper" class="wrapper ${this.displayBorder ? 'border' : ''}">
        <input
          type="checkbox"
          id="check-penalty"
          name="check-penalty"
          .checked="${this.checked}"
          @change="${this.onChange}"
        />
        <label class="label" part="label" for="check-penalty"
          >Check Penalty
          ${this.displayModifier
            ? `(${formatModifier(this.checkPenalty)})`
            : ''}</label
        >
      </div>
    `;
  }
}

customElements.define('check-penalty', CheckPenalty);
