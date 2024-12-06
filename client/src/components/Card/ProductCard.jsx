import React, { useState } from "react";
import { Button } from "flowbite-react";
import { AiOutlineShoppingCart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ProductDetails from "../ProductDetails/ProductDetails";
import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast";

const ProductCard = ({ id, name, image, quantity: stockQuantity, price }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart, updateQuantity, getItemQuantity } = useCart();

  const cartQuantity = getItemQuantity(id);

  const handleQuickView = () => {
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = () => {
    addToCart({ id, name, image, quantity: stockQuantity, price });
    toast.success(`${name} added to cart!`);
  };

  const handleUpdateQuantity = (newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4">
      {/* Discount Tag */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full z-20">
        20% OFF
      </div>
      
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button 
            onClick={handleQuickView}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Category */}
        <p className="text-xs text-blue-600 font-medium tracking-wide uppercase">
          Beverages
        </p>
        
        {/* Name */}
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-[40px]">
          {name}
        </h3>
        
        {/* Quantity */}
        <p className="text-sm text-gray-500">
          {stockQuantity}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 line-through">₹{Math.round(price * 1.2)}</p>
            <p className="text-lg font-semibold text-gray-900">₹{price}</p>
          </div>
          
          {cartQuantity === 0 ? (
            <Button
              color="blue"
              size="sm"
              className="!bg-blue-600 hover:!bg-blue-700 transition-colors duration-300 rounded-lg gap-2 items-center"
              onClick={handleAddToCart}
            >
              <AiOutlineShoppingCart className="text-lg" />
              <span>Add</span>
            </Button>
          ) : (
            <div className="flex items-center justify-between gap-2 bg-blue-600 text-white rounded-lg p-1">
              <button
                onClick={() => handleUpdateQuantity(cartQuantity - 1)}
                className="p-1 hover:bg-blue-700 rounded transition-colors"
              >
                <AiOutlineMinus className="text-lg" />
              </button>
              <span className="font-medium min-w-[20px] text-center">{cartQuantity}</span>
              <button
                onClick={() => handleUpdateQuantity(cartQuantity + 1)}
                className="p-1 hover:bg-blue-700 rounded transition-colors"
              >
                <AiOutlinePlus className="text-lg" />
              </button>
            </div>
          )}
        </div>
      </div>
      <ProductDetails
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={{ id, name, image, quantity: stockQuantity, price }}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductCard;
