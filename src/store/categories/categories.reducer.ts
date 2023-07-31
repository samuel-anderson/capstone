import { Category } from "./categories.types";
import { AnyAction } from "redux";

import {
  fetchCategoriesFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "./categories.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

//Type Safe w/ Matchable Pattern
//Reducer can receive any action
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) return { ...state, isLoading: true };

  if (fetchCategoriesSuccess.match(action))
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };

  if (fetchCategoriesFailure.match(action))
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  return state;
  /*
  fundamental basis of the majority of our asynchronous actions when it comes to fetching inside of any
  redux based side effect library: redux-thunk, observable, and saga


  */
  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return { ...state, isLoading: true };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return {
  //       ...state,
  //       categories: action.payload,
  //       isLoading: false,
  //     };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return { ...state, isLoading: false, error: action.payload };
  //   default:
  //     return state;
  // }
};
