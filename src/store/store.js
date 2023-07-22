import { compose, createStore, applyMiddleware } from "redux";
//import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";

// combined location for redux, receive actions and dispatch into reducers to update the state
// generate store object

//sequence of curried functions
//something that wants to generate side effects with actions before hitting reducers
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);

  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState", store.getState());

  //synchronous
  next(action); //all reducers are updates, and selectors are triggered

  console.log("nextState", store.getState());
};

//runs before actions hit reducers, like enhancers
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
