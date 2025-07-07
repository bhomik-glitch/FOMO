import React, { useState, useEffect } from 'react';
import { Home, ShoppingBag, Store, User, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/Button";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import logo from '../logo/WEARFOMOO LOGO -1.png';

// Inline SVG as a React component
const AboutLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path d="M7.5 42.5h33c1.1046 0 2-.8954 2-2V7.5c0-1.1046-.8954-2-2-2H7.5c-1.1046 0-2 .8954-2 2v33c0 1.1046.8954 2 2 2Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <g>
      <g>
        <line x1="34.6739" y1="15.5536" x2="39.5" y2="15.5536" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="37.087" y1="22.8383" x2="37.087" y2="15.5536" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g>
        <polyline points="13.3261 25.1617 10.913 28.8041 8.5 25.1617" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="10.913" y1="32.4464" x2="10.913" y2="28.8041" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <path d="M28.168 15.5536v4.8716c0 1.3327 1.0804 2.413 2.413 2.413s2.413-1.0804 2.413-2.413v-4.8716" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <g>
        <path d="M18.0063 19.196c1.0058 0 1.8212.8154 1.8212 1.8212s-.8154 1.8212-1.8212 1.8212h-3.0049v-7.2847h3.0049c1.0058 0 1.8212.8154 1.8212 1.8212s-.8154 1.8212-1.8212 1.8212h0Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="18.0063" y1="19.196" x2="15.0013" y2="19.196" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g>
        <line x1="12.4882" y1="20.4015" x2="9.3324" y2="20.4015" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8.5455 22.8167 10.913 15.5536 13.2806 22.8383" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      <rect x="21.5167" y="15.5537" width="4.8261" height="7.2847" rx="2.413" ry="2.413" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M21.0258 25.1617v4.8716c0 1.3327 1.0804 2.413 2.413 2.413s2.413-1.0804 2.413-2.413v-4.8716" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="14.3746" y="25.1617" width="4.8261" height="7.2847" rx="2.413" ry="2.413" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </g>
  </svg>
);

const navItems = [
  { icon: Home, label: 'Home', action: 'home', path: '/' },
  { icon: Store, label: 'Shop', action: 'shop', path: '/shop' },
  { icon: AboutLogo, label: 'About', action: 'about', path: '/about' },
  { icon: ShoppingBag, label: 'Cart', action: 'cart', path: '/cart' },
];

const NavBar: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [loginHover, setLoginHover] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, token } = useAuth();
  const { cart, cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch user info when logged in
  useEffect(() => {
    if (isLoggedIn && token) {
      fetchUserInfo();
    }
  }, [isLoggedIn, token]);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUserName(data.name || 'User');
      }
    } catch (err) {
      console.error('Failed to fetch user info:', err);
    }
  };

  // Determine active index based on current route
  let activeIdx = 0;
  if (location.pathname === '/about') activeIdx = 2;
  else if (location.pathname === '/shop') activeIdx = 1;
  else if (location.pathname === '/') activeIdx = 0;
  // You can add more logic for other routes if needed

  // Handler for nav actions
  const handleNavClick = (action: string) => {
    if (action === 'about') {
      navigate('/about');
    } else if (action === 'shop') {
      navigate('/shop');
    } else if (action === 'home') {
      navigate('/');
    } else if (action === 'cart') {
      navigate('/cart');
    }
  };

  return (
    <>
      {/* Logo at top left */}
      <a href="/" className="fixed top-2 left-2 z-50 flex items-center md:top-6 md:left-8" style={{textDecoration: 'none'}}>
        <img src={logo} alt="FOMOO Logo" className="h-14 w-14 md:h-20 md:w-20 rounded-full object-cover shadow-lg bg-white p-1" />
      </a>
      {/* Hamburger icon for mobile */}
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-neutral-900/90 text-white shadow-lg md:hidden"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-7 h-7" />
      </button>
      {/* Desktop navbar */}
      <nav
        className="fixed top-20 left-1/2 z-50 -translate-x-1/2 items-center gap-2 rounded-2xl bg-neutral-900/90 px-2 py-2 shadow-lg backdrop-blur-md w-[95vw] max-w-[420px] hidden md:flex md:top-6 md:left-1/2 md:gap-4 md:px-6 md:py-3 md:w-auto md:max-w-none"
        style={{overflowX: 'auto'}}
      >
        {navItems.map(({ icon: Icon, label, action, path }, idx) => (
          <div
            key={label}
            className="relative flex flex-col items-center justify-center"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <AnimatePresence>
              {(hoveredIdx === idx || (hoveredIdx === null && activeIdx === idx)) && (
                <motion.div
                  layoutId="active-box"
                  className="absolute inset-0 z-0 rounded-xl bg-violet-600"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30, duration: 0.18 }}
                />
              )}
            </AnimatePresence>
            <button
              className="group relative z-10 flex flex-col items-center justify-center rounded-xl p-1 text-white/80 transition-colors duration-200 md:p-2"
              style={{ color: hoveredIdx === idx || (hoveredIdx === null && activeIdx === idx) ? '#fff' : undefined }}
              onClick={() => handleNavClick(action)}
            >
              <Icon className="w-6 h-6 md:w-7 md:h-7" />
              {action === 'cart' && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center md:w-5 md:h-5">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">{label}</span>
              {/* Tooltip */}
              <span className="pointer-events-none absolute mt-10 scale-0 rounded bg-neutral-800 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 md:mt-12">
                {label}
              </span>
            </button>
          </div>
        ))}
      </nav>
      {/* Desktop user/login area */}
      <div className="fixed top-[76px] right-2 z-50 items-center gap-2 hidden md:flex md:top-6 md:right-8 md:gap-3">
        {isLoggedIn && (
          <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-md rounded-lg px-2 py-1 text-neutral-900 font-semibold md:px-3 md:py-2">
            <User size={16} className="text-violet-600" />
            <span className="text-xs md:text-sm font-medium">{userName}</span>
          </div>
        )}
        <Button
          className="overflow-hidden h-8 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-3 shadow-md md:h-10 md:px-5"
          onMouseEnter={() => setLoginHover(true)}
          onMouseLeave={() => setLoginHover(false)}
          style={{ width: isLoggedIn ? 90 : 80, minWidth: 60 }}
          onClick={() => {
            if (isLoggedIn) {
              logout();
              setUserName('');
            } else {
              navigate('/login');
            }
          }}
        >
          {isLoggedIn ? (
            <>
              <LogOut size={16} />
              <span className="hidden md:inline">Logout</span>
            </>
          ) : (
            <span>{loginHover ? 'Login' : 'Signup'}</span>
          )}
        </Button>
      </div>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="relative bg-neutral-900 w-4/5 max-w-xs h-full flex flex-col p-6 gap-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="flex flex-col gap-4 mt-10">
              {navItems.map(({ icon: Icon, label, action }, idx) => (
                <button
                  key={label}
                  className="flex items-center gap-3 text-white text-lg font-semibold py-2 px-3 rounded hover:bg-violet-700 transition"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick(action);
                  }}
                >
                  <Icon className="w-6 h-6" />
                  {label}
                  {action === 'cart' && cartCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-2">
              {isLoggedIn && (
                <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-md rounded-lg px-3 py-2 text-neutral-900 font-semibold">
                  <User size={16} className="text-violet-600" />
                  <span className="text-sm font-medium">{userName}</span>
                </div>
              )}
              <Button
                className="overflow-hidden h-10 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 shadow-md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isLoggedIn) {
                    logout();
                    setUserName('');
                  } else {
                    navigate('/login');
                  }
                }}
              >
                {isLoggedIn ? (
                  <>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </>
                ) : (
                  <span>{loginHover ? 'Login' : 'Signup'}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar; 