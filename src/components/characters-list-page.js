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
  getFirestore,
  setDoc,
} from "firebase/firestore";
import "./character-list-card/character-list-card";

export class CharactersListPage extends LitElement {
  static styles = css`
    .wrapper {
      width: 1140px;
      margin: 0 auto;
      padding: 0px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex-wrap: wrap;
    }
    .title-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .character-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    character-list-card {
      width: calc(
        33.33% - 20px
      ); /* Take up 1/3 of the width, with space for gap */
    }
  `;

  static properties = {
    characterId: { attribute: "character-id", type: String },
    characterData: { attribute: "character-data", type: Object },
    userToken: { attribute: "user-token", type: String },
  };

  constructor() {
    super();
    this.characterData = {};
    this.userToken = null;
    // this.docRef = null;
    this.saveTimer = null;
  }

  async firstUpdated() {
    // const db = getFirestore(app);
    const auth = getAuth(app);
    // this.docRef = doc(db, "characters", this.characterId);

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

  // async change(e) {
  // 	if (this.saveTimer) clearTimeout(this.saveTimer);
  // 	this.characterData = e.detail;
  //   try {
  // 		this.saveTimer = setTimeout(async () => {
  // 			// @ts-ignore
  // 			await setDoc(this.docRef, this.characterData);
  // 			console.log('saved!');
  // 		}, 200);
  //   } catch (e) {
  //     console.error("Error updating document: ", e);
  //   }
  // }

  render() {
    return html`
      <div class="wrapper">
        <div class="title-line">
          <h1>My Characters</h1>
          <a href="/characters/create">Create</a>
        </div>
        <div class="character-list">
          ${this.characterData.map(
            ({ id, data }) =>
              html`<character-list-card
                character-id=${id}
                character-name=${data.name}
              ></character-list-card>`
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("characters-list-page", CharactersListPage);
