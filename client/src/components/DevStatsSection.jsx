// components/DevStatsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Coding Hours', value: 70 },
  { label: 'Projects Completed', value: 50 },
  { label: 'Notes Taken', value: 80 },
  { label: 'AskVault Questions', value: 60 },
];
// dark:bg-gray-800

//dark:text-gray-300

//dark:bg-gray-700

const DevStatsSection = () => {
  return (
    <div className="bg-gray-800
  p-6  rounded-xl shadow-md sm: mt-40">
      <h3 className="text-xl font-semibold text-white mb-4">📊 Developer Stats</h3>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1 text-sm text-white ">
              <span>{stat.label}</span>
              <span>{stat.value}%</span>
            </div>
            <div className="w-full bg-gray-200  rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stat.value}%` }}
                transition={{ duration: 1, delay: index * 0.3 }}
                className="bg-indigo-500 h-3 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevStatsSection;
