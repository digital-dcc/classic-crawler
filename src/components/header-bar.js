import { LitElement, html, css } from "lit";

export class HeaderBar extends LitElement {
  static styles = css`
    section {
      width: 100%;
      margin: 0;
      padding: 0px;
			border-bottom: 1px black solid;
			margin-bottom: 10px;
    }
		header {
			width: 1140px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 0;
		}
		h1 {
			margin: 0;
			padding: 0;
		}
  `;

  static properties = {
  };

  constructor() {
    super();
    this.characterData = {};
  }

  render() {
    return html`
			<section>
      	<header>
					<h1>Classic Crawler</h1>
					<div>
						<a href="/characters">Characters</a>
					</div>
					<div>
						<a href="/dashboard">Account</a>
					</div>
      	</header>
			</section>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
