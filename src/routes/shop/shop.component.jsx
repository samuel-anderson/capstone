import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/categories/categories.action";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
    //wrap async operations inside of async function
    // const getCategoriesMap = async () => {
    //   const categoriesArray = await getCategoriesAndDocuments("categories");
    //   dispatch(setCategories(categoriesArray));
    // };

    // getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
