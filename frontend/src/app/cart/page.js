"use client";

import Link from "next/link";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const { state, dispatch } = useCart();
  const [discount, setDiscount] = useState("");

  const removeItem = (id) => {
    dispatch({ type: "REMOVE", payload: { id } });
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch({ type: "UPDATE", payload: { id, quantity } });
  };

  const applyDiscount = () => {
    if (discount === "10OFF") {
      return (
        state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) * 0.9
      ); // 10% off
    }
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const totalPrice = applyDiscount();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl text-[#10A0A0] font-bold mt-10 mb-4">
        Your Cart
      </h1>
      {state.items.length > 0 ? (
        <div>
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 p-4 bg-white shadow-md rounded-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 object-contain"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="text-black">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white py-2 px-4 mt-5 rounded hover:bg-red-600"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
          <div className="mt-4 text-right">
            <div className="mb-4">
              <label
                htmlFor="discount"
                className="block text-lg font-bold text-left"
              >
                Discount Code: 10OFF
              </label>
              <input
                id="discount"
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="mt-1 text-black block w-full border-gray-300 pl-3 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-0"
              />
            </div>
            <p className="text-lg font-bold mb-2">
              Subtotal: $
              {state.items
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
            <p className="text-lg font-bold mb-4">
              Total: ${totalPrice.toFixed(2)}
            </p>
            {/* Add your checkout logic here */}
            <Link
              href="/checkout"
              className="bg-[#10A0A0] hover:bg-[#119393] text-white py-2 px-4 rounded "
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-[#10A0A0]">Your cart is empty.</p>
      )}
    </div>
  );
}
