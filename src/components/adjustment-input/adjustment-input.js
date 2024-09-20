import {LitElement, html, css} from 'lit';

export class AdjustmentInput extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
      }
      button {
        border: none;
        background-color: transparent;
        width: 30px;
      }
      button:hover {
        cursor: pointer;
        background-color: rgba(211, 211, 211, 0.5);
      }
      button:active {
        transform: translateY(1px);
      }
      .wrapper {
        border-radius: 5px;
        border: 1px black solid;
        display: flex;
        justify-content: space-between;
        min-height: 25px;
        font-family: var(--main-font, 'Arial', sans-serif);
        font-size: 1rem;
      }
      .value {
        align-content: center;
      }
    `;
  }

  static get properties() {
    return {
      type: {type: String},
      value: {reflect: true},
    };
  }

  constructor() {
    super();
    this.type = 'number';
    this.value = 0;
  }

  displayNumber() {
    return html`${this.value}`;
  }

  displayText() {
    return html`${this.value}`;
  }

  decrement() {
    if (this.type === 'number') this.value--;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          type: this.type,
          decrement: true,
          increment: false,
          value: this.value,
        },
      })
    );
  }

  increment() {
    if (this.type === 'number') this.value++;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          type: this.type,
          decrement: false,
          increment: true,
          value: this.value,
        },
      })
    );
  }

  render() {
    return html`
      <div part="wrapper" class="wrapper">
        <button
          class="decrement-button"
          part="decrement-button"
          @click="${this.decrement}"
        >
          -
        </button>
        <div class="value" part="value">${this.value}</div>
        <button
          class="increment-button"
          part="increment-button"
          @click="${this.increment}"
        >
          +
        </button>
      </div>
    `;
  }
}

customElements.define('adjustment-input', AdjustmentInput);
