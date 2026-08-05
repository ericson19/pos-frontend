import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(null);
  const cartItem = (product) => {
    setCartItems(product);
  };

  return (
    <CartContext.Provider value={{ cartItems, cartItem }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
