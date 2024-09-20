import {LitElement, html, css} from 'lit';

export class UntrainedInput extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
      }
      .wrapper {
        border-radius: 5px;
        border: 1px black solid;
        display: flex;
        justify-content: space-between;
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
    `;
  }

  static get properties() {
    return {
      checked: {type: Boolean, reflect: true},
    };
  }

  constructor() {
    super();
    this.armor = null;
    this.shield = false;
    this.checked = false;
  }

  onChange() {
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {checked: this.checked},
      })
    );
  }

  render() {
    return html`
      <div part="wrapper" class="wrapper">
        <label class="label" part="label" for="untrained-input"
          >Untrained</label
        >
        <input
          type="checkbox"
          id="untrained-input"
          name="untrained-input"
          .checked="${this.checked}"
          @change="${this.onChange}"
        />
      </div>
    `;
  }
}

customElements.define('untrained-input', UntrainedInput);
