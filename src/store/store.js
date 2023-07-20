import { compose, createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";

// combined location for redux, receive actions and dispatch into reducers to update the state
// generate store object

//runs before actions hit reducers, like enhancers
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
