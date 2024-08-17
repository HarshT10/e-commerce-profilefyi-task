"use client";

import { useCart } from "../contexts/CartContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faTimes,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Header = () => {
  const { state } = useCart();
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    // Function to get cookie by name
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const usernameFromCookie = getCookie("username");
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white text-black p-8 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#10A0A0]">
          Ecommerce Store
        </Link>
        <div className="hidden lg:flex space-x-8 items-center">
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
        <button
          onClick={toggleMenu}
          className="lg:hidden text-[#10A0A0] text-2xl focus:outline-none"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-white shadow-lg transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <button onClick={toggleMenu} className="p-4 text-[#10A0A0] text-2xl">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="flex flex-col items-center flex-grow">
            <nav className="flex flex-col space-y-6">
              {!username ? (
                <Link
                  href="/signin"
                  className="text-[#10A0A0] font-semibold"
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  Sign In
                </Link>
              ) : (
                <div className="text-[#10A0A0] font-semibold">
                  <span>Welcome, {username}</span>
                  <button
                    onClick={() => {
                      handleSignOut();
                      toggleMenu();
                    }}
                    className="bg-red-500 text-sm text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              )}
              <Link
                href="/cart"
                className="text-[#10A0A0] font-semibold"
                onClick={toggleMenu}
              >
                Cart
                {totalItems > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-[8px] ml-2">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
