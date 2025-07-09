import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { IoMdSend } from "react-icons/io";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const AskVaultPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const token = localStorage.getItem("vaultifyToken");

      const response = await fetch("https://vaultify-backend-peg2.onrender.com/api/askvault", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ prompt: input })
      });

      const data = await response.json();

      const botMessage = {
        sender: 'vault',
        text: data.reply || "Sorry, I couldn't understand that.",
        time: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("AI error:", error);
      setMessages(prev => [...prev, {
        sender: 'vault',
        text: "Something went wrong. Please try again later.",
        time: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative z-10">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[400px] h-[400px] bg-indigo-500 opacity-20 rounded-full blur-3xl top-[-100px] left-[-150px] animate-blob1"></div>
          <div className="absolute w-[300px] h-[300px] bg-pink-500 opacity-20 rounded-full blur-2xl bottom-[-100px] right-[-120px] animate-blob2"></div>
        </div>

        <div className="px-4 py-4 text-2xl md:text-3xl font-bold border-b border-gray-700 bg-gray-800 shadow">
          Ask Vault 💬 – Your AI Buddy
        </div>

        <div className="flex-1 px-4 md:px-10 py-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`flex items-start gap-3 max-w-3xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-lg">
                {msg.sender === 'user' ? '🙋🏻‍♀️' : '🤖'}
              </div>

              <div
                className={`px-4 py-3 rounded-2xl shadow text-sm md:text-base whitespace-pre-line max-w-sm md:max-w-md ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-gray-700 text-white rounded-bl-none'
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-xs text-right mt-2 opacity-50">{msg.time}</div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-1 text-sm text-gray-400 font-mono ml-4 animate-pulse">
              Vault is typing<span>.</span><span>.</span><span>.</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="sticky bottom-0 w-full bg-gray-800 px-4 py-3 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-5xl mx-auto">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 w-full sm:w-auto p-2 rounded-xl border border-gray-600 bg-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700 transition"
            >
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default AskVaultPage;
