import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetails = ({ isOpen, onClose, product, onAddToCart }) => {
  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart();
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="4xl">
      <Modal.Header>Product Details</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain rounded-lg"
            />
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              20% OFF
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-blue-600 font-medium tracking-wide uppercase mb-2">
                Beverages
              </p>
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">{product.quantity}</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                <span className="text-lg text-gray-500 line-through">
                  ₹{Math.round(product.price * 1.2)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Description</h3>
              <p className="text-gray-600">
                Experience the finest quality with our premium selection. This product offers exceptional
                value and quality, perfect for your daily needs.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Premium quality</li>
                <li>Fresh and authentic</li>
                <li>Best value for money</li>
                <li>Carefully selected and packaged</li>
              </ul>
            </div>

            <Button 
              gradientDuoTone="greenToBlue" 
              size="lg" 
              className="w-full"
              onClick={handleAddToCart}
            >
              <AiOutlineShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetails;
