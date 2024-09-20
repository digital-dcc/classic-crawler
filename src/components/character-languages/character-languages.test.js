// @ts-nocheck
import {CharacterLanguages} from './character-languages.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../character-language-item/character-language-item.js';

suite('character-languages', () => {
  test('is defined', () => {
    const el = document.createElement('character-languages');
    assert.instanceOf(el, CharacterLanguages);
  });

  test('renders', async () => {
    const el = await fixture(
      html`<character-languages>
				<character-language-item>Common</character-language-item>
				<character-language-item>Dwarvish</character-language-item>
				<character-language-item>Elvish</character-language-item>
			</character-languages>`
    );
    assert.match(el.shadowRoot.innerHTML, /<h2>Languages<\/h2>/);
		assert.match(el.shadowRoot.innerHTML, /<character-language-item>Common<\/character-language-item>/)
		assert.match(el.shadowRoot.innerHTML, /<span style="margin-right: 5px;">/)
  });
});
