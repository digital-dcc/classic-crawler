import {LitElement, html, css} from 'lit';

export class FormatCoins extends LitElement {
  static styles = css`
    :host {
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
    }
  `;

  static properties = {
    gp: {type: Number},
  };

  constructor() {
    super();
    this.gp = 0;
  }

  get formatCoins() {
    // if its 1 or more gp and its a whole number, display as gp
    if (this.gp >= 1 && Number.isInteger(this.gp)) return `${this.gp}gp`;
    // if its 0.1 or more gp and multiplying it by 10 is a whole number, display as sp
    if (this.gp >= 0.1 && Number.isInteger(this.gp * 10))
      return `${this.gp * 10}sp`;
    // everything else, display as cp
    if (this.gp >= 0.01) return `${this.gp * 100}cp`;
    return 0;
  }

  render() {
    return html`${this.formatCoins}`;
  }
}

customElements.define('format-coins', FormatCoins);
