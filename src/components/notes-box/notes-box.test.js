// @ts-nocheck
import {NotesBox} from './notes-box.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('notes-box', () => {
  test('is defined', () => {
    const el = document.createElement('notes-box');
    assert.instanceOf(el, NotesBox);
  });

  test('renders', async () => {
    const el = await fixture(
      html`<notes-box value="These are my character notes"></notes-box>`
    );
    assert.match(el.shadowRoot.innerHTML, /Character Notes/);
    assert.equal(
      el.shadowRoot.querySelector('textarea').value,
      'These are my character notes'
    );
  });
});
