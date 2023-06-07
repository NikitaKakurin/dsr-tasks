import { ICard } from "model/typescript";
import "components/UI/BasketCard/basketCard.scss";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  addToBasketAction,
  deleteFromBasketAction,
  removeFromBasketAction,
} from "app/actionCreators/basketActionCreator";

interface IProps {
  data: ICard;
}
export default function BasketCard({ data }: IProps) {
  const { img, title, price, id } = data;

  const { inBasket } = useAppSelector((state) => state.basketReducer);
  const dispatch = useAppDispatch();

  function addToBasket() {
    dispatch(addToBasketAction(id));
  }

  function removeFromBasket() {
    dispatch(removeFromBasketAction(id));
  }

  function deleteFromBasket() {
    dispatch(deleteFromBasketAction(id));
  }
  return (
    <div className="basketCard">
      <div className="basketCard__data_container">
        <div className="basketCard__data">
          <img src={img} alt={title} className="basketCard__img" />
          <div className="basketCard__text_container">
            <span className="basketCard__title">{title}</span>
            <span className="basketCard__price">{`${price} ₽`}</span>
          </div>
        </div>
        <button className="basketCard__delete_btn" onClick={deleteFromBasket}>
          <img
            src="./assets/svg/delete.svg"
            alt="delete"
            className="basketCard__delete_img"
          />
        </button>
      </div>
      <div className="basketCard__control">
        <div className="basketCard__btns">
          <button
            className="basketCard__btn"
            onClick={removeFromBasket}
            disabled={inBasket[id] - 1 < 0}
          >
            <img
              src="./assets/svg/decrease.svg"
              alt="decrease"
              className="basketCard__btn_img"
            />
          </button>
          <div className="basketCard__amount">{inBasket[id]}</div>
          <button className="basketCard__btn" onClick={addToBasket}>
            <img
              src="./assets/svg/increase.svg"
              alt="increase"
              className="basketCard__btn_img"
            />
          </button>
        </div>
        <div className="basketCard__total_price">
          {`${inBasket[id] * +price} ₽`}{" "}
        </div>
      </div>
    </div>
  );
}
