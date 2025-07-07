import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProfileCard = ({ name, email, joke }) => {
  return (
    <div className="space-y-6 mt-10 lg:mt-30 lg:ml-10 lg:w-60 flex flex-col items-center">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#de4c9c] to-[#f0d1c8] cursor-pointer text-black p-6 rounded-xl shadow-lg w-full max-w-[320px] min-h-[360px] flex flex-col justify-between transition-all duration-700 hover:scale-105 hover:shadow-xl"
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 mt-4 rounded-full bg-blue-300 flex items-center justify-center text-3xl">
            😴
          </div>
        </div>

        <div className="text-center mt-4">
          <h3 className="text-xl font-bold">{name || 'User'}</h3>
          <p className="text-sm text-black">{email}</p>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <a
            href="https://www.linkedin.com/in/gauri8work"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-blue-400 hover:text-blue-600 transition" size={20} />
          </a>
          <a
            href="https://www.instagram.com/gauri8work"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-pink-400 hover:text-pink-600 transition" size={20} />
          </a>
        </div>
      </motion.div>

      {/* Dev Joke Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 1 }}
        className="bg-gradient-to-br lg:mt-30 from-[#f057ab] to-[#f2b7a7] cursor-pointer text-white p-6 rounded-xl shadow-lg w-full max-w-[320px] transition-all duration-700 hover:scale-105 hover:shadow-xl"
      >
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">💬 Dev Joke of the Day</h3>
        <p className="text-black italic">{joke}</p>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
