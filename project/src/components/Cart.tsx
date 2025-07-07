import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import AddressForm, { Address } from './AddressForm';

// Add RazorpayWindow type for TypeScript
interface RazorpayWindow extends Window {
  Razorpay: any;
}
declare const window: RazorpayWindow;

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, refreshBackendCart } = useCart();
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<Address | null>(null);
  const [isAddressValid, setIsAddressValid] = useState(false);

  const updateBackendQuantity = async (productId: string, quantity: number, size?: string) => {
    if (!isLoggedIn || !token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity, size }),
      });
      if (res.ok) {
        refreshBackendCart();
      }
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const removeItem = async (productId: string, size?: string) => {
    if (!isLoggedIn || !token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, size }),
      });
      if (res.ok) {
        refreshBackendCart();
      }
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + ((item.price || 0) * item.quantity), 0);
  };

  // Razorpay script loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) return resolve(true);
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleAddressChange = (addr: Address, isValid: boolean) => {
    setAddress(addr);
    setIsAddressValid(isValid);
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);
    const total = calculateTotal();
    if (total <= 0) {
      alert('Cart is empty!');
      setLoading(false);
      return;
    }
    if (!isAddressValid || !address) {
      // Check which fields are invalid
      const invalidFields: string[] = [];
      if (!address) {
        invalidFields.push('address');
      } else {
        if (!address.name.trim()) invalidFields.push('Name');
        if (!/^\d{10}$/.test(address.phone)) invalidFields.push('Phone (10 digits)');
        if (!address.addressLine1.trim()) invalidFields.push('Address Line 1');
        if (!address.city.trim()) invalidFields.push('City');
        if (!address.state.trim()) invalidFields.push('State');
        if (!/^\d{6}$/.test(address.pincode)) invalidFields.push('Pincode (6 digits)');
        if (!address.country.trim()) invalidFields.push('Country');
      }
      if (invalidFields.length > 0) {
        alert('Please correct the following fields before proceeding to payment:\n' + invalidFields.join('\n'));
      } else {
        alert('Please fill in a valid shipping address before proceeding to payment.');
      }
      setLoading(false);
      return;
    }
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Failed to load Razorpay SDK');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: total, currency: 'INR', address }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Order creation failed');
      }
      const order = await res.json();
      if (!order.mongoOrderId || !order.razorpayOrderId) throw new Error('Order creation failed');
      const options = {
        key: 'rzp_live_Qzn4gFK7BSUXDo',
        amount: order.amount,
        currency: order.currency,
        name: 'FOMOO',
        description: 'Order Payment',
        order_id: order.razorpayOrderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId: order.mongoOrderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              alert('Payment verified and order placed successfully!');
              // Optionally, redirect or update UI here
            } else {
              alert('Payment verified, but order placement failed: ' + (verifyData.error || 'Unknown error'));
            }
          } catch (err: any) {
            alert('Payment verification failed: ' + (err.message || err));
          }
        },
        prefill: {
          email: '',
          contact: address.phone,
        },
        theme: { color: '#3399cc' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      alert('Payment failed: ' + (err.message || err));
    }
    setLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-zinc-100">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="bg-zinc-900 rounded-2xl shadow-xl p-8 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-zinc-500" />
            <h2 className="text-2xl font-bold mb-4 text-zinc-100">Your cart is empty</h2>
            <p className="text-zinc-300 mb-6">Start shopping to add items to your cart.</p>
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-zinc-100">Cart Items</h2>
                <div className="space-y-4">
                  {cart.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-zinc-800 rounded-lg bg-zinc-800">
                      <div className="w-20 h-20 bg-zinc-700 rounded-lg flex items-center justify-center">
                        <span className="text-zinc-400 text-sm">IMG</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-zinc-100">{item.name || item.product?.title || item.product?.name}</h3>
                        <p className="text-zinc-300 text-sm">
                          Size: {item.size || 'N/A'} | Price: ₹{item.price || item.product?.price || 799}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (isLoggedIn) {
                              const newQuantity = Math.max(1, (item.quantity || 1) - 1);
                              console.log('Updating quantity (minus):', String(item.id), newQuantity, item.size);
                              updateBackendQuantity(String(item.id), newQuantity, item.size);
                            } else {
                              updateQuantity(item.id, item.size, Math.max(1, (item.quantity || 1) - 1));
                            }
                          }}
                          className="p-1 rounded-full hover:bg-zinc-700"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-zinc-100">{item.quantity || 1}</span>
                        <button
                          onClick={() => {
                            if (isLoggedIn) {
                              const newQuantity = (item.quantity || 1) + 1;
                              console.log('Updating quantity (plus):', String(item.id), newQuantity, item.size);
                              updateBackendQuantity(String(item.id), newQuantity, item.size);
                            } else {
                              updateQuantity(item.id, item.size, (item.quantity || 1) + 1);
                            }
                          }}
                          className="p-1 rounded-full hover:bg-zinc-700"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-zinc-100">₹{((item.price || item.product?.price || 799) * (item.quantity || 1))}</p>
                        <button
                          onClick={() => {
                            if (isLoggedIn) {
                              removeItem(item.id, item.size);
                            } else {
                              removeFromCart(item.id, item.size);
                            }
                          }}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 rounded-2xl shadow-xl p-6 sticky top-8">
                <h2 className="text-2xl font-bold mb-6 text-zinc-100">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-zinc-300">
                    <span>Subtotal</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-zinc-800 pt-4">
                    <div className="flex justify-between font-bold text-lg text-zinc-100">
                      <span>Total</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
                <div className="my-6">
                  <AddressForm onAddressChange={handleAddressChange} />
                </div>
                <div style={{ marginTop: 16 }}>
                  <button
                    onClick={handleRazorpayPayment}
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 