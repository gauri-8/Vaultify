import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/vaultify-logo.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError('Please enter both email and password!');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('vaultifyUser', JSON.stringify(res.data.user));
      localStorage.setItem('vaultifyToken', res.data.token); 
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7b5d9]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-md shadow-md w-100 transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
      >
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Vaultify Logo" className="w-100 h-50 mr-2" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Login now🚀</h2>

        {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
<p className="text-center mb-4 mt-4">
  New user? <span onClick={() => navigate('/register')} className="text-blue-500  cursor-pointer underline">Sign up</span>
</p>

        <button
          type="submit"
          className="w-full bg-[#1ababa] text-white p-3 rounded hover:bg-[#74c7c7] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
