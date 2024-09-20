// @ts-nocheck
import {InventoryAmmunition} from './inventory-ammunition.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('inventory-ammunition', () => {
  test('is defined', () => {
    const el = document.createElement('inventory-ammunition');
    assert.instanceOf(el, InventoryAmmunition);
  });

  test('handles a click', async () => {
    let events = {};
    const remove = (e) => (events.remove = e.detail);
    const quantityChange = (e) => (events.quantityChange = e.detail);
    const el = await fixture(
      html`<inventory-ammunition
        name="Arrows"
        @remove="${remove}"
        @quantity-change="${quantityChange}"
      ></inventory-ammunition>`
    );
    el?.shadowRoot?.querySelector('.remove-button')?.click();
    await el.updateComplete;
    let button = el?.shadowRoot?.querySelector('.increment-by-one');
    button?.click();
    await el.updateComplete;
    button = el?.shadowRoot?.querySelector('.increment-by-quantity');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(events, {
      remove: {name: 'Arrows'},
      quantityChange: {name: 'Arrows', quantity: 21},
    });

    button = el?.shadowRoot?.querySelector('.decrement-by-quantity');
    button?.click();
    await el.updateComplete;
    button?.click();
    await el.updateComplete;

    assert.deepEqual(events, {
      remove: {name: 'Arrows'},
      quantityChange: {name: 'Arrows', quantity: 0},
    });
  });
});
