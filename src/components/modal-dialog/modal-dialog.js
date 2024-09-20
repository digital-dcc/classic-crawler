import {LitElement, html, css} from 'lit';

export class ModalDialog extends LitElement {
  static styles = css`
    dialog {
      border: 1px #f2f2f2 solid;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      padding: 16px;
    }
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  `;

  static properties = {
    open: {type: Boolean, reflect: true},
  };

  constructor() {
    super();
    this.open = false;
  }

  render() {
    return html`
      <dialog @click="${this._stopPropagation}" @close="${this._close}">
        <slot></slot>
        <button @click="${this._close}" class="close-button">x</button>
      </dialog>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      const dialog = this.shadowRoot?.querySelector('dialog');
      if (this.open) {
        dialog?.showModal();
      } else {
        dialog?.close();
				this.dispatchEvent(new CustomEvent('close'));
      }
    }
  }

  _close() {
    this.open = false;
  }

  _stopPropagation(event) {
    event.stopPropagation();
  }
}

customElements.define('modal-dialog', ModalDialog);
