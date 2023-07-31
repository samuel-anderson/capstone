import { createSelector } from "reselect";

import { CartState } from "./cart.reducer";
/*

Memoization is a specific form of caching that is used in dynamic programming. 
The purpose of caching is to improve the performance of our programs and keep data accessible that can be used later

Cache previous value of something, if input hasn't changed, then return same output
*/

//Inference from top level Cart State

import { RootState } from "../store";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
