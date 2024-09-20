import {LitElement, html, css} from 'lit';

export class CharacterLanguageItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0;
        margin: 0;
      }
      li {
        margin: 0;
        padding: 0;
        font-size: 1rem;
      }
    `;
  }

	static get properties() {
    return {
      name: {type: String},
    };
  }

  constructor() {
    super();
    this.name = null;
  }

  render() {
    return html`
			<li>${this.name}</li>
    `;
  }
}

customElements.define('character-language-item', CharacterLanguageItem);
