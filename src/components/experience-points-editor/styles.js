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
  h2 {
    text-align: center;
    margin: 0;
    padding: 0;
    margin-bottom: 20px;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .pt-10 {
    padding-top: 10px;
  }
  button {
    padding: 0;
    margin: 0;
    border-radius: 25%;
    cursor: pointer;
    border: none;
    background-color: #f2f2f2;
  }
	form {
		margin: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 20px;
		align-items: center;
	}
	input[type="number"], select {
		padding: 5px 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		width: 75px;
	}
	button {
		padding: 5px 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		width: 50px;
	}
	p {
		padding: 5px 10px;
	}
`;
