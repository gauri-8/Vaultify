import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AchievementsPage = () => {
  const [githubUsername, setGithubUsername] = useState("");
const [leetcodeUsername, setLeetcodeUsername] = useState("");
const [codeforcesUsername, setCodeForcesUsername] = useState("");
const [codechefUsername, setCodeChefUsername] = useState("");
const [gfgUsername, setGeeksForGeeksUsername] = useState("");
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
      const res = await axios.get("http://localhost:5000/achievements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAchievements(res.data);
    } catch (err) {
      console.error("Error fetching achievements:", err.message);
    }
  };

  const fetchUsernames = async () => {
  try {
    const res = await axios.get("http://localhost:5000/user/get-usernames", {
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

    // Build payload based on type
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

    // Send POST request
    await axios.post("http://localhost:5000/achievements", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Refresh
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
      "http://localhost:5000/user/update-usernames",
      { githubUsername, leetcodeUsername, codeforcesUsername, codechefUsername},
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



  const certifications = achievements.filter((a) => a.type === "certification");
  const milestones = achievements.filter((a) => a.type === "milestone");
  const hackathons = achievements.filter((a) => a.type === "hackathon");

  return (
  <>
    <Navbar />
    <div className="min-h-screen bg-[#f7c1df] dark:bg-gray-900 text-gray-800 dark:text-white p-6 relative">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">🏆 Trophies & Milestones</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">A timeline of my developer journey and progress.</p>
        <div className="mt-3 w-44 h-1 mx-auto bg-indigo-600 rounded-full"></div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-15 mb-5 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-[#32335a]"
        >
          ➕ Add Achievement
        </button>
      </div>

      {/* CERTIFICATIONS */}
      <section>
        <h2 className="text-4xl font-semibold  mb-6 ">📜 Certifications & Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {certifications.length ? (
            certifications.map((cert) => (
              <div key={cert._id} className="card-container transition-all duration-700 ease-in-out opacity-0 translate-y-4 animate-fade-in-up hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
                <h3 className="text-xl font-bold text-indigo-600 mb-2">{cert.title}</h3>
                <p><strong>Platform:</strong> {cert.platform}</p>
                <p><strong>Date:</strong> {cert.date.slice(0,10)}</p>
                {cert.link && (
                  <a href={cert.link} className="text-indigo-400 underline mt-2 block" target="_blank" rel="noreferrer">🔗 View Certificate</a>
                )}
              </div>
            ))
          ) : (
            <p>No certifications added yet.</p>
          )}
        </div>
      </section>

      {/* MILESTONES */}
      <section className="mt-20">
        <h2 className="text-4xl font-semibold mb-6">🕒 Milestones Timeline</h2>
        <div className="relative ml-4 border-l-2 border-indigo-600 pl-4">
          {milestones.length ? (
            milestones.map((m) => (
              <div key={m._id} className="relative mb-6 opacity-0 translate-x-4 animate-slide-in-left">
                <div className="absolute w-3 h-3  bg-indigo-600 rounded-full -left-[21px] top-1.5 shadow-md"></div>
                <h3 className="text-sm text-gray-300">{m.date.slice(0,10)}</h3>
                <p className="text-base font-medium text-white">{m.description}</p>
              </div>
            ))
          ) : (
            <p>No milestones added yet.</p>
          )}
        </div>
      </section>

      {/* HACKATHONS */}
      <section className="mt-20 mb-15">
        <h2 className="text-4xl font-semibold mb-6">🏁 Hackathon Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.length ? (
            hackathons.map((hack) => (
              <div key={hack._id} className="card-container transition-all duration-700 ease-in-out opacity-0 translate-y-4 animate-fade-in-up hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
                <h3 className="text-xl font-bold text-indigo-600 mb-2">{hack.title}</h3>
                <p>📍 {hack.description}</p>
                <p>📅 {hack.date.slice(0,10)}</p>
              </div>
            ))
          ) : (
            <p>No hackathons added yet.</p>
          )}
        </div>
      </section>

      <section className="mt-20">
  <h2 className="text-4xl font-semibold mb-6">📊 Track Your Progress</h2>
  <p className="text-gray-600 dark:text-gray-400 mb-8">
    Enter your platform usernames to display your real-time progress.
  </p>
  
  <div className="grid gap-4 md:grid-cols-2">
  <input
    type="text"
    name="githubUsername"
    value={githubUsername}
    onChange={(e) => setGithubUsername(e.target.value)}
    placeholder="GitHub Username"
    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
  />
  <input
    type="text"
    name="leetcodeUsername"
    value={leetcodeUsername}
    onChange={(e) => setLeetcodeUsername(e.target.value)}
    placeholder="LeetCode Username"
    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
  />
 

  <input
    type="text"
    name="codeforcesUsername"
    value={codeforcesUsername}
    onChange={(e) => setCodeForcesUsername(e.target.value)}
    placeholder="Codeforces Username"
    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
  />
  <input
    type="text"
    name="codechefUsername"
    value={codechefUsername}
    onChange={(e) => setCodeChefUsername(e.target.value)}
    placeholder="CodeChef Username"
    className="p-2  border rounded dark:bg-gray-700 dark:border-gray-600"
  />
</div>


  <button
    onClick={handleSaveUsernames}
    className="mt-8 ml-210 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
  >
    Save Usernames
  </button>

</section>

 {githubUsername && (
  <div className="mt-8">
    <h3 className="text-3xl  font-semibold mb-4 animate-slide-fade-in">📈 GitHub Stats</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <img
        src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=tokyonight`}
        alt="GitHub Stats"
        className="w-full max-w-[700px] scale-90 rounded-md shadow-sm"
      />
      <img
        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=tokyonight`}
        alt="Top Languages"
        className="w-full max-w-[700px] scale-80 rounded-md shadow-sm"
      />
    </div>
  </div>
)}

{(leetcodeUsername) && (
  <div className="mt-10">
    <h3 className="text-3xl  animate-slide-fade-in font-semibold mb-4">💻 DSA Progress</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* LeetCode Card */}
      {leetcodeUsername && (
        <div>
          <h4 className="text-2xl mt-6 font-semibold mb-4">🧠 LeetCode Stats</h4>
          
  
          <img
            src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=baloo&ext=activity`}
            alt="LeetCode Stats"
            className="w-full max-w-[700px] scale-90 rounded-md shadow-sm"
          />
          
        </div>
      )}
      </div>
      </div>
)}

   

{(codeforcesUsername || codechefUsername) && (
  <div className="mt-12">
    <h3 className="text-3xl animate-slide-fade-in font-semibold mb-4">⚔️ Competitive Programming</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Codeforces */}
      {codeforcesUsername && (
        <div className="bg-white ml-8 dark:bg-[#0e0707] p-3 mt-4 rounded-md shadow-sm border text-md">
          <h4 className="text-2xl mt-2 font-semibold mb-2">📉 Codeforces Rating</h4>
          {cfRating ? (
            <p className="text-green-600 mt-5 dark:text-green-400">Current Rating: {cfRating}</p>
          ) : (
            <p className="text-gray-500">No contests found.</p>
          )}
        </div>
      )}

      {/* CodeChef */}
      {codechefUsername && ccData && (
        <div className="bg-white dark:bg-[#0e0707] p-3 rounded-md shadow-sm text-md">
          <h4 className="text-lg font-semibold mb-2">🍽️ CodeChef Stats</h4>
          <p>Rating: <span className="text-indigo-600">{ccData.rating}</span></p>
          <p>Stars: ⭐ {ccData.total_stars}</p>
        </div>
      )}
    </div>
  </div>
)}




      {/* MODAL for Adding Achievement */}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-2xl w-[95%] max-w-lg">
            <h2 className="text-2xl mb-6 font-semibold">Add New Achievement</h2>
            <div className="grid gap-4">
              <select
                name="type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="certification">Certification</option>
                <option value="milestone">Milestone</option>
                <option value="hackathon">Hackathon</option>
              </select>

              {/* Certification Fields */}
              {form.type === 'certification' && (
                <>
                  <input name="title" placeholder="Title" value={form.title} onChange={handleInputChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                  <input name="platform" placeholder="Platform" value={form.platform} onChange={handleInputChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                  <input name="date" placeholder="Date" value={form.date} onChange={handleInputChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                  <input name="link" placeholder="Certificate Link (optional)" value={form.link} onChange={handleInputChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </>
              )}

              {/* Milestone Fields */}
              {form.type === 'milestone' && (
                <>
                  <input name="date" placeholder="Date" value={form.date} onChange={handleInputChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                  <textarea name="description" placeholder="Milestone Description" value={form.description} onChange={handleInputChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </>
              )}

              {/* Hackathon Fields */}
              {form.type === 'hackathon' && (
                <>
                  <input name="title" placeholder="Hackathon Title" value={form.title} onChange={handleInputChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                  <input name="date" placeholder="Date" value={form.date} onChange={handleInputChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                  <textarea name="description" placeholder="Highlight or Summary" value={form.description} onChange={handleInputChange} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                  </>
              )}
              {/* Save and Cancel Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={handleAdd}
                  className="bg-indigo-600 text-white font-bold px-4 py-2 rounded hover:bg-[#0000ff70]"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
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
