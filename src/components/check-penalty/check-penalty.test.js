//@ts-nocheck

import {CheckPenalty} from './check-penalty.js';
// import {assert} from '@open-wc/testing';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('check-penalty', () => {
  test('is defined', () => {
    const el = document.createElement('check-penalty');
    assert.instanceOf(el, CheckPenalty);
  });

  test('dispatches clicks', async () => {
    let event;
    const change = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<check-penalty
        armor="full plate"
        shield
        @change="${change}"
      ></check-penalty>`
    );
    const checkbox = el.shadowRoot?.querySelector('input[type="checkbox"]');
    checkbox?.click();
    await el.updateComplete;

    assert.equal(event.detail.checked, true);
    assert.equal(event.detail.penalty, -9);
  });
});
