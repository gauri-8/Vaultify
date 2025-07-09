import React, { useState } from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import EditProfileModal from './EditProfileModal';

const ProfileCard = ({ name, email, joke }) => {
  const [showModal, setShowModal] = useState(false);
  const [linkedin, setLinkedin] = useState('gauri8work');
  const [instagram, setInstagram] = useState('gauri8work');
  const [profileImage, setProfileImage] = useState(null); // for image preview

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 mt-10 lg:mt-30 lg:ml-10 lg:w-60 flex flex-col items-center">
      
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/50 text-white backdrop-blur-md border border-gray-700 p-6 rounded-xl shadow-lg w-full max-w-[320px] min-h-[400px] flex flex-col justify-between transition-transform duration-500 hover:scale-105 hover:shadow-xl"
      >
        {/* Avatar or Profile Image */}
        <div className="flex justify-center relative group">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md cursor-pointer"
              onClick={() => document.getElementById('profileImageInput').click()}
            />
          ) : (
            <div
              className="w-24 h-24 mt-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl shadow-md cursor-pointer"
              onClick={() => document.getElementById('profileImageInput').click()}
            >
              {name ? name.charAt(0).toUpperCase() : '🙂'}
            </div>
          )}
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="absolute bottom-[-30px] bg-gray-700 text-sm text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
    Click to upload
  </div>
        </div>

        {/* Name & Email */}
        <div className="text-center mt-4">
          <h3 className="text-xl font-bold">{name || 'User'}</h3>
          <p className="text-sm text-gray-300">{email}</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-4">
          {linkedin && (
            <a
              href={`https://www.linkedin.com/in/${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-300 hover:text-blue-500 transition duration-300" size={20} />
            </a>
          )}
          {instagram && (
            <a
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-pink-300 hover:text-pink-500 transition duration-300" size={20} />
            </a>
          )}
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 text-xs px-3 py-1 rounded-full border border-indigo-400 text-indigo-300 hover:bg-indigo-500/20 transition"
        >
          Edit Profile
        </button>
      </motion.div>

      {/* Dev Joke Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 1 }}
        className="bg-gray-800/60 text-white backdrop-blur-lg border border-gray-700 p-6 rounded-xl shadow-lg w-full max-w-[320px] transition-transform duration-500 hover:scale-105 hover:shadow-xl"
      >
        <h3 className="text-lg font-semibold text-indigo-400 mb-2">💬 Dev Joke of the Day</h3>
        <p className="text-gray-300 italic">{joke}</p>
      </motion.div>

      {showModal && (
        <EditProfileModal
          linkedin={linkedin}
          instagram={instagram}
          onClose={() => setShowModal(false)}
          onSave={(newLinkedin, newInstagram) => {
            setLinkedin(newLinkedin);
            setInstagram(newInstagram);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ProfileCard;
