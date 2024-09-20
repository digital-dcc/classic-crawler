// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {CharacterFeatures} from './character-features.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('character-features', () => {
  test('is defined', () => {
    const el = document.createElement('character-features');
    assert.instanceOf(el, CharacterFeatures);
  });

  test('renders', async () => {
    const el = await fixture(
      html`<character-features
        character-class="halfling"
        level="4"
        stamina="15"
        intelligence="7"
      ></character-features>`
    );
    assert.match(el.shadowRoot.innerHTML, /<h2>Class Features<\/h2>/);
    assert.match(el.shadowRoot.innerHTML, /1d6\+1 hit points at each level/);
    assert.match(
      el.shadowRoot.innerHTML,
      /You recieve a bonus of 8 to sneaking silently and hiding in shadows./
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /When you burn luck, the bonus is 2 for every point of luck burned. You may act out of initiative order and burn your luck to aid others nearby that you can see. You recover your spent luck at 4 points per night. You may not recover more than your maximum luck./
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /You know Common, the halfling racial language, as well as one additional randomly determined language. You also know one additional language for every point of Intelligence modifier \(-1\)/
    );
    assert.match(
      el.shadowRoot.innerHTML,
      /\(1d20\). You can use your action dice for attacks or skill checks./
    );
  });
});
