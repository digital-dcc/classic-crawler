//@ts-nocheck

import {AdjustmentInput} from './adjustment-input.js';
// import {assert} from '@open-wc/testing';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('adjustment input', () => {
  test('is defined', () => {
    const el = document.createElement('adjustment-input');
    assert.instanceOf(el, AdjustmentInput);
  });

  test('handles clicks', async () => {
    const el = await fixture(html`<adjustment-input></adjustment-input>`);
    const decrementButton = el.shadowRoot?.querySelector('.decrement-button');
    decrementButton?.click();
    decrementButton?.click();
    decrementButton?.click();
    await el.updateComplete;

		let valueDisplay = el.shadowRoot?.querySelector('.value')

    assert.match(valueDisplay.innerText, /-3/);

    const incrementButton = el.shadowRoot?.querySelector('.increment-button');
    incrementButton?.click();
    incrementButton?.click();
    incrementButton?.click();
    incrementButton?.click();
    incrementButton?.click();
    await el.updateComplete;

		valueDisplay = el.shadowRoot?.querySelector('.value')

    assert.match(valueDisplay.innerText, /2/);
  });

  test('dispatches clicks', async () => {
		let event;
		const change = (e) => {
			event = e;
		}
    const el = await fixture(html`<adjustment-input type="text" value="adjustment" @change="${change}"></adjustment-input>`);
    const decrementButton = el.shadowRoot?.querySelector('.decrement-button');
    decrementButton?.click();
    await el.updateComplete;

		assert.equal(event.detail.type, 'text')
		assert.equal(event.detail.decrement, true)
		assert.equal(event.detail.increment, false)
		assert.equal(event.detail.value, "adjustment")

    const incrementButton = el.shadowRoot?.querySelector('.increment-button');
    incrementButton?.click();
    incrementButton?.click();
    await el.updateComplete;

		assert.equal(event.detail.type, 'text')
		assert.equal(event.detail.decrement, false)
		assert.equal(event.detail.increment, true)
		assert.equal(event.detail.value, "adjustment")
  });
});
