import { Middleware } from "redux";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!action.type) return next(action);

    console.log("action", action);
    console.log("type", action.type);
    console.log("payload", action.payload);
    console.log("currentState", store.getState());

    //synchronous
    next(action); //all reducers are updates, and selectors are triggered

    console.log("nextState", store.getState());
  };
