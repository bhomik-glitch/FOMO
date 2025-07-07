const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Get past orders for user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate('products.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 