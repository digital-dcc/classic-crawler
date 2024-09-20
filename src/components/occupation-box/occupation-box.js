import {LitElement, html, css} from 'lit';
import {slug} from '../../utilities/slug.js';
import {occupations} from '../../utilities/occupations.js';

export class OccupationBox extends LitElement {
  static get styles() {
    return css`
      .wrapper {
        border-radius: 5px;
        padding: 10px;
        margin: 0;
        border: 1px black solid;
        list-style-type: none;
        box-sizing: border-box;
      }
      h2,
      p,
      h3 {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        text-align: center;
        margin-bottom: 5px;
      }
      h2 {
        font-size: 0.8rem;
      }
      p {
        font-size: 1rem;
        margin-bottom: 0;
        font-size: 0.8rem;
      }
    `;
  }

  static get properties() {
    return {
      occupation: {type: String},
    };
  }

  constructor() {
    super();
    this.occupation = null;
  }

  get occupationData() {
    const occupation = occupations.get(slug(this.occupation || ''));
    if (!occupation) {
      return {
        occupation: 'No occupation',
        trainedWeapon: 'None',
        tradeGoods: 'None',
        race: 'None',
      };
    }
    return occupation;
  }

  get raceIfNecessary() {
    const {race} = this.occupationData || {};
    return race === 'human' ? `Human ` : '';
  }

  render() {
    const {occupation, trainedWeapon, tradeGoods} = this.occupationData || {};
    return html`
      <div part="wrapper" class="wrapper">
        <h2>Occupation</h2>
        <h3>${this.raceIfNecessary}${occupation}</h3>
        <p><em>Trained Weapon</em> <strong>${trainedWeapon}</strong></p>
        <p><em>Trade Goods</em> <strong>${tradeGoods}</strong></p>
      </div>
    `;
  }
}

customElements.define('occupation-box', OccupationBox);
