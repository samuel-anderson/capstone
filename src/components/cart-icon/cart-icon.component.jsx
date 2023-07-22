// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  //const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const dispatch = useDispatch();

  const clickHandler = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={clickHandler}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
