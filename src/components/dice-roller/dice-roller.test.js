// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {DiceRoller} from './dice-roller.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('dice-roller', () => {
  test('is defined', () => {
    const el = document.createElement('dice-roller');
    assert.instanceOf(el, DiceRoller);
  });

  test('renders', async () => {
    const el = await fixture(
      html`
        <dice-roller
          .diceRoll=${{
            name: 'Saving Throw',
            description: 'Fortitude saving throw',
            qty: 1,
            die: 20,
            modifier: {
              total: 3,
              breakdown: [
                {name: 'Stamina Modifier', value: 1},
                {name: 'Luck Modifier', value: 1},
                {name: 'Class Bonus', value: 1},
              ],
            },
          }}
        ></dice-roller>
      `
    );
    assert.match(el.shadowRoot.innerHTML, /<modal-dialog open="">/);
    assert.match(el.shadowRoot.innerHTML, /Saving Throw/);
    assert.match(el.shadowRoot.innerHTML, /Fortitude saving throw/);
    assert.match(el.shadowRoot.innerHTML, /Stamina Modifier/);
    assert.match(el.shadowRoot.innerHTML, /Luck Modifier/);
    assert.match(el.shadowRoot.innerHTML, /Class Bonus/);
  });
});
