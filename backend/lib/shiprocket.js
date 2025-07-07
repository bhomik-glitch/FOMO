const axios = require('axios');

let shiprocketToken = null;

async function authenticateShiprocket() {
  // Replace with your Shiprocket email and password or use env variables
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;
  console.log('Shiprocket email:', email);
  console.log('Shiprocket password:', password);
  const url = 'https://apiv2.shiprocket.in/v1/external/auth/login';
  const response = await axios.post(url, { email, password });
  shiprocketToken = response.data.token;
  return shiprocketToken;
}

async function createShiprocketOrder(order) {
  if (!shiprocketToken) {
    await authenticateShiprocket();
  }
  // Prepare Shiprocket order payload
  const address = order.shippingInfo.address;
  // Ensure products are populated
  const products = order.products.map(item => ({
    name: item.product.title || 'Product',
    sku: item.product._id ? item.product._id.toString() : '',
    units: item.quantity,
    selling_price: item.product.price || 0,
  }));
  const payload = {
    order_id: order._id.toString(),
    order_date: new Date(order.createdAt).toISOString().slice(0, 10),
    pickup_location: 'zoha ', // Must match Shiprocket dashboard exactly (with space)
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
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${shiprocketToken}` },
    });
    console.log('[Shiprocket] Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('[Shiprocket] Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = {
  authenticateShiprocket,
  createShiprocketOrder,
}; 