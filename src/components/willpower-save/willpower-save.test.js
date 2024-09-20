import {WillpowerSave} from './willpower-save.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('willpower-save', () => {
  test('is defined', () => {
    const el = document.createElement('willpower-save');
    assert.instanceOf(el, WillpowerSave);
  });

  test('personality=13', async () => {
    const el = await fixture(
      html`<willpower-save personality="13"></willpower-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Will" value="+1" value-clickable></stat-display>
    `
    );
  });

  test('personality=8 and birth augur', async () => {
    const el = await fixture(
      html`<willpower-save
        personality="8"
        birth-augur="Lucky Sign"
        starting-luck="16"
      ></willpower-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Will" value="+1" value-clickable></stat-display>
    `
    );
  });

  test('override to 3', async () => {
    const el = await fixture(
      html`<willpower-save personality="8" override="3"></willpower-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Will" value="+3" value-clickable></stat-display>
    `
    );
  });

  test('character class dwarf', async () => {
    const el = await fixture(
      html`<willpower-save
        personality="12"
        character-class="Dwarf"
        level="4"
      ></willpower-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Will" value="+2" value-clickable></stat-display>
    `
    );
  });

  test('adjustment', async () => {
    const el = await fixture(
      html`<willpower-save
        personality="12"
        character-class="Elf"
        level="7"
        adjustment="2"
      ></willpower-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Will" value="+6" value-clickable></stat-display>
    `
    );
  });

  test('lowest possible value', async () => {
    const el = await fixture(
      html`<willpower-save
        personality="3"
        adjustment="-3"
        birth-augur="lucky-sign"
        starting-luck="3"
      ></willpower-save>`
    );
    assert.shadowDom.equal(
      el,
      `
      <stat-display text-position="bottom" name="Will" value="-9" value-clickable></stat-display>
    `
    );
  });
});
