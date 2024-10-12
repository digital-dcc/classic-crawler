import {LitElement, html, css} from 'lit';

export class CharacterListCard extends LitElement {
  static get styles() {
    return css`
      .wrapper {
        height: 100%;
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
        display: flex;
        flex-direction: column;
        background-image: url('/images/witch.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
			h2 {
				margin: 0;
        padding: 0.7em;
				text-align: center;
        font-size: 1.5rem;
        color: white;
        background: rgba(0, 0, 0, 0.5);
			}
      .border {
        border-radius: 5px;
        border: 1px black solid;
      }
			.title {
				width: 100%;
        flex-grow: 1;
        box-sizing: border-box;
			}
			.buttons {
				border-top: 1px black solid;
        width: 100%;
        flex-shrink: 0;
        font-size: 1rem;
        padding: 1em;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.5);
			}
      .buttons a {
        color: white;
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
