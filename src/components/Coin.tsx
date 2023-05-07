import React, { Component } from "react";
import decrease from "../assets/decrease.svg";
import increase from "../assets/increase.svg";
interface Props {
  coin: string;
  usd: number;
  deleteCoin: (coin: string) => void;
}
interface State {
  isIncrease: boolean | null;
}
export default class Coin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isIncrease: null,
    };
  }
  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (this.props.usd === prevProps.usd) return;
    if (this.props.usd > prevProps.usd) {
      this.setState({
        isIncrease: true,
      });
    }
    if (this.props.usd < prevProps.usd) {
      this.setState({
        isIncrease: false,
      });
    }
  }
  render() {
    const isIncrease = this.state.isIncrease;
    const direction = isIncrease ? "increase" : "decrease";
    const src = isIncrease ? increase : decrease;
    const { coin, usd, deleteCoin } = this.props;
    return (
      <>
        <tr>
          <td>{`${coin}`}</td>
          <td>
            <span>{`${usd}`}</span>
            <span className="coin_usd">$USD</span>
          </td>
          <td>
            {isIncrease !== null && (
              <img src={src} alt={direction} height={16} />
            )}
          </td>
          <td>
            <button className="delete-btn" onClick={() => deleteCoin(coin)}>
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  }
}
