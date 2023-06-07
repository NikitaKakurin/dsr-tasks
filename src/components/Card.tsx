import "components/UI/Card/card.scss";
import { ICard } from "model/typescript";
import { useAppDispatch } from "app/hooks";
import { addToBasketAction } from "app/actionCreators/basketActionCreator";
interface IProps {
  data: ICard;
}

export default function Card({ data }: IProps) {
  const { img, title, rate, prevPrice, price, id } = data;
  const dispatch = useAppDispatch();
  function addToBasket() {
    dispatch(addToBasketAction(id));
  }
  return (
    <div className="card">
      <div className="card__img_container">
        <img src={img} alt={title} className="card__img" />
      </div>

      <div className="card__text_container">
        <div className="card__text_wrapper">
          <span className="card__title">{title}</span>
          <div className="card__price_wrapper">
            <span className="card__price">{`${price} ₽`}</span>
            <span className="card__price-prev">
              {prevPrice && `${prevPrice} ₽`}
            </span>
          </div>
        </div>
        <div className="card__btn_wrapper">
          <div className="card__stars">{rate}</div>
          <button className="card__buy_btn" onClick={addToBasket}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
