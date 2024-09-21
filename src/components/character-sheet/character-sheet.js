import {LitElement, html} from 'lit';
import {armorStatsFor} from '../../utilities/armor.js';
import {styles} from './styles.js';

import '../dice-roller/dice-roller.js';
import '../title-box/title-box.js';
import '../hit-points/hit-points.js';
import '../armor-class/armor-class.js';
import '../experience-points/experience-points.js';
import '../speed-display/speed-display.js';
import '../init-display/init-display.js';
import '../alignment-display/alignment-display.js';
import '../check-penalty/check-penalty.js';
import '../crit-button/crit-button.js';
import '../fumble-button/fumble-button.js';
import '../equipped-weapon/equipped-weapon.js';
import '../character-features/character-features.js';
import '../character-languages/character-languages.js';
import '../character-language-item/character-language-item.js';
import '../inventory-panel/inventory-panel.js';
import '../inventory-ammunition/inventory-ammunition.js';
import '../inventory-armor/inventory-armor.js';
import '../inventory-equipment/inventory-equipment.js';
import '../inventory-mount-gear/inventory-mount-gear.js';
import '../inventory-weapon/inventory-weapon.js';
import '../inventory-selector/inventory-selector.js';
import '../weapons-panel/weapons-panel.js';
import '../birth-augur/birth-augur.js';
import '../strength-stat/strength-stat.js';
import '../agility-stat/agility-stat.js';
import '../stamina-stat/stamina-stat.js';
import '../intelligence-stat/intelligence-stat.js';
import '../personality-stat/personality-stat.js';
import '../luck-stat/luck-stat.js';
import '../reflex-save/reflex-save.js';
import '../fortitude-save/fortitude-save.js';
import '../willpower-save/willpower-save.js';
import '../thief-skills/thief-skills.js';
import '../notes-box/notes-box.js';
import '../occupation-box/occupation-box.js';
import '../stat-editor/stat-editor.js';
import '../speed-editor/speed-editor.js';
import '../alignment-editor/alignment-editor.js';
import '../experience-points-editor/experience-points-editor.js';
import '../armor-class-editor/armor-class-editor.js';
import '../hit-points-editor/hit-points-editor.js';

export class CharacterSheet extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      data: {type: Object, attribute: false},
      diceRoll: {type: Boolean, state: true},
      diceRollerIsOpen: {type: Boolean, state: true},
      checkPenaltySelected: {type: Boolean, state: true},
      inventorySelectorType: {type: String, state: true},
      inventorySelectorOpen: {type: Boolean, state: true},
      statEditorOpen: {type: Boolean, state: true},
      speedEditorOpen: {type: Boolean, state: true},
      alignmentEditorOpen: {type: Boolean, state: true},
      experiencePointsEditorOpen: {type: Boolean, state: true},
      armorClassEditorOpen: {type: Boolean, state: true},
      hitPointsEditorOpen: {type: Boolean, state: true},
    };
  }

  constructor() {
    super();
    this.data = {};
    this.diceRoll = null;
    this.diceRollerIsOpen = false;
    this.checkPenaltySelected = false;
    this.inventorySelectorType = '';
    this.inventorySelectorOpen = false;
    this.statEditorOpen = false;
    this.speedEditorOpen = false;
    this.alignmentEditorOpen = false;
    this.experiencePointsEditorOpen = false;
    this.armorClassEditorOpen = false;
    this.hitPointsEditorOpen = false;
  }

  handleDiceRollRequested(e) {
    this.diceRoll = e.detail;
    this.diceRollerIsOpen = true;
  }

  handleDiceRollPerformed() {
    this.diceRoll = null;
  }

  handleDiceRollClosed() {
    this.diceRoll = null;
    this.diceRollerIsOpen = false;
  }

  onCheckPenaltySelected() {
    this.checkPenaltySelected = !this.checkPenaltySelected;
  }

  handleNotesChanged(e) {
    this.data.notes = e.detail.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {...JSON.parse(JSON.stringify(this.data))},
      })
    );
  }

  onCoinChange(e) {
    this.data[e.detail.type] = e.detail.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {...JSON.parse(JSON.stringify(this.data))},
      })
    );
  }

  onTreasureChange(e) {
    this.data.treasure = e.detail.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {...JSON.parse(JSON.stringify(this.data))},
      })
    );
  }

  onInventorySelectorOpen(e) {
    this.inventorySelectorType = e.detail.type;
    this.inventorySelectorOpen = true;
  }

  onInventorySelectorClose() {
    this.inventorySelectorType = '';
    this.inventorySelectorOpen = false;
  }

  onStatEditorClose() {
    this.statEditorOpen = false;
  }

  onSpeedEditorClose() {
    this.speedEditorOpen = false;
  }

  onAlignmentEditorClose() {
    this.alignmentEditorOpen = false;
  }

  onExperiencePointsEditorClose() {
    this.experiencePointsEditorOpen = false;
  }

  onArmorClassEditorClose() {
    this.armorClassEditorOpen = false;
  }

  onHitPointsEditorClose() {
    this.hitPointsEditorOpen = false;
  }

  addOrIncrementInventoryItem(type, name, quantity) {
    // try to find existing item
    const existingItem = this.data[type].find((item) => item.name === name);
    if (existingItem) {
      // if item exists, increment quantity
      existingItem.quantity += quantity || 1;
    } else {
      // otherwise, add new item
      const newItem = {
        name: name,
        quantity: quantity || 1,
      };
      if (type === 'armor') {
        newItem.equipped = false;
        newItem.shield = armorStatsFor(name).shield;
      }
      if (type === 'weapon') {
        newItem.equipped = false;
        newItem.lucky = false;
      }
      this.data[type].push(newItem);
    }
  }

  onAddInventoryItem(e) {
    switch (e.detail.type) {
      case 'ammunition':
        this.addOrIncrementInventoryItem(
          'ammunition',
          e.detail.name,
          e.detail.quantity
        );
        break;
      case 'armor':
        this.addOrIncrementInventoryItem(
          'armor',
          e.detail.name,
          e.detail.quantity
        );
        break;
      case 'equipment':
        this.addOrIncrementInventoryItem(
          'equipment',
          e.detail.name,
          e.detail.quantity
        );
        break;
      case 'weapon':
        this.addOrIncrementInventoryItem(
          'weapons',
          e.detail.name,
          e.detail.quantity
        );
        break;
      case 'mount-gear':
        this.addOrIncrementInventoryItem(
          'mountGear',
          e.detail.name,
          e.detail.quantity
        );
        break;
    }
    this.emitChangeEvent();
  }

  onRemoveArmorItem(e) {
    const patch = {
      armor: this.data?.armor?.filter((item) => item.name !== e.detail.name),
    };
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {...JSON.parse(JSON.stringify(this.data)), ...patch},
      })
    );
  }

  onRemoveWeaponItem(e) {
    const patch = {
      weapons: this.data?.weapons?.filter(
        (item) => item.name !== e.detail.name
      ),
    };
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {...JSON.parse(JSON.stringify(this.data)), ...patch},
      })
    );
  }

  onRemoveEquipmentItem(e) {
    const patch = {
      equipment: this.data?.equipment?.filter(
        (item) => item.name !== e.detail.name
      ),
    };
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {...JSON.parse(JSON.stringify(this.data)), ...patch},
      })
    );
  }

  onRemoveMountGearItem(e) {
    const patch = {
      mountGear: this.data?.mountGear?.filter(
        (item) => item.name !== e.detail.name
      ),
    };
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {...JSON.parse(JSON.stringify(this.data)), ...patch},
      })
    );
  }

  onRemoveAmmunitionItem(e) {
    const patch = {
      ammunition: this.data?.ammunition?.filter(
        (item) => item.name !== e.detail.name
      ),
    };
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {...JSON.parse(JSON.stringify(this.data)), ...patch},
      })
    );
  }

  onAmmunitionQuantityChange(e) {
    const item = this.data?.ammunition?.find(
      (item) => item.name === e.detail.name
    );
    item.quantity = e.detail.quantity;
    this.emitChangeEvent();
  }

  onEquipmentQuantityChange(e) {
    const item = this.data?.equipment?.find(
      (item) => item.name === e.detail.name
    );
    item.quantity = e.detail.quantity;
    this.emitChangeEvent();
  }

  onMountGearQuantityChange(e) {
    const item = this.data?.mountGear?.find(
      (item) => item.name === e.detail.name
    );
    item.quantity = e.detail.quantity;
    this.emitChangeEvent();
  }

  onWeaponEquipChange(e) {
    const item = this.data?.weapons?.find(
      (item) => item.name === e.detail.name
    );
    item.equipped = e.detail.equipped;
    this.emitChangeEvent();
  }

  onArmorEquipChange(e) {
    const item = this.data?.armor?.find((item) => item.name === e.detail.name);
    if (item.shield) {
      this.data?.armor
        ?.filter((i) => i.shield)
        .forEach((i) => {
          i.equipped = false;
          if (i.name === item.name && e.detail.equipped) i.equipped = true;
        });
    } else {
      this.data?.armor
        ?.filter((i) => !i.shield)
        .forEach((i) => {
          i.equipped = false;
          if (i.name === item.name && e.detail.equipped) i.equipped = true;
        });
    }
    this.emitChangeEvent();
  }

  onLuckBurn(e) {
    this.data.luck = e.detail.luck;
    this.emitChangeEvent();
  }

  onStatChange(e) {
    this.data[e.detail.stat] = e.detail.value;
    this.emitChangeEvent();
  }

  onSpeedChange(e) {
    this.data.speedAdjustment = e.detail.speedAdjustment;
    this.emitChangeEvent();
  }

  onAlignmentChange(e) {
    this.data.alignment = e.detail.alignment;
    this.emitChangeEvent();
  }

  onExperiencePointsChange(e) {
    this.data.xp = e.detail.experiencePoints;
    this.emitChangeEvent();
  }

  onLevelChange(e) {
    this.data.level = e.detail.level;
    this.emitChangeEvent();
  }

  onArmorClassChange(e) {
    this.data.armorClassAdjustment = e.detail.adjustment;
    this.emitChangeEvent();
  }

  onHitPointsChange(e) {
		console.log('hp change', e.detail)
    this.data.hp = e.detail.hp;
    this.data.maxHP = e.detail.maxHP;
    this.emitChangeEvent();
  }

  emitChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {...JSON.parse(JSON.stringify(this.data))},
      })
    );
  }

  get equippedArmor() {
    return this.data?.armor?.find((item) => item.equipped && !item.shield);
  }

  get equippedShield() {
    return this.data?.armor?.find((item) => item.equipped && item.shield);
  }

  render() {
    return html`
      <!-- Editor modal dialogs -->
      <dice-roller
        .diceRoll="${this.diceRoll}"
        character-class="${this.data.characterClass}"
        level="${this.data.level}"
        current-luck="${this.data.luck}"
        .open="${this.diceRollerIsOpen}"
        @close="${this.handleDiceRollClosed}"
        @ondice-roll-result="${this.handleDiceRollPerformed}"
        @luck-burn="${this.onLuckBurn}"
      ></dice-roller>
      <inventory-selector
        .open="${this.inventorySelectorOpen}"
        .type="${this.inventorySelectorType}"
        @add-item="${this.onAddInventoryItem}"
        @close="${this.onInventorySelectorClose}"
      ></inventory-selector>
      <stat-editor
        .open="${this.statEditorOpen}"
        strength="${this.data.strength}"
        max-strength="${this.data.maxStrength}"
        agility="${this.data.agility}"
        max-agility="${this.data.maxAgility}"
        stamina="${this.data.stamina}"
        max-stamina="${this.data.maxStamina}"
        intelligence="${this.data.intelligence}"
        max-intelligence="${this.data.maxIntelligence}"
        personality="${this.data.personality}"
        max-personality="${this.data.maxPersonality}"
        luck="${this.data.luck}"
        max-luck="${this.data.maxLuck}"
        @change="${this.onStatChange}"
        @close="${this.onStatEditorClose}"
      ></stat-editor>
      <speed-editor
        .open="${this.speedEditorOpen}"
        occupation=${this.data.occupation}
        birth-augur=${this.data.birthAugur}
        armor=${this.equippedArmor?.name}
        starting-luck=${this.data.startingLuck}
        speed-adjustment=${this.data.speedAdjustment}
        @change="${this.onSpeedChange}"
        @close="${this.onSpeedEditorClose}"
      ></speed-editor>
      <alignment-editor
        .open="${this.alignmentEditorOpen}"
        alignment=${this.data.alignment}
        @change="${this.onAlignmentChange}"
        @close="${this.onAlignmentEditorClose}"
      ></alignment-editor>
      <experience-points-editor
        .open="${this.experiencePointsEditorOpen}"
        level="${this.data.level}"
        experience-points="${this.data.xp}"
        @experience-points-change="${this.onExperiencePointsChange}"
        @level-change="${this.onLevelChange}"
        @close="${this.onExperiencePointsEditorClose}"
      ></experience-points-editor>
      <armor-class-editor
        .open="${this.armorClassEditorOpen}"
        armor=${this.equippedArmor?.name}
        ?shield=${this.equippedShield?.name}
        agility=${this.data.agility}
        adjustment=${this.data.armorClassAdjustment}
        @change="${this.onArmorClassChange}"
        @close="${this.onArmorClassEditorClose}"
      ></armor-class-editor>
      <hit-points-editor
        .open="${this.hitPointsEditorOpen}"
        hp="${this.data.hp}"
        max-hp="${this.data.maxHP}"
        @change="${this.onHitPointsChange}"
        @close="${this.onHitPointsEditorClose}"
      ></hit-points-editor>
      <!-- / Editor modal dialogs -->
      <div class="wrapper column">
        <section class="row">
          <div class="row w-full space-between">
            <title-box
              character-name="${this.data.name}"
              alignment="${this.data.alignment}"
              character-class="${this.data.characterClass}"
              level="${this.data.level}"
            ></title-box>
            <div class="row right-justify">
              <speed-display
                armor=${this.equippedArmor?.name}
                birth-augur="${this.data.birthAugur}"
                occupation="${this.data.occupation}"
                starting-luck="${this.data.startingLuck}"
                @name-clicked="${() => (this.speedEditorOpen = true)}"
                speed-adjustment=${this.data.speedAdjustment}
              ></speed-display>
              <alignment-display
                alignment="${this.data.alignment}"
                @name-clicked="${() => (this.alignmentEditorOpen = true)}"
              ></alignment-display>
              <experience-points
                @name-clicked="${() =>
                  (this.experiencePointsEditorOpen = true)}"
                xp=${this.data.xp}
              ></experience-points>
            </div>
          </div>
        </section>
        <section class="row w-full space-between">
          <section class="column">
            <div class="row gap-20">
              <strength-stat
                armor=${this.equippedArmor?.name}
                ?shield=${this.equippedShield?.name}
                max-strength=${this.data.maxStrength}
                strength=${this.data.strength}
                ?apply-check-penalty="${this.checkPenaltySelected}"
                @strength-skill-check="${this.handleDiceRollRequested}"
                @strength-check="${this.handleDiceRollRequested}"
                @name-clicked="${() => (this.statEditorOpen = true)}"
              ></strength-stat>
              <agility-stat
                armor=${this.equippedArmor?.name}
                ?shield=${this.equippedShield?.name}
                max-agility=${this.data.maxAgility}
                agility=${this.data.agility}
                ?apply-check-penalty="${this.checkPenaltySelected}"
                @agility-skill-check="${this.handleDiceRollRequested}"
                @agility-check="${this.handleDiceRollRequested}"
                @name-clicked="${() => (this.statEditorOpen = true)}"
              ></agility-stat>
              <stamina-stat
                armor=${this.equippedArmor?.name}
                ?shield=${this.equippedShield?.name}
                max-stamina=${this.data.maxStamina}
                stamina=${this.data.stamina}
                ?apply-check-penalty="${this.checkPenaltySelected}"
                @stamina-skill-check="${this.handleDiceRollRequested}"
                @stamina-check="${this.handleDiceRollRequested}"
                @name-clicked="${() => (this.statEditorOpen = true)}"
              ></stamina-stat>
              <intelligence-stat
                armor=${this.equippedArmor?.name}
                ?shield=${this.equippedShield?.name}
                max-intelligence=${this.data.maxIntelligence}
                intelligence=${this.data.intelligence}
                ?apply-check-penalty="${this.checkPenaltySelected}"
                @intelligence-skill-check="${this.handleDiceRollRequested}"
                @intelligence-check="${this.handleDiceRollRequested}"
                @name-clicked="${() => (this.statEditorOpen = true)}"
              ></intelligence-stat>
              <personality-stat
                armor=${this.equippedArmor?.name}
                ?shield=${this.equippedShield?.name}
                max-personality=${this.data.maxPersonality}
                personality=${this.data.personality}
                ?apply-check-penalty="${this.checkPenaltySelected}"
                @personality-skill-check="${this.handleDiceRollRequested}"
                @personality-check="${this.handleDiceRollRequested}"
                @name-clicked="${() => (this.statEditorOpen = true)}"
              ></personality-stat>
              <luck-stat
                armor=${this.equippedArmor?.name}
                ?shield=${this.equippedShield?.name}
                max-luck=${this.data.maxLuck}
                luck=${this.data.luck}
                @luck-check="${this.handleDiceRollRequested}"
                ?apply-check-penalty="${this.checkPenaltySelected}"
                @luck-skill-check="${this.handleDiceRollRequested}"
                @name-clicked="${() => (this.statEditorOpen = true)}"
              ></luck-stat>
            </div>
            <check-penalty
              ?checked="${this.checkPenaltySelected}"
              armor=${this.equippedArmor?.name}
              display-modifier
              ?shield=${this.equippedShield?.name}
              @change="${this.onCheckPenaltySelected}"
            ></check-penalty>
          </section>
          <section class="row right-justify">
            <armor-class
              agility=${this.data.agility}
              armor=${this.equippedArmor?.name}
              ?shield=${this.equippedShield?.name}
              adjustment=${this.data.armorClassAdjustment}
              @name-clicked="${() => (this.armorClassEditorOpen = true)}"
            ></armor-class>
            <hit-points
              hp=${this.data.hp}
              max-hp=${this.data.maxHP}
              @name-clicked="${() => (this.hitPointsEditorOpen = true)}"
              @change="${this.onHitPointsChange}"
            ></hit-points>
          </section>
        </section>
        <section class="row">
          <section class="column item-1-3">
            <section class="saving-throws">
              <h2>Saving Throws</h2>
              <div class="row-items">
                <div class="item-1-3">
                  <reflex-save
                    agility="${this.data.agility}"
                    birth-augur="${this.data.birthAugur}"
                    character-class="${this.data.characterClass}"
                    level="${this.data.level}"
                    starting-luck="${this.data.startingLuck}"
                    @reflex-saving-throw="${this.handleDiceRollRequested}"
                  ></reflex-save>
                </div>
                <div class="item-1-3">
                  <fortitude-save
                    stamina="${this.data.stamina}"
                    birth-augur="${this.data.birthAugur}"
                    character-class="${this.data.characterClass}"
                    level="${this.data.level}"
                    starting-luck="${this.data.startingLuck}"
                    @fortitude-saving-throw="${this.handleDiceRollRequested}"
                  ></fortitude-save>
                </div>
                <div class="item-1-3">
                  <willpower-save
                    personality="${this.data.personality}"
                    birth-augur="${this.data.birthAugur}"
                    character-class="${this.data.characterClass}"
                    level="${this.data.level}"
                    starting-luck="${this.data.startingLuck}"
                    @willpower-saving-throw="${this.handleDiceRollRequested}"
                  ></willpower-save>
                </div>
              </div>
            </section>

            <section class="combat">
              <h2>Combat</h2>
              <div class="row-items">
                <div class="item-1-3">
                  <init-display
                    character-class="${this.data.characterClass}"
                    agility=${this.data.agility}
                    birth-augur="${this.data.birthAugur}"
                    starting-luck="${this.data.startingLuck}"
                    character-level="${this.data.level}"
                    @init-roll="${this.handleDiceRollRequested}"
                  ></init-display>
                </div>
                <div class="item-1-3">
                  <crit-button
                    birth-augur="${this.data.birthAugur}"
                    characterClass="${this.data.characterClass}"
                    level="${this.data.level}"
                    luck="${this.data.luck}"
                    @crit-roll="${this.handleDiceRollRequested}"
                  ></crit-button>
                </div>
                <div class="item-1-3">
                  <fumble-button
                    birth-augur="${this.data.birthAugur}"
                    luck="${this.data.luck}"
                    armor=${this.equippedArmor?.name}
                    ?shield=${this.equippedShield?.name}
                    @fumble-roll="${this.handleDiceRollRequested}"
                  ></fumble-button>
                </div>
              </div>
            </section>
            <section class="birth-augur">
              <birth-augur
                birth-augur="${this.data.birthAugur}"
                starting-luck="${this.data.startingLuck}"
                character-class="${this.data.characterClass}"
              ></birth-augur>
            </section>
            <occupation-box
              occupation="${this.data.occupation}"
            ></occupation-box>
            <section class="languages">
              <character-languages>
                ${this.data.languages?.map(
                  (language, index) =>
                    html`<character-language-item
                        name="${language}"
                      ></character-language-item>
                      ${index < this.data.languages?.length - 1
                        ? html`<span>,</span>`
                        : ''}`
                )}
              </character-languages>
            </section>
            ${this.data.characterClass && this.data.level > 0
              ? html`<section class="character-features">
                  <character-features
                    character-class="${this.data.characterClass}"
                    level="${this.data.level}"
                    stamina="${this.data.stamina}"
                    luck="${this.data.luck}"
                    personality="${this.data.personality}"
                    intelligence="${this.data.intelligence}"
                  ></character-features>
                </section>`
              : html``}
          </section>
          <section class="column">
            <section class="attacks">
              <weapons-panel>
                ${this.data?.weapons
                  ?.filter((weapon) => weapon.equipped)
                  .map(
                    (weapon) => html`
                      <equipped-weapon
                        agility="${this.data.agility}"
                        strength="${this.data.strength}"
                        character-class="${this.data.characterClass}"
                        ?lucky="${weapon.lucky}"
                        birth-augur="${this.data.birthAugur}"
                        luck="${this.data.luck}"
                        weapon="${weapon.name}"
                        alignment="${this.data.alignment}"
                        level="${this.data.level}"
                        @dice-roll="${this.handleDiceRollRequested}"
                      ></equipped-weapon>
                    `
                  )}
                <equipped-weapon
                  agility="${this.data.agility}"
                  strength="${this.data.strength}"
                  character-class="${this.data.characterClass}"
                  birth-augur="${this.data.birthAugur}"
                  luck="${this.data.luck}"
                  weapon="Unarmed"
                  alignment="${this.data.alignment}"
                  level="${this.data.level}"
                  @dice-roll="${this.handleDiceRollRequested}"
                ></equipped-weapon>
              </weapons-panel>
            </section>
            <section>
              ${this.data.characterClass === 'thief'
                ? html`<section>
                    <thief-skills
                      agility="${this.data.agility}"
                      alignment="${this.data.alignment}"
                      armor=${this.equippedArmor?.name}
                      birth-augur="${this.data.birthAugur}"
                      intelligence="${this.data.intelligence}"
                      level="${this.data.level}"
                      personality="${this.data.personality}"
                      ?shield=${this.equippedShield?.name}
                      starting-luck="${this.data.startingLuck}"
                      ?apply-check-penalty="${this.checkPenaltySelected}"
                      @thief-skill-check="${this.handleDiceRollRequested}"
                    ></thief-skills>
                  </section>`
                : html``}
            </section>
            <section class="equipment">
              <inventory-panel
                cp="${this.data.cp}"
                ep="${this.data.ep}"
                gp="${this.data.gp}"
                pp="${this.data.pp}"
                sp="${this.data.sp}"
                treasure="${this.data.treasure}"
                @coin-change="${this.onCoinChange}"
                @treasure-change="${this.onTreasureChange}"
                @add-item="${this.onInventorySelectorOpen}"
                @close="${this.onInventorySelectorClose}"
              >
                ${this.data?.weapons?.map(
                  (item) => html`
                    <inventory-weapon
                      slot="weapon"
                      name="${item.name}"
                      quantity="${item.quantity}"
                      ?equipped="${item.equipped}"
                      @toggle-equip="${this.onWeaponEquipChange}"
                      @remove="${this.onRemoveWeaponItem}"
                    ></inventory-weapon>
                  `
                )}
                ${this.data?.armor?.map(
                  (item) => html`
                    <inventory-armor
                      slot="armor"
                      name="${item.name}"
                      ?equipped="${item.equipped}"
                      @toggle-equip="${this.onArmorEquipChange}"
                      @remove="${this.onRemoveArmorItem}"
                    ></inventory-armor>
                  `
                )}
                ${this.data?.equipment?.map(
                  (item) => html`
                    <inventory-equipment
                      slot="equipment"
                      name="${item.name}"
                      quantity="${item.quantity}"
                      @quantity-change="${this.onEquipmentQuantityChange}"
                      @remove="${this.onRemoveEquipmentItem}"
                    ></inventory-equipment>
                  `
                )}
                ${this.data?.ammunition?.map(
                  (item) => html`
                    <inventory-ammunition
                      slot="ammunition"
                      name="${item.name}"
                      quantity="${item.quantity}"
                      @quantity-change="${this.onAmmunitionQuantityChange}"
                      @remove="${this.onRemoveAmmunitionItem}"
                    ></inventory-ammunition>
                  `
                )}
                ${this.data?.mountGear?.map(
                  (item) => html`
                    <inventory-mount-gear
                      slot="mount-gear"
                      name="${item.name}"
                      quantity="${item.quantity}"
                      @quantity-change="${this.onMountGearQuantityChange}"
                      @remove="${this.onRemoveMountGearItem}"
                    ></inventory-mount-gear>
                  `
                )}
              </inventory-panel>
            </section>
            <section class="notes">
              <notes-box
                value="${this.data.notes}"
                @change="${this.handleNotesChanged}"
              ></notes-box>
            </section>
          </section>
        </section>

        <section class="row"></section>
        <section class="row">
          ${this.data.characterClass && this.data.level > 0
            ? html`<section class="class-features">
							<class-features characterClass="${this.data.characterClass}" level="${this.data.level}" stamina="${this.data.stamina}" luck="${this.data.luck}" personality="${this.data.personality}" intelligence="${this.data.intelligence}"></class-features>
							</class-features>
						</section>`
            : html``}
        </section>
        <section class="row"></section>

        <div class="row"></div>
        <section class="row"></section>
      </div>
    `;
  }
}

customElements.define('character-sheet', CharacterSheet);
