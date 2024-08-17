"use client";

import { CartProvider } from "../contexts/CartContext";

const Providers = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default Providers;
