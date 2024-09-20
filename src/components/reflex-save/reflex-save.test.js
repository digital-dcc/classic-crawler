import {ReflexSave} from './reflex-save.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('reflex-save', () => {
  test('is defined', () => {
    const el = document.createElement('reflex-save');
    assert.instanceOf(el, ReflexSave);
  });

  test('agility=13', async () => {
    const el = await fixture(html`<reflex-save agility="13"></reflex-save>`);
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Ref" value="+1" value-clickable></stat-display>
    `
    );
  });

  test('agility=8 and birth augur', async () => {
    const el = await fixture(
      html`<reflex-save
        agility="8"
        birth-augur="Lucky Sign"
        starting-luck="16"
      ></reflex-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Ref" value="+1" value-clickable></stat-display>
    `
    );
  });

  test('override to 3', async () => {
    const el = await fixture(
      html`<reflex-save agility="8" override="3"></reflex-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Ref" value="+3" value-clickable></stat-display>
    `
    );
  });

  test('character class', async () => {
    const el = await fixture(
      html`<reflex-save
        agility="12"
        character-class="warrior"
        level="4"
      ></reflex-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Ref" value="+2" value-clickable></stat-display>
    `
    );
  });

  test('adjustment', async () => {
    const el = await fixture(
      html`<reflex-save
        agility="12"
        character-class="warrior"
        level="4"
        adjustment="2"
      ></reflex-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Ref" value="+4" value-clickable></stat-display>
    `
    );
  });

  test('lowest possible value', async () => {
    const el = await fixture(
      html`<reflex-save
        agility="3"
        adjustment="-3"
        birth-augur="lucky-sign"
        starting-luck="3"
      ></reflex-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Ref" value="-9" value-clickable></stat-display>
    `
    );
  });
});
