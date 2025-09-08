import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function AdminFooter() {
  return (
    <footer className="border-t bg-white text-gray-600 text-sm py-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <button className="border px-4 py-1 rounded mb-3 sm:mb-0">English</button>

        <p className="font-semibold mb-3 sm:mb-0 text-center">
          © 2020 Alfa Admin Panel.
        </p>

        <div className="flex space-x-4">
          <a href="#" className="hover:text-black text-gray-500">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-black text-gray-500">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-black text-gray-500">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
