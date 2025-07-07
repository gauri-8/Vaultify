import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/vaultify-logo-nav.png';
import HomePage from '../pages/HomePage';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('vaultifyUser');
    navigate('/login');
  };

  


  return (

    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">


     


<div onClick={() => navigate('/')} 
className="cursor-pointer hover:scale-105 transition-transform duration-200"
title="Go to dashboard">
  <img src={logo} alt="Vaultify Logo" className="w-30" />
</div>

      


      <div className="space-x-8">
        
        <button
  onClick={() => navigate('/projects')}
  className="text-lg font-bold hover:text-indigo-600 dark:text-black"
>
  Vaults
</button>
       <button onClick={() => navigate('/achievements')} className="text-lg font-bold hover:text-indigo-600">
  Trophies
</button>
        <button onClick={() => navigate('/codex')} className="text-lg font-bold hover:text-indigo-600">
  Codex
</button>
 <button onClick={() => navigate('/askvault')} className="text-lg font-bold hover:text-indigo-600">
  Ask Vault
</button>
        <button
          onClick={handleLogout}
          className="bg-indigo-600 text-white font-bold px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>

  );
}

export default Navbar

