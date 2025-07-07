const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('wishlist');
    res.json(user.wishlist || []);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to wishlist
router.post('/', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from wishlist
router.delete('/', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user);
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 