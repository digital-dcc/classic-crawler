// @ts-nocheck
import {InventoryEquipment} from './inventory-equipment.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('inventory-equipment', () => {
  test('is defined', () => {
    const el = document.createElement('inventory-equipment');
    assert.instanceOf(el, InventoryEquipment);
  });

  test('handles a click', async () => {
    let events = {};
    const remove = (e) => (events.remove = e.detail);
    const quantityChange = (e) => (events.quantityChange = e.detail);
    const el = await fixture(
      html`<inventory-equipment
        name="Holy symbol"
        @remove="${remove}"
        @quantity-change="${quantityChange}"
      ></inventory-equipment>`
    );
    el?.shadowRoot?.querySelector('.remove-button')?.click();
    await el.updateComplete;
    let button = el?.shadowRoot?.querySelector('.increment');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(events, {
      remove: {name: 'Holy symbol'},
      quantityChange: {name: 'Holy symbol', quantity: 2},
    });

    button = el?.shadowRoot?.querySelector('.decrement');
    button?.click();
    await el.updateComplete;

    assert.deepEqual(events, {
      remove: {name: 'Holy symbol'},
      quantityChange: {name: 'Holy symbol', quantity: 1},
    });
  });
});
