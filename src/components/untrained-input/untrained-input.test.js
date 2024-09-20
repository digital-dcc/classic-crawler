//@ts-nocheck

import {UntrainedInput} from './untrained-input.js';
// import {assert} from '@open-wc/testing';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('untrained-input', () => {
  test('is defined', () => {
    const el = document.createElement('untrained-input');
    assert.instanceOf(el, UntrainedInput);
  });

  test('dispatches clicks', async () => {
    let event;
    const change = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<untrained-input @change="${change}"></untrained-input>`
    );
    const checkbox = el.shadowRoot?.querySelector('input[type="checkbox"]');
    checkbox?.click();
    await el.updateComplete;

    assert.equal(event.detail.checked, true);
  });
});
