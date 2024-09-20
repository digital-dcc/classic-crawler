// @ts-nocheck
import {ThiefSkills} from './thief-skills.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('thief-skills', () => {
  test('is defined', () => {
    const el = document.createElement('thief-skills');
    assert.instanceOf(el, ThiefSkills);
  });

  test('lawful thief gets correct modifiers', async () => {
    const el = await fixture(
      html`<thief-skills
        agility="12"
        intelligence="12"
        personality="12"
        birth-augur="lucky-star"
        starting-luck="12"
        armor="padded"
				level="1"
				alignment="lawful"
      ></thief-skills>`
    );
    assert.match(el.shadowRoot.querySelector('.backstab .skill-value').innerHTML, /\+1/,'backstab');
		assert.match(el.shadowRoot.querySelector('.sneak-silently button').innerHTML, /\+1/, 'sneak-silently');
		assert.match(el.shadowRoot.querySelector('.hide-in-shadows button').innerHTML, /\+3/, 'hide-in-shadows');
		assert.match(el.shadowRoot.querySelector('.pick-pocket button').innerHTML, /\+1/, 'pick-pocket');
		assert.match(el.shadowRoot.querySelector('.climb-sheer-surfaces button').innerHTML, /\+3/, 'climb-sheer-surfaces');
		assert.match(el.shadowRoot.querySelector('.pick-lock button').innerHTML, /\+1/, 'pick-lock');
		assert.match(el.shadowRoot.querySelector('.find-trap button').innerHTML, /\+3/, 'find-trap');
		assert.match(el.shadowRoot.querySelector('.disable-trap button').innerHTML, /\+3/, 'disable-trap');
		assert.match(el.shadowRoot.querySelector('.forge-document button').innerHTML, /\+0/, 'forge-document');
		assert.match(el.shadowRoot.querySelector('.disguise-self button').innerHTML, /\+0/, 'disguise-self');
		assert.match(el.shadowRoot.querySelector('.read-languages button').innerHTML, /\+0/, 'read-languages');
		assert.match(el.shadowRoot.querySelector('.handle-poison button').innerHTML, /\+0/, 'handle-poison');
		assert.match(el.shadowRoot.querySelector('.cast-spell-from-scroll button').innerHTML, /d10/, 'cast-spell-from-scroll');
  });

  test('chaotic thief gets correct modifiers', async () => {
    const el = await fixture(
      html`<thief-skills
        agility="12"
        intelligence="12"
        personality="12"
        birth-augur="lucky-star"
        starting-luck="12"
        armor="padded"
				level="1"
				alignment="chaotic"
      ></thief-skills>`
    );
    assert.match(el.shadowRoot.querySelector('.backstab .skill-value').innerHTML, /\+3/,'backstab');
		assert.match(el.shadowRoot.querySelector('.sneak-silently button').innerHTML, /\+3/, 'sneak-silently');
		assert.match(el.shadowRoot.querySelector('.hide-in-shadows button').innerHTML, /\+1/, 'hide-in-shadows');
		assert.match(el.shadowRoot.querySelector('.pick-pocket button').innerHTML, /\+0/, 'pick-pocket');
		assert.match(el.shadowRoot.querySelector('.climb-sheer-surfaces button').innerHTML, /\+1/, 'climb-sheer-surfaces');
		assert.match(el.shadowRoot.querySelector('.pick-lock button').innerHTML, /\+1/, 'pick-lock');
		assert.match(el.shadowRoot.querySelector('.find-trap button').innerHTML, /\+1/, 'find-trap');
		assert.match(el.shadowRoot.querySelector('.disable-trap button').innerHTML, /\+0/, 'disable-trap');
		assert.match(el.shadowRoot.querySelector('.forge-document button').innerHTML, /\+0/, 'forge-document');
		assert.match(el.shadowRoot.querySelector('.disguise-self button').innerHTML, /\+3/, 'disguise-self');
		assert.match(el.shadowRoot.querySelector('.read-languages button').innerHTML, /\+0/, 'read-languages');
		assert.match(el.shadowRoot.querySelector('.handle-poison button').innerHTML, /\+3/, 'handle-poison');
		assert.match(el.shadowRoot.querySelector('.cast-spell-from-scroll button').innerHTML, /d10/, 'cast-spell-from-scroll');
  });

  test('neutral thief gets correct modifiers', async () => {
    const el = await fixture(
      html`<thief-skills
        agility="12"
        intelligence="12"
        personality="12"
        birth-augur="lucky-star"
        starting-luck="12"
        armor="padded"
				level="1"
				alignment="neutral"
      ></thief-skills>`
    );
    assert.match(el.shadowRoot.querySelector('.backstab .skill-value').innerHTML, /\+0/,'backstab');
		assert.match(el.shadowRoot.querySelector('.sneak-silently button').innerHTML, /\+3/, 'sneak-silently');
		assert.match(el.shadowRoot.querySelector('.hide-in-shadows button').innerHTML, /\+1/, 'hide-in-shadows');
		assert.match(el.shadowRoot.querySelector('.pick-pocket button').innerHTML, /\+3/, 'pick-pocket');
		assert.match(el.shadowRoot.querySelector('.climb-sheer-surfaces button').innerHTML, /\+3/, 'climb-sheer-surfaces');
		assert.match(el.shadowRoot.querySelector('.pick-lock button').innerHTML, /\+1/, 'pick-lock');
		assert.match(el.shadowRoot.querySelector('.find-trap button').innerHTML, /\+1/, 'find-trap');
		assert.match(el.shadowRoot.querySelector('.disable-trap button').innerHTML, /\+1/, 'disable-trap');
		assert.match(el.shadowRoot.querySelector('.forge-document button').innerHTML, /\+3/, 'forge-document');
		assert.match(el.shadowRoot.querySelector('.disguise-self button').innerHTML, /\+0/, 'disguise-self');
		assert.match(el.shadowRoot.querySelector('.read-languages button').innerHTML, /\+0/, 'read-languages');
		assert.match(el.shadowRoot.querySelector('.handle-poison button').innerHTML, /\+0/, 'handle-poison');
		assert.match(el.shadowRoot.querySelector('.cast-spell-from-scroll button').innerHTML, /d12/, 'cast-spell-from-scroll');
  });

	test('lawful thief attributes affect modifiers', async () => {
    const el = await fixture(
      html`<thief-skills
        agility="18"
        intelligence="3"
        personality="13"
        birth-augur="lucky-star"
        starting-luck="12"
        armor="padded"
				level="1"
				alignment="lawful"
      ></thief-skills>`
    );
    assert.match(el.shadowRoot.querySelector('.backstab .skill-value').innerHTML, /\+1/,'backstab');
		assert.match(el.shadowRoot.querySelector('.sneak-silently button').innerHTML, /\+4/, 'sneak-silently');
		assert.match(el.shadowRoot.querySelector('.hide-in-shadows button').innerHTML, /\+6/, 'hide-in-shadows');
		assert.match(el.shadowRoot.querySelector('.pick-pocket button').innerHTML, /\+4/, 'pick-pocket');
		assert.match(el.shadowRoot.querySelector('.climb-sheer-surfaces button').innerHTML, /\+6/, 'climb-sheer-surfaces');
		assert.match(el.shadowRoot.querySelector('.pick-lock button').innerHTML, /\+4/, 'pick-lock');
		assert.match(el.shadowRoot.querySelector('.find-trap button').innerHTML, /\+0/, 'find-trap');
		assert.match(el.shadowRoot.querySelector('.disable-trap button').innerHTML, /\+6/, 'disable-trap');
		assert.match(el.shadowRoot.querySelector('.forge-document button').innerHTML, /\+3/, 'forge-document');
		assert.match(el.shadowRoot.querySelector('.disguise-self button').innerHTML, /\+1/, 'disguise-self');
		assert.match(el.shadowRoot.querySelector('.read-languages button').innerHTML, /-3/, 'read-languages');
		assert.match(el.shadowRoot.querySelector('.handle-poison button').innerHTML, /\+0/, 'handle-poison');
		assert.match(el.shadowRoot.querySelector('.cast-spell-from-scroll button').innerHTML, /d10-3/, 'cast-spell-from-scroll');
  });

	test('chaotic thief birth augur affects modifiers', async () => {
    const el = await fixture(
      html`<thief-skills
        agility="12"
        intelligence="12"
        personality="12"
        birth-augur="born-under-the-loom"
        starting-luck="18"
        armor="padded"
				level="1"
				alignment="chaotic"
      ></thief-skills>`
    );
    assert.match(el.shadowRoot.querySelector('.backstab .skill-value').innerHTML, /\+6/,'backstab');
		assert.match(el.shadowRoot.querySelector('.sneak-silently button').innerHTML, /\+6/, 'sneak-silently');
		assert.match(el.shadowRoot.querySelector('.hide-in-shadows button').innerHTML, /\+4/, 'hide-in-shadows');
		assert.match(el.shadowRoot.querySelector('.pick-pocket button').innerHTML, /\+3/, 'pick-pocket');
		assert.match(el.shadowRoot.querySelector('.climb-sheer-surfaces button').innerHTML, /\+4/, 'climb-sheer-surfaces');
		assert.match(el.shadowRoot.querySelector('.pick-lock button').innerHTML, /\+4/, 'pick-lock');
		assert.match(el.shadowRoot.querySelector('.find-trap button').innerHTML, /\+4/, 'find-trap');
		assert.match(el.shadowRoot.querySelector('.disable-trap button').innerHTML, /\+3/, 'disable-trap');
		assert.match(el.shadowRoot.querySelector('.forge-document button').innerHTML, /\+3/, 'forge-document');
		assert.match(el.shadowRoot.querySelector('.disguise-self button').innerHTML, /\+6/, 'disguise-self');
		assert.match(el.shadowRoot.querySelector('.read-languages button').innerHTML, /\+3/, 'read-languages');
		assert.match(el.shadowRoot.querySelector('.handle-poison button').innerHTML, /\+6/, 'handle-poison');
		assert.match(el.shadowRoot.querySelector('.cast-spell-from-scroll button').innerHTML, /d10\+3/, 'cast-spell-from-scroll');
  });

	test('neutral thief armor check penality affects agility based skills and casting spells from scrolls', async () => {
    const el = await fixture(
      html`<thief-skills
        agility="12"
        intelligence="12"
        personality="12"
        birth-augur="lucky-star"
        starting-luck="12"
        armor="full-plate"
				shield
				level="1"
				alignment="neutral"
      ></thief-skills>`
    );
    assert.match(el.shadowRoot.querySelector('.backstab .skill-value').innerHTML, /\+0/,'backstab');
		assert.match(el.shadowRoot.querySelector('.sneak-silently button').innerHTML, /-6/, 'sneak-silently');
		assert.match(el.shadowRoot.querySelector('.hide-in-shadows button').innerHTML, /-8/, 'hide-in-shadows');
		assert.match(el.shadowRoot.querySelector('.pick-pocket button').innerHTML, /-6/, 'pick-pocket');
		assert.match(el.shadowRoot.querySelector('.climb-sheer-surfaces button').innerHTML, /-6/, 'climb-sheer-surfaces');
		assert.match(el.shadowRoot.querySelector('.pick-lock button').innerHTML, /-8/, 'pick-lock');
		assert.match(el.shadowRoot.querySelector('.find-trap button').innerHTML, /\+1/, 'find-trap');
		assert.match(el.shadowRoot.querySelector('.disable-trap button').innerHTML, /-8/, 'disable-trap');
		assert.match(el.shadowRoot.querySelector('.forge-document button').innerHTML, /-6/, 'forge-document');
		assert.match(el.shadowRoot.querySelector('.disguise-self button').innerHTML, /\+0/, 'disguise-self');
		assert.match(el.shadowRoot.querySelector('.read-languages button').innerHTML, /\+0/, 'read-languages');
		assert.match(el.shadowRoot.querySelector('.handle-poison button').innerHTML, /\+0/, 'handle-poison');
		assert.match(el.shadowRoot.querySelector('.cast-spell-from-scroll button').innerHTML, /d12-9/, 'cast-spell-from-scroll');
  });

	test('lawful level 10 thief gets correct modifiers', async () => {
    const el = await fixture(
      html`<thief-skills
        agility="12"
        intelligence="12"
        personality="12"
        birth-augur="lucky-star"
        starting-luck="12"
        armor="padded"
				level="10"
				alignment="lawful"
      ></thief-skills>`
    );
    assert.match(el.shadowRoot.querySelector('.backstab .skill-value').innerHTML, /\+13/,'backstab');
		assert.match(el.shadowRoot.querySelector('.sneak-silently button').innerHTML, /\+13/, 'sneak-silently');
		assert.match(el.shadowRoot.querySelector('.hide-in-shadows button').innerHTML, /\+15/, 'hide-in-shadows');
		assert.match(el.shadowRoot.querySelector('.pick-pocket button').innerHTML, /\+13/, 'pick-pocket');
		assert.match(el.shadowRoot.querySelector('.climb-sheer-surfaces button').innerHTML, /\+15/, 'climb-sheer-surfaces');
		assert.match(el.shadowRoot.querySelector('.pick-lock button').innerHTML, /\+13/, 'pick-lock');
		assert.match(el.shadowRoot.querySelector('.find-trap button').innerHTML, /\+15/, 'find-trap');
		assert.match(el.shadowRoot.querySelector('.disable-trap button').innerHTML, /\+15/, 'disable-trap');
		assert.match(el.shadowRoot.querySelector('.forge-document button').innerHTML, /\+8/, 'forge-document');
		assert.match(el.shadowRoot.querySelector('.disguise-self button').innerHTML, /\+9/, 'disguise-self');
		assert.match(el.shadowRoot.querySelector('.read-languages button').innerHTML, /\+8/, 'read-languages');
		assert.match(el.shadowRoot.querySelector('.handle-poison button').innerHTML, /\+9/, 'handle-poison');
		assert.match(el.shadowRoot.querySelector('.cast-spell-from-scroll button').innerHTML, /d20/, 'cast-spell-from-scroll');
  });
});
