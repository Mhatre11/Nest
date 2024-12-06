import express from 'express';
import { 
    getAllCategories, 
    getCategoryById, 
    createCategory,
    updateCategory,
    deleteCategory,
    upload 
} from '../controllers/categoryController.js';
import { validateCategory } from '../middleware/validateCategory.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', getAllCategories);

/**
 * @route   GET /api/categories/:id
 * @desc    Get single category by ID
 * @access  Public
 */
router.get('/:id', getCategoryById);

/**
 * @route   POST /api/categories
 * @desc    Create a new category with image upload
 * @access  Private (Admin only)
 */
router.post('/',
    verifyToken,
    upload.single('image'),
    validateCategory,
    createCategory
);

/**
 * @route   PUT /api/categories/:id
 * @desc    Update an existing category
 * @access  Private (Admin only)
 */
router.put('/:id',
    verifyToken,
    upload.single('image'),
    validateCategory,
    updateCategory
);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete a category
 * @access  Private (Admin only)
 */
router.delete('/:id',
    verifyToken,
    deleteCategory
);

export default router;