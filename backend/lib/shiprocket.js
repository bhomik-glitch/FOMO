const axios = require('axios');

let shiprocketToken = null;

async function authenticateShiprocket() {
  // Check if we have API key instead of email/password
  const apiKey = process.env.SHIPROCKET_API_KEY;
  const apiSecret = process.env.SHIPROCKET_API_SECRET;
  
  if (apiKey && apiSecret) {
    // Use API key authentication
    console.log('Using API key authentication');
    const url = 'https://apiv2.shiprocket.in/v1/external/auth/login';
    const response = await axios.post(url, { 
      email: apiKey, 
      password: apiSecret 
    });
    shiprocketToken = response.data.token;
    return shiprocketToken;
  } else {
    // Use email/password authentication
    const email = process.env.SHIPROCKET_EMAIL;
    const password = process.env.SHIPROCKET_PASSWORD;
    console.log('Using email/password authentication');
    console.log('Shiprocket email:', email);
    console.log('Shiprocket password:', password ? '***' : 'Not set');
    
    if (!email || !password) {
      throw new Error('Shiprocket credentials not found. Please set SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD or SHIPROCKET_API_KEY and SHIPROCKET_API_SECRET in your .env file');
    }
    
    const url = 'https://apiv2.shiprocket.in/v1/external/auth/login';
    const response = await axios.post(url, { email, password });
    shiprocketToken = response.data.token;
    return shiprocketToken;
  }
}

async function createShiprocketOrder(order) {
  try {
    if (!shiprocketToken) {
      await authenticateShiprocket();
    }
    
    // Prepare Shiprocket order payload
    const address = order.shippingInfo.address;
    
    // Ensure products are populated
    if (!order.products || !order.products.length) {
      throw new Error('No products found in order');
    }
    
    const products = order.products.map(item => {
      if (!item.product) {
        throw new Error('Product not populated in order item');
      }
      return {
        name: item.product.title || 'Product',
        sku: item.product._id ? item.product._id.toString() : '',
        units: item.quantity,
        selling_price: item.product.price || 0,
      };
    });
    
    const payload = {
      order_id: order._id.toString(),
      order_date: new Date(order.createdAt).toISOString().slice(0, 10),
      pickup_location: 'zoha', // Must match Shiprocket dashboard exactly
      billing_customer_name: address.name,
      billing_last_name: '',
      billing_address: address.addressLine1 + (address.addressLine2 ? (', ' + address.addressLine2) : ''),
      billing_city: address.city,
      billing_pincode: address.pincode,
      billing_state: address.state,
      billing_country: address.country,
      billing_email: order.user.email || '',
      billing_phone: address.phone,
      shipping_is_billing: true,
      order_items: products,
      payment_method: order.paymentStatus === 'paid' ? 'Prepaid' : 'COD',
      sub_total: order.total,
      length: 10,
      breadth: 10,
      height: 10,
      weight: 1,
    };
    
    console.log('[Shiprocket] Payload:', JSON.stringify(payload, null, 2));
    const url = 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc';
    
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${shiprocketToken}` },
    });
    
    console.log('[Shiprocket] Response:', JSON.stringify(response.data, null, 2));
    
    // Check for successful order creation
    if (response.data.order_id && response.data.status_code === 1) {
      return response.data;
    } else {
      throw new Error(`Shiprocket API failed: ${response.data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('[Shiprocket] Error details:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw error;
  }
}

module.exports = {
  authenticateShiprocket,
  createShiprocketOrder,
}; 