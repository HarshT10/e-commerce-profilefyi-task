import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="h-[500px] cursor-pointer border text-black bg-white p-5 rounded-lg shadow-md hover:-translate-y-1 ease-in duration-100">
      <div className="h-full flex flex-col justify-between py-5">
        <img
          src={product.image}
          alt={product.title}
          className="h-32 object-contain w-full"
        />
        <h2 className="text-xl font-bold">{product.title}</h2>
        <p className="text-lg font-semibold text-black">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-[#10A0A0] text-white py-2 px-4 rounded hover:bg-[#119393] transition-all duration-300 ease-out "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
