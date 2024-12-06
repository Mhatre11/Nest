import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';
import dotenv from 'dotenv';

dotenv.config();

const categories = [
  {
    name: "Vegetables & Fruits",
    description: "Fresh vegetables and fruits",
    image: "/public/images/categories/Fruits-vegetables.avif",
  },
  {
    name: "Dairy, Bread & Eggs",
    description: "Dairy products, bread, and breakfast items",
    image: "/public/images/categories/Diary-Bread-Eggs.avif",
  },
  {
    name: "Cold Drinks & Juices",
    description: "Refreshing beverages and drinks",
    image: "/public/images/categories/ColdDrinks-Juices.avif",
  },
  {
    name: "Snacks & Munchies",
    description: "Delicious snacks and quick bites",
    image: "/public/images/categories/Snacks-Munchies.avif",
  },
  {
    name: "Tea, Coffee & Health Drinks",
    description: "Hot beverages and health drinks",
    image: "/public/images/categories/Tea_Coffee-HealthDrink.avif",
  },
  {
    name: "Atta, Rice & Dal",
    description: "Essential grains and pulses",
    image: "/public/images/categories/Atta_Rice-Dal.avif",
  },
  {
    name: "Baby Care",
    description: "Products for baby care and hygiene",
    image: "/public/images/categories/BabyCare.avif",
  },
  {
    name: "Bakery & Biscuits",
    description: "Fresh baked goods and biscuits",
    image: "/public/images/categories/Bakery-Biscuits.avif",
  },
  {
    name: "Chicken, Meat & Fish",
    description: "Fresh meat and seafood products",
    image: "/public/images/categories/Chicken-Meat-Fish.avif",
  },
  {
    name: "Cleaning Essentials",
    description: "Home cleaning and maintenance products",
    image: "/public/images/categories/Cleaning-Essentials.avif",
  },
  {
    name: "Personal Care",
    description: "Personal hygiene and care products",
    image: "/public/images/categories/Personal-Care.avif",
  },
  {
    name: "Pet Care",
    description: "Products for pet care and maintenance",
    image: "/public/images/categories/Pet-Care.avif",
  }
];

const seedCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Connected to MongoDB successfully');

    // Delete existing categories
    await Category.deleteMany({});
    console.log('Existing categories deleted');

    // Insert new categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories seeded successfully:', createdCategories);

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');

  } catch (error) {
    console.error('Error seeding categories:', error);
    // Ensure the connection is closed even if there's an error
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

// Run the seeder
seedCategories();
