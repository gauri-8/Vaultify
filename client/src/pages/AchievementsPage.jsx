import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const AchievementsPage = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [codeforcesUsername, setCodeForcesUsername] = useState("");
  const [codechefUsername, setCodeChefUsername] = useState("");
  const [cfRating, setCFRating] = useState(null);
  const [ccData, setCCData] = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: "certification",
    title: "",
    platform: "",
    link: "",
    description: "",
    date: "",
  });

  const token = localStorage.getItem("vaultifyToken");

  const fetchAchievements = async () => {
    try {
      const res = await axios.get("https://vaultify-backend-peg2.onrender.com/achievements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAchievements(res.data);
    } catch (err) {
      console.error("Error fetching achievements:", err.message);
    }
  };

  const fetchUsernames = async () => {
    try {
      const res = await axios.get("https://vaultify-backend-peg2.onrender.com/user/get-usernames", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGithubUsername(res.data.githubUsername || "");
      setLeetcodeUsername(res.data.leetcodeUsername || "");
      setCodeForcesUsername(res.data.codeforcesUsername || "");
      setCodeChefUsername(res.data.codechefUsername || "");
    } catch (err) {
      console.error("Error fetching usernames:", err.message);
    }
  };

  useEffect(() => {
    fetchAchievements();
    fetchUsernames();
  }, []);

  useEffect(() => {
    const fetchCF = async () => {
      if (!codeforcesUsername) return;
      try {
        const res = await axios.get(`https://codeforces.com/api/user.rating?handle=${codeforcesUsername}`);
        const history = res.data.result;
        const latest = history[history.length - 1]?.newRating || "No contests";
        setCFRating(latest);
      } catch (err) {
        console.error("Codeforces fetch error:", err.message);
      }
    };

    const fetchCC = async () => {
      if (!codechefUsername) return;
      try {
        const res = await axios.get(`https://codechef-api.vercel.app/handle/${codechefUsername}`);
        setCCData(res.data);
      } catch (err) {
        console.error("CodeChef fetch error:", err.message);
      }
    };

    fetchCF();
    fetchCC();
  }, [codeforcesUsername, codechefUsername]);

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("vaultifyToken");
      let payload = {};
      if (form.type === "certification") {
        payload = {
          type: "certification",
          title: form.title,
          platform: form.platform,
          link: form.link,
          date: form.date,
        };
      } else if (form.type === "milestone") {
        payload = {
          type: "milestone",
          description: form.description,
          date: form.date,
        };
      } else if (form.type === "hackathon") {
        payload = {
          type: "hackathon",
          title: form.title,
          description: form.description,
          date: form.date,
        };
      }

      await axios.post("https://vaultify-backend-peg2.onrender.com/achievements", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowModal(false);
      setForm({ type: "certification", title: "", platform: "", link: "", description: "", date: "" });
      fetchAchievements();
    } catch (err) {
      console.error("Error adding achievement:", err.message);
    }
  };

  const handleSaveUsernames = async () => {
    try {
      await axios.put(
        "https://vaultify-backend-peg2.onrender.com/user/update-usernames",
        { githubUsername, leetcodeUsername, codeforcesUsername, codechefUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Usernames saved!");
    } catch (err) {
      console.error("Error saving usernames:", err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const getMilestoneEmoji = (desc) => {
    if (desc.toLowerCase().includes("intern")) return "💼";
    if (desc.toLowerCase().includes("github")) return "🌟";
    if (desc.toLowerCase().includes("100")) return "🔢";
    return "📌";
  };

  const certifications = achievements.filter((a) => a.type === "certification");
  const milestones = achievements.filter((a) => a.type === "milestone");
  const hackathons = achievements.filter((a) => a.type === "hackathon");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white px-6 md:px-12 py-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">🏆 Trophies & Milestones</h1>
          <p className="text-gray-400">A timeline of your developer growth journey</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 px-5 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
          >
            ➕ Add Achievement
          </button>
        </motion.div>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6">📜 Certifications & Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.length ? (
              certifications.map((cert) => (
                <div
                  key={cert._id}
                  className="bg-gray-800 p-5 rounded-md shadow-lg hover:shadow-[0_0_15px_#6366f1] hover:scale-105 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-indigo-400 mb-2">{cert.title}</h3>
                  <p><strong>Platform:</strong> {cert.platform}</p>
                  <p><strong>Date:</strong> {cert.date.slice(0, 10)}</p>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noreferrer" className="text-indigo-300 underline mt-2 block">🔗 View Certificate</a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No certifications yet.</p>
            )}
          </div>
        </motion.section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6">🕒 Milestones</h2>
          <div className="relative border-l-2 border-indigo-600 pl-6">
            {milestones.length ? (
              milestones.map((m) => (
                <div key={m._id} className="mb-6 relative">
                  <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[8px] top-1.5 animate-ping"></div>
                  <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[8px] top-1.5"></div>
                  <p className="text-sm ml-3  text-gray-400">{m.date.slice(0, 10)}</p>
                  <p className="text-base text-white font-medium">{getMilestoneEmoji(m.description)} {m.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No milestones added.</p>
            )}
          </div>
        </motion.section>

    {/* Hackathons */}
    <section className="mb-20">
      <h2 className="text-2xl font-semibold mb-6">🏁 Hackathon Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons.length ? (
          hackathons.map((hack) => (
            <div key={hack._id} className="bg-gray-800 p-5 rounded-md shadow-lg hover:shadow-[0_0_15px_#6366f1] hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold text-indigo-400 mb-2">{hack.title}</h3>
              <p>📍 {hack.description}</p>
              <p className="text-sm text-gray-400 mt-1">📅 {hack.date.slice(0, 10)}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hackathons yet.</p>
        )}
      </div>
    </section>

    {/* Progress Track Inputs */}
    <section className="mb-20">
      <h2 className="text-2xl font-semibold mb-4">📊 Track Your Progress</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <input type="text" placeholder="GitHub Username" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)} className="bg-gray-800 p-2 rounded border border-gray-600" />
        <input type="text" placeholder="LeetCode Username" value={leetcodeUsername} onChange={(e) => setLeetcodeUsername(e.target.value)} className="bg-gray-800 p-2 rounded border border-gray-600" />
        <input type="text" placeholder="Codeforces Username" value={codeforcesUsername} onChange={(e) => setCodeForcesUsername(e.target.value)} className="bg-gray-800 p-2 rounded border border-gray-600" />
        <input type="text" placeholder="CodeChef Username" value={codechefUsername} onChange={(e) => setCodeChefUsername(e.target.value)} className="bg-gray-800 p-2 rounded border border-gray-600" />
      </div>
      <button onClick={handleSaveUsernames} className="mt-6 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition">
        Save Usernames
      </button>
    </section>

    {/* GitHub Stats */}
    {githubUsername && (
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">📈 GitHub Stats</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <img src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=tokyonight`} alt="GitHub Stats" className="rounded-md shadow-md" />
          <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=tokyonight`} alt="Top Languages" className="rounded-md shadow-md" />
        </div>
      </section>
    )}

    {/* LeetCode Stats */}
    {leetcodeUsername && (
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">💻 DSA Progress</h2>
        <img src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=baloo&ext=activity`} alt="LeetCode Stats" className="rounded-md shadow-md" />
      </section>
    )}

    {/* Competitive Programming */}
    {(codeforcesUsername || codechefUsername) && (
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">⚔️ Competitive Programming</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {codeforcesUsername && (
            <div className="bg-gray-800 p-4 rounded-md shadow-md">
              <h4 className="text-xl font-semibold mb-2">📉 Codeforces Rating</h4>
              {cfRating ? <p className="text-green-400">Current Rating: {cfRating}</p> : <p className="text-gray-400">No contests found.</p>}
            </div>
          )}
          {codechefUsername && ccData && (
            <div className="bg-gray-800 p-4 rounded-md shadow-md">
              <h4 className="text-xl font-semibold mb-2">🍽️ CodeChef Stats</h4>
              <p>Rating: <span className="text-indigo-400">{ccData.rating}</span></p>
              <p>Stars: ⭐ {ccData.total_stars}</p>
            </div>
          )}
        </div>
      </section>
    )}

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-900 p-6 rounded-lg w-[90%] max-w-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Add New Achievement</h2>
          <div className="grid gap-3">
            <select name="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="bg-gray-800 p-2 rounded border border-gray-600">
              <option value="certification">Certification</option>
              <option value="milestone">Milestone</option>
              <option value="hackathon">Hackathon</option>
            </select>
            {form.type === 'certification' && (
              <>
                <input name="title" placeholder="Title" value={form.title} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <input name="platform" placeholder="Platform" value={form.platform} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <input name="date" placeholder="Date" value={form.date} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <input name="link" placeholder="Certificate Link (optional)" value={form.link} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
              </>
            )}
            {form.type === 'milestone' && (
              <>
                <input name="date" placeholder="Date" value={form.date} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <textarea name="description" placeholder="Milestone Description" value={form.description} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
              </>
            )}
            {form.type === 'hackathon' && (
              <>
                <input name="title" placeholder="Hackathon Title" value={form.title} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <input name="date" placeholder="Date" value={form.date} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
                <textarea name="description" placeholder="Highlight or Summary" value={form.description} onChange={handleInputChange} className="bg-gray-800 p-2 rounded border border-gray-600" />
              </>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={handleAdd} className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition">Save</button>
              <button onClick={() => setShowModal(false)} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  <Footer />
</>

);
};
export default AchievementsPage;
