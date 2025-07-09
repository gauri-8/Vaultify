import React from 'react';
import { FaDatabase } from 'react-icons/fa';

import logo from '../assets/vaultify-logo-nav.png';


const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-white via-purple-100 to-transparent text-center py-6">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center ">
         <img
  src={ logo }
  alt="Vaultify Logo"
  className="w-38 h-28 object-contain"
/>
        </div>
        <p className="text-sm text-gray-600 max-w-md">
          Your digital workspace — projects, notes, AI, and progress, all in one place.
        </p>
        <p className="text-xs text-gray-500 mt-2">gauri-8 ©2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
