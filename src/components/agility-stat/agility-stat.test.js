// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {AgilityStat} from './agility-stat.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('agility-stat', () => {
  test('is defined', () => {
    const el = document.createElement('agility-stat');
    assert.instanceOf(el, AgilityStat);
  });

  test('handles a click', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<agility-stat
        agility="17"
        max-agility="17"
        @agility-skill-check="${roll}"
      ></agility-stat>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Skill Check',
      description: 'Agility skill check roll',
      roll: {
        qty: 1,
        die: 20,
        modifier: {
          breakdown: [
            {
              name: 'Agility Modifier',
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
      maxAgility: 17,
      agility: 17,
      luck: null,
    });
  });
  test('handles click - die adjustment', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<agility-stat
        max-agility="17"
        die-adjustment="+2"
        @agility-skill-check="${roll}"
      ></agility-stat>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Skill Check',
      description: 'Agility skill check roll',
      roll: {
        qty: 1,
        die: 30,
        modifier: {
          breakdown: [
            {
              name: 'Agility Modifier',
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
      maxAgility: 17,
      agility: null,
      luck: null,
    });
  });
});
