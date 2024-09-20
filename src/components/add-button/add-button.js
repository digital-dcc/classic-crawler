import {LitElement, html, css} from 'lit';

export class AddButton extends LitElement {
  static styles = css`
    :host {
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
    }
    .add-button {
      border: none;
      border-radius: 100%;
      width: 25px;
      height: 25px;
      background-color: #f2f2f2;
      text-align: center;
      justify-items: center;
      font-size: 0.8rem;
      line-height: 0.8rem;
      cursor: pointer;
    }
    .add-button:hover {
      background-color: #c3c3c3;
    }
  `;

  static properties = {};

  constructor() {
    super();
  }

  render() {
    return html`<button class="add-button">+</button>`;
  }
}

customElements.define('add-button', AddButton);
