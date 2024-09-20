// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {HitPoints} from './hit-points.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('hit-points', () => {
  test('is defined', () => {
    const el = document.createElement('hit-points');
    assert.instanceOf(el, HitPoints);
  });

  test('renders with a set max', async () => {
    const el = await fixture(html`<hit-points max-hp="9"></hit-points>`);
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Hit Points" value="9">/
    );
  });

  test('renders with a set max and current', async () => {
    const el = await fixture(
      html`<hit-points max-hp="11" hp="7"></hit-points>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Hit Points" value="7\/11">/
    );
  });

  test('handles a click', async () => {
    const el = await fixture(
      html`<hit-points max-hp="11" hp="7"></hit-points>`
    );
    const button = el.shadowRoot.querySelector('button.decrement-button');
    button.click();
    await el.updateComplete;
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Hit Points" value="6\/11">/
    );
  });
});
