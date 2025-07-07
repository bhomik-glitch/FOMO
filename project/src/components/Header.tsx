import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Collections', 'About', 'Contact'];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">
              FO<span className="text-white">MOO</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Search className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer transition-colors duration-200" />
            <User className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer transition-colors duration-200" />
            <ShoppingBag className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer transition-colors duration-200" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md rounded-lg mt-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block px-3 py-2 text-white hover:text-gray-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <div className="flex items-center space-x-4 px-3 py-2">
                <Search className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer transition-colors duration-200" />
                <User className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer transition-colors duration-200" />
                <ShoppingBag className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer transition-colors duration-200" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;