const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// POST /api/checkout
router.post('/', auth, async (req, res) => {
  try {
    const { address, cart } = req.body;
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    // Address validation
    const requiredFields = [
      'name', 'phone', 'addressLine1', 'city', 'state', 'pincode', 'country'
    ];
    const missingFields = requiredFields.filter(f => !address || !address[f] || !address[f].toString().trim());
    if (missingFields.length > 0) {
      return res.status(400).json({ message: 'Missing address fields', missingFields });
    }
    let total = 0;
    for (const item of cart) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ message: 'Invalid product in cart' });
      total += product.price * (item.quantity || 1);
    }
    const order = new Order({
      user: req.user,
      products: cart.map(item => ({ product: item.product, quantity: item.quantity })),
      shippingInfo: { address },
      paymentStatus: 'pending',
      total,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 