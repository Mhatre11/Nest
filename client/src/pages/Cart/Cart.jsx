import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import { BsChevronRight } from 'react-icons/bs';

const Cart = () => {
  // This would typically come from your cart state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Organic Tomatoes",
      price: 49.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1546750670-50d46ba73ecd?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Whole Milk 1L",
      price: 89.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1000&auto=format&fit=crop"
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 40;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <BsChevronRight className="text-gray-400 mx-2" />
                <span className="text-gray-500 text-sm font-medium">Cart</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Add items to your cart to continue shopping</p>
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <HiOutlineMinus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <HiOutlinePlus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <BsTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-base font-medium text-gray-900">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/"
                className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;