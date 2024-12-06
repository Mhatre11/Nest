import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// Add to cart
export const addToCart = async (request, response) => {
    try {
        const { productId, quantity } = request.body;
        const userId = request.user._id; // From auth middleware

        // Check if product exists and has enough stock
        const product = await Product.findById(productId);
        if (!product) {
            return response.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (product.stock < quantity) {
            return response.status(400).json({
                success: false,
                message: 'Not enough stock available'
            });
        }

        // Find or create cart for user
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [],
                totalAmount: 0
            });
        }

        // Check if product already in cart
        const existingItem = cart.items.find(item => 
            item.product.toString() === productId
        );

        if (existingItem) {
            // Update quantity if product exists
            existingItem.quantity += quantity;
            existingItem.price = product.price * existingItem.quantity;
        } else {
            // Add new item if product doesn't exist in cart
            cart.items.push({
                product: productId,
                quantity: quantity,
                price: product.price * quantity
            });
        }

        // Calculate total amount
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);

        // Save cart
        await cart.save();

        // Populate product details
        const populatedCart = await Cart.findById(cart._id)
            .populate('items.product', 'name price');

        response.status(200).json({
            success: true,
            message: 'Product added to cart',
            data: populatedCart
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Error adding to cart',
            error: error.message
        });
    }
};

// Get cart
export const getCart = async (request, response) => {
    try {
        const userId = request.user._id;

        const cart = await Cart.findOne({ user: userId })
            .populate('items.product', 'name price');

        if (!cart) {
            return response.status(200).json({
                success: true,
                data: {
                    items: [],
                    totalAmount: 0
                }
            });
        }

        response.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Error fetching cart',
            error: error.message
        });
    }
};

// Update cart item quantity
export const updateCartItem = async (request, response) => {
    try {
        const { productId, quantity } = request.body;
        const userId = request.user._id;

        // Validate quantity
        if (quantity < 1) {
            return response.status(400).json({
                success: false,
                message: 'Quantity must be at least 1'
            });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return response.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const cartItem = cart.items.find(item => 
            item.product.toString() === productId
        );

        if (!cartItem) {
            return response.status(404).json({
                success: false,
                message: 'Product not found in cart'
            });
        }

        // Update quantity and price
        const product = await Product.findById(productId);
        cartItem.quantity = quantity;
        cartItem.price = product.price * quantity;

        // Recalculate total
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);

        await cart.save();

        const updatedCart = await Cart.findById(cart._id)
            .populate('items.product', 'name price');

        response.status(200).json({
            success: true,
            message: 'Cart updated',
            data: updatedCart
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Error updating cart',
            error: error.message
        });
    }
};

// Remove item from cart
export const removeFromCart = async (request, response) => {
    try {
        const { productId } = request.params;
        const userId = request.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return response.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        // Remove item
        cart.items = cart.items.filter(item => 
            item.product.toString() !== productId
        );

        // Recalculate total
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);

        await cart.save();

        response.status(200).json({
            success: true,
            message: 'Item removed from cart',
            data: cart
        });

    } catch (error) {
        response.status(500).json({
            success: false,
            message: 'Error removing item from cart',
            error: error.message
        });
    }
};