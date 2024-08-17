"use client";

import { useCart } from "../contexts/CartContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Header = () => {
  const { state } = useCart();
  const [username, setUsername] = useState("");

  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift().trim();
    };

    const usernameFromCookie = getCookie("username");
    console.log("Username from cookie:", usernameFromCookie); // Debugging
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  }, []);

  const handleSignOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    setUsername(""); // Clear the username state
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <header className="bg-white text-black p-8 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#10A0A0]">
          Ecommerce Store
        </Link>
        <nav className="flex space-x-8 items-center">
          {!username ? (
            <Link
              href="/signin"
              className="relative text-[#10A0A0] hover:text-[#119393] font-semibold group"
            >
              Sign In
              <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 h-[2px] w-0 bg-[#119393] transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          ) : (
            <div className="flex items-center gap-4 text-[#10A0A0] font-semibold">
              <span>Welcome, {username}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-sm text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          )}
          <Link
            href="/cart"
            className="relative hover:text-gray-400 border-b-2 border-transparent"
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              color="#10A0A0"
              className="hover:text-[#119393]"
            />
            {totalItems > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-[8px]">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
