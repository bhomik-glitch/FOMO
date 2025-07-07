import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  buyNow: (item: CartItem) => void;
  refreshBackendCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, token } = useAuth();
  const [localCart, setLocalCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [backendCart, setBackendCart] = useState<CartItem[] | null>(null);

  // Save local cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(localCart));
  }, [localCart]);

  // Fetch backend cart when logged in
  const fetchBackendCart = async () => {
    if (!isLoggedIn || !token) {
      setBackendCart(null);
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        // Normalize backend cart to CartItem[]
        const items = (data.items || []).map((item: any) => ({
          id: item.product?._id || item.id,
          name: item.product?.name || item.name,
          price: item.product?.price || item.price,
          size: item.size || '',
          quantity: item.quantity || 1,
        }));
        setBackendCart(items);
      } else {
        setBackendCart([]);
      }
    } catch (err) {
      setBackendCart([]);
    }
  };

  // On login, fetch backend cart. On logout, clear backend cart and local cart.
  useEffect(() => {
    if (isLoggedIn) {
      fetchBackendCart();
    } else {
      setBackendCart(null);
      setLocalCart([]);
      localStorage.removeItem('cart');
    }
  }, [isLoggedIn, token]);

  // Cart operations (local only, for guests)
  const addToCart = async (item: CartItem) => {
    if (isLoggedIn && token) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: item.id,
            quantity: item.quantity,
            size: item.size,
            name: item.name,
          }),
        });
        console.log('Add to cart response:', res);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error('Add to cart error:', errorData);
        }
        if (res.ok) {
          await fetchBackendCart();
        }
      } catch (err) {
        console.error('Add to cart exception:', err);
      }
      return;
    }
    // Guest logic (local cart)
    setLocalCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string, size: string) => {
    if (isLoggedIn) return; // Prevent local remove when logged in
    setLocalCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (isLoggedIn) return; // Prevent local update when logged in
    setLocalCart(prev => prev.map(item =>
      item.id === id && item.size === size
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    ));
  };

  const clearCart = () => {
    setLocalCart([]);
    if (!isLoggedIn) localStorage.removeItem('cart');
  };

  const buyNow = (item: CartItem) => {
    if (isLoggedIn) return; // Prevent local buyNow when logged in
    setLocalCart([item]);
  };

  // Unified cart and cartCount
  const cart = isLoggedIn && backendCart !== null ? backendCart : localCart;
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart, buyNow, refreshBackendCart: fetchBackendCart }}>
      {children}
    </CartContext.Provider>
  );
}; 