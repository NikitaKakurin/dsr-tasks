import BasketCard from "components/BasketCard";
import "style/basketPage.scss";
import { IInBasket, IProduct } from "model/typescript";
import { useAppSelector } from "app/hooks";

const getCardsInBasket = (inBasket: IInBasket, data: IProduct[]) => {
  const idArr = Object.keys(inBasket);
  return data.filter((card) => idArr.includes(`${card.id}`));
};

const getTotalPrice = (cards: IProduct[], inBasket: IInBasket) => {
  let sum = 0;
  cards.forEach((card) => (sum += +card.price * inBasket[card.id]));
  return sum;
};

export default function BasketPage() {
  const { inBasket } = useAppSelector((state) => state.basketReducer);
  const { products } = useAppSelector((state) => state.productReducer);
  const cardsInBasket = getCardsInBasket(inBasket, products);
  const totalPrice = getTotalPrice(cardsInBasket, inBasket);
  return (
    <div className="basketPage">
      <h2 className="basketPage__title">Корзина</h2>
      <div className="basketPage__container">
        <div className="basketPage__cards">
          {cardsInBasket.map((data) => (
            <BasketCard data={data} key={data.id} />
          ))}
        </div>
        <div className="aside">
          <div className="aside__text_container">
            <div>ИТОГО</div>
            <div>{`₽ ${totalPrice.toFixed(2)}`}</div>
          </div>
          <button className="aside__btn">Перейти к офрмлению</button>
        </div>
      </div>
    </div>
  );
}
