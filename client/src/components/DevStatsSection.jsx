import React from 'react';
import { motion } from 'framer-motion';

const DevStatsSection = ({ stats, latestAchievement }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/50 backdrop-blur-md border cursor-pointer mt-30 border-gray-700 text-white p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto"
    >
      <h3 className="text-xl font-semibold text-indigo-400 mb-4 flex items-center gap-2">
        📊 Developer Stats
      </h3>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1 text-sm text-gray-300">
              <span>{stat.label}</span>
              <span>{stat.value}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stat.percent}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="bg-gradient-to-r cursor-pointer from-indigo-400 to-purple-500 h-3 rounded-full shadow-inner"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Inline Latest Achievement */}
      {latestAchievement && (
        <div className="mt-6 text-md text-gray-200">
           <h3 className="text-xl font-semibold text-indigo-400 mb-4 flex items-center gap-2">
            🏆 Latest Achievement
          </h3>
          <p className="text-gray-300  italic">
            {latestAchievement.type} – {latestAchievement.description} –{' '}
            {new Date(latestAchievement.date).toDateString()}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default DevStatsSection;
