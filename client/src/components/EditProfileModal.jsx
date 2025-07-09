import React, { useState } from 'react';

const EditProfileModal = ({ linkedin, instagram, onClose, onSave }) => {
  const [newLinkedin, setNewLinkedin] = useState(linkedin);
  const [newInstagram, setNewInstagram] = useState(instagram);

  const handleSubmit = () => {
    onSave(newLinkedin, newInstagram);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-md shadow-xl border border-white/10">
        <h3 className="text-lg font-semibold text-indigo-400 mb-4">Edit Social Links</h3>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-300">LinkedIn ID</label>
            <input
              type="text"
              value={newLinkedin}
              onChange={(e) => setNewLinkedin(e.target.value)}
              placeholder="e.g. gauri8work"
              className="w-full mt-1 px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Instagram ID</label>
            <input
              type="text"
              value={newInstagram}
              onChange={(e) => setNewInstagram(e.target.value)}
              placeholder="e.g. gauri.dev"
              className="w-full mt-1 px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
