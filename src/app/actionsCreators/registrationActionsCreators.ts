import { AppDispatch } from "../store";
import {
  registrationSlice,
  AuthState,
  ProfileState,
  SubscribeState,
  CardState,
  ConfirmState,
} from "../slices/registrationSlice";

export const setAuthData = (data: AuthState) => {
  return (dispatch: AppDispatch) => {
    dispatch(registrationSlice.actions.setAuthData(data));
  };
};

export const setProfileData = (data: ProfileState) => {
  return (dispatch: AppDispatch) => {
    dispatch(registrationSlice.actions.setProfileData(data));
  };
};

export const setSubscribeData = (data: SubscribeState) => {
  return (dispatch: AppDispatch) => {
    dispatch(registrationSlice.actions.setSubscribeData(data));
  };
};

export const setCardData = (data: CardState) => {
  return (dispatch: AppDispatch) => {
    dispatch(registrationSlice.actions.setCardData(data));
  };
};

export const setConfirmData = (data: ConfirmState) => {
  return (dispatch: AppDispatch) => {
    dispatch(registrationSlice.actions.setConfirmData(data));
  };
};
