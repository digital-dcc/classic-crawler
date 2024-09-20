import {css} from 'lit';

export const styles = css`
  .wrapper {
    width: 1140px;
    margin: 0 auto;
    padding: 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-wrap: wrap;
  }
  .row,
  .stats div {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .stats {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px black solid;
    border-radius: 5px;
    padding: 10px;
  }
  .combat, .saving-throws {
    border: 1px black solid;
    border-radius: 5px;
    padding: 10px;
  }
	.row-items {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.item-1-3 {
		width:30%;
	}
  h2 {
    margin: 0 0 10px 0;
    padding: 0px;
    text-align: center;
    font-size: 0.8rem;
  }
  .birth-augur {
    width: 100%;
  }
  occupation-box {
    width: 100%;
  }
  .space-between {
    justify-content: space-between;
  }
  .alignment-xp {
    overflow: hidden;
  }
  .w-full {
    width: 100%;
  }
  .gap-10 {
    gap: 10px;
  }
	.gap-20 {
		gap: 20px;
	}
  .flex {
    display: flex;
  }
  .f-row {
    flex-direction: row;
  }
	.right-justify {
		justify-content: flex-end;
	}
`;
