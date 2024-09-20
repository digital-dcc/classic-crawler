import {LitElement, html, css} from 'lit';
import {
  characterClassTitles,
  characterClassDisplayNames,
} from '../../utilities/character-classes.js';
import {slug} from '../../utilities/slug.js';

export class TitleBox extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0;
        margin: 0;
      }
      h1,
      p {
        margin: 0;
        padding: 0;
        font-size: 1.2rem;
        text-align: left;
        margin-bottom: 10px;
      }
      p {
        font-size: 1rem;
        margin-bottom: 0;
      }
      .wrapper {
        border-radius: 5px;
        padding: 10px;
				padding-left: 0px;
        margin-bottom: 10px;
        list-style-type: none;
      }
    `;
  }

  static get properties() {
    return {
      characterName: {attribute: 'character-name', type: String},
      level: {type: Number},
      characterClass: {attribute: 'character-class', type: String},
      alignment: {type: String},
    };
  }

  constructor() {
    super();
    this.characterName = null;
    this.level = 0;
    this.characterClass = null;
    this.alignment = null;
  }

  get characterClassTitle() {
    if (!this.level || this.level === 0) {
      return html``;
    }
    if (!this.characterClass) {
      throw new Error('character-class attribute is required');
    }
    if (!this.alignment) {
      throw new Error('alignment attribute is required');
    }
    const level = this.level > 5 ? 5 : this.level;

    const classTitles = characterClassTitles.get(slug(this.characterClass));

    const classTitlesForLevel = classTitles.get(level);

    const classTitleForAlignment = classTitlesForLevel.get(
      slug(this.alignment)
    );

    return ` the ${classTitleForAlignment}`;
  }

  get classDisplayName() {
    if (!this.characterClass) {
      return html``;
    }
    return characterClassDisplayNames.get(slug(this.characterClass));
  }

  render() {
		console.log(this.characterName)
    return html`
      <div part="wrapper" class="wrapper">
        <h1>${this.characterName}${this.characterClassTitle}</h1>
        <p>
          <em>Level ${this.level} ${this.classDisplayName}</em>
        </p>
      </div>
    `;
  }
}

customElements.define('title-box', TitleBox);
