import {LitElement, html, css} from 'lit';

const alignmentMap = new Map([
  ['law', 'Lawful'],
  ['lawful', 'Lawful'],
  ['neutral', 'Neutral'],
  ['chaos', 'Chaotic'],
  ['chaotic', 'Chaotic'],
]);

export class AlignmentDisplay extends LitElement {
  static get styles() {
    return css`
      .wrapper {
        border-radius: 5px;
        border: 1px black solid;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
        padding: 5px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
      }
      h2 {
        margin: 0;
        padding: 0;
        font-size: 0.8rem;
      }
      .title {
        text-align: center;
      }
      .alignment-name-wrapper {
        display: flex;
        flex-direction: column;
      }
      .alignment-name {
        margin-top: 15px;
        font-size: 1rem;
        text-align: center;
        align-items: center;
      }
      button {
        margin: 0 auto;
        display: block;
        border: 0;
        background-color: unset;
        width: 100%;
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
      .lawful,
      .chaotic,
      .neutral {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50%;
      }
      .chaotic {
        background-image: url('/images/chaotic.png');
      }
      .lawful {
        background-image: url('/images/lawful.png');
      }
      .neutral {
        background-image: url('/images/neutral.png');
      }
    `;
  }

  static get properties() {
    return {
      alignment: {type: String},
    };
  }

  constructor() {
    super();
    this.alignment = null;
  }

  get alignmentText() {
    return alignmentMap.get(this.alignment.toLowerCase());
  }

  render() {
    return html`
      <div part="wrapper" class="wrapper ${this.alignment.toLowerCase()}">
        <h2 class="title" part="title">
          <button
            @click=${() => this.dispatchEvent(new CustomEvent('name-clicked'))}
            class="clickable"
          >
            Alignment
          </button>
        </h2>
        <div class="alignment-name-wrapper">
          <div class="alignment-name">${this.alignmentText}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('alignment-display', AlignmentDisplay);
