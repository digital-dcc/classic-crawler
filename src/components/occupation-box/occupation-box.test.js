// @ts-nocheck
import {OccupationBox} from './occupation-box.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('occupation-box', () => {
  test('is defined', () => {
    const el = document.createElement('occupation-box');
    assert.instanceOf(el, OccupationBox);
  });

  test('renders', async () => {
    const el = await fixture(
      html`<occupation-box occupation="alchemist"></occupation-box>`
    );
    assert.match(el.shadowRoot.innerHTML, /Human/);
    assert.match(el.shadowRoot.innerHTML, /Alchemist/);
    assert.match(el.shadowRoot.innerHTML, /Staff/);
    assert.match(el.shadowRoot.innerHTML, /Oil, 1 flas/);
  });
});
