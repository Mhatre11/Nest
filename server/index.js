/**
 * Main application file for the Grocery Store Backend
 * This file sets up the Express server, connects to MongoDB,
 * configures middleware, and defines basic error handling
 * 
 * @author Harsh Mhatre
 * @version 1.0.0
 */

// Required External Modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import dbConnect from './config/dbconnect.js';


// Load environment variables from .env file
dotenv.config();


/**
 * Express application initialization
 * This creates the main app instance that will be used to define
 * routes, middleware, and start the server
 */
const app = express();

/**
 * Middleware Configuration
 * cors: Enables Cross-Origin Resource Sharing for all routes
 * express.json: Parses incoming JSON payloads
 * express.urlencoded: Parses URL-encoded bodies (form data)
 */
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5001'], // Vite development server and Express server
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/public', express.static('public'));
app.use('/uploads', express.static('public/uploads'));

/** 
 * Database Connection
 */
dbConnect();

/**
 * Route Definitions
 * Define basic routes here. More complex routes should be
 * modularized into separate route files
 */
app.get('/', (request, response) => {
  response.send('Grocery Store API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/categories', categoryRoutes);

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

/**
 * Server Initialization
 * Starts the Express server on the specified port
 * Falls back to port 5000 if no port is specified in environment
 */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running http://localhost:${PORT}`);
});
