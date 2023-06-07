import Card from "components/Card";
import { useEffect } from "react";
import "style/mainPage.scss";
import { wireCards, wirelessCards } from "data/cardsData";
import { ICard } from "model/typescript";
import { useAppDispatch } from "app/hooks";
import { sagaActions } from "app/saga/sagaActions";
const generateCards = (item: ICard) => <Card data={item} key={item.id} />;

export default function MainPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_PRODUCTS_SAGA });
  });
  return (
    <main className="main">
      <h2 className="main__title">Наушники</h2>
      <div className="main__cards">{wireCards.map(generateCards)}</div>
      <h2 className="main__title">Беспроводные наушники</h2>
      <div className="main__cards main__cards_bottom">
        {wirelessCards.map(generateCards)}
      </div>
    </main>
  );
}
