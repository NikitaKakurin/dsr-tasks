import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "model/typescript";

const initProducts: IProduct[] = [];
const initialState = {
  products: initProducts,
};

export const productSlice = createSlice({
  name: "Basket",
  initialState,
  reducers: {
    setProducts(state, { payload }: PayloadAction<IProduct[]>) {
      state.products = payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
