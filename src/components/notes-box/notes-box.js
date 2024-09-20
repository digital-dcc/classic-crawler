import {LitElement, html, css} from 'lit';

export class NotesBox extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0;
        margin: 0;
      }
      .wrapper {
        border-radius: 5px;
        padding: 10px;
        border: 1px black solid;
      }
      h2 {
        margin: 0;
        padding: 0;
        font-size: 0.8rem;
        text-align: center;
        margin-bottom: 10px;
      }
      textarea {
        width: 100%;
        min-height: 100px;
        max-width: 100%;
        min-width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
      }
    `;
  }

  static get properties() {
    return {
      value: {type: String},
    };
  }

  constructor() {
    super();
    this.value = '';
    this.debounceTimeout;
  }

  onInput(e) {
    // always set the value
    this.value = e.target.value;

    // but only dispatch the event once the user stops typing for 300ms
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('change', {detail: {value: this.value}})
      );
    }, 300);
  }

  render() {
    return html`
      <div part="wrapper" class="wrapper">
        <h2>Character Notes</h2>
        <textarea .value="${this.value}" @input="${this.onInput}"></textarea>
      </div>
    `;
  }
}

customElements.define('notes-box', NotesBox);
