"use client";

import { useState } from "react";
import { useCart } from "../../contexts/CartContext";

const Checkout = () => {
  const { state } = useCart();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <div className="w-[1200px] mx-auto h-screen">
      <div className="flex justify-center mt-44 mb-20">
        <p className="text-3xl font-bold">Your transaction was successful</p>
      </div>

      <div className="w-[800px] m-auto text-black flex-col">
        {state.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-items-center items-center mb-4 p-4 bg-white shadow-md rounded-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-20 w-20 object-contain"
            />
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
