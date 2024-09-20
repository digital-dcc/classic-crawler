import {LitElement, html} from 'lit';
import '../modal-dialog/modal-dialog.js';
import {styles} from './styles.js';

export class AlignmentEditor extends LitElement {
  static styles = [styles];

  static properties = {
    open: {type: Boolean},
    alignment: {type: String},
  };

  constructor() {
    super();
    this.open = false;
    this.alignment = null;
  }

  onClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  onSelect(event) {
    this.alignment = event.target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {alignment: this.alignment},
      })
    );
  }

  render() {
    return html`
      <modal-dialog .open="${this.open}" @close="${this.onClose}">
        <div>
          <h1>Alignment</h1>
          <div class="alignments">
            <div class="law">
              <label>
                <img src="/images/lawful.png" width="75" height="75" />
                <span>lawful</span>
                <input
                  type="radio"
                  name="alignment"
                  ?checked="${this.alignment === 'lawful'}"
                  @click="${this.onSelect}"
                  value="lawful"
                />
              </label>
            </div>
            <div class="neutral">
              <label>
                <img src="/images/neutral.png" width="75" height="75" />
                <span>neutral</span>
                <input
                  type="radio"
                  name="alignment"
                  ?checked="${this.alignment === 'neutral'}"
                  @click="${this.onSelect}"
                  value="neutral"
                />
              </label>
            </div>
            <div class="chaos">
              <label>
                <img src="/images/chaotic.png" width="75" height="75" />
                <span>chaotic</span>
                <input
                  type="radio"
                  name="alignment"
                  ?checked="${this.alignment === 'chaotic'}"
                  @click="${this.onSelect}"
                  value="chaotic"
                />
              </label>
            </div>
          </div>
        </div>
      </modal-dialog>
    `;
  }
}

customElements.define('alignment-editor', AlignmentEditor);
