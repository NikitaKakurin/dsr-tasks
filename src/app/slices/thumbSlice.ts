import { createSlice } from "@reduxjs/toolkit";
import { allForms } from "../../components/Form";

export interface thumbState {
  formNumber: number;
}

const initialState: thumbState = {
  formNumber: 0,
};

export const thumbSlice = createSlice({
  name: "thumb",
  initialState,
  reducers: {
    increase: (state) => {
      const num = Math.min(allForms.length - 1, state.formNumber + 1);
      state.formNumber = num;
    },
    decrease: (state) => {
      const num = Math.max(0, state.formNumber - 1);
      state.formNumber = num;
    },
  },
});

export const { increase, decrease } = thumbSlice.actions;
export default thumbSlice.reducer;
