import {css} from 'lit';

export const styles = css`
  :host {
    display: block;
    padding: 0px;
    font-family: var(
      --primary-font,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol'
    );
    font-size: 1rem;
    --primary-text-color: black;
    --secondary-text-color: rgb(113, 133, 122);
    --background-color: #ffffff;
  }
  /*

	:host([theme='dark']) {
    --primary-text-color: #ffffff;
    --secondary-text-color: #c3c3c3;
    --background-color: #000000;
  }

	*/
  .wrapper {
    border-bottom: 1px black dotted;
    background-color: var(--background-color);
    color: var(--primary-text-color);
    min-width: 390px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  .buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  button.attack-display-button,
  button.damage-display-button {
    aspect-ratio: 1 / 1;
    border-radius: 5px;
    border: 1px var(--secondary-text-color) solid;
    cursor: pointer;
    background: none;
    width: 70px;
    margin: 0;
    padding: 0;
    color: var(--primary-text-color);
  }
  button:hover {
    background-color: rgba(211, 211, 211, 0.5);
  }
  button:active {
    transform: translateY(1px);
  }
  .wielding-and-subdual {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-wrap: wrap;
  }
  .dice-chain-adjustment-buttons {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .dice-chain-adjustment-buttons button {
    margin: 0;
    padding: 0px;
    aspect-ratio: 1/1;
    width: 22px;
    border: 1px var(--secondary-text-color) solid;
    cursor: pointer;
    border-radius: 50%;
  }
  .wrapper header .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 150px;
    text-align: left;
    gap: 5px;
    flex-wrap: wrap;
  }
  h3 {
    margin: 0;
    padding: 0;
    font-size: 1em;
  }
  h4 {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    font-weight: normal;
  }
  .range {
    font-size: 0.8rem;
  }
  ul {
    font-size: 0.8rem;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .checkboxes {
    margin: 0;
    padding: 0;
  }
  .checkboxes li {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  header {
    display: flex;
    justify-content: space-between;
  }
  input[type='checkbox'],
  input[type='radio'] {
    margin: 0;
  }
  .range ul {
    display: flex;
    gap: 5px;
  }
  .range label {
    display: flex;
    gap: 5px;
    flex-direction: row;
    align-items: center;
  }
  .attack {
    display: flex;
    gap: 5px;
  }
  .damage {
    display: flex;
    gap: 5px;
  }

  select {
    display: block;
    width: 100%;
    padding: 10px 25px 10px 10px;
    font-size: 0.8rem;
    line-height: 1.5;
    color: #333;
    background-color: #fff;
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"%3E%3Cpath fill="%23999" d="M2 0L0 2h4zM2 5L0 3h4z"/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 10px 10px;
    border: 1px solid black;
    border-radius: 5px;
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none;
    -moz-appearance: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  select:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none; /* Remove default outline */
  }

  select-wrapper::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 15px;
    pointer-events: none;
    transform: translateY(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #999 transparent transparent transparent;
  }

  select:disabled {
    background-color: #e9ecef;
    color: #6c757d;
    border-color: #ced4da;
    cursor: not-allowed;
  }

  select option {
    padding: 10px;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .custom-radio {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.8rem;
    color: #333;
  }

  .custom-radio input[type='radio'] {
    appearance: none; /* Hide the default radio button */
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    outline: none;
    cursor: pointer;
    transition: border-color 0.3s ease;
  }

  .custom-radio input[type='radio']:checked {
    border-color: #007bff;
    background-color: #007bff;
  }

  .custom-radio input[type='radio']:checked::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .custom-radio input[type='radio']:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }

  .custom-radio input[type='radio']:disabled {
    border-color: #ccc;
    background-color: #e9ecef;
    cursor: not-allowed;
  }

  .custom-radio input[type='radio']:disabled + .radio-label {
    color: #6c757d;
    cursor: not-allowed;
  }

  .keywords {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 105px;
    justify-content: center;
  }

  .middle-column {
    display: flex;
    width: 350px;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }

  @media (max-width: 800px) {
    header {
      gap: 10px;
    }
    .wrapper header .text {
      text-align: center;
    }
    .keywords {
      justify-content: space-around;
    }
    .buttons {
      flex-direction: column;
    }
  }
  @media (max-width: 600px) {
    header {
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }
    .wrapper header .text {
      text-align: center;
      width: 100%;
    }
    .middle-column {
      width: 100%;
    }
    .keywords {
      flex-direction: row;
      gap: 20px;
      justify-content: space-around;
      width: 100%;
    }
    .buttons {
      flex-direction: row;
      width: 100%;
    }
  }
`;
