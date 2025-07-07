const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user }).populate('items.product');
    if (!cart) cart = await Cart.create({ user: req.user, items: [] });
    // Map items to include product title and size
    const cartResponse = {
      ...cart.toObject(),
      items: cart.items.map(item => ({
        id: item.product?._id ? item.product._id.toString() : item.product.toString(),
        product: item.product?._id || item.product,
        name: item.name || (item.product && item.product.title) || '',
        size: item.size,
        quantity: item.quantity,
        price: item.product?.price || 799, // fallback to 799 if not found
      }))
    };
    res.json(cartResponse);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to cart
router.post('/', auth, async (req, res) => {
  try {
    console.log('POST /api/cart body:', req.body); // Log incoming request
    const { productId, quantity, size, name } = req.body;
    let cart = await Cart.findOne({ user: req.user });
    if (!cart) cart = await Cart.create({ user: req.user, items: [] });
    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId && i.size === size);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1, size, name });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error('Error in POST /api/cart:', err); // Log error
    res.status(500).json({ message: 'Server error' });
  }
});

// Update item quantity
router.put('/', auth, async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;
    let cart = await Cart.findOne({ user: req.user });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const item = cart.items.find(i => i.product.toString() === productId && i.size === size);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/', auth, async (req, res) => {
  try {
    const { productId, size } = req.body;
    let cart = await Cart.findOne({ user: req.user });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(i => !(i.product.toString() === productId && i.size === size));
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 