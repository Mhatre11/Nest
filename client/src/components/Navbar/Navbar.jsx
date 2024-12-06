import React, { useState } from "react";
import { Button } from "flowbite-react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { HiOutlineLocationMarker, HiOutlineSearch, HiMenu, HiX } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "../../context/LocationContext";
import LocationModal from "../Location/LocationModal";
import { useCart } from "../../context/CartContext";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const { location } = useLocation();
  const { cartCount } = useCart();

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Location - Left Side */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex-shrink-0">
              <img 
                src="./src/assets/nest-logo.svg" 
                alt="Nest logo" 
                className="h-8 w-auto"
              />
            </Link>
            
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <HiOutlineLocationMarker className="text-xl" />
              <div className="text-left">
                <span className="text-xs text-gray-500">Delivery to</span>
                <p className="text-sm font-medium">
                  {location ? `${location.area}, ${location.pincode}` : "Select Location"}
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:block flex-1 max-w-2xl mx-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineSearch className={`text-xl ${searchFocused ? 'text-blue-600' : 'text-gray-400'}`} />
              </div>
              <input
                type="search"
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  searchFocused 
                    ? 'border-blue-600 ring-2 ring-blue-100' 
                    : 'border-gray-200 hover:border-gray-300'
                } focus:outline-none transition-all duration-200`}
                placeholder="Search for products..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Actions - Right Side */}
          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <FaRegUser className="text-xl" />
              <span className="text-sm font-medium">Login</span>
            </Link>

            <Link to="/cart" className="hidden md:block">
              <Button 
                color="blue"
                size="md"
                className="flex items-center gap-2 !bg-blue-600 hover:!bg-blue-700 transition-colors duration-200"
              >
                <LiaShoppingBagSolid className="text-xl" />
                <span className="font-medium">Cart</span>
                <span className="ml-1 px-2 py-0.5 text-xs bg-blue-700 rounded-full">
                  {cartCount}
                </span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Below Header */}
        <div className="md:hidden py-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="text-gray-400" />
            </div>
            <input
              type="search"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              placeholder="Search for products..."
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 w-full p-2"
              >
                <HiOutlineLocationMarker className="text-xl" />
                <div className="text-left">
                  <span className="text-xs text-gray-500">Delivery to</span>
                  <p className="text-sm font-medium">
                    {location ? `${location.area}, ${location.pincode}` : "Select Location"}
                  </p>
                </div>
              </button>
              <Link 
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 w-full p-2"
              >
                <FaRegUser className="text-xl" />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <Link to="/cart">
                <Button 
                  color="blue"
                  size="md"
                  className="flex items-center gap-2 !bg-blue-600 hover:!bg-blue-700 transition-colors duration-200 w-full p-2"
                >
                  <LiaShoppingBagSolid className="text-xl" />
                  <span className="font-medium">Cart</span>
                  <span className="ml-1 px-2 py-0.5 text-xs bg-blue-700 rounded-full">
                    {cartCount}
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </div>
  );
};

export default Nav;
