// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  addItemToCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

import {
  CheckoutItemContainer,
  ImageContainer,
  RemoveBtn,
  Name,
  Price,
  Quanity,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  // const { removeItemFromCart, addItemToCart, clearItemFromCart } =
  //   useContext(CartContext);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, quantity, price, imageUrl } = cartItem;

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removetemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quanity>
        <div className="arrow" onClick={removetemHandler}>
          &#10094;
        </div>

        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </Quanity>
      <Price>{price}</Price>
      <RemoveBtn onClick={clearItemHandler}>&#10005;</RemoveBtn>
      {/* <h2>{name}</h2>
      <span>{quantity}</span>
      <br />
      <span onClick={() => removeItemFromCart(cartItem)}>decrement</span>
      <br />
      <span onClick={() => addItemToCart(cartItem)}>increment</span> */}
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
