import { LitElement, html, css } from "lit";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
import { app } from "../firebase/client";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { occupations } from "../utilities/occupations";
import { birthAugurs } from "../utilities/birth-augur";
import { equipment } from "../utilities/equipment";
import { names } from "../utilities/names";
import { modifierFor } from "../utilities/modifier-for";
import { formatModifier } from "../utilities/format-modifier";

// TODO: Fix adding money when occupation gets money as a trade good. Eg Tax collector gets 100cp
// TODO: Accessibility
// TODO: Responsive


export class CharactersCreatePage extends LitElement {
  static get styles() {
    return css`
      .wrapper {
        width: 1140px;
        margin: 0 auto;
        padding: 0px;
      }
      input,
      select {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid black;
        display: block;
        box-sizing: border-box;
      }
      button {
        width: 100%;
        background-color: transparent;
        border-radius: 5px;
        border: 1px #ccc solid;
        background-color: #f2f2f2;
        padding: 10px;
        cursor: pointer;
        display: block;
        box-sizing: border-box;
      }
      .form-elements {
        display: flex;
        gap: 10px;
        flex-direction: column;
      }
      .roll-dice-button {
        border: none;
        padding: 0;
        margin: 0;
        background-color: unset;
        width: 24px;
        height: 24px;
      }

      .text-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }

      .stats,
      .row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
      }
      .stats {
        justify-content: space-between;
      }
      .stats div,
      .hit-points,
      .copper-pieces {
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
      }
      .stats input,
      .hit-points input,
      .copper-pieces input {
        width: 60px;
      }

      .alignment {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
      .alignment input {
        visibility: hidden;
        width: 0;
        height: 0;
        margin: 0;
        padding: 0;
      }
      .alignment label {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid black;
        border-radius: 5px;
        padding: 10px;
        width: 60px;
        height: 60px;
      }
      .selected {
        background-color: #f2f2f2;
      }
      .error {
        color: red;
        font-size: 0.8rem;
      }
      h1 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
      .form-element {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
    `;
  }

  static get properties() {
    return {
      userToken: { attribute: "user-token", type: String },
      userId: { attribute: "user-id", type: String },
      name: { state: true },
      str: { state: true },
      int: { state: true },
      agl: { state: true },
      per: { state: true },
      sta: { state: true },
      luck: { state: true },
      occupation: { state: true },
      birthAugur: { state: true },
      startingEquipment: { state: true },
      alignment: { state: true },
      hp: { state: true },
      cp: { state: true },
      nameError: { state: true },
      strError: { state: true },
      intError: { state: true },
      aglError: { state: true },
      perError: { state: true },
      staError: { state: true },
      luckError: { state: true },
      occupationError: { state: true },
      birthAugurError: { state: true },
      startingEquipmentError: { state: true },
      alignmentError: { state: true },
      hpError: { state: true },
      cpError: { state: true },
    };
  }

  constructor() {
    super();
    this.userToken = null;
    this.userId = null;
    this.name = "";
    this.str = "";
    this.int = "";
    this.agl = "";
    this.per = "";
    this.sta = "";
    this.luck = "";
    this.occupation = "";
    this.birthAugur = "";
    this.startingEquipment = "";
    this.alignment = "law";
    this.hp = "";
    this.cp = "";
    this.nameError = "";
    this.strError = "";
    this.intError = "";
    this.aglError = "";
    this.perError = "";
    this.staError = "";
    this.luckError = "";
    this.occupationError = "";
    this.birthAugurError = "";
    this.startingEquipmentError = "";
    this.alignmentError = "";
    this.hpError = "";
    this.cpError = "";
  }

  async firstUpdated() {
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
      } else {
        console.log("User is not signed in");
        // Perform sign in here or redirect to login page
        signInWithCustomToken(auth, this.userToken)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Signed in as:", user.uid);
          })
          .catch((error) => {
            console.error("Authentication error:", error);
          });
      }
    });
  }

  async onCreateCharacter(e) {
    e.preventDefault();
    const validation = this.validate(this.data);
    if (validation) {
      const db = getFirestore(app);
      const docRef = await addDoc(collection(db, "characters"), this.data);
      window.location.href = `/character/${docRef.id}`;
    }
  }

  get data() {
    const languages = ["Common"];
    const race = occupations.get(this.occupation).race;
    if (race === "dwarf" && this.int > 7) languages.push("Dwarvish");
    if (race === "elf" && this.int > 7) languages.push("Elvish");
    if (race === "halfling" && this.int > 7) languages.push("Halfling");

    return {
      name: this.name,
      alignment: this.alignment,
      birthAugur: this.birthAugur,
      maxStrength: Number(this.str),
      strength: Number(this.str),
      maxAgility: Number(this.agl),
      agility: Number(this.agl),
      maxStamina: Number(this.sta),
      stamina: Number(this.sta),
      maxIntelligence: Number(this.int),
      intelligence: Number(this.int),
      maxPersonality: Number(this.per),
      personality: Number(this.per),
      startingLuck: Number(this.luck),
      maxLuck: Number(this.luck),
      luck: Number(this.luck),
      hp: this.totalHP,
      maxHP: this.totalHP,
      occupation: this.occupation,
      equipment: [
        { name: equipment.get(this.startingEquipment).name, quantity: 1 },
        { name: occupations.get(this.occupation).tradeGoods, quantity: 1 },
      ],
      cp: Number(this.cp),
      ep: 0,
      gp: 0,
      sp: 0,
      treasure: "",
      pp: 0,
      owner: this.userId,
      characterClass: null,
      level: 0,
      xp: 0,
      languages,
      weapons: [
        { equipped: true, lucky: false, name: occupations.get(this.occupation).trainedWeapon, quantity: 1 },
      ],
      armor: [],
      mountGear: [],
      ammunition: [],
      notes: "",
    };
  }

  validate(data) {
    let valid = true;
    if (!this.validateName(data)) valid = false;
    if (!this.validateAlignment(data)) valid = false;
    if (!this.validateBirthAugur(data)) valid = false;
    if (!this.validateStr(data)) valid = false;
    if (!this.validateInt(data)) valid = false;
    if (!this.validateAgl(data)) valid = false;
    if (!this.validatePer(data)) valid = false;
    if (!this.validateSta(data)) valid = false;
    if (!this.validateLuck(data)) valid = false;
    if (!this.validateHP(data)) valid = false;
    if (!this.validateOccupation(data)) valid = false;
    if (!this.validateStartingEquipment(data)) valid = false;
    if (!this.validateCP(data)) valid = false;
    return valid;
  }

  validateName(data) {
    if (!data.name) {
      this.nameError = "Name is required";
      return false;
    }
    this.nameError = "";
    return true;
  }

  validateAlignment(data) {
    if (!data.alignment) {
      this.alignmentError = "Alignment is required";
      return false;
    }
    this.alignmentError = "";
    return true;
  }

  validateBirthAugur(data) {
    if (!data.birthAugur) {
      this.birthAugurError = "Birth Augur is required";
      return false;
    }
    this.birthAugurError = "";
    return true;
  }

  validateStr(data) {
    if (!data.strength) {
      this.strError = "Strength is required";
      return false;
    }
    this.strError = "";
    return true;
  }

  validateInt(data) {
    if (!data.intelligence) {
      this.intError = "Intelligence is required";
      return false;
    }
    this.intError = "";
    return true;
  }

  validateAgl(data) {
    if (!data.agility) {
      this.aglError = "Agility is required";
      return false;
    }
    this.aglError = "";
    return true;
  }

  validatePer(data) {
    if (!data.personality) {
      this.perError = "Personality is required";
      return false;
    }
    this.perError = "";
    return true;
  }

  validateSta(data) {
    if (!data.stamina) {
      this.staError = "Stamina is required";
      return false;
    }
    this.staError = "";
    return true;
  }

  validateLuck(data) {
    if (!data.luck) {
      this.luckError = "Luck is required";
      return false;
    }
    this.luckError = "";
    return true;
  }

  validateHP(data) {
    if (!data.hp) {
      this.hpError = "HP is required";
      return false;
    }
    this.hpError = "";
    return true;
  }

  validateOccupation(data) {
    if (!data.occupation) {
      this.occupationError = "Occupation is required";
      return false;
    }
    this.occupationError = "";
    return true;
  }

  validateStartingEquipment() {
    if (!this.startingEquipment) {
      this.startingEquipmentError = "Starting Equipment is required";
      return false;
    }
    this.startingEquipmentError = "";
    return true;
  }

  validateCP(data) {
    if (!data.cp) {
      this.cpError = "CP is required";
      return false;
    }
    this.cpError = "";
    return true;
  }

  diceButton(handler) {
    return html`
      <button class="roll-dice-button" @click="${handler}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-dice-5-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3zm2.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M8 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
          />
        </svg>
      </button>
    `;
  }

  rollStat(stat) {
    return () => {
      const roll1 = Math.floor(Math.random() * 6) + 1;
      const roll2 = Math.floor(Math.random() * 6) + 1;
      const roll3 = Math.floor(Math.random() * 6) + 1;
      this[stat] = roll1 + roll2 + roll3;
    };
  }

  rollName() {
    const roll = Math.floor(Math.random() * 200);
    this.name = names[roll];
  }

  rollOccupation() {
    const roll = Math.floor(Math.random() * 100) + 1;
    for (const [key, value] of Array.from(occupations.entries())) {
      if (Array.isArray(value.roll)) {
        if (value.roll.includes(roll)) {
          this.occupation = key;
          return;
        }
      } else {
        if (roll === value.roll) {
          this.occupation = key;
          return;
        }
      }
    }
  }

  rollBirthAugur() {
    const roll = Math.floor(Math.random() * 30);
    const augurs = Array.from(birthAugurs.entries());
    this.birthAugur = augurs[roll][0];
  }

  rollStartingEquipment() {
    this.startingEquipment = "hammer-small";

    const roll = Math.ceil(Math.random() * 24);
    const equipmentList = Array.from(equipment.entries());
    this.startingEquipment = equipmentList[roll][0];
  }

  rollAlignment() {
    const roll = Math.floor(Math.random() * 3);
    if (roll === 0) {
      this.alignment = "law";
    } else if (roll === 1) {
      this.alignment = "neutral";
    } else if (roll === 2) {
      this.alignment = "chaos";
    }
  }

  handleKeyDown(e, option) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.alignment = option;
    }
  }

  rollCP() {
    const roll1 = Math.floor(Math.random() * 12) + 1;
    const roll2 = Math.floor(Math.random() * 12) + 1;
    const roll3 = Math.floor(Math.random() * 12) + 1;
    const roll4 = Math.floor(Math.random() * 12) + 1;
    const roll5 = Math.floor(Math.random() * 12) + 1;
    this.cp = roll1 + roll2 + roll3 + roll4 + roll5;
  }

  rollHP() {
    const roll = Math.floor(Math.random() * 4) + 1;
    this.hp = roll;
  }

  rollCharacter() {
    this.rollName();
    this.rollStat("str")();
    this.rollStat("int")();
    this.rollStat("agl")();
    this.rollStat("per")();
    this.rollStat("sta")();
    this.rollStat("luck")();
    this.rollOccupation();
    this.rollBirthAugur();
    this.rollAlignment();
    this.rollStartingEquipment();
    this.rollCP();
    this.rollHP();
  }

  get totalHP() {
    const totalHP = Number(this.hp) + modifierFor(this.sta || 10);
    if (totalHP < 1) {
      return 1;
    }
    return totalHP;
  }

  get hpModifier() {
    return formatModifier(modifierFor(this.sta || 10));
  }

  render() {
    return html`
      <div class="wrapper border">
        <div class="title">
          <h1>
            Create Character
            ${this.diceButton(() => {
              this.rollCharacter();
              this.validate(this.data);
            })}
          </h1>
        </div>
        <div class="form">
          <form @submit="${this.onCreateCharacter}">
            <div class="form-elements">
              <div class="name form-element">
                <label for="name">Choose a name</label>
                <div class="text-row">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    .value="${this.name}"
                    @change="${(e) => (this.name = e.target.value)}"
                    @blur="${() => this.validateName(this.data)}"
                  />
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollName();
                    this.validateName(this.data);
                  })}
                </div>
                ${this.nameError &&
                html`<div class="error">${this.nameError}</div>`}
              </div>
              <div class="stats">
                <div class="str">
                  <label for="str">Strength</label>
                  <input
                    id="str"
                    name="str"
                    type="number"
                    .value="${this.str}"
                    min="3"
                    max="18"
                    @change="${(e) => (this.str = e.target.value)}"
                    @blur="${() => this.validateStr(this.data)}"
                  />
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollStat("str")();
                    this.validateStr(this.data);
                  })}
                </div>
                <div class="int">
                  <label for="int">Intelligence</label>
                  <input
                    id="int"
                    name="int"
                    type="number"
                    .value="${this.int}"
                    min="3"
                    max="18"
                    @change="${(e) => (this.int = e.target.value)}"
                    @blur="${() => this.validateInt(this.data)}"
                  />
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollStat("int")();
                    this.validateInt(this.data);
                  })}
                </div>
                <div class="agl">
                  <label for="agl">Agility</label>
                  <input
                    id="agl"
                    name="agl"
                    type="number"
                    .value="${this.agl}"
                    min="3"
                    max="18"
                    @change="${(e) => (this.agl = e.target.value)}"
                    @blur="${() => this.validateAgl(this.data)}"
                  />
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollStat("agl")();
                    this.validateAgl(this.data);
                  })}
                </div>
                <div class="per">
                  <label for="per">Personality</label>
                  <input
                    id="per"
                    name="per"
                    type="number"
                    .value="${this.per}"
                    min="3"
                    max="18"
                    @change="${(e) => (this.per = e.target.value)}"
                    @blur="${() => this.validatePer(this.data)}"
                  />
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollStat("per")();
                    this.validatePer(this.data);
                  })}
                </div>
                <div class="sta">
                  <label for="sta">Stamina</label>
                  <input
                    id="sta"
                    name="sta"
                    type="number"
                    .value="${this.sta}"
                    min="3"
                    max="18"
                    @change="${(e) => (this.sta = e.target.value)}"
                    @blur="${() => this.validateSta(this.data)}"
                  />
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollStat("sta")();
                    this.validateSta(this.data);
                  })}
                </div>
                <div class="luck">
                  <label for="luck">Luck</label>
                  <input
                    id="luck"
                    name="luck"
                    type="number"
                    .value="${this.luck}"
                    min="3"
                    max="18"
                    @change="${(e) => (this.luck = e.target.value)}"
                    @blur="${() => this.validateLuck(this.data)}"
                  />
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollStat("luck")();
                    this.validateLuck(this.data);
                  })}
                </div>
              </div>
              <div class="row">
                ${this.strError &&
                html`<div class="error">${this.strError}</div>`}
                ${this.intError &&
                html`<div class="error">${this.intError}</div>`}
                ${this.aglError &&
                html`<div class="error">${this.aglError}</div>`}
                ${this.perError &&
                html`<div class="error">${this.perError}</div>`}
                ${this.staError &&
                html`<div class="error">${this.staError}</div>`}
                ${this.luckError &&
                html`<div class="error">${this.luckError}</div>`}
              </div>
              <div class="row">
                <div class="hit-points">
                  <label for="hp">Hit Points</label>
                  <input
                    id="hp"
                    name="hp"
                    type="number"
                    .value="${this.hp}"
                    min="1"
                    @change="${(e) => (this.hp = e.target.value)}"
                    @blur="${() => this.validateHP(this.data)}"
                  />
                  ${this.hp && html`<span>${this.hpModifier}</span>`}
                  ${this.hp && html`<span>=</span>`}
                  ${this.hp && html`<span>${this.totalHP}</span>`}
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollHP();
                    this.validateHP(this.data);
                  })}
                </div>
                <div class="copper-pieces">
                  <label for="cp">Copper Pieces</label>
                  <input
                    id="cp"
                    name="cp"
                    type="number"
                    .value="${this.cp}"
                    min="1"
                    @change="${(e) => (this.cp = e.target.value)}"
                    @blur="${() => this.validateCP(this.data)}"
                  />
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollCP();
                    this.validateCP(this.data);
                  })}
                </div>
              </div>
              <div class="row">
                ${this.hpError &&
                html`<div class="error">${this.hpError}</div>`}
                ${this.cpError &&
                html`<div class="error">${this.cpError}</div>`}
              </div>
              <div class="occupation form-element">
                <label for="occupation">Roll occupation</label>
                <div class="text-row">
                  <select
                    name="occupation"
                    id="occupation"
                    @change="${(e) => {
                      this.occupation = e.target.value;
                      this.validateOccupation(this.data);
                    }}"
                    @blur="${() => this.validateOccupation(this.data)}"
                  >
                    <option>---</option>
                    ${Array.from(occupations.entries()).map(
                      ([key, value]) =>
                        html`<option
                          .value="${key}"
                          ?selected="${key === this.occupation}"
                        >
                          ${value.occupation}
                        </option>`
                    )}
                  </select>
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollOccupation();
                    this.validateOccupation(this.data);
                  })}
                </div>
                ${this.occupationError &&
                html`<div class="error">${this.occupationError}</div>`}
              </div>
              <div class="birth-augur form-element">
                <label for="birth-augur">Roll birth augur</label>
                <div class="text-row">
                  <select
                    name="birth-augur"
                    id="birth-augur"
                    @change="${(e) => {
                      this.birthAugur = e.target.value;
                      this.validateBirthAugur(this.data);
                    }}"
                    @blur="${() => this.validateBirthAugur(this.data)}"
                  >
                    <option>---</option>
                    ${Array.from(birthAugurs.entries()).map(
                      ([key, value]) =>
                        html`<option
                          .value="${key}"
                          ?selected="${key === this.birthAugur}"
                        >
                          ${value.birthAugur} (${value.luckyRoll})
                        </option>`
                    )}
                  </select>
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollBirthAugur();
                    this.validateBirthAugur(this.data);
                  })}
                </div>
                ${this.birthAugurError &&
                html`<div class="error">${this.birthAugurError}</div>`}
              </div>
              <div class="starting-equipment form-element">
                <label for="starting-equipment"
                  >Choose a piece of starting equipment</label
                >
                <div class="text-row">
                  <select
                    name="starting-equipment"
                    id="starting-equipment"
                    @change="${(e) => {
                      this.startingEquipment = e.target.value;
                      this.validateStartingEquipment(this.data);
                    }}"
                    @blur="${() => this.validateStartingEquipment(this.data)}"
                  >
                    <option>---</option>
                    ${Array.from(equipment.entries())
                      .filter(([key]) => key !== "")
                      .map(
                        ([key, value]) =>
                          html`<option
                            .value="${key}"
                            ?selected="${key === this.startingEquipment}"
                          >
                            ${value.name}
                          </option>`
                      )}
                  </select>
                  ${this.diceButton((e) => {
                    e.preventDefault();
                    this.rollStartingEquipment();
                    this.validateStartingEquipment(this.data);
                  })}
                </div>
                ${this.startingEquipmentError &&
                html`<div class="error">${this.startingEquipmentError}</div>`}
              </div>
              <div class="alignment">
                <input
                  type="radio"
                  name="alignment"
                  id="alignment-law"
                  value="law"
                  ?checked="${this.alignment === "law"}"
                />
                <label
                  class="${this.alignment === "law" ? "selected" : ""}"
                  for="alignment-law"
                  tabindex="0"
                  @click="${() => (this.alignment = "law")}"
                  @keydown="${(e) => this.handleKeyDown(e, "law")}"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-shield"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"
                    />
                  </svg>
                  Law
                </label>
                <input
                  type="radio"
                  name="alignment"
                  id="alignment-neutral"
                  value="neutral"
                  ?checked="${this.alignment === "neutral"}"
                />
                <label
                  class="${this.alignment === "neutral" ? "selected" : ""}"
                  for="alignment-neutral"
                  tabindex="0"
                  @click="${() => (this.alignment = "neutral")}"
                  @keydown="${(e) => this.handleKeyDown(e, "neutral")}"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-shield-shaded"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 14.933a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"
                    />
                  </svg>
                  Neutral
                </label>
                <input
                  type="radio"
                  name="alignment"
                  id="alignment-chaos"
                  value="chaos"
                  ?checked="${this.alignment === "chaos"}"
                />
                <label
                  class="${this.alignment === "chaos" ? "selected" : ""}"
                  for="alignment-chaos"
                  tabindex="0"
                  @click="${() => (this.alignment = "chaos")}"
                  @keydown="${(e) => this.handleKeyDown(e, "chaos")}"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-shield-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"
                    />
                  </svg>
                  Chaos
                </label>
                ${this.diceButton((e) => {
                  e.preventDefault();
                  this.rollAlignment();
                })}
              </div>
              ${this.alignmentError &&
              html`<div class="error">${this.alignmentError}</div>`}

              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("characters-create-page", CharactersCreatePage);
