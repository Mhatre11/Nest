import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import { seedCategories } from './categorySeeder.js';
import dotenv from 'dotenv';

dotenv.config();

async function createProductData(categoryMap) {
  return [
    // Vegetables & Fruits
    {
      name: "Fresh Onion",
      description: "Fresh and high-quality onions",
      price: 35,
      category: categoryMap["Vegetables & Fruits"],
      stock: 100,
      image: "/src/assets/Vegetables/Onion.avif",
      quantity: "1 kg"
    },
    {
      name: "Fresh Potato",
      description: "Fresh and clean potatoes",
      price: 40,
      category: categoryMap["Vegetables & Fruits"],
      stock: 100,
      image: "/src/assets/Vegetables/Potato.avif",
      quantity: "1 kg"
    },
    {
      name: "Fresh Tomato",
      description: "Ripe and fresh tomatoes",
      price: 45,
      category: categoryMap["Vegetables & Fruits"],
      stock: 100,
      image: "/src/assets/Vegetables/Tomato.avif",
      quantity: "1 kg"
    },

    // Dairy & Breakfast
    {
      name: "Fresh Milk",
      description: "Farm fresh milk",
      price: 60,
      category: categoryMap["Dairy & Breakfast"],
      stock: 50,
      image: "/src/assets/DairyBreadEggs/Milk.avif",
      quantity: "1 L"
    },
    {
      name: "Bread",
      description: "Freshly baked bread",
      price: 40,
      category: categoryMap["Dairy & Breakfast"],
      stock: 30,
      image: "/src/assets/DairyBreadEggs/Bread.avif",
      quantity: "400 g"
    },

    // Beverages
    {
      name: "Coca Cola",
      description: "Refreshing cola drink",
      price: 40,
      category: categoryMap["Beverages"],
      stock: 100,
      image: "/src/assets/ColdDrinks_Juices/CocaCola.avif",
      quantity: "750 ml"
    },
    {
      name: "Sprite",
      description: "Lemon lime flavored drink",
      price: 40,
      category: categoryMap["Beverages"],
      stock: 100,
      image: "/src/assets/ColdDrinks_Juices/Sprite.avif",
      quantity: "750 ml"
    },

    // Snacks & Munchies
    {
      name: "Lays Classic",
      description: "Classic salted potato chips",
      price: 20,
      category: categoryMap["Snacks & Munchies"],
      stock: 150,
      image: "/src/assets/Snacks_Munchies/Lays.avif",
      quantity: "52 g"
    },

    // Tea & Coffee
    {
      name: "Red Label Tea",
      description: "Premium tea leaves",
      price: 140,
      category: categoryMap["Tea, Coffee & Health Drinks"],
      stock: 50,
      image: "/src/assets/TeaCoffee_HealthDrinks/RedLabel.avif",
      quantity: "250 g"
    },
    {
      name: "Nescafe Classic",
      description: "Rich and aromatic instant coffee",
      price: 180,
      category: categoryMap["Tea, Coffee & Health Drinks"],
      stock: 40,
      image: "/src/assets/TeaCoffee_HealthDrinks/NescafeClassic.avif",
      quantity: "200 g"
    }
  ];
}

async function seedProducts() {
  try {
    // First seed categories and get the category map
    const categoryMap = await seedCategories();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Create product data with proper category references
    const products = await createProductData(categoryMap);

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Run the seeder
seedProducts();
