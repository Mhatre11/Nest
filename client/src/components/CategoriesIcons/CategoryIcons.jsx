import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

// Import category icons
import FruitsVegetables from "../../assets/CategoriesIcons/Fruits-vegetables.avif";
import DairyBreadEggs from "../../assets/CategoriesIcons/Diary-Bread-Eggs.avif";
import ColdDrinksJuices from "../../assets/CategoriesIcons/ColdDrinks-Juices.avif";
import SnacksMunchies from "../../assets/CategoriesIcons/Snacks-Munchies.avif";
import TeaCoffee from "../../assets/CategoriesIcons/Tea_Coffee-HealthDrink.avif";
import AttaRiceDal from "../../assets/CategoriesIcons/Atta_Rice-Dal.avif";
import BabyCare from "../../assets/CategoriesIcons/BabyCare.avif";
import BakeryBiscuits from "../../assets/CategoriesIcons/Bakery-Biscuits.avif";
import BreakfastFood from "../../assets/CategoriesIcons/Breakfast-InstantFood.avif";
import HomeOffice from "../../assets/CategoriesIcons/Home-Office.avif";
import MasalaOil from "../../assets/CategoriesIcons/Masala-oil.avif";
import SweetTooth from "../../assets/CategoriesIcons/SweetTooth.avif";
import DefaultImage from "../../assets/CategoriesIcons/categoryDefaultImage.png";

const categoryIcons = {
  "Vegetables & Fruits": FruitsVegetables,
  "Dairy, Bread & Eggs": DairyBreadEggs,
  "Cold Drinks & Juices": ColdDrinksJuices,
  "Snacks & Munchies": SnacksMunchies,
  "Tea, Coffee & Health Drinks": TeaCoffee,
  "Atta, Rice & Dal": AttaRiceDal,
  "Baby Care": BabyCare,
  "Bakery & Biscuits": BakeryBiscuits,
  "Breakfast & Instant Food": BreakfastFood,
  "Home & Office": HomeOffice,
  "Masala & Oil": MasalaOil,
  "Sweet Tooth": SweetTooth
};

const CategoryIcons = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
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

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No categories available.</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Shop by Category</h2>
          <p className="mt-2 text-sm text-gray-600">Find your daily needs in our curated categories</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <motion.div
              key={category._id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link 
                to={`/category/${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="group block"
              >
                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-white shadow-sm">
                  <img
                    src={categoryIcons[category.name] || DefaultImage}
                    alt={category.name}
                    className="w-full h-full object-center object-contain group-hover:opacity-75"
                    onError={(e) => {
                      console.warn(`Failed to load image for category: ${category.name}`);
                      e.target.src = DefaultImage;
                    }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {category.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryIcons;
