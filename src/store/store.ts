import { compose, configureStore, Middleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loggerMiddleware } from "./middleware/logger";
// import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";

// //import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// // combined location for redux, receive actions and dispatch into reducers to update the state
// // generate store object

// //sequence of curried functions
// //something that wants to generate side effects with actions before hitting reducers

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};
const persistConfig: ExtendedPersistConfig = {
  key: "root", //everything
  storage, //shorthand cast variable as key name
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//runs before actions hit reducers, like enhancers
const middleWares = [
  process.env.NODE_ENV === "development" && loggerMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware)); //remove falsey

// const composeEnhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: persistedReducer,
  //middleware: middleWares, //to replace default middleware which includes redux-thunk
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //or you can customize incoming object (pickedUser)
      thunk: false,
    }).concat([...middleWares, sagaMiddleware]),
});

sagaMiddleware.run(rootSaga); //unique to saga's configuration and instantiation

export const persistor = persistStore(store);
