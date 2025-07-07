import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/vaultify-logo.png';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://vaultify-backend-peg2.onrender.com/api/auth/register', {
        name,
        email,
        password
      });

      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7b5d9]">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-md shadow-md w-100 hover:-translate-y-2 hover:shadow-xl transition-transform duration-300">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Vaultify Logo" className="w-100 h-50 mr-2" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up 🚀</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-6"
        />
        <button type="submit" className="w-full bg-[#1ababa] text-white p-3 rounded hover:bg-[#74c7c7] transition">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
