import "components/UI/Card/card.scss";
import { IProduct } from "model/typescript";
import { useAppDispatch } from "app/hooks";
import { addToBasketAction } from "app/actionCreators/basketActionCreator";
interface IProps {
  data: IProduct;
}

export default function Card({ data }: IProps) {
  const { image, title, rating, price, id } = data;
  const dispatch = useAppDispatch();
  function addToBasket() {
    dispatch(addToBasketAction(id));
  }
  return (
    <div className="card">
      <div className="card__img_container">
        <img src={image} alt={title} className="card__img" />
      </div>

      <div className="card__text_container">
        <div className="card__text_wrapper">
          <span className="card__title">{title}</span>
          <div className="card__price_wrapper">
            <span className="card__price">{`${price} ₽`}</span>
          </div>
        </div>
        <div className="card__btn_wrapper">
          <div className="card__stars">{rating.rate}</div>
          <button className="card__buy_btn" onClick={addToBasket}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
