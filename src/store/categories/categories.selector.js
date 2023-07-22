import { createSelector } from "reselect";

/*

Memoization is a specific form of caching that is used in dynamic programming. 
The purpose of caching is to improve the performance of our programs and keep data accessible that can be used later

Cache previous value of something, if input hasn't changed, then return same output
*/

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
