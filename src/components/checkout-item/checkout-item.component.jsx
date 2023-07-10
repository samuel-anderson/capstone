import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  CheckoutItemContainer,
  ImageContainer,
  RemoveBtn,
  Name,
  Price,
  Quanity,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { removeItemFromCart, addItemToCart, clearItemFromCart } =
    useContext(CartContext);
  const { name, quantity, price, imageUrl } = cartItem;

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removetemHandler = () => removeItemFromCart(cartItem);

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
