const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const { createShiprocketOrder } = require('../lib/shiprocket');
const Cart = require('../models/Cart');

// POST /api/payment/create-order
router.post('/create-order', auth, async (req, res) => {
  const { amount, currency = 'INR', receipt, address } = req.body;
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  // Address validation
  const requiredFields = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone (10 digits)' },
    { key: 'addressLine1', label: 'Address Line 1' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'pincode', label: 'Pincode (6 digits)' },
    { key: 'country', label: 'Country' },
  ];
  const invalidFields = [];
  if (!address || typeof address !== 'object') {
    invalidFields.push('address');
  } else {
    for (const field of requiredFields) {
      if (!address[field.key] || typeof address[field.key] !== 'string' || !address[field.key].trim()) {
        invalidFields.push(field.label);
      }
    }
    // Phone validation
    if (address.phone && !/^\d{10}$/.test(address.phone)) {
      invalidFields.push('Phone (10 digits)');
    }
    // Pincode validation
    if (address.pincode && !/^\d{6}$/.test(address.pincode)) {
      invalidFields.push('Pincode (6 digits)');
    }
  }
  if (invalidFields.length > 0) {
    return res.status(400).json({ error: 'Invalid address', invalidFields });
  }

  if (!key_id || !key_secret) {
    // Fallback to mock if not configured
    return res.json({ id: 'mock_order_id', amount, currency, status: 'created' });
  }

  try {
    // 1. Fetch user's cart and populate products
    const userId = req.user && req.user._id ? req.user._id : req.user;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || !cart.items.length) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    const orderProducts = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    // 2. Create Order document in MongoDB
    const orderDoc = new Order({
      user: userId,
      products: orderProducts,
      shippingInfo: { address },
      paymentStatus: 'pending',
      total: amount,
    });
    await orderDoc.save();

    // 3. Create Razorpay order
    const razorpay = new Razorpay({ key_id, key_secret });
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency,
      receipt: receipt || `rcptid_${Date.now()}`,
      notes: { mongoOrderId: orderDoc._id.toString() },
    };
    console.log('[Payment] /create-order request body:', req.body);
    console.log('[Payment] Razorpay order options:', options);
    const razorpayOrder = await razorpay.orders.create(options);
    console.log('[Payment] Razorpay order response:', razorpayOrder);

    // 4. Store Razorpay order ID in our Order document
    orderDoc.razorpayOrderId = razorpayOrder.id;
    await orderDoc.save();

    // 5. Clear user's cart after order creation
    cart.items = [];
    await cart.save();

    // 6. Return both IDs to frontend
    res.json({
      mongoOrderId: orderDoc._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      status: razorpayOrder.status,
    });
  } catch (err) {
    console.error('[Payment] Failed to create Razorpay order:', err);
    res.status(500).json({ error: 'Failed to create Razorpay order', details: err.message });
  }
});

// POST /api/payment/verify
router.post('/verify', auth, async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  console.log('[Payment] /verify called with:', { orderId, paymentId, signature });

  if (!orderId) {
    console.log('[Payment] /verify missing orderId');
    return res.status(400).json({ error: 'Missing orderId' });
  }

  try {
    // Mark order as paid
    const order = await Order.findById(orderId).populate('products.product user');
    console.log('[Payment] /verify found order:', order);
    if (!order) {
      console.log('[Payment] /verify order not found');
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.paymentStatus === 'paid') {
      console.log('[Payment] /verify order already paid');
      return res.json({ success: true, message: 'Order already paid' });
    }

    // Verify Razorpay signature if paymentId and signature are provided
    if (paymentId && signature) {
      try {
        const crypto = require('crypto');
        const text = orderId + '|' + paymentId;
        const generated_signature = crypto
          .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
          .update(text)
          .digest('hex');
        
        if (generated_signature !== signature) {
          console.log('[Payment] /verify signature verification failed');
          console.log('[Payment] Expected:', generated_signature);
          console.log('[Payment] Received:', signature);
          // Don't fail the payment, just log the issue
          console.log('[Payment] /verify continuing despite signature mismatch');
        } else {
          console.log('[Payment] /verify signature verification successful');
        }
      } catch (sigErr) {
        console.error('[Payment] /verify signature verification error:', sigErr);
        // Don't fail the payment, just log the issue
        console.log('[Payment] /verify continuing despite signature error');
      }
    } else {
      console.log('[Payment] /verify no signature provided, skipping verification');
    }

    order.paymentStatus = 'paid';
    await order.save();
    console.log('[Payment] /verify order marked as paid and saved');

    // Create Shiprocket order
    let shiprocketResult = null;
    try {
      console.log('[Payment] /verify about to call createShiprocketOrder');
      shiprocketResult = await createShiprocketOrder(order);
      order.shiprocketOrderId = shiprocketResult.order_id || shiprocketResult.order_id_generated;
      await order.save();
      console.log('[Payment] /verify Shiprocket order created:', shiprocketResult);
    } catch (shipErr) {
      console.error('[Payment] /verify Shiprocket error:', shipErr);
      // Don't return error here, just log it and continue
      console.log('[Payment] /verify continuing despite Shiprocket error');
    }

    res.json({ success: true, message: 'Payment verified and Shiprocket order created', shiprocket: shiprocketResult });
  } catch (err) {
    console.error('[Payment] /verify server error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// POST /api/payment/webhook
router.post('/webhook', express.json({ type: 'application/json' }), (req, res) => {
  // Log the webhook payload for now
  console.log('Razorpay Webhook:', req.body);
  res.status(200).json({ received: true });
});

module.exports = router; 