import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-4 justify-start">
          {/* Email Signup */}
          <form className="w-full max-w-xl mb-2">
            <div className="flex border border-white">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-4 bg-black text-white focus:outline-none"
              />
              <button type="submit" className="px-6 flex items-center justify-center">
                <ArrowRight className="text-white" />
              </button>
            </div>
          </form>
          <div className="text-white text-sm">
            Signup for updates on early access, exclusive content and interplanetary news.
          </div>
          <div className="text-white text-sm mt-2">Contact +91 89294 13216</div>
          {/* Currency Selector */}
          <div className="mt-4 relative w-32">
            <select className="border border-white bg-black text-white px-6 py-3 pr-10 rounded w-full appearance-none">
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-2xl text-white">
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="X"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#" aria-label="Spotify"><i className="fa-brands fa-spotify"></i></a>
            <a href="#" aria-label="Discord"><i className="fa-brands fa-discord"></i></a>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-[2] grid grid-cols-3 gap-8">
          <ul className="text-white text-sm space-y-2">
            <li><Link to="/" className="text-white">Home</Link></li>
            <li><Link to="/shop" className="text-white">Shop</Link></li>
            <li><Link to="/about" className="text-white">About</Link></li>
          </ul>
          <ul className="text-white text-sm space-y-2">
            <li><Link to="/contact" className="text-white">Contact</Link></li>
            <li><Link to="/exchange-return" className="text-white">Shipping & Return</Link></li>
            <li><Link to="/faq" className="text-white">FAQ</Link></li>
          </ul>
          <ul className="text-white text-sm space-y-2">
            <li><Link to="/terms" className="text-white">Terms and Conditions</Link></li>
            <li><Link to="/privacy" className="text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;