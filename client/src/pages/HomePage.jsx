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
    <div className="relative min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Floating Background Blobs */}
<div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
  <div className="absolute w-80 h-80 bg-purple-600 opacity-20 rounded-full blur-3xl animate-blob1 top-[-10%] left-[10%]" />
  <div className="absolute w-72 h-72 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-blob2 top-[30%] left-[70%]" />
  <div className="absolute w-60 h-60 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob3 top-[60%] left-[30%]" />
</div>

      
        

        <main className="px-4 py-6 md:px-10 md:py-10 max-w-7xl mx-auto space-y-6">
          {/* Welcome Banner */}
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-indigo-400 to-purple-500 p-6 rounded-2xl shadow-xl text-gray-900"
          >
            <h2 className="text-3xl font-bold">
              Welcome back {user?.name}! 👋
            </h2>
            <p className="text-sm mt-1">
              Let’s build, learn, and grow today 🚀
            </p>
          </motion.div>

          {/* Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Cards + Stats */}
            <div className="flex-1 space-y-6 order-2 lg:order-1">
              {/* Dashboard Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:mt-20 sm:grid-cols-2 gap-6"
              >
                {cards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    onClick={() => navigate(card.link)}
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-2xl cursor-pointer p-6 shadow-[0_0_18px_#34d39980] border border-white/10 backdrop-blur-lg bg-white/5 transition-transform duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{card.desc}</p>
                    <p className="text-sm text-indigo-300 hover:underline">{card.adDes}</p>
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
