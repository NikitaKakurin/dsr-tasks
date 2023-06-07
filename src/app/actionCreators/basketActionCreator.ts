import { AppDispatch } from "app/store";
import { basketSlice } from "../slices/basketSlice";
export const addToBasketAction = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(basketSlice.actions.addToBasket(id));
  };
};

export const removeFromBasketAction = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(basketSlice.actions.removeFromBasket(id));
  };
};

export const deleteFromBasketAction = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(basketSlice.actions.deleteFromBasket(id));
  };
};
