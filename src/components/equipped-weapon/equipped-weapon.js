import {LitElement, html} from 'lit';
import {modifierFor} from '../../utilities/modifier-for.js';
import {diceChain} from '../../utilities/dice-chain.js';
import {weaponStatsFor, weapons} from '../../utilities/weapons.js';
import {slug} from '../../utilities/slug.js';
import {skills} from '../../utilities/character-classes/thief.js';
import {styles} from './styles.js';

class DiceRoll {
  // attack or damage
  type = '';
  // attack name eg. Melee Attack
  name = '';
  // attack description eg. Foofi makes a melee attack with a longsword
  description = '';

  // roll details
  roll = {
    // number of dice to roll
    qty: 1,
    // number of die sides
    die: 20,
    // any modifier to the die roll
    modifier: {
      breakdown: [],
      total: +0,
    },
    // manual attack die adjustment up or down the dice chain
    // not sure this needs to be included
    attackDieAdjustment: 0,
    // if weapon supports double damage while mounted charging,
    // and mounted and charging are checked, set this to 2
    multiplier: 1,
  };

  // weapon details
  weapon = {
    // melee or missile
    type: 'melee',
    // name of the weapon. Needs to be correctly spelt and capitalised as per DCC rulebook
    name: '',
    // how the weapon is being wielded
    wielding: '',
    // blackjack should automatically turn this on, turning it off should disable the weapon
    // other weapons are not affected by this checkbox
    subdualDamage: false,
    // range the weapon is being shot at if missile fire, short, medium, long
    range: '',
  };

  // various conditions that may have affected the selection of die and modifier
  conditions = {
    attacker: {
      invisible: false,
      onHigherGround: false,
      squeezing: false,
      entangled: false,
      untrained: false,
      mounted: false,
      charging: false,
      sneakAttacking: false,
      firingIntoMelee: false,
    },
    opponent: {
      behindCover: false,
      blinded: false,
      entangled: false,
      helpless: false,
      prone: false,
    },
  };
}

const wielding = {
  ONE_HANDED: 'one-handed',
  TWO_HANDED: 'two-handed',
  DUAL_WIELD_MAIN_HAND: 'dual-wield-main-hand',
  DUAL_WIELD_OFF_HAND: 'dual-wield-off-hand',
};

const wieldingDisplayText = {
  'one-handed': 'One Handed',
  'two-handed': 'Two Handed',
  'dual-wield-main-hand': 'Dual Wield - Main Hand',
  'dual-wield-off-hand': 'Dual Wield - Off Hand',
};

export class EquippedWeapon extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      // attributes
      theme: {
        type: String,
        reflect: true,
      },
      strength: {
        type: Number,
        required: true,
      },
      agility: {
        type: Number,
        required: true,
      },
      luck: {
        type: Number,
      },
      lucky: {
        type: Boolean,
      },
      type: {
        type: String,
      },
      weapon: {
        type: String,
        reflect: true,
      },
      attackDie: {
        attribute: 'attack-die',
        type: String,
        reflect: true,
      },
      damageDie: {
        attribute: 'damage-die',
        type: String,
        reflect: true,
      },
      attackModifierAdjustment: {
        attribute: 'attack-modifier-adjustment',
        type: Number,
      },
      attackModifierOverride: {
        attribute: 'attack-modifier-override',
        type: Number,
      },
      damageModifierAdjustment: {
        attribute: 'damage-modifier-adjustment',
        type: Number,
      },
      damageModifierOverride: {
        attribute: 'damage-modifier-override',
        type: Number,
      },
      attackerInvisible: {
        attribute: 'attacker-invisible',
        type: Boolean,
      },
      attackerOnHigherGround: {
        attribute: 'attacker-on-higher-ground',
        type: Boolean,
      },
      attackerSqueezing: {
        attribute: 'attacker-squeezing',
        type: Boolean,
      },
      attackerEntangled: {
        attribute: 'attacker-entangled',
        type: Boolean,
      },
      attackerUntrained: {
        attribute: 'attacker-untrained',
        type: Boolean,
      },
      attackerMounted: {
        attribute: 'attacker-mounted',
        type: Boolean,
      },
      attackerCharging: {
        attribute: 'attacker-charging',
        type: Boolean,
      },
      attackerSneakAttacking: {
        attribute: 'attacker-sneak-attacking',
        type: Boolean,
      },
      attackerSubduing: {
        attribute: 'attacker-subduing',
        type: Boolean,
      },
      opponentBehindCover: {
        attribute: 'opponent-behind-cover',
        type: Boolean,
      },
      opponentBlinded: {
        attribute: 'opponent-blinded',
        type: Boolean,
      },
      opponentEntangled: {
        attribute: 'opponent-entangled',
        type: Boolean,
      },
      opponentHelpless: {
        attribute: 'opponent-helpless',
        type: Boolean,
      },
      opponentProne: {
        attribute: 'opponent-prone',
        type: Boolean,
      },
      wielding: {
        type: String,
        reflect: true,
      },
      attackerFiringIntoMelee: {
        type: Boolean,
        attribute: 'attacker-firing-into-melee',
      },
      birthAugur: {
        type: String,
        attribute: 'birth-augur',
      },
      startingWeapon: {
        type: Boolean,
        attribute: 'starting-weapon',
      },
      characterClass: {
        type: String,
        attribute: 'character-class',
      },
      level: {type: Number},
      alignment: {type: String},
      subdual: {type: Boolean},
      range: {state: true},
      attackDieAdjustment: {state: true},
      damageDieAdjustment: {state: true},
    };
  }

  constructor() {
    super();
    this.theme = null;
    this.type = null;
    this.strength = null;
    this.agility = null;
    this.luck = null;
    this.lucky = false;
    this.weapon = null;
    this.attackDie = 'd20';
    this.wielding = wielding.ONE_HANDED;
    this.subdualDamage = null;
    this.damageDie = null;
    this.attackModifierAdjustment = 0;
    this.attackModifierOverride = null;
    this.damageModifierAdjustment = 0;
    this.damageModifierOverride = null;
    this.attackerInvisible = false;
    this.attackerOnHigherGround = false;
    this.attackerSqueezing = false;
    this.attackerEntangled = false;
    this.attackerUntrained = false;
    this.attackerFiringIntoMelee = false;
    this.attackerMounted = false;
    this.attackerCharging = false;
    this.attackerSneakAttacking = false;
    this.attackerSubduing = false;
    this.opponentBehindCover = false;
    this.opponentBlinded = false;
    this.opponentEntangled = false;
    this.opponentHelpless = false;
    this.opponentProne = false;
    this.birthAugur = null;
    this.startingWeapon = false;
    this.characterClass = null;
    this.alignment = null;
    this.level = 0;
    this.attackDieAdjustment = 0;
    this.range = null;
  }

  // if weapon is two handed, default wielding to two handed and disable changing
  // if a shield is equiped, disable selecting two handed
  // if class === halfling
  // 		agility is considered minimum 16 for dual wielding
  // 		if agility over 16, use normal rules
  // 		can use 2 equal size one handed weapons
  // 		crits on 16s
  // 		only fumbles when both results come up 1s

  render() {
    if (!this.type) {
      this.type = weapons.get(this.weapon || 'Dagger')?.melee
        ? 'melee'
        : 'missile';
    }

    const weaponIsTwoHanded = weapons.get(this.weapon || 'Dagger')?.twoHanded;
    const isSubdual =
      !!weapons.get(this.weapon || 'Dagger')?.subdualDamage ||
      this.attackerSubduing;

    return html`
      <div class="wrapper" part="wrapper">
        <header part="header">
          <div class="text">
            <h3 part="title">${this.weapon}</h3>
            <h4 part="subtitle">
              ${this.type === 'melee' ? 'Melee' : 'Missile'}
            </h4>
          </div>
          <div class="keywords">
            ${isSubdual ? html`<em>subdual</em>` : html``}
            ${this.lucky ? html`<em>lucky</em>` : html``}
            ${this.startingWeapon ? html`<em>starting weapon</em>` : html``}
          </div>
          <div class="middle-column">
            <div class="wielding-and-subdual" part="wielding-and-subdual">
              ${this.weapon !== 'Unarmed'
                ? html`
                    <select @change="${this.handleWieldingChange}">
                      <option
                        value="${wielding.ONE_HANDED}"
                        ?selected="${this.wielding === wielding.ONE_HANDED}"
                      >
                        ${wieldingDisplayText[wielding.ONE_HANDED]}
                      </option>
                      <option
                        value="${wielding.TWO_HANDED}"
                        ?selected="${this.wielding === wielding.TWO_HANDED ||
                        weaponIsTwoHanded}"
                      >
                        ${wieldingDisplayText[wielding.TWO_HANDED]}
                      </option>
                      <option
                        value="${wielding.DUAL_WIELD_MAIN_HAND}"
                        ?selected="${this.wielding ===
                        wielding.DUAL_WIELD_MAIN_HAND}"
                      >
                        ${wieldingDisplayText[wielding.DUAL_WIELD_MAIN_HAND]}
                      </option>
                      <option
                        value="${wielding.DUAL_WIELD_OFF_HAND}"
                        ?selected="${this.wielding ===
                        wielding.DUAL_WIELD_OFF_HAND}"
                      >
                        ${wieldingDisplayText[wielding.DUAL_WIELD_OFF_HAND]}
                      </option>
                    </select>
                  `
                : html``}
            </div>
            ${this.weaponRangeSelector}
          </div>
          <div class="buttons">
            <div class="attack" part="attack">
              <button
                class="attack-display-button"
                @click="${this._attackRoll}"
              >
                <h3 part="subtitle">Attack</h3>
                ${this.attackDisplay}
              </button>
            </div>
            <div class="damage" part="damage">
              <button
                class="damage-display-button"
                @click="${this._damageRoll}"
              >
                <h3 part="subtitle">Damage</h3>
                ${this.damageDisplay}
              </button>
            </div>
          </div>
        </header>
      </div>
    `;
  }

  get weaponRangeSelector() {
    const weaponStats = weaponStatsFor(this.weapon);
    if (!weaponStats?.missile) return html``;

    // initialise range
    if (!this.range) {
      this.range = 'short';
      if (weaponStats.melee && weaponStats.missile) this.range = 'melee';
    }

    return html`
      <div class="range radio-group" part="range">
        <ul>
          ${weaponStats.melee
            ? html`
                <li>
                  <label class="custom-radio">
                    <input
                      id="range-melee"
                      type="radio"
                      name="range"
                      value="melee"
                      .checked="${this.range === 'melee'}"
                      @change="${this.handleRangeChange}"
                    />
                    <span class="radio-label">Melee</span>
                  </label>
                </li>
              `
            : html``}
          <li>
            <label class="custom-radio">
              <input
                id="range-short"
                type="radio"
                name="range"
                value="short"
                .checked="${this.range === 'short'}"
                @change="${this.handleRangeChange}"
              />
              <span class="radio-label"
                >Short (${weaponStats?.range?.short})</span
              >
            </label>
          </li>
          <li>
            <label class="custom-radio">
              <input
                id="range-medium"
                type="radio"
                name="range"
                value="medium"
                .checked="${this.range === 'medium'}"
                @change="${this.handleRangeChange}"
              />
              <span class="radio-label"
                >Medium (${weaponStats?.range?.medium})</span
              >
            </label>
          </li>
          <li>
            <label class="custom-radio">
              <input
                id="range-long"
                type="radio"
                name="range"
                value="long"
                .checked="${this.range === 'long'}"
                @change="${this.handleRangeChange}"
              />
              <span class="radio-label"
                >Long (${weaponStats?.range?.long})</span
              >
            </label>
          </li>
        </ul>
      </div>
    `;
  }

  handleSubdualDamageChange() {
    this.subdualDamage = !this.subdualDamage;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          subdualDamage: this.subdualDamage,
        },
      })
    );
  }

  handleWieldingChange(event) {
    this.wielding = event.target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          wielding: this.wielding,
        },
      })
    );
  }

  handleRangeChange(event) {
    if (event.target.value === 'melee') {
      this.type = 'melee';
    } else {
      this.type = 'missile';
    }
    this.range = event.target.value;
  }

  adjustAttackDieUp() {
    if (this._attackDie === 'd30') return;
    this.attackDieAdjustment++;
  }

  adjustAttackDieDown() {
    if (this._attackDie === 'd3') return;
    this.attackDieAdjustment--;
  }

  _attackRoll() {
    const dr = new DiceRoll();
    dr.name = 'Attack Roll';
    dr.description = `${
      this.type === 'melee' ? `Melee` : 'Missile'
    } attack roll with a ${this.weapon?.toLowerCase()}`;
    dr.type = 'attack';

    dr.weapon.type = /** @type {string} */ (this.type);
    dr.weapon.name = this.weapon;
    dr.weapon.wielding = this.wielding;
    dr.weapon.subdualDamage = this.subdualDamage;
    dr.weapon.range = this.range;

    const [qty, die] = this._attackDie.split('d');
    dr.roll.qty = Number(qty || 1);
    dr.roll.die = Number(die || 20);
    // @ts-ignore
    dr.roll.modifier = this._attackModifier;
    dr.conditions.attacker.charging = this.attackerCharging;
    dr.conditions.attacker.entangled = this.attackerCharging;
    dr.conditions.attacker.attackerFiringIntoMelee =
      this.attackerFiringIntoMelee;
    dr.conditions.attacker.invisible = this.attackerInvisible;
    dr.conditions.attacker.mounted = this.attackerMounted;
    dr.conditions.attacker.onHigherGround = this.attackerOnHigherGround;
    dr.conditions.attacker.sneakAttacking = this.attackerSneakAttacking;
    dr.conditions.attacker.squeezing = this.attackerSqueezing;
    dr.conditions.attacker.untrained = this.attackerUntrained;

    this.dispatchEvent(new CustomEvent('dice-roll', {detail: dr}));

    // reset attack die adjustment back to 0 after each roll
    this.attackDieAdjustment = 0;
  }

  _damageRoll() {
    const dr = new DiceRoll();
    dr.name = 'Damage Roll';
    dr.description = `${
      this.type === 'melee' ? `Melee` : 'Missile'
    } damage roll with a ${this.weapon?.toLowerCase()}`;
    dr.type = 'damage';

    dr.weapon.type = /** @type {string} */ (this.type);
    dr.weapon.name = this.weapon;
    dr.weapon.wielding = this.wielding;
    dr.weapon.subdualDamage = this.subdualDamage;
    dr.weapon.range = this.range;

    const [qty, die] = this._damageDie.split('d');
    dr.roll.qty = Number(qty || 1);
    dr.roll.die = Number(die || 4);
    // @ts-ignore
    dr.roll.modifier = this._damageModifier;

    if (this.attackerCharging && this.attackerMounted) {
      dr.roll.multiplier = 2;
    }

    dr.conditions.attacker.charging = this.attackerCharging;
    dr.conditions.attacker.entangled = this.attackerCharging;
    dr.conditions.attacker.attackerFiringIntoMelee =
      this.attackerFiringIntoMelee;
    dr.conditions.attacker.invisible = this.attackerInvisible;
    dr.conditions.attacker.mounted = this.attackerMounted;
    dr.conditions.attacker.onHigherGround = this.attackerOnHigherGround;
    dr.conditions.attacker.sneakAttacking = this.attackerSneakAttacking;
    dr.conditions.attacker.squeezing = this.attackerSqueezing;
    dr.conditions.attacker.untrained = this.attackerUntrained;

    this.dispatchEvent(new CustomEvent('dice-roll', {detail: dr}));
  }

  incrementDiceChain(die, steps = 1) {
    for (let i = steps; i > 0; i--) {
      if (diceChain[diceChain.indexOf(die) + 1]) {
        die = diceChain[diceChain.indexOf(die) + 1];
      }
    }
    return die;
  }

  decrementDiceChain(die, steps = 1) {
    for (let i = steps; i > 0; i--) {
      if (diceChain[diceChain.indexOf(die) - 1]) {
        die = diceChain[diceChain.indexOf(die) - 1];
      }
    }
    return die;
  }

  get _attackDie() {
    // start with the attackDie that may have been passed in as an attribute (or the default)
    let [qty, die] = this.attackDie.split('d');
    die = `d${die}`;
    qty = qty || '1';

    if (this.attackerSqueezing) {
      die = this.decrementDiceChain(die);
    }
    if (this.attackerEntangled) {
      die = this.decrementDiceChain(die);
    }
    if (this.attackerUntrained) {
      die = this.decrementDiceChain(die);
    }

    if (this.opponentEntangled) {
      die = this.incrementDiceChain(die);
    }
    if (this.opponentHelpless) {
      die = this.incrementDiceChain(die);
    }

    if (this.type === 'melee') {
      // dual weapon fighting
      if (this.wielding === wielding.DUAL_WIELD_MAIN_HAND) {
        if (this.agility <= 8) {
          die = this.decrementDiceChain(die, 3);
        }
        if (this.agility >= 9 && this.agility <= 11) {
          die = this.decrementDiceChain(die, 2);
        }
        if (this.agility >= 12 && this.agility <= 15) {
          die = this.decrementDiceChain(die);
        }
        if (this.agility >= 16 && this.agility <= 17) {
          die = this.decrementDiceChain(die);
        }
      }

      if (this.wielding === wielding.DUAL_WIELD_OFF_HAND) {
        if (this.agility <= 8) {
          die = this.decrementDiceChain(die, 4);
        }
        if (this.agility >= 9 && this.agility <= 11) {
          die = this.decrementDiceChain(die, 3);
        }
        if (this.agility >= 12 && this.agility <= 15) {
          die = this.decrementDiceChain(die, 2);
        }
        if (this.agility >= 16 && this.agility <= 17) {
          die = this.decrementDiceChain(die);
        }
        if (this.agility >= 18) {
          die = this.decrementDiceChain(die);
        }
      }
    }

    if (this.type === 'missile') {
      // if the range is long, it's minus 1 die
      if (this.range === 'long') {
        die = this.decrementDiceChain(die);
      }
    }

    // if the plus/minus buttons have been used to adjust the dice chain manually
    // iterate until all increments or decrements have been used to move the dice chain up or down
    let i = this.attackDieAdjustment;
    while (i !== 0) {
      if (i < 0) {
        if (die === 'd3') {
          i = 0;
          continue;
        }
        die = diceChain[diceChain.indexOf(die) - 1];
        i++;
      } else {
        if (die === 'd30') {
          i = 0;
          continue;
        }
        die = diceChain[diceChain.indexOf(die) + 1];
        i--;
      }
    }

    return `${qty}${die}`;
  }

  get _attackModifier() {
    const breakdown = [];
    let modifier = 0;

    if (this.attackModifierOverride) {
      return {
        breakdown: [
          {name: 'Modifier Overridden', value: this.attackModifierOverride},
        ],
        total: this.attackModifierOverride,
      };
    }

    if (this.type === 'melee') {
      modifier += modifierFor(this.strength);
      breakdown.push({
        name: 'Strength Modifier',
        value: modifierFor(this.strength),
      });
      if (this.attackerInvisible) {
        modifier += 2;
        breakdown.push({name: 'Attacker Invisible', value: 2});
      }
      if (this.attackerOnHigherGround) {
        modifier += 1;
        breakdown.push({name: 'Attacker On Higher Ground', value: 1});
      }
      if (this.opponentProne) {
        modifier += 2;
        breakdown.push({name: 'Opponent Prone', value: 2});
      }

      // apply luck to melee attacks
      if (this.birthAugur === 'The bull') {
        modifier += modifierFor(this.luck);
        breakdown.push({
          name: 'Birth Augur (The Bull)',
          value: modifierFor(this.luck),
        });
      }

      // unarmed weapon attacks
      if (this.birthAugur === 'Raised by wolves' && this.weapon === 'Unarmed') {
        modifier += modifierFor(this.luck);
        breakdown.push({
          name: 'Birth Augur (Raised By Wolves)',
          value: modifierFor(this.luck),
        });
      }

      if (this.attackerCharging && !this.attackerMounted) {
        modifier += 2;
        breakdown.push({
          name: 'Reckless charge (-2 AC for 1 round)',
          value: 2,
        });
      }
    }

    if (this.type === 'missile') {
      modifier = modifierFor(this.agility);
      breakdown.push({
        name: 'Agility Modifier',
        value: modifierFor(this.agility),
      });
      if (this.range === 'medium') {
        modifier -= 2;
        breakdown.push({name: 'Firing From Medium Range', value: -2});
      }
      if (this.attackerFiringIntoMelee) {
        modifier -= 1;
        breakdown.push({name: 'Firing Into Melee', value: -1});
      }
      if (this.opponentProne) {
        breakdown.push({name: 'Opponent Prone', value: -2});
        modifier -= 2;
      }

      // apply luck to missile attacks
      if (this.birthAugur === 'Fortunate date') {
        modifier += modifierFor(this.luck);
        breakdown.push({
          name: 'Birth Augur (Fortunate date)',
          value: modifierFor(this.luck),
        });
      }
    }

    // apply luck to all attacks
    if (slug(this.characterClass) === 'thief' && this.attackerSneakAttacking) {
      const backstab =
        skills.get('backstab')?.get(this.alignment)?.get(this.level)?.bonus ||
        0;
      modifier += backstab;
      breakdown.push({
        name: 'Backstab Modifier',
        value: backstab,
      });
    }

    // apply luck to all attacks
    if (this.birthAugur === 'Harsh winter') {
      modifier += modifierFor(this.luck);
      breakdown.push({
        name: 'Birth Augur (Harsh Winter)',
        value: modifierFor(this.luck),
      });
    }

    // apply luck to mounted attacks
    if (this.birthAugur === 'Conceived on horseback' && this.attackerMounted) {
      modifier += modifierFor(this.luck);
      breakdown.push({
        name: 'Birth Augur (Conceived On Horseback)',
        value: modifierFor(this.luck),
      });
    }

    // apply luck to melee and damage to starting weapons
    if (this.birthAugur === 'Pack hunter' && this.startingWeapon) {
      modifier += modifierFor(this.luck);
      breakdown.push({
        name: 'Birth Augur (Pack Hunter)',
        value: modifierFor(this.luck),
      });
    }

    // apply luck to warrior's lucky weapon
    if (this.lucky) {
      modifier += modifierFor(this.luck);
      breakdown.push({name: 'Lucky Weapon', value: modifierFor(this.luck)});
    }

    if (this.opponentBehindCover) {
      modifier -= 2;
      breakdown.push({name: 'Opponent Behind Cover', value: -2});
    }
    if (this.opponentBlinded) {
      modifier += 2;
      breakdown.push({name: 'Opponent Blinded', value: 2});
    }

    if (this.attackModifierAdjustment) {
      modifier += this.attackModifierAdjustment;
      breakdown.push({
        name: 'Modifier Adjustment',
        value: this.attackModifierAdjustment,
      });
    }

    return {
      breakdown,
      total: modifier,
    };
  }

  get attackDisplay() {
    const die = this._attackDie;
    const mod = this._attackModifier.total;
    return `${die}${mod ? (mod > 0 ? `+${mod}` : mod) : ''}`;
  }

  get _damageDie() {
    // allow override via attributes
    if (this.damageDie) return this.damageDie;

    const weaponStats = weapons.get(this.weapon);

    let die = null;

    // set the die to the weapon's normal damage die
    if (weaponStats?.damage) die = weaponStats.damage;

    // if the character is performing a sneak attack and has a weapon that uses a higher die for sneak attacks, use that
    if (this.attackerSneakAttacking && weaponStats?.sneakDamage)
      die = weaponStats?.sneakDamage;

    // decrement the damage die when attacking to subdue unless the weapon is
    // a dedicated subdual weapon (blackjack)
    if (this.attackerSubduing && !weaponStats?.subdualDamage) {
      console.log(this.attackerSubduing);
      console.log(weaponStats?.subdualDamage);
      console.log(die);

      // @ts-ignore
      const [qty, faces] = die.split('d');
      die = `${qty}${this.decrementDiceChain(`d${faces}`)}`;
      console.log(die);
    }

    return die;
  }

  get _damageModifier() {
    // start with zero modifier
    let modifier = 0;
    const breakdown = [];

    // allow complete override
    if (this.damageModifierOverride) {
      return {
        breakdown: [
          {
            name: 'Damage Modifier Override',
            value: this.damageModifierOverride,
          },
        ],
        total: this.damageModifierOverride,
      };
    }

    // if the weapon is a melee weapon or the weapon is being thrown at short range...
    if (
      this.type === 'melee' ||
      (this.range === 'short' &&
        weaponStatsFor(this.weapon)?.addStrengthToDamageAtShortRange)
    ) {
      modifier = modifierFor(this.strength);
      breakdown.push({name: 'Strength Modifier', value: modifier});
    }

    // apply luck to all damage rolls
    if (this.birthAugur === 'Born on the battlefield') {
      modifier += modifierFor(this.luck);
      breakdown.push({
        name: 'Birth Augur (Born on the Battlefield)',
        value: modifierFor(this.luck),
      });
    }

    // apply luck to melee damage rolls
    if (this.type === 'melee') {
      if (this.birthAugur === 'Path of the bear') {
        modifier += modifierFor(this.luck);
        breakdown.push({
          name: 'Birth Augur (Path of the Bear)',
          value: modifierFor(this.luck),
        });
      }
    }

    // apply luck to missile damage rolls
    if (this.type === 'missile') {
      if (this.birthAugur === 'Hawkeye') {
        modifier += modifierFor(this.luck);
        breakdown.push({
          name: 'Birth Augur (Hawkeye)',
          value: modifierFor(this.luck),
        });
      }
    }

    // apply luck to melee attack and damage rolls for starting weapons
    if (this.birthAugur === 'Pack hunter' && this.startingWeapon) {
      modifier += modifierFor(this.luck);
      breakdown.push({
        name: 'Birth Augur (Pack Hunter)',
        value: modifierFor(this.luck),
      });
    }

    // apply any attribute based adjustment
    if (this.damageModifierAdjustment) {
      modifier += this.damageModifierAdjustment;
      breakdown.push({
        name: 'Modifier Adjustment',
        value: this.damageModifierAdjustment,
      });
    }

    if (this.attackerSubduing && !weaponStatsFor(this.weapon)?.subdualDamage) {
      breakdown.push({
        name: 'Subdual Damage',
        value: '-1 die',
      });
    }

    return {
      breakdown,
      total: modifier,
    };
  }

  get damageDisplay() {
    const mod = this._damageModifier.total;
    return `${this._damageDie}${mod ? (mod > 0 ? `+${mod}` : mod) : ''}`;
  }
}

customElements.define('equipped-weapon', EquippedWeapon);
