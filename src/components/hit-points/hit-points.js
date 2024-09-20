/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import '../stat-display/stat-display.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class HitPoints extends LitElement {
  static get styles() {
    return css`
      .wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      h2,
      div {
        margin: 0;
        padding: 0;
      }
      .title {
        font-size: 0.8rem;
        text-align: center;
      }
      .hit-points {
        margin-top: 10px;
        font-size: 2rem;
        text-align: center;
      }
			button {
        margin: 0 auto;
        display: block;
        border: 0;
        background-color: unset;
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
      .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2px;
      }
      .buttons button {
        width: 30px;
        padding: 5px;
        aspect-ratio: 1/1;
        border-radius: 5px;
      }
      .buttons button:hover {
        background-color: rgba(211, 211, 211, 0.5);
        cursor: pointer;
      }
      .buttons button:active {
        transform: translateY(1px);
      }
    `;
  }

  static get properties() {
    return {
      maxHP: {attribute: 'max-hp', type: Number},
      hp: {type: Number, reflect: true},
    };
  }

  constructor() {
    super();
    this.maxHP = null;
    this.hp = null;
  }

  get displayCurrentHP() {
    return this.hp !== this.maxHP && typeof this.hp === 'number'
      ? this.hp + '/'
      : '';
  }

  render() {
    return html`
      <div class="wrapper">
        <h2 class="title" part="title">
          <button
            @click=${() => this.dispatchEvent(new CustomEvent('name-clicked'))}
            class="clickable"
          >
            Hit Points
          </button>
        </h2>
        <div class="hit-points">
          <span class="current-hp">${this.displayCurrentHP}</span>${this.maxHP}
        </div>
        <div class="buttons">
          <button
            part="decrement-button"
            class="decrement-button"
            @click="${this._decrement}"
          >
            -
          </button>
          <button
            part="increment-button"
            class="increment-button"
            @click="${this._increment}"
          >
            +
          </button>
        </div>
      </div>
    `;
  }

  _decrement() {
    if (!this.hp && this.hp !== 0) {
      this.hp = this.maxHP - 1;
      return;
    }
    if (this.hp < 1) return;
    this.hp--;
    this._dispatchCountChangedEvent();
  }

  _increment() {
    if (!this.hp && this.hp !== 0) {
      this.hp = this.maxHP + 1;
      return;
    }
    this.hp++;
    this._dispatchCountChangedEvent();
  }

  _dispatchCountChangedEvent() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {hp: this.hp, maxHP: this.maxHP},
      })
    );
  }
}

customElements.define('hit-points', HitPoints);
