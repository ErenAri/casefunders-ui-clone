import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} CaseFunders. All rights reserved.</p>
      <div className="mt-2 flex justify-center space-x-4">
        <a href="#" className="hover:text-blue-600">Privacy Policy</a>
        <a href="#" className="hover:text-blue-600">Terms</a>
        <a href="#" className="hover:text-blue-600">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
