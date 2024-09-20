import {FortitudeSave} from './fortitude-save.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('fortitude-save', () => {
  test('is defined', () => {
    const el = document.createElement('fortitude-save');
    assert.instanceOf(el, FortitudeSave);
  });

  test('stamina=13', async () => {
    const el = await fixture(
      html`<fortitude-save stamina="13"></fortitude-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Fort" value="+1" value-clickable></stat-display>
    `
    );
  });

  test('stamina=8 and birth augur', async () => {
    const el = await fixture(
      html`<fortitude-save
        stamina="8"
        birth-augur="Lucky Sign"
        starting-luck="16"
      ></fortitude-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Fort" value="+1" value-clickable></stat-display>
    `
    );
  });

  test('override to 3', async () => {
    const el = await fixture(
      html`<fortitude-save stamina="8" override="3"></fortitude-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Fort" value="+3" value-clickable></stat-display>
    `
    );
  });

  test('character class dwarf', async () => {
    const el = await fixture(
      html`<fortitude-save
        stamina="12"
        character-class="Dwarf"
        level="4"
      ></fortitude-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Fort" value="+2" value-clickable></stat-display>
    `
    );
  });

  test('adjustment', async () => {
    const el = await fixture(
      html`<fortitude-save
        stamina="12"
        character-class="Elf"
        level="7"
        adjustment="2"
      ></fortitude-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Fort" value="+5" value-clickable></stat-display>
    `
    );
  });

  test('lowest possible value', async () => {
    const el = await fixture(
      html`<fortitude-save
        stamina="3"
        adjustment="-3"
        birth-augur="lucky-sign"
        starting-luck="3"
      ></fortitude-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Fort" value="-9" value-clickable></stat-display>
    `
    );
  });
});
