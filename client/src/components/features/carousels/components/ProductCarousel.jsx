import React from 'react';
import PropTypes from 'prop-types';
import { ProductCard } from '../../products/components';

const ProductCarousel = ({ title, products }) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

ProductCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      mrp: PropTypes.number,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductCarousel;
