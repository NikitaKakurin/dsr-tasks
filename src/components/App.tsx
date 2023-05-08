import React, { useState, useRef, useEffect } from "react";
import { fetchApi } from "../Api/fetchApi";
import Coin from "./Coin";
import { ICoin, ICoinData } from "../models/typescript";

function App() {
  const [coins, setCoins] = useState<Set<string>>(new Set());
  const [coinsData, setCoinsData] = useState<ICoinData>({});
  const inputSearch = useRef<HTMLInputElement>(null);

  const deleteCoin = (coin: string) => {
    setCoins((prevState) => {
      const newCoins = new Set(Array.from(prevState).filter((i) => i !== coin));
      return newCoins;
    });

    setCoinsData((prevState) => {
      const newCoinsData = { ...prevState };
      delete newCoinsData[coin];
      return newCoinsData;
    });
  };

  const addCoin = (value: string) => {
    const coin = value.toUpperCase();
    if (coins.has(coin)) return;
    const data = fetchApi(coin);
    data.then((data) => {
      if (!data) return;
      const newCoinsData = data as ICoin;
      setCoins((prevState) => new Set([...Array.from(prevState), coin]));

      setCoinsData((prevState) => ({
        ...prevState,
        ...{ [coin]: newCoinsData },
      }));
    });
  };

  const updateData = () => {
    console.log("updateData");
    const allCoinsRes = Array.from(coins).map((coin) => {
      const data = fetchApi(coin);
      return data.then((data) => {
        if (!data) return;
        console.log(data);
        if (data) return { coin, data };
      });
    });
    Promise.allSettled(allCoinsRes).then((res) => {
      const coinsDataAll: ICoinData = {};
      res.forEach((item) => {
        if (item.status !== "fulfilled") return;
        if (!item.value) return;
        const { coin, data } = item.value;
        coinsDataAll[coin] = data as ICoin;
      });
      setCoinsData((prevState) => ({ ...prevState, ...coinsDataAll }));
    });
  };

  useEffect(() => {
    addCoin("Dogecoin");
    const interval = setInterval(updateData, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [coins]);

  const handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = inputSearch.current as HTMLInputElement;
    addCoin(input.value);
  };

  return (
    <div className="container">
      <h1 className="title">Hometask: Class components LC methods</h1>

      <div className="search">
        <input type="text" className="search_input" ref={inputSearch} />
        <button className="search_btn" onClick={handleClickSearch}>
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
          {Array.from(coins).map((item) => (
            <Coin
              key={item}
              coin={item}
              usd={coinsData[item].USD}
              deleteCoin={deleteCoin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
