import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
import { logger } from "./logger";
import basketReducer from "./slices/basketSlice";
import productReducer from "./slices/productSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga/saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

const rootReducer = combineReducers({
  basketReducer,
  productReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: true,
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
