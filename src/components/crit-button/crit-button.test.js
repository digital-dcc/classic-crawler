// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {CritButton} from './crit-button.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('fumble-button', () => {
  test('is defined', () => {
    const el = document.createElement('crit-button');
    assert.instanceOf(el, CritButton);
  });

  test('handles a click', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<crit-button
        class="warrior"
        level="10"
        luck="7"
        birth-augur="warriors-arm"
        @crit-roll="${roll}"
      ></crit-button>`
    );
    const button = el.shadowRoot
      ?.querySelector('stat-display')
      .shadowRoot.querySelector('button');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(event.detail, {
      name: 'Crit Roll',
      description: 'Crit roll on table V',
      roll: {
        qty: 2,
        die: 20,
        modifier: {
          breakdown: [{name: 'Luck Modifier (Warriors Arm)', value: -2}],
          total: -2,
        },
      },
      class: 'warrior',
      level: 10,
      luck: 7,
      birthAugur: 'warriors-arm',
      critTable: 'V',
    });
  });
});
