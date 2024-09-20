// @ts-nocheck
import {InventoryArmor} from './inventory-armor.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('inventory-armor', () => {
  test('is defined', () => {
    const el = document.createElement('inventory-armor');
    assert.instanceOf(el, InventoryArmor);
  });

  test('handles a click', async () => {
    let events = {};
    const remove = (e) => (events.remove = e.detail);
    const equip = (e) => (events.equip = e.detail);
    const unequip = (e) => (events.unequip = e.detail);
    const el = await fixture(
      html`<inventory-armor
        name="Full plate"
        @remove="${remove}"
        @equip="${equip}"
        @unequip="${unequip}"
      ></inventory-armor>`
    );
    el?.shadowRoot?.querySelector('.remove-button')?.click();
    await el.updateComplete;
    const equipButton = el?.shadowRoot?.querySelector('.equip-button');
    equipButton?.click();
    await el.updateComplete;
    equipButton?.click();
    await el.updateComplete;

    assert.deepEqual(events, {
      remove: {name: 'Full plate'},
      equip: {name: 'Full plate'},
      unequip: {name: 'Full plate'},
    });
  });
});
