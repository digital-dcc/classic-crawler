// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LuckStat} from './luck-stat.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('luck-stat', () => {
  test('is defined', () => {
    const el = document.createElement('luck-stat');
    assert.instanceOf(el, LuckStat);
  });

  test('handles a click', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<luck-stat
        luck="17"
        max-luck="17"
        @luck-check="${roll}"
      ></luck-stat>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Luck Check',
      description: 'Luck check roll',
      roll: {
        qty: 1,
        die: 20,
        modifier: {
          breakdown: [],
          total: 0,
        },
      },
      maxLuck: 17,
      luck: 17,
    });
  });
  test('handles click - die adjustment', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<luck-stat
        max-luck="17"
        die-adjustment="+2"
        @luck-check="${roll}"
      ></luck-stat>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Luck Check',
      description: 'Luck check roll',
      roll: {
        qty: 1,
        die: 20,
				modifier: {
          breakdown: [],
          total: 0,
        },
      },
      maxLuck: 17,
      luck: null,
    });
  });
});
