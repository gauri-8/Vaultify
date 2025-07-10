import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/vaultify-logo.png';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    return toast.error('Please enter both email and password!');
  }

  setLoading(true);

  try {
    const res = await axios.post('https://vaultify-backend-peg2.onrender.com/api/auth/login', {
      email,
      password
    });

    localStorage.setItem('vaultifyUser', JSON.stringify(res.data.user));
    localStorage.setItem('vaultifyToken', res.data.token);

    toast.success('Login successful!');
    navigate('/home');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute w-80 h-80 bg-indigo-500 opacity-20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-blob1" />
      <div className="absolute w-60 h-60 bg-pink-400 opacity-20 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-blob2" />

      {/* Login Card */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 border border-white/10 cursor-pointer backdrop-blur-lg text-white p-8 rounded-2xl shadow-2xl w-full max-w-md z-10"
      >
        <div className="flex justify-center cursor-pointer mb-6">
          <img src={logo} alt="Vaultify Logo" className="h-35" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Login to Vaultify 🚀</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-white/10 border border-white/20 rounded-lg placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-white/10 border border-white/20 rounded-lg placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

       

        <button
  type="submit"
  disabled={loading}
  className={`w-full transition py-3 rounded-lg font-medium text-white ${
    loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 cursor-pointer hover:bg-indigo-700'
  }`}
>
  {loading ? 'Logging in...' : 'Login'}
</button>


        <p className="text-sm text-center mt-4">
          New user?{' '}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Sign up
          </span>
        </p>
      </motion.form>
    </div>
  );
}

export default LoginPage;
