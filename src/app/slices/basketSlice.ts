import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInBasket } from "model/typescript";

const initBasket: IInBasket = {};
const initialState = {
  inBasket: initBasket,
};
type PayloadAdd = string;

export const basketSlice = createSlice({
  name: "Basket",
  initialState,
  reducers: {
    addToBasket(state, { payload }: PayloadAction<PayloadAdd>) {
      const productId = payload;
      state.inBasket[productId]
        ? (state.inBasket[productId] += 1)
        : (state.inBasket[productId] = 1);
    },
    removeFromBasket(state, { payload }: PayloadAction<PayloadAdd>) {
      const productId = payload;
      state.inBasket[productId]
        ? (state.inBasket[productId] -= 1)
        : (state.inBasket[productId] = 0);
    },
    deleteFromBasket(state, { payload }: PayloadAction<PayloadAdd>) {
      const productId = payload;
      delete state.inBasket[productId];
    },
  },
});

export default basketSlice.reducer;
