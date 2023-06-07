import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "model/typescript";

const initProducts: IProduct[] = [];
const initialState = {
  produsts: initProducts,
};

export const productSlice = createSlice({
  name: "Basket",
  initialState,
  reducers: {
    setProducts(state, { payload }: PayloadAction<IProduct[]>) {
      state.produsts = payload;
    },
  },
});

export default productSlice.reducer;
