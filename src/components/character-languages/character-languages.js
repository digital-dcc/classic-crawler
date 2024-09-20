import {LitElement, html, css} from 'lit';

export class CharacterLanguages extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0;
        margin: 0;
      }
      h2 {
        margin: 0;
        padding: 0;
        font-size: 0.8rem;
        text-align: center;
        margin-bottom: 10px;
      }
      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        font-size: 1rem;
      }
      .wrapper {
        border-radius: 5px;
        padding: 10px;
        border: 1px black solid;
        margin-bottom: 0px;
				list-style-type: none;
      }
			ul {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: center;
			}
			::slotted(*) {
				display: list-item;
			}
    `;
  }

  render() {
    return html`
      <div part="wrapper" class="wrapper">
        <h2>Languages</h2>
        <ul><slot></slot></ul>
      </div>
    `;
  }
}

customElements.define('character-languages', CharacterLanguages);
