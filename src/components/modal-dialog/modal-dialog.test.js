// @ts-nocheck
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ModalDialog} from './modal-dialog.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('modal-dialog', () => {
  test('is defined', () => {
    const el = document.createElement('modal-dialog');
    assert.instanceOf(el, ModalDialog);
  });

  test('renders', async () => {
    const el = await fixture(html`<modal-dialog open>Stuff</modal-dialog>`);
    assert.match(el.shadowRoot.innerHTML, /<dialog open="">/);
    assert.match(el.shadowRoot.innerHTML, /<slot>/);
    assert.match(
      el.shadowRoot.innerHTML,
      /<button class="close-button">x<\/button>/
    );
  });
});
