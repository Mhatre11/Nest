import express from 'express';
import {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
} from '../controllers/cartController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// All cart routes need authentication
router.use(verifyToken);

router.post('/add', addToCart);
router.get('/', getCart);
router.put('/update', updateCartItem);
router.delete('/remove/:productId', removeFromCart);

export default router;
