import express from 'express';
import { 
    getAllProducts, 
    getProductById, 
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
} from '../controllers/productController.js';
import verifyToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
// GET all products
router.get('/', getAllProducts);
// GET products by category
router.get('/category/:categoryId', getProductsByCategory);
// Search products
router.get('/search', searchProducts);
// GET single product
router.get('/:id', getProductById);

// Protected routes(admin only)
// POST create new product with image upload
router.post('/', verifyToken, authorizeRoles('admin'), upload.single('image'), createProduct);
// PUT update product with image
router.put('/:id', verifyToken, authorizeRoles('admin'), upload.single('image'), updateProduct);
// DELETE product
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteProduct);

export default router;
