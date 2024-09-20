import {LitElement, html, css} from 'lit';

export class StatDisplay extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 0px;
        padding: 0px;
      }
      .wrapper {
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
        position: relative;
        border: 1px black solid;
        padding: 5px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        aspect-ratio: 1 / 1;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
				min-height: 85px;
      }
      h2 {
        margin: 0 auto;
        font-size: 1rem;
        flex: 0.6;
      }
      button {
        margin: 0 auto;
        display: block;
        border: 0;
        background-color: unset;
        width: 100%;
      }
      button.value-button {
        flex: 1.4;
        font-size: 1.7rem;
        border-radius: 5px 5px 0 0;
      }
      button.with-base {
        flex: 0;
      }
      button.base-button {
        border-radius: 0 0 5px 5px;
        padding-top: 5px;
        text-align: center;
      }
      button.no-bottom-text.without-base {
        border-radius: 5px;
      }
      .clickable:hover {
        background-color: rgba(211, 211, 211, 0.5);
      }
      .clickable {
        cursor: pointer;
      }
      .clickable:active {
        transform: translateY(1px);
      }
      .base {
        border-top: 1px black solid;
      }
    `;
  }

  static get properties() {
    return {
      name: {type: String},
      value: {type: String},
      modifier: {type: String},
      suffix: {type: String},
      textPosition: {type: String, attribute: 'text-position'},
      valueClickable: {attribute: 'value-clickable', type: Boolean},
      baseClickable: {attribute: 'base-clickable', type: Boolean},
      nameClickable: {attribute: 'name-clickable', type: Boolean},
      base: {type: String},
    };
  }

  constructor() {
    super();
    this.name = '';
    this.value = '';
    this.modifier = '';
    this.suffix = '';
    this.textPosition = 'top';
    this.valueClickable = false;
    this.baseClickable = false;
    this.nameClickable = false;
    this.base = null;
  }

  render() {
    return html`
      <div class="wrapper" part="wrapper">
        ${this.textPosition !== 'bottom' ? this.displayName() : html``}
        <button
          @click=${this.onValueClicked}
          part="value"
          class="value-button ${this.valueClickable ? 'clickable' : ''} ${this
            .base
            ? 'with-base'
            : 'without-base'} ${this.textPosition !== 'bottom'
            ? 'no-bottom-text'
            : ''}"
        >
          ${this.value}
        </button>
        ${this.textPosition === 'bottom' ? this.displayName() : html``}
        ${this.base ? this.displayBase() : html``}
      </div>
    `;
  }

  displayName() {
    return html`<h2 part="name">
      <button
        @click=${this.onNameClicked}
        class="${this.nameClickable ? 'clickable' : ''}"
      >
        ${this.name}
      </button>
    </h2>`;
  }

  displayBase() {
    return html`
      <div class="base">
        <button
          @click=${this.onBaseClicked}
          part="base"
          class="base-button ${this.baseClickable ? 'clickable' : ''}"
        >
          ${this.base}
        </button>
      </div>
    `;
  }

  onValueClicked() {
    this.dispatchEvent(new CustomEvent('value-clicked'));
  }

  onBaseClicked() {
    this.dispatchEvent(new CustomEvent('base-clicked'));
  }

  onNameClicked() {
    this.dispatchEvent(new CustomEvent('name-clicked'));
  }
}

customElements.define('stat-display', StatDisplay);
