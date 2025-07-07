const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user,
      { $set: { name, email } },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user address
router.get('/address', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('address');
    res.json({ address: user.address });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user address
router.put('/address', auth, async (req, res) => {
  try {
    const { address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user,
      { $set: { address } },
      { new: true, runValidators: true }
    ).select('address');
    res.json({ address: user.address });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 