import {LitElement, html, css} from 'lit';

export class CharacterListCard extends LitElement {
  static get styles() {
    return css`
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
  			box-sizing: border-box;
      }
			h2 {
				margin: 0;
				padding: 0;
				text-align: center;
			}
      .border {
        border-radius: 5px;
        border: 1px black solid;
      }
			.title {
				height: 100px;
				padding: 10px;
			}
			.buttons {
				border-top: 1px black solid;
				padding: 10px;
			}
    `;
  }

  static get properties() {
    return {
      characterId: {attribute: 'character-id', type: String},
      characterName: {attribute: 'character-name', type: String},
    };
  }

  constructor() {
    super();
    this.characterName = null;
		this.characterId = null;
  }

  render() {
    return html`
      <div class="wrapper border">
				<div class="title">
					<h2>${this.characterName}</h2>
				</div>
        <div class="buttons">
					<a href="/character/${this.characterId}">View</a>
				</div>
      </div>
    `;
  }
}

customElements.define('character-list-card', CharacterListCard);
