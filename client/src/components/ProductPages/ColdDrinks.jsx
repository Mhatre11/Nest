import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/ProductCard';
import { toast } from 'react-hot-toast';

const ColdDrinks = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products', {
        params: {
          category: 'Beverages'
        }
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No beverages available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4 md:mx-8 lg:mx-16 xl:mx-36 mt-16">
      {products.map((product) => (
        <div className="w-full" key={product._id}>
          <Card
            id={product._id}
            name={product.name}
            image={product.image}
            quantity={product.quantity || '1 L'} // Default quantity for beverages
            price={product.price}
            description={product.description}
            stock={product.stock}
          />
        </div>
      ))}
    </div>
  );
};

export default ColdDrinks;
