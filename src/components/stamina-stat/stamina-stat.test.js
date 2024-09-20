// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {StaminaStat} from './stamina-stat.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('stamina-stat', () => {
  test('is defined', () => {
    const el = document.createElement('stamina-stat');
    assert.instanceOf(el, StaminaStat);
  });

  test('handles a click', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<stamina-stat
        stamina="17"
        max-stamina="17"
        @stamina-skill-check="${roll}"
      ></stamina-stat>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Skill Check',
      description: 'Stamina skill check roll',
      roll: {
        qty: 1,
        die: 20,
        modifier: {
          breakdown: [
            {
              name: 'Stamina Modifier',
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
      maxStamina: 17,
      stamina: 17,
      luck: null,
    });
  });
  test('handles click - die adjustment', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<stamina-stat
        max-stamina="17"
        die-adjustment="+2"
        @stamina-skill-check="${roll}"
      ></stamina-stat>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Skill Check',
      description: 'Stamina skill check roll',
      roll: {
        qty: 1,
        die: 30,
        modifier: {
          breakdown: [
            {
              name: 'Stamina Modifier',
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
      maxStamina: 17,
      stamina: null,
      luck: null,
    });
  });
});
