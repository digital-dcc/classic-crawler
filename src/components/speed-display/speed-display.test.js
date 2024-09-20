// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {SpeedDisplay} from './speed-display.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('speed-display', () => {
  test('is defined', () => {
    const el = document.createElement('speed-display');
    assert.instanceOf(el, SpeedDisplay);
  });

  test('Occupation Woodcutter', async () => {
    const el = await fixture(
      html`<speed-display occupation="woodcutter"></speed-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Speed" value="30">/
    );
  });

  test('Occupation Halfling gypsy', async () => {
    const el = await fixture(
      html`<speed-display occupation="Halfling gypsy"></speed-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Speed" value="20">/
    );
  });

  test('Occupation Elven barrister', async () => {
    const el = await fixture(
      html`<speed-display occupation="Elven barrister"></speed-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Speed" value="30">/
    );
  });

  test('Occupation Dwarven apothecarist', async () => {
    const el = await fixture(
      html`<speed-display occupation="Dwarven apothecarist"></speed-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Speed" value="20">/
    );
  });

  test('Occupation Woodcutter, birth-augur Wild Child and 18 starting luck', async () => {
    const el = await fixture(
      html`<speed-display occupation="Woodcutter" birth-augur="Wild Child" starting-luck="18"></speed-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Speed" value="45">/
    );
  });

  test('Occupation Dwarven apothecarist with override 10', async () => {
    const el = await fixture(
      html`<speed-display occupation="Dwarven apothecarist" speed-override="10"></speed-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Speed" value="10">/
    );
  });

  test('Occupation Minstrel with adjustment 10', async () => {
    const el = await fixture(
      html`<speed-display occupation="Minstrel" speed-adjustment="10"></speed-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Speed" value="40">/
    );
  });

  test('Occupation Minstrel with adjustment -5', async () => {
    const el = await fixture(
      html`<speed-display occupation="Minstrel" speed-adjustment="-5"></speed-display>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Speed" value="25">/
    );
  });
});
