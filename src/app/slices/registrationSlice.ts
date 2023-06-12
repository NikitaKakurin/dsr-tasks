import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RegisterState {
  login: string;
  password: string;
  firstName: string;
  secondName: string;
  birthday: string;
  email: string;
  middleName: string;
  old18: string;
  gender: string;
  subscribe: string;
  cardData: string;
  confirmPersonal: string;
  confirmCookie: string;
}

export type AuthState = Pick<RegisterState, "login" | "password">;

export type SubscribeState = Pick<RegisterState, "subscribe">;

export type CardState = Pick<RegisterState, "cardData">;

export type ConfirmState = Pick<
  RegisterState,
  "confirmPersonal" | "confirmCookie"
>;

export type ProfileState = Pick<
  RegisterState,
  | "firstName"
  | "secondName"
  | "birthday"
  | "email"
  | "middleName"
  | "old18"
  | "gender"
>;

const initialState: RegisterState = {
  login: "",
  password: "",
  secondName: "",
  firstName: "",
  birthday: "",
  email: "",
  middleName: "",
  old18: "",
  gender: "",
  subscribe: "",
  cardData: "",
  confirmPersonal: "",
  confirmCookie: "",
};

export const registrationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<AuthState>) => {
      state.login = payload.login;
      state.password = payload.password;
    },
    setProfileData: (state, { payload }: PayloadAction<ProfileState>) => {
      state.firstName = payload.firstName;
      state.secondName = payload.secondName;
      state.middleName = payload.middleName;
      state.old18 = payload.old18;
      state.birthday = payload.birthday;
      state.email = payload.email;
      state.gender = payload.gender;
    },
    setSubscribeData: (state, { payload }: PayloadAction<SubscribeState>) => {
      state.subscribe = payload.subscribe;
    },
    setCardData: (state, { payload }: PayloadAction<CardState>) => {
      state.cardData = payload.cardData;
    },
    setConfirmData: (state, { payload }: PayloadAction<ConfirmState>) => {
      state.confirmCookie = payload.confirmCookie;
      state.confirmPersonal = payload.confirmPersonal;
    },
  },
});

export const { setAuthData, setProfileData, setCardData, setSubscribeData } =
  registrationSlice.actions;
export default registrationSlice.reducer;
