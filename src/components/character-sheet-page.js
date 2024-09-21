import { LitElement, html } from "lit";
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
  getFirestore,
  setDoc,
} from "firebase/firestore";
import "./character-sheet/character-sheet";

export class CharacterSheetPage extends LitElement {
  static properties = {
    characterId: { attribute: "character-id", type: String },
    characterData: { attribute: "character-data", type: Object },
    userToken: { attribute: "user-token", type: String },
  };

  constructor() {
    super();
    this.characterId = null;
    this.characterData = {};
    this.userToken = null;
    this.docRef = null;
    this.saveTimer = null;
  }

  async firstUpdated() {
    const db = getFirestore(app);
    const auth = getAuth(app);
    this.docRef = doc(db, "characters", this.characterId);

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

  // async fetchData() {
  // 	try {
  // 		// @ts-ignore
  // 		const result = await getDoc(this.docRef);
  // 		// @ts-ignore
  // 		this.characterData = result.data();
  // 		console.log('fetched data');
  // 	} catch (error) {
  // 		console.error("Error fetching documents:", error.message);
  // 	}
  // };

  async change(e) {
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.characterData = e.detail;
    try {
      this.saveTimer = setTimeout(async () => {
        // @ts-ignore
        await setDoc(this.docRef, this.characterData);
        console.log("saved!");
      }, 200);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  render() {
    console.log(this.characterData, this.characterId);
    return html`<character-sheet
      .data=${this.characterData}
      @change=${this.change}
    ></character-sheet>`;
  }
}

customElements.define("character-sheet-page", CharacterSheetPage);
