import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isOpen, setIsOpen } = useContext(CartContext);

  const clickHandler = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };

  return (
    <div className="cart-icon-container" onClick={clickHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
