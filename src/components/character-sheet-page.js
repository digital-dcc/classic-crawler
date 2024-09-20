import { LitElement, html } from "lit";
import { app } from '../firebase/client';
import {
	collection,
	query,
	where,
	doc,
	getDoc,
	getFirestore,
	setDoc,
} from 'firebase/firestore';
import "./character-sheet/character-sheet";

export class CharacterSheetPage extends LitElement {
  static properties = {
		characterId: { attribute: 'character-id', type: String },
    characterData: { attribute: 'character-data', type: Object },
  };

  constructor() {
    super();
		this.characterId = null;
    this.characterData = {};
  }

  async connectedCallback() {
    super.connectedCallback();
		const db = getFirestore(app);
		const docRef = doc(db, 'characters', this.characterId);
		const result = await getDoc(docRef);
		// @ts-ignore
		this.characterData = result.data();
  }

  change(e) {
    this.characterData = e.detail;
  }

  render() {
		console.log(this.characterData, this.characterId)
    return html`<character-sheet
      .data=${this.characterData}
      @change=${this.change}
    ></character-sheet>`;
  }
}

customElements.define("character-sheet-page", CharacterSheetPage);
