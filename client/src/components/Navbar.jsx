import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/vaultify-logo-nav.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('vaultifyUser');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-4 py-4 md:px-8">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
          title="Go to dashboard"
        >
          <img src={logo} alt="Vaultify Logo" className="w-32" />
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          {['projects', 'achievements', 'codex', 'askvault'].map((route, idx) => (
            <button
              key={idx}
              onClick={() => navigate(`/${route}`)}
              className="text-lg font-semibold text-gray-700 hover:text-indigo-600"
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="bg-indigo-600 text-white font-bold px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col space-y-4 mt-4 md:hidden">
          {['projects', 'achievements', 'codex', 'askvault'].map((route, idx) => (
            <button
              key={idx}
              onClick={() => {
                navigate(`/${route}`);
                setIsOpen(false);
              }}
              className="text-lg font-semibold text-gray-700 hover:text-indigo-600 text-left"
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </button>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="bg-indigo-600 text-white font-bold px-4 py-2 rounded hover:bg-indigo-700 transition text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
