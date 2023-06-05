import { Middleware } from "@reduxjs/toolkit";

export const logger: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    if (!action.type) {
      return next(action);
    }
    console.log("type", action.type);
    console.log("payload", action.payload);
    console.log("current_state", getState());
    const result = next(action);
    console.log("next_state", getState());
    return result;
  };
