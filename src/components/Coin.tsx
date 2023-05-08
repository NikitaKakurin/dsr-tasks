import { useRef, memo } from "react";
import decrease from "../assets/decrease.svg";
import increase from "../assets/increase.svg";
import usePrevious from "../hooks/usePrevious";
interface Props {
  coin: string;
  usd: number;
  deleteCoin: (coin: string) => void;
}

function Coin({ coin, usd, deleteCoin }: Props) {
  let isIncrease = useRef<boolean | null>(null);
  const prevPropsUsd = usePrevious(usd);
  if (prevPropsUsd !== undefined && prevPropsUsd !== usd) {
    isIncrease.current = usd > prevPropsUsd;
  }
  const direction = isIncrease.current ? "increase" : "decrease";
  const src = isIncrease.current ? increase : decrease;
  return (
    <>
      <tr>
        <td>{`${coin}`}</td>
        <td>
          <span>{`${usd}`}</span>
          <span className="coin_usd">$USD</span>
        </td>
        <td>
          {isIncrease.current !== null && (
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

export default memo(Coin);
