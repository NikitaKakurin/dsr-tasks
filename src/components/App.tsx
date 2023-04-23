import React, { Component, RefObject } from "react";
import { fetchCrypto } from "../Api/fetchApi";
interface State {
  cryptos: Set<string>;
}

interface Coin {
  USD: number;
}

interface coinData {
  [key: string]: Coin;
}

type Props = {};
class App extends Component<Props, State> {
  inputSearch: RefObject<HTMLInputElement>;
  coinsData: coinData;
  constructor(props: Props) {
    super(props);
    this.state = {
      cryptos: new Set(),
    };
    this.inputSearch = React.createRef();
    this.coinsData = {};
  }

  componentDidUpdate() {}

  componentDidMount(): void {
    this.addCoin("Dogecoin");
    setInterval(() => {
      const allCoinsRes = Array.from(this.state.cryptos).map((coin) => {
        const data = fetchCrypto(coin);
        return data.then((data) => {
          if (data.Response === "Error") return;
          return { coin, data };
        });
      });
      Promise.allSettled(allCoinsRes).then((res) => {
        res.forEach((item) => {
          if (item.status !== "fulfilled") return;
          if (!item.value) return;
          const { coin, data } = item.value;
          this.coinsData[coin] = data;
        });
      });
    }, 5000);
  }

  addCoin = (value: string) => {
    const coin = value.toUpperCase();
    if (this.state.cryptos.has(coin)) return;
    const data = fetchCrypto(coin);
    data.then((data) => {
      if (data.Response === "Error") return;
      this.coinsData[coin] = data;
      this.setState((state) => {
        return { cryptos: new Set([...Array.from(state.cryptos), coin]) };
      });
    });
  };

  handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = this.inputSearch.current as HTMLInputElement;
    this.addCoin(input.value);
  };

  render = () => {
    const cryptos = Array.from(this.state.cryptos);
    return (
      <div>
        <h1>Hometask: Class components LC methods</h1>
        <input type="text" ref={this.inputSearch} />
        <button onClick={this.handleClickSearch}>Search</button>
        <div className="coinList">
          {cryptos.map((item) => (
            <h2 key={item}>{`${item}: ${this.coinsData[item].USD}USD`}</h2>
          ))}
        </div>
      </div>
    );
  };
}

export default App;
