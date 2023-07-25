// import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.slice";
import { categoriesReducer } from "./categories/categories.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
