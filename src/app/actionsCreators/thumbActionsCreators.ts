import { AppDispatch } from "../store";
import { thumbSlice } from "../slices/thumbSlice";

export const nextForm = () => {
  return (dispatch: AppDispatch) => {
    dispatch(thumbSlice.actions.increase());
  };
};

export const prevForm = () => {
  return (dispatch: AppDispatch) => {
    dispatch(thumbSlice.actions.decrease());
  };
};
