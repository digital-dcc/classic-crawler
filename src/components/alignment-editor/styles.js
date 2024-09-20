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
  h1 {
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
  .alignments {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
	}
	.alignments label {
		display: flex;
		flex-direction: column;
		cursor: pointer;
		align-items: center;
	}
`;
