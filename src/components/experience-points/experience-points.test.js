// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ExperiencePoints} from './experience-points.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('experience-points', () => {
  test('is defined', () => {
    const el = document.createElement('experience-points');
    assert.instanceOf(el, ExperiencePoints);
  });

  test('xp 9/10', async () => {
    const el = await fixture(
      html`<experience-points xp="9"></experience-points>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Level" value="0" base="9\/10">/
    );
  });

  test('xp 11/50', async () => {
    const el = await fixture(
      html`<experience-points xp="11"></experience-points>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Level" value="1" base="11\/50">/
    );
  });

  test('xp 10/50', async () => {
    const el = await fixture(
      html`<experience-points xp="10"></experience-points>`
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /<stat-display name="Level" value="1" base="10\/50">/
    );
  });
});
