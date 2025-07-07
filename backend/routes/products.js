const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// List/filter products
router.get('/', async (req, res) => {
  try {
    const { category, title } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (title) filter.title = { $regex: title, $options: 'i' };
    const products = await Product.find(filter);
    // Map fields for frontend compatibility
    const mappedProducts = products.map(p => ({
      _id: p._id,
      name: p.title, // Map title to name
      description: p.description,
      images: p.images,
      price: p.price.toString(), // Convert price to string
      badge: p.badge || undefined,
      sizes: ["Small", "Medium", "Large"], // Default sizes
      availableSizes: ["Small", "Medium", "Large"], // Default available sizes
      lore: p.lore || '',
      category: p.category,
      stock: p.stock
    }));
    res.json(mappedProducts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin-only: Add product
router.post('/', auth, async (req, res) => {
  // For now, any authenticated user is admin (customize as needed)
  try {
    const { title, description, images, price, category, stock } = req.body;
    const product = new Product({ title, description, images, price, category, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin-only: Delete product
router.delete('/:id', auth, async (req, res) => {
  // For now, any authenticated user is admin (customize as needed)
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 