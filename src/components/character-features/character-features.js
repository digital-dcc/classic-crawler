import {LitElement, html, css} from 'lit';
import {
  characterClassFeatures,
  characterClasses,
} from '../../utilities/character-classes.js';
import {slug} from '../../utilities/slug.js';
import {modifierFor} from '../../utilities/modifier-for.js';
import {formatModifier} from '../../utilities/format-modifier.js';

export class CharacterFeatures extends LitElement {
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
      ul,
      li {
        margin: 0;
        padding: 0;
        list-style-type: none;
        font-size: 1rem;
      }
      li {
        margin-bottom: 10px;
      }
      .wrapper {
        border-radius: 5px;
        padding: 10px;
        border: 1px black solid;
        margin-bottom: 10px;
      }
    `;
  }

  static get properties() {
    return {
      characterClass: {attribute: 'character-class', type: String},
      level: {type: Number},
      stamina: {type: Number},
      luck: {type: Number},
      personality: {type: Number},
      intelligence: {type: Number},
    };
  }

  constructor() {
    super();
    this.characterClass = null;
    this.level = 0;
    this.stamina = 11;
    this.luck = 11;
    this.personality = 11;
    this.intelligence = 11;
  }

  feature(feature) {
    // get classData for given class and level
    const classData = characterClasses
      .get(slug(this.characterClass))
      ?.get(this.level);

    // look for dynamic template keys in description and replace with values from character data
    let description = feature.description;
    const regex = /{{(.*?)}}/g;
    const matches = description.match(regex);
    for (const match of matches || []) {
      const key = match.slice(2, -2).trim();
      const replacement = classData[key];
      // replace stamina
      description = description.replaceAll(
        '{{luck}}',
        formatModifier(modifierFor(this.luck))
      );
      description = description.replaceAll(
        '{{personality}}',
        formatModifier(modifierFor(this.personality))
      );
      description = description.replaceAll(
        '{{intelligence}}',
        formatModifier(modifierFor(this.intelligence))
      );
      description = description.replaceAll(
        '{{stamina}}',
        formatModifier(modifierFor(this.stamina), true)
      );
      // replace dynamic template keys with values from class data
      description = description.replaceAll(match, replacement);
    }

    return {name: feature.name, description};
  }

  render() {
    const features = characterClassFeatures.get(slug(this.characterClass));

    return html`
      <div part="wrapper" class="wrapper">
        <h2>Class Features</h2>
        <ul>
          ${features.map((feature) => {
            const {name, description} = this.feature(feature);
            return html`<li part="feature">
              <strong>${name}</strong> ${description}
            </li>`;
          })}
        </ul>
      </div>
    `;
  }
}

customElements.define('character-features', CharacterFeatures);
