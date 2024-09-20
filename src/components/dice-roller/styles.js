import {css} from 'lit';

export const styles = css`
  :host {
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
  }
  h1,
  .roll-description {
    text-align: center;
    margin: 0;
    padding: 0;
  }
  .roll-description {
    margin-bottom: 15px;
  }
  .roll-adjustment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border-top: 1px dashed #f2f2f2;
    padding-top: 10px;
  }
  @media (max-width: 400px) {
    .roll-adjustment-section {
      flex-direction: column;
    }
  }
  .roll-adjustment-section {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  button {
    padding: 0;
    margin: 0;
    border-radius: 25%;
    cursor: pointer;
    border: none;
    background-color: #f2f2f2;
  }
  .roll-adjustment button {
    width: 30px;
    height: 30px;
  }
  .roll-button {
    width: 100%;
    padding: 10px;
    background-color: #f2f2f2;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .value {
    text-align: center;
  }
  .qty-value {
    width: 10px;
  }
  .die-value {
    width: 25px;
  }
  .modifier-value {
    width: 20px;
  }
  .roll-result h2,
  .roll-result p {
    text-align: center;
  }
  .modifier-breakdown {
    padding: 10px 0;
    margin: 0;
    border-top: 1px dashed #f2f2f2;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .modifier-breakdown-entry {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .quantity-adjustment-button {
    background-color: #f2f2f2;
    text-align: center;
    justify-items: center;
    font-size: 0.8rem;
    line-height: 0.8rem;
  }
  .quantity-adjustment-button {
    border-radius: 5px;
    width: 40px;
    height: 25px;
  }
  .roll-adjustment button.luck-burn-button {
    width: 50px;
    height: 30px;
    border-radius: 5px;
  }
  .die-result {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-top: 1px dashed #f2f2f2;
    font-size: 1.4rem;
  }
  .roll-modifier {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px dashed #f2f2f2;
    padding: 10px 0;
  }
  .final-total {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px dashed #f2f2f2;
    font-size: 1.4rem;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .pt-10 {
    padding-top: 10px;
  }
  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .result-text {
    font-size: 1rem;
    width: 200px;
    font-weight: normal;
  }
`;
