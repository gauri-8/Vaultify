import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import DevStatsSection from '../components/DevStatsSection';

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('vaultifyUser'));

  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "I told my computer I needed a break, and it said: 'You seem stressed. Want to uninstall something?'",
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
    "Why do Java developers wear glasses? Because they don’t see sharp.",
    "There are 10 types of people in the world: those who understand binary and those who don’t.",
    "Debugging: Being the detective in a crime movie where you are also the murderer.",
    "What’s a programmer’s favorite hangout place? The Foo Bar.",
    "How many programmers does it take to change a light bulb? None. It’s a hardware problem."
  ];

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cards = [
    {
      title: '📁 Vaults',
      desc: 'Create, edit, and showcase your dev projects. Categorize them as Full Stack, Frontend, or Mini for a clean portfolio.',
      adDes: 'Click to view →',
      link: '/projects',
    },
    {
      title: '🏆 Trophies',
      desc: 'Add certifications, milestones, and hackathon wins. Connect GitHub & LeetCode to auto-display your progress.',
      adDes: 'Click to view →',
      link: '/achievements',
    },
    {
      title: '📝 Codex',
      desc: 'Your personal dev journal. Write, edit, and organize notes from your learning journey—all synced to the cloud.',
      adDes: 'Click to view →',
      link: '/codex',
    },
    {
      title: '🤖 Ask Vault',
      desc: 'AI-powered assistant for all your queries. Chat, upload files, or use voice to interact. It remembers your frequent searches.',
      adDes: 'Click to view →',
      link: '/askvault',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-gray-800">
        <main className="px-4 py-6 md:px-10 md:py-10 space-y-6">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#de4c9c] to-[#f0d1c8] p-6 rounded-xl shadow"
          >
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back {user?.name}! 👋
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Let’s build, learn, and grow today 🚀
            </p>
          </motion.div>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Cards + Stats */}
            <div className="flex-1 space-y-6 order-2 lg:order-1">
              {/* Dashboard Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 sm:mt-30 gap-8"
              >
                {cards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    onClick={() => navigate(card.link)}
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-6 cursor-pointer h-full rounded-xl shadow-[0_0_18px_#34d39980] ring-1 ring-[#60a6f15d] backdrop-blur-sm bg-gray-800 text-white transition-all duration-300 hover:shadow-2xl"
                  >
                    <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                    <p className="text-md mt-5 opacity-90">{card.desc}</p>
                    <p className="text-sm mt-6 text-right hover:text-blue-500 hover:underline">
                      {card.adDes}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Developer Stats */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <DevStatsSection />
              </motion.div>
            </div>

            {/* Right: Profile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-[300px] order-1 lg:order-2"
            >
              <ProfileCard name={user?.name} email={user?.email} joke={randomJoke} />
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
