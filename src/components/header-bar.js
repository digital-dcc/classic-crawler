import { LitElement, html, css } from "lit";

export class HeaderBar extends LitElement {
  static styles = css`
    :host, * {
      box-sizing: border-box;
    }
    section {
      width: 100%;
      margin: 0;
      padding: 0px;
      border-bottom: 1px black solid;
    }
    header {
      max-width: 1140px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1em 1em;
      flex-wrap: wrap;
      gap: 1em 1em;
    }
    h1 {
      margin: 0;
      padding: 0;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 10px;
    }
  `;

  static properties = {
    hideLinks: { attribute: "hide-links", type: Boolean },
  };

  constructor() {
    super();
    this.characterData = {};
  }

  render() {
    return html`
      <section>
        <header>
          <h1><a href="/">Classic Crawler</a></h1>
          ${!this.hideLinks ?
          html`<nav>
            <ul>
              <li><a href="/characters">Characters</a></li>
              <li><a href="/dashboard">Account</a></li>
            </ul>
          </nav>` : ''}
        </header>
      </section>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
