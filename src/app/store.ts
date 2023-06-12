import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import registrationReducer from "./slices/registrationSlice";
import thumbReducer from "./slices/thumbSlice";

export const store = configureStore({
  reducer: {
    auth: registrationReducer,
    thumb: thumbReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
