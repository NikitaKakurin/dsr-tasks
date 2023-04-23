import React, { Component, RefObject } from "react";
import { fetchCrypto } from "../Api/fetchApi";
import Coin from "./Coin";

interface State {
  coins: Set<string>;
  coinsData: ICoinData;
}

interface ICoin {
  USD: number;
}

interface ICoinData {
  [key: string]: ICoin;
}

type Props = {};
class App extends Component<Props, State> {
  inputSearch: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      coins: new Set(),
      coinsData: {},
    };
    this.inputSearch = React.createRef();
  }

  componentDidMount(): void {
    this.addCoin("Dogecoin");
    setInterval(() => {
      const allCoinsRes = Array.from(this.state.coins).map((coin) => {
        const data = fetchCrypto(coin);
        return data.then((data) => {
          if (data.Response === "Error") return;
          if (data) return { coin, data };
        });
      });
      Promise.allSettled(allCoinsRes).then((res) => {
        const coinsData: ICoinData = {};
        res.forEach((item) => {
          if (item.status !== "fulfilled") return;
          if (!item.value) return;
          const { coin, data } = item.value;
          coinsData[coin] = data;
        });
        this.setState((state) => {
          return {
            coins: state.coins,
            coinsData: { ...state.coinsData, ...coinsData },
          };
        });
      });
    }, 5000);
  }

  deleteCoin = (coin: string) => {
    this.setState((state) => {
      const newCoins = new Set(
        Array.from(state.coins).filter((i) => i !== coin)
      );
      const newCoinsData = { ...state.coinsData };
      delete newCoinsData[coin];
      return {
        coins: newCoins,
        coinsData: newCoinsData,
      };
    });
  };

  addCoin = (value: string) => {
    const coin = value.toUpperCase();
    if (this.state.coins.has(coin)) return;
    const data = fetchCrypto(coin);
    data.then((data) => {
      if (data.Response === "Error") return;

      this.setState((state) => {
        return {
          coins: new Set([...Array.from(state.coins), coin]),
          coinsData: { ...state.coinsData, ...{ [coin]: data } },
        };
      });
    });
  };

  handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = this.inputSearch.current as HTMLInputElement;
    this.addCoin(input.value);
  };

  render = () => {
    const cryptos = Array.from(this.state.coins);
    const coinsData = this.state.coinsData;
    return (
      <div className="container">
        <h1 className="title">Hometask: Class components LC methods</h1>

        <div className="search">
          <input type="text" className="search_input" ref={this.inputSearch} />
          <button className="search_btn" onClick={this.handleClickSearch}>
            Search
          </button>
        </div>

        <table>
          <tbody>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>Direction</th>
            </tr>
            {cryptos.map((item) => (
              <Coin
                key={item}
                coin={item}
                usd={coinsData[item].USD}
                deleteCoin={this.deleteCoin}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  };
}

export default App;
