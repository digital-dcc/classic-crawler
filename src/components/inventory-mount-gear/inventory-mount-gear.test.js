// @ts-nocheck
import {InventoryMountGear} from './inventory-mount-gear.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('inventory-mount-gear', () => {
  test('is defined', () => {
    const el = document.createElement('inventory-mount-gear');
    assert.instanceOf(el, InventoryMountGear);
  });

  test('handles a click', async () => {
    let events = {};
    const remove = (e) => (events.remove = e.detail);
    const quantityChange = (e) => (events.quantityChange = e.detail);
    const el = await fixture(
      html`<inventory-mount-gear
        name="Barding, padded"
        @remove="${remove}"
        @quantity-change="${quantityChange}"
      ></inventory-mount-gear>`
    );
    el?.shadowRoot?.querySelector('.remove-button')?.click();
    await el.updateComplete;
    let button = el?.shadowRoot?.querySelector('.increment');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(events, {
      remove: {name: 'Barding, padded'},
      quantityChange: {name: 'Barding, padded', quantity: 2},
    });

    button = el?.shadowRoot?.querySelector('.decrement');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(events, {
      remove: {name: 'Barding, padded'},
      quantityChange: {name: 'Barding, padded', quantity: 1},
    });
  });
});
