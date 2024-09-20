// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {StrengthStat} from './strength-stat.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('strength-stat', () => {
  test('is defined', () => {
    const el = document.createElement('strength-stat');
    assert.instanceOf(el, StrengthStat);
  });

  test('handles a click', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<strength-stat
        strength="17"
        max-strength="17"
        @strength-skill-check="${roll}"
      ></strength-stat>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Skill Check',
      description: 'Strength skill check roll',
      roll: {
        qty: 1,
        die: 20,
        modifier: {
          breakdown: [
            {
              name: 'Strength Modifier',
              value: 2,
            },
            {
              name: 'Modifier Adjustment',
              value: 0,
            },
          ],
          total: 2,
        },
      },
      maxStrength: 17,
      strength: 17,
      luck: null,
    });
  });
  test('handles click - die adjustment', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<strength-stat
        max-strength="17"
        die-adjustment="+2"
        @strength-skill-check="${roll}"
      ></strength-stat>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Skill Check',
      description: 'Strength skill check roll',
      roll: {
        qty: 1,
        die: 30,
        modifier: {
          breakdown: [
            {
              name: 'Strength Modifier',
              value: 2,
            },
            {
              name: 'Modifier Adjustment',
              value: 0,
            },
          ],
          total: 2,
        },
      },
      maxStrength: 17,
      strength: null,
      luck: null,
    });
  });
});
