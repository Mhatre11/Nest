import Joi from 'joi';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import multer from 'multer';
import path from 'path';

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/products');
    },
    filename: function (req, file, cb) {
        cb(null, `product-${Date.now()}${path.extname(file.originalname)}`);
    }
});

export const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

// Validation Schema
const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name cannot exceed 100 characters'
    }),
    category: Joi.string().required().messages({
        'string.empty': 'Category is required'
    }),
    quantity: Joi.string().required().messages({
        'string.empty': 'Quantity is required'
    }),
    description: Joi.string().max(300).allow('').optional().messages({
        'string.max': 'Description cannot exceed 300 characters'
    }),
    price: Joi.number().min(0).required().messages({
        'number.min': 'Price must be a positive number',
        'any.required': 'Price is required'
    }),
    stock: Joi.number().integer().min(0).required().messages({
        'number.min': 'Stock must be a positive number',
        'any.required': 'Stock is required'
    }),
    image: Joi.string().allow('').optional(),
    isActive: Joi.boolean().default(true)
})

// Create a new product
export const createProduct = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = productSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.details.map(detail => detail.message)
            });
        }

        const { category } = req.body;

        // Check if category exists
        if (category) {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
        }

        const productData = {
            ...value
        };

        if (req.file) {
            productData.image = `/uploads/products/${req.file.filename}`;
        }

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true })
            .populate('category', 'name')
            .sort({ createdDate: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.find({ 
            category: categoryId,
            isActive: true 
        }).populate('category', 'name');

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Get single product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};

// Search products
export const searchProducts = async (req, res) => {
    try {
        const {query} = req.query;

        if(!query){
            return res.status(200).json({
                success : true,
                count : 0,
                data : []
            })
        }
         // Search products by name (case-insensitive)
         const products = await Product.find({
            name : {$regex : query , $options : 'i'},
            isActive : true
         }).populate('category' , 'name');

         res.status(200).json({
            success : true,
            count : products.length,
            data : products
         })

    }
    catch (error) {
        res.status(500).json({
            success : false,
            message : 'Error searching products',
            error : error.message
        })
    }
}

// Update product
export const updateProduct = async (req, res) => {
    try {
        // Validate update data
        const { error, value } = productSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.details.map(detail => detail.message)
            });
        }

        const productId = req.params.id;

        // Check if product exists
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Add image path if new image was uploaded
        const updateData = { ...value };
        if (req.file) {
            updateData.image = `/uploads/products/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try{
        const productId = req.params.id;

        // check if product exists
        let product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            success: true,
            message : "Product deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
}