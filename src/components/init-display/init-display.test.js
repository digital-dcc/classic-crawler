// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {InitDisplay} from './init-display.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('init-display', () => {
  test('is defined', () => {
    const el = document.createElement('init-display');
    assert.instanceOf(el, InitDisplay);
  });

  test('Class Warrior', async () => {
    const el = await fixture(
      html`<init-display
        character-class="warrior"
        character-level="3"
      ></init-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Init" value="\+3">/
    );
  });

  test('Birth Augur Speed of the Cobra', async () => {
    const el = await fixture(
      html`<init-display
        birth-augur="Speed of the Cobra"
        starting-luck="16"
      ></init-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Init" value="\+2">/
    );
  });

  test('Agility', async () => {
    const el = await fixture(html`<init-display agility="4"></init-display>`);
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Init" value="-2">/
    );
  });

  test('Init adjustment', async () => {
    const el = await fixture(
      html`<init-display agility="18" init-adjustment="7"></init-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Init" value="\+10">/
    );
  });

  test('Init override', async () => {
    const el = await fixture(
      html`<init-display init-override="-5"></init-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Init" value="-5">/
    );
  });
});
