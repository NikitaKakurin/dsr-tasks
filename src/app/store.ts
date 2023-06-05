import {
  configureStore,
  ThunkAction,
  Action,
  MiddlewareArray,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { logger } from "./logger";


// const logger: Middleware<{}, RootState> = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }
//   console.log("type", action.type);
//   console.log("payload", action.payload);
//   console.log("current_state", store.getState());
//   next(action);
//   console.log("next_state", store.getState());
// };

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // @ts-ignore
  middleware: new MiddlewareArray().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
