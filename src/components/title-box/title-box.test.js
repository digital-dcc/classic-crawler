// @ts-nocheck
import {TitleBox} from './title-box.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('title-box', () => {
  test('is defined', () => {
    const el = document.createElement('title-box');
    assert.instanceOf(el, TitleBox);
  });

  test('renders', async () => {
    const el = await fixture(
      html`<title-box name="Boris" level="1" character-class="cleric" alignment="lawful"></title-box>`
    );
    assert.match(el.shadowRoot.innerHTML, /Boris/);
    assert.match(el.shadowRoot.innerHTML, /the Acolyte/);
    assert.match(el.shadowRoot.innerHTML, /Cleric/);
  });
});
