//@ts-nocheck

import {BirthAugur} from './birth-augur.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('birth-augur', () => {
  test('is defined', () => {
    const el = document.createElement('birth-augur');
    assert.instanceOf(el, BirthAugur);
  });

  test('displays birth augur information', async () => {
    const el = await fixture(
      html`<birth-augur
        class="warrior"
        starting-luck="17"
        birth-augur="warriors-arm"
      ></birth-augur>`
    );
    assert.match(el.shadowRoot.innerHTML, /\+4/);
  });
});
