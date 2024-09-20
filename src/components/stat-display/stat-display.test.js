/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {StatDisplay} from './stat-display.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('stat-display', () => {
  test('is defined', () => {
    const el = document.createElement('stat-display');
    assert.instanceOf(el, StatDisplay);
  });

  test('renders with default values', async () => {
    const el = await fixture(
      html`<stat-display name="HP" value="4"></stat-display>`
    );
    assert.match(el.shadowRoot?.querySelector('h1')?.innerHTML || '', /HP/);
    assert.match(
      el.shadowRoot?.querySelector('.value-button')?.innerHTML || '',
      /4/
    );
  });

  test('handles a click', async () => {
    let clickedCount = 0;
    const clickHandler = () => clickedCount++;
    const el = await fixture(
      html`<stat-display
        @value-clicked=${clickHandler}
        name="AC"
        value="12"
      ></stat-display>`
    );
    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    // @ts-ignore
    await el.updateComplete;
    // assert.shadowDom.equal(
    //   el,
    //   `
    //   <div class="wrap">
    // 		<h1 part="name">HP</h1>
    // 		<button part="value">
    // 			4
    // 		</button>
    // 	</div>
    // `
    // );
    assert.equal(clickedCount, 1);
  });

  test('styling applied', async () => {
    const el = await fixture(
      html`<stat-display name="Init" value="+1"></stat-display>`
    );
    // @ts-ignore
    await el.updateComplete;
    assert.equal(getComputedStyle(el).marginTop, '0px');
  });
});
