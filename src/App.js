import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./global.styles";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
// import { checkUserSession } from "./store/user/user.action";
import { checkUserSession } from "./store/user/user.slice";
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from "./utils/firebase/firebase.utils";

const App = () => {
  const dispatch = useDispatch(); //won't change

  useEffect(() => {
    dispatch(checkUserSession());

    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   const pickedUser =
    //     user &&
    //     (({ accessToken, email }) =>
    //       ({
    //         accessToken,
    //         email,
    //       }(user)));
    //   dispatch(setCurrentUser(pickedUser)); //null or user object
    // });
    // return unsubscribe; //run on unmount, to prevent memory leak
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<Navigation />}>
          {/* Index - Determines if the route is an index route. Index routes render into their 
        parent's Outlet at their parent's URL (like a default child route). */}
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
