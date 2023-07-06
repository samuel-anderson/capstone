import { createContext, useState } from "react";

//context
export const CartContext = createContext({
  isOpen: false,
});

//provider
export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = { isOpen, setIsOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
