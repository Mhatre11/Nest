// Import mongoose to create database schemas and models
import mongoose from 'mongoose';

// Create a new schema for categories
// This defines what data a category can have
const categorySchema = new mongoose.Schema({
    // Name field: Every category must have a name
    name: {
        type: String,          // The name will be text
        required: true,        // Name is mandatory
        trim: true ,
        unique: true           // Remove spaces from start and end
    },

    // Description field: Optional details about the category
    description: {
        type: String,         // Description will be text
        trim: true,          // Remove spaces from start and end
        default: ''          // If no description given, use empty string
    },

    // Image field: For category image
    image: {
        type: String,        // Store the image URL/path as text
        default: '/public/images/categoryDefaultImage.png'  // Default image if none provided
    },

    // Status field: To check if category is active or not
    isActive: {
        type: Boolean,       // true or false only
        default: true       // New categories are active by default
    },

    // Created date: When was this category added
    createdDate: {
        type: Date,         // Date type for timestamps
        default: Date.now  // Automatically set to current date/time
    }
});

// Create a model from our schema
// This gives us a Category object we can use to create, read, update and delete categories
const Category = mongoose.model('Category', categorySchema);

// Export the model so we can use it in other files
export default Category;