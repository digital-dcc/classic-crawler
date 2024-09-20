// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ArmorClass} from './armor-class.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('armor-class', () => {
  test('is defined', () => {
    const el = document.createElement('armor-class');
    assert.instanceOf(el, ArmorClass);
  });

  test('renders with a set name', async () => {
    const el = await fixture(
      html`<armor-class armor="Chainmail" agility="13"></armor-class>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display name="AC" value="16"></stat-display>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(
      html`<armor-class armor="Chainmail" agility="8" shield></armor-class>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display name="AC" value="15"></stat-display>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(
      html`<armor-class
        armor="Chainmail"
        agility="8"
        override="18"
      ></armor-class>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display name="AC" value="18"></stat-display>
    `
    );
  });

  test('styling applied', async () => {
    const el = await fixture(html`<armor-class></armor-class>`);
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '0px');
  });
});
