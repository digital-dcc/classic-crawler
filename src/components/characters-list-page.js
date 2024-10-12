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
      background-color: teal;
      background-image: url("/images/witch.png");
    }
    .inner-wrapper {
      max-width: 1140px;
      margin: 0 auto;
      padding: 1em;
      font-size: 1.4rem;
    }
    .title-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgb(0, 0, 0, 0.4);
      padding: 1em;
      border-radius: 5px;
      color: white;
    }
    .title-line h1 {
      margin: 0;
      font-size: 2rem;
    }
    @media (max-width: 600px) {
      .title-line h1 {
        font-size: 1.6rem;
      }
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 10px;
      grid-auto-rows: 250px;
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
        <div class="inner-wrapper">
          <div class="title-line">
            <h1>My Characters</h1>
            <a href="/characters/create">Create</a>
          </div>
        </div>
      </div>
      <div class="inner-wrapper">
        <div class="character-list grid">
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
