// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {PersonalityStat} from './personality-stat.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('personality-stat', () => {
  test('is defined', () => {
    const el = document.createElement('personality-stat');
    assert.instanceOf(el, PersonalityStat);
  });

  test('handles a click', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<personality-stat
        personality="17"
        max-personality="17"
        @personality-skill-check="${roll}"
      ></personality-stat>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Skill Check',
      description: 'Personality skill check roll',
      roll: {
        qty: 1,
        die: 20,
        modifier: {
          breakdown: [
            {
              name: 'Personality Modifier',
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
      maxPersonality: 17,
      personality: 17,
      luck: null,
    });
  });
  test('handles click - die adjustment', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<personality-stat
        max-personality="17"
        die-adjustment="+2"
        @personality-skill-check="${roll}"
      ></personality-stat>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Skill Check',
      description: 'Personality skill check roll',
      roll: {
        qty: 1,
        die: 30,
        modifier: {
          breakdown: [
            {
              name: 'Personality Modifier',
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
      maxPersonality: 17,
      personality: null,
      luck: null,
    });
  });
});
