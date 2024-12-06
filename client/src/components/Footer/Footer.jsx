import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Nest</h3>
            <p className="text-sm">
              Your neighborhood grocery store online. Fresh products, competitive prices, 
              and reliable delivery right to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-white transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/fruits-vegetables" className="text-sm hover:text-white transition-colors duration-200">
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link to="/category/dairy" className="text-sm hover:text-white transition-colors duration-200">
                  Dairy Products
                </Link>
              </li>
              <li>
                <Link to="/category/beverages" className="text-sm hover:text-white transition-colors duration-200">
                  Beverages
                </Link>
              </li>
              <li>
                <Link to="/category/snacks" className="text-sm hover:text-white transition-colors duration-200">
                  Snacks & Munchies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaInstagram className="text-xl" />
              </a>
            </div>
            <p className="text-sm">
              Email: support@nest.com<br />
              Phone: +1 234 567 8900
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Nest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
