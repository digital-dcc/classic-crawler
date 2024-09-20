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
    --primary-text-color: black;
    --secondary-text-color: black;
    --background-color: #ffffff;
  }
  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  .wrapper {
    border: 1px solid var(--secondary-text-color);
    background-color: var(--background-color);
    color: var(--primary-text-color);
    padding-top: 10px;
    padding-bottom: 20px;
    border-radius: 5px;
    min-width: 390px;
    display: flex;
    flex-direction: column;
  }
  section,
  div {
    margin: 0;
    padding: 0;
  }
  h2 {
    margin: 0;
    padding: 0;
  }
  .checkboxes {
    margin: 0;
    padding: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    flex-wrap: wrap;
  }
  .checkboxes li {
    flex-direction: row;
    list-style: none;
    font-size: 0.8rem;
    min-width: fit-content;
  }
  .checkboxes label {
    display: flex;
    flex-direction: row;
    gap: 3px;
    align-items: center;
  }
  .you-are {
    color: var(--secondary-text-color);
    font-size: 1.1rem;
  }
  .your-target-is {
    color: var(--secondary-text-color);
    font-size: 1.1rem;
    margin-top: 10px;
  }
  .title {
    font-size: 0.8rem;
    color: var(--primary-text-color);
    text-align: center;
    border-bottom: 1px dotted black;
    padding-bottom: 10px;
  }
  .sub-title {
    font-size: 1rem;
    color: var(--primary-text-color);
    margin-bottom: 10px;
    font-weight: normal;
  }
  .inset {
    margin: 10px 10px 0 10px;
  }
`;
