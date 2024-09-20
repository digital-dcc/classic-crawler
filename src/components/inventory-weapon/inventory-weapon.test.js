// @ts-nocheck
import {InventoryWeapon} from './inventory-weapon.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('inventory-weapon', () => {
  test('is defined', () => {
    const el = document.createElement('inventory-weapon');
    assert.instanceOf(el, InventoryWeapon);
  });

  test('handles a click', async () => {
    let events = {};
    const remove = (e) => (events.remove = e.detail);
    const equip = (e) => (events.equip = e.detail);
    const unequip = (e) => (events.unequip = e.detail);
    const el = await fixture(
      html`<inventory-weapon
        name="Longsword"
        @remove="${remove}"
        @equip="${equip}"
        @unequip="${unequip}"
      ></inventory-weapon>`
    );
    el?.shadowRoot?.querySelector('.remove-button')?.click();
    await el.updateComplete;
    const equipButton = el?.shadowRoot?.querySelector('.equip-button');
    equipButton?.click();
    await el.updateComplete;
    equipButton?.click();
    await el.updateComplete;

    assert.deepEqual(events, {
      remove: {name: 'Longsword'},
      equip: {name: 'Longsword'},
      unequip: {name: 'Longsword'},
    });
  });
});
