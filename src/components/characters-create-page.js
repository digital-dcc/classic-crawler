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

export class CharactersCreatePage extends LitElement {
  static get styles() {
    return css`
      .wrapper {
        width: 1140px;
        margin: 0 auto;
        padding: 0px;
      }
      input {
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
    `;
  }

  static get properties() {
    return {
      userToken: { attribute: "user-token", type: String },
      userId: { attribute: "user-id", type: String },
    };
  }

  constructor() {
    super();
    this.userToken = null;
    this.userId = null;
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
    const characterName = e.target["character-name"].value;
    if (!characterName) return;
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "characters"), {
      owner: this.userId,
      name: characterName,
      alignment: "neutral",
      characterClass: null,
      birthAugur: "lucky-star",
      maxStrength: 10,
      strength: 10,
      maxAgility: 10,
      agility: 10,
      maxStamina: 10,
      stamina: 10,
      maxIntelligence: 10,
      intelligence: 10,
      maxPersonality: 10,
      personality: 10,
      startingLuck: 10,
      maxLuck: 10,
      luck: 10,
      hp: 4,
      maxHP: 4,
      occupation: "cutpurse",
      level: 0,
      xp: 0,
      languages: ["common"],
      weapons: [],
      armor: [],
      equipment: [],
      mountGear: [],
      ammunition: [],
      notes: "",
    });
    window.location.href = `/character/${docRef.id}`;
  }

  render() {
    return html`
      <div class="wrapper border">
        <div class="title">
          <h1>Create Character</h1>
        </div>
        <div class="form">
          <form @submit="${this.onCreateCharacter}">
            <label for="character-name">Character Name</label>
            <div class="form-elements">
              <input name="character-name" type="text" />
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("characters-create-page", CharactersCreatePage);
