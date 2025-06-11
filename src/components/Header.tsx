'use client';

import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-blue-900">CaseFunders</div>

      {/* Navigation links */}
      <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
        <a href="#" className="hover:text-blue-600">About</a>
        <a href="#" className="hover:text-blue-600">How It Works</a>
        <a href="#" className="hover:text-blue-600">Contact</a>
      </nav>

      {/* Right side button */}
      <div className="flex items-center space-x-4">
        <a
          href="#"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header;
