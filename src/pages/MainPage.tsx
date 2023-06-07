import Card from "components/Card";
import { useEffect } from "react";
import "style/mainPage.scss";
import { IProduct } from "model/typescript";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { sagaActions } from "app/saga/sagaActions";

export default function MainPage() {
  const generateCards = (item: IProduct) => <Card data={item} key={item.id} />;
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_PRODUCTS_SAGA });
  }, [dispatch]);

  return (
    <main className="main">
      <h2 className="main__title">Goods</h2>
      <div className="main__cards">{products.map(generateCards)}</div>
    </main>
  );
}
