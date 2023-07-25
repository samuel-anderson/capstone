import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./categories.action";

// import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { fetchCategoriesStart } from "./categories.slice";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories"); //method and parameters
    yield put(fetchCategoriesSuccess(categoriesArray)); //like dispatch
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

export function* onFetchcategories() {
  yield takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync); //receive action
}

export function* categoriesSaga() {
  yield all([call(onFetchcategories)]);
}
