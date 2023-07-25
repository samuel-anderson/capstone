import { createSlice } from "@reduxjs/toolkit";

const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

//creates REDUCER, ACTIONS, and action TYPES
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    fetchCategoriesStart() {},
  },
});

export const { fetchCategoriesStart } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
