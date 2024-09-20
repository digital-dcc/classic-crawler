import {FumbleButton} from './fumble-button.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('fumble-button', () => {
  test('is defined', () => {
    const el = document.createElement('fumble-button');
    assert.instanceOf(el, FumbleButton);
  });

  test('handles a click', async () => {
    let event;
    const roll = (e) => {
      event = e;
    };
    const el = await fixture(
      html`<fumble-button
        class="warrior"
        level="10"
        luck="7"
        birth-augur="The Broken Star"
        @fumble-roll="${roll}"
      ></fumble-button>`
    );
    const button = el?.shadowRoot
      ?.querySelector('stat-display')
      ?.shadowRoot?.querySelector('button');
    button?.click();
    // @ts-ignore
    await el.updateComplete;

    // @ts-ignore
    assert.deepEqual(event.detail, {
      name: 'Fumble Roll',
      description: 'Fumble roll based on armor worn',
      roll: {
        qty: 1,
        die: 4,
        // @ts-ignore
        modifier: {
          breakdown: [{name: 'Luck Modifier (The Broken Star)', value: 2}],
          total: 2,
        },
      },
      armor: 'unarmored',
      luck: 7,
      shield: false,
      birthAugur: 'the-broken-star',
    });
  });
});
