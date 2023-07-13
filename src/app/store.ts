import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import todosReducer from "./slices/todosSlice";
import modalReducer from "./slices/modalSlice";
export const store = configureStore({
  reducer: { authReducer, todosReducer, modalReducer },
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
