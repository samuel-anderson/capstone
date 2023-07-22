import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loggerMiddleware } from "./middleware/logger";
//import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";
import thunk from "redux-thunk";

// combined location for redux, receive actions and dispatch into reducers to update the state
// generate store object

//sequence of curried functions
//something that wants to generate side effects with actions before hitting reducers

const persistConfig = {
  key: "root", //everything
  storage, //shorthand cast variable as key name
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//runs before actions hit reducers, like enhancers
const middleWares = [
  process.env.NODE_ENV !== "production" && loggerMiddleware,
  thunk,
].filter(Boolean); //remove falsey

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
