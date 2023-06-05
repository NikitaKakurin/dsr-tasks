import { Middleware } from "redux";
import { RootState } from "./store";

export const logger: Middleware<{}> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("current_state", store.getState());
  const result = next(action);
  console.log("next_state", store.getState());
  return result;
};
