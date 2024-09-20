//@ts-nocheck

import {AlignmentDisplay} from './alignment-display.js';
// import {assert} from '@open-wc/testing';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('alignment-display', () => {
  test('is defined', () => {
    const el = document.createElement('alignment-display');
    assert.instanceOf(el, AlignmentDisplay);
  });

  test('displays correct alignment - lawful', async () => {
    const el = await fixture(
      html`<alignment-display alignment="lawful"></alignment-display>`
    );
    const alignment = el.shadowRoot?.querySelector('.alignment-name');
    assert.match(alignment.innerText, /Lawful/);
  });

  test('displays correct alignment - neutral', async () => {
    const el = await fixture(
      html`<alignment-display alignment="neutral"></alignment-display>`
    );
    const alignment = el.shadowRoot?.querySelector('.alignment-name');
    assert.match(alignment.innerText, /Neutral/);
  });

  test('displays correct alignment - chaotic', async () => {
    const el = await fixture(
      html`<alignment-display alignment="chaotic"></alignment-display>`
    );
    const alignment = el.shadowRoot?.querySelector('.alignment-name');
    assert.match(alignment.innerText, /Chaotic/);
  });
});
