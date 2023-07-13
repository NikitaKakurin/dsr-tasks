import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { MODAL_TYPE } from "constants/modalType";

const initialState = {
  isShowModal: false,
  type: "" as MODAL_TYPE[keyof MODAL_TYPE],
  id: 0,
  title: "",
  description: "",
};

export type TModalState = typeof initialState;
export type TModalShowPayload = Omit<TModalState, "isShowModal">;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, { payload }: PayloadAction<TModalShowPayload>) => {
      state.description = payload.description;
      state.title = payload.title;
      state.type = payload.type;
      state.isShowModal = true;
      state.id = payload.id;
    },
    hideModal: (state) => {
      state.description = "";
      state.title = "";
      state.type = "";
      state.isShowModal = false;
      state.id = 0;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modalReducer;

export default modalSlice.reducer;
