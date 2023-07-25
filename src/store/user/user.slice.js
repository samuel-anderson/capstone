import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

//creates REDUCER, ACTIONS, and action TYPES
const { actions, reducer } = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    checkUserSession() {},
    emailSignInStart() {},
    googleSignInStart() {},
    signUpStart() {},
    signInSuccess(state, action) {
      state.currentUser = action.payload;
    },
    signInFailed(state, action) {
      state.error = action.payload;
    },
    signUpSuccess() {},
    signUpFailed(state, action) {
      state.error = action.payload;
    },
    signOutStart() {},
    signOutSuccess(state, _) {
      state.currentUser = null;
    },
    signOutFailed(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  checkUserSession,
  emailSignInStart,
  googleSignInStart,
  signUpStart,
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
} = actions;

export const userReducer = reducer;
